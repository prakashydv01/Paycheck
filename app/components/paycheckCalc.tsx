"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  STATE_LIST, STATE_TAX_YEAR, STATE_DATA_AS_OF, stateCaveats, calcStateTax, defaultLocalRate, localHintFor,
} from "../page-components/Statetax";

/**
 * US Paycheck Calculator (TSX) — corrected federal + FICA logic
 *
 * What changed vs. the previous version:
 *  1. Federal: uses the standard deduction + current-year brackets (2025 & 2026, IRS Rev. Proc. 2025-32 / OBBBA).
 *  2. FICA: Social Security & Medicare are computed on gross wages (401(k) deferrals are NOT exempt from FICA),
 *     with the Social Security wage-base cap and the 0.9% Additional Medicare Tax above $200k.
 *  3. New input: pre-tax benefits (health premiums / HSA via cafeteria plan) — exempt from federal tax AND FICA.
 *  4. Dependents are treated as qualifying children under 17 ($2,200 Child Tax Credit each, W-4 Step 3 style).
 *  5. Tax-year selector (default 2026).
 *  6. Input sanitising (no NaN / negatives), rounding only at display time.
 *
 * State income tax, local tax and employee-paid state payroll taxes come from ./stateTax (2026 rules, all 50 states + DC).
 * Requires: npm i recharts jspdf
 */

type PayPeriod = "weekly" | "biweekly" | "semimonthly" | "monthly";
type FilingStatus = "single" | "married" | "married_separate" | "head";
type TaxYear = "2025" | "2026";
type Bracket = { rate: number; cap: number };

const PAY_PERIODS: Record<PayPeriod, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const STATES = STATE_LIST;

/* ------------------------------------------------------------------ */
/*  Federal tax data (verify annually against the IRS Rev. Proc.)     */
/* ------------------------------------------------------------------ */

const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
const mk = (caps: number[]): Bracket[] =>
  RATES.map((rate, i) => ({ rate, cap: i < caps.length ? caps[i] : Infinity }));

type YearData = {
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, Bracket[]>;
  ssWageBase: number;
  childCredit: number;
};

const TAX_DATA: Record<TaxYear, YearData> = {
  // 2025 (after the One Big Beautiful Bill Act raised the standard deduction)
  "2025": {
    standardDeduction: { single: 15750, married: 31500, married_separate: 15750, head: 23625 },
    brackets: {
      single: mk([11925, 48475, 103350, 197300, 250525, 626350]),
      married: mk([23850, 96950, 206700, 394600, 501050, 751600]),
      married_separate: mk([11925, 48475, 103350, 197300, 250525, 375800]),
      head: mk([17000, 64850, 103350, 197300, 250500, 626350]),
    },
    ssWageBase: 176100,
    childCredit: 2200,
  },
  // 2026 (IRS Rev. Proc. 2025-32)
  "2026": {
    standardDeduction: { single: 16100, married: 32200, married_separate: 16100, head: 24150 },
    brackets: {
      single: mk([12400, 50400, 105700, 201775, 256225, 640600]),
      married: mk([24800, 100800, 211400, 403550, 512450, 768700]),
      married_separate: mk([12400, 50400, 105700, 201775, 256225, 384350]),
      head: mk([17700, 67450, 105700, 201750, 256200, 640600]),
    },
    ssWageBase: 184500,
    childCredit: 2200,
  },
};

const SOCIAL_SECURITY_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD = 200000; // employer withholds above this regardless of filing status

function bracketTax(taxable: number, brackets: Bracket[]): number {
  let tax = 0;
  let lower = 0;
  for (const { rate, cap } of brackets) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, cap) - lower) * rate;
    lower = cap;
  }
  return tax;
}

/* ------------------------------------------------------------------ */

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const toNum = (v: string, max = Infinity) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};

export default function PaycheckCalculator(): React.ReactElement {
  const [isHourly, setIsHourly] = useState(true);
  const [hourlyRate, setHourlyRate] = useState<number>(30);
  const [hours, setHours] = useState<number>(40);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [salary, setSalary] = useState<number>(65000);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("biweekly");

  const [taxYear, setTaxYear] = useState<TaxYear>("2026");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [state, setState] = useState<string>("California");
  const [dependents, setDependents] = useState<number>(0);
  const [preTaxRetirementPercent, setPreTaxRetirementPercent] = useState<number>(5);
  const [preTaxBenefits, setPreTaxBenefits] = useState<number>(0);
  const [additionalWithholding, setAdditionalWithholding] = useState<number>(0);
  const [postTaxDeduction, setPostTaxDeduction] = useState<number>(0);
  const [localRate, setLocalRate] = useState<string>(""); // "" = use the state's typical local rate

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme-preference");
      if (!saved) {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    } catch (e) {}
  }, []);

  const periods = PAY_PERIODS[payPeriod];

  const calc = useMemo(() => {
    const data = TAX_DATA[taxYear];

    // Gross pay for one pay period
    const gross = isHourly
      ? (hourlyRate * hours + overtimeHours * hourlyRate * overtimeMultiplier) * (52 / periods) // hours are entered per week
      : salary / periods;

    // Pre-tax deductions
    const retirement = gross * (preTaxRetirementPercent / 100); // 401(k)/403(b): exempt from income tax, NOT from FICA
    const benefits = Math.min(preTaxBenefits, gross); // Section 125 (health, HSA): exempt from income tax AND FICA

    // Federal income tax withholding (annualised, standard deduction, per-year brackets)
    const federalWagesPerPay = Math.max(0, gross - retirement - benefits);
    const annualFederalWages = federalWagesPerPay * periods;
    const annualTaxable = Math.max(0, annualFederalWages - data.standardDeduction[filingStatus]);
    const grossTax = bracketTax(annualTaxable, data.brackets[filingStatus]);
    const annualFederal = Math.max(0, grossTax - dependents * data.childCredit);
    const federal = annualFederal / periods;

    // FICA (retirement deferrals are included; Section 125 benefits are excluded)
    const ficaWagesPerPay = Math.max(0, gross - benefits);
    const annualFicaWages = ficaWagesPerPay * periods;
    const socialSecurity = (Math.min(annualFicaWages, data.ssWageBase) * SOCIAL_SECURITY_RATE) / periods;
    const medicare = ficaWagesPerPay * MEDICARE_RATE;
    const addlMedicare =
      (Math.max(0, annualFicaWages - ADDL_MEDICARE_THRESHOLD) * ADDL_MEDICARE_RATE) / periods;

    // State income tax, local tax and employee-paid state payroll taxes (see stateTax.ts)
    const st = calcStateTax({
      state,
      filing: filingStatus,
      grossAnnual: gross * periods,
      k401Annual: retirement * periods,
      sec125Annual: benefits * periods,
      federalTaxAnnual: annualFederal,
      dependents,
      localRatePct: localRate === "" ? undefined : toNum(localRate, 100),
    });
    const stateTax = st.incomeTax / periods;
    const localTax = st.local / periods;
    const statePayroll = st.payroll.map((p) => ({ name: p.name, amount: p.amount / periods }));
    const stateAll = stateTax + localTax + st.payrollTotal / periods;

    const totalTaxes = federal + stateAll + socialSecurity + medicare + addlMedicare + additionalWithholding;
    const net = gross - retirement - benefits - totalTaxes - postTaxDeduction;

    return {
      gross, retirement, benefits, federalWagesPerPay, annualTaxable,
      federal, stateTax, localTax, statePayroll, stateAll, st, socialSecurity, medicare, addlMedicare, totalTaxes, net,
      effectiveFederalRate: gross > 0 ? federal / gross : 0,
    };
  }, [
    taxYear, isHourly, hourlyRate, hours, overtimeHours, overtimeMultiplier, salary, periods,
    preTaxRetirementPercent, preTaxBenefits, filingStatus, dependents, state, localRate,
    additionalWithholding, postTaxDeduction,
  ]);

  const {
    gross, retirement, benefits, federalWagesPerPay, annualTaxable, federal, stateTax, localTax, statePayroll, stateAll, st,
    socialSecurity, medicare, addlMedicare, net,
  } = calc;

  const annual = (v: number) => r2(v * periods);
  const fmt = (v: number) => v.toLocaleString(undefined, { style: "currency", currency: "USD" });

  // Chart: slices add up to gross pay
  const chartData = useMemo(() => {
    const safe = (v: number) => (Number.isFinite(v) && v > 0 ? r2(v) : 0);
    return [
      { name: "Net", value: safe(net) },
      { name: "Federal", value: safe(federal + additionalWithholding) },
      { name: "State & local", value: safe(stateAll) },
      { name: "FICA", value: safe(socialSecurity + medicare + addlMedicare) },
      { name: "Deductions", value: safe(retirement + benefits + postTaxDeduction) },
    ].filter((d) => d.value > 0);
  }, [net, federal, additionalWithholding, stateAll, socialSecurity, medicare, addlMedicare, retirement, benefits, postTaxDeduction]);

  const COLORS_DARK = ["#34D399", "#60A5FA", "#F472B6", "#F59E0B", "#94A3B8"];
  const COLORS_LIGHT = ["#059669", "#2563EB", "#DB2777", "#B45309", "#475569"];
  const [palette, setPalette] = useState(COLORS_DARK);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setPalette(isDark ? COLORS_DARK : COLORS_LIGHT);
  }, [chartData]);

  const summaryRows = (): Array<[string, number]> => [
    ["Gross", gross],
    ["Pre-tax retirement", retirement],
    ["Pre-tax benefits", benefits],
    ["Federal taxable wages", federalWagesPerPay],
    ["Federal income tax", federal],
    ["State income tax", stateTax],
    ["Local income tax", localTax],
    ...statePayroll.map((p): [string, number] => [p.name, p.amount]),
    ["Social Security", socialSecurity],
    ["Medicare", medicare],
    ["Additional Medicare", addlMedicare],
    ["Additional withholding", additionalWithholding],
    ["Post-tax deductions", postTaxDeduction],
    ["Net pay", net],
  ];

  const downloadCSV = () => {
    const lines = [["Field", "Per Pay", "Annual"].join(",")];
    for (const [label, v] of summaryRows()) lines.push([label, r2(v).toFixed(2), annual(v).toFixed(2)].join(","));
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `paycheck_${payPeriod}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      doc.setFontSize(16);
      doc.text(`Paycheck Estimate (${taxYear} tax year)`, 40, 40);
      doc.setFontSize(11);
      let y = 70;
      doc.text(`Pay period: ${payPeriod} • Filing status: ${filingStatus} • State: ${state}`, 40, y);
      y += 22;
      for (const [label, v] of summaryRows()) {
        doc.text(`${label}: ${fmt(r2(v))}`, 40, y);
        y += 18;
      }
      y += 6;
      doc.text(`Annual gross: ${fmt(annual(gross))} • Annual net (estimate): ${fmt(annual(net))}`, 40, y);
      doc.save(`paycheck_${payPeriod}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      window.print();
    }
  };

  const inputCls =
    "w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white";
  const labelCls = "block text-sm text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <style>{`
        input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-gray-100/60 to-white/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Paycheck Calculator</h1>

          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input className="h-4 w-4" type="checkbox" checked={isHourly} onChange={() => setIsHourly((s) => !s)} />
              Hourly
            </label>

            <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
              Pay period:
              <select
                className="ml-2 bg-transparent text-gray-900 dark:text-white dark:bg-gray-800 p-1 rounded"
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="semimonthly">Semi-monthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {isHourly ? (
            <div className="space-y-3">
              <label className={labelCls}>Hourly rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input className={inputCls + " pl-10"} type="number" value={hourlyRate} onChange={(e) => setHourlyRate(toNum(e.target.value))} min={0} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Hours per week</label>
                  <input className={inputCls} type="number" value={hours} onChange={(e) => setHours(toNum(e.target.value))} min={0} />
                </div>
                <div>
                  <label className={labelCls}>OT hours per week</label>
                  <input className={inputCls} type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(toNum(e.target.value))} min={0} />
                </div>
              </div>

              <label className={labelCls}>OT multiplier</label>
              <input
                className={inputCls}
                type="number"
                step="0.1"
                value={overtimeMultiplier}
                onChange={(e) => setOvertimeMultiplier(Math.max(1, toNum(e.target.value)))}
                min={1}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <label className={labelCls}>Annual salary (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input className={inputCls + " pl-10"} type="number" value={salary} onChange={(e) => setSalary(toNum(e.target.value))} min={0} />
              </div>
            </div>
          )}

          <div className="mt-5 p-4 rounded bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Personal &amp; Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className={labelCls}>Tax year</label>
                <select className={inputCls} value={taxYear} onChange={(e) => setTaxYear(e.target.value as TaxYear)}>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Filing status</label>
                <select className={inputCls} value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}>
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="married_separate">Married filing separately</option>
                  <option value="head">Head of household</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>State</label>
                <select className={inputCls} value={state} onChange={(e) => { setState(e.target.value); setLocalRate(""); }}>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Local income tax (%, optional)</label>
                <input
                  className={inputCls}
                  type="text"
                  inputMode="decimal"
                  value={localRate}
                  placeholder={String(defaultLocalRate(state))}
                  onChange={(e) => setLocalRate(e.target.value.replace(/[^0-9.]/g, ""))}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {localHintFor(state) ?? "City or county wage taxes, if any. Leave blank for none."}
                </p>
              </div>

              <div>
                <label className={labelCls}>Children under 17</label>
                <input className={inputCls} type="number" value={dependents} onChange={(e) => setDependents(Math.floor(toNum(e.target.value)))} min={0} />
              </div>

              <div>
                <label className={labelCls}>Pre-tax retirement (%)</label>
                <input className={inputCls} type="number" value={preTaxRetirementPercent} onChange={(e) => setPreTaxRetirementPercent(toNum(e.target.value, 100))} min={0} max={100} />
              </div>

              <div>
                <label className={labelCls}>Pre-tax benefits (health/HSA, per pay)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input className={inputCls + " pl-10"} type="number" value={preTaxBenefits} onChange={(e) => setPreTaxBenefits(toNum(e.target.value))} min={0} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Additional federal withholding (per pay)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input className={inputCls + " pl-10"} type="number" value={additionalWithholding} onChange={(e) => setAdditionalWithholding(toNum(e.target.value))} min={0} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Post-tax deductions</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input className={inputCls + " pl-10"} type="number" value={postTaxDeduction} onChange={(e) => setPostTaxDeduction(toNum(e.target.value))} min={0} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(`${fmt(r2(net))} net per ${payPeriod}`)}
              className="w-full sm:flex-1 py-3 rounded bg-emerald-500 text-black font-semibold"
            >
              Copy Net
            </button>
            <button
              onClick={() => {
                setIsHourly(true); setHourlyRate(30); setHours(40); setOvertimeHours(0); setOvertimeMultiplier(1.5);
                setSalary(65000); setTaxYear("2026"); setFilingStatus("single"); setState("California"); setLocalRate(""); setDependents(0);
                setPreTaxRetirementPercent(5); setPreTaxBenefits(0); setAdditionalWithholding(0); setPostTaxDeduction(0);
              }}
              className="w-full sm:flex-1 py-3 rounded border border-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Estimate / Result */}
        <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Estimate ({taxYear})</h2>
              <div className="text-sm text-gray-600 dark:text-gray-300">Quick snapshot of your take-home pay</div>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadCSV} className="py-2 px-3 rounded bg-indigo-600 text-sm font-medium">Download CSV</button>
              <button onClick={downloadPDF} className="py-2 px-3 rounded bg-purple-600 text-sm font-medium">Download PDF</button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between"><span>Gross (per {payPeriod})</span><strong>{fmt(r2(gross))}</strong></div>
            <div className="flex justify-between"><span>Pre-tax retirement</span><span>{fmt(r2(retirement))}</span></div>
            {benefits > 0 && <div className="flex justify-between"><span>Pre-tax benefits</span><span>{fmt(r2(benefits))}</span></div>}
            <div className="flex justify-between"><span>Federal taxable wages</span><span>{fmt(r2(federalWagesPerPay))}</span></div>
            <div className="flex justify-between"><span>Federal income tax</span><span>{fmt(r2(federal))}</span></div>
            <div className="flex justify-between"><span>State income tax ({state})</span><span>{fmt(r2(stateTax))}</span></div>
            {localTax > 0 && <div className="flex justify-between"><span>Local income tax</span><span>{fmt(r2(localTax))}</span></div>}
            {statePayroll.map((p) => p.amount > 0 && (
              <div key={p.name} className="flex justify-between"><span>{p.name}</span><span>{fmt(r2(p.amount))}</span></div>
            ))}
            <div className="flex justify-between"><span>Social Security</span><span>{fmt(r2(socialSecurity))}</span></div>
            <div className="flex justify-between"><span>Medicare</span><span>{fmt(r2(medicare))}</span></div>
            {addlMedicare > 0 && <div className="flex justify-between"><span>Additional Medicare (0.9%)</span><span>{fmt(r2(addlMedicare))}</span></div>}
            <div className="flex justify-between"><span>Additional withholding</span><span>{fmt(r2(additionalWithholding))}</span></div>
            {postTaxDeduction > 0 && <div className="flex justify-between"><span>Post-tax deductions</span><span>{fmt(r2(postTaxDeduction))}</span></div>}

            <div className="pt-3 border-t border-gray-300 dark:border-gray-700 flex justify-between text-lg font-semibold">
              <span>Net pay (per {payPeriod})</span><span>{fmt(r2(net))}</span>
            </div>

            <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
              Annual gross: {fmt(annual(gross))} • Annual net (estimate): {fmt(annual(net))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Annual federal taxable income after standard deduction: {fmt(r2(annualTaxable))}
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <p>Notes:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Federal tax uses the {taxYear} IRS brackets and standard deduction for your filing status, annualised from this paycheck, plus a $2,200 credit per child under 17.</li>
                <li>Social Security and Medicare apply to gross wages (401(k) deferrals are not exempt). Social Security stops at the {taxYear} wage base.</li>
                <li>State figures use {STATE_TAX_YEAR} rules (data as of {STATE_DATA_AS_OF}){taxYear === "2025" ? " even though the federal year is set to 2025" : ""}. Garnishments and bonuses are not included.</li>
                {Array.from(new Set([...stateCaveats(state, filingStatus), ...st.notes])).map((n) => <li key={n}>{n}</li>)}
                <li>Your employer&apos;s actual withholding depends on your W-4 and may differ. See the IRS Tax Withholding Estimator for exact figures.</li>
              </ul>
            </div>

            {/* Chart */}
            <div className="mt-4">
              <div className="w-full h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={chartData}
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={4}
                      label={({ name, percent }: { name?: string; percent?: number }) =>
                        `${name ?? ""} ${Math.round((percent ?? 0) * 100)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => fmt(Number(value))} />
                    <Legend verticalAlign="bottom" layout="horizontal" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
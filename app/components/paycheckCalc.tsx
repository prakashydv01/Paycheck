"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * US Paycheck Calculator (TSX) — Dark Theme, attractive UI
 * - Tailwind CSS
 * - Pie chart showing Net vs Taxes
 * - Background follows user's system preference when no explicit theme is set
 * - Mobile-friendly: chart expands on small screens
 *
 * NOTE: Add `recharts` to your project: `npm i recharts`
 */

type PayPeriod = "weekly" | "biweekly" | "semimonthly" | "monthly";

const PAY_PERIOD_MULTIPLIER: Record<PayPeriod, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

type FilingStatus = "single" | "married" | "married_separate" | "head";

const FEDERAL_BRACKETS: Record<FilingStatus, Array<{ rate: number; cap: number }>> = {
  single: [
    { rate: 0.10, cap: 11600 },
    { rate: 0.12, cap: 47150 },
    { rate: 0.22, cap: 100525 },
    { rate: 0.24, cap: 191950 },
    { rate: 0.32, cap: 243725 },
    { rate: 0.35, cap: 609350 },
    { rate: 0.37, cap: Infinity },
  ],
  married: [
    { rate: 0.10, cap: 23200 },
    { rate: 0.12, cap: 94300 },
    { rate: 0.22, cap: 201050 },
    { rate: 0.24, cap: 383900 },
    { rate: 0.32, cap: 487450 },
    { rate: 0.35, cap: 731200 },
    { rate: 0.37, cap: Infinity },
  ],
  married_separate: [
    { rate: 0.10, cap: 11600 },
    { rate: 0.12, cap: 47150 },
    { rate: 0.22, cap: 100525 },
    { rate: 0.24, cap: 191950 },
    { rate: 0.32, cap: 243725 },
    { rate: 0.35, cap: 365600 },
    { rate: 0.37, cap: Infinity },
  ],
  head: [
    { rate: 0.10, cap: 16550 },
    { rate: 0.12, cap: 63100 },
    { rate: 0.22, cap: 100500 },
    { rate: 0.24, cap: 191950 },
    { rate: 0.32, cap: 243700 },
    { rate: 0.35, cap: 609350 },
    { rate: 0.37, cap: Infinity },
  ],
};

function calcFederalTax(annualTaxable: number, filing: FilingStatus) {
  let remaining = annualTaxable;
  let lastCap = 0;
  let tax = 0;
  for (const bracket of FEDERAL_BRACKETS[filing]) {
    const bracketAmount = Math.max(0, Math.min(remaining, bracket.cap - lastCap));
    if (bracketAmount > 0) {
      tax += bracketAmount * bracket.rate;
      remaining -= bracketAmount;
    }
    lastCap = bracket.cap;
    if (remaining <= 0) break;
  }
  return tax;
}

export default function PaycheckCalculator(): React.ReactElement {
  const [isHourly, setIsHourly] = useState(true);
  const [hourlyRate, setHourlyRate] = useState<number>(30);
  const [hours, setHours] = useState<number>(40);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [salary, setSalary] = useState<number>(65000);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("biweekly");

  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [state, setState] = useState<string>("California");
  const [dependents, setDependents] = useState<number>(0);
  const [preTaxRetirementPercent, setPreTaxRetirementPercent] = useState<number>(5);
  const [additionalWithholding, setAdditionalWithholding] = useState<number>(0);
  const [postTaxDeduction, setPostTaxDeduction] = useState<number>(0);

  // ensure background follows system if user hasn't chosen theme (non-intrusive)
  useEffect(() => {
    try {
      const key = 'theme-preference';
      const saved = localStorage.getItem(key);
      if (!saved) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (e) {}
  }, []);

  const SOCIAL_SECURITY_RATE = 0.062;
  const MEDICARE_RATE = 0.0145;

  const grossPerPay = useMemo(() => {
    if (isHourly) {
      const base = hourlyRate * hours;
      const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
      return Math.max(0, base + overtimePay);
    }
    return Math.max(0, salary / PAY_PERIOD_MULTIPLIER[payPeriod]);
  }, [isHourly, hourlyRate, hours, overtimeHours, overtimeMultiplier, salary, payPeriod]);

  const preTaxRetirement = +(grossPerPay * (preTaxRetirementPercent / 100)).toFixed(2);
  const taxablePerPay = Math.max(0, grossPerPay - preTaxRetirement);

  const socialSecurity = +(taxablePerPay * SOCIAL_SECURITY_RATE).toFixed(2);
  const medicare = +(taxablePerPay * MEDICARE_RATE).toFixed(2);

  const annualTaxable = +(Math.max(0, (taxablePerPay * PAY_PERIOD_MULTIPLIER[payPeriod]))).toFixed(2);
  const federalAnnual = calcFederalTax(annualTaxable, filingStatus);
  const federalPerPay = +(federalAnnual / PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2);

  const STATE_FLAT: Record<string, number> = { California: 9.3, Texas: 0, Florida: 0, "New York": 6.0, Default: 4.5 };
  const stateRate = STATE_FLAT[state] ?? STATE_FLAT.Default;
  const stateTax = +((taxablePerPay * (stateRate / 100))).toFixed(2);

  const totalTaxes = +(socialSecurity + medicare + federalPerPay + stateTax + additionalWithholding).toFixed(2);
  const netPay = +(taxablePerPay - totalTaxes - postTaxDeduction).toFixed(2);

  const annualGross = +(grossPerPay * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2);
  const annualNet = +(netPay * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2);

  const fmt = (v: number) => v.toLocaleString(undefined, { style: "currency", currency: "USD" });

  // Chart data: distribute taxes into categories
  const chartData = useMemo(() => {
    const fica = +(socialSecurity + medicare).toFixed(2);
    const federal = +federalPerPay;
    const stateVal = +stateTax;
    const additional = +additionalWithholding;
    const net = Math.max(0, netPay);
    const other = Math.max(0, taxablePerPay - (fica + federal + stateVal + additional + net));
    // ensure no negative or NaN
    const safe = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
    return [
      { name: 'Net', value: safe(net) },
      { name: 'Federal', value: safe(federal) },
      { name: 'State', value: safe(stateVal) },
      { name: 'FICA', value: safe(fica) },
      { name: 'Other', value: safe(other) },
    ].filter(d => d.value > 0);
  }, [socialSecurity, medicare, federalPerPay, stateTax, additionalWithholding, netPay, taxablePerPay]);

  const COLORS_DARK = ['#34D399', '#60A5FA', '#F472B6', '#F59E0B', '#94A3B8'];
  const COLORS_LIGHT = ['#059669', '#2563EB', '#DB2777', '#B45309', '#475569'];

  // pick color palette depending on .dark class on html
  const [palette, setPalette] = useState(COLORS_DARK);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setPalette(isDark ? COLORS_DARK : COLORS_LIGHT);
  }, [chartData]);

  // --- download CSV ---
  const downloadCSV = () => {
    const headers = ["Field","Per Pay","Annual"];
    const rows = [
      ["Gross", grossPerPay.toFixed(2), annualGross.toFixed(2)],
      ["Pre-tax retirement", preTaxRetirement.toFixed(2), (preTaxRetirement * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Taxable income", taxablePerPay.toFixed(2), annualTaxable.toFixed(2)],
      ["Federal", federalPerPay.toFixed(2), (federalPerPay * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["State", stateTax.toFixed(2), (stateTax * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Social Security", socialSecurity.toFixed(2), (socialSecurity * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Medicare", medicare.toFixed(2), (medicare * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Additional withholding", additionalWithholding.toFixed(2), (additionalWithholding * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Post-tax deductions", postTaxDeduction.toFixed(2), (postTaxDeduction * PAY_PERIOD_MULTIPLIER[payPeriod]).toFixed(2)],
      ["Net pay", netPay.toFixed(2), annualNet.toFixed(2)],
    ];

const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', `paycheck_${payPeriod}_${new Date().toISOString().slice(0,10)}.csv`);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);
  };

  // --- download PDF (dynamic import of jsPDF) ---
  const downloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      doc.setFontSize(16);
      doc.text('Paycheck Estimate', 40, 40);
      doc.setFontSize(11);
      const lines = [
        `Pay period: ${payPeriod}`,
        `Gross (per ${payPeriod}): ${fmt(grossPerPay)}`,
        `Pre-tax retirement: ${fmt(preTaxRetirement)}`,
        `Taxable income: ${fmt(taxablePerPay)}`,
        `Federal (est): ${fmt(federalPerPay)}`,
        `State: ${fmt(stateTax)} (${stateRate}%)`,
        `Social Security: ${fmt(socialSecurity)}`,
        `Medicare: ${fmt(medicare)}`,
        `Additional withholding: ${fmt(additionalWithholding)}`,
        `Post-tax deductions: ${fmt(postTaxDeduction)}`,
        `Net pay (per ${payPeriod}): ${fmt(netPay)}`,
        `Annual gross: ${fmt(annualGross)} • Annual net (estimate): ${fmt(annualNet)}`,
      ];
      let y = 70;
      for (const l of lines) {
        doc.text(l, 40, y);
        y += 18;
      }
      doc.save(`paycheck_${payPeriod}_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (err) {
      console.error('PDF generation failed', err);
      window.print();
    }
  };

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
              <input className="h-4 w-4" type="checkbox" checked={isHourly} onChange={() => setIsHourly(s => !s)} />
              Hourly
            </label>

            <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">Pay period:
              <select className="ml-2 bg-transparent text-gray-900 dark:text-white p-1 rounded" value={payPeriod} onChange={(e)=> setPayPeriod(e.target.value as PayPeriod)}>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="semimonthly">Semi-monthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {isHourly ? (
            <div className="space-y-3">
              <label className="block text-sm text-gray-700 dark:text-gray-300">Hourly rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input className="w-full p-3 pl-10 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))} min={0} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300">Hours (per pay)</label>
                  <input className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={hours} onChange={e => setHours(Number(e.target.value))} min={0} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300">OT hours</label>
                  <input className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={overtimeHours} onChange={e => setOvertimeHours(Number(e.target.value))} min={0} />
                </div>
              </div>

              <label className="block text-sm text-gray-700 dark:text-gray-300">OT multiplier</label>
              <input className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" step="0.1" value={overtimeMultiplier} onChange={e=> setOvertimeMultiplier(Number(e.target.value))} min={1} />
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm text-gray-700 dark:text-gray-300">Annual salary (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input className="w-full p-3 pl-10 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} min={0} />
              </div>
            </div>
          )}

          <div className="mt-5 p-4 rounded bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Personal & Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Filing status</label>
                <select className="w-full p-3 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700" value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}>
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="married_separate">Married filing separately</option>
                  <option value="head">Head of household</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">State</label>
                <select className="w-full p-3 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700" value={state} onChange={e => setState(e.target.value)}>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Dependents</label>
                <input className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={dependents} onChange={e => setDependents(Number(e.target.value))} min={0} />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Pre-tax retirement (%)</label>
                <input className="w-full p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={preTaxRetirementPercent} onChange={e => setPreTaxRetirementPercent(Number(e.target.value))} min={0} max={100} />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Additional withholding</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input className="w-full p-3 pl-10 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={additionalWithholding} onChange={e => setAdditionalWithholding(Number(e.target.value))} min={0} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Post-tax deductions</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input className="w-full p-3 pl-10 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" type="number" value={postTaxDeduction} onChange={e => setPostTaxDeduction(Number(e.target.value))} min={0} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigator.clipboard?.writeText(`${fmt(netPay)} net per ${payPeriod}`)} className="w-full sm:flex-1 py-3 rounded bg-emerald-500 text-black font-semibold">Copy Net</button>
            <button onClick={() => { setHourlyRate(30); setHours(40); setOvertimeHours(0); setOvertimeMultiplier(1.5); setSalary(65000); setFilingStatus("single"); setState("California"); setDependents(0); setPreTaxRetirementPercent(5); setAdditionalWithholding(0); setPostTaxDeduction(0); }} className="w-full sm:flex-1 py-3 rounded border border-gray-600">Reset</button>
          </div>
        </div>

        {/* Estimate / Result */}
        <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Estimate</h2>
              <div className="text-sm text-gray-600 dark:text-gray-300">Quick snapshot of your take-home pay</div>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadCSV} className="py-2 px-3 rounded bg-indigo-600 text-sm font-medium">Download CSV</button>
              <button onClick={downloadPDF} className="py-2 px-3 rounded bg-purple-600 text-sm font-medium">Download PDF</button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between"><span>Gross (per {payPeriod})</span><strong>{fmt(grossPerPay)}</strong></div>
            <div className="flex justify-between"><span>Pre-tax retirement</span><span>{fmt(preTaxRetirement)}</span></div>
            <div className="flex justify-between"><span>Taxable income</span><span>{fmt(taxablePerPay)}</span></div>
            <div className="flex justify-between"><span>Federal (estimate)</span><span>{fmt(federalPerPay)}</span></div>
            <div className="flex justify-between"><span>State ({stateRate}%)</span><span>{fmt(stateTax)}</span></div>
            <div className="flex justify-between"><span>Social Security</span><span>{fmt(socialSecurity)}</span></div>
            <div className="flex justify-between"><span>Medicare</span><span>{fmt(medicare)}</span></div>
            <div className="flex justify-between"><span>Additional withholding</span><span>{fmt(additionalWithholding)}</span></div>

            <div className="pt-3 border-t border-gray-300 dark:border-gray-700 flex justify-between text-lg font-semibold"><span>Net pay (per {payPeriod})</span><span>{fmt(netPay)}</span></div>

            <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">Annual gross: {fmt(annualGross)} • Annual net (estimate): {fmt(annualNet)}</div>

            <div className="mt-4 text-xs text-gray-400">
              <p>Notes:</p>
              <ul className="list-disc ml-5 mt-1">
                <li>All figures are estimates. State tax uses a simple proxy rate—replace with official state withholding tables for production.</li>
                <li>For precise withholding, use the IRS withholding estimator or payroll-provided details.</li>
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
                      label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${Math.round((percent ?? 0) * 100)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value:number) => fmt(value)} />
                    <Legend verticalAlign="bottom" layout="horizontal" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              
              <a className="text-xs underline" href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noreferrer">IRS withholding estimator</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

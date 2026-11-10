"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ================= TYPES ================= */
type FilingStatus = "single" | "married" | "married_separate" | "head";
type TaxYear = "2025" | "2026";
type Bracket = { rate: number; limit: number };

/* ================= TAX DATA (update every January) =================
 * 2025: IRS Rev. Proc. 2024-40 as amended by the One Big Beautiful Bill Act
 * 2026: IRS Rev. Proc. 2025-32
 * Wage base: SSA. Contribution limits: IRS Notice 2024-80 / 2025-67.
 */
const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
const mk = (limits: number[]): Bracket[] =>
  RATES.map((rate, i) => ({ rate, limit: i < limits.length ? limits[i] : Infinity }));

type YearData = {
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, Bracket[]>;
  ssWageBase: number;
  limit401k: number;
  limitIra: number;
};

const TAX_DATA: Record<TaxYear, YearData> = {
  "2025": {
    standardDeduction: { single: 15750, married: 31500, married_separate: 15750, head: 23625 },
    brackets: {
      single: mk([11925, 48475, 103350, 197300, 250525, 626350]),
      married: mk([23850, 96950, 206700, 394600, 501050, 751600]),
      married_separate: mk([11925, 48475, 103350, 197300, 250525, 375800]),
      head: mk([17000, 64850, 103350, 197300, 250500, 626350]),
    },
    ssWageBase: 176100,
    limit401k: 23500,
    limitIra: 7000,
  },
  "2026": {
    standardDeduction: { single: 16100, married: 32200, married_separate: 16100, head: 24150 },
    brackets: {
      single: mk([12400, 50400, 105700, 201775, 256225, 640600]),
      married: mk([24800, 100800, 211400, 403550, 512450, 768700]),
      married_separate: mk([12400, 50400, 105700, 201775, 256225, 384350]),
      head: mk([17700, 67450, 105700, 201750, 256200, 640600]),
    },
    ssWageBase: 184500,
    limit401k: 24500,
    limitIra: 7500,
  },
};

const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  head: 200000,
  married: 250000,
  married_separate: 125000,
};

/* ================= HELPERS ================= */
function bracketTax(taxable: number, brackets: Bracket[]): number {
  let tax = 0;
  let lower = 0;
  for (const { rate, limit } of brackets) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, limit) - lower) * rate;
    lower = limit;
  }
  return tax;
}

function marginalRate(taxable: number, brackets: Bracket[]): number {
  for (const b of brackets) if (taxable <= b.limit) return b.rate;
  return brackets[brackets.length - 1].rate;
}

const parseMoney = (v: string) => {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const pct = (part: number, whole: number) => (whole > 0 ? ((part / whole) * 100).toFixed(2) : "0.00") + "%";

/* ================= COMPONENT ================= */
export default function IncomeTaxCalculator() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [income, setIncome] = useState(50000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [taxYear, setTaxYear] = useState<TaxYear>("2026");
  const [earners, setEarners] = useState<1 | 2>(1);
  const [advanced, setAdvanced] = useState(false);
  const [k401, setK401] = useState(0);
  const [ira, setIra] = useState(0);
  const [itemized, setItemized] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const data = TAX_DATA[taxYear];
  const isMarried = status === "married";

  const calc = useMemo(() => {
    // Contributions are capped at the annual limit and cannot exceed income
    const k401Used = Math.min(k401, data.limit401k, income);
    const iraUsed = Math.min(ira, data.limitIra, Math.max(0, income - k401Used));

    const standard = data.standardDeduction[status];
    const deduction = Math.max(standard, itemized);
    const usingItemized = itemized > standard;

    // 401(k) and deductible IRA reduce federal taxable income, but 401(k) is NOT exempt from FICA
    const taxableIncome = Math.max(0, income - k401Used - iraUsed - deduction);
    const brackets = data.brackets[status];
    const federalTax = Math.round(bracketTax(taxableIncome, brackets));
    const federalMarginal = marginalRate(taxableIncome, brackets);

    // FICA: Social Security cap applies per earner
    const earnerCount = isMarried ? earners : 1;
    const perEarner = income / earnerCount;
    const socialSecurity = Math.round(Math.min(perEarner, data.ssWageBase) * earnerCount * 0.062);
    const medicare = Math.round(income * 0.0145);
    const addlThreshold = ADDL_MEDICARE_THRESHOLD[status];
    const addlMedicare = Math.round(Math.max(0, income - addlThreshold) * 0.009);
    const fica = socialSecurity + medicare + addlMedicare;

    const ficaMarginal =
      (perEarner < data.ssWageBase ? 0.062 : 0) + 0.0145 + (income > addlThreshold ? 0.009 : 0);

    const totalTax = federalTax + fica;
    const contributions = k401Used + iraUsed;
    return {
      k401Used, iraUsed, standard, deduction, usingItemized, taxableIncome,
      federalTax, federalMarginal, fica, ficaMarginal, totalTax, contributions,
      takeHome: income - totalTax,
      takeHomeAfterContrib: income - totalTax - contributions,
    };
  }, [income, status, earners, isMarried, k401, ira, itemized, data]);

  /* ---------- THEME ---------- */
  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-900";
  const cardClasses = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200";
  const headerClasses = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const cell = `border p-2 ${borderColor}`;
  const labelCls = "block text-sm font-medium mb-1";
  const hintCls = "text-xs text-gray-500 mt-1";

  const moneyInput = (
    id: string,
    value: number,
    onChange: (n: number) => void,
    placeholder = "0"
  ) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value === 0 ? "" : value.toLocaleString("en-US")}
        placeholder={placeholder}
        onChange={(e) => onChange(parseMoney(e.target.value))}
        className={`w-full border rounded p-2 pl-8 ${inputClasses}`}
      />
    </div>
  );

  return (
    <section className={`max-w-6xl mx-auto p-6 ${themeClasses} min-h-screen mt-12`}>
      <h1 className="text-3xl font-bold mb-4">US Income Tax Calculator – {taxYear} Federal &amp; FICA Estimate</h1>
      <p className="text-gray-500 mb-8">
        Estimate your {taxYear} US federal income tax, FICA taxes, marginal and effective tax rates, and take-home pay
        for W-2 wages.
      </p>

      {/* INPUT CARD */}
      <div className={`${cardClasses} p-6 rounded-xl border`}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="income" className={labelCls}>
              {isMarried ? "Household wage income (per year)" : "Annual wage income (W-2)"}
            </label>
            {moneyInput("income", income, setIncome, "Enter amount")}
            <p className={hintCls}>Gross pay before any deductions.</p>
          </div>

          <div>
            <label htmlFor="taxYear" className={labelCls}>Tax year</label>
            <select
              id="taxYear"
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value as TaxYear)}
              className={`w-full border rounded p-2 ${inputClasses}`}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
            <p className={hintCls}>State taxes are not included.</p>
          </div>

          <div>
            <label htmlFor="status" className={labelCls}>Filing status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
              className={`w-full border rounded p-2 ${inputClasses}`}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="married_separate">Married Filing Separately</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
        </div>

        {isMarried && (
          <div className="mt-4 md:w-1/3">
            <label htmlFor="earners" className={labelCls}>Number of earners</label>
            <select
              id="earners"
              value={earners}
              onChange={(e) => setEarners(Number(e.target.value) as 1 | 2)}
              className={`w-full border rounded p-2 ${inputClasses}`}
            >
              <option value={1}>1 earner</option>
              <option value={2}>2 earners (income split evenly)</option>
            </select>
            <p className={hintCls}>The Social Security wage cap applies to each earner separately.</p>
          </div>
        )}

        <button
          type="button"
          className="text-blue-500 text-sm mt-4"
          onClick={() => setAdvanced(!advanced)}
          aria-expanded={advanced}
        >
          Advanced options {advanced ? "▲" : "▼"}
        </button>

        {advanced && (
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="k401" className={labelCls}>Traditional 401(k) contributions (annual)</label>
              {moneyInput("k401", k401, setK401)}
              <p className={hintCls}>
                Reduces federal taxable income but not FICA. Limit {fmt(data.limit401k)} (catch-up not included).
              </p>
            </div>
            <div>
              <label htmlFor="ira" className={labelCls}>Deductible traditional IRA (annual)</label>
              {moneyInput("ira", ira, setIra)}
              <p className={hintCls}>
                Limit {fmt(data.limitIra)}. Assumes the full amount is deductible (income limits may apply if you have a
                workplace plan).
              </p>
            </div>
            <div>
              <label htmlFor="itemized" className={labelCls}>Itemized deductions (annual)</label>
              {moneyInput("itemized", itemized, setItemized)}
              <p className={hintCls}>
                Used only if larger than the {fmt(calc.standard)} standard deduction.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* RESULT */}
      <div className="text-center mt-8 text-2xl font-semibold">
        Your {taxYear} Federal Income Tax Plus FICA:{" "}
        <span className="text-blue-500">{fmt(calc.totalTax)}</span>
      </div>

      {/* BREAKDOWN */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border text-sm" style={{ borderCollapse: "collapse" }}>
          <thead className={headerClasses}>
            <tr>
              <th className={`${cell} text-left`}>Tax type</th>
              <th className={cell}>Marginal rate</th>
              <th className={cell}>Effective rate</th>
              <th className={cell}>Taxes*</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cell}>Federal income tax</td>
              <td className={`${cell} text-center`}>{(calc.federalMarginal * 100).toFixed(2)}%</td>
              <td className={`${cell} text-center`}>{pct(calc.federalTax, income)}</td>
              <td className={`${cell} text-right`}>{fmt(calc.federalTax)}</td>
            </tr>
            <tr>
              <td className={cell}>FICA (Social Security + Medicare)</td>
              <td className={`${cell} text-center`}>{(calc.ficaMarginal * 100).toFixed(2)}%</td>
              <td className={`${cell} text-center`}>{pct(calc.fica, income)}</td>
              <td className={`${cell} text-right`}>{fmt(calc.fica)}</td>
            </tr>
            <tr className="font-semibold text-green-500">
              <td className={cell}>Total income taxes</td>
              <td className={`${cell} text-center`}>—</td>
              <td className={`${cell} text-center`}>{pct(calc.totalTax, income)}</td>
              <td className={`${cell} text-right`}>{fmt(calc.totalTax)}</td>
            </tr>
            <tr>
              <td className={cell}>Take-home pay (after taxes)</td>
              <td className={cell} colSpan={2}></td>
              <td className={`${cell} text-right`}>{fmt(calc.takeHome)}</td>
            </tr>
            {calc.contributions > 0 && (
              <tr>
                <td className={cell}>After retirement contributions</td>
                <td className={cell} colSpan={2}></td>
                <td className={`${cell} text-right`}>{fmt(calc.takeHomeAfterContrib)}</td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="text-sm mt-3">
          Federal taxable income: <strong>{fmt(calc.taxableIncome)}</strong> (
          {calc.usingItemized ? "itemized" : "standard"} deduction of {fmt(calc.deduction)} applied).
        </p>
        <p className="text-xs text-gray-500 mt-2">
          * Estimates only, not tax advice. Assumes W-2 wages (self-employed people pay 15.3% self-employment tax) and
          excludes state and local taxes and credits such as the Child Tax Credit.
        </p>
      </div>
    </section>
  );
}
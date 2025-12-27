"use client";

import { useState, useEffect } from "react";

/* ================= TYPES ================= */
type FilingStatus = "single" | "married" | "head";

/* ================= CONSTANTS ================= */
/**
 * SmartAsset-style projected 2025 standard deductions
 * (NOT IRS final numbers – this is intentional for parity)
 */
const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15900,
  married: 31800,
  head: 23900,
};

const FEDERAL_BRACKETS: Record<
  FilingStatus,
  { rate: number; limit: number }[]
> = {
  single: [
    { rate: 0.1, limit: 11000 },
    { rate: 0.12, limit: 44725 },
    { rate: 0.22, limit: 95375 },
    { rate: 0.24, limit: 182100 },
    { rate: 0.32, limit: 231250 },
    { rate: 0.35, limit: 578125 },
    { rate: 0.37, limit: Infinity },
  ],
  married: [
    { rate: 0.1, limit: 22000 },
    { rate: 0.12, limit: 89450 },
    { rate: 0.22, limit: 190750 },
    { rate: 0.24, limit: 364200 },
    { rate: 0.32, limit: 462500 },
    { rate: 0.35, limit: 693750 },
    { rate: 0.37, limit: Infinity },
  ],
  head: [
    { rate: 0.1, limit: 15700 },
    { rate: 0.12, limit: 59850 },
    { rate: 0.22, limit: 95350 },
    { rate: 0.24, limit: 182100 },
    { rate: 0.32, limit: 231250 },
    { rate: 0.35, limit: 578100 },
    { rate: 0.37, limit: Infinity },
  ],
};

const SOCIAL_SECURITY_CAP = 168600;

/* ================= HELPERS ================= */
function calculateFederalTax(
  taxableIncome: number,
  status: FilingStatus
) {
  let tax = 0;
  let last = 0;

  for (const bracket of FEDERAL_BRACKETS[status]) {
    if (taxableIncome <= bracket.limit) {
      tax += Math.round((taxableIncome - last) * bracket.rate);
      break;
    }
    tax += Math.round((bracket.limit - last) * bracket.rate);
    last = bracket.limit;
  }

  return tax;
}

function getMarginalRate(
  taxableIncome: number,
  status: FilingStatus
) {
  for (const bracket of FEDERAL_BRACKETS[status]) {
    if (taxableIncome <= bracket.limit) {
      return bracket.rate;
    }
  }
  return 0;
}

/* ================= COMPONENT ================= */
export default function IncomeTaxCalculator() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [income, setIncome] = useState(50000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [location, setLocation] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [k401, setK401] = useState(0);
  const [ira, setIra] = useState(0);
  const [itemized, setItemized] = useState(0);

  /* ---------- DARK MODE ---------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(media.matches);
      const handler = (e: MediaQueryListEvent) =>
        setIsDarkMode(e.matches);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  /* ---------- HANDLE INCOME INPUT ---------- */
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Remove the $ sign and any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // If the field is empty or just contains "$", set to 0
    if (!numericValue || numericValue === '') {
      setIncome(0);
    } else {
      // Parse the numeric value
      const num = parseFloat(numericValue);
      setIncome(isNaN(num) ? 0 : num);
    }
  };

  /* ---------- TAXABLE INCOME ---------- */
  const deduction = Math.max(
    STANDARD_DEDUCTION[status],
    itemized
  );

  const taxableIncome = Math.max(
    income - deduction - k401 - ira,
    0
  );

  /* ---------- FEDERAL TAX ---------- */
  const federalTax = calculateFederalTax(
    taxableIncome,
    status
  );

  /* ---------- FICA (SMARTASSET-STYLE ROUNDING) ---------- */
  const socialSecurityTax = Math.round(
    Math.min(income, SOCIAL_SECURITY_CAP) * 0.062
  );

  const medicareTax = Math.round(income * 0.0145);

  const additionalMedicare = Math.round(
    (status === "married"
      ? Math.max(income - 250000, 0)
      : Math.max(income - 200000, 0)) * 0.009
  );

  const ficaTax =
    socialSecurityTax + medicareTax + additionalMedicare;

  const totalTax = federalTax + ficaTax;

  /* ---------- RATES ---------- */
  const marginalRate =
    getMarginalRate(taxableIncome, status) * 100;

  const effectiveRate =
    income > 0 ? (totalTax / income) * 100 : 0;

  /* ---------- FINAL VALUES ---------- */
  const incomeAfterTax = income - totalTax;
  const retirementContributions = k401 + ira;
  const takeHomePay = incomeAfterTax;

  /* ---------- THEME ---------- */
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const inputClasses = isDarkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-gray-100 border-gray-200";

  const tableHeaderClasses = isDarkMode
    ? "bg-gray-800"
    : "bg-gray-100";

  const tableRowClasses = isDarkMode
    ? "border-gray-700"
    : "border-gray-300";

  return (
    <section
      className={`max-w-6xl mx-auto p-6 ${themeClasses} min-h-screen mt-12`}
    >
      {/* SEO */}
      <h1 className="text-3xl font-bold mb-4">
        US Income Tax Calculator – 2025-2026 Federal & FICA Estimate
      </h1>

      <p className="text-gray-500 mb-8">
        Estimate your 2025 US federal income tax, FICA taxes,
        marginal and effective tax rates, and take-home pay.
        
      </p>

      {/* INPUT CARD */}
      <div className={`${cardClasses} p-6 rounded-xl border`}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">
              Household Income
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </div>
              <input
                type="text"
                value={income === 0 ? "" : income.toLocaleString()}
                onChange={handleIncomeChange}
                placeholder="Enter amount"
                className={`w-full border rounded p-2 pl-8 ${inputClasses}`}
                onFocus={(e) => {
                  if (income === 0) {
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Location
            </label>
            <input
              value={location}
              placeholder="State (optional)"
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full border rounded p-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Filing Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as FilingStatus)
              }
              className={`w-full border rounded p-2 ${inputClasses}`}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
        </div>

        <div
          className="text-blue-500 text-sm cursor-pointer mt-4"
          onClick={() => setAdvanced(!advanced)}
        >
          Advanced {advanced ? "▲" : "▼"}
        </div>

        {advanced && (
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <input
              type="number"
              placeholder="401(k)"
              value={k401}
              onChange={(e) => setK401(+e.target.value)}
              className={`border rounded p-2 ${inputClasses}`}
            />
            <input
              type="number"
              placeholder="IRA"
              value={ira}
              onChange={(e) => setIra(+e.target.value)}
              className={`border rounded p-2 ${inputClasses}`}
            />
            <input
              type="number"
              placeholder="Itemized Deductions"
              value={itemized}
              onChange={(e) => setItemized(+e.target.value)}
              className={`border rounded p-2 ${inputClasses}`}
            />
          </div>
        )}
      </div>

      {/* RESULT */}
      <div className="text-center mt-8 text-2xl font-semibold">
        Your 2025 Federal Income Tax Plus FICA:{" "}
        <span className="text-blue-500">
          ${totalTax.toLocaleString()}
        </span>
      </div>

      {/* BREAKDOWN */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className={tableHeaderClasses}>
            <tr>
              <th className="border p-2 text-left">Tax Type</th>
              <th className="border p-2">Marginal Rate</th>
              <th className="border p-2">Effective Rate</th>
              <th className="border p-2"> Taxes*</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`border p-2 ${tableRowClasses}`}>Federal</td>
              <td className="border p-2 text-center">
                {marginalRate.toFixed(2)}%
              </td>
              <td className="border p-2 text-center">
                {(federalTax / income * 100).toFixed(2)}%
              </td>
              <td className="border p-2 text-right">
                ${federalTax.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className={`border p-2 ${tableRowClasses}`}>FICA</td>
              <td className="border p-2 text-center">7.65%</td>
              <td className="border p-2 text-center">
                {(ficaTax / income * 100).toFixed(2)}%
              </td>
              <td className="border p-2 text-right">
                ${ficaTax.toLocaleString()}
              </td>
            </tr>

            <tr className="font-semibold text-green-500">
              <td className={`border p-2 ${tableRowClasses}`}>
                Total Income Taxes
              </td>
              <td className="border p-2 text-center">—</td>
              <td className="border p-2 text-center">
                {effectiveRate.toFixed(2)}%
              </td>
              <td className="border p-2 text-right">
                ${totalTax.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className={`border p-2 ${tableRowClasses}`}>
                Take-Home Pay
              </td>
              <td colSpan={2} className="border p-2" />
              <td className="border p-2 text-right">
                ${takeHomePay.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-xs text-gray-500 mt-2">
          * Estimates only. Not tax advice.
        </p>
      </div>
    </section>
  );
}
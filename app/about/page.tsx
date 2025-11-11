"use client";
import React from "react";

/**
 * About page for the US Paycheck Calculator
 * - Dark theme and mobile-friendly
 * - Designed to pair with the calculator component
 */

export default function AboutPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-gray-800/60 to-gray-900/60 backdrop-blur border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About this Paycheck Calculator</h1>
          <p className="text-gray-300 mb-4 leading-relaxed">
            This paycheck calculator is designed to give a fast, friendly estimate of your take-home pay in the United States.
            It’s optimized for budgeting and quick decisions — not tax filing. The design favors a dark, modern interface and
            mobile-friendly experience so you can check your pay on any device.
          </p>

          <h2 className="text-xl font-semibold mt-4">What this tool includes</h2>
          <ul className="list-disc ml-5 mt-2 text-gray-300">
            <li>Hourly or salary inputs and common pay frequencies (weekly, biweekly, semi-monthly, monthly).</li>
            <li>Filing status and dependents inputs to approximate federal withholding.</li>
            <li>Pre-tax retirement contributions, post-tax deductions, and additional withholding.</li>
            <li>Estimates for Social Security and Medicare (employee share) and a simple state tax proxy.</li>
            <li>Download your results as CSV or PDF for record-keeping.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">How the calculations work</h2>
          <p className="text-gray-300 mt-2 leading-relaxed">
            The calculator first computes gross pay for the selected pay period (including overtime). It subtracts pre-tax
            retirement to produce taxable income, then estimates federal withholding using progressive tax brackets (a
            simplified 2024-like table). Social Security and Medicare are applied at standard employee rates. State tax is
            approximated using a flat-rate proxy and is meant as a quick estimate — for production use, replace with official
            state withholding tables.
          </p>

          <h2 className="text-xl font-semibold mt-4">Important disclaimers</h2>
          <ul className="list-disc ml-5 mt-2 text-gray-300">
            <li>This tool is for <strong>estimation</strong> only and is not tax or legal advice.</li>
            <li>Specific employer payroll setups (pretax benefits, multi-job adjustments, local taxes, and credits) may
                materially change withholding values.</li>
            <li>For exact withholding, consult the <a href="https://www.irs.gov/individuals/tax-withholding-estimator" className="underline">IRS Withholding Estimator</a>
                or a qualified payroll professional.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Sources & inspiration</h2>
          <p className="text-gray-300 mt-2 leading-relaxed">
            The UI and flow were inspired by reputable paycheck calculators such as SmartAsset and PaycheckCity. Federal
            bracket approximations are modeled from IRS tables — update annually for production accuracy.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="/" className="w-full sm:w-auto inline-block px-4 py-3 bg-emerald-500 text-black font-semibold rounded text-center">Open Calculator</a>
            <a href="/contact" className="w-full sm:w-auto inline-block px-4 py-3 border border-gray-600 rounded text-center">Contact / Feedback</a>
            
          </div>

          <footer className="mt-6 text-xs text-gray-500">
            <div>Made with care — not a substitute for professional payroll software. Last updated: Nov 7, 2025.</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";

/**
 * Disclaimer Page - US Paycheck Calculator
 * Dark theme, responsive, and clear legal disclaimers.
 */

export default function Disclaimer(): React.ReactElement {
  const lastUpdated = "November 8, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-gray-800/60 to-gray-900/60 backdrop-blur border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Disclaimer</h1>
          <p className="text-gray-300 mb-4">Last updated: {lastUpdated}</p>

          <section className="mb-6">
            <p className="text-gray-300 leading-relaxed">
              The information provided by the US Paycheck Calculator is for general informational and educational purposes only.
              While we strive to ensure accuracy, the results produced by this calculator are estimates and should not be relied upon
              as tax, legal, investment, or financial advice.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Not Professional Advice</h2>
            <p className="text-gray-300 leading-relaxed">
              This tool does not replace the guidance of a certified tax professional, accountant, payroll specialist, or attorney.
              Before making decisions based on calculator estimates, you should consult with a qualified professional.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">No Warranties</h2>
            <p className="text-gray-300 leading-relaxed">
              We make no guarantees regarding the accuracy, completeness, or timeliness of data used in calculations.
              Tax laws, withholding formulas, deductions, credits, and payroll rules change frequently.
              We are not responsible for any errors, financial loss, or consequences resulting from use of the calculator.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">User Responsibility</h2>
            <p className="text-gray-300 leading-relaxed">
              The user is solely responsible for verifying the outputs of this calculator. When filing taxes or planning finances,
              always refer to official IRS/state resources or consult a licensed advisor.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">External Links</h2>
            <p className="text-gray-300 leading-relaxed">
              This site may contain links to external resources created and maintained by third parties. We do not endorse or
              guarantee the accuracy of external content and are not responsible for any loss or damage resulting from their use.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Changes to This Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Disclaimer from time to time. Continued use of this site constitutes acceptance of the latest version.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions regarding this Disclaimer, please contact us at:
            </p>
            <p className="text-gray-300 mt-1 underline">uspaycheck.com</p>
          </section>

          <div className="mt-6 flex gap-3">
            <a href="/" className="px-4 py-2 rounded bg-emerald-500 text-black font-semibold">Open Calculator</a>
            <a href="/contact" className="px-4 py-2 rounded border border-gray-600">Contact</a>
          </div>

          <footer className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} US Paycheck Calculator. All rights reserved.</footer>
        </div>
      </div>
    </div>
  )
}

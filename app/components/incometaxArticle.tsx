"use client";

import { useState, useEffect } from "react";

export default function IncomeTaxArticle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial value
      setIsDarkMode(mediaQuery.matches);
      
      // Listen for changes
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      
      // Cleanup
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Theme classes
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-800";

  const cardClasses = isDarkMode
    ? "bg-gray-800 border-gray-700 text-gray-300"
    : "bg-gray-100 border-gray-200 text-gray-600";

  const headingClasses = isDarkMode
    ? "text-white"
    : "text-gray-900";

  return (
    <article className={`max-w-4xl mx-auto px-4 py-10 transition-colors duration-300 mt-20 mb-20 ${themeClasses}`}>
      {/* TITLE */}
      <h1 className={`text-3xl font-bold mb-4 ${headingClasses}`}>
        US Income Tax Calculator (2025): Estimate Your Federal Taxes & Take-Home Pay
      </h1>

      <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Understanding how much you owe in taxes is an important part of managing
        your finances. This US income tax calculator helps you estimate your
        federal income tax, FICA taxes, and take-home pay based on your income,
        filing status, and deductions.
      </p>

      {/* INTRO */}
      <p className="mb-6">
        The calculator is designed for US taxpayers and follows the current IRS
        tax structure for the <strong>2025–2026 tax filing season</strong>. It
        provides fast, easy-to-understand estimates to help you plan your budget
        and understand where your money goes.
      </p>

      {/* HOW IT WORKS */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        How the US Income Tax Calculator Works
      </h2>

      <p className="mb-4">
        The United States uses a <strong>progressive income tax system</strong>,
        which means different portions of your income are taxed at different
        rates. Higher income does not mean all of your income is taxed at a
        higher rate—only the portion that falls into higher tax brackets.
      </p>

      <p className="mb-4">
        This calculator estimates your taxes by considering:
      </p>

      <ul className={`list-disc pl-6 mb-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <li>Your annual household income</li>
        <li>Your filing status (Single, Married Filing Jointly, Head of Household)</li>
        <li>Standard or itemized deductions</li>
        <li>401(k) and IRA retirement contributions</li>
        <li>Federal income tax brackets</li>
        <li>FICA taxes (Social Security and Medicare)</li>
      </ul>

      {/* TAX TYPES */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        What Taxes Are Included?
      </h2>

      <h3 className={`text-xl font-semibold mt-4 mb-2 ${headingClasses}`}>
        Federal Income Tax
      </h3>
      <p className="mb-4">
        Federal income tax is calculated using IRS tax brackets. Each portion of
        your taxable income is taxed at the rate assigned to that bracket.
      </p>

      <h3 className={`text-xl font-semibold mt-4 mb-2 ${headingClasses}`}>
        FICA Taxes
      </h3>
      <p className="mb-4">
        FICA taxes fund Social Security and Medicare programs and include:
      </p>

      <ul className={`list-disc pl-6 mb-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <li>Social Security tax (6.2% up to the annual wage limit)</li>
        <li>Medicare tax (1.45% on all income)</li>
        <li>Additional Medicare tax (0.9% on higher incomes)</li>
      </ul>

      <p className="mb-4">
        These taxes are withheld directly from your paycheck.
      </p>

      {/* WHAT IS NOT INCLUDED */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        What This Calculator Does Not Include
      </h2>

      <p className="mb-4">
        To keep estimates fast and easy, this calculator currently does not
        include:
      </p>

      <ul className={`list-disc pl-6 mb-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <li>State income taxes</li>
        <li>Local or city taxes</li>
        <li>Tax credits such as the Child Tax Credit</li>
        <li>Special deductions or exemptions</li>
      </ul>

      <p className="mb-4">
        Actual tax results may vary depending on your personal financial
        situation.
      </p>

      {/* RESULTS */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        Understanding Your Tax Results
      </h2>

      <p className="mb-4">
        After entering your information, you'll see a detailed breakdown of your
        estimated taxes, including:
      </p>

      <ul className={`list-disc pl-6 mb-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <li>Marginal tax rate</li>
        <li>Effective tax rate</li>
        <li>Total federal income tax</li>
        <li>Total FICA taxes</li>
        <li>Income after taxes</li>
        <li>Estimated take-home pay</li>
      </ul>

      {/* BENEFITS */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        Why Use an Income Tax Calculator?
      </h2>

      <p className="mb-6">
        An income tax calculator helps you plan ahead, compare income scenarios,
        and understand how deductions and retirement contributions affect your
        take-home pay. It is especially useful for budgeting, job planning, and
        financial decision-making.
      </p>

      {/* FAQ */}
      <h2 className={`text-2xl font-semibold mt-10 mb-3 ${headingClasses}`}>
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <p className="font-semibold mb-1">
            Is this income tax calculator free?
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Yes. This calculator is completely free and does not require
            registration.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">
            Does it include state taxes?
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            No. It currently estimates federal income tax and FICA only.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">
            Which tax year does this calculator use?
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            It is based on 2025 federal tax rules for the 2025–2026 filing season.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">
            Is my information stored?
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            No. All calculations are performed locally in your browser.
          </p>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className={`p-4 rounded text-sm border mt-10 transition-colors duration-300 ${cardClasses}`}>
        <strong>Disclaimer:</strong> This calculator provides estimates only and
        should not be considered tax, legal, or financial advice. Tax laws change
        frequently, and individual situations vary. Consult a qualified tax
        professional for personalized advice.
      </div>
    </article>
  );
}
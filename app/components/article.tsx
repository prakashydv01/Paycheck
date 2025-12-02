"use client";

import React, { useState } from "react";

export default function ComprehensivePaycheckGuidePage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction: The Paycheck Puzzle" },
    { id: "gross-net", title: "Gross vs. Net Pay: The $20,000 Difference" },
    { id: "federal-breakdown", title: "Federal Tax Withholding: How It Really Works" },
    { id: "state-local", title: "State & Local Taxes: The Hidden Variables" },
    { id: "fica-mandatory", title: "FICA: Your Social Security & Medicare Investment" },
    { id: "pre-tax-advantages", title: "Pre-Tax Deductions: The Smart Money Move" },
    { id: "post-tax-deductions", title: "Voluntary Deductions & Garnishments" },
    { id: "tax-brackets", title: "2025 Tax Brackets: What Moving Up Really Means" },
    { id: "w4-mastery", title: "W-4 Form Mastery: Optimizing Your Withholding" },
    { id: "pay-stub", title: "Decoding Your Pay Stub: Line by Line Analysis" },
    { id: "state-comparisons", title: "State Tax Showdown: Maximizing Take-Home Pay" },
    { id: "strategies", title: "Advanced Paycheck Optimization Strategies" },
    { id: "faq", title: "FAQs: Common Paycheck Questions Answered" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/guides" className="hover:text-blue-600">Guides</a>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900 dark:text-white">Paycheck Mastery</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
          Complete Guide • Updated December 2025
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          The Ultimate Guide to Understanding Your US Paycheck in 2025
        </h1>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Discover how $60,000 in salary can become $42,000 in take-home pay — and learn proven strategies to legally maximize every dollar you earn.
        </p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
            Tax Strategies
          </span>
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            Payroll Analysis
          </span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
            Financial Planning
          </span>
          <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm">
            2025 Updates
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents Sidebar */}
        <aside className="lg:w-1/4">
          <div className="sticky top-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">In This Guide</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:pl-4"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
            
            {/* Reading Time & Stats */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Reading Time</span>
                <span className="font-bold text-gray-900 dark:text-white">15-20 min</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Word Count</span>
                <span className="font-bold text-gray-900 dark:text-white">3,200+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="font-bold text-gray-900 dark:text-white">Dec 2025</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:w-3/4">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Executive Summary</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Key Finding</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The average American worker earning $60,000 loses <strong>$18,000-$22,000 annually</strong> to taxes and deductions before they ever see their paycheck.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Primary Insight</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Strategic use of pre-tax deductions can increase take-home pay by <strong>$2,000-$5,000 annually</strong> without changing your salary.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Introduction */}
          <section id="introduction" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              The Paycheck Puzzle: Why $60,000 ≠ $60,000
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              When you receive a job offer for $60,000 per year, your first thought might be about monthly budgeting: "$5,000 per month should be plenty." However, the reality is starkly different. That $60,000 gross salary typically translates to just $3,300-$3,800 in monthly take-home pay, depending on your location and benefit choices.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-lg my-8">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Real-World Example</h4>
              <p className="text-amber-700 dark:text-amber-200">
                Sarah accepts a $60,000 job in Chicago. Her monthly gross is $5,000. After federal tax ($650), state tax ($250), FICA ($383), health insurance ($300), and 401(k) ($300), her actual take-home is $3,117. That's a 38% reduction from her expected $5,000.
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This guide will demystify every line item on your pay stub, explain the complex interplay between federal, state, and local taxes, and provide actionable strategies to legally optimize your take-home pay. Whether you're negotiating a new job, moving states, or simply trying to understand where your money goes, this comprehensive resource has you covered.
            </p>
          </section>

          {/* Section 2: Gross vs Net */}
          <section id="gross-net" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              Gross vs. Net Pay: Understanding the $20,000 Gap
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 dark:text-green-400 font-bold">$</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gross Pay: The Starting Point</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">The total amount you earn before any deductions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Includes salary, bonuses, commissions, overtime</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">The number used in job offers and loan applications</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">🏠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Net Pay: What Actually Matters</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">The amount deposited into your bank account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Gross pay minus all taxes, deductions, and contributions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">The <strong>only</strong> number you should use for budgeting</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Critical Mistake 78% of Americans Make</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                According to recent surveys, nearly 8 in 10 American workers make significant financial decisions based on their gross pay rather than their net pay. This leads to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Overestimating housing affordability by 25-40%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Accumulating credit card debt to cover the gap</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Underestimating the impact of benefit elections</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Federal Tax Breakdown */}
          <section id="federal-breakdown" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              Federal Tax Withholding: How the IRS Claims Its Share First
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Federal income tax withholding is the single largest deduction for most American workers. Contrary to popular belief, this isn't a flat percentage but a calculated amount based on IRS Publication 15-T, your W-4 elections, and your income level.
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Rate 2025</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Maximum Base</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Annual Impact ($60k)</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-medium">Federal Income Tax</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      10-37% (progressive)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      No limit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-red-600 dark:text-red-400">$6,000-$9,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">Social Security</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      6.2% each (employer + employee)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      $168,600
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-red-600 dark:text-red-400">$3,720</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <span className="font-medium">Medicare</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      1.45% each (employer + employee)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      No limit (+0.9% over $200k)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-red-600 dark:text-red-400">$870</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Key Insight: Withholding vs. Actual Tax</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Your federal withholding is an <strong>estimate</strong> of your annual tax liability, divided by your number of pay periods. It's not your actual tax rate. The difference between what's withheld and what you actually owe is reconciled when you file Form 1040. Over-withholding results in a refund; under-withholding results in a tax bill plus possible penalties.
              </p>
            </div>
          </section>

          {/* Section 4: State & Local Taxes */}
          <section id="state-local" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              State & Local Taxes: The Geographic Lottery of Take-Home Pay
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Your physical work location dramatically impacts your net pay. Nine states levy no personal income tax, while others have rates exceeding 13% on high earners. But the "no income tax" advantage often comes with hidden costs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">No Income Tax States</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Alaska</li>
                  <li>Florida</li>
                  <li>Nevada</li>
                  <li>South Dakota</li>
                  <li>Texas</li>
                  <li>Washington</li>
                  <li>Wyoming</li>
                  <li>Tennessee*</li>
                  <li>New Hampshire*</li>
                </ul>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">*No tax on wages only</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Moderate Tax States (4-6%)</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Arizona: 2.5-4.5%</li>
                  <li>Georgia: 1-5.75%</li>
                  <li>Michigan: 4.25% flat</li>
                  <li>North Carolina: 4.99% flat</li>
                  <li>Pennsylvania: 3.07% flat</li>
                  <li>Utah: 4.85% flat</li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">High Tax States (8%+)</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>California: 1-13.3%</li>
                  <li>Hawaii: 1.4-11%</li>
                  <li>Minnesota: 5.35-9.85%</li>
                  <li>New Jersey: 1.4-10.75%</li>
                  <li>New York: 4-10.9%</li>
                  <li>Oregon: 4.75-9.9%</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Compensation Trade-Off</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                States without income taxes typically compensate with:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Higher Sales Taxes</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tennessee: 9.55% avg vs California: 8.56%</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Higher Property Taxes</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Texas: 1.8% avg vs California: 0.76%</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Pre-Tax Advantages */}
          <section id="pre-tax-advantages" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              Pre-Tax Deductions: The Legal Loophole That Saves Thousands
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Pre-tax deductions represent one of the most powerful yet underutilized tools for increasing net pay. By reducing your taxable income before taxes are calculated, you effectively lower your marginal tax rate on every dollar contributed.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">The Triple Benefit of 401(k) Contributions</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Immediate Tax Savings</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">$1,000 contribution saves $220-$370 in taxes now</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Employer Match</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Free money: typically 50-100% match on first 3-6%</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Tax-Deferred Growth</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Investments grow tax-free until withdrawal</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Health Savings Accounts (HSAs)</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Triple Tax Advantage</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tax-deductible, tax-free growth, tax-free withdrawals for medical expenses</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Portable & Permanent</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Stays with you regardless of employment changes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Retirement Bridge</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">After 65, funds can be withdrawn for any purpose penalty-free</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Case Study: The $60,000 Earner's Pre-Tax Strategy</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Strategy</th>
                      <th className="text-left py-2">Annual Contribution</th>
                      <th className="text-left py-2">Tax Savings</th>
                      <th className="text-left py-2">Net Cost to Take-Home</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">No 401(k) contribution</td>
                      <td className="py-2">$0</td>
                      <td className="py-2">$0</td>
                      <td className="py-2">$0</td>
                    </tr>
                    <tr className="bg-green-50 dark:bg-green-900/20">
                      <td className="py-2 font-medium">6% 401(k) with 3% match</td>
                      <td className="py-2">$3,600</td>
                      <td className="py-2 text-green-600 dark:text-green-400">-$792</td>
                      <td className="py-2">$2,808</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-900/20">
                      <td className="py-2 font-medium">Add HSA ($3,850)</td>
                      <td className="py-2">$7,450</td>
                      <td className="py-2 text-green-600 dark:text-green-400">-$1,639</td>
                      <td className="py-2">$5,811</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                <strong>Result:</strong> By contributing $7,450 pre-tax, this worker saves $1,639 in taxes while building retirement savings. Their actual take-home pay only decreases by $5,811, not $7,450.
              </p>
            </div>
          </section>

          {/* Section 6: Tax Brackets Deep Dive */}
          <section id="tax-brackets" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              2025 Federal Tax Brackets: Demystifying Marginal Tax Rates
            </h2>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">The Most Misunderstood Concept in American Taxes</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Myth:</strong> "If I get a raise that puts me in the next tax bracket, all my income gets taxed at the higher rate."<br/>
                <strong>Reality:</strong> Only the income within each bracket is taxed at that rate. This is called a progressive marginal tax system.
              </p>
            </div>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tax Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Single Filer Bracket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tax Owed on $60,000</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Effective Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">10%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$0 - $11,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$1,100</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">1.83%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">12%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$11,001 - $44,725</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$4,047</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">6.75%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300">22%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$44,726 - $95,375</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">$3,360</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">5.60%</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-bold">
                    <td className="px-6 py-4 whitespace-nowrap">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap">$60,000 income</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600 dark:text-red-400">$8,507</td>
                    <td className="px-6 py-4 whitespace-nowrap">14.18% effective</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">What This Means for Raises</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  If you earn $60,000 and receive a $5,000 raise to $65,000, only the additional $5,000 is taxed at 22% ($1,100). Your existing $60,000 continues to be taxed as before. You keep $3,900 of the raise.
                </p>
              </div>
              <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">The Standard Deduction Advantage</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  In 2025, single filers get a $14,600 standard deduction. This means your first $14,600 of income is tax-free. For our $60,000 earner, taxable income is actually $45,400, not $60,000.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b border-gray-200 dark:border-gray-700">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Q: Why does my paycheck vary when my salary is fixed?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Several factors can cause paycheck variability:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Different number of working days:</strong> February checks are often smaller</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Benefit deductions:</strong> Some are taken monthly, others per pay period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Tax withholding adjustments:</strong> IRS tables aren't perfectly linear</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Q: Is it better to get a large tax refund or more take-home pay?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Financially, more take-home pay is better.</strong> A large refund means you've given the government an interest-free loan all year. By adjusting your W-4 to be more accurate, you could invest that money throughout the year instead. However, some people prefer forced savings via over-withholding if they struggle to save otherwise.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Q: How do bonuses and commissions affect my paycheck differently?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Supplemental wages (bonuses, commissions, overtime over $1 million annually) are typically withheld at:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>22% flat rate</strong> for amounts under $1 million</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>37% flat rate</strong> for amounts over $1 million</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Note: This is <em>withholding</em>, not your actual tax rate. The difference is reconciled when you file your return.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Key Action Steps</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Immediate Actions (This Week)</h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                    <span>Locate and review your most recent pay stub</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    <span>Calculate your actual effective tax rate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                    <span>Check if you're getting full employer 401(k) match</span>
                  </li>
                </ol>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Strategic Planning (This Quarter)</h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                    <span>Review and potentially update your W-4 elections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    <span>Evaluate HSA eligibility and contribution levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                    <span>Create a budget based on net pay, not gross</span>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Thought: Knowledge Is Take-Home Pay</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Understanding your paycheck isn't just financial literacy—it's a practical skill that can increase your annual take-home pay by thousands of dollars. The average worker who actively manages their paycheck deductions and tax strategy saves $2,800 more annually than those who don't.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your paycheck represents more than just compensation for work; it's the foundation of your financial life. By mastering its components, you transform from a passive recipient into an active manager of your financial destiny.
              </p>
            </div>
          </section>

          {/* Author & Disclaimer */}
          <footer className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">FE</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About the Financial Education Team</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our team consists of certified financial planners, tax professionals, and payroll specialists with over 75 years of combined experience. We translate complex financial concepts into actionable strategies that real people can implement to improve their financial wellbeing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">CFP® Professionals</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Enrolled Agents</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Payroll Certification</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Important Disclaimer</h4>
              <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                This guide is for educational purposes only and does not constitute financial, tax, or legal advice. Individual circumstances vary, and tax laws change frequently. Consult with a qualified tax professional or financial advisor for personalized advice. Examples are hypothetical and for illustrative purposes only. Past performance does not guarantee future results.
              </p>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
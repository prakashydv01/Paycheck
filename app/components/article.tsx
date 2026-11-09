"use client";

import React, { useState } from "react";

/**
 * Corrected guide page. All dollar figures are for the 2026 tax year, single filer:
 *  - Standard deduction $16,100; 10% bracket to $12,400; 12% to $50,400; 22% to $105,700 (IRS Rev. Proc. 2025-32)
 *  - Social Security wage base $184,500; HSA self-only limit $4,400
 * Update these every January.
 *
 * TODO (AdSense / E-E-A-T): fill in AUTHOR with a real person. The byline block only renders when `name` is set.
 */
const AUTHOR = { name: "", role: "", bio: "" };
const LAST_UPDATED = "November 2026";

const sections = [
  { id: "introduction", title: "Why $60,000 Isn’t $60,000" },
  { id: "gross-net", title: "Gross vs. Net Pay" },
  { id: "federal-breakdown", title: "Federal Tax Withholding and FICA" },
  { id: "state-local", title: "State & Local Taxes" },
  { id: "pre-tax-advantages", title: "Pre-Tax Deductions" },
  { id: "tax-brackets", title: "2026 Tax Brackets Explained" },
  { id: "faq", title: "FAQs" },
  { id: "sources", title: "Sources" },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
    {children}
  </h2>
);
const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${className}`}>{children}</p>
);
const Bullets = ({ items, mark = "•", color = "text-blue-500" }: { items: React.ReactNode[]; mark?: string; color?: string }) => (
  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
    {items.map((it, i) => (
      <li key={i} className="flex items-start">
        <span className={`${color} mr-2`}>{mark}</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);
const th = "px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider";
const td = "px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300";

export default function ComprehensivePaycheckGuidePage() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 lg:px-8">
      <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/guides" className="hover:text-blue-600">Guides</a>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900 dark:text-white">Paycheck Guide</span>
      </nav>

      <header className="mb-12">
        <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
          Complete Guide to US Paychecks
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          How to Read Your US Paycheck: 2026 Guide
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          See how a $60,000 salary typically becomes $47,500–$50,400 after taxes, and how pre-tax accounts can change what lands in your bank account.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Federal Tax", "Payroll", "Financial Planning", "2026 Figures"].map((t) => (
            <span key={t} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">{t}</span>
          ))}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <div className="sticky top-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">In This Guide</h3>
            <nav className="space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`block py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === s.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:pl-4"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Tax year</span>
                <span className="font-bold text-gray-900 dark:text-white">2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last updated</span>
                <span className="font-bold text-gray-900 dark:text-white">{LAST_UPDATED}</span>
              </div>
            </div>
          </div>
        </aside>

        <article className="lg:w-3/4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Summary</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Key finding</h4>
                <P>
                  A single filer earning $60,000 pays about <strong>$9,600 (16%)</strong> in federal income tax and FICA in 2026, before any state tax, health premiums or retirement contributions.
                </P>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Primary insight</h4>
                <P>
                  Pre-tax contributions cost you less take-home pay than you put in. In the 12% bracket, every $1,000 into a 401(k) lowers take-home pay by roughly $880 before state tax.
                </P>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-8 mb-12">
            <H2>The Paycheck Puzzle: Why $60,000 ≠ $60,000</H2>
            <P className="mb-6">
              When you receive a $60,000 job offer, it’s tempting to budget $5,000 a month. In reality, income and payroll taxes alone typically leave about $3,900–$4,200 a month, depending on your state. Health insurance and retirement contributions reduce it further.
            </P>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-lg my-8">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Example (approximate, 2026)</h4>
              <p className="text-amber-700 dark:text-amber-200">
                Sarah, a single filer in Illinois, earns $60,000, or $5,000 a month. She contributes $300 to her 401(k) and pays $300 in pre-tax health premiums. Each month, about $346 goes to federal income tax, $360 to FICA, and $206 to Illinois income tax. Her take-home pay is about $3,488. Taxes took roughly 18% of her gross pay. The rest of the gap is $600 of her own retirement savings and health coverage.
              </p>
            </div>
            <P>
              This guide explains each line on your pay stub and how federal, state and payroll taxes interact. It also shows how pre-tax accounts change your take-home pay. Figures are estimates for a single filer using 2026 rules.
            </P>
          </section>

          {/* Gross vs net */}
          <section id="gross-net" className="scroll-mt-8 mb-12">
            <H2>Gross vs. Net Pay: Understanding the Gap</H2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gross pay: the starting point</h3>
                <Bullets color="text-green-500" mark="✓" items={[
                  "The total you earn before any deductions",
                  "Includes salary, bonuses, commissions and overtime",
                  "The number quoted in job offers and often used on loan applications",
                ]} />
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Net pay: what you can spend</h3>
                <Bullets color="text-blue-500" mark="✓" items={[
                  "The amount deposited into your bank account",
                  "Gross pay minus taxes, benefit premiums, retirement contributions and other deductions",
                  <>The number to use when building a <strong>monthly budget</strong></>,
                ]} />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">A common budgeting mistake</h4>
              <P className="mb-3">Planning around gross pay instead of net pay tends to lead to:</P>
              <Bullets color="text-red-500" items={[
                "Overestimating how much rent or mortgage payment you can afford",
                "Relying on credit cards to cover the gap between expectations and deposits",
                "Overlooking how benefit elections change your take-home pay",
              ]} />
            </div>
          </section>

          {/* Federal + FICA */}
          <section id="federal-breakdown" className="scroll-mt-8 mb-12">
            <H2>Federal Tax Withholding and FICA</H2>
            <P className="mb-6">
              Federal income tax is usually the largest deduction. It isn’t a flat percentage. Your employer calculates it using IRS Publication 15-T, the elections on your Form W-4 and your pay level. Social Security and Medicare (FICA) are separate flat-rate payroll taxes that apply to your wages.
            </P>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className={th}>Component</th>
                    <th className={th}>2026 employee rate</th>
                    <th className={th}>Income limit</th>
                    <th className={th}>Annual cost at $60k (single)</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    ["Federal income tax", "10%–37% (progressive)", "None", "≈ $5,020"],
                    ["Social Security", "6.2% (employer pays another 6.2%)", "$184,500 wage base", "$3,720"],
                    ["Medicare", "1.45% (employer pays another 1.45%)", "None; +0.9% on wages over $200,000", "$870"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <td className={`${td} font-medium`}>{r[0]}</td>
                      <td className={td}>{r[1]}</td>
                      <td className={td}>{r[2]}</td>
                      <td className={`${td} font-bold text-red-600 dark:text-red-400`}>{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Withholding vs. actual tax</h4>
              <P>
                Federal withholding is an <strong>estimate</strong> of your annual tax, divided across your pay periods. It isn’t your final bill. The difference between what was withheld and what you owe is settled when you file Form 1040. Over-withholding produces a refund. Under-withholding produces a balance due and can trigger penalties.
              </P>
            </div>
          </section>

          {/* State */}
          <section id="state-local" className="scroll-mt-8 mb-12">
            <H2>State &amp; Local Taxes: Where You Work Matters</H2>
            <P className="mb-6">
              Nine states don’t tax wages, while California’s top rate exceeds 13% on very high incomes. Most workers pay far less than a state’s top rate, because rates rise with income. State rules change often, so check your state revenue department for current rates.
            </P>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">No tax on wages</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {["Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"].map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Some of these states tax other kinds of income.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Flat-rate states (examples)</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {["Arizona", "Colorado", "Illinois", "Indiana", "Michigan", "North Carolina", "Pennsylvania", "Utah"].map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">One rate applies to all taxable income.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Highest top rates</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>California: up to 13.3%</li>
                  <li>New Jersey: up to 10.75%</li>
                  <li>New York: up to 10.9%</li>
                  <li>Hawaii: up to 11%</li>
                  <li>Oregon: up to 9.9%</li>
                  <li>Minnesota: up to 9.85%</li>
                </ul>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Top rates apply only to high incomes.</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The trade-off</h4>
              <P>
                States without a wage tax often raise revenue elsewhere. Tennessee, for example, has some of the highest combined sales-tax rates in the country, and Texas’s effective property-tax rates are well above California’s. Compare the whole cost of living, not just the paycheck.
              </P>
            </div>
          </section>

          {/* Pre-tax */}
          <section id="pre-tax-advantages" className="scroll-mt-8 mb-12">
            <H2>Pre-Tax Deductions: Keep More of What You Save</H2>
            <P className="mb-6">
              Pre-tax contributions reduce the income your federal tax is based on, so the saving equals the amount contributed times your marginal rate. For most workers, that’s 10%–24%. A $1,000 contribution saves roughly $100–$240 in federal income tax, plus state tax where it applies.
            </P>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Why use a 401(k)</h3>
                <Bullets color="text-green-500" mark="✓" items={[
                  <><strong>Lower income tax now:</strong> contributions aren’t counted in federal taxable wages (they are still subject to Social Security and Medicare tax)</>,
                  <><strong>Employer match:</strong> many employers match part of your contribution; the formula varies</>,
                  <><strong>Tax-deferred growth:</strong> you generally pay tax when you withdraw</>,
                ]} />
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Health Savings Accounts (HSAs)</h3>
                <Bullets color="text-blue-500" mark="✓" items={[
                  <><strong>Triple tax advantage:</strong> deductible going in, tax-free growth, tax-free withdrawals for qualified medical costs</>,
                  <><strong>Eligibility:</strong> you need a qualifying high-deductible health plan; the 2026 limit is $4,400 for self-only coverage</>,
                  <><strong>Portable:</strong> the account stays with you if you change jobs</>,
                  <><strong>After 65:</strong> non-medical withdrawals have no penalty but are taxed as ordinary income</>,
                ]} />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Case study: $60,000 earner, single, 2026 (12% bracket)</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-700 dark:text-gray-300">
                  <thead>
                    <tr>
                      {["Strategy", "Annual contribution", "Federal tax + FICA saved", "Take-home reduced by"].map((h) => (
                        <th key={h} className="text-left py-2 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="py-2 pr-4">No contributions</td><td className="py-2 pr-4">$0</td><td className="py-2 pr-4">$0</td><td className="py-2 pr-4">$0</td></tr>
                    <tr className="bg-green-50 dark:bg-green-900/20">
                      <td className="py-2 pr-4 font-medium">6% to a 401(k)</td><td className="py-2 pr-4">$3,600</td>
                      <td className="py-2 pr-4 text-green-600 dark:text-green-400">$432</td><td className="py-2 pr-4">$3,168</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-900/20">
                      <td className="py-2 pr-4 font-medium">Add $4,400 to an HSA</td><td className="py-2 pr-4">$8,000</td>
                      <td className="py-2 pr-4 text-green-600 dark:text-green-400">$1,297</td><td className="py-2 pr-4">$6,703</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                <strong>How it works:</strong> the 401(k) saves 12% federal income tax ($432). HSA contributions made through payroll also skip the 7.65% FICA tax, saving 19.65% ($865). Any employer match and state income-tax savings are extra and not included.
              </p>
            </div>
          </section>

          {/* Brackets */}
          <section id="tax-brackets" className="scroll-mt-8 mb-12">
            <H2>2026 Federal Tax Brackets: How Marginal Rates Work</H2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">The most misunderstood idea in US taxes</h3>
              <P>
                <strong>Myth:</strong> “If a raise pushes me into the next bracket, all my income is taxed at the higher rate.”<br />
                <strong>Reality:</strong> Only the income inside each bracket is taxed at that bracket’s rate.
              </P>
            </div>
            <P className="mb-4">
              Example: a single filer earning $60,000 subtracts the $16,100 standard deduction, leaving <strong>$43,900</strong> of taxable income.
            </P>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className={th}>Rate</th>
                    <th className={th}>Single bracket (taxable income)</th>
                    <th className={th}>Income taxed here</th>
                    <th className={th}>Tax</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className={td}>10%</td><td className={td}>$0 – $12,400</td><td className={td}>$12,400</td><td className={td}>$1,240</td></tr>
                  <tr><td className={td}>12%</td><td className={td}>$12,401 – $50,400</td><td className={td}>$31,500</td><td className={td}>$3,780</td></tr>
                  <tr><td className={td}>22%</td><td className={td}>$50,401 – $105,700</td><td className={td}>$0 (not reached)</td><td className={td}>$0</td></tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                    <td className={td}>Total</td><td className={td}>$43,900 taxable</td><td className={td}>8.4% of gross pay</td>
                    <td className={`${td} text-red-600 dark:text-red-400`}>$5,020</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">What a raise really does</h4>
                <P>
                  A $5,000 raise to $65,000 lifts taxable income to $48,900, which is still inside the 12% bracket. Federal tax on the raise is $600, plus $383 of FICA, so you keep about $4,017 before state tax. The 22% rate starts only above $50,400 of taxable income, or about $66,500 of salary for a single filer.
                </P>
              </div>
              <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">The standard deduction</h4>
                <P>
                  In 2026 the standard deduction is $16,100 for single filers (up from $15,750 in 2025), $32,200 for married couples filing jointly and $24,150 for heads of household. It shields that much income from federal income tax.
                </P>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-8 mb-12">
            <H2>Frequently Asked Questions</H2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why does my paycheck change when my salary is fixed?</h3>
                <Bullets items={[
                  <><strong>Hours and overtime:</strong> hourly pay varies with hours worked</>,
                  <><strong>Deduction timing:</strong> some benefits are taken only from certain checks in a month</>,
                  <><strong>Social Security cap:</strong> the 6.2% tax stops once your year-to-date wages pass $184,500, so high earners’ checks grow late in the year</>,
                  <><strong>Changes to your W-4 or benefit elections</strong></>,
                ]} />
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Is a big tax refund better than more take-home pay?</h3>
                <P>
                  Financially, a large refund means you lent the government money interest-free all year, so accurate withholding is usually better. Some people like refunds as forced savings. Aim to owe little or receive a small refund, and use the IRS Tax Withholding Estimator to adjust your W-4.
                </P>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How are bonuses withheld?</h3>
                <P className="mb-3">
                  Bonuses and commissions are supplemental wages. Under the flat-rate method, employers withhold:
                </P>
                <Bullets color="text-green-500" items={[
                  <><strong>22%</strong> on supplemental wages up to $1 million in a calendar year</>,
                  <><strong>37%</strong> on the portion above $1 million</>,
                ]} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  This is <em>withholding</em>, not your actual tax rate; the difference is settled on your return. Regular overtime pay is generally withheld like regular wages.
                </p>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="mb-12">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
              <Bullets items={[
                "Compare your latest pay stub to the lines above, and check that your 401(k) match is fully captured",
                "Review your W-4 with the IRS Tax Withholding Estimator, especially after a raise, marriage or new job",
                "Budget from net pay, not gross pay",
              ]} />
            </div>
          </section>

          {/* Sources */}
          <section id="sources" className="scroll-mt-8 mb-12">
            <H2>Sources</H2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><a className="text-blue-600 hover:underline" href="https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" target="_blank" rel="noopener noreferrer">IRS Rev. Proc. 2025-32</a>: 2026 tax brackets and standard deductions</li>
              <li><a className="text-blue-600 hover:underline" href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer">IRS Publication 15-T</a>: federal income tax withholding methods</li>
              <li><a className="text-blue-600 hover:underline" href="https://www.ssa.gov/oact/cola/cbb.html" target="_blank" rel="noopener noreferrer">Social Security Administration</a>: 2026 taxable wage base ($184,500)</li>
              <li>IRS Rev. Proc. 2025-19: 2026 HSA contribution limits</li>
              <li><a className="text-blue-600 hover:underline" href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noopener noreferrer">IRS Tax Withholding Estimator</a></li>
            </ul>
          </section>

          <footer className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
            {AUTHOR.name && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{AUTHOR.name}</h4>
                {AUTHOR.role && <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{AUTHOR.role}</p>}
                {AUTHOR.bio && <P>{AUTHOR.bio}</P>}
              </div>
            )}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Disclaimer</h4>
              <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                This guide is for general education and is not tax, legal or financial advice. Examples are simplified estimates for a single filer using 2026 federal rules and exclude local taxes, credits and individual circumstances. Tax laws change; consult a qualified tax professional for your situation.
              </p>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
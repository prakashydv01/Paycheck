"use client";

import React from "react";

export default function ArticlesCardsPage() {
  const posts = [
    {
      slug: "understanding-us-paycheck",
      title: "Understanding Your US Paycheck: How Net Pay Is Calculated",
      date: "Nov 13, 2025",
      readTime: "6 min read",
      full: `Your paycheck is the most frequent financial event for most workers, yet many people don’t fully understand how the number in their bank account is calculated. The journey from gross pay (the total amount earned before deductions) to net pay (what you actually take home) passes through several mandatory and optional steps.

Gross pay can be annual salary pro-rated by pay period or an hourly wage multiplied by hours worked. The first mandatory deductions are federal: income tax withholding (based on IRS tables and your W-4), Social Security at 6.2% of wages, and Medicare at 1.45%. These federal withholdings are calculated each pay cycle to approximate what you will owe for the year.

Next come state and local taxes. Some states levy no income tax (for example, Florida and Texas), which can increase your net pay relative to states with higher rates such as California or New York. Local city or county taxes may also apply depending on where you work or live.

Beyond taxes, pre-tax benefit deductions reduce taxable income. Popular examples are employer-sponsored health insurance premiums, 401(k) contributions, and flexible spending accounts (FSA/HSA). Because these are deducted before taxes, they lower the portion of pay subject to federal/state withholding and payroll taxes. Post-tax deductions — like certain voluntary insurance premiums or wage garnishments — reduce take-home pay after tax calculations.

Finally, additional employer-specific items may appear: overtime or commission payments, payroll rounding, reimbursements, and employer-paid benefits shown as imputed income. Employers typically provide a pay stub that lists each line item so employees can trace how net pay was reached.

Understanding these components empowers workers: compare job offers clearly, optimize withholding to avoid surprises, and make simpler decisions about pre-tax benefits.`
    },
    {
      slug: "federal-tax-brackets-2025",
      title: "Federal Tax Brackets Explained for 2025",
      date: "Oct 30, 2025",
      readTime: "5 min read",
      full: `Federal income tax in the United States uses a progressive, marginal tax system. That means different portions of your taxable income are taxed at different rates. Understanding how marginal brackets work helps clarify why a raise doesn’t necessarily move you into a higher tax rate for all your income.

Tax brackets are ranges of taxable income set by the IRS. Each range has a corresponding tax rate. Only the income inside each bracket is taxed at that rate — not your entire income. So moving into a higher bracket doesn’t mean all your income is taxed more heavily.

Your filing status — single, married filing jointly, married filing separately, or head of household — determines which bracket thresholds apply to you. Standard deductions, itemized deductions, and tax credits further reduce your tax bill. For many taxpayers, credits like the Child Tax Credit or education credits can significantly reduce what you owe.

Each tax year the IRS adjusts brackets for inflation. These adjustments shift thresholds slightly but do not change the marginal structure. Taxpayers can plan ahead using the IRS tax tables or paycheck calculators to estimate what the brackets mean for take-home pay.`
    },
    {
      slug: "w4-form-guide",
      title: "W-4 Form and Tax Withholding: A Simple Guide",
      date: "Sep 18, 2025",
      readTime: "5 min read",
      full: `The IRS Form W-4 tells your employer how much federal tax to withhold from each paycheck. Filling it out accurately prevents overpaying or underpaying taxes during the year.

Modern W-4 forms no longer use “allowances.” Instead, they ask about multiple jobs, dependents, and other income. Key factors include filing status, expected deductions, and credits. Some workers add extra withholding to cover complex tax situations.

Having multiple jobs can cause under-withholding because each employer calculates withholding separately. The W-4 form includes steps to combine incomes or allocate extra withholding to one job. Similarly, significant non-wage income — from investments or freelance work — might require estimated tax payments.

Over-withholding gives the government an interest-free loan, while under-withholding may result in a tax bill or penalties. Revisit your W-4 after major life events or income changes to keep withholding accurate.`
    },
    {
      slug: "no-income-tax-states",
      title: "States with No Income Tax: Where Your Paycheck Goes Further",
      date: "Aug 12, 2025",
      readTime: "4 min read",
      full: `Some U.S. states have no personal income tax. Living in one can boost your take-home pay — but there are trade-offs.

States without income tax include Florida, Texas, Nevada, Washington, and Wyoming. Tennessee and New Hampshire also tax dividends but not wages. However, these states often raise revenue through other means, such as higher sales or property taxes.

That means while you may save on paycheck withholding, you might pay more in other areas. For example, housing costs or consumer prices could offset those savings. The real financial benefit depends on your overall cost of living, not just income tax rates.

Before relocating for tax reasons, compare total living costs, job opportunities, and benefits available in each state.`
    },
    {
      slug: "gross-vs-net-pay",
      title: "Gross Pay vs. Net Pay: Key Differences You Must Know",
      date: "Jul 05, 2025",
      readTime: "4 min read",
      full: `Gross pay is your total earnings before any deductions. Net pay — also called “take-home pay” — is what remains after taxes and deductions are removed.

Your gross pay includes wages, bonuses, and commissions. Deductions include federal and state taxes, Social Security, Medicare, insurance premiums, and retirement contributions. Employers show these on your pay stub to make deductions transparent.

The key takeaway: always budget based on your net pay, not gross. Many people overestimate spending power by looking at their salary instead of what actually hits their bank account. Understanding both numbers helps you plan accurately and avoid overspending.`
    },
    {
      slug: "salary-vs-hourly",
      title: "Salary vs. Hourly Pay: Which Is Better for You?",
      date: "Jun 22, 2025",
      readTime: "5 min read",
      full: `Salaried and hourly pay structures each have pros and cons. Salaried workers receive consistent pay and often enjoy benefits like paid leave, but they might work extra hours without overtime pay. Hourly employees earn for each hour worked and are eligible for overtime, offering flexibility and potential for higher short-term earnings.

Choosing between the two depends on job stability, income predictability, and work-life balance. Hourly roles can suit those seeking flexibility or extra hours, while salaried positions provide security and steady income.

When comparing job offers, convert salaries to hourly equivalents to judge true value. Also, factor in benefits like healthcare, 401(k) matching, and paid time off — they can significantly impact total compensation.`
    },
    {
      slug: "pre-tax-deductions",
      title: "How Pre-Tax Deductions Affect Your Take-Home Pay",
      date: "May 10, 2025",
      readTime: "5 min read",
      full: `Pre-tax deductions reduce your taxable income before taxes are applied, lowering your current tax bill while sometimes improving your long-term savings.

Common pre-tax deductions include health insurance premiums, 401(k) contributions, and flexible spending accounts (FSA/HSA). By lowering taxable income, these deductions can move part of your earnings into a lower tax bracket.

The trade-off is smaller immediate paychecks — but often worth it because of employer matches or tax savings. Review your pay stubs to ensure pre-tax deductions are correctly applied, and adjust them as your financial goals change.`
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-8 py-12 text-left">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Explore detailed, educational articles about U.S. paychecks, taxes, and payroll — all
          presented in a clean, readable layout ideal for AdSense approval.
        </p>
      </header>

      {/* Cards */}
      <section className="space-y-10">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <header>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                {p.title}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {p.date} • {p.readTime}
              </div>
            </header>

            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              {p.full.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} US Paycheck — Educational content only, not financial advice.
      </footer>
    </main>
  );
}

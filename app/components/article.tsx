"use client";

export default function ArticleAndFAQ() {
  return (
    <section className="px-4 py-16 max-w-5xl mx-auto">
      {/* Article */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Understanding Your US Paycheck: How Net Pay Is Calculated
        </h2>

        <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Your paycheck represents more than just the number your employer
            offers you. The amount you actually take home—known as <strong>net pay</strong>—is
            determined after applying several taxes and possible deductions.
            Understanding this breakdown helps you budget better, compare job
            offers, optimize your tax situation, and avoid surprises on payday.
          </p>

          <p>
            Every U.S. paycheck begins with <strong>gross pay</strong>, which can be either a yearly
            salary or hourly wages multiplied by hours worked. From your gross
            pay, mandatory deductions like <strong>Federal Income Tax</strong>, <strong>Social Security</strong>,
            and <strong>Medicare</strong> are subtracted. These are required by law.
          </p>

          <p>
            Additionally, you may see deductions for things like health
            insurance, retirement contributions (401k / IRA), HSAs, or disability
            insurance. These vary depending on your employer and personal choices.
          </p>

          <p>
            Finally, your state of residence plays a major role. Some states
            such as <strong>Florida, Texas, Nevada, Washington, and Tennessee</strong> have no state
            income tax—meaning your paycheck goes further. Meanwhile, states like
            <strong> California, New York, and New Jersey</strong> may withhold more based on income
            levels.
          </p>

          <p>
            Our paycheck calculator helps you estimate all of this instantly,
            offering clarity and helping you plan with confidence.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          {
            title: "Federal Taxes",
            text: "Based on IRS tax brackets and your W-4 filing status.",
          },
          {
            title: "State Taxes",
            text: "Varies by state — some states have no income tax.",
          },
          {
            title: "Deductions",
            text: "Insurance, retirement, and benefits can reduce taxable income.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{card.text}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Is this paycheck calculator accurate?",
              a: "Yes — calculations follow IRS tax tables and standard payroll deductions. Results are estimates and may vary slightly depending on payroll provider.",
            },
            {
              q: "Does it work for hourly and salaried workers?",
              a: "Yes — select hourly or salary mode and choose your pay frequency.",
            },
            {
              q: "Are state taxes included?",
              a: "Yes — simply choose your state, and state tax will be applied automatically.",
            },
            {
              q: "Can I download the results?",
              a: "Yes — you can export your paycheck results as PDF or CSV.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-200">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

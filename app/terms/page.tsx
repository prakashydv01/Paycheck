"use client";
import React from "react";

/**
 * Terms & Conditions Page - US Paycheck Calculator
 * Mobile-responsive, dark-mode compatible, clear legal language.
 */

export default function Terms(): React.ReactElement {
  const lastUpdated = "November 8, 2025";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-black text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last Updated: {lastUpdated}</p>
        </header>

        <section className="space-y-4 text-gray-200 leading-relaxed">
          <p>
            These Terms and Conditions ("Terms") govern your use of the US Paycheck Calculator
            and any related tools or services ("Service"). By accessing or using this Service,
            you agree to be bound by these Terms. If you do not agree, you must discontinue use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. No Professional or Financial Advice</h2>
          <p>
            The Service provides estimated paycheck calculations for informational and
            educational purposes only. It does not constitute financial, tax, payroll, legal, or
            accounting advice. You should consult a professional accountant, tax advisor, or
            financial planner before making financial decisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Accuracy Is Not Guaranteed</h2>
          <p>
            While we aim to provide accurate and up-to-date results, the Service relies on
            general tax tables and assumptions. Actual payroll results may vary based on changes
            in laws, employer policies, benefit elections, deductions, and individual tax
            situations. We make no guarantees regarding accuracy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. User Responsibility</h2>
          <p>
            You are responsible for verifying any output results before relying on them. Any
            decisions or actions taken based on the Service are done at your own risk. We are not
            liable for loss, damages, or harm resulting from usage of this Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Personal Data & Privacy</h2>
          <p>
            We do not store personal information entered into the calculator. For more details,
            refer to our <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <p>
            The Service, including its design, code, layout, and content, is protected by
            copyright and intellectual property laws. You may not copy, distribute, modify, or
            reproduce any part of it without express permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Changes to Terms</h2>
          <p>
            We may update these Terms occasionally. Continued use of the Service after changes
            means you accept the updated Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Contact</h2>
          <p>
            If you have any questions or concerns about these Terms, please contact us at:
          </p>
          <p className="text-blue-300">uspaycheck.com</p>
        </section>
      </div>
    </main>
  );
}

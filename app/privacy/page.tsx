"use client";
import React from "react";

/**
 * Privacy Policy Page
 * - Dark theme and mobile-friendly
 * - Clear sections covering collection, use, sharing, security, cookies, and contact
 * - Designed to pair with the US Paycheck Calculator site
 */

export default function PrivacyPolicy(): React.ReactElement {
  const lastUpdated = "November 8, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-gray-800/60 to-gray-900/60 backdrop-blur border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-300 mb-4">Last updated: {lastUpdated}</p>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to the US Paycheck Calculator. We respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains what information we collect, how we use it, with whom we share it, and the choices you have.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <ul className="list-disc ml-5 text-gray-300 leading-relaxed">
              <li><strong>Information you provide:</strong> When you contact us via the Contact form, we collect your name, email, subject, and message.</li>
              <li><strong>Calculator inputs:</strong> Inputs you enter into the paycheck calculator (salary, filing status, state, etc.) are processed in your browser to compute estimates. We do not store these inputs on the server by default unless you explicitly choose to export or submit them.</li>
              <li><strong>Technical data:</strong> We may collect non-identifying technical information automatically, such as browser type, operating system, pages visited, and IP address for analytics and to improve the service.</li>
              <li><strong>Cookies and similar technologies:</strong> We use cookies and localStorage to remember preferences (such as theme preference) and to provide a better user experience.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use collected information for the following purposes:
            </p>
            <ul className="list-disc ml-5 text-gray-300 leading-relaxed">
              <li>To operate, maintain, and improve the calculator and website.</li>
              <li>To respond to your inquiries and provide support.</li>
              <li>To analyze usage patterns and enhance features and performance.</li>
              <li>To remember preferences such as theme (light/dark) using localStorage.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc ml-5 text-gray-300 leading-relaxed">
              <li>Service providers who perform services on our behalf (hosting, analytics, email providers). These providers are contractually obligated to protect your information.</li>
              <li>When required by law or to respond to legal process.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Data Storage & Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We take reasonable technical and organizational measures to protect data. However, no method of transmission or storage is 100% secure.
              If you believe your interaction with the site presents a security issue, please contact us immediately.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Cookies & Local Storage</h2>
            <p className="text-gray-300 leading-relaxed">
              The site uses cookies and localStorage to store non-sensitive preferences like theme preference and to enable analytics. You can manage or disable cookies via your browser settings, but disabling cookies may impact functionality.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We may use third-party services for analytics, hosting, and email delivery (e.g., Google Analytics, Vercel/Netlify hosting, Formback/Formspree). These services have their own privacy policies and may collect usage data.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
            <ul className="list-disc ml-5 text-gray-300 leading-relaxed">
              <li>You can export or download your calculator results as CSV or PDF using the provided buttons; that data is stored locally in your device by the downloaded file.</li>
              <li>You can clear stored preferences by clearing localStorage in your browser or using the in-app controls (e.g., theme toggle 'System').</li>
              <li>If you wish to request deletion of any personal information we store (e.g., contact form submissions), contact us at <a href="mailto:privacy@example.com" className="underline">privacy@example.com</a>.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              This site is not directed at children under 13 and we do not knowingly collect information from children under 13. If you believe we have collected such information, please contact us to request removal.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will post the updated policy on this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">If you have questions about this policy or our practices, contact us at <a href="mailto:privacy@example.com" className="underline">privacy@example.com</a>.</p>
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

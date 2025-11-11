"use client";
import React, { useState } from "react";

/**
 * Contact page for Paycheck Calculator
 * - Dark theme, mobile-first
 * - Simple client-side validation
 * - Sends via mailto (fallback) and can copy message or download as .txt
 * - Replace `FORM_ACTION` with your form endpoint (Formspree / Netlify / server) for production
 */

const FORM_ACTION = ""; // e.g. https://formspree.io/f/your-id

export default function ContactPage(): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return false;
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return false;
    return true;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      setStatus({ ok: false, msg: "Please complete required fields and use a valid email." });
      return;
    }
    setSending(true);
    setStatus(null);

    // If FORM_ACTION is set, attempt to post. Otherwise open mail client as fallback.
    if (FORM_ACTION) {
      try {
        const res = await fetch(FORM_ACTION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });
        if (res.ok) setStatus({ ok: true, msg: "Message sent — thank you!" });
        else setStatus({ ok: false, msg: "Failed to send message. Try mailto fallback." });
      } catch (err) {
        setStatus({ ok: false, msg: "Network error. Try mailto fallback." });
      }
      setSending(false);
      return;
    }

    // Mailto fallback
    const mailto = `mailto:uspaycheck@gmail.com?subject=${encodeURIComponent(subject || 'Paycheck calculator inquiry')}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailto;
    setSending(false);
  };

  const copyToClipboard = async () => {
    const content = `Subject: ${subject}\nFrom: ${name} <${email}>\n\n${message}`;
    await navigator.clipboard.writeText(content);
    setStatus({ ok: true, msg: "Copied message to clipboard" });
  };

  const downloadTxt = () => {
    const content = `Subject: ${subject}\nFrom: ${name} <${email}>\n\n${message}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus({ ok: true, msg: 'Downloaded message as .txt' });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-gray-800/60 to-gray-900/60 backdrop-blur border border-gray-700">
          <h1 className="text-3xl font-bold mb-2">Contact / Feedback</h1>
          <p className="text-gray-300 mb-4">Have a suggestion, found a bug, or want a feature? Send us a message — we read every note.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <div className="text-sm text-gray-300 mb-1">Name *</div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-1">Email *</div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
              </label>
            </div>

            <label className="block">
              <div className="text-sm text-gray-300 mb-1">Subject</div>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Short summary" className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
            </label>

            <label className="block">
              <div className="text-sm text-gray-300 mb-1">Message *</div>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us what's up" className="w-full p-3 min-h-[140px] rounded bg-gray-800 border border-gray-700 resize-y" />
            </label>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button type="submit" disabled={sending} className="w-full sm:flex-1 py-3 rounded bg-emerald-500 text-black font-semibold">Send Message</button>
              <button type="button" onClick={copyToClipboard} className="w-full sm:flex-1 py-3 rounded border border-gray-600">Copy</button>
              <button type="button" onClick={downloadTxt} className="w-full sm:flex-1 py-3 rounded border border-gray-600">Download .txt</button>
            </div>

            {status && (
              <div className={`mt-2 p-3 rounded ${status.ok ? 'bg-emerald-800' : 'bg-rose-900'}`}>{status.msg}</div>
            )}

            <div className="mt-4 text-xs text-gray-400">
              <p>Privacy: We won't share your email. If you prefer, use the mail client fallback after clicking Send (opens your email app).</p>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-300">
            <p>Other ways to reach us:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Email: <a href="mailto:hello@example.com" className="underline">uspaycheck@gmail.com</a></li>
              
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

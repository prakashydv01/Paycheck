import type { Metadata } from "next";
import IncomeTaxArticle from "@/app/components/incometaxArticle";
import IncomeTaxCalculator from "@/app/components/incomeTaxCalc";

export const metadata: Metadata = {
  title: "Income Tax Calculator 2025 – Free US Federal Tax Calculator",
  description:
    "Use our free US income tax calculator to estimate federal income tax, FICA taxes, and take-home pay for 2025. Fast, accurate, and easy to use.",
  keywords: [
    "tax calculator",
    "income tax calculator",
    "us income tax calculator",
    "federal tax calculator",
    "2025 tax calculator",
    "take home pay calculator",
    "fica tax calculator",
  ],
  alternates: {
    canonical: "https://uspaycheck.com/income-tax-calculator",
  },
  openGraph: {
    title: "Income Tax Calculator 2025 – Estimate US Federal Taxes",
    description:
      "Calculate your US federal income tax and take-home pay instantly using our free income tax calculator.",
    url: "https://uspaycheck.com/income-tax-calculator",
    siteName: "US Paycheck",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* MAIN CALCULATOR (PRIMARY USER INTENT) */}
      <IncomeTaxCalculator />

      {/* SEO ARTICLE CONTENT (AD SENSE + RANKING) */}
      <IncomeTaxArticle />
    </>
  );
}

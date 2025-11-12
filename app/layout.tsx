import './globals.css'
import Header from '@/app/components/Header'
import Footer from './components/Footer'
import Script from 'next/script'

export const metadata = {
  title: "Paycheck Calculator | Federal & State Tax Estimator",
  description:
    "Estimate your 2025 take-home pay with accurate U.S. federal and state income tax deductions, Social Security, and Medicare.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5019867963652774"
     ></script>
      </head>
      <body className="bg-white text-gray-900 transition-colors duration-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

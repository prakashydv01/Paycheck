"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          U.S. Paycheck Calculator 2025
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Calculate your 2025 take-home pay after federal, state, and FICA taxes.
          Get accurate deductions for all 50 U.S. states.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="#calculator"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Start Calculating
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-100/30 via-transparent to-transparent dark:from-blue-900/10" />
    </section>
  )
}

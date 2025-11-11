'use client'

import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="
      bg-gradient-to-r 
      from-gray-100 via-gray-50 to-gray-100 
      text-gray-700 
      border-t border-gray-200
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      dark:text-gray-300 dark:border-gray-700
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Paycheck Next</h2>
            <p className="text-sm leading-relaxed">
              Calculate your take-home pay for any U.S. state.  
              Fast, accurate, and beautifully simple — built with Next.js.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">About</a></li>
              <li><a href="/contact" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal Terms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Legal Terms</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Disclaimer</a></li>
              <li><a href="/terms" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          
        </div>

        {/* Divider + Bottom Text */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} US Paycheck . All rights reserved.
        </div>
      </div>
    </footer>
  )
}

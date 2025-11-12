"use client";

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-white-600 to-cyan-400 p-2 shadow-md">
            {/* Optional small mark — can be an SVG or left empty for text-only brand */}
          </div>

          {/* Make the brand text visible on mobile too. Keep the short tagline hidden on xs. */}
          <div className="block leading-none">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">US Paycheck</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Fast, accurate paycheck &amp; tax tools</p>
          </div>
        </Link>

        {/* Right: Desktop navigation + Mobile menu toggle */}
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Home
            </Link>
            {/* Add other desktop links here (Calculator, About, Contact) */}
          </nav>

          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-4 top-16 z-40 transform-gpu transition-all duration-300 ease-out
          ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <span className="text-sm font-medium">Home</span>
            </Link>
            {/* Add other mobile nav items: Calculator, About, Contact */}
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="md:hidden fixed inset-0 z-30"
          aria-hidden
        />
      )}
    </header>
  )
}

'use client'

import React, { useState, useMemo } from 'react'

type Mode = 'hourly-to-salary' | 'salary-to-hourly'

const WEEKS_PER_YEAR = 52
const STANDARD_HOURS = 40 // FLSA overtime threshold for non-exempt employees
const OVERTIME_MULTIPLIER = 1.5
const MAX_HOURS = 168

// Parse typed text to a positive number (0 if empty/invalid)
const toNum = (s: string) => {
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : 0
}

export default function SalaryCalculator() {
  const [mode, setMode] = useState<Mode>('hourly-to-salary')
  // Keep raw text so users can type "24.50" (a number state would drop the trailing ".")
  const [amountText, setAmountText] = useState('')
  const [hoursText, setHoursText] = useState('40')
  const [unpaidText, setUnpaidText] = useState('')
  const [includeOvertime, setIncludeOvertime] = useState(true)

  const rate = toNum(amountText)
  const hours = toNum(hoursText)
  const unpaidWeeks = Math.min(WEEKS_PER_YEAR, toNum(unpaidText))
  const weeks = WEEKS_PER_YEAR - unpaidWeeks

  const result = useMemo(() => {
    if (!rate || !hours || weeks <= 0) return null

    if (mode === 'hourly-to-salary') {
      const weekly =
        includeOvertime && hours > STANDARD_HOURS
          ? rate * (STANDARD_HOURS + OVERTIME_MULTIPLIER * (hours - STANDARD_HOURS))
          : rate * hours
      const yearly = weekly * weeks
      return { hourly: rate, weekly, monthly: yearly / 12, yearly }
    }

    // salary to hourly: effective rate over the hours actually worked
    return {
      hourly: rate / (hours * weeks),
      weekly: rate / WEEKS_PER_YEAR,
      monthly: rate / 12,
      yearly: rate,
    }
  }, [rate, hours, weeks, mode, includeOvertime])

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[,$\s]/g, '')
    if (/^\d*\.?\d{0,2}$/.test(cleaned)) setAmountText(cleaned)
  }

  const handleHoursChange = (value: string) => {
    if (value === '') return setHoursText('')
    if (/^\d{0,3}(\.\d?)?$/.test(value) && Number(value) <= MAX_HOURS) setHoursText(value)
  }

  const handleUnpaidChange = (value: string) => {
    if (value === '') return setUnpaidText('')
    if (/^\d{0,2}$/.test(value) && Number(value) <= WEEKS_PER_YEAR) setUnpaidText(value)
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const presetHours = [20, 30, 40, 50, 60]
  const inputCls =
    'w-full pl-4 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-colors'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'

  const modeButton = (value: Mode, title: string, desc: string) => (
    <button
      type="button"
      aria-pressed={mode === value}
      onClick={() => setMode(value)}
      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
        mode === value
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="text-lg font-semibold mb-1 dark:text-white">{title}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{desc}</div>
    </button>
  )

  const cards: Array<[string, number, string]> = result
    ? [
        ['Hourly', result.hourly, 'blue'],
        ['Weekly', result.weekly, 'green'],
        ['Monthly', result.monthly, 'purple'],
        ['Yearly', result.yearly, 'amber'],
      ]
    : []

  const cardStyles: Record<string, { box: string; text: string }> = {
    blue: {
      box: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-100 dark:border-blue-800/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      box: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-100 dark:border-green-800/30',
      text: 'text-green-600 dark:text-green-400',
    },
    purple: {
      box: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-100 dark:border-purple-800/30',
      text: 'text-purple-600 dark:text-purple-400',
    },
    amber: {
      box: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-100 dark:border-amber-800/30',
      text: 'text-amber-600 dark:text-amber-400',
    },
  }

  const showOvertimeApplied = mode === 'hourly-to-salary' && includeOvertime && hours > STANDARD_HOURS

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center dark:text-white mb-2">Salary Calculator</h1>
        <p className="text-gray-600 text-center dark:text-gray-400">Convert between hourly wage and annual salary</p>
      </header>

      {/* Mode toggle */}
      <div className="mb-8">
        <span className={labelCls + ' mb-3'} id="conversion-type">
          Conversion Type
        </span>
        <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="conversion-type">
          {modeButton('hourly-to-salary', 'Hourly → Salary', 'Calculate annual salary from hourly rate')}
          {modeButton('salary-to-hourly', 'Salary → Hourly', 'Calculate hourly rate from annual salary')}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        <div className="relative">
          <label htmlFor="amount" className={labelCls}>
            {mode === 'hourly-to-salary' ? 'Hourly Wage' : 'Annual Salary'}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 dark:text-gray-400">$</div>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              value={amountText}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className={inputCls.replace('pl-4', 'pl-10')}
            />
          </div>
          <div className="mt-1 text-sm text-gray-800 dark:text-gray-400">
            {mode === 'hourly-to-salary' ? 'Enter your hourly rate' : 'Enter your annual salary (before taxes)'}
          </div>
        </div>

        <div>
          <label htmlFor="hours" className={labelCls}>
            Hours per Week
          </label>
          <div className="relative">
            <input
              id="hours"
              type="text"
              inputMode="decimal"
              value={hoursText}
              onChange={(e) => handleHoursChange(e.target.value)}
              placeholder="40"
              className={inputCls}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              hours/week
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {presetHours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHoursText(String(h))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  hours === h
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {h} hours
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="unpaid" className={labelCls}>
              Unpaid weeks off per year (optional)
            </label>
            <input
              id="unpaid"
              type="text"
              inputMode="numeric"
              value={unpaidText}
              onChange={(e) => handleUnpaidChange(e.target.value)}
              placeholder="0"
              className={inputCls}
            />
            <div className="mt-1 text-sm text-gray-800 dark:text-gray-400">
              Paid vacation and holidays don’t count. Only enter weeks you aren’t paid.
            </div>
          </div>

          {mode === 'hourly-to-salary' && (
            <div className="flex items-start gap-3 md:mt-8">
              <input
                id="overtime"
                type="checkbox"
                checked={includeOvertime}
                onChange={(e) => setIncludeOvertime(e.target.checked)}
                className="mt-1 h-5 w-5"
              />
              <label htmlFor="overtime" className="text-sm text-gray-700 dark:text-gray-300">
                Include overtime (1.5× pay for hours over 40 per week)
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  For non-exempt hourly workers. Turn off if you are exempt or your employer doesn’t pay overtime.
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Validation hint */}
      {rate > 0 && (!hours || weeks <= 0) && (
        <p role="alert" className="mb-6 text-sm text-red-600 dark:text-red-400">
          {!hours ? 'Enter hours per week greater than 0.' : 'Unpaid weeks must be fewer than 52.'}
        </p>
      )}

      {/* Results */}
      {result && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pay Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map(([label, value, color]) => (
              <div key={label} className={`${cardStyles[color].box} p-5 rounded-2xl border`}>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
                <div className={`text-2xl font-bold ${cardStyles[color].text}`}>{formatCurrency(value)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assumptions */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Assumes <span className="font-medium">{hours || 0} hours per week</span> for{' '}
          <span className="font-medium">{weeks} weeks per year</span>
          {showOvertimeApplied ? ', with overtime at 1.5× for hours over 40' : ''}. Monthly figures are yearly pay
          divided by 12.
          {mode === 'salary-to-hourly'
            ? ' The hourly figure is your effective rate over the hours you actually work.'
            : ''}
        </p>
      </div>
    </div>
  )
}
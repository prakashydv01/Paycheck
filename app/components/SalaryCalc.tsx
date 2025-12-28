'use client'

import React, { useState, useMemo } from 'react'

type Mode = 'hourly-to-salary' | 'salary-to-hourly'

const HOURS_PER_WEEK = 40
const WEEKS_PER_YEAR = 52

export default function SalaryCalculator() {
  const [mode, setMode] = useState<Mode>('hourly-to-salary')
  const [amount, setAmount] = useState<number | ''>('')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)

  const result = useMemo(() => {
    if (!amount || amount <= 0) return null

    if (mode === 'hourly-to-salary') {
      const yearly = amount * hoursPerWeek * WEEKS_PER_YEAR
      return {
        hourly: amount,
        weekly: amount * hoursPerWeek,
        monthly: yearly / 12,
        yearly,
      }
    }

    // salary to hourly
    const hourly = amount / (hoursPerWeek * WEEKS_PER_YEAR)
    return {
      hourly,
      weekly: hourly * hoursPerWeek,
      monthly: amount / 12,
      yearly: amount,
    }
  }, [amount, hoursPerWeek, mode])

  const handleAmountChange = (value: string) => {
    const numValue = value.replace(/[^0-9.]/g, '')
    if (numValue === '') {
      setAmount('')
    } else {
      const number = parseFloat(numValue)
      if (!isNaN(number)) {
        setAmount(number)
      }
    }
  }

  const handleHoursChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    if (numValue === '') {
      setHoursPerWeek(0)
    } else {
      const number = parseInt(numValue)
      if (!isNaN(number) && number >= 0 && number <= 168) {
        setHoursPerWeek(number)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const presetHours = [20, 30, 40, 50, 60]

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center dark:text-white mb-2">
          Salary Calculator
        </h1>
        <p className="text-gray-600 text-center dark:text-gray-400">
          Convert between hourly wage and annual salary
        </p>
      </header>

      {/* Mode Toggle - Card Style */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Conversion Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode('hourly-to-salary')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              mode === 'hourly-to-salary'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-lg font-semibold mb-1 dark:text-white">Hourly → Salary</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Calculate annual salary from hourly rate
            </div>
          </button>
          <button
            onClick={() => setMode('salary-to-hourly')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              mode === 'salary-to-hourly'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-lg font-semibold mb-1 dark:text-white">Salary → Hourly</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Calculate hourly rate from annual salary
            </div>
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-6 mb-8 ">
        {/* Amount Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'hourly-to-salary' ? 'Hourly Wage' : 'Annual Salary'}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 dark:text-gray-400">
              $
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amount === '' ? '' : amount.toString()}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-colors"
            />
          </div>
          <div className="mt-1 text-sm text-gray-800 dark:text-gray-400">
            {mode === 'hourly-to-salary' ? 'Enter your hourly rate' : 'Enter your annual salary'}
          </div>
        </div>

        {/* Hours per Week Input with Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hours per Week
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={hoursPerWeek}
              onChange={(e) => handleHoursChange(e.target.value)}
              className="w-full pl-4 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-colors"
              min="0"
              max="168"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              hours/week
            </div>
          </div>
          
          {/* Hours Preset Buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            {presetHours.map((hours) => (
              <button
                key={hours}
                onClick={() => setHoursPerWeek(hours)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  hoursPerWeek === hours
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {hours} hours
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Pay Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hourly</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(result.hourly)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-5 rounded-2xl border border-green-100 dark:border-green-800/30">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Weekly</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(result.weekly)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(result.monthly)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/30">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Yearly</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {formatCurrency(result.yearly)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assumptions Note */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Calculations assume <span className="font-medium">{hoursPerWeek} hours per week</span> and <span className="font-medium">{WEEKS_PER_YEAR} weeks per year</span>. 
              Monthly estimates are based on yearly salary divided by 12 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
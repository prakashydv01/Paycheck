import PaycheckCalculator from "@/app/components/paycheckCalc"
import ArticleAndFAQ from "./components/article"

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6">
      
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
               Paycheck Calculator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Estimate your federal and FICA deductions with updated 2025 brackets.
          Includes take-home pay, tax breakdown, and net salary visualization.
        </p>
        
        <PaycheckCalculator />
        <ArticleAndFAQ />
      </div>
    </main>
  )
}

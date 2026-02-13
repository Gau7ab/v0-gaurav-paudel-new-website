"use client"

import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full glass-card rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        {labels && labels[currentStep - 1] && (
          <span className="text-sm font-medium text-primary">{labels[currentStep - 1]}</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary/50 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out progress-fill"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step dots for desktop */}
      {labels && (
        <div className="hidden sm:flex items-center justify-between">
          {labels.map((label, index) => {
            const stepNum = index + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep

            return (
              <div key={index} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-br from-primary to-accent text-white shadow-md"
                      : isCurrent
                        ? "bg-primary text-white shadow-lg ring-4 ring-primary/20"
                        : "bg-secondary/80 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label.length > 12 ? label.slice(0, 10) + "..." : label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

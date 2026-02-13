import type { ReactNode } from "react"
import { Lightbulb, AlertTriangle, CheckCircle, Info, TrendingUp } from "lucide-react"

interface InsightCardProps {
  type: "insight" | "warning" | "success" | "info" | "growth"
  title: string
  children: ReactNode
  className?: string
}

const iconMap = {
  insight: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
  growth: TrendingUp,
}

const colorMap = {
  insight:
    "from-amber-50 to-orange-50 border-amber-200/50 dark:from-amber-950/30 dark:to-orange-950/30 dark:border-amber-800/30",
  warning: "from-red-50 to-rose-50 border-red-200/50 dark:from-red-950/30 dark:to-rose-950/30 dark:border-red-800/30",
  success:
    "from-emerald-50 to-teal-50 border-emerald-200/50 dark:from-emerald-950/30 dark:to-teal-950/30 dark:border-emerald-800/30",
  info: "from-blue-50 to-cyan-50 border-blue-200/50 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-800/30",
  growth:
    "from-violet-50 to-purple-50 border-violet-200/50 dark:from-violet-950/30 dark:to-purple-950/30 dark:border-violet-800/30",
}

const iconColorMap = {
  insight: "text-amber-600 dark:text-amber-400",
  warning: "text-red-600 dark:text-red-400",
  success: "text-emerald-600 dark:text-emerald-400",
  info: "text-blue-600 dark:text-blue-400",
  growth: "text-violet-600 dark:text-violet-400",
}

export function InsightCard({ type, title, children, className = "" }: InsightCardProps) {
  const Icon = iconMap[type]

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colorMap[type]} p-4 sm:p-5 backdrop-blur-sm ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 mt-0.5 ${iconColorMap[type]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1.5">{title}</h4>
          <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

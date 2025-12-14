"use client"

import * as React from "react"
import { Label } from "@radix-ui/react-label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const ChartContext = React.createContext<
  {
    config: Record<string, { label?: string; color?: string; icon?: React.ElementType }>
  } & ({ type: "bar" } | { type: "line" } | { type: "area" })
>(null as any)

function Chart({
  id,
  type = "bar",
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  id?: string
  type?: "bar" | "line" | "area"
  config: Record<string, { label?: string; color?: string; icon?: React.ElementType }>
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId}`
  return (
    <ChartContext.Provider value={{ type, config, id: chartId }}>
      <div
        data-chart={chartId}
        className={cn("flex aspect-video h-full w-full flex-col [--color-gray:220_8.9%_46.1%]")}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }
  return context
}

const ChartTooltip = React.forwardRef<React.ElementRef<typeof Tooltip>, React.ComponentPropsWithoutRef<typeof Tooltip>>(
  ({ children, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip {...props}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent ref={ref} className="shadow-lg">
            <ChartTooltipContent />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)
ChartTooltip.displayName = Tooltip.displayName

const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof ChartTooltip>,
  React.ComponentPropsWithoutRef<typeof ChartTooltip> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    nameKey?: string
    valueKey?: string
    indicator?: "dot" | "dashed" | "solid"
    labelFormatter?: (payload: any) => string
    valueFormatter?: (value: any, name: string, item: any, index: number) => string
    categoryFormatter?: (value: any) => string
  }
>(
  (
    {
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      nameKey,
      valueKey,
      labelFormatter,
      valueFormatter,
      categoryFormatter,
      className,
      ...props
    },
    ref,
  ) => {
    const { config } = useChart()

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[120px] items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-2 font-sans text-xs shadow-md",
          className,
        )}
        {...props}
      >
        {!hideLabel && (
          <div className="row-span-2 flex flex-col items-start">
            <h4 className="font-medium">
              {labelFormatter ? labelFormatter(props.payload?.[0]?.payload?.name) : props.label}
            </h4>
            {categoryFormatter && (
              <p className="text-muted-foreground">{categoryFormatter(props.payload?.[0]?.payload?.category)}</p>
            )}
          </div>
        )}
        {props.payload?.map((item: any) => {
          const key = nameKey || item.dataKey
          const name = config[key]?.label || item.name
          const value = valueKey ? item.payload[valueKey] : item.value

          if (!name || value === undefined) return null

          return (
            <div key={item.dataKey} className={cn("flex w-full items-center gap-2", hideLabel ? "pt-2" : "")}>
              {!hideIndicator && (
                <div
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    indicator === "dashed" && "rounded-none",
                    indicator === "solid" && "rounded-none h-2.5 w-1",
                  )}
                  style={{
                    backgroundColor: item.color || config[key]?.color,
                  }}
                />
              )}
              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">{name}</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {valueFormatter ? valueFormatter(value, name, item, item.index) : value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Legend>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Legend>
>(({ className, ...props }, ref) => {
  const { config } = useChart()

  return (
    <RechartsPrimitive.Legend
      {...props}
      ref={ref}
      wrapperStyle={{ ...props.wrapperStyle, position: "relative" }}
      content={({ payload }) => (
        <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
          {payload?.map((item: any) => {
            if (!item.value) return null

            const { icon: Icon } = config[item.value] || {}

            return (
              <div key={item.value} className="flex items-center gap-1.5">
                {Icon ? (
                  <Icon
                    className="h-3 w-3"
                    style={{
                      fill: item.color,
                      stroke: item.color,
                    }}
                  />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                <Label className="text-xs">{item.value}</Label>
              </div>
            )
          })}
        </div>
      )}
    />
  )
})
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Legend>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Legend>
>(({ className, ...props }, ref) => {
  const { config } = useChart()

  return (
    <RechartsPrimitive.Legend
      {...props}
      ref={ref}
      wrapperStyle={{ ...props.wrapperStyle, position: "relative" }}
      content={({ payload }) => (
        <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
          {payload?.map((item: any) => {
            if (!item.value) return null

            const { icon: Icon } = config[item.value] || {}

            return (
              <div key={item.value} className="flex items-center gap-1.5">
                {Icon ? (
                  <Icon
                    className="h-3 w-3"
                    style={{
                      fill: item.color,
                      stroke: item.color,
                    }}
                  />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                <Label className="text-xs">{item.value}</Label>
              </div>
            )
          })}
        </div>
      )}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    children: React.ReactNode
    config: ChartConfig
    id?: string
    className?: string
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId}`
  return (
    <ChartContext.Provider value={{ config, id: chartId, type: "bar" }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video h-full w-full flex-col [--color-gray:220_8.9%_46.1%]", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
    icon?: React.ElementType
  }
>

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }

import * as React from "react"
import type { ChartConfig, ChartContextProps } from "../types/chartTypes"

const ChartContext = React.createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

export { ChartContext } 
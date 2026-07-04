"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const portfolioData = [
  { month: "Sep", value: 32000 },
  { month: "Oct", value: 35400 },
  { month: "Nov", value: 33800 },
  { month: "Dec", value: 38200 },
  { month: "Jan", value: 42100 },
  { month: "Feb", value: 48250 },
]

export function PortfolioChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Portfolio Performance
        </CardTitle>
        <p className="text-2xl font-bold text-card-foreground">
          $48,250.75
          <span className="ml-2 text-sm font-normal text-accent">+50.8%</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={portfolioData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.60 0.16 145)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.60 0.16 145)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="oklch(0.90 0.005 75)"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.50 0.01 75)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.50 0.01 75)", fontSize: 12 }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.005 75)",
                  borderRadius: "8px",
                  fontSize: 13,
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Value",
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.60 0.16 145)"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

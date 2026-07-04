import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, TrendingUp, AlertTriangle, Clock, DollarSign } from "lucide-react"

const investmentPlans = [
  {
    id: "p1",
    name: "Conservative Bond Fund",
    minAmount: 1000,
    maxAmount: 100000,
    returnRate: 6.5,
    duration: "12 months",
    risk: "Low",
    description:
      "A stable, low-risk fund investing primarily in government and corporate bonds. Ideal for capital preservation with steady returns.",
  },
  {
    id: "p2",
    name: "Growth Portfolio",
    minAmount: 5000,
    maxAmount: 500000,
    returnRate: 12.8,
    duration: "6 months",
    risk: "Medium",
    description:
      "A balanced portfolio combining equities and fixed income for moderate growth. Designed for investors seeking higher returns with manageable risk.",
  },
  {
    id: "p3",
    name: "High Yield Equity Fund",
    minAmount: 10000,
    maxAmount: 1000000,
    returnRate: 22.5,
    duration: "3 months",
    risk: "High",
    description:
      "An aggressive equity fund targeting high-growth sectors. Suitable for experienced investors with higher risk tolerance.",
  },
]

const riskConfig = {
  Low: {
    icon: Shield,
    color: "text-accent",
    bg: "bg-accent/10",
    badge: "border-accent/30 text-accent",
  },
  Medium: {
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning/10",
    badge: "border-warning/30 text-warning",
  },
  High: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    badge: "border-destructive/30 text-destructive",
  },
}

export default function PlansPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Investment Plans
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse available investment strategies and start growing your
          portfolio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {investmentPlans.map((plan) => {
          const risk = riskConfig[plan.risk]
          const RiskIcon = risk.icon
          return (
            <Card
              key={plan.id}
              className="flex flex-col transition-all hover:shadow-lg hover:border-accent/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${risk.bg}`}
                    >
                      <RiskIcon className={`h-5 w-5 ${risk.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base text-card-foreground">
                        {plan.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-[10px] ${risk.badge}`}
                      >
                        {plan.risk} Risk
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {plan.returnRate}%
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Returns
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-auto grid grid-cols-3 gap-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Min</p>
                      <p className="text-xs font-semibold text-card-foreground">
                        ${plan.minAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Max</p>
                      <p className="text-xs font-semibold text-card-foreground">
                        ${plan.maxAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Duration
                      </p>
                      <p className="text-xs font-semibold text-card-foreground">
                        {plan.duration}
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-5 w-full">Invest Now</Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

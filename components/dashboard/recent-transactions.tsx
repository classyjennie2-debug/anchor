import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, RefreshCw } from "lucide-react"
import Link from "next/link"

export type RecentTransaction = {
  id: string
  type: "deposit" | "withdrawal" | "investment" | "return"
  amount: number
  status: string
  description: string
  date: string
}

const typeIcons = {
  deposit: ArrowUpRight,
  withdrawal: ArrowDownRight,
  investment: TrendingUp,
  return: RefreshCw,
}

const typeColors = {
  deposit: "text-accent",
  withdrawal: "text-destructive",
  investment: "text-foreground",
  return: "text-accent",
}

export function RecentTransactions({
  transactions,
}: {
  transactions: RecentTransaction[]
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Recent Transactions
        </CardTitle>
        <Link
          href="/dashboard/transactions"
          className="text-xs text-accent hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent transactions available.</p>
        ) : (
          transactions.map((tx) => {
            const Icon = typeIcons[tx.type]
            const color = typeColors[tx.type]
            const isPositive = tx.type === "deposit" || tx.type === "return"
            return (
              <div key={tx.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {tx.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p
                    className={`text-sm font-semibold ${isPositive ? "text-accent" : "text-card-foreground"}`}
                  >
                    {isPositive ? "+" : "-"}$
                    {tx.amount.toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      tx.status === "approved"
                        ? "secondary"
                        : tx.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                    className="text-[10px] px-1.5 py-0"
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

import { prisma } from "@/lib/db"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, DollarSign, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default async function AdminOverviewPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      balance: true,
      createdAt: true,
    },
  })

  const totalUsers = users.length
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0)
  const adminCount = users.filter((user) => user.role === "admin").length

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toString(),
      icon: Users,
      color: "text-foreground",
      bg: "bg-secondary",
      href: "/admin/users",
    },
    {
      label: "Admin Accounts",
      value: adminCount.toString(),
      icon: ShieldCheck,
      color: "text-accent",
      bg: "bg-accent/10",
      href: "/admin/users",
    },
    {
      label: "Total AUM",
      value: `$${(totalBalance / 1000).toFixed(0)}k`,
      icon: DollarSign,
      color: "text-foreground",
      bg: "bg-secondary/10",
      href: "/admin/users",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor platform activity and manage users.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-all hover:shadow-md hover:border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base text-foreground">Recent Users</CardTitle>
          <Link href="/admin/users" className="text-xs text-accent hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {users.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No users are available.
              </p>
            ) : (
              users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-secondary px-2 py-1 text-[11px] uppercase text-muted-foreground">
                      {user.role}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground">
                      ${user.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-medium text-foreground">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-card-foreground">
                  ${user.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/db"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(user.balance)

  const initials = user.name
    .split(" ")
    .map((segment) => segment[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 3,
  })

  const recentTransactions = transactions.map((transaction) => ({
    id: transaction.id,
    type: transaction.type as "deposit" | "withdrawal" | "investment" | "return",
    amount: transaction.amount,
    status: transaction.status,
    description: transaction.description,
    date: transaction.date.toISOString().split("T")[0],
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {user.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Your account is protected and authenticated. The team will continue
              building your personalized investment experience.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-secondary px-5 py-4 text-sm font-medium text-foreground">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              {initials}
            </span>
            <div className="text-left">
              <p className="text-xs uppercase text-muted-foreground">Available balance</p>
              <p className="text-lg font-semibold text-foreground">{formattedBalance}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Account summary</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Your account is authenticated with a database-backed login. Keep your
            credentials safe and use the support link if you need help.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-foreground sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Role
              </p>
              <p className="mt-2 font-semibold">{user.role}</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </p>
              <p className="mt-2 font-semibold">{user.email}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Next steps</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground">Secure your account</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use a strong password and avoid sharing it. Set a unique email
                address and review your security settings regularly.
              </p>
            </article>
            <article className="rounded-2xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground">Verify your profile</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete your profile and update your contact details before you
                make any deposits.
              </p>
            </article>
          </div>
        </section>
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  )
}

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/db"
import UserTransactions from "@/components/dashboard/user-transactions"

export default async function TransactionsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  })

  const initialTransactions = transactions.map((transaction) => ({
    id: transaction.id,
    type: transaction.type as "deposit" | "withdrawal" | "investment" | "return",
    amount: transaction.amount,
    status: transaction.status,
    description: transaction.description,
    date: transaction.date.toISOString().split("T")[0],
  }))

  return <UserTransactions initialTransactions={initialTransactions} />
}

import { prisma } from "@/lib/db"
import AdminTransactionsTable, { AdminTransaction } from "@/components/admin/admin-transactions-table"

export default async function AdminTransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      amount: true,
      status: true,
      description: true,
      date: true,
      user: { select: { name: true } },
    },
  })

  const initialTransactions: AdminTransaction[] = transactions.map((tx) => ({
    id: tx.id,
    type: tx.type as AdminTransaction["type"],
    amount: tx.amount,
    status: tx.status as AdminTransaction["status"],
    description: tx.description,
    date: tx.date.toISOString().split("T")[0],
    userName: tx.user.name,
  }))

  return <AdminTransactionsTable initialTransactions={initialTransactions} />
}

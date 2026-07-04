import { prisma } from "@/lib/db"
import AdminUsersTable, { AdminUser } from "@/components/admin/admin-users-table"

export default async function AdminUsersPage() {
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

  const initialUsers: AdminUser[] = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }))

  return <AdminUsersTable initialUsers={initialUsers} />
}

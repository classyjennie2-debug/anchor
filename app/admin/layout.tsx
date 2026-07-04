import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/get-current-user"
import AdminLayoutClient from "@/components/admin/admin-layout-client"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>
}

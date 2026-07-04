import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function getCurrentUser() {
  const session = getSession()
  if (!session) return null

  return prisma.user.findUnique({
    where: { email: session.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      balance: true,
    },
  })
}

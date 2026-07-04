import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const session = getSession()
  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." }, 
      { status: 401 }
    )
  }

  const wallet = await prisma.walletAddress.findFirst({
    where: { assignedToId: session.userId },
    orderBy: { assignedAt: "desc" },
  })

  if (!wallet) {
    return NextResponse.json({ wallet: null })
  }

  return NextResponse.json({
    wallet: {
      id: wallet.id,
      coin: wallet.coin,
      network: wallet.network,
      address: wallet.address,
      assignedAt: wallet.assignedAt?.toISOString().split("T")[0] ?? null,
      createdAt: wallet.createdAt.toISOString().split("T")[0],
    },
  })
}

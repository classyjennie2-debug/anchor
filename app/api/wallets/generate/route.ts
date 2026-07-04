import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const session = getSession()
  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 }
    )
  }

  const { coin, network } = await req.json()

  if (!coin || !network) {
    return NextResponse.json(
      { message: "Coin and network are required." },
      { status: 400 }
    )
  }

  const wallet = await prisma.walletAddress.findFirst({
    where: {
      coin,
      network,
      assignedToId: null,
    },
    orderBy: { createdAt: "asc" },
  })

  if (!wallet) {
    return NextResponse.json(
      {
        message: `No available ${coin} address on ${network}. Please try a different network or contact support.`,
      },
      { status: 404 }
    )
  }

  const updatedWallet = await prisma.walletAddress.update({
    where: { id: wallet.id },
    data: {
      assignedToId: session.userId,
      assignedAt: new Date(),
    },
  })

  return NextResponse.json({
    wallet: {
      id: updatedWallet.id,
      coin: updatedWallet.coin,
      network: updatedWallet.network,
      address: updatedWallet.address,
      assignedAt: updatedWallet.assignedAt?.toISOString().split("T")[0] ?? null,
      createdAt: updatedWallet.createdAt.toISOString().split("T")[0],
    },
  })
}

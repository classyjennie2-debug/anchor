import { prisma } from "@/lib/db"
import AdminWalletsManager, { WalletAddress } from "@/components/admin/admin-wallets-manager"

export default async function AdminWalletsPage() {
  const wallets = await prisma.walletAddress.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignedTo: { select: { name: true } } },
  })

  const initialWallets: WalletAddress[] = wallets.map((wallet) => ({
    id: wallet.id,
    coin: wallet.coin as WalletAddress["coin"],
    network: wallet.network,
    address: wallet.address,
    assignedTo: wallet.assignedToId ?? null,
    assignedToName: wallet.assignedTo?.name ?? null,
    assignedAt: wallet.assignedAt?.toISOString().split("T")[0] ?? null,
    createdAt: wallet.createdAt.toISOString().split("T")[0],
  }))

  return <AdminWalletsManager initialWallets={initialWallets} />
}

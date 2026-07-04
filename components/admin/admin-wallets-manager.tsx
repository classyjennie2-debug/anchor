"use client"

import { useEffect, useState } from "react"
import { CoinIcon } from "@/components/crypto/coin-icon"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Wallet, Trash2, User, Search } from "lucide-react"

export type WalletAddress = {
  id: string
  coin: "USDT" | "BTC" | "ETH" | "BNB" | "TRX" | "SOL"
  network: string
  address: string
  assignedTo: string | null
  assignedToName: string | null
  assignedAt: string | null
  createdAt: string
}

const allCoins: WalletAddress["coin"][] = ["USDT", "BTC", "ETH", "BNB", "TRX", "SOL"]

const coinNetworks = {
  USDT: ["TRC20", "ERC20", "BEP20", "USDT0"],
  BTC: ["BTC"],
  ETH: ["ERC20"],
  BNB: ["BEP20"],
  TRX: ["TRC20"],
  SOL: ["SOL"],
} as const

const coinDetails = {
  USDT: { name: "Tether", color: "#26A17B", bgColor: "rgba(38,161,123,0.12)" },
  BTC: { name: "Bitcoin", color: "#F7931A", bgColor: "rgba(247,147,26,0.12)" },
  ETH: { name: "Ethereum", color: "#627EEA", bgColor: "rgba(98,126,234,0.12)" },
  BNB: { name: "BNB", color: "#F3BA2F", bgColor: "rgba(243,186,47,0.12)" },
  TRX: { name: "Tron", color: "#FF0013", bgColor: "rgba(255,0,19,0.12)" },
  SOL: { name: "Solana", color: "#9945FF", bgColor: "rgba(153,69,255,0.12)" },
} as const

export default function AdminWalletsManager({
  initialWallets,
}: {
  initialWallets: WalletAddress[]
}) {
  const [walletPool, setWalletPool] = useState<WalletAddress[]>(initialWallets)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCoin, setNewCoin] = useState<WalletAddress["coin"]>("USDT")
  const [newNetwork, setNewNetwork] = useState<string>("TRC20")
  const [newAddress, setNewAddress] = useState("")
  const [filterCoin, setFilterCoin] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    const version = localStorage.getItem("vault_wallet_version")
    if (version !== "2") {
      localStorage.setItem("vault_wallet_version", "2")
      localStorage.setItem("vault_wallet_pool", JSON.stringify(walletPool))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("vault_wallet_pool", JSON.stringify(walletPool))
  }, [walletPool])

  const handleAddWallet = () => {
    if (!newAddress.trim()) return

    const wallet: WalletAddress = {
      id: `w${Date.now()}`,
      coin: newCoin,
      network: newNetwork,
      address: newAddress.trim(),
      assignedTo: null,
      assignedToName: null,
      assignedAt: null,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setWalletPool((prev) => [...prev, wallet])
    setNewAddress("")
    setDialogOpen(false)
  }

  const handleDeleteWallet = (id: string) => {
    setWalletPool((prev) => prev.filter((wallet) => wallet.id !== id))
    setDeleteConfirmId(null)
  }

  const filteredWallets = walletPool.filter((wallet) => {
    if (filterCoin !== "all" && wallet.coin !== filterCoin) return false
    if (
      searchQuery &&
      !wallet.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const availableWallets = walletPool.filter((wallet) => !wallet.assignedTo)
  const assignedWallets = walletPool.filter((wallet) => wallet.assignedTo)

  const statsByMCoin = allCoins.map((coin) => {
    const all = walletPool.filter((wallet) => wallet.coin === coin)
    const available = all.filter((wallet) => !wallet.assignedTo)
    return { coin, total: all.length, available: available.length }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Wallet Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage deposit wallet addresses for the platform.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Wallet Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wallet Address</DialogTitle>
              <DialogDescription>
                Add a new deposit wallet address to the pool.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Coin</Label>
                <Select value={newCoin} onValueChange={(value) => setNewCoin(value as WalletAddress["coin"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select coin" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCoins.map((coin) => (
                      <SelectItem key={coin} value={coin}>
                        {coin} - {coinDetails[coin].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Network</Label>
                <Select value={newNetwork} onValueChange={(value) => setNewNetwork(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    {coinNetworks[newCoin].map((network) => (
                      <SelectItem key={network} value={network}>
                        {network}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Wallet Address</Label>
                <Input
                  placeholder="Enter wallet address..."
                  value={newAddress}
                  onChange={(event) => setNewAddress(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddWallet} disabled={!newAddress.trim()}>
                Add Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsByMCoin.map((stat) => (
          <Card key={stat.coin}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.coin} Wallets</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">{stat.total}</p>
                  <p className="text-xs text-muted-foreground">{stat.available} available</p>
                </div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: coinDetails[stat.coin].bgColor }}
                >
                  <CoinIcon coin={stat.coin} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All ({walletPool.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableWallets.length})</TabsTrigger>
            <TabsTrigger value="assigned">Assigned ({assignedWallets.length})</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-56 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search address..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-9 font-mono text-xs"
              />
            </div>
            <Select value={filterCoin} onValueChange={(value) => setFilterCoin(value)}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Coin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coins</SelectItem>
                {allCoins.map((coin) => (
                  <SelectItem key={coin} value={coin}>
                    {coin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <WalletTable
            wallets={filteredWallets}
            onDelete={(id) => setDeleteConfirmId(id)}
          />
        </TabsContent>
        <TabsContent value="available" className="mt-4">
          <WalletTable
            wallets={filteredWallets.filter((wallet) => !wallet.assignedTo)}
            onDelete={(id) => setDeleteConfirmId(id)}
          />
        </TabsContent>
        <TabsContent value="assigned" className="mt-4">
          <WalletTable
            wallets={filteredWallets.filter((wallet) => wallet.assignedTo)}
            onDelete={(id) => setDeleteConfirmId(id)}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Wallet Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this wallet address from the pool?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDeleteWallet(deleteConfirmId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function WalletTable({
  wallets,
  onDelete,
}: {
  wallets: WalletAddress[]
  onDelete: (id: string) => void
}) {
  if (wallets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Wallet className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No wallet addresses found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Coin</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Network</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Assigned To</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr key={wallet.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CoinIcon coin={wallet.coin} size={20} />
                      <span className="text-sm font-medium text-card-foreground">{wallet.coin}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {wallet.network}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    {wallet.assignedTo ? (
                      <Badge variant="secondary" className="bg-warning/10 text-warning-foreground text-xs">
                        Assigned
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                        Available
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {wallet.assignedToName ? (
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-card-foreground">{wallet.assignedToName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">--</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(wallet.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete wallet</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 p-4 md:hidden">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="flex flex-col gap-3 rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CoinIcon coin={wallet.coin} size={20} />
                  <span className="text-sm font-medium text-card-foreground">{wallet.coin}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {wallet.network}
                  </Badge>
                </div>
                {wallet.assignedTo ? (
                  <Badge variant="secondary" className="bg-warning/10 text-warning-foreground text-[10px]">
                    Assigned
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-[10px]">
                    Available
                  </Badge>
                )}
              </div>
              <code className="break-all text-xs text-muted-foreground">{wallet.address}</code>
              <div className="flex items-center justify-between">
                {wallet.assignedToName ? (
                  <div className="flex items-center gap-1.5">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-card-foreground">{wallet.assignedToName}</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">No owner</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(wallet.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete wallet</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

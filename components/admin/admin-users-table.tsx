"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, DollarSign, Edit3, X, Check, Users } from "lucide-react"

export type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  balance: number
  createdAt: string
}

export default function AdminUsersTable({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [search, setSearch] = useState("")
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [newBalance, setNewBalance] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleUpdateBalance = (userId: string) => {
    const amount = parseFloat(newBalance)
    if (isNaN(amount) || amount < 0) return

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, balance: amount } : user
      )
    )
    setEditingUser(null)
    setNewBalance("")
  }

  const totalAUM = users.reduce((sum, user) => sum + user.balance, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Manage Users
        </h1>
        <p className="text-sm text-muted-foreground">
          View, search, and review users stored in the application database.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Users className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-lg font-bold text-card-foreground">
                  {users.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Assets Under Management</p>
                <p className="text-lg font-bold text-card-foreground">
                  ${totalAUM.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-col gap-4">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-sm text-muted-foreground">
                No users found.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="transition-all hover:shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
                      {user.name
                        .split(" ")
                        .map((segment) => segment[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {editingUser === user.id ? (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor={`balance-${user.id}`} className="sr-only">
                            New balance
                          </Label>
                          <Input
                            id={`balance-${user.id}`}
                            type="number"
                            placeholder="New balance"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            className="h-9 w-36"
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-accent hover:text-accent"
                          onClick={() => handleUpdateBalance(user.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Confirm</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-muted-foreground"
                          onClick={() => {
                            setEditingUser(null)
                            setNewBalance("")
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Balance</p>
                          <p className="text-lg font-bold text-card-foreground">
                            ${user.balance.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user.id)
                            setNewBalance(user.balance.toString())
                          }}
                        >
                          <Edit3 className="mr-1.5 h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

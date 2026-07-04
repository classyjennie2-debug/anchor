"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: string
  balance: number
}

export default function DashboardShell({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Dashboard</p>
            <p className="text-xs text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-2xl border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground">
              {user.role.toUpperCase()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-8">{children}</main>
    </div>
  )
}

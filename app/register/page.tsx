"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      setLoading(false)

      if (!res.ok) {
        setError(data?.message || "Unable to register.")
        return
      }

      router.push("/dashboard")
    } catch (err) {
      setLoading(false)
      setError("Network error")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: visual panel */}
      <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5">
            <Image src="/anchor.svg" alt="Anchor Capital" width={48} height={36} />
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground">
            Start Your Journey
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
            Join investors using Anchor Capital to build and grow their wealth with
            real account access and secure credentials.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="flex items-center gap-2 mb-10">
          <Image src="/anchor.svg" alt="Anchor Capital" width={128} height={96} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Register with credentials stored securely in the database.
        </p>

        <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Alexandra Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>
          <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

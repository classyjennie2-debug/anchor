"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              About Anchor Capital
            </h1>
            <p className="text-lg text-muted-foreground">
              We're building the future of investing. Anchor Capital democratizes
              access to institutional-grade investment strategies for everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower investors of all sizes with professional-grade portfolio
              management tools and strategies. We believe everyone deserves access
              to sophisticated investment solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Our Values</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Transparency</strong> - We
                clearly communicate our fees, strategies, and performance.
              </li>
              <li>
                <strong className="text-foreground">Integrity</strong> - Your trust
                is our most valuable asset.
              </li>
              <li>
                <strong className="text-foreground">Innovation</strong> - We
                continuously improve our platform to serve you better.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-primary-foreground">
              Ready to invest?
            </h3>
            <Button asChild variant="secondary" size="lg">
              <Link href="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

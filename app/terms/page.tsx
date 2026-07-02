"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Terms of Service
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Anchor Capital, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Use License
            </h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Anchor Capital for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not: modify or copy the materials, use the materials for any
              commercial purpose or for any public display.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Investment Risk Disclaimer
            </h2>
            <p className="text-muted-foreground">
              All investments carry risk. Past performance does not guarantee
              future results. Anchor Capital does not provide financial advice. 
              Please conduct your own research or consult with a financial
              professional before making investment decisions.
            </p>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-primary-foreground">
              Have questions?
            </h3>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

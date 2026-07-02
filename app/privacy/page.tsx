"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Your Privacy Matters</h2>
            <p className="text-muted-foreground">
              At Anchor Capital, we are committed to protecting your personal
              information and your right to privacy. This Privacy Policy explains
              our online information practices and the choices you can make about
              how your information is used.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect information you voluntarily provide to us when you create
              an account, such as your name, email address, and investment
              preferences. We also collect usage data to improve our services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              How We Protect Your Data
            </h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, alteration, disclosure,
              or destruction.
            </p>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-primary-foreground">
              Questions about our privacy practices?
            </h3>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

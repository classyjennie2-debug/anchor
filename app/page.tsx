"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  BarChart3,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: TrendingUp,
    title: "Automated Execution",
    description:
      "Streamline your investment strategy with automated portfolio rebalancing and smart order execution.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Create custom risk policies, monitor exposure limits, and receive real-time alerts on portfolio changes.",
  },
  {
    icon: BarChart3,
    title: "Custom Strategies",
    description:
      "Build personalized investment strategies, automate reinvestment schedules, and optimize your returns.",
  },
]

const stats = [
  { label: "Assets Under Management", value: "$2.4B+" },
  { label: "Active Investors", value: "50,000+" },
  { label: "Average Annual Return", value: "12.8%" },
  { label: "Countries Served", value: "35+" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/anchor.svg" alt="Anchor Capital" width={128} height={96} />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#stats"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Performance
          </Link>
          <Link
            href="#plans"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Plans
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">
              Get Started
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 pt-32 pb-20 text-center lg:pt-44 lg:pb-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Now serving 50,000+ investors worldwide
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">
            Institutional-Grade Investing for Everyone
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Deploy your capital into diversified portfolios designed by
          professionals. Our platform powers investment strategies for firms
          managing $2.4B+ in assets.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="h-12 px-8 text-base" asChild>
            <Link href="/register">
              Start Investing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base"
            asChild
          >
            <Link href="/login">View Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium tracking-wider text-accent uppercase">
              Platform Features
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">
                Everything you need to grow your wealth
              </span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        id="stats"
        className="border-y border-border bg-primary px-6 py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary-foreground md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-primary-foreground/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans preview */}
      <section id="plans" className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium tracking-wider text-accent uppercase">
              Investment Plans
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">
                Choose a strategy that fits your goals
              </span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Conservative",
                rate: "6.5%",
                risk: "Low Risk",
                min: "$1,000",
              },
              {
                name: "Growth",
                rate: "12.8%",
                risk: "Medium Risk",
                min: "$5,000",
                featured: true,
              },
              {
                name: "High Yield",
                rate: "22.5%",
                risk: "High Risk",
                min: "$10,000",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition-all ${
                  plan.featured
                    ? "border-accent bg-accent/5 shadow-lg"
                    : "border-border bg-card hover:border-accent/30"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.risk}
                </p>
                <p className="mt-6 text-4xl font-bold text-foreground">
                  {plan.rate}
                </p>
                <p className="text-sm text-muted-foreground">annual return</p>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Minimum investment: {plan.min}
                  </p>
                </div>
                <Button
                  className="mt-6 w-full"
                  variant={plan.featured ? "default" : "outline"}
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 lg:px-12 lg:py-28 bg-card">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium tracking-wider text-accent uppercase">
              What Our Investors Say
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">
                Trusted by leading investors worldwide
              </span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Alexandra Chen",
                role: "Fund Manager",
                testimonial:
                  "Anchor Capital's platform has transformed how we manage our portfolios. The automated execution and risk management tools are industry-leading.",
                avatar: "AC",
              },
              {
                name: "James Morrison",
                role: "Investor",
                testimonial:
                  "I've been investing for 15 years, and this is the best platform I've used. The returns speak for themselves—12.8% annually on my growth portfolio.",
                avatar: "JM",
              },
              {
                name: "Sarah Patel",
                role: "Portfolio Manager",
                testimonial:
                  "The institutional-grade strategies combined with the user-friendly interface make this platform perfect for both professionals and newcomers.",
                avatar: "SP",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-10 text-center md:p-16">
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            <span className="text-balance">
              Ready to start building wealth?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Join thousands of investors who trust Anchor Capital to manage and grow their
            portfolios with institutional-grade strategies.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-12 px-8"
            asChild
          >
            <Link href="/register">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-16 lg:px-12 bg-card">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <Image src="/anchor.svg" alt="Anchor Capital" width={100} height={75} />
              </div>
              <p className="text-sm text-muted-foreground">
                Institutional-grade investment platform for everyone.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#plans" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {"© 2026 Anchor Capital. All rights reserved."}
            </p>
            <p className="text-xs text-muted-foreground">
              Anchor Capital is a financial platform. Please invest responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

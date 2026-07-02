"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "Getting Started with Anchor Capital",
      date: "July 2, 2026",
      excerpt:
        "Learn how to set up your first investment portfolio and start growing your wealth.",
      slug: "getting-started",
    },
    {
      title: "Understanding Investment Risk",
      date: "June 28, 2026",
      excerpt:
        "A deep dive into risk management strategies and how to build a portfolio that matches your goals.",
      slug: "investment-risk",
    },
    {
      title: "Top 5 Investment Strategies for 2026",
      date: "June 21, 2026",
      excerpt:
        "Discover the investment strategies used by top portfolio managers and how you can implement them.",
      slug: "top-strategies",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Anchor Capital Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, tips, and strategies to help you make informed investment
            decisions.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-border bg-card p-8 hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <time className="text-sm text-muted-foreground">
                    {post.date}
                  </time>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {post.title}
                  </h2>
                </div>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-primary-foreground">
            Ready to start investing?
          </h3>
          <Button asChild variant="secondary" size="lg">
            <Link href="/register">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

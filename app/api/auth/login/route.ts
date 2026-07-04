import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyPassword, createSessionCookie } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      )
    }

    if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
      return NextResponse.json(
        { message: "Database not configured. Set DATABASE_URL or DB_HOST." },
        { status: 501 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      )
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      )
    }

    createSessionCookie({ userId: user.id, role: user.role, email: user.email })

    return NextResponse.json({ role: user.role })
  } catch (err) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 })
  }
}

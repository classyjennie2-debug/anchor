import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { createSessionCookie, hashPassword } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      )
    }

    if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
      return NextResponse.json(
        { message: "Database not configured. Set DATABASE_URL or DB_HOST." },
        { status: 501 }
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { message: "An account with that email already exists." },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        balance: 0,
      },
    })

    createSessionCookie({ userId: user.id, role: user.role, email: user.email })

    return NextResponse.json({ message: "Registration successful." })
  } catch (err) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 })
  }
}

import bcrypt from "bcryptjs"
import { cookies, headers } from "next/headers"
import { createHmac } from "crypto"

const SESSION_COOKIE_NAME = "session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const SESSION_SECRET = process.env.SESSION_SECRET || "change-this-secret"

type SessionPayload = {
  userId: string
  role: string
  email: string
}

function sign(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex")
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function createSessionCookie(payload: SessionPayload) {
  const cookieStore = cookies()
  const serialized = JSON.stringify(payload)
  const encoded = Buffer.from(serialized).toString("base64")
  const signature = sign(encoded)

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: `${encoded}.${signature}`,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
}

function getCookieValue(name: string) {
  const cookieStore = cookies()

  if (typeof cookieStore.get === "function") {
    return cookieStore.get(name)?.value ?? null
  }

  const rawCookie = headers().get("cookie")
  if (!rawCookie) return null

  const cookiesMap = new Map(
    rawCookie.split(";").map((cookie) => {
      const [key, ...rest] = cookie.split("=")
      return [key.trim(), rest.join("=").trim()]
    }),
  )

  return cookiesMap.get(name) ?? null
}

export function getSession() {
  const cookieValue = getCookieValue(SESSION_COOKIE_NAME)
  if (!cookieValue) return null

  const [encoded, signature] = cookieValue.split(".")
  if (!encoded || !signature) return null
  if (sign(encoded) !== signature) return null

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"))
    return payload as SessionPayload
  } catch {
    return null
  }
}

export function clearSession() {
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
}

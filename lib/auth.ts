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

  if (typeof cookieStore.getAll === "function") {
    const items = cookieStore.getAll()
    if (Array.isArray(items)) {
      const item = items.find((cookie: any) => cookie?.name === name)
      return item?.value ?? null
    }
  }

  if (typeof cookieStore.toString === "function") {
    const cookieString = cookieStore.toString()
    const parsed = parseCookieHeader(cookieString)
    return parsed.get(name) ?? null
  }

  const rawCookie = getRawCookieHeader()
  if (!rawCookie) return null

  const cookiesMap = parseCookieHeader(rawCookie)
  return cookiesMap.get(name) ?? null
}

function getRawCookieHeader() {
  const headersStore = headers()
  if (!headersStore) return null

  if (typeof headersStore.get === "function") {
    return headersStore.get("cookie") ?? null
  }

  if (typeof headersStore.getAll === "function") {
    const value = headersStore.getAll("cookie")
    if (Array.isArray(value)) {
      return value.join("; ")
    }
    return typeof value === "string" ? value : null
  }

  if (typeof headersStore.cookie === "string") {
    return headersStore.cookie
  }

  if (typeof headersStore.Cookie === "string") {
    return headersStore.Cookie
  }

  if (typeof headersStore.entries === "function") {
    for (const entry of headersStore.entries()) {
      const [key, value] = Array.isArray(entry) ? entry : []
      if (typeof key === "string" && key.toLowerCase() === "cookie") {
        return String(value)
      }
    }
  }

  if (headersStore.request?.headers) {
    return headersStore.request.headers.cookie ?? null
  }

  return null
}

function parseCookieHeader(cookieHeader: string) {
  return new Map(
    cookieHeader.split(";").map((cookie) => {
      const [key, ...rest] = cookie.split("=")
      return [key.trim(), rest.join("=").trim()]
    }),
  )
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

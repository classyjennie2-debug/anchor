import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@anchorcapital.bond" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@anchorcapital.bond",
      password: passwordHash,
      role: "admin",
      balance: 0,
    },
  })

  const alex = await prisma.user.upsert({
    where: { email: "alex@example.com" },
    update: {},
    create: {
      name: "Alexandra Chen",
      email: "alex@example.com",
      password: passwordHash,
      role: "user",
      balance: 48250.75,
    },
  })

  const maya = await prisma.user.upsert({
    where: { email: "maya@example.com" },
    update: {},
    create: {
      name: "Maya Patel",
      email: "maya@example.com",
      password: passwordHash,
      role: "user",
      balance: 34920.5,
    },
  })

  const ryan = await prisma.user.upsert({
    where: { email: "ryan@example.com" },
    update: {},
    create: {
      name: "Ryan Kim",
      email: "ryan@example.com",
      password: passwordHash,
      role: "user",
      balance: 15840,
    },
  })

  await prisma.transaction.createMany({
    skipDuplicates: true,
    data: [
      {
        type: "deposit",
        amount: 10000,
        status: "approved",
        description: "Bank transfer deposit",
        date: new Date("2026-02-28"),
        userId: alex.id,
      },
      {
        type: "investment",
        amount: 5000,
        status: "approved",
        description: "Growth Portfolio investment",
        date: new Date("2026-02-25"),
        userId: maya.id,
      },
      {
        type: "return",
        amount: 1250.75,
        status: "approved",
        description: "Monthly return - Growth Portfolio",
        date: new Date("2026-02-20"),
        userId: ryan.id,
      },
      {
        type: "withdrawal",
        amount: 2500,
        status: "pending",
        description: "User withdrawal request",
        date: new Date("2026-02-26"),
        userId: alex.id,
      },
      {
        type: "deposit",
        amount: 7200,
        status: "pending",
        description: "ACH deposit pending approval",
        date: new Date("2026-03-01"),
        userId: ryan.id,
      },
    ],
  })

  await prisma.walletAddress.createMany({
    skipDuplicates: true,
    data: [
      {
        coin: "USDT",
        network: "TRC20",
        address: "TXqH4JBkVBY9JFGiPqjE3bWz2TcxY7k8Rd",
        assignedAt: null,
        createdAt: new Date("2026-01-15"),
      },
      {
        coin: "USDT",
        network: "TRC20",
        address: "TNpGCEmRbR5zLwjvTYASX2qFa6s6doLcv8",
        assignedToId: alex.id,
        assignedAt: new Date("2026-02-20"),
        createdAt: new Date("2026-01-15"),
      },
      {
        coin: "BTC",
        network: "BTC",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        assignedAt: null,
        createdAt: new Date("2026-01-18"),
      },
      {
        coin: "ETH",
        network: "ERC20",
        address: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B",
        assignedAt: null,
        createdAt: new Date("2026-01-22"),
      },
      {
        coin: "BNB",
        network: "BEP20",
        address: "0xF1e2D3c4B5a6F7e8D9c0B1a2F3e4D5c6B7a8F9e0",
        assignedAt: null,
        createdAt: new Date("2026-01-25"),
      },
      {
        coin: "SOL",
        network: "SOL",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        assignedAt: null,
        createdAt: new Date("2026-02-05"),
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

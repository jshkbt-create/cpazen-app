import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { redis } from "@/lib/redis"

export async function GET() {
  const checks = {
    database: false,
    redis: false,
    timestamp: new Date().toISOString(),
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = true
  } catch {
    // Database down
  }

  try {
    await redis.ping()
    checks.redis = true
  } catch {
    // Redis down
  }

  const healthy = checks.database && checks.redis

  return NextResponse.json(checks, {
    status: healthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}

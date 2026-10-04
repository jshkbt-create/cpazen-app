import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const insights = await prisma.aiInsight.findMany({
    where: {
      userId: user.id,
      dismissed: false,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return NextResponse.json(insights)
}

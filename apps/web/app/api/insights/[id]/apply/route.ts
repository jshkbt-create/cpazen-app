import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const insight = await prisma.aiInsight.update({
    where: {
      id: params.id,
      userId: user.id,
    },
    data: {
      applied: true,
      appliedAt: new Date(),
    },
  })

  return NextResponse.json(insight)
}

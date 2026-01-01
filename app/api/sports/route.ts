import { NextResponse } from "next/server"
import type { SportRecord } from "@/lib/types"

const SPORTS: SportRecord[] = [
  { id: "s1", name: "Athletics", category: "Field & Track", participants: "Many", status: "Ongoing" },
]

export async function GET() {
  return NextResponse.json(SPORTS)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = { id, ...(body as Partial<SportRecord>) }
  return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
}

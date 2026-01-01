import { NextResponse } from "next/server"
import type { Medal } from "@/lib/types"

const MEDALS: Medal[] = [
  { id: "m1", athleteId: "a1", eventId: "1", date: "2025-10-12", medalType: "Gold", sport: "Boxing" },
]

export async function GET() {
  return NextResponse.json(MEDALS)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = { id, ...(body as Partial<Medal>) }
  return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
}

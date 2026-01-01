import { NextResponse } from "next/server"
import type { Event } from "@/lib/types"

const EVENTS: Event[] = [
  { id: "1", name: "32nd SEA GAMES", startDate: "2026-11-09", endDate: "2026-11-16", sports: ["Athletics"] },
]

export async function GET() {
  return NextResponse.json(EVENTS)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = { id, ...(body as Partial<Event>) }
  // In-memory for now - return created
  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}

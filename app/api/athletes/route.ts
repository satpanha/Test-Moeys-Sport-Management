import { NextResponse } from "next/server"
import type { Athlete } from "@/lib/types"

const ATHLETES: Athlete[] = [
  { id: "a1", name: "Sokha Mean", province: "Phnom Penh", sport: "Athletics", status: "Approved", medals: { gold: 1, silver: 0, bronze: 0 } },
]

export async function GET() {
  return NextResponse.json(ATHLETES)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = { id, ...(body as Partial<Athlete>) }
  return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
}

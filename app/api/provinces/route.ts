import { NextResponse } from "next/server"

const PROVINCES = [
  { id: "p1", name: "Phnom Penh", country: "Cambodia" },
]

export async function GET() {
  return NextResponse.json(PROVINCES)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = String(Date.now())
  const created = { id, ...(body as any) }
  return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
}

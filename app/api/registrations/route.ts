import { NextResponse } from "next/server"

const REGISTRATIONS: any[] = []

export async function GET() {
  return NextResponse.json(REGISTRATIONS)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `r_${Date.now()}`
    const created = { id, createdAt: new Date().toISOString(), ...body }
    REGISTRATIONS.unshift(created)
    return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 400, headers: { "Content-Type": "application/json" } })
  }
}

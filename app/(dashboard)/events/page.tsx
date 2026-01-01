"use client"

import { useState } from "react"
import { EventsSection } from "@/components/dashboard"
import type { Event } from "@/lib/types"
import { useRouter } from "next/navigation"

const INITIAL_EVENTS: Event[] = [
  { id: "1", name: "32nd SEA GAMES", startDate: "2026-11-09", endDate: "2026-11-16", sports: ["Athletics", "Ball Games"] },
  { id: "2", name: "National Youth Sports", startDate: "2026-12-01", endDate: "2026-12-10", sports: ["Traditional Sport"] },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const router = useRouter()

  const handleSelect = (id: string | null) => {
    if (id) router.push(`/?event=${id}&view=dashboard`)
    else router.push("/")
  }

  return (
    <div className="p-6">
      <EventsSection events={events} onCreate={(e) => setEvents([e, ...events])} onSelect={handleSelect} />
    </div>
  )
}

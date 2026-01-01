"use client"

import { Suspense } from "react"
import type { Event, Athlete } from "@/lib/types"
import { DashboardContent } from "@/components/dashboard-content"

// Mock data
const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    name: "32nd SEA GAMES",
    startDate: "2026-11-09",
    endDate: "2026-11-16",
    sports: ["Athletics", "Ball Games", "Martial Arts"],
  },
  {
    id: "2",
    name: "National Youth Sports",
    startDate: "2026-12-01",
    endDate: "2026-12-10",
    sports: ["Traditional Sport", "Athletics"],
  },
]

const ATHLETES_DATA: Record<string, Athlete[]> = {
  "1": [
    {
      id: "a1", name: "Sokha Mean", province: "Phnom Penh", medals: { gold: 1, silver: 0, bronze: 1 },
      sport: "",
      status: "Approved"
    },
    {
      id: "a2", name: "Dara Van", province: "Siem Reap", medals: { gold: 0, silver: 1, bronze: 0 },
      sport: "",
      status: "Approved"
    },
  ],
  "2": [
    {
      id: "a1", name: "Sokha Mean", province: "Phnom Penh", medals: { gold: 0, silver: 2, bronze: 0 },
      sport: "",
      status: "Approved"
    },
    {
      id: "a3", name: "Bora Khem", province: "Battambang", medals: { gold: 1, silver: 0, bronze: 0 },
      sport: "",
      status: "Approved"
    },
  ],
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  )
}

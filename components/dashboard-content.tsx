"use client"

import { useState, useEffect } from "react"
import type { Event, Athlete, SportRecord, Medal } from "@/lib/types"
import {
  Search,
  Bell,
  Calendar,
  Users,
  Trophy,
  Map,
  MedalIcon,
  Eye,
  Pencil,
  Trash2,
  Download,
  Plus,
  Edit2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateEventDialog, EventCard } from "@/components/events"
import { DashboardBanner, DashboardStatsGrid, EventsSection, QuickActions, AthletesSection, SportsSection, ProvincesSection } from "@/components/dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MedalsView } from "@/components/medals"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

const SPORTS_DATA: SportRecord[] = [
  { id: "s1", name: "Basketball", category: "Team Sports", participants: "144/12", status: "Completed" },
  { id: "s2", name: "Swimming", category: "Aquatics", participants: "96/8", status: "Ongoing" },
  { id: "s3", name: "Athletics", category: "Track & Field", participants: "128/16", status: "Ongoing" },
  { id: "s4", name: "Volleyball", category: "Team Sports", participants: "108/12", status: "Upcoming" },
  { id: "s5", name: "Badminton", category: "Racquet Sports", participants: "64/4", status: "Completed" },
]

const ATHLETES_DATA: Record<string, Athlete[]> = {
  "1": [
    {
      id: "a1",
      name: "SAT PANHA",
      province: "Phnom Penh",
      sport: "Boxing",
      status: "Approved",
      medals: { gold: 1, silver: 0, bronze: 0 },
    },
    {
      id: "a2",
      name: "Choun Rathanak",
      province: "Siem Reap",
      sport: "Badminton",
      status: "Approved",
      medals: { gold: 0, silver: 1, bronze: 0 },
    },
  ],
  "2": [
    {
      id: "a1",
      name: "SAT PANHA",
      province: "Phnom Penh",
      sport: "Boxing",
      status: "Approved",
      medals: { gold: 0, silver: 2, bronze: 0 },
    },
    {
      id: "a3",
      name: "Bora Khem",
      province: "Battambang",
      sport: "Swimming",
      status: "Pending",
      medals: { gold: 1, silver: 0, bronze: 0 },
    },
  ],
}

export function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const eventIdFromUrl = searchParams.get("event")
  const currentView = searchParams.get("view") || "dashboard"

  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(eventIdFromUrl)
  const [medals, setMedals] = useState<Medal[]>([
    {
      id: "m1",
      athleteId: "a1",
      eventId: "1",
      date: "2025-10-12",
      medalType: "Gold",
      sport: "Boxing",
    },
  ])

  useEffect(() => {
    setSelectedEventId(eventIdFromUrl)
  }, [eventIdFromUrl])

  const selectedEvent = events.find((e) => e.id === selectedEventId)

  const getAllAthletes = () => {
    const combined: Record<string, Athlete> = {}
    Object.values(ATHLETES_DATA)
      .flat()
      .forEach((a) => {
        if (combined[a.id]) {
          combined[a.id].medals.gold += a.medals.gold
          combined[a.id].medals.silver += a.medals.silver
          combined[a.id].medals.bronze += a.medals.bronze
        } else {
          combined[a.id] = { ...a, medals: { ...a.medals } }
        }
      })
    return Object.values(combined)
  }

  const currentAthletes = selectedEventId ? ATHLETES_DATA[selectedEventId] || [] : getAllAthletes()

  const getProvinceStats = () => {
    const provinces: Record<string, { gold: number; silver: number; bronze: number; athletes: number }> = {}
    currentAthletes.forEach((a) => {
      if (!provinces[a.province]) provinces[a.province] = { gold: 0, silver: 0, bronze: 0, athletes: 0 }
      provinces[a.province].gold += a.medals.gold
      provinces[a.province].silver += a.medals.silver
      provinces[a.province].bronze += a.medals.bronze
      provinces[a.province].athletes += 1
    })
    return Object.entries(provinces).map(([name, stats]) => ({
      name,
      ...stats,
      total: stats.gold + stats.silver + stats.bronze,
    }))
  }

  const renderAthletesView = () => <AthletesSection athletes={currentAthletes} />

  // Medals view is now extracted to `components/medals/medals-view.tsx` and rendered below via <MedalsView />

  const renderSportsView = () => <SportsSection sports={SPORTS_DATA} />

  const renderProvincesView = () => <ProvincesSection provinces={getProvinceStats()} />

  const handleSelectEvent = (id: string | null) => {
    if (id) {
      router.push(`/?event=${id}&view=dashboard`)
    } else {
      router.push(`/`)
    }
    setSelectedEventId(id)
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-50/50 min-h-screen">
      <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-20">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search athletes..." className="pl-10 bg-slate-50 border-none h-10 rounded-xl" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-full hover:bg-slate-50 transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[10px] text-muted-foreground">Administrator</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#1a4cd8] flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8">
        {(currentView === "dashboard" || !currentView) && (
          <>
            <DashboardBanner />

            <DashboardStatsGrid
              totalAthletes={getAllAthletes().length}
              totalSports={8}
              totalProvinces={25}
              totalMedals={getProvinceStats().reduce((s, p) => s + p.total, 0)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <EventsSection events={events} onCreate={(e) => setEvents([e, ...events])} onSelect={(id) => handleSelectEvent(id)} />
              </div>

              <div className="space-y-6">
                <QuickActions />
              </div>
            </div>
          </>
        )}

        {eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
        {eventIdFromUrl && currentView === "medals" && (
          <MedalsView events={events} athletes={currentAthletes} selectedEventId={selectedEventId} medals={medals} setMedals={setMedals} />
        )}
        {eventIdFromUrl && currentView === "provinces" && renderProvincesView()}

        {!eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
        {!eventIdFromUrl && currentView === "medals" && (
          <MedalsView events={events} athletes={currentAthletes} selectedEventId={selectedEventId} medals={medals} setMedals={setMedals} />
        )}
        {currentView === "sports" && renderSportsView()}
        {!eventIdFromUrl && currentView === "provinces" && renderProvincesView()}
      </main>
    </div>
  )
}

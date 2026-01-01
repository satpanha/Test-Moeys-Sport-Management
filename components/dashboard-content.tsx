"use client"

import { useState, useEffect } from "react"
import type { Event, Athlete, SportRecord } from "@/lib/types"
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
import { CreateEventDialog } from "@/components/create-event-dialog"
import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddMedalDialog } from "@/components/add-medal-dialog"
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
  const [medals, setMedals] = useState<
    Array<{
      id: string
      athleteId: string
      eventId: string
      date: string
      medalType: "Gold" | "Silver" | "Bronze"
      sport: string
    }>
  >([
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

  const renderAthletesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Athletes Management</h2>
            <p className="text-sm text-muted-foreground">Manage athlete registrations and profiles</p>
          </div>
        </div>
        <Button className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11">
          <Plus className="h-4 w-4" /> Register Athlete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Athletes", value: "2", color: "bg-blue-100", iconColor: "text-blue-600" },
          { label: "Approved", value: "2", color: "bg-green-100", iconColor: "text-green-600" },
          { label: "Pending", value: "0", color: "bg-yellow-100", iconColor: "text-yellow-600" },
          { label: "Rejected", value: "0", color: "bg-red-100", iconColor: "text-red-600" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`${s.color} p-3 rounded-xl`}>
                <Users className={`h-6 w-6 ${s.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search athletes..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
          </div>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Status</option>
          </select>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Provinces</option>
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">Athletes List ({currentAthletes.length})</h3>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Name</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Sport</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Status</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAthletes.map((a) => (
                <TableRow key={a.id} className="group transition-colors">
                  <TableCell className="font-bold text-slate-700">{a.name}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{a.province}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{a.sport}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-lg px-3 py-1 text-[10px]">
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                        <Eye className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                        <Pencil className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100">
                        <Trash2 className="h-4 w-4 text-slate-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )

  const renderMedalsView = () => {
    const filteredMedals = selectedEventId ? medals.filter((m) => m.eventId === selectedEventId) : medals

    const stats = {
      total: filteredMedals.length,
      gold: filteredMedals.filter((m) => m.medalType === "Gold").length,
      silver: filteredMedals.filter((m) => m.medalType === "Silver").length,
      bronze: filteredMedals.filter((m) => m.medalType === "Bronze").length,
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-xl">
              <Trophy className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Medals Tracking</h2>
              <p className="text-sm text-muted-foreground">Track and manage medal awards</p>
            </div>
          </div>
          <div className="flex gap-3">
            <AddMedalDialog
              athletes={currentAthletes}
              events={events}
              onAdd={(data) => {
                const newMedal = {
                  id: Math.random().toString(36).substr(2, 9),
                  ...data,
                  date: format(data.date, "yyyy-MM-dd"),
                  medalType: data.medalType as "Gold" | "Silver" | "Bronze",
                }
                setMedals([...medals, newMedal])
              }}
            />
            <Button
              variant="outline"
              className="rounded-xl gap-2 h-11 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Medals", value: stats.total, color: "bg-purple-100", iconColor: "text-purple-600" },
            { label: "Gold Medals", value: stats.gold, color: "bg-yellow-100", iconColor: "text-yellow-600" },
            { label: "Silver Medals", value: stats.silver, color: "bg-slate-100", iconColor: "text-slate-400" },
            { label: "Bronze Medals", value: stats.bronze, color: "bg-orange-100", iconColor: "text-orange-600" },
          ].map((s) => (
            <Card key={s.label} className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`${s.color} p-3 rounded-xl`}>
                  <Trophy className={`h-6 w-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search medals..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
            </div>
            <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
              <option>All Medals</option>
            </select>
            <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
              <option>All Provinces</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Athlete</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Sport</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Event</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Medal Type</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Date</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedals.map((medal) => {
                const athlete = currentAthletes.find((a) => a.id === medal.athleteId)
                const event = events.find((e) => e.id === medal.eventId)
                return (
                  <TableRow key={medal.id}>
                    <TableCell className="font-bold">{athlete?.name || "N/A"}</TableCell>
                    <TableCell className="text-slate-500">{medal.sport}</TableCell>
                    <TableCell className="text-slate-500">{event?.name || "N/A"}</TableCell>
                    <TableCell className="text-slate-500">{athlete?.province || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-none rounded-full px-3 py-1",
                          medal.medalType === "Gold" && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                          medal.medalType === "Silver" && "bg-slate-100 text-slate-700 hover:bg-slate-200",
                          medal.medalType === "Bronze" && "bg-orange-100 text-orange-700 hover:bg-orange-200",
                        )}
                      >
                        {medal.medalType === "Gold" && "🥇 Gold"}
                        {medal.medalType === "Silver" && "🥈 Silver"}
                        {medal.medalType === "Bronze" && "🥉 Bronze"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">{medal.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }

  const renderSportsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-xl">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sports Management</h2>
            <p className="text-sm text-muted-foreground">Manage sports, categories, and participants</p>
          </div>
        </div>
        <Button className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11">
          <Plus className="h-4 w-4" /> Add Sport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sports", value: "8", color: "bg-purple-100", icon: Trophy, iconColor: "text-purple-600" },
          { label: "Active Sports", value: "0", color: "bg-green-100", icon: Trophy, iconColor: "text-green-600" },
          { label: "Total Participants", value: "660", color: "bg-blue-100", icon: Users, iconColor: "text-blue-600" },
          { label: "Categories", value: "6", color: "bg-orange-100", icon: Trophy, iconColor: "text-orange-600" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm overflow-hidden rounded-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{s.label}</p>
                  <p className="text-3xl font-bold">{s.value}</p>
                </div>
                <div className={`${s.color} p-3 rounded-xl text-white shadow-lg`}>
                  <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sports..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl" />
          </div>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Status</option>
          </select>
          <select className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <option>All Categories</option>
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">Sports List (8)</h3>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Sport Name</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Category</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Participants</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Status</TableHead>
                <TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SPORTS_DATA.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-bold text-slate-700">{s.name}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{s.category}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{s.participants}</TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-lg px-3 py-1 text-[10px] border-none ${
                        s.status === "Completed"
                          ? "bg-slate-100 text-slate-600"
                          : s.status === "Ongoing"
                            ? "bg-blue-500 text-white"
                            : "bg-indigo-500 text-white"
                      }`}
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Pencil className="h-4 w-4 text-slate-400 cursor-pointer" />
                      <Trash2 className="h-4 w-4 text-slate-400 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )

  const renderProvincesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-xl">
            <Map className="h-6 w-6 text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Province Statistics</h2>
            <p className="text-sm text-muted-foreground">View province rankings and performance</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="rounded-xl gap-2 h-11 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
        >
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Provinces", value: "2", color: "bg-blue-100", icon: Map, iconColor: "text-blue-600" },
          { label: "Total Athletes", value: "2", color: "bg-green-100", icon: Users, iconColor: "text-green-600" },
          { label: "Total Medals", value: "1", color: "bg-purple-100", icon: Trophy, iconColor: "text-purple-600" },
          {
            label: "Avg Medals/Province",
            value: "0.5",
            color: "bg-orange-100",
            icon: Trophy,
            iconColor: "text-orange-600",
          },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`${s.color} p-3 rounded-xl`}>
                <s.icon className={`h-6 w-6 ${s.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden relative p-8 h-full bg-white">
          <div className="flex flex-col h-full justify-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-slate-800">#1</span>
              <div className="bg-yellow-100 p-2 rounded-xl">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900">Phnom Penh</h3>
              <p className="text-xl font-bold text-slate-400">ភ្នំពេញ</p>
            </div>
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Athletes:</span>
                <span className="text-xl font-black">1</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sm">🥇 1</span>
                <span className="text-sm">🥈 0</span>
                <span className="text-sm">🥉 0</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-slate-500 font-bold">Total Medals:</span>
                <span className="text-4xl font-black text-[#1a4cd8]">1</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-12 -mt-12 blur-2xl" />
        </Card>

        <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl p-6">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by province name..."
                className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl max-w-sm"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Province Rankings (2)</h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Rank</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Code</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Athletes</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Medals</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase text-slate-400">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getProvinceStats()
                    .sort((a, b) => b.total - a.total)
                    .map((p, i) => (
                      <TableRow key={p.name}>
                        <TableCell className="font-black">#{i + 1}</TableCell>
                        <TableCell className="font-bold">{p.name}</TableCell>
                        <TableCell className="text-slate-500 uppercase">{p.name.slice(0, 2)}</TableCell>
                        <TableCell className="text-slate-500 font-bold">{p.athletes}</TableCell>
                        <TableCell className="text-slate-500 font-bold">{p.total}</TableCell>
                        <TableCell className="text-[#1a4cd8] font-black">{p.total}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

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
            {/* Banner */}
            <div className="bg-[#1a4cd8] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-3">Dashboard Overview</h2>
                <p className="text-white/80 text-lg">Welcome back! Here's what's happening with your sport events.</p>
              </div>
              <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white/20">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-sm font-medium">Tuesday, December 23, 2025</span>
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute top-0 right-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Athletes",
                  value: getAllAthletes().length.toString(),
                  icon: Users,
                  color: "bg-blue-500",
                  trend: "+ 12% vs last month",
                },
                { label: "Total Sports", value: "8", icon: Trophy, color: "bg-green-500", trend: "+ 8% vs last month" },
                { label: "Total Provinces", value: "25", icon: Map, color: "bg-purple-500" },
                {
                  label: "Total Medals",
                  value: getProvinceStats()
                    .reduce((s, p) => s + p.total, 0)
                    .toString(),
                  icon: MedalIcon,
                  color: "bg-orange-500",
                  trend: "+ 15% vs last month",
                },
              ].map((stat) => (
                <Card key={stat.label} className="border-none shadow-sm overflow-hidden rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                    {stat.trend && (
                      <p className="text-[11px] font-bold text-green-600 mt-4 flex items-center gap-1">
                        <span className="text-lg">↑</span> {stat.trend}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Events</h3>
                  <CreateEventDialog onCreate={(e) => setEvents([e, ...events])} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} onClick={() => handleSelectEvent(event.id)} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
                <Card className="bg-[#10b981] border-none shadow-lg shadow-emerald-100 rounded-[1.5rem] p-6 text-white overflow-hidden relative group cursor-pointer">
                  <div className="relative z-10 flex flex-col gap-1">
                    <p className="text-lg font-bold">Export Data</p>
                    <p className="text-white/80 text-xs">Download reports in CSV format</p>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Download className="h-5 w-5" />
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
        {eventIdFromUrl && currentView === "medals" && renderMedalsView()}
        {eventIdFromUrl && currentView === "provinces" && renderProvincesView()}

        {!eventIdFromUrl && currentView === "athletes" && renderAthletesView()}
        {!eventIdFromUrl && currentView === "medals" && renderMedalsView()}
        {currentView === "sports" && renderSportsView()}
        {!eventIdFromUrl && currentView === "provinces" && renderProvincesView()}
      </main>
    </div>
  )
}

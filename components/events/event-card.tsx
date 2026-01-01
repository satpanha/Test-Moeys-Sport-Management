"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ChevronRight } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
  onClick: () => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-md transition-all border-none shadow-sm bg-white"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
        <div className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <ChevronRight className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-[12px] font-medium text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg w-fit">
          <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
          <span>
            {event.startDate} - {event.endDate}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {event.sports.map((sport) => (
            <Badge
              key={sport}
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-[10px] font-bold px-3"
            >
              {sport}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import type { SportRecord, Athlete } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Map, MedalIcon, Trophy, Users } from "lucide-react";

export function DashboardStatsGrid({ totalAthletes, totalSports, totalProvinces, totalMedals }: { totalAthletes: number; totalSports: number | string; totalProvinces: number | string; totalMedals: number | string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Total Athletes", value: String(totalAthletes), icon: Users, bg: "bg-blue-100", iconColor: "text-blue-600", trend: "+ 12% vs last month" },
        { label: "Total Sports", value: String(totalSports), icon: Trophy, bg: "bg-green-100", iconColor: "text-green-600", trend: "+ 8% vs last month" },
        { label: "Total Provinces", value: String(totalProvinces), icon: Map, bg: "bg-purple-100", iconColor: "text-purple-600" },
        { label: "Total Medals", value: String(totalMedals), icon: MedalIcon, bg: "bg-orange-100", iconColor: "text-orange-600", trend: "+ 15% vs last month" },
      ].map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
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
  )
}

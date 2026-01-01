import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Pencil, Trash2, Plus, Search } from "lucide-react"
import type { SportRecord } from "@/lib/types"

export function SportsSection({ sports }: { sports: SportRecord[] }) {
  return (
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
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{s.label}</p>
                  <p className="text-3xl font-bold">{s.value}</p>
                </div>
                <div className={`${s.color} p-3 rounded-xl text-white shadow-lg`}>
                  <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>
              </div>
            </div>
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
          <h3 className="font-bold text-slate-800">Sports List ({sports.length})</h3>
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
              {sports.map((s) => (
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
}

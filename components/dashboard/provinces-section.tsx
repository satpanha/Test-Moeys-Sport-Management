import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export function ProvincesSection({ provinces }: { provinces: Array<{ name: string; gold: number; silver: number; bronze: number; athletes: number; total: number }> }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-xl">
            <svg className="h-6 w-6 text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Province Statistics</h2>
            <p className="text-sm text-muted-foreground">View province rankings and performance</p>
          </div>
        </div>
        <button className="h-11 px-4 rounded-xl border border-blue-600 text-blue-600">Export</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Provinces", value: String(provinces.length), color: "bg-blue-100" },
          { label: "Total Athletes", value: String(provinces.reduce((s, p) => s + p.athletes, 0)), color: "bg-green-100" },
          { label: "Total Medals", value: String(provinces.reduce((s, p) => s + p.total, 0)), color: "bg-purple-100" },
          { label: "Avg Medals/Province", value: String((provinces.reduce((s, p) => s + p.total, 0) / Math.max(1, provinces.length)).toFixed(1)), color: "bg-orange-100" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm rounded-2xl">
            <div className="p-6 flex items-center gap-4">
              <div className={`${s.color} p-3 rounded-xl`} />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden relative p-8 h-full bg-white">
          <div className="flex flex-col h-full justify-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-slate-800">#1</span>
              <div className="bg-yellow-100 p-2 rounded-xl">
                <svg className="h-8 w-8 text-yellow-500" />
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
              <Input placeholder="Search by province name..." className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl max-w-sm" />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Province Rankings ({provinces.length})</h3>
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
                  {provinces
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
}

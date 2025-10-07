import React from 'react'
import { motion } from 'framer-motion'
import {
  Globe2, Building2, Users2, DollarSign, Factory, Settings, Bell, ChevronDown,
  ArrowUpRight, ArrowDownRight, TrendingUp, Ship, FlaskConical, Newspaper, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar
} from 'recharts'
import { useGame } from './store'

const months = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic']

const sparkData = Array.from({ length: 12 }).map((_, i) => ({ x: i, y: 50 + Math.sin(i) * 10 + i * 2 }))

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    Attivo: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    'Manut.': 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    FermO: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  }
  return <Badge className={`border ${map[status] || 'bg-slate-600/20 text-slate-300 border-slate-600/30'}`}>{status}</Badge>
}

const RiskBadge = ({ risk }: { risk: string }) => {
  const map: Record<string, string> = {
    Basso: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    Medio: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    'Medio-Alto': 'bg-orange-500/15 text-orange-300 border-orange-500/20',
    Alto: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
    Rischio: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
    Positivo: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    Negativo: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  }
  return <Badge className={`border ${map[risk] || 'bg-slate-600/20 text-slate-300 border-slate-600/30'}`}>{risk}</Badge>
}

const KPICard = ({ title, value, delta, up = true, chart = sparkData }: { title: string; value: string; delta: string; up?: boolean; chart?: any[] }) => (
  <Card className="bg-slate-900/60 border-slate-800 hover:bg-slate-900/80 transition">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-slate-300">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-100">{value}</div>
          <div className={`mt-1 inline-flex items-center gap-1 text-xs ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
            {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />} {delta}
          </div>
        </div>
        <div className="w-28 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart}>
              <Line type="monotone" dataKey="y" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContent>
  </Card>
)

function TopBar() {
  const game = useGame()
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 grid place-items-center font-bold">G</div>
          <div className="font-semibold tracking-wide">GlobalCorp Sim</div>
          <Badge className="ml-2 bg-cyan-500/15 text-cyan-300 border-cyan-500/20">Anteprima</Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5">
            <Input placeholder="Cerca…" className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm w-56" />
            <kbd className="text-xs text-slate-400">Ctrl K</kbd>
          </div>
          <Button size="icon" variant="ghost" className="text-slate-300">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 pl-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/80?img=12" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
        <div className="pl-4 flex items-center gap-2">
          <Button variant="ghost" onClick={()=>game.setSpeed(0)}>Pausa</Button>
          <Button variant="ghost" onClick={()=>game.setSpeed(1)}>1x</Button>
          <Button variant="ghost" onClick={()=>game.setSpeed(2)}>2x</Button>
          <Button variant="ghost" onClick={()=>game.setSpeed(3)}>3x</Button>
          <Button onClick={()=>game.save()}>Salva</Button>
          <Button variant="secondary" onClick={()=>game.load()}>Carica</Button>
        </div>
      </div>
    </div>
  )
}

function SideNav({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const items = [
    { id: 'overview', label: 'Overview', icon: Globe2 },
    { id: 'markets', label: 'Mercati', icon: Building2 },
    { id: 'operations', label: 'Operazioni', icon: Factory },
    { id: 'finance', label: 'Finanza', icon: DollarSign },
    { id: 'hr', label: 'HR', icon: Users2 },
    { id: 'rd', label: 'R&D', icon: FlaskConical },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'settings', label: 'Impostazioni', icon: Settings },
  ]
  return (
    <div className="sticky top-14 h-[calc(100vh-56px)] w-60 border-r border-slate-800 bg-slate-950/60 hidden lg:block">
      <div className="p-3 flex flex-col gap-1">
        {items.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={value === id ? 'secondary' : 'ghost'}
            className={`justify-start gap-2 rounded-xl ${value === id ? 'bg-slate-800/80 text-slate-100' : 'text-slate-300'}`}
            onClick={() => onChange(id)}
          >
            <Icon className="h-5 w-5" /> {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

function Overview(){
  const game = useGame()
  const revenueData = months.map((m, i) => ({ month: m, revenue: 120 + i * 10 + (i % 3 === 0 ? 20 : 0), profit: 30 + i * 5 + (i % 4 === 0 ? 10 : 0) }))
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Ricavi YTD" value={`€ ${game.state.revenueYTD.toFixed(0)}M`} delta="+6.9% vs LY" up />
        <KPICard title="Margine Operativo" value={`${game.state.operatingMargin.toFixed(1)}%`} delta="+0.8pp" up chart={sparkData.map(d => ({...d, y: d.y * 0.7 }))} />
        <KPICard title="Quota di Mercato" value={`${game.state.marketShare.toFixed(1)}%`} delta="+0.3pp" up chart={sparkData.map(d => ({...d, y: d.y * 0.5 }))} />
        <KPICard title="ESG Score" value={`${game.state.esgScore}/100`} delta="-1.2 vs Q2" up={false} chart={sparkData.map(d => ({...d, y: 70 + Math.cos(d.x) * 8 }))} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Traiettoria Ricavi & Utile</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #1f2937', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fill="url(#rev)" name="Ricavi (M€)" />
                <Line type="monotone" dataKey="profit" stroke="#a78bfa" strokeWidth={2} name="Utile (M€)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Mercati Chiave</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {useGame.getState().state.regions.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-800 p-3 bg-slate-950/40">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <RiskBadge risk={r.risk} />
                </div>
                <div className="mt-1 text-sm text-slate-300">HQ: {r.hq}</div>
                <div className="mt-2 text-xs text-slate-400">Ricavi: € {r.revenue}M</div>
                <div className="mt-1 inline-flex items-center gap-1 text-emerald-400 text-xs">
                  <TrendingUp className="h-4 w-4" /> {r.growth}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
        <CardContent className="p-4 flex flex-wrap items-center gap-3">
          <div className="text-sm text-slate-300">Azioni rapide</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl">Lancia nuovo prodotto</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800">
              <DialogHeader>
                <DialogTitle>Piano lancio prodotto</DialogTitle>
                <DialogDescription>Imposta lotti pilota, budget marketing e regioni target.</DialogDescription>
              </DialogHeader>
              <LaunchProductForm />
            </DialogContent>
          </Dialog>
          <Button variant="secondary" className="rounded-xl" onClick={()=>useGame.getState().actions.approveCapex(useGame.getState().state, 50)}>Approva CAPEX</Button>
          <Button variant="ghost" className="rounded-xl" onClick={()=>useGame.getState().actions.toggleHiringFreeze(useGame.getState().state)}>Pausa assunzioni</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function LaunchProductForm(){
  const game = useGame()
  const [region,setRegion] = React.useState('emea')
  const [budget,setBudget] = React.useState(50)
  return (
    <div className="grid md:grid-cols-3 gap-3 p-4">
      <div>
        <div className="text-xs mb-1">Regione</div>
        <Select defaultValue={region} onValueChange={setRegion}>
          <SelectTrigger className="rounded-xl bg-slate-950 border-slate-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            {game.state.regions.map((r) => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="text-xs mb-1">Budget (M€)</div>
        <Input type="number" value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||'0'))} placeholder="50" className="rounded-xl bg-slate-950 border-slate-800" />
      </div>
      <div className="flex items-end">
        <Button className="w-full rounded-xl" onClick={()=>useGame.setState(d=>{ d.state && game.actions.launchProduct(d.state, region, budget) })}>Conferma</Button>
      </div>
    </div>
  )
}

function Markets(){
  const game = useGame()
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {game.state.regions.map((r) => (
          <Card key={r.id} className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{r.name}</CardTitle>
                <RiskBadge risk={r.risk} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-300">HQ: {r.hq}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-slate-400">Ricavi</div>
                  <div className="font-semibold">€ {r.revenue}M</div>
                </div>
                <div>
                  <div className="text-slate-400">Crescita</div>
                  <div className="inline-flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="h-4 w-4" /> {r.growth}%
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="mt-3 w-full rounded-xl">Apri dettagli</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle>Pipeline Opportunità</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paese</TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Valore (M€)</TableHead>
                <TableHead>Prob.</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { country: 'Italia', deal: 'Retail partnership', val: 80, prob: 70, stato: 'Negoziazione' },
                { country: 'Germania', deal: 'OEM fornitura', val: 120, prob: 55, stato: 'Offerta' },
                { country: 'Brasile', deal: 'Rete distributiva', val: 45, prob: 40, stato: 'Lead' },
                { country: 'USA', deal: 'Upgrade contratti', val: 150, prob: 65, stato: 'Offerta' },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {row.country}</TableCell>
                  <TableCell>{row.deal}</TableCell>
                  <TableCell>€ {row.val}</TableCell>
                  <TableCell>
                    <div className="w-28"><Progress value={row.prob} className="bg-slate-800" /></div>
                  </TableCell>
                  <TableCell><Badge className="bg-indigo-500/15 text-indigo-300 border-indigo-500/20">{row.stato}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Operations(){
  const game = useGame()
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Stabilimenti & Utilizzo</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Impianto</TableHead>
                  <TableHead>Regione</TableHead>
                  <TableHead>Capacità</TableHead>
                  <TableHead>Utilizzo</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Ritardi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {game.state.plants.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.region}</TableCell>
                    <TableCell>{p.capacity}%</TableCell>
                    <TableCell>
                      <div className="w-28"><Progress value={p.utilization} className="bg-slate-800" /></div>
                    </TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell>{p.lateShipments}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Spedizioni Critiche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {game.state.shipments.map((s) => (
              <div key={s.id} className="rounded-xl border border-slate-800 p-3 flex items-center gap-3 bg-slate-950/40">
                <Ship className="h-5 w-5" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{s.route}</div>
                  <div className="text-xs text-slate-400">ID: {s.id}</div>
                </div>
                <RiskBadge risk={s.risk} />
                <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20">ETA {s.eta}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle>Capacità vs Output</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={game.state.plants.map((p) => ({ name: p.name, cap: p.capacity, out: Math.round(p.capacity * p.utilization / 100) }))}>
              <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #1f2937', color: '#e2e8f0' }} />
              <Bar dataKey="cap" fill="#22d3ee" name="Capacità" />
              <Bar dataKey="out" fill="#a78bfa" name="Output" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function Finance(){
  const game = useGame()
  const revenueData = months.map((m, i) => ({ month: m, revenue: 120 + i * 10 + (i % 3 === 0 ? 20 : 0), profit: 30 + i * 5 + (i % 4 === 0 ? 10 : 0) }))
  return (
    <div className="space-y-4">
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle>Cashflow Operativo</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="cash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #1f2937', color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="revenue" stroke="#34d399" fill="url(#cash)" name="Cash (M€)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Conto Economico (estratto)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voce</TableHead>
                  <TableHead>Q3</TableHead>
                  <TableHead>Q4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {game.state.pnlRows.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.label}</TableCell>
                    <TableCell>{r.q3}</TableCell>
                    <TableCell>{r.q4}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle>Impostazioni Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Taglio costi non strategici</div>
                <div className="text-xs text-slate-400">Limita spese travel, eventi e consulenze</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-slate-800" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs mb-1">CAPEX massimo (M€)</div>
                <Input defaultValue={game.state.policies.capexMax} className="rounded-xl bg-slate-950 border-slate-800" />
              </div>
              <div>
                <div className="text-xs mb-1">Soglia ROI minima</div>
                <Select defaultValue={String(game.state.policies.roiThreshold)}>
                  <SelectTrigger className="rounded-xl bg-slate-950 border-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    {['10','12','15','18','20'].map(v => <SelectItem key={v} value={v}>{v}%</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="rounded-xl w-full">Applica</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HR(){
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Headcount Totale" value="2,970" delta="▲ 2.1%" up chart={sparkData.map(d => ({...d, y: d.y * 0.6 }))} />
        <KPICard title="Attrition" value="1.1%" delta="▼ 0.2pp" up={true} chart={sparkData.map(d => ({...d, y: 60 - (d.y % 20) }))} />
        <KPICard title="Offerte accettate" value="83%" delta="▲ 4%" up />
        <KPICard title="Training completato" value="92%" delta="▲ 3%" up />
      </div>
    </div>
  )
}

function RD(){
  const game = useGame()
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {game.state.rd.map((p) => (
          <Card key={p.cod} className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{p.title}</CardTitle>
              <div className="text-xs text-slate-400">{p.cod} · {p.stage}</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs mb-1">Avanzamento</div>
              <Progress value={p.progress} className="bg-slate-800" />
              <div className="mt-2 text-sm text-slate-300">Milestone prossima: Validazione Q/A</div>
              <Button variant="ghost" className="mt-3 w-full rounded-xl">Apri dettagli</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function News(){
  const game = useGame()
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {game.state.news.map((n, i) => (
        <Card key={i} className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{n.title}</CardTitle>
              <RiskBadge risk={n.impact} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-300">Tag: {n.tag}</div>
            <Button variant="ghost" className="mt-3 w-full rounded-xl">Vedi impatto</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SettingsView(){
  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle>Design System (Tema)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Primario', cls: 'from-cyan-500 to-indigo-600' },
              { name: 'Secondario', cls: 'from-violet-500 to-fuchsia-600' },
              { name: 'Successo', cls: 'from-emerald-500 to-teal-600' },
              { name: 'Avviso', cls: 'from-amber-500 to-orange-600' },
            ].map((c) => (
              <div key={c.name} className="p-3 border border-slate-800 rounded-xl bg-slate-950/40">
                <div className={`h-16 rounded-lg bg-gradient-to-br ${c.cls}`} />
                <div className="mt-2 text-sm">{c.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function App(){
  const [tab, setTab] = React.useState('overview')
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopBar />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[15rem_1fr] gap-0">
        <SideNav value={tab} onChange={setTab} />
        <main className="p-4 lg:p-6 space-y-4">
          <motion.h1 initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-2xl font-semibold tracking-tight">
            {tab === 'overview' && 'Cruscotto esecutivo'}
            {tab === 'markets' && 'Mercati'}
            {tab === 'operations' && 'Operazioni'}
            {tab === 'finance' && 'Finanza'}
            {tab === 'hr' && 'Risorse Umane'}
            {tab === 'rd' && 'Ricerca & Sviluppo'}
            {tab === 'news' && 'Notizie & Eventi'}
            {tab === 'settings' && 'Impostazioni'}
          </motion.h1>

          {tab === 'overview' && <Overview />}
          {tab === 'markets' && <Markets />}
          {tab === 'operations' && <Operations />}
          {tab === 'finance' && <Finance />}
          {tab === 'hr' && <HR />}
          {tab === 'rd' && <RD />}
          {tab === 'news' && <News />}
          {tab === 'settings' && <SettingsView />}

          <footer className="pt-6 text-xs text-slate-500">© GlobalCorp Sim · UI di anteprima — componenti reattivi, grafica dark‑pro, palette ciano/indaco.</footer>
        </main>
      </div>
    </div>
  )
}

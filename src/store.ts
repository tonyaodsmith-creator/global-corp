import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { GameState } from './engine/models'
import { tick } from './engine/loop'
import { actions } from './engine/actions'

const initialState: GameState = {
  day: 0,
  speed: 1,
  cash: 500,
  revenueYTD: 3340,
  operatingMargin: 20.7,
  marketShare: 13.4,
  esgScore: 78,
  regions: [
    { id: 'emea', name: 'EMEA', hq: 'Londra', growth: 7.2, revenue: 820, risk: 'Medio' },
    { id: 'amer', name: 'Americhe', hq: 'New York', growth: 5.1, revenue: 980, risk: 'Basso' },
    { id: 'apac', name: 'APAC', hq: 'Singapore', growth: 9.4, revenue: 1050, risk: 'Medio-Alto' },
    { id: 'latam', name: 'LATAM', hq: 'San Paolo', growth: 6.0, revenue: 420, risk: 'Alto' },
  ],
  plants: [
    { name: 'Shanghai #2', region: 'APAC', capacity: 100, utilization: 86, status: 'Attivo', lateShipments: 2 },
    { name: 'Torino Nord', region: 'EMEA', capacity: 70, utilization: 64, status: 'Attivo', lateShipments: 1 },
    { name: 'Detroit East', region: 'Americhe', capacity: 90, utilization: 72, status: 'Manut.', lateShipments: 3 },
    { name: 'Recife', region: 'LATAM', capacity: 60, utilization: 54, status: 'Attivo', lateShipments: 0 },
  ],
  shipments: [
    { id: 'XK-101', route: 'Torino → Rotterdam', eta: '+2g', risk: 'Basso' },
    { id: 'XK-233', route: 'Shanghai → LA', eta: 'In tempo', risk: 'Medio' },
    { id: 'XK-377', route: 'Recife → Lisbona', eta: '-1g', risk: 'Basso' },
  ],
  pnlRows: [
    { label: 'Ricavi', q3: 3120, q4: 3340 },
    { label: 'COGS', q3: -1820, q4: -1900 },
    { label: 'Opex', q3: -720, q4: -750 },
    { label: 'Utile operativo', q3: 580, q4: 690 },
  ],
  headcount: [
    { dept: 'Vendite', people: 840, open: 32, churn: 0.9 },
    { dept: 'Produzione', people: 1120, open: 18, churn: 1.3 },
    { dept: 'R&D', people: 460, open: 12, churn: 0.7 },
    { dept: 'Finanza', people: 210, open: 4, churn: 0.4 },
  ],
  rd: [
    { cod: 'PRJ-AI42', title: 'Forecast AI 2.0', progress: 58, stage: 'Sperimentazione' },
    { cod: 'PRJ-GREEN7', title: 'Packaging riciclato', progress: 76, stage: 'Pilota' },
    { cod: 'PRJ-EDGE9', title: 'Sensoristica edge', progress: 33, stage: 'Ricerca' },
  ],
  news: [
    { title: 'Nuove tariffe su componenti APAC', impact: 'Negativo', tag: 'Mercati', day: 0 },
    { title: 'Accordo sindacale stabilito in EMEA', impact: 'Positivo', tag: 'HR', day: 0 },
    { title: 'Tempesta tropicale minaccia porto di Santos', impact: 'Rischio', tag: 'Logistica', day: 0 },
  ],
  policies: {
    hiringFreeze: false,
    nonStrategicCostCut: true,
    roiThreshold: 15,
    capexMax: 400,
  },
}

type Store = {
  state: GameState
  setSpeed: (s: GameState['speed']) => void
  step: () => void
  save: () => Promise<void>
  load: () => Promise<void>
  actions: typeof actions
}

export const useGame = create<Store>()(immer((set, get) => ({
  state: initialState,
  setSpeed: (s) => set(d => { d.state.speed = s }),
  step: () => set(d => { tick(d.state) }),
  save: async () => {
    const payload = JSON.stringify(get().state)
    // @ts-ignore
    const res = await window.api?.saveGame(payload)
    if (!res?.ok) throw new Error('Save failed')
  },
  load: async () => {
    // @ts-ignore
    const res = await window.api?.loadGame()
    if (res?.ok && res.data) {
      const data = JSON.parse(res.data)
      set(d => { d.state = data })
    }
  },
  actions
})))

// game loop
let last = performance.now()
function loop(){
  const store = useGame.getState()
  const speed = store.state.speed
  const now = performance.now()
  if (speed>0 && now - last > (1000 / (speed*2))) {
    store.step()
    last = now
  }
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

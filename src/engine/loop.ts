import { randomEvent } from './events'
import type { GameState } from './models'

export function tick(state: GameState){
  // advance time
  state.day += 1

  // evolve regions
  state.regions.forEach(r => {
    const monthly = r.revenue * (r.growth/100) / 12
    r.revenue = Math.max(100, Math.round(r.revenue + monthly * 0.3 + (Math.random()-0.5)*10))
  })

  // operating performance
  const revTotal = state.regions.reduce((s,r)=>s+r.revenue,0)
  const opex = Math.round(revTotal * (1 - state.operatingMargin/100))
  state.revenueYTD = Math.round(state.revenueYTD + revTotal/365)
  state.cash += Math.round((revTotal - opex)/365)

  // plants utilization shift
  state.plants.forEach(p => {
    const delta = (Math.random()-0.5)*4
    p.utilization = Math.max(35, Math.min(100, p.utilization + delta))
  })

  // news / events
  randomEvent(state)
}

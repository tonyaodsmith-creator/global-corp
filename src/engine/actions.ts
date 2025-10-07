import type { GameState } from './models'

export const actions = {
  launchProduct(state: GameState, regionId: string, budgetM: number){
    const reg = state.regions.find(r=>r.id===regionId)
    if (!reg) return
    const boost = Math.min(2 + budgetM/50, 6)
    reg.growth += boost/2
    reg.revenue += Math.round(budgetM * 5)
    state.cash -= budgetM
    state.marketShare += boost/10
  },
  approveCapex(state: GameState, amountM: number){
    if (amountM > state.policies.capexMax) return
    state.cash -= amountM
    state.plants.forEach(p => { p.capacity = Math.min(120, p.capacity + Math.round(amountM/100)) })
  },
  toggleHiringFreeze(state: GameState){
    state.policies.hiringFreeze = !state.policies.hiringFreeze
  },
  setRoiThreshold(state: GameState, roi: number){
    state.policies.roiThreshold = roi
  },
}

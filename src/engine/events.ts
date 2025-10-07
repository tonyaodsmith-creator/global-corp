import type { GameState } from './models'

export function randomEvent(state: GameState): string | null {
  // very simple event generator
  const r = Math.random()
  if (r < 0.05) {
    // logistics disruption
    const item = { title: 'Ritardi porto principale', impact: 'Rischio' as const, tag: 'Logistica', day: state.day }
    state.news.unshift(item)
    state.cash -= 5
    return item.title
  } else if (r < 0.09) {
    // tariff change
    const item = { title: 'Tariffe import APAC in aumento', impact: 'Negativo' as const, tag: 'Mercati', day: state.day }
    state.news.unshift(item)
    state.operatingMargin -= 0.2
    return item.title
  } else if (r < 0.12) {
    const item = { title: 'Accordo sindacale regionale', impact: 'Positivo' as const, tag: 'HR', day: state.day }
    state.news.unshift(item)
    state.operatingMargin += 0.2
    return item.title
  }
  return null
}

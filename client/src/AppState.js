import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  // @ts-ignore
  account: {},

  /** @type {TowerEvent[]} */
  towerEvents: [],
  
  /** @type {TowerEvent | null} */
  activeEvent: null
})

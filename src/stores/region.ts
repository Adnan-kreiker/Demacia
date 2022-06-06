import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RegionParam } from './../types'
export const regionStore = defineStore('region', {
  state: () => {
    return {
      region: 'euw1' as RegionParam,
    }
  },
  actions: {
    setRegion(region: RegionParam) {
      this.region = region
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(regionStore, import.meta.hot))

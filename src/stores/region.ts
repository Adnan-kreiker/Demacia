import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RegionParam } from './../types'
export const useRegionStore = defineStore('region', {
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
  import.meta.hot.accept(acceptHMRUpdate(useRegionStore, import.meta.hot))

import { acceptHMRUpdate, defineStore } from 'pinia'
export const regionStore = defineStore('region', {
  state: () => {
    return {
      region: 'euw1',
    }
  },
  actions: {
    setRegion (region: string) {
      this.region = region
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(regionStore, import.meta.hot))

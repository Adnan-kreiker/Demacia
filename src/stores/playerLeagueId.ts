import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePlayerLeagueIdStore = defineStore('playerLeagueId', {
  state: () => {
    return {
      id: null as null | string,
    }
  },
  actions: {
    setPlayerLeagueId(id: string) {
      this.id = id
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerLeagueIdStore, import.meta.hot))

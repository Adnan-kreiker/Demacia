import { acceptHMRUpdate, defineStore } from 'pinia'
export const leagueStore = defineStore('main', {
    state: () => ({
        leagueId: "98bdcf0b-d033-4908-b706-e78f140d2d30",
        rank:"II"
    }),
    actions: {
        setLeague (leagueId: string) {
            this.leagueId = leagueId
        },
        setRank (rank: string) {
            this.rank = rank
        }
    },
    getters: {
        getLeague: (state) => state.leagueId,
        getRank: (state) => state.rank
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(leagueStore, import.meta.hot))

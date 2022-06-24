import type { Ref } from 'vue'
import { regionParamToContinentMapper } from '../../utils'
import type { MatchInfo, MaybeRef } from '~/types'

const error = ref(false)
const loading = ref(false)

const useMatchHistory = (puuid: MaybeRef<string>, region: MaybeRef<string>, start: Ref<number>) => {
  const matchHistory = ref<MatchInfo[]>([])
  error.value = false
  const getMatchHistory = async () => {
    loading.value = true
    try {
      const matches = await fetch(
        `${import.meta.env.VITE_URL}/api/get-matches/${unref(puuid)
        }?start=${start.value}&count=5&region=${regionParamToContinentMapper(unref(region))}`,
      )
      const matchesIds = await matches.json() as string[]
      await Promise.allSettled(
        matchesIds.map(async (matchId: string) => {
          return fetch(
            `${import.meta.env.VITE_URL}/api/get-match/${matchId}?region=${regionParamToContinentMapper(unref(region))}`,
          ).then(res => res.json())
            .then(match => matchHistory.value.push({ ...match, show: false }))
            .catch(er => console.error(er))
        }),
      ).catch(err => console.error(err))
      loading.value = false
    }
    catch (err) {
      error.value = true
      console.error(err)
      loading.value = false
    }
  }
  watch(start, () => {
    getMatchHistory()
  })
  return {
    matchHistory,
    getMatchHistory,
    error,
    loading,
  }
}

export default useMatchHistory

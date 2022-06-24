import type { MaybeRef, RegionParam, SummonerLeagueInfo } from '~/types'

const useSummonerLeague = async (region: MaybeRef<RegionParam>, leagueId: MaybeRef<string>) => {
  const leagueInfo = ref<null | SummonerLeagueInfo>(null)
  try {
    const res = await fetch(`${import.meta.env.VITE_URL}/api/get-summoner-league/${unref(region)}?leagueId=${unref(leagueId)}`)
    const data = await res.json()
    leagueInfo.value = data
  }
  catch (error) {
    console.error(error)
  }

  return {
    leagueInfo,
  }
}

export default useSummonerLeague

import type { SummonerRankedInfo } from '~/types'

const useSummonerRankedInfoById = async (id: string, region: string) => {
  const rankedData = ref<SummonerRankedInfo | null>(null)
  try {
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/get-ranked-info/${id}?region=${region}`,
    )
    const data = await res.json() as SummonerRankedInfo
    rankedData.value = data
  }
  catch (err) {
    console.error(err)
  }
  return {
    rankedData,
  }
}

export default useSummonerRankedInfoById

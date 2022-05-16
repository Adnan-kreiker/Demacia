import { unicodeToUtf8 } from '../../utils'
import { MaybeRef, SummonerRankedInfoInterface } from './../types'
import type { Summoner, SummonerRankedInfo } from '~/types'

const errorSingleSummoner = ref(false)
const errorMultipleSummoners = ref(false)
const errorSummonersRankedInfo = ref(false)

const useSummoner = () => {
  const summonersIdsArray = ref<string[]>([])
  const summonersRankedData = ref<SummonerRankedInfoInterface | null>(null)
  const summonersData = ref<Summoner[]>([])

  const getSummonerByName = async(summonerName: string, region: string) => {
    errorSingleSummoner.value = false
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summonerName)}?region=${region}`,
      )
      const data = (await res.json()) as Summoner
      if (data.status && data.status.status_code === 404)
        errorSingleSummoner.value = true

      return data
    }
    catch (err) {
      errorSingleSummoner.value = true
      console.error(err)
    }
  }

  const getSummonersByName = async(summonerNames: string[], region: string) => {
    errorMultipleSummoners.value = false
    try {
      await Promise.allSettled(
        summonerNames.map(async(summonerName) => {
          const res = await fetch(
            `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summonerName)}?region=${region}`,
          )
          const summoner = await res.json()
          summonersData.value.push(summoner)
          summonersIdsArray.value.push(summoner.id)
        }))
    }
    catch (err) {
      errorMultipleSummoners.value = true
      console.error(err)
    }
  }

  const getSummonersRankedInfoById = async(summonersIds: MaybeRef<string[]>, region: MaybeRef<string>) => {
    errorSummonersRankedInfo.value = false
    const initialRankedData: SummonerRankedInfoInterface = []
    try {
      await Promise.allSettled(
        unref(summonersIds).map(async(summonerId) => {
          const rankedInfo = await fetch(
            `${import.meta.env.VITE_URL}/api/get-ranked-info/${summonerId}?region=${unref(region)
            }`,
          )
          const data = (await rankedInfo.json()) as SummonerRankedInfo
          initialRankedData.push({
            summonerId,
            rankedInfo: data,
          })
        }),
      )
      summonersRankedData.value = initialRankedData
    }
    catch (err) {
      errorSummonersRankedInfo.value = true
      console.error(err)
    }
  }

  return {
    getSummonerByName,
    getSummonersByName,
    getSummonersRankedInfoById,
    summonersData,
    summonersRankedData,
    summonersIdsArray,
    errorSingleSummoner,
    errorMultipleSummoners,
    errorSummonersRankedInfo,
  }
}

export default useSummoner

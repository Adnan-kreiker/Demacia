<script setup lang="ts">
import { NH1, NSkeleton, NText } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { capitalize, queueIdtoDescriptionMapper } from '../../utils'
import type {
  LiveGame,
  ParticipantLiveGame,
  Summoner,
  SummonerRankedInfoInterface,
} from '~/types'
import ErrorComponent from '~/components/ErrorComponent.vue'
import BannedChampions from '~/components/BannedChampions.vue'
import LiveGameTeamInfo from '~/components/LiveGameTeamInfo.vue'
import useChampions from '~/hooks/useChampions'
import { regionStore } from '~/stores/region'
import useSummoner from '~/hooks/useSummoner'

const props = defineProps<{
  summonerId: string
}>()

const store = regionStore()

const { region } = storeToRefs(store)

const { championsArray } = useChampions()

const summonersNames = ref<string[]>([])

const summonersData = ref<null | Summoner[]>()

const summonersRankedData = ref<SummonerRankedInfoInterface | null>(null)

const gameData = ref<null | LiveGame>(null)

const error = ref(false)

const teams: {
  id: number
  value: 100 | 200
}[] = [
  {
    id: 1,
    value: 100,
  },
  {
    id: 2,
    value: 200,
  },
]

const getActiveGame = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/get-live-game/${props.summonerId}?region=${region.value
      }`,
    )

    const data = await response.json()

    if (data.status && data.status.status_code === 404) {
      error.value = true
      return
    }

    gameData.value = data

    summonersNames.value = data.participants.map(
      (participant: ParticipantLiveGame) => participant.summonerName,
    )

    const { getSummonersByName, summonersIdsArray, getSummonersRankedInfoById, summonersRankedData: summonersRankedDataFromComposable, summonersData: summonersDataFromComposable } = useSummoner()

    await getSummonersByName(summonersNames.value, region.value)
    summonersData.value = summonersDataFromComposable.value

    await getSummonersRankedInfoById(summonersIdsArray, region.value)
    summonersRankedData.value = summonersRankedDataFromComposable.value
  }
  catch (err) {
    console.error(err)
    error.value = true
  }
}

getActiveGame()
</script>

<template>
  <div class="min-h-screen">
    <div v-if="!error && gameData">
      <n-h1 prefix="bar">
        <n-text type="primary">
          {{ capitalize(gameData.gameMode) }}
          Game
        </n-text>
        <p>{{ queueIdtoDescriptionMapper(gameData.gameQueueConfigId) }}</p>
      </n-h1>
      <BannedChampions
        v-if="championsArray"
        :champions-array="championsArray"
        :banned-champions="gameData.bannedChampions"
      />
      <div v-if="championsArray && summonersRankedData">
        <LiveGameTeamInfo
          v-for="team in teams"
          :key="team.id"
          :champions-array="championsArray"
          :game-data="gameData"
          :region="region"
          :summoners-ranked-data="summonersRankedData"
          :team="team.value"
        />
      </div>
      <div v-else>
        <div
          v-for="i in 2" :key="i"
          class="flex mt-6 flex-row overflow-x-scroll whitespace-nowrap gap-2"
        >
          <n-skeleton v-for="n in 5 " :key="n" class="mr-4 min-w-[250px] mx-1 mt-2 mb-4" height="355px" width="250px" :sharp="false" />
        </div>
      </div>
    </div>
    <div v-if="error" class="flex flex-row justify-center">
      <ErrorComponent
        title="No Game Found!"
        status="404"
        description="Summoner is not in an active game!"
        :show-return-home-button="false"
      />
    </div>
  </div>
</template>

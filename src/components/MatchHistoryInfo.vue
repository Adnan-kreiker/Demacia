<script setup lang="ts">
import { NButton, NCollapseTransition, NDivider, NSpace, NTag } from 'naive-ui'
import { storeToRefs } from 'pinia'
import {
  formatTime,
  idToRunes,
  mapSpellKeyToName,
  queueIdtoDescriptionMapper,
  secondsToHrsMinsSecs,
  secondsToMinutes,
  timeToDaysAgo,
  toLowerCase,
} from '../../utils'
import MatchHistoryTeam from './MatchHistoryTeam.vue'
import MatchHistoryTeamDataTable from './MatchHistoryTeamDataTable.vue'
import FilterComponent from './FilterComponent.vue'
import MatchHistoryChart from '~/components/MatchHistoryChart.vue'
// import ChevronRight from './Icons/ChevronRight.vue'
import useMatchHistory from '~/composables/useMatchHistory'
import { regionStore } from '~/stores/region'
import type { FilterOption, MatchInfo, Participant, Summoner } from '~/types'

const props = defineProps<{
  summonerInfo: Summoner
}>()

const route = useRoute()

const start = ref(0)

const { region } = storeToRefs(regionStore())

const { matchHistory, getMatchHistory, loading } = useMatchHistory(props.summonerInfo.puuid, region.value, start)

await getMatchHistory()

const currentFilter = ref('All Matches')

const filterOptions: FilterOption[] = [
  {
    id: 1,
    name: 'All Matches',
  },
  {
    id: 2,
    name: 'Ranked Solo',
  },
  {
    id: 3,
    name: 'Normal',
  },
  {
    id: 4,
    name: 'Aram',
  },
]

const filteredMatchHistory = computed(() => {
  if (currentFilter.value === 'Ranked Solo')
    return matchHistory.value.filter(match => match.info.queueId === 420)

  if (currentFilter.value === 'Normal')
    return matchHistory.value.filter(match => match.info.queueId === 430 || match.info.queueId === 400)

  if (currentFilter.value === 'Aram')
    return matchHistory.value.filter(match => match.info.queueId === 450)

  return matchHistory.value
})

const summoner = (participants: Participant[]): Participant => {
  const participant = participants.find(
    participant =>
      participant.summonerId === props.summonerInfo.id,
  )
  return participant!
}

const summonerHasMultipleKills = (participantData: Participant) => {
  if (participantData.doubleKills || participantData.tripleKills || participantData.quadraKills || participantData.pentaKills)
    return true

  else
    return false
}

const isNaNCheckerAndDecimalPrefixer = (value: number) => {
  if (isNaN(value))
    return 0

  return value.toFixed(2)
}

const summonerMultipleKillsText = (participantData: Participant) => {
  if (participantData.pentaKills)
    return `Penta Kills: ${participantData.doubleKills}`

  if (participantData.quadraKills)
    return `Quadra Kills: ${participantData.doubleKills}`

  if (participantData.tripleKills)
    return `Triple Kills: ${participantData.doubleKills}`

  if (participantData.doubleKills)
    return `Double Kills: ${participantData.doubleKills}`

  return null
}

const matchHistoryBackground = (result: boolean, show: boolean): string => {
  if (show) {
    if (result)
      return '#1b224b'

    else
      return '#301f3a'
  }
  else {
    if (result && !show)
      return '#1f306a'

    else
      return '#3e213b'
  }
}

const winsAndLossesCalculator = (matchHistory: MatchInfo[]): [ wins: number, losses: number ] => {
  let wins = 0
  let losses = 0
  if (matchHistory.length) {
    matchHistory.forEach((match) => {
      const summoner = match.info.participants.filter(match => match.summonerId === props.summonerInfo.id)[0]
      if (summoner && summoner.win)
        wins++
      else losses++
    })
    return [wins, losses]
  }
  return [wins, losses]
}

const matchHistoryChartKey = ref(0)

watch(() => route.fullPath, () => {
  start.value = 0
}, {
  immediate: true,
})

watch(() => filteredMatchHistory.value.length, () => {
  matchHistoryChartKey.value++
})
const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <section v-if="matchHistory && matchHistory.length" class="min-h-[230px]">
    <div class="flex flex-row justify-evenly gap-4 items-center border-t border-dark-200 flex-wrap">
      <div>
        <h2 class="text-center text-2xl md:text-4xl my-8 font-bold">
          <span
            class="border-l-6 pl-4 rounded-sm border-green-600"
          >Match History</span>
        </h2>
        <FilterComponent :current-filter="currentFilter" :filter-options="filterOptions" @update-filter="currentFilter = $event" />
      </div>
      <MatchHistoryChart :key="matchHistoryChartKey" class="my-4" :wins-and-losses="winsAndLossesCalculator(filteredMatchHistory)" />
    </div>
    <div
      v-for="match in filteredMatchHistory"
      :key="match.metadata.matchId"
      :style="{
        background: matchHistoryBackground(
          summoner(match.info.participants)!.win,
          match.show,
        ),
      }"
      class="rounded p-3 my-3 max-w-4xl mx-auto"
    >
      <div v-if="summoner(match.info.participants)" class="overflow-x-scroll scroll-div">
        <div class="min-w-[840px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <p class="my-1 font-bold">
                  {{ queueIdtoDescriptionMapper(match.info.queueId) }}
                </p>

                <p class="text-xs text-gray-300">
                  {{ timeToDaysAgo(match.info.gameCreation) }}
                </p>
                <p v-if="match.info.gameEndTimestamp" class="my-1">
                  ⏳ {{ secondsToHrsMinsSecs(match.info.gameDuration) }}
                </p>
                <h2 v-else>
                  ⏳ {{ formatTime(match.info.gameDuration) }}
                </h2>
                <n-tag class="my-2 font-bold" :type="summoner(match.info.participants)?.win ? 'info' : 'error'">
                  <span>{{
                    summoner(match.info.participants)?.win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <button
                  class="mx-auto flex flex-row px-2 py-1 transform ease-linear duration-300"
                  :style="{ transform: match.show ? 'rotate(180deg)' : 'rotate(90deg)' }"
                  @click="match.show = !match.show"
                >
                  <chevron-top class="h-5 w-5 text-gray-300" />
                </button>
              </div>

              <!-- Summoner Image and Name -->
              <div class="flex flex-row">
                <div class="px-4 flex flex-col mt-8 text-center justify-center">
                  <div class="relative">
                    <img
                      class="rounded-sm"
                      height="70"
                      width="70"
                      :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${toLowerCase(
                        summoner(match.info.participants).championName,
                      )}.png`"
                    >
                    <span
                      class="text-sm px-[2px] rounded-sm bg-blue-gray-800 absolute top-12 w-min text-white right-0.5"
                    >
                      {{ summoner(match.info.participants).champLevel }}
                    </span>
                  </div>
                  <p class="text-center">
                    {{ summoner(match.info.participants).championName }}
                  </p>

                  <br>
                </div>
                <!-- Summoner's spells -->
                <div class="flex flex-col justify-center items-center">
                  <div class="flex gap-1">
                    <img
                      height="32"
                      width="32"
                      class="w-8 rounded-sm h-8"
                      :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner1Id.toString(),
                      )}.png`"
                    >
                    <img
                      height="32"
                      width="32"
                      class="w-8 h-8 rounded-sm"
                      :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner2Id.toString(),
                      )}.png`"
                    >
                  </div>
                  <div class="flex justify-center items-center">
                    <img
                      height="40"
                      width="40"
                      class="rounded-sm"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[0]!.selections[0]!
                          .perk,
                      )}`"
                    >
                    <img
                      height="30"
                      width="30"
                      class="mx-auto rounded-sm object-contain"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[1]!.selections[1]!
                          .perk,
                      )}`"
                    >
                  </div>
                </div>
              </div>

              <!-- Summoner Stats -->
              <div class="flex flex-col max-w-[150px] text-gray-100 justify-center flex-1 items-center">
                <div class="font-bold">
                  <span class="pr-1">{{ summoner(match.info.participants).kills }} /</span>
                  <span class="pr-1 text-red-400">{{
                    summoner(match.info.participants).deaths
                  }}</span>
                  <span class="pr-1">/ {{ summoner(match.info.participants).assists }}</span>
                </div>
                <p>
                  <span class="text-orange-400">
                    {{ isNaNCheckerAndDecimalPrefixer((summoner(match.info.participants).kills
                      + summoner(match.info.participants).assists)
                      / summoner(match.info.participants).deaths)
                    }}
                  </span>
                  <span class="text-gray-400 ml-1 text-sm">KDA</span>
                </p>
                <div>
                  <div class="">
                    <span class="py-1">{{
                      summoner(match.info.participants).totalMinionsKilled
                    }}</span>
                    <span class="text-gray-400 ml-1">CS ({{
                      isNaNCheckerAndDecimalPrefixer(summoner(match.info.participants).totalMinionsKilled
                        / secondsToMinutes(match.info.gameDuration))
                    }})</span>
                    <br>

                    <span class="py-1">
                      {{ summoner(match.info.participants).wardsPlaced }}</span>
                    <span class="text-sm ml-1 text-gray-400">vision</span>
                  </div>
                  <n-tag
                    v-if="
                      summonerHasMultipleKills(summoner(match.info.participants))
                    "
                    class="my-3"
                    :color="{ color: '#ee5a52', textColor: 'white', borderColor: 'red' }"
                  >
                    {{
                      summonerMultipleKillsText(summoner(match.info.participants))
                    }}
                  </n-tag>
                </div>
              </div>
              <div class="flex flex-row flex-wrap items-center content-center max-w-[120px] gap-1">
                <div v-for="i in 6" :key="i">
                  <img
                    v-if="summoner(match.info.participants)[(`item${i}`) as keyof Participant] !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${summoner(match.info.participants)[(`item${i}`) as keyof Participant]}.png`"
                  >
                  <div
                    v-else
                    class="h-[25px] w-[25px] "
                    :style="{ backgroundColor: summoner(match.info.participants)?.win ? '#12499a' : '#300f3a' }"
                  />
                </div>
              </div>
            </div>
            <!-- Red and Blue Teams -->
            <MatchHistoryTeam :participants="match.info.participants" />
          </section>
          <!-- More Info Switch and DataTables -->
          <n-space class="mx-3" vertical>
            <keep-alive>
              <n-collapse-transition v-if="match.show" class="bg-dark-600" :show="match.show" appear>
                <div class="flex justify-center mt-4">
                  <MatchHistoryTeamDataTable :participants="match.info.participants" :team="200" />
                </div>
                <n-divider dashed />
                <div class="flex flex-row justify-center">
                  <MatchHistoryTeamDataTable :participants="match.info.participants" :team="100" />
                </div>
              </n-collapse-transition>
              <template v-else />
            </keep-alive>
          </n-space>
        </div>
      </div>
    </div>
    <div v-if="filteredMatchHistory.length === 0">
      <p
        v-if="!loading"
        class="text-center whitespace-normal text-lg font-bold border-1 text-orange-400 border-red-300  mx-auto px-2 py-1"
      >
        No
        {{ currentFilter }} games were played within the last {{ start + 5 }}
        matches
        , try loading
        more
        matches
      </p>
      <p
        v-else
        class="text-center whitespace-normal text-lg font-bold border-1 text-orange-400 border-red-300  mx-auto px-2 py-1"
      >
        Loading...
      </p>
    </div>
    <n-space justify="center">
      <n-button tertiary type="info" :loading="loading" class="mt-8" @click="start += 5">
        Load
        More
      </n-button>
    </n-space>
  </section>
</template>

<style scoped>
.scroll-div {
  @media (min-width: 917px) {
    overflow-x: hidden !important;
  }
}

.n-divider {
  height: 100%;
  background-color: rgb(75, 74, 74);
}
</style>

<script setup lang="ts">
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
import { storeToRefs } from 'pinia'
// @ts-expect-error the type is used in the template
import type { FilterOption, ParticipantLiveGame, Servers } from '../types'
import {
  queueIdtoDescriptionMapper,
  regionParamToRegionMapper,
  regionToRegionParamMapper,
} from '../../utils/index'
import useFeaturedGames from '~/hooks/useFeaturedGames'
import FeaturedGamesTimeSlot from '~/components/FeaturedGamesTimeSlot.vue'
import FilterComponent from '~/components/FilterComponent.vue'
import { regionStore } from '~/stores/region'
// import RefreshIcon from '~/components/Icons/RefreshIcon.vue'

const store = regionStore()

const { region } = storeToRefs(store)

const updateStore = (newRegion: string) => {
  store.setRegion(newRegion)
}

const currentFilter = ref(regionParamToRegionMapper(region.value))

watch(currentFilter, (newRegion) => {
  store.setRegion(regionToRegionParamMapper(newRegion).value)
})

const { featuredGames } = useFeaturedGames(region)

const servers: Servers = ['EUW', 'NA', 'KR', 'EUNE', 'JP', 'BR', 'LAN', 'LAS']

const filterOptions = () => {
  return servers.map((server, index) => {
    return {
      id: index,
      name: server,
    }
  })
}

const featuredGamesTimeSlotKey = ref(0)

let interval: NodeJS.Timer

onMounted(() => {
  interval = setInterval(() => {
    featuredGamesTimeSlotKey.value++
  }, 1000)
})

// const loadNewGames = () => useFeaturedGames(region)

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div>
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-4">
      Featured Games
    </h1>
    <div class="flex flex-row justify-center items-center gap-4 my-4">
      <p class="text-2xl">
        Server
      </p>
      <FilterComponent
        class="" :filter-options="filterOptions()" :current-filter="currentFilter"
        @update-filter="currentFilter = $event, updateStore($event)"
      />
      <!-- <div class="flex flex-row justify-center items-center gap-3">
        <p class="text-xl">
          Load Other Games
        </p>
        <RefreshIcon class="h-10 w-10" @click="loadNewGames" />
      </div> -->
    </div>
    <div v-if="featuredGames">
      <div class="flex flex-row flex-wrap justify-center gap-4">
        <div
          v-for="featuredGame in featuredGames.gameList" :key="featuredGame.gameId"
          class="my-4 border-1 shadow-t-sm shadow-light-700 border-warm-gray-400 w-max p-3 rounded-md bg-dark-900"
        >
          <div class="flex flex-row text-base font-bold">
            <div>
              <p>{{ queueIdtoDescriptionMapper(featuredGame.gameQueueConfigId) }}</p>
              <FeaturedGamesTimeSlot :key="featuredGamesTimeSlotKey" :game-start-time="featuredGame.gameStartTime" />
            </div>
            <p class="ml-auto">
              {{ featuredGame.platformId.replace(/\d+/g, '') }}
            </p>
          </div>
          <div class="flex flex-row h-[177px] w-[280px] sm:w-[300px]">
            <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="100" />
            <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="200" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-row flex-wrap justify-center gap-6">
      <n-skeleton v-for="n in 5" :key="n" height="249px" width="324px" :sharp="false" />
    </div>
  </div>
</template>

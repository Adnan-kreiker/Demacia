<script setup lang="ts">
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
// @ts-expect-error the type is used in the template
import type { FilterOption, ParticipantLiveGame, Servers } from '../types'
import { queueIdtoDescriptionMapper, regionToRegionParamMapper } from '../../utils/index'
import useFeaturedGames from '~/hooks/useFeaturedGames'
import FeaturedGamesTimeSlot from '~/components/FeaturedGamesTimeSlot.vue'
import FilterComponent from '~/components/FilterComponent.vue'

const currentFilter = ref('EUW')

const region = ref<string>('euw1')

watch(currentFilter, (value) => {
  region.value = regionToRegionParamMapper(value).value
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
      </p> <FilterComponent class="" :filter-options="filterOptions()" :current-filter="currentFilter" @update-filter="currentFilter = $event" />
    </div>
    <div v-if="featuredGames">
      <div class="flex flex-row flex-wrap justify-center gap-4">
        <div v-for="featuredGame in featuredGames.gameList" :key="featuredGame.gameId" class="my-4 border-2 border-warm-gray-400 w-max p-3 rounded-md">
          <div class="flex flex-row text-base font-bold">
            <div>
              <p>{{ queueIdtoDescriptionMapper(featuredGame.gameQueueConfigId) }}</p>
              <FeaturedGamesTimeSlot :key="featuredGamesTimeSlotKey" :game-start-time="featuredGame.gameStartTime" />
            </div>
            <p class="ml-auto">
              {{ featuredGame.platformId.replace(/\d+/g, '') }}
            </p>
          </div>
          <div class="flex flex-row h-[177px] w-[300px]">
            <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="100" />
            <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="200" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-row flex-wrap justify-center gap-6"
    >
      <n-skeleton v-for="n in 5" :key="n" height="249px" width="324px" :sharp="false" />
    </div>
  </div>
</template>

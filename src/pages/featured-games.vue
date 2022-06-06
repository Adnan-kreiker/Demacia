<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import { storeToRefs } from 'pinia'
// @ts-expect-error the type is used in the template
import type { FilterOption, ParticipantLiveGame, Region, RegionParam, Servers } from '../types'
import {
  regionParamToRegionMapper,
  regionToRegionParamMapper,
} from '../../utils/index'
import useFeaturedGames from '~/hooks/useFeaturedGames'
import FilterComponent from '~/components/FilterComponent.vue'
import FeaturedGamesCard from '~/components/FeaturedGamesCard.vue'
import { regionStore } from '~/stores/region'

const store = regionStore()

const { region } = storeToRefs(store)

const updateStore = (newRegion: RegionParam) => {
  store.setRegion(newRegion)
}

const currentFilter = ref(regionParamToRegionMapper(region.value))

watch(currentFilter, (newRegion) => {
  store.setRegion(regionToRegionParamMapper(newRegion).value)
})

const { featuredGames } = useFeaturedGames(region)

const servers: Servers = ['EUW', 'EUNE', 'NA', 'LAN', 'LAS', 'BR', 'TR', 'RU', 'OCE', 'JP', 'KR']

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
      </p>
      <FilterComponent
        class="" :filter-options="filterOptions()" :current-filter="currentFilter"
        @update-filter="currentFilter = $event as Region, updateStore($event as RegionParam)"
      />
    </div>
    <div v-if="featuredGames">
      <div class="flex flex-row flex-wrap justify-center gap-4">
        <FeaturedGamesCard v-for="featuredGame in featuredGames.gameList" :key="featuredGame.gameId" :featured-game="featuredGame" :featured-games-time-slot-key="featuredGamesTimeSlotKey" />
      </div>
    </div>
    <div v-else class="flex flex-row flex-wrap justify-center gap-6">
      <n-skeleton v-for="n in 5" :key="n" height="249px" width="324px" :sharp="false" />
    </div>
  </div>
</template>

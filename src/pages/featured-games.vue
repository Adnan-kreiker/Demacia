<script setup lang="ts">
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
// @ts-expect-error the type is used in the template
import type { ParticipantLiveGame } from '../types'
import { queueIdtoDescriptionMapper } from '../../utils/index'
import useFeaturedGames from '~/hooks/useFeaturedGames'
import FeaturedGamesTimeSlot from '~/components/FeaturedGamesTimeSlot.vue'

const { featuredGames } = useFeaturedGames('euw1')

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

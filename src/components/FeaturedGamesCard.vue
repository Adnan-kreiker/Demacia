<script setup lang="ts">
import { queueIdtoDescriptionMapper } from '../../utils/index'
// @ts-expect-error the type is used in the template
import type { GameList, ParticipantLiveGame } from '~/types'
interface Props {
  featuredGame: GameList

}
const props = defineProps<Props>()
</script>

<template>
  <div
    class="my-4 border-1 shadow-t-sm shadow-light-700 border-warm-gray-400 w-max p-3 rounded-md bg-dark-900"
  >
    <div class="flex flex-row text-base font-bold">
      <div>
        <p>{{ queueIdtoDescriptionMapper(props.featuredGame.gameQueueConfigId) }}</p>
        <FeaturedGamesTimeSlot :game-start-time="props.featuredGame.gameStartTime" />
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
</template>

<style scoped>

</style>

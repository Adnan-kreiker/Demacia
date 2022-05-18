<script setup lang="ts">
import { NH1, NText } from 'naive-ui/es/typography'
// @ts-expect-error the type is used in the template
import type { ParticipantLiveGame } from '../types'
import useFeaturedGames from '~/hooks/useFeaturedGames'

const { featuredGames } = useFeaturedGames('euw1')

const calculatedTimeFromStart = (startedSeconds: number) => {
// epoch ms to current time
  const started = new Date(startedSeconds)
  const now = new Date()
  const diff = now.getTime() - started.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `${hours}h ${minutes}m ${seconds}s`
}
</script>

<template>
  <div v-if="featuredGames">
    <n-h1>
      <n-text type="primary">
        Featured Games
      </n-text>
    </n-h1>
    <div class="flex flex-row flex-wrap justify-center gap-6">
      <div v-for="featuredGame in featuredGames.gameList" :key="featuredGame.gameId" class="my-4 border-2 border-warm-gray-400 w-max p-3 rounded-md">
        <p>{{ featuredGame.gameMode }}</p>
        <p>{{ calculatedTimeFromStart(featuredGame.gameStartTime) }}</p>
        <div class="flex flex-row">
          <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="100" />
          <MatchHistorySummoners :participants="featuredGame.participants as ParticipantLiveGame[]" :team="200" />
        </div>
      </div>
    </div>
  </div>
</template>


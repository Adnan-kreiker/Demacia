<script setup lang="ts">
import useFeaturedGames from '~/hooks/useFeaturedGames'

const { featuredGames } = useFeaturedGames('euw1')
</script>

<template>
  <div v-if="featuredGames">
    <div v-for="featuredGame in featuredGames.gameList" :key="featuredGame.gameId" class="my-4">
      {{ featuredGame }}
      <p>{{ featuredGame.gameMode }}</p>
      <ul>
        <li v-for="participant in featuredGame.participants" :key="participant.summonerName">
          {{ participant.summonerName }}
        </li>
        <MatchHistorySummoners :participants="featuredGame.participants" :team="100" />
        <MatchHistorySummoners :participants="featuredGame.participants" :team="200" />
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import useSummonerLeague from '~/composables/useSummonerLeague'
import { useRegionStore } from '~/stores/region'
import { usePlayerLeagueIdStore } from '~/stores/playerLeagueId'

const regionStore = useRegionStore()
const playerLeagueIdStore = usePlayerLeagueIdStore()

const { region } = storeToRefs(regionStore)
const { id: playerLeagueId } = storeToRefs(playerLeagueIdStore)

const { leagueInfo } = await useSummonerLeague(region, playerLeagueId as Ref<string>)
</script>

<template>
  <p v-if="leagueInfo && playerLeagueId">
    {{ leagueInfo }}
  </p>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { NPagination } from 'naive-ui'
import { capitalize } from '../../utils'
import useSummonerLeague from '~/composables/useSummonerLeague'
import { useRegionStore } from '~/stores/region'
import { usePlayerLeagueIdStore } from '~/stores/playerLeagueId'
import type { SummonerLeagueInfo } from '~/types'

const regionStore = useRegionStore()
const playerLeagueIdStore = usePlayerLeagueIdStore()

const { region } = storeToRefs(regionStore)
const { id: playerLeagueId } = storeToRefs(playerLeagueIdStore)

const leagueInfo = ref<null | SummonerLeagueInfo>(null)

async function getSummonerLeague() {
  const { leagueInfo: useLeagueInfo } = await useSummonerLeague(region, playerLeagueId as Ref<string>)
  leagueInfo.value = useLeagueInfo.value
}

const page = ref(1)
const summonersTableKey = ref(1)

const updatePage = (pageNumber: number) => {
  page.value = pageNumber
  summonersTableKey.value++
}

const leagueInfoEntries = computed(() => {
  const start = page.value * 10
  if (leagueInfo.value) {
    return leagueInfo.value.entries
      .sort((a, b) => b.leaguePoints - a.leaguePoints)
      .map((entry, idx) => {
        return {
          ...entry,
          idx: idx + 1,
        }
      })
      .slice(start - 10, start)
  }
})

getSummonerLeague()
</script>

<template>
  <div v-if="leagueInfo">
    <SummonersTable :key="summonersTableKey" :challenger-players="leagueInfoEntries" :rank="capitalize(leagueInfo.tier)" :region="region" />
    <div class="flex justify-center mt-5">
      <n-pagination
        v-model="page"
        :default-page="1"
        :page="page"
        :page-count="Math.ceil(leagueInfo.entries.length / 10)"
        @update-page="updatePage($event)"
      />
    </div>
  </div>
</template>


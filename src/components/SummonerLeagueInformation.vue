<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { NH2, NPagination, NSkeleton, NText } from 'naive-ui'
import { capitalize } from '../../utils'
import useSummonerLeague from '~/composables/useSummonerLeague'
import { useRegionStore } from '~/stores/region'
import { usePlayerLeagueIdStore } from '~/stores/playerLeagueId'
import type { Summoner, SummonerLeagueInfo } from '~/types'

interface Props {
  summonerInfo: Summoner
}

const props = defineProps<Props>()

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
    <n-h2 prefix="bar" align-text class="mx-5 mt-3">
      <n-text type="primary">
        Summoner:
      </n-text>
      <span>
        {{ props.summonerInfo.name }}
      </span>
    </n-h2>

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
  <div v-else>
    <n-skeleton class="mb-4" height="36px" width="300px" />
    <n-skeleton class="mx-auto" height="40px" width="100%" />
    <div v-for="n in 10" :key="n" class="my-4">
      <div class="flex justify-center">
        <n-skeleton class="mr-4" height="50px" circle />
        <n-skeleton height="50px" width="90%" />
      </div>
    </div>
  </div>
</template>


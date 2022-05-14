<script setup lang="ts">
import NSelect from 'naive-ui/es/select/src/Select'
import NPagination from 'naive-ui/es/pagination/src/Pagination'
import { NText, NH3 } from 'naive-ui/es/typography'
import {
  ChallengerPlayerWithIndex,
  Ranks,
} from '../../src/types'
import { regionToRegionParamMapper } from '../../utils'
import SummonersTable from '~/components/SummonersTable.vue'
import useHighEloPlayers from '~/hooks/useHighEloPlayers'

const queueOptions = [
  {
    label: 'RANKED SOLO 5x5',
    value: 'RANKED_SOLO_5x5',
  },
  {
    label: 'RANKED FLEX SR',
    value: 'RANKED_FLEX_SR',
  },
]

const rankOptions = [
  {
    label: 'CHALLENGER',
    value: 'challengerleagues',
  },
  {
    label: 'GRANDMASTER',
    value: 'grandmasterleagues',
  },
  {
    label: 'MASTER',
    value: 'masterleagues',
  },
]

const servers = ['EUW', 'NA', 'KR', 'EUNE', 'JP', 'BR', 'LAN', 'LAS']

const regionOptions = servers.map((server) => {
  return {
    label: server,
    value: regionToRegionParamMapper(server),
  }
})

const regionVal = ref('euw1')

const queue = ref('RANKED_SOLO_5x5')

const rank = ref<Ranks>('challengerleagues')

const { challengerPlayers } = useHighEloPlayers(rank, queue, regionVal)

const page = ref(1)

const sortedChallengerPlayers = computed<ChallengerPlayerWithIndex[] | []>(() => {
  const start = page.value * 10
  if (challengerPlayers.value) {
    return ([...challengerPlayers.value] as ChallengerPlayerWithIndex[])
      .sort((a, b) => b.leaguePoints - a.leaguePoints)
      .map((player, idx) => {
        return {
          ...player,
          idx: idx + 1,
        }
      })
      .slice(start - 10, start)
  }
  return []
})

const summonersTableKey = ref(0)

watch([queue, rank, regionVal], () => {
  page.value = 1
})

watch([page, challengerPlayers], () => {
  summonersTableKey.value++
})

const updatePage = (pageNumber: number) => {
  page.value = pageNumber
  summonersTableKey.value++
}
</script>

<template>
  <div class="min-h-screen">
    <div class="flex flex-row flex-wrap items-center mb-4">
      <n-h3 class="mx-4 my-auto" prefix="bar" align-text type="success">
        <n-text type="success">
          Choose queue type
        </n-text>
      </n-h3>
      <div class="flex flex-row flex-wrap flex-grow">
        <n-select v-model:value="queue" class="pr-5 min-w-36 max-w-[170px] my-1" :options="queueOptions" />
        <n-select v-model:value="rank" class="max-w-[150px] min-w-20 my-1 pr-5" :options="rankOptions" />
        <n-select v-model:value="regionVal" class="max-w-[40px] min-w-20 my-1" :options="regionOptions" />
      </div>
    </div>
    <SummonersTable
      :key="summonersTableKey"
      :rank="rank"
      :challenger-players="sortedChallengerPlayers"
      :page="page"
      :region="regionVal"
    />
    <div class="flex justify-center mt-5">
      <n-pagination
        v-if="challengerPlayers"
        v-model="page"
        :default-page="1"
        :page="page"
        :page-count="Math.ceil(challengerPlayers.length / 10)"
        @update-page="updatePage($event)"
      />
    </div>
  </div>
</template>

<style scoped>
.n-h:first-child {
  margin-top: 7px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>

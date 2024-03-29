<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NProgress, NSkeleton } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { unicodeToUtf8 } from '../../utils'
import type {
  RankedPlayerWithAdditionalData,
  RankedPlayerWithIndex,
  Ranks,
  Summoner,
} from '~/types'

interface Props {
  challengerPlayers: RankedPlayerWithIndex[]
  region: string
  queue?: string
  rank: Ranks
}

const props = defineProps<Props>()

const summonersRank = computed(() => {
  switch (props.rank) {
    case 'challengerleagues':
      return 'Challenger'
    case 'grandmasterleagues':
      return 'Grandmaster'
    case 'masterleagues':
      return 'Master'
    case 'Challenger':
      return 'Challenger'
    case 'Grandmaster':
      return 'Grandmaster'
    case 'Master':
      return 'Master'
    case 'Diamond':
      return 'Diamond'
    case 'Platinum':
      return 'Platinum'
    case 'Gold':
      return 'Gold'
    case 'Silver':
      return 'Silver'
    case 'Bronze':
      return 'Bronze'
    default:
      return 'Unranked'
  }
})

const challengerPlayersWithData = ref<RankedPlayerWithAdditionalData[]>([])

const sortedChallengerPlayers = computed<RankedPlayerWithAdditionalData[]>(() => {
  if (challengerPlayersWithData.value) {
    return challengerPlayersWithData.value.sort(
      (a, b) => b.leaguePoints - a.leaguePoints,
    )
  }
  return []
})

const getSummonersInfo = async () => {
  if (props.challengerPlayers) {
    const result: RankedPlayerWithAdditionalData[] = []
    await Promise.allSettled(
      props.challengerPlayers.map(async (player) => {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(
            player.summonerName,
          )}?region=${props.region}`,
        )
        const data = (await res.json()) as Summoner
        result.push({
          ...player,
          ...data,
        })
      }),
    )
    challengerPlayersWithData.value = result
  }
}

getSummonersInfo()

const data = ref<
| {
  rank: number
  summoner: string
  tier: string
  lp: number
  level: number
  winRatio: number
  icon: number
}[]
| null
>(null)

const loading = computed(() => {
  if (!data.value)
    return false

  return data.value.length === 0
})

watch(
  sortedChallengerPlayers,
  () => {
    if (sortedChallengerPlayers.value) {
      data.value = sortedChallengerPlayers.value.map((player) => {
        return {
          rank: player.idx,
          summoner: player.summonerName,
          tier: summonersRank.value,
          lp: player.leaguePoints,
          level: player.summonerLevel,
          winRatio: Math.floor((player.wins / (player.wins + player.losses)) * 100),
          icon: player.profileIconId,
        }
      })
    }
  },
  {
    immediate: true,
  },
)

const columns: DataTableColumns = [
  {
    title: 'Rank',
    key: 'rank',
    align: 'center',
  },
  {
    title: 'Summoner',
    key: 'summoner',
    width: '200px',
    render(row) {
      const iconId = row.icon as number
      return h(
        RouterLink,
        {
          to: `/summoner-info/${row.summoner}?region=${props.region}`,
          props: {
            custom: true,
            vSlot: 'navigate',
            key: row.summoner,
          },
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        {
          default: () => {
            return [
              h('img', {
                src: `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_PATCH_VERSION}/img/profileicon/${iconId}.png`,
                height: '40',
                width: '40',
                style: {
                  borderRadius: '50%',
                },
                loading: 'lazy',
              }),
              h(
                'span',
                {
                  style: {
                    marginLeft: '15px',
                  },
                },
                `${row.summoner}`,
              ),
            ]
          },
        },
      )
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Tier',
    key: 'tier',
    align: 'center',
  },
  {
    title: 'LP',
    key: 'lp',
    align: 'center',
  },
  {
    title: 'Level',
    key: 'level',
    align: 'center',
  },
  {
    title: 'Win Ratio',
    key: 'winRatio',
    align: 'center',
    render(row) {
      const winRate = row.winRatio as number
      return h(NProgress, {
        style: {
          height: '24px',
          borderRadius: '4',
        },
        type: 'line',
        railColor: '#ee5a52',
        percentage: winRate,
      })
    },
  },
]
</script>

<template>
  <div class="overflow-x-scroll whitespace-nowrap">
    <n-data-table
      v-if="data != null && data.length > 0"
      :loading="loading"
      :columns="columns"
      class="min-w-[800px] "
      :data="data"
      min-height="850"
    />
    <div v-else>
      <n-skeleton class="mx-auto" height="40px" width="100%" />
      <div v-for="n in 10" :key="n" class="my-4">
        <div class="flex justify-center">
          <n-skeleton class="mr-4" height="50px" circle />
          <n-skeleton height="50px" width="90%" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media(min-width: 830px) {
  .overflow-x-scroll {
    overflow-x: hidden !important;
  }
}
</style>

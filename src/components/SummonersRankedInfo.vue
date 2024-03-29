<script setup lang="ts">
import { NNumberAnimation, NSkeleton, NStatistic, NTag } from 'naive-ui'
import { capitalize, replaceUnderscoreWithSpace } from '../../utils'
import type { QueueTypes, RankedData, RankedDataTFT, SummonerRankedInfo } from '../types'
import { usePlayerLeagueIdStore } from '~/stores/playerLeagueId'

const props = defineProps<{
  queueType: QueueTypes
  rankedData: SummonerRankedInfo

}>()

const summonerLeagueIdStore = usePlayerLeagueIdStore()

const rankedData = ref<SummonerRankedInfo>(props.rankedData)

function isRankedSolo(rankedInfo: RankedData | RankedDataTFT | []): rankedInfo is RankedData {
  return (rankedInfo as RankedData)?.leaguePoints !== undefined
}

function isRankedTFT(rankedInfo: RankedData | RankedDataTFT | []): rankedInfo is RankedDataTFT {
  return (rankedInfo as RankedDataTFT).queueType === 'RANKED_TFT_PAIRS'
}

const summonerRankedInfo = computed<RankedData | RankedDataTFT | []>(() => {
  if (Array.isArray(rankedData.value) && rankedData.value.length) {
    const rankedSoloInfo = rankedData.value.filter(info => info.queueType === 'RANKED_SOLO_5x5')[0]
    if (isRankedSolo(rankedSoloInfo))
      summonerLeagueIdStore.setPlayerLeagueId(rankedSoloInfo.leagueId)

    return rankedData.value.filter(info => info?.queueType === props.queueType)[0] ?? []
  }
  return []
})
</script>

<template>
  <div v-if="rankedData">
    <div
      v-if="
        isRankedSolo(summonerRankedInfo)
      " class="flex items-center flex-col flex-wrap justify-evenly text-center"
    >
      <div class="flex flex-row flex-wrap items-center justify-center">
        <div class="flex flex-col items-center text-center">
          <p class="text-lg mb-3">
            Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo.queueType) }}
          </p>
          <div class="flex flex-row gap-2">
            <n-statistic label="Tier" tabular-nums>
              {{
                summonerRankedInfo.tier
              }}
            </n-statistic>
            <n-statistic label="Division" tabular-nums>
              {{
                summonerRankedInfo.rank
              }}
            </n-statistic>
          </div>
        </div>
        <img
          width="200" height="228" class="max-w-[200px] m-2 block object-contain"
          :src="`/emblems/Emblem_${capitalize(summonerRankedInfo.tier)}.webp`" alt=""
        >
      </div>

      <div class="flex gap-4">
        <n-statistic label="League Points" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.leaguePoints"
            :active="true" :precision="0"
          />
        </n-statistic>
        <n-statistic label="Wins" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.wins" :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Losses" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.losses" :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Win Rate" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="
              (summonerRankedInfo.wins
                / (summonerRankedInfo.losses + summonerRankedInfo.wins))
                * 100
            " :active="true" :precision="0"
          />%
        </n-statistic>
      </div>

      <div class="flex flex-row flex-wrap gap-4">
        <n-tag v-if="summonerRankedInfo.hotStreak" class="mt-3 font-bold p-4" type="error">
          Hot Streak
        </n-tag>
        <n-tag v-if="summonerRankedInfo.veteran" class="mt-3 font-bold p-4" type="error">
          Veteran
        </n-tag>
      </div>
    </div>

    <div
      v-else-if="
        isRankedTFT(summonerRankedInfo)
      " class="flex flex-col"
    >
      <div class="flex flex-col items-center text-center">
        <p class="text-lg mb-3">
          Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo.queueType) }}
        </p>
        <n-statistic label="League Points" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.leaguePoints"
            :active="true" :precision="0"
          />
        </n-statistic>
        <div class="flex gap-3">
          <n-statistic label="Wins" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.wins" :active="true"
              :precision="0"
            />
          </n-statistic>
          <n-statistic label="Losses" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef" :from="0" :to="summonerRankedInfo.losses" :active="true"
              :precision="0"
            />
          </n-statistic>
        </div>
        <n-statistic label="Win Rate" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef" :from="0" :to="
              (summonerRankedInfo.wins
                / (summonerRankedInfo.losses + summonerRankedInfo.wins))
                * 100
            " :active="true" :precision="0"
          />%
        </n-statistic>
        <n-tag v-if="summonerRankedInfo.hotStreak" class="mt-3 font-bold p-4" type="error">
          Hot Streak
        </n-tag>
        <n-tag v-if="summonerRankedInfo.veteran" class="mt-3 font-bold p-4" type="error">
          Veteran
        </n-tag>
      </div>
    </div>
    <div
      v-else class="mx-auto md:mt-6 border-light-300 border-1 md:w-sm"
    >
      <img height="240" width="280" src="/unranked.png" class="w-[240px] h-[240px] mx-auto" alt="">
      <p class="text-center text-gray-300 pb-7 -mt-5 font-bold text-xl">
        Unranked
      </p>
    </div>
  </div>
  <div v-else>
    <section>
      <n-skeleton class="mx-auto my-4" height="34px" width="70%" />
      <n-skeleton class="mx-auto" height="451px" width="100%" />
    </section>
  </div>
</template>


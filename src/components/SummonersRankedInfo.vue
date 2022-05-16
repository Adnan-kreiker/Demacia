<script setup lang="ts">
import NStatistic from 'naive-ui/es/statistic/src/Statistic'
import NNumberAnimation from 'naive-ui/es/number-animation/src/NumberAnimation'
import NTag from 'naive-ui/es/tag/src/Tag'
import { storeToRefs } from 'pinia'
import { capitalize, replaceUnderscoreWithSpace } from '../../utils'
import type { QueueTypes, RankedData, RankedDataTFT, Summoner } from '../types'
import { regionStore } from '~/stores/region'
import useSummonerRankedInfoById from '~/hooks/useSummonerRankedInfoById'

const props = defineProps<{
  queueType: QueueTypes
  summonerInfo: Summoner

}>()

const { region } = storeToRefs(regionStore())

const summonerInfo = ref<Summoner>(props.summonerInfo)

const { rankedData } = await useSummonerRankedInfoById(
  summonerInfo.value.id,
  region.value,
)

const summonerRankedInfo = computed<RankedData | RankedDataTFT | undefined>(() => {
  if (Array.isArray(rankedData.value))
    return rankedData.value.filter(info => info?.queueType === props.queueType)[0]

  else
    return undefined
})
</script>

<template>
  <div>
    <div
      v-if="
        summonerRankedInfo
          && (summonerRankedInfo.queueType === 'RANKED_FLEX_SR'
            || summonerRankedInfo.queueType === 'RANKED_SOLO_5x5')
      "
      class="flex items-center flex-col flex-wrap justify-evenly text-center"
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
          width="200"
          height="228"
          class="max-w-[200px] m-2 block object-contain"
          :src="`/emblems/Emblem_${capitalize(summonerRankedInfo.tier)}.webp`"
          alt=""
        >
      </div>

      <div class="flex gap-4">
        <n-statistic label="League Points" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo.leaguePoints"
            :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Wins" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo.wins"
            :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Losses" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo.losses"
            :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Win Rate" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="
              (summonerRankedInfo.wins
                / (summonerRankedInfo.losses + summonerRankedInfo.wins))
                * 100
            "
            :active="true"
            :precision="0"
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
      v-if="
        Array.isArray(summonerRankedInfo)
          && summonerRankedInfo
          && summonerRankedInfo.length > 0
          && summonerRankedInfo.queueType === 'RANKED_TFT_PAIRS'
      "
      class="flex flex-col"
    >
      <div class="flex flex-col items-center text-center">
        <p class="text-lg mb-3">
          Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo.queueType) }}
        </p>
        <n-statistic label="League Points" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo.leaguePoints"
            :active="true"
            :precision="0"
          />
        </n-statistic>
        <div class="flex gap-3">
          <n-statistic label="Wins" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="summonerRankedInfo.wins"
              :active="true"
              :precision="0"
            />
          </n-statistic>
          <n-statistic label="Losses" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="summonerRankedInfo.losses"
              :active="true"
              :precision="0"
            />
          </n-statistic>
        </div>
        <n-statistic label="Win Rate" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="
              (summonerRankedInfo.wins
                / (summonerRankedInfo.losses + summonerRankedInfo.wins))
                * 100
            "
            :active="true"
            :precision="0"
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
      v-if="
        (Array.isArray(summonerRankedInfo)
          && summonerRankedInfo.length === 0)
          || summonerRankedInfo === undefined
      "
      class="border-light-300 border-1"
    >
      <img height="240" width="280" src="/unranked.png" class="w-[240px] h-[240px] mx-auto" alt="">
      <p class="text-center text-gray-300 pb-7 -mt-5 font-bold text-xl">
        Unranked
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SummonerRankedInfo } from "~/types";
import { NStatistic, NNumberAnimation } from "naive-ui";
import { replaceUnderscoreWithSpace, capitalize } from "../../utils";

const props = defineProps<{
  summonerRankedInfo: SummonerRankedInfo;
}>();

const summonerRankedInfo = ref<SummonerRankedInfo>(props.summonerRankedInfo);
</script>
<template>
  <div
    class="flex items-center justify-evenly text-center"
    v-if="summonerRankedInfo && summonerRankedInfo?.length > 0"
  >
    <div class="flex flex-col items-center text-center">
      <p>Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo[0].queueType) }}</p>
      <n-statistic label="Tier" tabular-nums>{{
        summonerRankedInfo[0].tier
      }}</n-statistic>
      <n-statistic label="Rank" tabular-nums>{{
        summonerRankedInfo[0].rank
      }}</n-statistic>
      <n-statistic label="League Points" tabular-nums>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="summonerRankedInfo[0].leaguePoints"
          :active="true"
          :precision="0"
        />
      </n-statistic>
      <div class="flex gap-3">
        <n-statistic label="Wins" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo[0].wins"
            :active="true"
            :precision="0"
          />
        </n-statistic>
        <n-statistic label="Losses" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="summonerRankedInfo[0].losses"
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
            (summonerRankedInfo[0].wins /
              (summonerRankedInfo[0].losses + summonerRankedInfo[0].wins)) *
            100
          "
          :active="true"
          :precision="0"
        />%
      </n-statistic>
    </div>
    <img
      class="max-w-[200px] object-contain"
      :src="`/public/emblems/Emblem_${capitalize(summonerRankedInfo[0].tier)}.png`"
      alt=""
    />
  </div>
</template>

<style scoped></style>

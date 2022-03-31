<script setup lang="ts">
import { RankedData } from "~/types";
import { NStatistic, NNumberAnimation } from "naive-ui";
import { replaceUnderscoreWithSpace, capitalize } from "../../utils";

const props = defineProps<{
  summonerRankedInfo: RankedData;
}>();

const summonerRankedInfo = ref<RankedData>(props.summonerRankedInfo);
</script>
<template>
  <div class="flex items-center justify-evenly text-center" v-if="summonerRankedInfo">
    <div class="flex flex-col items-center text-center">
      <p>Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo.queueType) }}</p>
      <n-statistic label="Tier" tabular-nums>{{ summonerRankedInfo.tier }}</n-statistic>
      <n-statistic label="Division" tabular-nums>{{
        summonerRankedInfo.rank
      }}</n-statistic>
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
            (summonerRankedInfo.wins /
              (summonerRankedInfo.losses + summonerRankedInfo.wins)) *
            100
          "
          :active="true"
          :precision="0"
        />%
      </n-statistic>
    </div>
    <img
      class="max-w-[200px] object-contain"
      :src="`/public/emblems/Emblem_${capitalize(summonerRankedInfo.tier)}.png`"
      alt=""
    />
  </div>
</template>

<style scoped></style>

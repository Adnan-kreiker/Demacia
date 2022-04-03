<script setup lang="ts">
import { QueueTypes, RankedData, RankedDataTFT, SummonerRankedInfo } from "~/types";
import { NStatistic, NNumberAnimation, NTag } from "naive-ui";
import { replaceUnderscoreWithSpace, capitalize } from "../../utils";

const props = defineProps<{
  summonerRankedInfo: SummonerRankedInfo;
  queueType: QueueTypes;
}>();

// const summonerRankedInfo = ref<RankedData | RankedDataTFT>(props.summonerRankedInfo.filter(
//   (info) => info.queueType === props.queueType
// ));

const rankedInfo = ref<SummonerRankedInfo>(props.summonerRankedInfo);

const summonerRankedInfo = computed<RankedData | RankedDataTFT>(() => {
  return rankedInfo.value.filter((info) => info.queueType === props.queueType)[0];
});
// const queue = ref(props.queueType);
</script>
<template>
  <div
    class="flex items-center justify-evenly text-center"
    v-if="
      props.summonerRankedInfo.length > 0 &&
      (summonerRankedInfo.queueType === 'RANKED_FLEX_SR' ||
        summonerRankedInfo.queueType === 'RANKED_SOLO_5x5')
    "
  >
    <div class="flex flex-col items-center text-center">
      <p class="text-lg mb-3">
        Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo.queueType) }}
      </p>
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
      <n-tag v-if="summonerRankedInfo.hotStreak" class="mt-3 font-bold p-4" type="error"
        >Hot Streak</n-tag
      >
      <n-tag v-if="summonerRankedInfo.veteran" class="mt-3 font-bold p-4" type="error"
        >Veteran</n-tag
      >
    </div>
    <img
      class="max-w-[200px] object-contain"
      :src="`/public/emblems/Emblem_${capitalize(summonerRankedInfo.tier)}.png`"
      alt=""
    />
  </div>
  <div
    class="flex flex-col"
    v-if="props.summonerRankedInfo.length > 0 && (summonerRankedInfo as RankedDataTFT).queueType === 'RANKED_TFT_PAIRS'"
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
            (summonerRankedInfo.wins /
              (summonerRankedInfo.losses + summonerRankedInfo.wins)) *
            100
          "
          :active="true"
          :precision="0"
        />%
      </n-statistic>
      <n-tag v-if="summonerRankedInfo.hotStreak" class="mt-3 font-bold p-4" type="error"
        >Hot Streak</n-tag
      >
      <n-tag v-if="summonerRankedInfo.veteran" class="mt-3 font-bold p-4" type="error"
        >Veteran</n-tag
      >
    </div>
  </div>
  <template v-else></template>
</template>

<style scoped></style>
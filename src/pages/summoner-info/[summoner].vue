<script setup lang="ts">
import { useRoute } from "vue-router";
import { NSkeleton, NSpace, NSelect } from "naive-ui";
import { Summoner, MatchInfo, SummonerRankedInfo, QueueTypes } from "~/types";
import { unicodeToUtf8, replaceUnderscoreWithSpace } from "../../../utils";
import SummonersRankedInfo from "../../components/SummonersRankedInfo.vue";
import MatchHistory from "../..//components/MatchHistory.vue";

const route = useRoute();

const summonerInfo = ref<null | Summoner>(null);

const matchHistory = ref<MatchInfo[]>([]);

const summonerRankedInfo = ref<null | SummonerRankedInfo>(null);

const summoner = route.params.summoner as string;

const rankedType = computed(() => {
  return summonerRankedInfo.value?.map((info) => {
    return {
      label: replaceUnderscoreWithSpace(info.queueType),
      value: info.queueType,
    };
  });
});

const queueOptions = rankedType;

const queueType = ref<QueueTypes>("RANKED_SOLO_5x5");

const getSummonerInfo = async () => {
  try {
    // Fetch Summoner's Info
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summoner)}`
    );
    const data = (await res.json()) as Summoner;

    summonerInfo.value = data;

    // Get Match History Info
    getMatchHistory();

    // Fetch Summoner's Ranked Info
    const rankedInfo = await fetch(
      `${import.meta.env.VITE_URL}/api/get-ranked-info/${summonerInfo.value.id}`
    );

    const rankedData = (await rankedInfo.json()) as SummonerRankedInfo;
    console.log(rankedData);
    summonerRankedInfo.value = rankedData;
  } catch (error) {
    console.error(error);
  }
};

const getMatchHistory = async () => {
  if (summonerInfo.value) {
    // Fetch Summoner's Match IDs
    const matches = await fetch(
      `${import.meta.env.VITE_URL}/api/get-matches/${
        summonerInfo.value.puuid
      }?start=0&count=10`
    );

    const matchesId = await matches.json();
    // const matchHistoryData: MatchInfo[] = [];

    // Fetch Summoner's Matches
    await Promise.allSettled(
      matchesId.map(async (matchId: string) => {
        const match = await fetch(`${import.meta.env.VITE_URL}/api/get-match/${matchId}`);
        const data = await match.json();
        matchHistory.value.push({ ...data, show: false });
      })
    );
  }
};

getSummonerInfo();
</script>

<template>
  <div>
    <!-- Summoner's Information -->
    <div
      v-if="summonerInfo && (summonerRankedInfo === [] || summonerRankedInfo)"
      class="flex flex-wrap mb-8 justify-evenly min-h-[382px]"
    >
      <div>
        <n-space :item-style="{ marginBottom: 20 + 'px', minWidth: 100 + '%' }">
          <n-select v-model:value="queueType" :options="queueOptions"></n-select>
        </n-space>
        <summoners-info :summoner-info="summonerInfo"></summoners-info>
      </div>
      <template v-if="summonerRankedInfo.length > 0">
        <summoners-ranked-info
          :summonerRankedInfo="summonerRankedInfo"
          :queue-type="queueType"
        ></summoners-ranked-info>
      </template>
    </div>
    <div v-else class="w-full mb-8 flex gap-3 justify-center flex-row">
      <n-space vertical class="w-[240px]">
        <n-skeleton height="330px" width="100%" />
        <n-skeleton height="30px" width="100%" />
      </n-space>
      <div class="w-1/2 flex gap-3 flex-row">
        <n-skeleton height="330px" width="50%" />
        <n-skeleton height="330px" width="50%" />
      </div>
    </div>
    <!-- Match History  -->
    <section v-if="matchHistory && matchHistory?.length > 0">
      <match-history :match-history="matchHistory"></match-history>
    </section>
    <section class="flex flex-col gap-3 justify-center items-center" v-else>
      <n-skeleton v-for="i in 10" :key="i" height="256px" width="100%" />
    </section>
  </div>
</template>

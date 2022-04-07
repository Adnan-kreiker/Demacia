<script setup lang="ts">
import { useRoute } from "vue-router";
import { NSkeleton, NSpace, NSelect, NH2, NText } from "naive-ui";
import { Summoner, MatchInfo, SummonerRankedInfo, QueueTypes } from "~/types";
import { unicodeToUtf8, replaceUnderscoreWithSpace } from "../../../utils";
import SummonersRankedInfo from "../../components/SummonersRankedInfo.vue";
import MatchHistoryInfo from "../../components/MatchHistoryInfo.vue";
import ErrorComponent from "~/components/ErrorComponent.vue";
import SearchForSummoner from "~/components/SearchForSummoner.vue";

const route = useRoute();

const summonerInfo = ref<null | Summoner>(null);

const matchHistory = ref<MatchInfo[]>([]);

const summonerRankedInfo = ref<null | SummonerRankedInfo>(null);

const summoner = route.params.summoner as string;

const rankedType = computed(() => {
  if (summonerRankedInfo.value && Array.isArray(summonerRankedInfo.value)) {
    return summonerRankedInfo.value?.map((info) => {
      return {
        label: replaceUnderscoreWithSpace(info.queueType),
        value: info.queueType,
      };
    });
  }
});

const queueOptions = rankedType;

const queueType = ref<QueueTypes>("RANKED_SOLO_5x5");

const error = ref(false);

const getSummonerInfo = async () => {
  try {
    // Fetch Summoner's Info
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summoner)}`
    );
    const data = (await res.json()) as Summoner;

    summonerInfo.value = data;

    if (summonerInfo.value.status && summonerInfo.value.status.status_code == 404) {
      error.value = true;
    }

    // Get Match History Info
    getMatchHistory();

    // Fetch Summoner's Ranked Info
    const rankedInfo = await fetch(
      `${import.meta.env.VITE_URL}/api/get-ranked-info/${summonerInfo.value.id}`
    );

    const rankedData = (await rankedInfo.json()) as SummonerRankedInfo;
    summonerRankedInfo.value = rankedData;
  } catch (err) {
    console.error(err, "dsadsd");
    error.value = true;
  }
};

const getMatchHistory = async () => {
  if (summonerInfo.value) {
    try {
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
          const match = await fetch(
            `${import.meta.env.VITE_URL}/api/get-match/${matchId}`
          );
          const data = await match.json();
          matchHistory.value.push({ ...data, show: false });
        })
      );
    } catch (err) {
      error.value = true;
      console.log(err);
    }
    // Fetch Summoner's Match IDs
  }
};

getSummonerInfo();
</script>

<template>
  <div>
    <div v-if="!error">
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
        <template
          v-if="Array.isArray(summonerRankedInfo) && summonerRankedInfo.length > 0"
        >
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
        <match-history-info :match-history="matchHistory"></match-history-info>
      </section>
      <section class="flex flex-col gap-3 justify-center items-center" v-else>
        <n-skeleton v-for="i in 10" :key="i" height="256px" width="100%" />
      </section>
    </div>
    <div v-if="error" class="flex flex-col justify-start items-center">
      <error-component
        :status="'404'"
        :description="'Make sure you have to correct name'"
        :title="'Summoner Not Found!'"
      ></error-component>
      <n-h2 class="mt-0">
        <n-text type="primary">Try Again</n-text>
      </n-h2>
      <search-for-summoner></search-for-summoner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { NCard, NTag } from "naive-ui";
import { Summoner, MatchInfo, RankedData } from "~/types";
import { unixToDate, unicodeToUtf8 } from "../../../utils";
import SummonersInfo from "../../components/SummonersInfo.vue";
import MatchHistory from "../..//components/MatchHistory.vue";

const route = useRoute();

const summonerInfo = ref<null | Summoner>(null);

const matchHistory = ref<null | MatchInfo[]>([]);

const summonerRankedInfo = ref<null | RankedData>(null);

const summoner = route.params.summoner as string;

const getSummonerInfo = async () => {
  try {
    // Fetch Summoner's Info
    const res = await fetch(
      `http://localhost:5000/api/get-summoner/${unicodeToUtf8(summoner)}`
    );
    const data = (await res.json()) as Summoner;

    summonerInfo.value = data;

    // Get Match History Info
    getMatchHistory();

    // Fetch Summoner's Ranked Info
    const rankedInfo = await fetch(
      `http://localhost:5000/api/get-ranked-info/${summonerInfo.value.id}`
    );

    const rankedData = (await rankedInfo.json()) as RankedData[];
    console.log(rankedData);
    const soloQ = rankedData.find((info) => info.queueType === "RANKED_SOLO_5x5");
    console.log(soloQ);
    summonerRankedInfo.value = soloQ ? soloQ : null;
  } catch (error) {
    console.error(error);
  }
};

const getMatchHistory = async () => {
  if (summonerInfo.value) {
    // Fetch Summoner's Match IDs
    const matches = await fetch(
      `http://localhost:5000/api/get-matches/${summonerInfo.value.puuid}?start=0&count=10`
    );

    const matchesId = await matches.json();

    // Fetch Summoner's Matches
    await Promise.allSettled(
      matchesId.map(async (matchId: string) => {
        const match = await fetch(`http://localhost:5000/api/get-match/${matchId}`);
        const data = await match.json();
        matchHistory.value?.push({ ...data, show: false });
      })
    );
  }
};

getSummonerInfo();
</script>

<template>
  <div v-if="summonerInfo">
    <!-- Summoner's Information -->
    <div class="flex flex-wrap justify-evenly">
      <div>
        <n-card class="max-w-[400px]" :title="summonerInfo.name">
          <template #cover>
            <!-- <img
              v-if="summonerRankedInfo && summonerRankedInfo.tier"
              width="400"
              height="400"
              :src="`https://raw.communitydragon.org/12.6/game/assets/loadouts/regalia/crests/ranked/${rankToOrderMapper(
                summonerRankedInfo?.tier as Tier
              )}/${rankToOrderMapper(summonerRankedInfo?.tier as Tier)}_base.csscraps.png`"
              alt=""
            /> -->
            <img
              :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerInfo.profileIconId}.png`"
            />
          </template>
          <p>Level: {{ summonerInfo.summonerLevel }}</p>
        </n-card>
        <n-tag type="info" class="my-3">
          Last Activity :
          {{ unixToDate(summonerInfo.revisionDate) }}
        </n-tag>
      </div>
      <summoners-info
        v-if="summonerRankedInfo"
        :summonerRankedInfo="summonerRankedInfo"
      ></summoners-info>
    </div>
    <!-- Match History  -->
    <section v-if="matchHistory && matchHistory?.length > 0">
      <match-history :match-history="matchHistory"></match-history>
    </section>
  </div>
</template>

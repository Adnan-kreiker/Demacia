<script setup lang="ts">
import {
  QueueTypes,
  ChallengerPlayers,
  ChallengerPlayer,
  ChallengerPlayerWithIndex,
} from "../../src/types";
// import SummonersList from "~/components/SummonersList.vue";
import SummonersTable from "~/components/SummonersTable.vue";
import { NPagination, NSkeleton } from "naive-ui";

// add idx field to each value in challengerPlayers

const queueType = ref<QueueTypes>(QueueTypes.RANKED_SOLO_5x5);
const challengerPlayers = ref<ChallengerPlayer[] | []>([]);

const sortedChallengerPlayers = computed<ChallengerPlayerWithIndex[] | []>(() => {
  if (challengerPlayers.value) {
    return (challengerPlayers.value as ChallengerPlayerWithIndex[])
      .sort((a, b) => b.leaguePoints - a.leaguePoints)
      .map((player, idx) => {
        return {
          ...player,
          idx: idx + 1,
        };
      });
  }
  return [];
});

const currentPageData = computed(() => {
  if (sortedChallengerPlayers.value.length > 0) {
    let start = page.value * 10;
    return sortedChallengerPlayers.value.slice(start - 10, start);
  }
  return [];
});

const page = ref(1);

const getChallengerPlayers = async () => {
  const res = await fetch(
    `http://localhost:5000/api/get-challenger-players/${queueType.value}`
  );
  const data = (await res.json()) as ChallengerPlayers;
  challengerPlayers.value = data.entries;
};

const updatePage = (pageNumber: number) => {
  page.value = pageNumber;
};

getChallengerPlayers();
</script>

<template>
  <div class="min-h-screen">
    <summoners-table
      v-if="challengerPlayers.length > 0"
      :challenger-players="currentPageData"
      :key="page"
      :page="page"
    ></summoners-table>
    <div v-else v-for="n in 10" :key="n">
      <div class="flex">
        <div class="flex flex-col gap-2">
          <n-skeleton height="40px" width="70%" />
          <n-skeleton height="40px" width="70%" :sharp="false" />
          <n-skeleton height="40px" width="70%" :sharp="false" />
        </div>
        <div>
          <n-skeleton height="40px" width="100%" circle />
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <n-pagination
        v-model="page"
        :default-page="1"
        :page-count="30"
        v-on:update-page="updatePage($event)"
      ></n-pagination>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

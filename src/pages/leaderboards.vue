<script setup lang="ts">
import {
  QueueTypes,
  ChallengerPlayers,
  ChallengerPlayer,
  ChallengerPlayerWithIndex,
} from "../../src/types";
// import SummonersList from "~/components/SummonersList.vue";
import { NPagination } from "naive-ui";
import SummonersTableSkeleton from "~/components/SummonersTableSkeleton.vue";
import SummonersTable from "~/components/SummonersTable.vue";

const queueType = ref<QueueTypes>(QueueTypes.RANKED_SOLO_5x5);
getChallengerPlayers();
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

async function getChallengerPlayers() {
  const res = await fetch(
    `http://localhost:5000/api/get-challenger-players/${queueType.value}`
  );
  const data = (await res.json()) as ChallengerPlayers;
  challengerPlayers.value = data.entries;
}

const updatePage = (pageNumber: number) => {
  page.value = pageNumber;
};
</script>

<template>
  <div class="min-h-screen">
    <summoners-table
      v-if="challengerPlayers.length > 0"
      :challenger-players="currentPageData"
      :key="page"
      :page="page"
    ></summoners-table>
    <summoners-table-skeleton v-else></summoners-table-skeleton>
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

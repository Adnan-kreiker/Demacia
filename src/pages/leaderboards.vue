<script setup lang="ts">
import {
  ChallengerPlayers,
  ChallengerPlayer,
  ChallengerPlayerWithIndex,
  Ranks,
} from "../../src/types";
import { NPagination, NSelect, NSpace, NH3, NText } from "naive-ui";
import SummonersTableSkeleton from "~/components/SummonersTableSkeleton.vue";
import SummonersTable from "~/components/SummonersTable.vue";

const queueOptions = [
  {
    label: "RANKED SOLO 5x5",
    value: "RANKED_SOLO_5x5",
  },
  {
    label: "RANKED FLEX SR",
    value: "RANKED_FLEX_SR",
  },
];

const rankOptions = [
  {
    label: "CHALLENGER",
    value: "challengerleagues",
  },
  {
    label: "GRANDMASTER",
    value: "grandmasterleagues",
  },
  {
    label: "MASTER",
    value: "masterleagues",
  },
];

const queue = ref("RANKED_SOLO_5x5");
const rank = ref<Ranks>("challengerleagues");

const challengerPlayers = ref<ChallengerPlayer[] | []>([]);

getChallengerPlayers();

const sortedChallengerPlayers = computed<ChallengerPlayerWithIndex[] | []>(() => {
  let start = page.value * 10;
  if (challengerPlayers.value) {
    return ([...challengerPlayers.value] as ChallengerPlayerWithIndex[])
      .sort((a, b) => b.leaguePoints - a.leaguePoints)
      .map((player, idx) => {
        return {
          ...player,
          idx: idx + 1,
        };
      })
      .slice(start - 10, start);
  }
  return [];
});

const page = ref(1);

async function getChallengerPlayers() {
  challengerPlayers.value = [];
  const res = await fetch(
    `${import.meta.env.VITE_URL}/api/get-leaderboards-players/${rank.value}/${
      queue.value
    }`
  );
  const data = (await res.json()) as ChallengerPlayers;
  challengerPlayers.value = data.entries;
  summonersTableKey.value++;
}

const summonersTableKey = ref(0);

watch([queue, rank], () => {
  getChallengerPlayers();
  page.value = 1;
});

watch(page, () => {
  summonersTableKey.value++;
});

const updatePage = (pageNumber: number) => {
  page.value = pageNumber;
  summonersTableKey.value++;
};
</script>

<template>
  <div class="min-h-screen">
    <n-space>
      <n-h3 class="mx-4" prefix="bar" align-text type="success">
        <n-text type="success"> Choose queue type </n-text>
      </n-h3>
      <n-select class="min-w-56 pr-4" v-model:value="queue" :options="queueOptions" />
      <n-select class="min-w-56" v-model:value="rank" :options="rankOptions" />
    </n-space>
    <summoners-table
      :rank="rank"
      v-if="challengerPlayers && challengerPlayers.length > 0"
      :challenger-players="sortedChallengerPlayers"
      :key="summonersTableKey"
      :page="page"
    ></summoners-table>
    <summoners-table-skeleton v-else></summoners-table-skeleton>
    <div class="flex justify-center mt-5">
      <n-pagination
        v-if="challengerPlayers && challengerPlayers.length > 0"
        v-model="page"
        :default-page="1"
        :page-count="Math.ceil(challengerPlayers.length / 10)"
        v-on:update-page="updatePage($event)"
      ></n-pagination>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

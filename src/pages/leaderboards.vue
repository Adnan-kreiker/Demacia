<script setup lang="ts">
import {
  ChallengerPlayers,
  ChallengerPlayer,
  ChallengerPlayerWithIndex,
  Ranks,
} from "../../src/types";
import SummonersTableSkeleton from "~/components/SummonersTableSkeleton.vue";
import SummonersTable from "~/components/SummonersTable.vue";
import NSelect from "naive-ui/es/select/src/Select";
import NPagination from "naive-ui/es/pagination/src/Pagination";
import { NText } from "naive-ui/es/typography";
import { NH3 } from "naive-ui/es/typography";
import { regionToRegionParamMapper } from "../../utils";

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

const servers = ["EUW", "KR", "EUNE", "JP", "BR", "LAN", "LAS"];

const regionOptions = servers.map((server) => {
  return {
    label: server,
    value: regionToRegionParamMapper(server),
  };
});

const regionVal = ref("euw1");

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
    }?region=${regionVal.value}`
  );
  const data = (await res.json()) as ChallengerPlayers;
  challengerPlayers.value = data.entries;
  summonersTableKey.value++;
}

const summonersTableKey = ref(0);

watch([queue, rank, regionVal], () => {
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
    <div class="flex flex-row flex-wrap items-center mb-4">
      <n-h3 class="mx-4 my-auto" prefix="bar" align-text type="success">
        <n-text type="success"> Choose queue type </n-text>
      </n-h3>
      <div class="flex flex-row flex-wrap flex-grow">
        <n-select
          class="pr-5 min-w-36 max-w-[170px] my-1"
          v-model:value="queue"
          :options="queueOptions"
        />
        <n-select
          class="max-w-[150px] min-w-20 my-1 pr-5"
          v-model:value="rank"
          :options="rankOptions"
        />
        <n-select
          class="max-w-[40px] min-w-20 my-1"
          v-model:value="regionVal"
          :options="regionOptions"
        />
      </div>
    </div>
    <summoners-table
      :rank="rank"
      v-if="challengerPlayers && challengerPlayers.length > 0"
      :challenger-players="sortedChallengerPlayers"
      :key="summonersTableKey"
      :page="page"
      :region="regionVal"
    >
    </summoners-table>
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

<style scoped>
.n-h:first-child {
  margin-top: 7px;
}
</style>
<route lang="yaml">
meta:
  layout: default
</route>

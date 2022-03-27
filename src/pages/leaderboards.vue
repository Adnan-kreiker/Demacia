<script setup lang="ts">
import { QueueTypes, ChallengerPlayers, ChallengerPlayer } from "../../src/types";
import SummonersList from "~/components/SummonersList.vue";
import { NPagination } from "naive-ui";

const queueType = ref<QueueTypes>(QueueTypes.RANKED_SOLO_5x5);
const challengerPlayers = ref<ChallengerPlayer[] | []>([]);

const sortedChallengerPlayers = computed<ChallengerPlayer[] | []>(() => {
  if (challengerPlayers.value) {
    return challengerPlayers.value.sort((a, b) => b.leaguePoints - a.leaguePoints);
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
  console.log("updated", pageNumber);
};

getChallengerPlayers();
</script>

<template>
  <div v-if="challengerPlayers?.length > 0">
    <summoners-list
      :queue-type="QueueTypes.RANKED_SOLO_5x5"
      :challenger-players="currentPageData"
      :key="page"
    ></summoners-list>
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

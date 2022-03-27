<script setup lang="ts">
import { QueueTypes, ChallengerPlayers, ChallengerPlayer } from "../../src/types";
import SummonersList from "~/components/SummonersList.vue";
import { NPagination } from "naive-ui";

const queueType = ref<QueueTypes>(QueueTypes.RANKED_SOLO_5x5);
const challengerPlayers = ref<ChallengerPlayer[] | null>(null);

const sortedChallengerPlayers = computed<ChallengerPlayer[] | []>(() => {
  if (challengerPlayers.value) {
    return challengerPlayers.value.sort((a, b) => b.leaguePoints - a.leaguePoints);
  }
  return [];
});

const currentPageData = (start: number) => {
  if (sortedChallengerPlayers.value.length > 0) {
    return sortedChallengerPlayers.value.slice(start, start + 10);
  }
  return [];
};

const page = ref(0);

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
  <div>
    <summoners-list
      :queue-type="QueueTypes.RANKED_SOLO_5x5"
      :challenger-players="currentPageData(page * 10)"
    ></summoners-list>
    <div class="flex justify-center mt-5">
      <n-pagination
        v-model="page"
        :page-count="30"
        v-on:update-page="updatePage($event)"
      ></n-pagination>
    </div>
  </div>
</template>

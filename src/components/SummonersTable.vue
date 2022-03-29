<script setup lang="ts">
import { NTable } from "naive-ui";
import { ChallengerPlayerWithIndex } from "~/types";
import { ChallengerPlayerWithAdditionalData, Summoner } from "~/types";

const props = defineProps<{
  challengerPlayers: ChallengerPlayerWithIndex[];
  page: number;
}>();

const challengerPlayersData = ref<ChallengerPlayerWithIndex[]>(props.challengerPlayers);

const challengerPlayersWithData = ref<ChallengerPlayerWithAdditionalData[]>([]);

const sortedChallengerPlayers = computed<ChallengerPlayerWithAdditionalData[]>(() => {
  if (challengerPlayersWithData.value) {
    return challengerPlayersWithData.value.sort(
      (a, b) => b.leaguePoints - a.leaguePoints
    );
  }
  return [];
});

const getSummonersInfo = async () => {
  if (props.challengerPlayers) {
    Promise.allSettled(
      props.challengerPlayers.map(async (player) => {
        const res = await fetch(
          `http://localhost:5000/api/get-summoner/${player.summonerName.toLowerCase()}`
        );
        const data = (await res.json()) as Summoner;
        challengerPlayersWithData.value.push({
          ...player,
          ...data,
        });
      })
    );
  }
};
console.log(challengerPlayersData.value);
watch(
  challengerPlayersData,
  () => {
    getSummonersInfo();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="min-h-screen">
    <n-table v-if="sortedChallengerPlayers.length > 0">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Summoner</th>
          <th>Tier</th>
          <th>LP</th>
          <th>Win Ratio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in sortedChallengerPlayers" :key="player.summonerId">
          <td>{{ player.idx }}</td>
          <td class="flex flex-row items-center">
            <img
              class="h-10 w-10 rounded-full my-auto"
              v-if="player.profileIconId"
              :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${player.profileIconId}.png`"
            />
            <img class="h-10 w-10" v-else src="/public/defaultPic.png" alt="" />
            <span class="ml-4">
              {{ player.summonerName }}
            </span>
          </td>
          <td>Challenger</td>
          <td>{{ player.leaguePoints }}</td>
          <td>{{ Math.floor((player.wins / (player.wins + player.losses)) * 100) }} %</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

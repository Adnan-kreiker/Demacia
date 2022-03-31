<script setup lang="ts">
import { NTable } from "naive-ui";
import {
  ChallengerPlayerWithIndex,
  ChallengerPlayerWithAdditionalData,
  Summoner,
} from "~/types";
import SummonersTableSkeleton from "~/components/SummonersTableSkeleton.vue";
import { unicodeToUtf8 } from "../../utils";
const props = defineProps<{
  challengerPlayers: ChallengerPlayerWithIndex[];
  page: number;
}>();

// const challengerPlayersData = ref<ChallengerPlayerWithIndex[]>(props.challengerPlayers);

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
    const result: ChallengerPlayerWithAdditionalData[] = [];
    await Promise.allSettled(
      props.challengerPlayers.map(async (player) => {
        const res = await fetch(
          `http://localhost:5000/api/get-summoner/${unicodeToUtf8(player.summonerName)}`
        );
        const data = (await res.json()) as Summoner;
        result.push({
          ...player,
          ...data,
        });
      })
    );
    challengerPlayersWithData.value = result;
  }
};

getSummonersInfo();
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
          <th>Level</th>
          <th>Win Ratio</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          :to="`/summoner-info/${player.summonerName}`"
          v-for="player in sortedChallengerPlayers"
          :key="player.summonerId"
          custom
          v-slot="{ navigate }"
        >
          <tr @click="navigate" class="hover:cursor-pointer">
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
            <td>{{ player.summonerLevel }}</td>
            <td>
              {{ Math.floor((player.wins / (player.wins + player.losses)) * 100) }} %
            </td>
          </tr>
        </router-link>
      </tbody></n-table
    >
    <summoners-table-skeleton v-else></summoners-table-skeleton>
  </div>
</template>

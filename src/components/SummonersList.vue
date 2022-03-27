<script setup lang="ts">
import {
  QueueTypes,
  ChallengerPlayer,
  Summoner,
  ChallengerPlayerWithAdditionalData,
} from "~/types";
import { NCard, NStatistic, NNumberAnimation } from "naive-ui";

const props = defineProps<{
  queueType: QueueTypes.RANKED_SOLO_5x5;
  challengerPlayers: ChallengerPlayer[];
}>();

const challengerPlayersData = ref<ChallengerPlayer[]>(props.challengerPlayers);

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
  <div v-if="sortedChallengerPlayers.length">
    <n-card
      v-for="challengerPlayer in sortedChallengerPlayers"
      :key="challengerPlayer.summonerId"
      bordered
      hoverable
      class="my-2"
    >
      <div class="flex justify-evenly">
        <div class="flex flex-col items-center text-center">
          <h2 class="text-2xl font-bold my-2">{{ challengerPlayer.summonerName }}</h2>
          <n-statistic label="Rank" tabular-nums>{{ challengerPlayer.rank }}</n-statistic>
          <n-statistic label="League Points" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="challengerPlayer.leaguePoints"
              :active="true"
              :precision="0"
            />
          </n-statistic>
          <div class="flex gap-3">
            <n-statistic label="Wins" tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="challengerPlayer.wins"
                :active="true"
                :precision="0"
              />
            </n-statistic>
            <n-statistic label="Losses" tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="challengerPlayer.losses"
                :active="true"
                :precision="0"
              />
            </n-statistic>
          </div>
          <n-statistic label="Win Rate" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="
                (challengerPlayer.wins /
                  (challengerPlayer.losses + challengerPlayer.wins)) *
                100
              "
              :active="true"
              :precision="0"
            />%
          </n-statistic>
        </div>
        <div class="flex items-center">
          <img
            class="h-60 w-60 rounded-full my-auto"
            v-if="challengerPlayer.profileIconId"
            :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${challengerPlayer.profileIconId}.png`"
          />
          <img v-else src="/public/defaultPic.png" alt="" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped></style>

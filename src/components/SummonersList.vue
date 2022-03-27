<script setup lang="ts">
import { QueueTypes, ChallengerPlayer } from "~/types";
import { NCard, NStatistic, NNumberAnimation } from "naive-ui";

const props = defineProps<{
  queueType: QueueTypes.RANKED_SOLO_5x5;
  challengerPlayers: ChallengerPlayer[] | null;
}>();

const sortedChallengerPlayers = computed<ChallengerPlayer[] | []>(() => {
  if (props.challengerPlayers) {
    return props.challengerPlayers.sort((a, b) => b.leaguePoints - a.leaguePoints);
  }
  return [];
});
</script>

<template>
  <div v-if="props.challengerPlayers && props.challengerPlayers.length > 0">
    <n-card
      v-for="challengerPlayer in sortedChallengerPlayers"
      :key="challengerPlayer.summonerId"
      bordered
      hoverable
      class="my-2"
    >
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
    </n-card>
  </div>
</template>

<style scoped></style>

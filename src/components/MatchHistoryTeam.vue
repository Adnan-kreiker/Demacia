<script setup lang="ts">
import { Participant, TeamType } from "~/types";
import MatchHistorySummoners from "./MatchHistorySummoners.vue";
const props = defineProps<{
  participants: Participant[];
}>();

const teams: TeamType[] = [
  {
    id: 1,
    val: 100,
  },
  {
    id: 2,
    val: 200,
  },
];
</script>
<template>
  <div class="flex flex-row">
    <MatchHistorySummoners
      v-for="team in teams"
      :key="team.id"
      :team="team.val"
      :participants="props.participants"
    >
    </MatchHistorySummoners>
  </div>
</template>

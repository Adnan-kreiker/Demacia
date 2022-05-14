<script setup lang="ts">
import MatchHistorySummoners from './MatchHistorySummoners.vue'
import { Participant, TeamType } from '~/types'
const props = defineProps<{
  participants: Participant[]
}>()

const teams: TeamType[] = [
  {
    id: 1,
    val: 100,
  },
  {
    id: 2,
    val: 200,
  },
]
</script>
<template>
  <div class="flex flex-row">
    <MatchHistorySummoners
      v-for="team in teams"
      :key="team.id"
      :team="team.val"
      :participants="props.participants"
    />
  </div>
</template>

<script setup lang="ts">
import NTable from 'naive-ui/es/table/src/Table'
import { toLowerCase } from '../../utils'
import type { Participant } from '~/types'

const props = defineProps<{
  participants: Participant[]
  team: 100 | 200
}>()

const teamColor = computed(() => {
  return props.team === 100 ? 'Blue Team' : 'Red Team'
})

const tableColor = (team: number): string => {
  if (team === 100)
    return '#1f306a'

  else
    return '#3e213b'
}

const patchVersion = import.meta.env.VITE_PATCH_VERSION

</script>

<template>
  <n-table :style="{ '--n-th-color': tableColor(props.team) }" class="text-gray-600">
    <tr class="text-center">
      <th>{{ teamColor }}</th>
      <th>Level</th>
      <th>KDA</th>
      <th>Damage</th>
      <th>Wards</th>
      <th>CS</th>
      <th>items</th>
    </tr>
    <tr
      v-for="participant in props.participants.filter(
        (participant) => participant.teamId == props.team
      )"
      :key="participant.championName"
    >
      <th class="flex flex-row items-center">
        <div class="mr-2">
          <img
            height="40"
            width="40"
            :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${toLowerCase(
              participant.championName
            )}.png`"
          >
        </div>
        <span class="truncate text-xs max-w-[80px] overflow-ellipsis space-nowrap">{{
          participant.summonerName
        }}</span>
      </th>
      <th>
        <span class="mx-4">{{ participant.summonerLevel }}</span>
      </th>
      <th>
        <span class="mx-4">
          {{ participant.kills }} / {{ participant.deaths }} /
          {{ participant.assists }}
        </span>
      </th>
      <th>
        <span class="mx-4">
          {{ participant.totalDamageDealtToChampions }}
        </span>
      </th>
      <th>
        <span class="mx-4">{{ participant.wardsPlaced }}</span>
      </th>
      <th>
        <span class="mx-4">{{ participant.totalMinionsKilled }}</span>
      </th>
      <th>
        <div class="flex flex-row gap-1">
          <div v-for="i in 6" :key="i">
            <img
              v-if="participant[(`item${i}`) as keyof Participant] !== 0"
              height="25"
              width="25"
              :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${participant[(`item${i}`) as keyof Participant]}.png`"
            >
          </div>
        </div>
      </th>
    </tr>
  </n-table>
</template>

<script setup lang="ts">
import NTable from "naive-ui/es/table/src/Table";
import { Participant } from "~/types";
import { toLowerCase } from "../../utils";

const props = defineProps<{
  participants: Participant[];
  team: 100 | 200;
}>();

const teamColor = computed(() => {
  return props.team === 100 ? "Blue Team" : "Red Team";
});

const tableColor = (team: number): string => {
  if (team === 100) {
    return "#1f306a";
  } else {
    return "#3e213b";
  }
};
</script>

<template>
  <n-table :style="{ '--n-th-color': tableColor(props.team) }" class="text-gray-600">
    <tr>
      <th>{{ teamColor }}</th>
      <th>Tier</th>
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
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${toLowerCase(
              participant.championName
            )}.png`"
          />
        </div>
        <span class="mr-2">{{ participant.summonerName }}</span>
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
          <img
            v-if="participant.item0 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item0}.png`"
          />
          <img
            v-if="participant.item1 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item1}.png`"
          />
          <img
            v-if="participant.item2 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item2}.png`"
          />
          <img
            v-if="participant.item3 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item3}.png`"
          />
          <img
            v-if="participant.item4 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item4}.png`"
          />
          <img
            v-if="participant.item5 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item5}.png`"
          />
          <img
            v-if="participant.item6 !== 0"
            height="25"
            width="25"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${participant.item6}.png`"
          />
        </div>
      </th>
    </tr>
  </n-table>
</template>

<style scoped>
/* .n-table {
  --n-th-color: red !important;
} */
</style>

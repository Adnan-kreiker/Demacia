<script setup lang="ts">
import { BannedChampion, Champion } from "~/types";
import { getChampionInfoById } from "../../utils";
import { NH2, NText } from "naive-ui";

const props = defineProps<{
  bannedChampions: BannedChampion[];
  championsArray: Champion[];
}>();
</script>
<template>
  <div class="mt-3" v-if="props.bannedChampions">
    <n-h2>
      <n-text> Banned Champions </n-text>
    </n-h2>
    <section class="flex flex-row gap-2">
      <router-link
        :to="`/champion-info/${
          getChampionInfoById(championsArray, bannedChampion.championId)?.name
        }`"
        v-for="bannedChampion in props.bannedChampions"
        :key="bannedChampion.pickTurn"
      >
        <div v-if="bannedChampion.championId !== -1">
          <img
            class="mx-auto border-2 mt-2 mb-2"
            :class="bannedChampion.teamId === 100 ? 'border-blue-500' : 'border-red-500'"
            height="60"
            width="60"
            :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${
              getChampionInfoById(championsArray, bannedChampion.championId)?.image.full
            }
              `"
          />
        </div>
      </router-link>
    </section>
  </div>
</template>

<style scoped></style>

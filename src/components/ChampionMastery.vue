<script setup lang="ts">
import useChampions from "~/hooks/useChampions";
import type { Summoner } from "~/types";
import { getChampionInfoById, formatNumber } from "../../utils";
import VLazyImage from "v-lazy-image";
import { regionStore } from "~/stores/region";
import { storeToRefs } from "pinia";
import useChampionMasteryBySummonerId from '../hooks/useChampionMasterybySummonerId'

const store = regionStore();

const { region } = storeToRefs(store);

const props = defineProps<{
  summonerInfo: Summoner;
}>();

const { championsArray: champsArray } = useChampions();

const { championsMastery } = await useChampionMasteryBySummonerId(props.summonerInfo.id, region.value);

const patchVersion = import.meta.env.VITE_PATCH_VERSION;

</script>

<template>
  <div class="flex flex-wrap flex-row justify-center" v-if="champsArray && championsMastery">
    <router-link :to="`/champion-info/${getChampionInfoById(champsArray, champ.championId)?.name}`"
      class="hover:cursor-pointer hover:scale-105 transform transition-all duration-500 ease"
      v-for="champ in championsMastery" :key="champ.championId">
      <div class="h-[130px] w-70 my-3 border-1 border-gray-500 mx-3 flex flex-row">
        <VLazyImage height="h-[130px] object-cover" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(champsArray, champ.championId)?.image.full
        }`" />
        <section class="text-gray-300 text-md py-1 px-3">
          <p class="text-lg font-bold">
            {{ getChampionInfoById(champsArray, champ.championId)?.name }}
          </p>
          <p><b>Points:</b> {{ formatNumber(champ.championPoints) }}</p>
          <p><b>Level:</b> {{ champ.championLevel }}</p>
          <p><b>Tokens earned:</b> {{ champ.tokensEarned }}</p>
          <p><b>Chest:</b> {{ champ.chestGranted ? "Obtained" : "Available" }}</p>
        </section>
      </div>
    </router-link>
  </div>

</template>

<script setup lang="ts">
import useChampions from "~/hooks/useChampions";
import { Champion, ChampionMastery, Summoner } from "~/types";
import { getChampionInfoById, formatNumber } from "../../utils";
import VLazyImage from "v-lazy-image";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";

const props = defineProps<{
  summonerInfo: Summoner;
}>();

const { champions } = useChampions();

const error = ref(false);

const championsMastery = ref<null | ChampionMastery[]>(null);

let champsArray = shallowRef<Champion[]>([]);

watch(
  champions,
  () => {
    if (champions.value) {
      champsArray.value = Object.values(toRaw(champions.value));
    }
  },
  {
    immediate: true,
  }
);

const getChampionsMastery = async () => {
  if (props.summonerInfo) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/get-champions-mastery/${props.summonerInfo.id}`
      );
      const data = await res.json();
      championsMastery.value = data;
    } catch (err) {
      error.value = true;
      console.log(err);
    }
  }
};

getChampionsMastery();
</script>

<template>
  <div
    class="flex flex-wrap flex-row justify-center"
    v-if="champsArray.length && championsMastery"
  >
    <router-link
      :to="`/champion-info/${getChampionInfoById(champsArray, champ.championId)?.name}`"
      class="hover:cursor-pointer hover:scale-105 transform transition-all duration-500 ease"
      v-for="champ in championsMastery"
      :key="champ.championId"
    >
      <div class="h-[130px] w-70 my-3 border-1 border-gray-500 mx-3 flex flex-row">
        <v-lazy-image
          height="h-[130px] object-cover"
          :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${
            getChampionInfoById(champsArray, champ.championId)?.image.full
          }`"
        />
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
  <section class="flex flex-row flex-wrap gap-3 justify-center" v-else>
    <n-skeleton v-for="n in 30" :key="n" height="130px" width="280px" />
  </section>
</template>

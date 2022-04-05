<script setup lang="ts">
import { Champion, ChampionObject, FreeChampionRotations } from "~/types";
import { NCard, NH1, NText, NDivider } from "naive-ui";
import VLazyImage from "v-lazy-image";
// import { convertToArrayOfObjects } from "../../utils";

const rotations = ref<FreeChampionRotations | null>(null);
const champions = ref<ChampionObject | null>(null);

async function getChampions() {
  const champs = await fetch(`${import.meta.env.VITE_URL}/api/get-champions`);
  const res = await champs.json();
  champions.value = res.data;
}

async function getChampionRotations() {
  const response = await fetch(`${import.meta.env.VITE_URL}/api/get-champions-rotations`);
  const data = await response.json();
  rotations.value = data;
}

getChampions();
getChampionRotations();
let champsArray = ref<Champion[]>([]);

watch(
  champions,
  () => {
    if (champions.value) {
      //  = ref(convertToArrayOfObjects(champions.value));
      champsArray.value = Object.values(toRaw(champions.value));
      console.log({ champsArray });
    }
  },
  {
    immediate: true,
  }
);

const getChampionInfoById = (champId: number) => {
  if (champsArray.value.length > 0) {
    let res = champsArray.value.find((champ) => champ.key === champId.toString());
    if (res) {
      return res.image.full;
    }
  }
};

const getChampionNameById = (champId: number) => {
  if (champsArray.value.length > 0) {
    let res = champsArray.value.find((champ) => champ.key === champId.toString());
    if (res) {
      return res.id;
    }
  }
};
</script>

<template>
  <div>
    <section v-if="rotations && champsArray.length > 0">
      <n-h1>
        <n-text type="primary"> Free Champions </n-text>
      </n-h1>
      <div class="flex flex-row flex-wrap gap-2 justify-center">
        <router-link
          v-for="(champ, index) in rotations.freeChampionIds"
          :key="index"
          :to="`/champion-info/${getChampionNameById(champ)}`"
          class="hover:cursor-pointer"
        >
          <n-card
            content-style="padding: 0"
            hoverable
            class="w-[98px] h-[138.39px] justify-self-center"
          >
            <template #cover>
              <v-lazy-image
                height="98"
                :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${getChampionInfoById(
                  champ
                )}`"
              />
            </template>
            <h1 class="text-center py-2">
              {{ getChampionInfoById(champ)?.replace(".png", "") }}
            </h1>
          </n-card>
        </router-link>
      </div>
    </section>
    <n-divider></n-divider>

    <section v-if="rotations && champsArray.length > 0">
      <n-h1>
        <n-text type="primary"> Free Champions For New Players </n-text>
      </n-h1>
      <div class="flex flex-row flex-wrap gap-2 justify-center">
        <router-link
          v-for="(champ, index) in rotations.freeChampionIdsForNewPlayers"
          :key="index"
          :to="`/champion-info/${getChampionNameById(champ)}`"
          class="hover:cursor-pointer"
        >
          <n-card
            content-style="padding: 0"
            hoverable
            class="w-[98px] h-[138.39px] justify-self-center"
          >
            <template #cover>
              <v-lazy-image
                height="98"
                :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${getChampionInfoById(
                  champ
                )}`"
              />
            </template>
            <h1 class="text-center py-2">
              {{ getChampionInfoById(champ)?.replace(".png", "") }}
            </h1>
          </n-card>
        </router-link>
      </div>
    </section>
  </div>
</template>

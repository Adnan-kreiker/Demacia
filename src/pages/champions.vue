<script setup lang="ts">
import NCard from "naive-ui/es/card/src/Card";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import { Champion } from "~/types";
// import useChampions from "~/hooks/useChampions";
import VLazyImage from "v-lazy-image";

const champions = ref<null | Champion[]>(null);

async function getChampions(): Promise<void> {
  const champs = await fetch(`${import.meta.env.VITE_URL}/api/get-champions`);
  const res = await champs.json();
  champions.value = res.data;
}

// const { champions } = useChampions();

getChampions();
</script>

<template>
  <div class="md:px-8">
    <h1
      class="text-white text-3xl font-bold mb-12 underline-green-500 underline-2 underline"
    >
      Champions
    </h1>
    <div
      v-if="champions"
      class="flex flex-row flex-wrap sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 justify-center"
    >
      <router-link
        v-for="(champ, index) in champions"
        :key="index"
        :to="`/champion-info/${champ.id}`"
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
              :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champ.id}.png`"
            />
            <div class="bottom-10.5 absolute right-0">
              <p
                v-for="(tag, i) in champ.tags"
                :key="i"
                class="bg-dark-500 text-white text-xs p-0"
              >
                {{ tag }}
              </p>
            </div>
          </template>
          <h2 class="text-center py-2">
            {{ champ.name }}
          </h2>
        </n-card>
      </router-link>
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center" v-else>
      <n-skeleton v-for="skeleton in 70" :key="skeleton" height="138px" width="98px">
      </n-skeleton>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

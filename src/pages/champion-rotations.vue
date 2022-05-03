<script setup lang="ts">
import { NText } from "naive-ui/es/typography";
import { NH1 } from "naive-ui/es/typography";
import NCard from "naive-ui/es/card/src/Card";
import NDivider from "naive-ui/es/divider/src/Divider";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import VLazyImage from "v-lazy-image";
import { getChampionInfoById } from "../../utils";
import useChampions from "~/hooks/useChampions";
import useChampionsRotations from "~/hooks/useChampionsRotations";

const { championsArray } = useChampions()

const { rotations } = useChampionsRotations()

const patchVersion = import.meta.env.VITE_PATCH_VERSION;

</script>

<template>
  <div>
    <section>
      <n-h1>
        <n-text type="primary"> Free Champions </n-text>
      </n-h1>
      <div v-if="rotations && championsArray" class="flex flex-row flex-wrap gap-2 justify-center">
        <router-link v-for="(champ, index) in rotations.freeChampionIds" :key="index"
          :to="`/champion-info/${getChampionInfoById(championsArray, champ)?.name}`" class="hover:cursor-pointer">
          <n-card content-style="padding: 0" hoverable class="w-[98px] h-[138.39px] justify-self-center">
            <template #cover>
              <VLazyImage height="98" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(championsArray, champ)?.image.full
              }`" />
            </template>
            <h1 class="text-center py-2">
              {{
                  getChampionInfoById(championsArray, champ)?.image.full.replace(".png", "")
              }}
            </h1>
          </n-card>
        </router-link>
      </div>
      <section class="flex flex-row flex-wrap gap-2 justify-center" v-else>
        <n-skeleton v-for="n in 16" :key="n" height="138px" width="98px" />
      </section>
    </section>

    <n-divider></n-divider>

    <section>
      <n-h1>
        <n-text type="primary"> Free Champions For New Players </n-text>
      </n-h1>
      <div v-if="rotations && championsArray" class="flex flex-row flex-wrap gap-2 justify-center">
        <router-link v-for="(champ, index) in rotations.freeChampionIdsForNewPlayers" :key="index"
          :to="`/champion-info/${getChampionInfoById(championsArray, champ)?.name}`" class="hover:cursor-pointer">
          <n-card content-style="padding: 0" hoverable class="w-[98px] h-[138.39px] justify-self-center">
            <template #cover>
              <VLazyImage height="98" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(championsArray, champ)?.image.full
              }`" />
            </template>
            <h1 class="text-center py-2">
              {{
                  getChampionInfoById(championsArray, champ)?.image?.full.replace(".png", "")
              }}
            </h1>
          </n-card>
        </router-link>
      </div>
      <section class="flex flex-wrap flex-row gap-2 justify-center" v-else>
        <n-skeleton v-for="n in 10" :key="n" height="138px" width="98px" />
      </section>
    </section>
  </div>
</template>

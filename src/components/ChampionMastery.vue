<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NSkeleton } from 'naive-ui'
import { formatNumber, getChampionInfoById } from '../../utils'
import useChampions from '~/composables/useChampions'
import type { ChampionMastery, Summoner } from '~/types'
import { useRegionStore } from '~/stores/region'
import useChampionMastery from '~/composables/useChampionMastery'

const props = defineProps<{
  summonerInfo: Summoner
}>()

const summonerInfo = ref(props.summonerInfo)

const store = useRegionStore()

const { region } = storeToRefs(store)

const { championsArray: champsArray } = useChampions()

const championsMastery = ref<null | ChampionMastery[]>(null)

const patchVersion = import.meta.env.VITE_PATCH_VERSION

async function getChampionMastery() {
  const { championsMastery: champMastery } = await useChampionMastery(summonerInfo.value.id, region.value)
  championsMastery.value = champMastery.value
}

getChampionMastery()
</script>

<template>
  <div>
    <div v-if="champsArray && championsMastery && summonerInfo" class="flex flex-wrap flex-row justify-center">
      <router-link
        v-for="champ in championsMastery"
        :key="champ.championId"
        :to="`/champion-info/${getChampionInfoById(champsArray, champ.championId)?.name}`"
        class="hover:cursor-pointer hover:scale-105 transform transition-all duration-500 ease"
      >
        <div class="h-[130px] w-70 my-3 border-1 border-gray-500 mx-3 flex flex-row">
          <img
            loading="lazy"
            height="h-[130px] object-cover"
            :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(champsArray, champ.championId)?.image.full
            }`"
          >
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
    <div v-else class="flex flex-row flex-wrap gap-3 justify-center">
      <n-skeleton v-for="n in 30" :key="n" height="130px" width="280px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatNumber, getChampionInfoById } from '../../utils'
import useChampions from '~/composables/useChampions'
import type { Summoner } from '~/types'
import { useRegionStore } from '~/stores/region'
import useChampionMastery from '~/composables/useChampionMastery'

const props = defineProps<{
  summonerInfo: Summoner
}>()

const summonerInfo = ref(props.summonerInfo)

const store = useRegionStore()

const { region } = storeToRefs(store)

const { championsArray: champsArray } = useChampions()

const { championsMastery } = await useChampionMastery(summonerInfo.value.id, region.value)

const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
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
</template>

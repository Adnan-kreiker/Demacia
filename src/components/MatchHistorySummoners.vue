<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getChampionInfoById, toLowerCase } from '../../utils'
import type { Participant } from '~/types'
import { regionStore } from '~/stores/region'
import useChampions from '~/hooks/useChampions'

const props = defineProps<{
  participants: Participant[]
  team: 100 | 200
}>()

const { championsArray } = useChampions()
const store = regionStore()
const { region } = storeToRefs(store)

const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <div
    v-if="championsArray"
    class="flex flex-col self-end p-2 text-gray-300 w-[150px] p-4"
  >
    <div
      v-for="participant in props.participants.filter(
        (participant) => participant.teamId === props.team,
      )"
      :key="participant.championName"
      class="mb-1"
    >
      <div class="flex flex-row flex-1 w-full justify-start items-center">
        <img
          class="rounded-sm mr-2"
          height="25"
          width="25"
          :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${toLowerCase(
            participant.championName ?? toLowerCase(getChampionInfoById(championsArray, participant.championId).image.full.replace('.png', ''),
            ))}.png`"
        >
        <router-link
          class="truncate overflow-ellipsis space-nowrap"
          :to="{
            path: `/summoner-info/${participant.summonerName}`,
            query: { region },
          }"
        >
          <div class="group">
            <p class="truncate overflow-ellipsis space-nowrap">
              {{ participant.summonerName }}
              <span
                class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center text-black bg-white rounded tooltip-text group-hover:block"
              >{{
                participant.summonerName
              }}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NH2, NText } from 'naive-ui'
import { getChampionInfoById } from '../../utils'
import type { BannedChampion, Champion } from '~/types'

const props = defineProps<{
  bannedChampions: BannedChampion[]
  championsArray: Champion[]
}>()
const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <div v-if="props.bannedChampions.length" class="mt-3">
    <n-h2>
      <n-text> Banned Champions </n-text>
    </n-h2>
    <section class="flex flex-row gap-2">
      <router-link
        v-for="bannedChampion in props.bannedChampions"
        :key="bannedChampion.pickTurn"
        :to="`/champion-info/${getChampionInfoById(championsArray, bannedChampion.championId)?.name
        }`"
      >
        <div v-if="bannedChampion.championId !== -1">
          <img
            class="mx-auto border-2 mt-2 mb-2"
            :class="bannedChampion.teamId === 100 ? 'border-blue-500' : 'border-red-500'"
            height="60"
            width="60"
            :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(championsArray, bannedChampion.championId)?.image.full
            }
            `"
          >
        </div>
      </router-link>
    </section>
  </div>
</template>

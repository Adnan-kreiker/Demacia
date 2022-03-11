<script setup lang="ts">
import type { ChampionInfo } from '~/types'
const route = useRoute()

const champion = ref<null | ChampionInfo>(null)

async function getChampion() {
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${route.params.champion}.json`)
  const champ = await res.json()
  champion.value = Object.values(champ.data)[0] as ChampionInfo
}

getChampion()

console.log(champion.value)

</script>

<template>
  <div v-if="champion">
    <h1 class="text-3xl font-bold text-center mb-6">
      {{ champion.name }} the {{ champion.title }}
    </h1>
    <p>
      {{ champion.lore }}
    </p>
    <img
      :src="`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`"
    >
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

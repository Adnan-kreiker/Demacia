<script lang="ts" setup>
import NDivider from 'naive-ui/es/divider/src/Divider'
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
import { getChampionInfoById } from '../../utils'
import useChampions from '~/composables/useChampions'
import useChampionsRotations from '~/composables/useChampionsRotations'
import ChampionCard from '~/components/ChampionCard.vue'

const { championsArray } = useChampions()

const { rotations } = useChampionsRotations()
</script>

<template>
  <div>
    <section>
      <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-8">
        Free Champions
      </h1>
      <div v-if="rotations && championsArray" class="flex flex-row flex-wrap gap-5 justify-center">
        <div v-for="champ in rotations.freeChampionIds" :key="champ">
          <ChampionCard :champ="getChampionInfoById(championsArray, champ)" />
        </div>
      </div>
      <section v-else class="flex flex-row flex-wrap gap-5 justify-center">
        <n-skeleton v-for="n in 16" :key="n" height="138px" width="98px" />
      </section>
    </section>

    <n-divider />

    <section>
      <h1 class="text-green-300 text-4xl font-bold text-center my-8">
        Free Champions For New Players
      </h1>
      <div v-if="rotations && championsArray" class="flex flex-row flex-wrap gap-5 justify-center">
        <div v-for="champ in rotations.freeChampionIdsForNewPlayers" :key="champ">
          <ChampionCard :champ="getChampionInfoById(championsArray, champ)" />
        </div>
      </div>
      <section v-else class="flex flex-wrap flex-row gap-5 justify-center">
        <n-skeleton v-for="n in 10" :key="n" height="138px" width="98px" />
      </section>
    </section>
  </div>
</template>

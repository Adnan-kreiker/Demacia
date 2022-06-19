<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import useChampions from '~/composables/useChampions'
import ChampionCard from '~/components/ChampionCard.vue'

// const { width } = useWindowSize()

// const itemSize = computed(() => {
//   if (width.value < 252)
//     return 75

//   if (width.value <= 365)
//     return 80

//   if (width.value < 480)
//     return 55

//   if (width.value < 594)
//     return 40

//   if (width.value < 708)
//     return 35

//   if (width.value < 886)
//     return 30

//   if (width.value < 1000)
//     return 25

//   if (width.value < 1228)
//     return 20

//   if (width.value > 1680)
//     return 12

//   return 15
// })

const { championsArray } = useChampions()
</script>

<template>
  <div class="md:px-8 h-max">
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-8">
      Champions
    </h1>
    <div v-if="championsArray" class="flex flex-row flex-wrap gap-3 justify-center">
      <!-- <RecycleScroller class="scroll-class" :items="championsArray" :item-size="itemSize" key-field="id"> -->
      <!-- <template #default="{ item }"> -->
      <ChampionCard v-for="champ in championsArray" :key="champ.id" :champ="champ" />
      <!-- </template> -->
      <!-- </RecycleScroller> -->
    </div>
    <div v-else class="flex flex-row flex-wrap gap-6 justify-center">
      <n-skeleton v-for="skeleton in 70" :key="skeleton" height="138px" width="98px" />
    </div>
  </div>
</template>

<style >

</style>

<route lang="yaml">
meta:
  layout: default
</route>

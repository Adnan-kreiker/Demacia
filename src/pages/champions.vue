<script setup lang="ts">
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import useChampions from "~/hooks/useChampions";

import ChampionCard from "~/components/ChampionCard.vue";

const { width } = useWindowSize()

const itemSize = computed(() => {
  if (width.value < 252) {
    return 75
  }
  if (width.value <= 365) {
    return 80
  }
  if (width.value < 480) {
    return 55
  }
  if (width.value < 594) {
    return 40
  }
  if (width.value < 708) {
    return 35
  }
  if (width.value < 886) {
    return 30
  }
  if (width.value < 1000) {
    return 25
  }
  if (width.value < 1228) {
    return 20
  }
  if (width.value > 1680) {
    return 12
  }

  return 15
})

const { championsArray } = useChampions()

</script>

<template>
  <div class="md:px-8 h-max">
    <h1 class="text-white text-3xl font-bold mb-12 underline-green-500 underline-2 underline">
      Champions
    </h1>
    <div v-if="championsArray">
      <RecycleScroller class="scroll-class" :items="championsArray" :item-size="itemSize" key-field="id">
        <template v-slot="{ item }">
          <ChampionCard :champ="item"></ChampionCard>
        </template>
      </RecycleScroller>
    </div>
    <div class="flex flex-row flex-wrap gap-6 justify-center" v-else>
      <n-skeleton v-for="skeleton in 70" :key="skeleton" height="138px" width="98px">
      </n-skeleton>
    </div>
  </div>
</template>


<style >
.vue-recycle-scroller.ready .vue-recycle-scroller__item-view {
  width: 100px !important;
  transform: none !important;
  height: 140px !important;
}

.scroll-class {
  height: 100% !important;
}

.vue-recycle-scroller.direction-vertical .vue-recycle-scroller__item-wrapper {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(98px, 1fr)) !important;
  justify-items: center !important;

  min-width: 100% !important;
  gap: 1rem !important;
  height: 130px !important;
}

@media(max-width:400px) {
  .vue-recycle-scroller.direction-vertical .vue-recycle-scroller__item-wrapper {
    gap: 0.5rem !important;
  }
}
</style>
<route lang="yaml">
meta:
  layout: default
</route>

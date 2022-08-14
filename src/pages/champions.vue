<script setup lang="ts">
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
import { championsArrayFiltered, getChampionInfoById, getChampionInfoByName, getChampionName } from '../../utils'
import useChampions from '~/hooks/useChampions'
import ChampionCard from '~/components/ChampionCard.vue'

const state = reactive({
  search: '',
  tags: [
    { title: 'Fighter' },
    { title: 'Tank' },
    { title: 'Assassin' },
    { title: 'Marksman' },
    { title: 'Support' },
    { title: 'Mage' },
  ],
})

const { championsArray, champions } = useChampions()

const { width } = useWindowSize()

const itemSize = computed(() => {
  if (width.value < 252)
    return 75

  if (width.value <= 365)
    return 80

  if (width.value < 480)
    return 55

  if (width.value < 594)
    return 40

  if (width.value < 708)
    return 35

  if (width.value < 886)
    return 30

  if (width.value < 1000)
    return 25

  if (width.value < 1228)
    return 20

  if (width.value > 1680)
    return 12

  return 15
})
</script>

<template>
  <div class="md:px-8 h-max mx-auto">
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-8">
      Champions
    </h1>
    <n-input
      v-model:value="search" type="text" clearable class="max-w-60 mx-auto block mb-6"
      placeholder="Search"
    />
    <div class="overflow-x-scroll sm:overflow-hidden whitespace-nowrap w-auto mb-4">
      <div class="flex flex-row gap-3 mx-auto justify-center w-[550px]">
        <n-button v-for="role in roles" :key="role.key" role="button" :focusable="false" :type="tagType(role.name as Roles)" class="hover:cursor-pointer rounded-sm" ghost @click="triggerFilter(role as Role)">
          {{ role.name }}
        </n-button>
      </div>
    </div>
    <div v-if="championsArray" class="flex flex-row flex-wrap gap-4 justify-center">
      <ChampionCard v-for="champ in filteredChampions" :key="champ.id" :champ="champ" />
      <div id="search_champion">
        <h1 class="text-green-300 text-2xl font-bold text-left mt-0 mb-2">
          Search a champion
        </h1>
        <input v-model="state.search" type="text" placeholder="search champion">
        <h1 class="text-green-300 text-2xl font-bold text-left mt-2 mb-2">
          Filter with tag
        </h1>
        <div id="checkbox_tag">
          <label v-for="tag in state.tags" :key="tag.title" class="label-checkbox" :class="{ checked: tag.checked }" :for="tag.title.toLowerCase()">
            <input :id="tag.title.toLowerCase()" v-model="tag.checked" type="checkbox" class="check-tag" :value="tag.title">
            {{ tag.title }}
          </label>
        </div>
      </div>
      <!--    <div v-if="championsArray"> -->
      <!--      <RecycleScroller class="scroll-class" :items="championsArray" :item-size="itemSize" key-field="id"> -->
      <!--        <template #default="{ item }"> -->
      <!--          <ChampionCard :champ="item" /> -->
      <!--        </template> -->
      <!--      </RecycleScroller> -->
      <!--    </div> -->
      <div v-if="championsArray" class="flex flex-row flex-wrap gap-5 justify-center">
        <div v-for="champName in getChampionName(championsArrayFiltered(championsArray, state.search, state.tags))" :key="champName">
          <ChampionCard :champ="getChampionInfoByName(championsArray, champName)" />
        </div>
        >>>>>>> d243dd0426cae1b5339dbad148d2ede5d8e20790
      </div>
      <div v-else class="flex flex-row flex-wrap gap-6 justify-center">
        <n-skeleton v-for="skeleton in 70" :key="skeleton" height="138px" width="98px" />
      </div>
    </div>
  </div>
</template>

<style >
#search_champion {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin: 40px;
}
.label-checkbox {
  margin-right: 0.87rem;
  margin-left: auto;
  border: 1px solid #9ae6b4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #9ae6b4;
}

.check-tag {
  visibility: hidden;
  position: absolute;
  right: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.checked {
  background: #388553;
  color: #fff;
}

.checked::before {
  content: "✔";
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>

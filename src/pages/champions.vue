<script setup lang="ts">
import { NInput, NSkeleton } from 'naive-ui'
import type { Champion } from '~/types'

const { championsArray } = useChampions()

const champions = ref<null | Champion[]>(null)

const search = ref('')

watch(championsArray, () => {
  champions.value = championsArray.value
}, { immediate: true })

type Roles = 'Fighter' | 'Marksman' | 'Tank' | 'Support' | 'Mage' | 'Assassin'

const roles = ref([
  {
    name: 'Fighter',
    value: false,
  },
  {
    name: 'Marksman',
    value: false,
  },
  {
    name: 'Tank',
    value: false,
  },
  {
    name: 'Support',
    value: false,
  },
  {
    name: 'Mage',
    value: false,
  },
  {
    name: 'Assassin',
    value: false,
  },
])

const pickedRole = ref<Roles[]>([])

function filterRoles(champs: Champion[], roles: Roles[]): Champion[] {
  if (!roles.length)
    return []
  const currentRole = roles[0]
  roles = roles.slice(1)
  return champs.filter((champ) => {
    return champ.tags.includes(currentRole)
  }).concat(filterRoles(champs, roles))
}

const filteredChampions = computed(() => {
  if (!championsArray.value)
    return []

  if (pickedRole.value.length && champions.value)
    return filterRoles(champions.value, pickedRole.value)

  if (search.value && champions.value) {
    return champions.value.filter((champion) => {
      return champion.name.toLowerCase().includes(search.value)
    })
  }
  return championsArray.value
})

function triggerFilter(role: Roles) {
  if (pickedRole.value.includes(role))
    pickedRole.value = pickedRole.value.filter(r => r !== role)

  else
    pickedRole.value.push(role)
}

function filterStyle(role: Roles) {
  if (pickedRole.value.includes(role))
    return '!bg-teal-500'
}
</script>

<template>
  <div class="md:px-8 h-max">
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-8">
      Champions
    </h1>
    <n-input
      v-model:value="search" type="text" clearable class="max-w-60 mx-auto block mb-6"
      placeholder="Search"
    />
    <div class="flex gap-3 justify-center mb-5">
      <p
        v-for="role in roles" :key="role.name"
        class="border border-white bg-gray-600 w-min px-3 py-1 rounded-sm text-white"
        :class="filterStyle(role.name as Roles)" @click="triggerFilter(role.name as Roles)"
      >
        {{ role.name }}
      </p>
    </div>
    <div v-if="championsArray" class="flex flex-row flex-wrap gap-4 justify-center">
      <ChampionCard v-for="champ in filteredChampions" :key="champ.id" :champ="champ" />
    </div>
    <div v-else class="flex flex-row flex-wrap gap-6 justify-center">
      <n-skeleton v-for="skeleton in 70" :key="skeleton" height="138px" width="98px" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

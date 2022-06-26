<script setup lang="ts">
import { NButton, NInput, NSkeleton } from 'naive-ui'
import type { Champion } from '~/types'

const { championsArray } = useChampions()

const champions = ref<null | Champion[]>(null)

const search = ref('')

watch(championsArray, () => {
  champions.value = championsArray.value
}, { immediate: true })

type Roles = 'Fighter' | 'Marksman' | 'Tank' | 'Support' | 'Mage' | 'Assassin'

interface Role {
  name: Roles
  value: boolean
  key: number | string
}

const roles = ref([
  {
    name: 'Fighter',
    value: false,
    key: Math.random(),
  },
  {
    name: 'Marksman',
    value: false,
    key: Math.random(),
  },
  {
    name: 'Tank',
    value: false,
    key: Math.random(),
  },
  {
    name: 'Support',
    value: false,
    key: Math.random(),
  },
  {
    name: 'Mage',
    value: false,
    key: Math.random(),
  },
  {
    name: 'Assassin',
    value: false,
    key: Math.random(),
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

function triggerFilter(role: Role) {
  role.key = Math.random()
  if (pickedRole.value.includes(role.name))
    pickedRole.value = pickedRole.value.filter(r => r !== role.name)

  else
    pickedRole.value.push(role.name)
}

const tagType = (role: Roles) => {
  if (pickedRole.value.includes(role))
    return 'primary'

  return 'default'
}
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

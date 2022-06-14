<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import useServerStatus from '~/composables/useServerStatus'
import type { AnyElementOf, FilterOption, Servers } from '~/types'

const { status } = useServerStatus()

const servers = ['All Servers', 'EU Nordic & East', 'EU West', 'North America', 'Latin America North', 'Latin America South', 'Brazil', 'Korea', 'Russia', 'Oceania', 'Japan', 'Turkey']

type AnyElementOfServers = AnyElementOf<Servers>

const currentFilter = ref<AnyElementOfServers | 'All Servers'>('All Servers')

const filterOptions = (): FilterOption[] => {
  return servers.map((server, i) => ({
    id: i,
    name: server,
  }))
}

const filteredServers = computed(() => {
  if (currentFilter.value !== 'All Servers')
    return status.value.filter(status => status.name.toLowerCase() === currentFilter.value.toLowerCase())

  return status.value
})
</script>

<template>
  <div class="">
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-4">
      Servers' Status
    </h1>
    <div
      v-if="filteredServers && filteredServers.length && status && status.length"
    >
      <div class="flex flex-row justify-center items-center gap-2 mb-2 mt-5">
        <span class="text-xl">Filter by Server</span>
        <FilterComponent class="filter-Component" :filter-options="filterOptions()" :current-filter="currentFilter" @update-filter="currentFilter = $event as AnyElementOfServers" />
      </div>
      <div class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
        <ServerStatusCard v-for="stat in filteredServers" :key="stat.id" :stat="stat" />
      </div>
    </div>
    <div v-else class=" md:w-[80%] mx-auto">
      <n-skeleton height="37px" width="320px" class="my-6 mx-auto" />
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <n-skeleton v-for="n in 11" :key="n" height="175px" width="270px" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-Component{
  width: 200px !important;
}

.filter-Component >>> .filter-span{
  width: 160px !important;
}

.filter-Component >>> .filter-ul{
  width: 160px !important;
}
</style>

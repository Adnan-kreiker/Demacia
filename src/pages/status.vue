<script setup lang="ts">
import { NDivider, NSkeleton } from 'naive-ui'
import useServerStatus from '~/hooks/useServerStatus'
import type { AnyElementOf, FilterOption, Maintenance, Servers, Title } from '~/types'
import FilterComponent from '~/components/FilterComponent.vue'

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

const borderColor = (stat1: [] | Maintenance[], stat2: [] | Maintenance[]) => {
  if (Array.isArray(stat1) && Array.isArray(stat2)) {
    if (!stat1.length && !stat2.length)
      return 'shadow-teal-400'

    else if (stat1.length || stat2.length)
      return 'shadow-orange-400'

    else
      return 'shadow-red-400'
  }
}

const findEnglishTranslation = (translations: Title[]) => translations.find(translation => translation.locale === 'en_US')
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
      <Transition name="fadeMenu" appear>
        <div class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
          <div
            v-for="stat in filteredServers"
            :key="stat.id"
            class="text-base min-w-[270px] transition-all animate-fade-in duration-300 ease-linear bg-dark-900 my-4 rounded-md p-4 shadow-t-md"
            :class="borderColor(stat.incidents, stat.maintenances)"
          >
            <p class="font-bold text-2xl mb-4">
              {{ stat.name }}
            </p>
            <div v-if="stat.maintenances && stat.maintenances.length">
              <p class="text-lg font-bold">
                Maintenance:
              </p>
              <div v-for="incident in stat.maintenances" :key="incident.id">
                <p v-for="description in incident.updates" :key="description.id">
                  {{ findEnglishTranslation(description.translations)?.content }}
                </p>
              </div>
            </div>
            <div v-else class="flex flex-row gap-2 items-center">
              <span>Server is up and Running</span>
            </div>
            <n-divider class="divider-class" />
            <div v-if="stat.incidents && stat.incidents.length">
              <p class="text-lg font-bold">
                Incidents:
              </p>
              <div v-for="incident in stat.incidents" :key="incident.id" class="mb-2">
                <li v-for="description in incident.updates" :key="description.id" class="ml-4">
                  {{ description.translations[0].content }}
                </li>
              </div>
            </div>
            <div v-else>
              No incidents were detected
            </div>
          </div>
        </div>
      </Transition>
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

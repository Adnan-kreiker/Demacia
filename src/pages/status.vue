<script setup lang="ts">
import { NDivider, NSkeleton } from 'naive-ui'
import useServerStatus from '~/hooks/useServerStatus'
import type { Maintenance, Title } from '~/types'

const { status } = useServerStatus()

const borderColor = (stat1: [] | Maintenance[], stat2: [] | Maintenance[]) => {
  if (!stat1.length && !stat2.length)
    return 'shadow-teal-400'

  else if (stat1.length || stat2.length)
    return 'shadow-orange-400'

  else
    return 'shadow-red-400'
}

const findEnglishTranslation = (translations: Title[]) => translations.find(translation => translation.locale === 'en_US')
</script>

<template>
  <div class="">
    <h1 class="text-green-300 text-4xl font-bold text-center mt-0 mb-4">
      Servers' Status
    </h1>
    <div v-if="status && status.length" class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
      <div
        v-for="stat in status"
        :key="stat.id"
        class="text-base min-w-[270px] bg-dark-900 my-4 rounded-md p-4 shadow-t-md  "
        :class="borderColor(stat.incidents, stat.maintenances)"
      >
        <p class="font-bold text-2xl mb-4">
          {{ stat.name }}
        </p>
        <div v-if="stat.maintenances.length">
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

        <div v-if="stat.incidents.length">
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
    <div v-else class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
      <n-skeleton v-for="n in 11" :key="n" height="175px" width="270px" />
    </div>
  </div>
</template>

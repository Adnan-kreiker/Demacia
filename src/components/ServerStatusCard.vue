<script setup lang="ts">
import { NDivider } from 'naive-ui'
import type { Maintenance, ServerStatusData, Title } from '~/types'

interface Props {
  stat: ServerStatusData
}

const props = defineProps<Props>()

const findEnglishTranslation = (translations: Title[]) => translations.find(translation => translation.locale === 'en_US')

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
</script>

<template>
  <Transition name="slide-fade" appear>
    <div
      class="text-base min-w-[270px] bg-dark-900 my-4 rounded-md p-4 shadow-t-md"
      :class="borderColor(props.stat.incidents, props.stat.maintenances)"
    >
      <p class="font-bold text-2xl mb-4">
        {{ props.stat.name }}
      </p>
      <div v-if="props.stat.maintenances && props.stat.maintenances.length">
        <p class="text-lg font-bold">
          Maintenance:
        </p>
        <div v-for="incident in props.stat.maintenances" :key="incident.id">
          <p v-for="description in incident.updates" :key="description.id">
            {{ findEnglishTranslation(description.translations)?.content }}
          </p>
        </div>
      </div>
      <div v-else class="flex flex-row gap-2 items-center">
        <span>Server is up and Running</span>
      </div>
      <n-divider class="divider-class" />
      <div v-if="props.stat.incidents && props.stat.incidents.length">
        <p class="text-lg font-bold">
          Incidents:
        </p>
        <div v-for="incident in props.stat.incidents" :key="incident.id" class="mb-2">
          <li v-for="description in incident.updates" :key="description.id" class="ml-4">
            {{ description.translations[0].content }}
          </li>
        </div>
      </div>
      <div v-else>
        No incidents were detected
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import useServerStatus from "~/hooks/useServerStatus";
import NDivider from "naive-ui/es/divider/src/Divider";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import { NText } from "naive-ui/es/typography";
import { NH1 } from "naive-ui/es/typography";
import { Maintenance } from "~/types";

const { status } = useServerStatus()

const borderColor = (stat1: [] | Maintenance[], stat2: [] | Maintenance[]) => {
  if (!stat1.length && !stat2.length) {
    return "border-teal-400"
  } else if (stat1.length || stat2.length) {
    return "border-orange-400"
  } else {
    return "border-red-400"
  }
}

</script>

<template>
  <div class="">
    <n-h1>
      <n-text type="primary" class="text-4xl"> Servers' Status </n-text>
    </n-h1>
    <div v-if="status.length" class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
      <div class="text-base min-w-[270px] my-4 border-1 p-4 " v-for="stat in status" :key="stat.id"
        :class="borderColor(stat.incidents, stat.maintenances)">
        <p class="font-bold text-2xl mb-4">{{ stat.name }}</p>
        <div v-if="stat.maintenances.length">
          <p class="text-lg font-bold">Maintenance:</p>
          <div v-for="incident in stat.maintenances">
            <p v-for="description in incident.updates">
              {{ description.translations[0].content }}
            </p>
          </div>
        </div>
        <div class="flex flex-row gap-2 items-center" v-else><span>Server is up and Running</span>
        </div>
        <n-divider class="divider-class"></n-divider>

        <div v-if="stat.incidents.length">
          <p class="text-lg font-bold">Incidents:</p>
          <div class="mb-2" v-for="incident in stat.incidents">
            <li class="ml-4" v-for="description in incident.updates">
              {{ description.translations[0].content }}
            </li>
          </div>
        </div>
        <div v-else>No incidents were detected</div>
      </div>
    </div>
    <div v-else class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
      <n-skeleton v-for="n in 11" :key="n" height="175px" width="270px" />
    </div>
  </div>
</template>

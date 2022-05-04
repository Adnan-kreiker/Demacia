<script setup lang="ts">
import useServerStatus from "~/hooks/useServerStatus";
import NDivider from "naive-ui/es/divider/src/Divider";
import { NText } from "naive-ui/es/typography";
import { NH1 } from "naive-ui/es/typography";

const { status } = useServerStatus()

</script>

<template>
  <div class="">
    <n-h1>
      <n-text type="primary" class="text-4xl"> Servers' Status </n-text>
    </n-h1>
    <div v-if="status" class="flex flex-row flex-wrap gap-4 justify-center md:w-[80%] mx-auto">
      <div class="text-base my-4 border-1 p-4 w-auto"
        :class="{ 'border-teal-400': !stat.maintenances.length && !stat.incidents.length, 'border-red-500': stat.maintenances.length || stat.incidents.length }"
        v-for="stat in status" :key="stat.id">
        <p class="font-bold text-lg mb-4">{{ stat.name }}</p>
        <div v-if="stat.maintenances.length">
          <p>Maintenance</p>
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
          <p class="text-base">Incidents</p>
          <div v-for="incident in stat.incidents">
            <li class="ml-4" v-for="description in incident.updates">
              {{ description.translations[0].content }}
            </li>
          </div>
        </div>
        <div v-else>No incidents were detected</div>
      </div>
    </div>
  </div>
</template>

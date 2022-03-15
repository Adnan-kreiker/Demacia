<script setup lang="ts">
import { NCard } from 'naive-ui'
import { Champion } from '~/types'

const champions = ref<null | Champion[]>(null)

async function getChampions(): Promise<void> {
  const champs = await fetch('http://ddragon.leagueoflegends.com/cdn/8.1.1/data/en_US/champion.json')
  const res = await champs.json()
  champions.value = Object.values(res.data).slice(0, 50) as Champion[]
}

getChampions()

</script>

<template>
  <div>
    <h1 class="text-white text-3xl font-bold mb-12  underline-green-500 underline-2 underline">
      Champions
    </h1>
    <div v-if="champions" class="flex flex-row flex-wrap sm:grid-cols-2 md:grid-cols-3 gap-x-3  gap-y-3 justify-center  ">
      <router-link
        v-for="(champ, index) in champions"
        :key="index"
        :to="`/champion-info/${champ.id}`"
        class="hover:cursor-pointer"
      >
        <n-card content-style="padding: 0" hoverable class=" w-[98px] h-[138.39px] justify-self-center">
          <template #cover>
            <img height="98" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champ.id}.png`">
            <div class="bottom-10.5 absolute right-0">
              <p v-for="(tag, i) in champ.tags" :key="i" class="bg-dark-500 text-white text-xs p-0">
                {{ tag }}
              </p>
            </div>
          </template>
          <h2 class="text-center py-2">
            {{ champ.name }}
          </h2>
        </n-card>
      </router-link>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

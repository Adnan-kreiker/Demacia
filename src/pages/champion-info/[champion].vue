<script setup lang="ts">
import { NDataTable, DataTableColumns } from 'naive-ui'
import type { ChampionInfo, Spell } from '~/types'
import CheckMark from '~/components/CheckMark.vue'
import WarningIcon from '~/components/WarningIcon.vue'
import AttackIcon from '~/components/AttackIcon.vue'
import ShieldIcon from '~/components/ShieldIcon.vue'
import MagicIcon from '~/components/MagicIcon.vue'
import BrainIcon from '~/components/BrainIcon.vue'

const route = useRoute()

const champion = ref<null | ChampionInfo>(null)

async function getChampion() {
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/8.1.1/data/en_US/champion/${route.params.champion}.json`)
  const champ = await res.json()
  champion.value = Object.values(champ.data)[0] as ChampionInfo
}

getChampion()

function quotesRemover(input: string) {
  return input.replace('"', '')
}

type Stats = {
  [key: string]: string | number
}

const tableColumns: DataTableColumns<Stats> = [{ title: 'Skill', key: 'Skill', align: 'center' }, { title: 'Value', key: 'Value', align: 'center' }]

const champStats = ref<Stats[]>([])

const spells = ref<Spell[]>([])

const e1 = 444

watch(champion, (newVal, oldVal) => {
  if (champion.value) {
    champStats.value = Object.entries(champion.value!.stats).map((stat) => {
      return {
        Skill: stat[0],
        Value: stat[1],
      }
    })

    spells.value = champion.value.spells
  }
})
</script>

<template>
  <div v-if="champion">
    <h1 class="text-3xl font-bold text-center mb-6">
      {{ champion.name }} the {{ champion.title }}
    </h1>
    <div class="flex flex-row items-center justify-center flex-wrap sm:flex-nowrap border-1 border-green-500 p-3">
      <div class="h-full min-w-[98px] relative">
        <img class="my-auto" height="98" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champion.id}.png`">
        <div class="absolute bottom-1 right-0">
          <p v-for="(tag, i) in champion.tags" :key="i" class="bg-dark-500  text-white text-xs p-0">
            {{ tag }}
          </p>
        </div>
      </div>
      <p class="text-base text-center p-3">
        {{ champion.lore }}
      </p>
    </div>

    <div class="my-6">
      <section>
        <div class="flex flex-row flex-nowrap items-center">
          <div class=" flex min-w-26 flex-row items-center">
            <AttackIcon class="h-5 w-5"></AttackIcon>
            <p class=" text-base md:text-lg mx-2 capitalize ">
              Attack
            </p>
          </div>
          <div :style="{width: champion.info.attack *10 +'%', maxWidth:70+'%'}" class="bg-red-500 h-4"></div>
        </div>

        <div class="flex flex-row items-center">
          <div class=" flex min-w-26 flex-row items-center">
            <ShieldIcon class="h-5 w-5"></ShieldIcon>
            <p class=" text-base md:text-lg mx-2 capitalize ">
              Defense
            </p>
          </div>
          <div :style="{width: champion.info.defense *10 +'%', maxWidth:70+'%'}" class="bg-green-500 h-4"></div>
        </div>

        <div class="flex flex-row items-center">
          <div class=" flex min-w-26 flex-row items-center">
            <MagicIcon class="h-5 w-5"></MagicIcon>
            <p class=" text-base md:text-lg mx-2 capitalize ">
              Magic
            </p>
          </div>
          <div :style="{width: champion.info.magic *10 +'%', maxWidth:70+'%'}" class="bg-purple-500 h-4"></div>
        </div>

        <div class="flex  flex-row items-center">
          <div class=" flex min-w-26 flex-row items-center">
            <BrainIcon class="h-5 w-5"></BrainIcon>
            <p class=" text-base md:text-lg mx-2 capitalize">
              Difficulty
            </p>
          </div>
          <div :style="{width: champion.info.difficulty *10 +'%', maxWidth:70+'%'}" class="bg-pink-500 h-4"></div>
        </div>
      </section>
    </div>

    <div class="border border-green-500 my-3 p-3">
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Ally tips
      </h2>

      <ul>
        <li v-for="tip in champion.allytips" :key="tip" class="text-base py-2 flex flex-row items-start ">
          <div
            class="h-4 w-6 mt-1 mr-1"
          >
            <CheckMark></CheckMark>
          </div>
          {{ tip }}
        </li>
      </ul>
    </div>

    <div class="border border-green-500 my-3 p-3">
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Enemy Tip
      </h2>

      <ul>
        <li v-for="tip in champion.enemytips" :key="tip" class="text-base flex flex-row items-start py-2 ">
          <div
            class="h-4 w-6 mt-1 mr-1"
          >
            <WarningIcon></WarningIcon>
          </div>
          <span>{{ tip }}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-row flex-wrap">
      <n-data-table
        :columns="tableColumns"
        :data="champStats"
        :max-height="250"
        virtual-scroll
        class="my-8 md:w-1/2"
      >
      </n-data-table>
      <div class="md:w-1/2 mt-8 md:h-[300px]">
        <img
          class="mx-auto h-full object-cover"
          :src="`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`"
        >
      </div>
    </div>

    <section>
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Abilities
      </h2>
      <div>
        <div v-for="spell in spells" :key="spell.name" class="flex flex-row my-6 border-1 border-white p-3">
          <div class="min-w-[60px]">
            <img height="50" width="50" class="" :src="`http://ddragon.leagueoflegends.com/cdn/8.1.1/img/spell/${spell.image.full}`" alt="">
          </div>
          <div>
            <h2 class="text-base font-bold">
              {{ spell.name }}
            </h2>
            <p v-html="spell.description"></p>
            <p v-html="quotesRemover(spell.tooltip)"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
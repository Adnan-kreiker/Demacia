<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import NDataTable from "naive-ui/es/data-table/src/DataTable";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import type { ChampionInfo, Spell } from "~/types";
import CheckMark from "~/components/Icons/CheckMark.vue";
import WarningIcon from "~/components/Icons/WarningIcon.vue";
import AttackIcon from "~/components/Icons/AttackIcon.vue";
import ShieldIcon from "~/components/Icons/ShieldIcon.vue";
import MagicIcon from "~/components/Icons/MagicIcon.vue";
import BrainIcon from "~/components/Icons/BrainIcon.vue";
import championsSpells from '../../../championsSpells.json'

const route = useRoute();

const champion = ref<null | ChampionInfo>(null);

const spells2 = ref<null | any[]>(null);

const effects = ref<null | any[]>(null);

const patchVersion = import.meta.env.VITE_PATCH_VERSION;

const findCurrentChampion = (championsSpells: {
  [key: string]: any[];
}) => {
  const championName = route.params.champion.toString()
  return championsSpells[championName]
}

const currentChampionSpells = computed(() => {
  return findCurrentChampion(championsSpells)
})

const spellsDict = Object.assign({}, ...currentChampionSpells.value)

const spellsDictKeys = Object.keys(spellsDict)

const replaceVarsWithCorrectSpellsValues = (currentChampionSpells: string) => {
  let removedMustaches = currentChampionSpells
  for (let i = 0; i < spellsDictKeys.length; i++) {
    removedMustaches = removedMustaches.replaceAll(mustacheAdder(spellsDictKeys[i]), spellsDict[spellsDictKeys[i]])
  }
  return removedMustaches
}

const replaceEffectsWithValues = (currentChampionSpells: string, i: number) => {
  const eff = effectsValueExtractor(effects.value!)[i]
  const currentKeys = Object.keys(eff[0])
  const regex = new RegExp(currentKeys.join('|'), 'gi')
  currentChampionSpells = currentChampionSpells.replace(regex, function (matched) {
    return eff[0][matched as keyof EffectsValues]
  })
  return currentChampionSpells
}

function mustacheAdder (str: string) {
  return `{{ ${str} }}`
}

interface EffectsValues {
  '{{ e1 }}': string;
  '{{ e2 }}': string;
  '{{ e3 }}': string;
  '{{ e4 }}': string;
  '{{ e5 }}': string;
  '{{ e6 }}': string;
  '{{ e7 }}': string;
  '{{ e8 }}': string;
  '{{ e9 }}': string;
  '{{ e10 }}': string;
}

function effectsValueExtractor (effects: any[]) {
  const res = effects.map((innerArr: any[], i) => {
    const convertedArr = Object.values(innerArr)
    const data: EffectsValues[] = convertedArr.map(arr => {
      return {
        '{{ e1 }}': [...new Set([...arr[1]])].toString().split(',').join('/'),
        '{{ e2 }}': [...new Set([...arr[2]])].toString().split(',').join('/'),
        '{{ e3 }}': [...new Set([...arr[3]])].toString().split(',').join('/'),
        '{{ e4 }}': [...new Set([...arr[4]])].toString().split(',').join('/'),
        '{{ e5 }}': [...new Set([...arr[5]])].toString().split(',').join('/'),
        '{{ e6 }}': [...new Set([...arr[6]])].toString().split(',').join('/'),
        '{{ e7 }}': [...new Set([...arr[7]])].toString().split(',').join('/'),
        '{{ e8 }}': [...new Set([...arr[8]])].toString().split(',').join('/'),
        '{{ e9 }}': [...new Set([...arr[9]])].toString().split(',').join('/'),
        '{{ e10 }}': [...new Set([...arr[10]])].toString().split(',').join('/'),
      }
    })
    return data
  })
  return res
}

async function getChampion () {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${route.params.champion}.json`
  );
  const champ = await res.json();
  champion.value = Object.values(champ.data)[0] as ChampionInfo;
  spells2.value = champion.value.spells.map(spell => {
    return {
      tip: spell.tooltip
    }
  })
  effects.value = champion.value.spells.map(spell => {
    return {
      effect: spell.effect
    }
  })
}

getChampion();

type Stats = {
  [key: string]: string | number;
};

const tableColumns: DataTableColumns<Stats> = [
  { title: "Skill", key: "Skill", align: "center" },
  { title: "Value", key: "Value", align: "center" },
];

const champStats = ref<Stats[]>([]);

const spells = ref<Spell[]>([]);

watch(champion, () => {
  if (champion.value) {
    champStats.value = Object.entries(champion.value!.stats).map((stat) => {
      return {
        Skill: stat[0],
        Value: stat[1],
      };
    });

    spells.value = champion.value.spells;
  }
});

watch(effects, () => {
  if (effects.value) {
  }
}, {
  immediate: true
})

</script>

<template>
  <div v-if="champion">
    <h1 class="text-3xl font-bold text-center mb-6">
      {{ champion.name }} the {{ champion.title }}
    </h1>
    <div class="flex flex-row items-center justify-center flex-wrap sm:flex-nowrap border-1 border-green-500 p-3">
      <div class="h-full min-w-[98px] relative">
        <img class="my-auto" height="98"
          :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champion.id}.png`" />
        <div class="absolute bottom-1 right-0">
          <p v-for="(tag, i) in champion.tags" :key="i" class="bg-dark-500 text-white text-xs p-0">
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
          <div class="flex min-w-26 flex-row items-center">
            <AttackIcon class="h-5 w-5"></AttackIcon>
            <p class="text-base md:text-lg mx-2 capitalize">Attack</p>
          </div>
          <div :style="{ width: champion.info.attack * 10 + '%', maxWidth: 70 + '%' }" class="bg-red-500 h-4"></div>
        </div>

        <div class="flex flex-row items-center">
          <div class="flex min-w-26 flex-row items-center">
            <ShieldIcon class="h-5 w-5"></ShieldIcon>
            <p class="text-base md:text-lg mx-2 capitalize">Defense</p>
          </div>
          <div :style="{ width: champion.info.defense * 10 + '%', maxWidth: 70 + '%' }" class="bg-green-500 h-4"></div>
        </div>

        <div class="flex flex-row items-center">
          <div class="flex min-w-26 flex-row items-center">
            <MagicIcon class="h-5 w-5"></MagicIcon>
            <p class="text-base md:text-lg mx-2 capitalize">Magic</p>
          </div>
          <div :style="{ width: champion.info.magic * 10 + '%', maxWidth: 70 + '%' }" class="bg-purple-500 h-4"></div>
        </div>

        <div class="flex flex-row items-center">
          <div class="flex min-w-26 flex-row items-center">
            <BrainIcon class="h-5 w-5"></BrainIcon>
            <p class="text-base md:text-lg mx-2 capitalize">Difficulty</p>
          </div>
          <div :style="{ width: champion.info.difficulty * 10 + '%', maxWidth: 70 + '%' }" class="bg-pink-500 h-4">
          </div>
        </div>
      </section>
    </div>

    <div v-if="champion.allytips.length" class="border border-green-500 my-3 p-3">
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Ally tips
      </h2>

      <ul>
        <li v-for="tip in champion.allytips" :key="tip" class="text-base py-2 flex flex-row items-start">
          <div class="h-4 w-6 mt-1 mr-1">
            <CheckMark></CheckMark>
          </div>
          {{ tip }}
        </li>
      </ul>
    </div>

    <div v-if="champion.enemytips.length" class="border border-green-500 my-3 p-3">
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Enemy Tip
      </h2>

      <ul>
        <li v-for="tip in champion.enemytips" :key="tip" class="text-base flex flex-row items-start py-2">
          <div class="h-4 w-6 mt-1 mr-1">
            <WarningIcon></WarningIcon>
          </div>
          <span>{{ tip }}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-row flex-wrap">
      <n-data-table :columns="tableColumns" :data="champStats" :max-height="250" virtual-scroll class="my-8 md:w-1/2">
      </n-data-table>
      <div class="md:w-1/2 mt-8 md:h-[300px]">
        <img class="mx-auto h-full object-cover"
          :src="`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`" />
      </div>
    </div>

    <section>
      <h2 class="text-lg font-bold underline underline-green-500 underline-2">
        Abilities
      </h2>
      <div>
        <div v-for="(spell, i) in spells" :key="i" class="flex flex-row my-6 border-1 border-white p-3">
          <div class="min-w-[60px]">
            <img height="50" width="50" class=""
              :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spell.image.full}`" alt="" />
          </div>
          <div>
            <h2 class="text-base font-bold">
              {{ spell.name }}
            </h2>
            <p v-html="spell.description"></p>
            <p v-if="spells2" v-html="replaceEffectsWithValues(replaceVarsWithCorrectSpellsValues(spells2[i].tip), i)">
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
  <div class="flex flex-col gap-2 mt-8 " v-else>
    <n-skeleton class="mx-auto" height="36px" width="50%" />
    <n-skeleton height="150px" width="100%" />
    <n-skeleton height="28px" width="70%" />
    <n-skeleton height="28px" width="40%" />
    <n-skeleton height="28px" width="30%" />
    <n-skeleton height="28px" width="60%" />
    <n-skeleton height="198px" width="100%" />
    <n-skeleton height="140px" width="100%" />
    <n-skeleton height="363px" width="100%" />
    <n-skeleton height="681px" width="100%" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

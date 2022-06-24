<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import type { RegionParam, Summoner } from '~/types'
import { useRegionStore } from '~/stores/region'
import useSummoner from '~/composables/useSummoner'
import SummonerFirstTab from '~/components/SummonerFirstTab.vue'
import ChampionMastery from '~/components/ChampionMastery.vue'
import LiveGame from '~/components/LiveGame.vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SummonerLeagueInformation from '~/components/SummonerLeagueInformation.vue'

const store = useRegionStore()

const route = useRoute()

const summonerInfo = ref<null | Summoner>(null)

const summoner = route.params.summoner as string

const region = ref(route.query.region) as Ref<RegionParam>

const { getSummonerByName } = useSummoner()

watch(region, (newRegion: RegionParam) => {
  if (newRegion)
    store.setRegion(newRegion)
}, {
  immediate: true,
})

const queueOptions = [
  {
    label: 'RANKED FLEX SR',
    value: 'RANKED_FLEX_SR',
  },
  {
    label: 'RANKED SOLO 5x5',
    value: 'RANKED_SOLO_5x5',
  },
  {
    label: 'RANKED TFT PAIRS',
    value: 'RANKED_TFT_PAIRS',
  },
]

const currentTab = ref(0)

type Tabs = typeof SummonerFirstTab | typeof ChampionMastery | typeof LiveGame | typeof SummonerLeagueInformation

const currentComponent = ref<Tabs>(markRaw(SummonerFirstTab))

const error = ref(false)

const getSummonerInfo = async () => {
  try {
    const res = await getSummonerByName(summoner, region.value)
    if (res?.status && res.status.status_code === 404) {
      error.value = true
      return
    }
    if (res)
      summonerInfo.value = res
  }
  catch (err) {
    console.error(err)
    error.value = true
  }
}

const currentProps = computed(() => {
  if (currentComponent.value === SummonerFirstTab) {
    return {
      'summoner-info': summonerInfo,
      'queue-options': queueOptions,
    }
  }
  else if (currentComponent.value === ChampionMastery) {
    return {
      'summoner-info': summonerInfo,
    }
  }
  else if (currentComponent.value === LiveGame) {
    return {
      'summoner-id': summonerInfo.value?.id,
    }
  }
})

const switchComponent = (newComponent: Tabs) => {
  currentComponent.value = markRaw(newComponent)
}

getSummonerInfo()
</script>

<template>
  <div v-if="!error">
    <!-- Tabs Panel -->
    <div v-if="summonerInfo">
      <div class="border-b border-dark-300 mb-4 flex flex-row">
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 0 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 0, switchComponent(SummonerFirstTab)">
          Summoner Info
        </button>
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 1 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 1, switchComponent(ChampionMastery)">
          Champions Mastery
        </button>
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 2 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 2, switchComponent(LiveGame)">
          Live Game
        </button>
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 3 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 3, switchComponent(SummonerLeagueInformation)">
          League Information
        </button>
      </div>
      <keep-alive>
        <component :is="currentComponent" v-bind="currentProps" />
      </keep-alive>
    </div>

    <!-- Skeletons -->
    <div v-else>
      <SummonerPageSkeletons />
    </div>
  </div>

  <!-- Error Component -->
  <div v-else class="flex flex-col justify-start items-center">
    <ErrorComponent
      status="404" image-url="/garenNotFound.png"
      description="Make sure you typed the correct name" title="Summoner Not Found! 🕵"
    />
    <SearchForSummoner />
  </div>
</template>


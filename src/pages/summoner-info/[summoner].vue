<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NSelect, NSkeleton, NSpace } from 'naive-ui'
import type { Ref } from 'vue'
import type { QueueTypes, RegionParam, Summoner } from '~/types'
import SummonersRankedInfo from '~/components/SummonersRankedInfo.vue'
import MatchHistoryInfo from '~/components/MatchHistoryInfo.vue'
import ErrorComponent from '~/components/ErrorComponent.vue'
import SearchForSummoner from '~/components/SearchForSummoner.vue'
import ChampionMastery from '~/components/ChampionMastery.vue'
import LiveGame from '~/components/LiveGame.vue'
import { regionStore } from '~/stores/region'
import useSummoner from '~/hooks/useSummoner'

const store = regionStore()

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

const queueType = ref<QueueTypes>('RANKED_SOLO_5x5')

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

getSummonerInfo()
</script>

<template>
  <div v-if="!error">
    <!-- Tabs Panel -->
    <div v-if="summonerInfo">
      <div class="border-b border-dark-300 mb-4 flex flex-row">
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 0 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 0">
          Summoner Info
        </button>
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 1 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 1">
          Champions Mastery
        </button>
        <button class="px-3 border-dark-200 border py-1.5 -mb-0.5 bg-dark-300 mx-0.7 rounded-t-sm text-sm sm:text-base" :class="currentTab === 2 ? 'text-green-400 border-b-2 border-b-dark-500 bg-primary' : ''" @click="currentTab = 2">
          Live Game
        </button>
      </div>

      <keep-alive>
        <div v-if="currentTab === 0">
          <!-- Summoner's Information -->
          <Transition name="fadeMenu" appear>
            <div>
              <div class="flex flex-wrap my-8 gap-5 justify-center sm:justify-evenly min-h-[300px]">
                <!-- Summoners Name and Image -->
                <div class="sm:w-[40%]">
                  <Suspense>
                    <SummonersInfo :summoner-info="summonerInfo" />
                    <template #fallback>
                      <section class="flex flex-row justify-start gap-2 mb-8">
                        <n-skeleton height="42px" width="143px" :sharp="false" />
                        <n-skeleton height="42px" width="174px" :sharp="false" />
                        <n-skeleton height="42px" width="107px" :sharp="false" />
                        <n-space vertical class="sm:w-1/3 mx-auto">
                          <n-skeleton class="mx-auto" height="240px" width="240px" :sharp="false" />
                          <n-skeleton class="mx-auto" height="40px" width="50%" :sharp="false" />
                          <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
                          <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
                        </n-space>
                      </section>
                    </template>
                  </Suspense>
                </div>
                <div class=" sm:w-[55%]">
                  <!-- Ranked Info Section -->
                  <Suspense>
                    <section>
                      <n-space :item-style="{ marginBottom: `${20}px`, minWidth: `${0}%`, marginInline: 'auto' }">
                        <n-select v-model:value="queueType" :options="queueOptions" />
                      </n-space>
                      <SummonersRankedInfo :summoner-info="summonerInfo" :queue-type="queueType" />
                    </section>
                    <template #fallback>
                      <section>
                        <n-skeleton class="mx-auto my-4" height="34px" width="70%" />
                        <n-skeleton class="mx-auto" height="451px" width="100%" />
                      </section>
                    </template>
                  </Suspense>
                </div>
              </div>
              <Suspense>
                <!-- MatchHistory Section -->
                <MatchHistoryInfo :summoner-info="summonerInfo" />
                <template #fallback>
                  <section class="flex flex-col gap-3 justify-center items-center">
                    <div class="flex flex-row flex-wrap justify-between">
                      <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="48px" width="263px" />
                      <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="250px" width="250px" />
                    </div>
                    <n-skeleton v-for="i in 5" :key="i" height="185px" width="840px" />
                  </section>
                </template>
              </Suspense>
            </div>
          </Transition>
        </div>
        <!-- Champion Mastery Tab -->
        <Transition v-else-if="currentTab === 1" name="fadeMenu" appear>
          <Suspense>
            <ChampionMastery :summoner-info="summonerInfo" />
            <template #fallback>
              <section class="flex flex-row flex-wrap gap-3 justify-center">
                <n-skeleton v-for="n in 30" :key="n" height="130px" width="280px" />
              </section>
            </template>
          </Suspense>
        </Transition>
        <!-- LiveGame Tab -->
        <Transition v-else-if="currentTab === 2" name="fadeMenu" appear>
          <Suspense>
            <LiveGame :summoner-id="summonerInfo.id" />
          </suspense>
        </Transition>
      </keep-alive>
    </div>

    <!-- Skeletons -->
    <div v-else>
      <section class="flex flex-row justify-start gap-2 mb-8">
        <n-skeleton height="42px" width="143px" :sharp="false" />
        <n-skeleton height="42px" width="174px" :sharp="false" />
        <n-skeleton height="42px" width="107px" :sharp="false" />
      </section>
      <section class="w-full flex-grow mb-8 flex-wrap md:flex-nowrap flex gap-3 justify-center flex-col sm:flex-row">
        <n-space vertical class="sm:w-1/3 mx-auto">
          <n-skeleton class="mx-auto" height="240px" width="240px" :sharp="false" />
          <n-skeleton class="mx-auto" height="40px" width="50%" :sharp="false" />
          <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
          <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
        </n-space>
        <div class="sm:w-[55%]">
          <n-skeleton class="mx-auto my-4" height="34px" width="70%" />
          <n-skeleton class="mx-auto" height="451px" width="100%" />
        </div>
      </section>
      <section class="flex flex-col gap-3 justify-center items-center">
        <div class="flex flex-row flex-wrap justify-between">
          <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="48px" width="263px" />
          <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="250px" width="250px" />
        </div>
        <n-skeleton v-for="i in 5" :key="i" height="185px" width="840px" />
      </section>
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

<style scoped>
.n-select{
  min-width: 150px !important;
}
</style>

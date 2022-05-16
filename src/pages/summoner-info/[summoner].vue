<script setup lang="ts">
import { useRoute } from 'vue-router'
import NSkeleton from 'naive-ui/es/skeleton/src/Skeleton'
import NSelect from 'naive-ui/es/select/src/Select'
import NSpace from 'naive-ui/es/space/src/Space'
import NTabs from 'naive-ui/es/tabs/src/Tabs'
import NTabPane from 'naive-ui/es/tabs/src/TabPane'
import type { Ref } from 'vue'
import type { QueueTypes, Summoner } from '~/types'
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

const region = ref(route.query.region) as Ref<string>

const { getSummonerByName } = useSummoner()

watch(region, (newRegion) => {
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

const queueType = ref<QueueTypes>('RANKED_SOLO_5x5')

const error = ref(false)

const getSummonerInfo = async () => {
  try {
    const res = await getSummonerByName(summoner, region.value)
    if (res?.status && res.status.status_code === 404) {
      error.value = true
      return
    }
    else if (res) {
      summonerInfo.value = res
    }
  }
  catch (err) {
    console.error(err)
    error.value = true
  }
}

getSummonerInfo()
</script>

<template>
  <div>
    <div v-if="!error">
      <!-- Summoner's Information -->
      <div v-if="summonerInfo">
        <n-tabs animated size="large" type="card">
          <n-tab-pane name="summonerInfo" tab="Summoner Info">
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
                    <n-space :item-style="{ marginBottom: `${20}px`, minWidth: `${70}%`, marginInline: 'auto' }">
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
            <!-- Match History  -->
            <Suspense>
              <MatchHistoryInfo :summoner-info="summonerInfo" />
              <template #fallback>
                <section class="flex flex-col gap-3 justify-center items-center">
                  <n-skeleton class="mx-auto my-8 " height="48px" width="263px" />

                  <n-skeleton v-for="i in 5" :key="i" height="185px" width="840px" />
                </section>
              </template>
            </Suspense>
            <!-- Champions Mastery -->
          </n-tab-pane>
          <n-tab-pane name="summonerChampInfo" tab="Champions Mastery">
            <Suspense>
              <ChampionMastery :summoner-info="summonerInfo" />
              <template #fallback>
                <section class="flex flex-row flex-wrap gap-3 justify-center">
                  <n-skeleton v-for="n in 30" :key="n" height="130px" width="280px" />
                </section>
              </template>
            </Suspense>
          </n-tab-pane>
          <!-- Live Game -->
          <n-tab-pane name="liveGame" tab="Live Game">
            <Suspense>
              <LiveGame :summoner-id="summonerInfo.id" />
            </Suspense>
          </n-tab-pane>
        </n-tabs>
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
          <n-skeleton class="mx-auto my-8 " height="48px" width="263px" />
          <n-skeleton v-for="i in 10" :key="i" height="185px" width="840px" />
        </section>
      </div>
    </div>
    <!-- Error Component -->
    <div v-if="error" class="flex flex-col justify-start items-center">
      <ErrorComponent
        status="404" image-url="/garenNotFound.png"
        description="Make sure you typed the correct name" title="Summoner Not Found! 🕵"
      />
      <SearchForSummoner />
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NH3, NText } from 'naive-ui/es/typography'
import { NSelect, NSkeleton, NSpace, NTabPane, NTabs} from 'naive-ui'
import NPagination from 'naive-ui/es/pagination/src/Pagination'
import type { Ref } from 'vue'
import type { QueueTypes, Summoner } from '~/types'
import SummonersRankedInfo from '~/components/SummonersRankedInfo.vue'
import MatchHistoryInfo from '~/components/MatchHistoryInfo.vue'
import ErrorComponent from '~/components/ErrorComponent.vue'
import SearchForSummoner from '~/components/SearchForSummoner.vue'
import ChampionMastery from '~/components/ChampionMastery.vue'
import LiveGame from '~/components/LiveGame.vue'
import { regionStore } from '~/stores/region'
import { leagueStore } from "~/stores/league";
import useSummoner from '~/hooks/useSummoner'
import {PlayerLambdaWithIndex, Ranks} from "~/types";
import usePlayerLeague from "~/hooks/usePlayerLeague";
import {storeToRefs} from "pinia";

const summonersTableKey = ref(0)

const route = useRoute()

const summonerInfo = ref<null | Summoner>(null)

const summoner = route.params.summoner as string

const region = ref(route.query.region) as Ref<string>

const { getSummonerByName } = useSummoner()

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

const regionVal = ref('euw1')

//let rank = ref<Ranks>('II')

const main = leagueStore();

let { leagueId, rank } = storeToRefs(main)

const page = ref(1)

const { playersLambda } = usePlayerLeague(leagueId.value, regionVal.value)

const sortedPlayersLambda = computed<PlayerLambdaWithIndex[] | []>(() => {
  const start = page.value * 20
  if (playersLambda.value) {
    return ([...playersLambda.value] as PlayerLambdaWithIndex[])
        .filter(a => { return a.rank === rank.value})
        .sort((a, b) => b.leaguePoints - a.leaguePoints)
        .map((player, idx) => {
          return {
            ...player,
            idx: idx + 1,
          }
        })
        .slice(start - 20, start)
  }
  return []
})

const print = console.log("leagueId", leagueId.value)

watch([rank], () => {
  console.log("watch1")
  page.value = 1
})

watch([page, playersLambda, leagueId, getSummonerInfo, rank], () => {
  console.log("watch2")
  summonersTableKey.value++
})

const updatePage = (pageNumber: number) => {
  page.value = pageNumber
  summonersTableKey.value++
}

const rankOptions = [
  {
    label: 'I',
    value: 'I',
  },
  {
    label: 'II',
    value: 'II',
  },
  {
    label: 'III',
    value: 'III',
  },
  {
    label: 'IV',
    value: 'IV',
  }
]

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
          </n-tab-pane>
          <!-- Champions Mastery -->
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
          <!-- Leaderboard of the summoner @click="usePlayerLeague(main.leagueId, regionVal.value)"-->
          <n-tab-pane name="leaderboard" tab="Leaderboard" @click="usePlayerLeague(leagueId.value, regionVal.value)">
            <div v-if="sortedPlayersLambda">
              <div class="min-h-screen">
                <div class="flex flex-row flex-wrap items-center mb-4">
                  <n-h3 class="mx-4 my-auto" prefix="bar" align-text type="success">
                    <n-text type="success">
                      Choose rank
                    </n-text>
                  </n-h3>
                  <div class="flex flex-row flex-wrap flex-grow">
                    <n-select v-model:value="rank" class="max-w-[150px] min-w-20 my-1 pr-5" :options="rankOptions"/>
                  </div>
                </div>
                <SummonersTableLambda
                  :key="summonersTableKey"
                  :rank="rank"
                  :challenger-players="sortedPlayersLambda"
                  :page="page"
                  :region="regionVal"
                />
                <div class="flex justify-center mt-5">
                  <n-pagination
                    v-if="playersLambda"
                    v-model="page"
                    :default-page="1"
                    :page="page"
                    :page-count="Math.ceil(sortedPlayersLambda.length / 20)"
                    @update-page="updatePage($event)"
                  />
                </div>
              </div>
            </div>
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

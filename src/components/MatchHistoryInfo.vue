<script setup lang="ts">
import type { Participant, Summoner } from "~/types";
import NSpace from "naive-ui/es/space/src/Space";
import NCollapseTransition from "naive-ui/es/collapse-transition/src/CollapseTransition";
import NTag from "naive-ui/es/tag/src/Tag";
import NButton from 'naive-ui/es/button/src/Button';
import { NDivider } from "naive-ui";
import MatchHistoryTeam from "./MatchHistoryTeam.vue";
import MatchHistoryTeamDataTable from "./MatchHistoryTeamDataTable.vue";
import ChevronRight from "./Icons/ChevronRight.vue";
import {
  formatTime,
  timeToDaysAgo,
  toLowerCase,
  mapSpellKeyToName,
  idToRunes,
  secondsToHrsMinsSecs,
  secondsToMinutes,
  queueIdtoDescriptionMapper,
} from "../../utils";
import useMatchHistory from "~/hooks/useMatchHistory";
import { regionStore } from "~/stores/region";
import { storeToRefs } from "pinia";

const props = defineProps<{
  summonerInfo: Summoner;
}>();

const route = useRoute();

const start = ref(0)

const { region } = storeToRefs(regionStore());

const { matchHistory, getMatchHistory, loading } = useMatchHistory(props.summonerInfo.puuid, region.value, start)

await getMatchHistory()

const currentFilter = ref('All Matches')

const filterOptions = [
  {
    id: 1,
    name: 'All Matches',
  },
  {
    id: 2,
    name: 'Ranked Solo'
  },
  {
    id: 3,
    name: 'Normal'
  },
  {
    id: 4,
    name: 'Aram'
  }
]

const filteredMatchHistory = computed(() => {
  if (currentFilter.value === 'Ranked Solo') {
    return matchHistory.value.filter(match => match.info.queueId === 420)
  }
  if (currentFilter.value === 'Normal') {
    return matchHistory.value.filter(match => match.info.queueId === 430 || match.info.queueId === 400)
  }
  if (currentFilter.value === 'Aram') {
    return matchHistory.value.filter(match => match.info.queueId === 450)
  }
  return matchHistory.value
})

const summoner = (participants: Participant[]): Participant | undefined => {
  const participant = participants.find(
    (participant) =>
      participant.summonerId === props.summonerInfo.id
  );
  return participant;
};
const matchHistoryBackground = (result: boolean, show: boolean): string => {
  if (show) {
    if (result) {
      return "#1b224b";
    } else {
      return "#301f3a";
    }
  } else {
    if (result && !show) {
      return "#1f306a";
    } else {
      return "#3e213b";
    }
  }
};

watch(() => route.fullPath, () => {
  start.value = 0;
}, {
  immediate: true,
})

const showFilterList = ref(false)

const filterDiv = ref(null)

onClickOutside(filterDiv, () => {
  showFilterList.value = false
})

const handleClick = (e: Event) => {
  const event = e.target as HTMLElement
  currentFilter.value = event.innerText
}

const patchVersion = import.meta.env.VITE_PATCH_VERSION;

</script>
<template>
  <section class="min-h-[230px]" v-if="matchHistory && matchHistory.length > 0">
    <div class="flex flex-row justify-center gap-4 items-center border-t border-dark-200">
      <h2 class="text-center text-2xl md:text-4xl   my-8 font-bold"><span
          class="border-l-6 pl-4 rounded-sm border-green-600">Match History</span></h2>
      <div ref="filterDiv" class=" mt-2 relative   w-[150px] ">
        <div @click="showFilterList = !showFilterList" class="flex flex-row items-center hover:cursor-pointer">
          <span class="py-2 text-center  px-3 w-[110px] inline-block  t rounded-sm bg-dark-100 text-white ">{{
              currentFilter
          }}</span>
          <ChevronRight class="h-5 w-5 ml-2 transform  text-light-900  ease duration-200"
            :class="{ 'rotate-90': showFilterList }" />
        </div>
        <Transition name="fade" appear>
          <ul v-show="showFilterList"
            class="my-4 absolute z-30 h-max top-5.5 text-center bg-dark-100 w-[110px]  rounded-sm shadow-2xl drop-shadow-2xl">
            <li :class="{ 'text-green-400 font-bold': currentFilter === option.name }"
              @click="handleClick($event), showFilterList = false"
              class="p-2 hover:bg-warm-gray-500 hover:cursor-pointer" v-for="option in filterOptions" :key="option.id"
              :value="option.name">
              {{
                  option.name
              }}
            </li>
          </ul>
        </Transition>
      </div>
    </div>
    <div v-for="match in filteredMatchHistory" :key="match.metadata.matchId" :style="{
      background: matchHistoryBackground(
        summoner(match.info.participants)?.win,
        match.show
      ),
    }" class="rounded p-3 my-3 max-w-4xl mx-auto">
      <div v-if="summoner(match.info.participants)" class="overflow-x-scroll scroll-div">
        <div class="min-w-[840px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <p class="my-1 font-bold">{{ queueIdtoDescriptionMapper(match.info.queueId) }}</p>

                <p class="text-xs text-gray-300">
                  {{ timeToDaysAgo(match.info.gameCreation) }}
                </p>
                <p class="my-1" v-if="match.info.gameEndTimestamp">
                  ⏳ {{ secondsToHrsMinsSecs(match.info.gameDuration) }}
                </p>
                <h2 v-else>⏳ {{ formatTime(match.info.gameDuration) }}</h2>
                <n-tag class="my-2 font-bold" :type="summoner(match.info.participants)?.win ? 'info' : 'error'">
                  <span>{{
                      summoner(match.info.participants).win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <button class="mx-auto flex flex-row px-2 py-1 transform ease-linear duration-300"
                  :style="{ transform: match.show ? 'rotate(180deg)' : 'rotate(90deg)' }"
                  @click="match.show = !match.show">
                  <chevron-top class="h-5 w-5 text-gray-300" />
                </button>
              </div>

              <!-- Summoner Image and Name -->
              <div class="flex flex-row">
                <div class="px-4 flex flex-col mt-8 text-center justify-center">
                  <div class="relative">
                    <img class="rounded-sm" height="70" width="70" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${toLowerCase(
                      summoner(match.info.participants)?.championName
                    )}.png`" />
                    <span
                      class="text-sm px-[2px] rounded-sm bg-blue-gray-800 absolute top-12 w-min text-white right-0.5">
                      {{ summoner(match.info.participants).champLevel }}
                    </span>
                  </div>
                  <p class="text-center">
                    {{ summoner(match.info.participants).championName }}
                  </p>

                  <br />
                </div>
                <!-- Summoner's spells -->
                <div class="flex flex-col justify-center items-center">
                  <div class="flex gap-1">
                    <img height="32" width="32" class="w-8 rounded-sm h-8" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
                      summoner(match.info.participants).summoner1Id.toString()
                    )}.png`" />
                    <img height="32" width="32" class="w-8 h-8 rounded-sm" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
                      summoner(match.info.participants).summoner2Id.toString()
                    )}.png`" />
                  </div>
                  <div class="flex justify-center items-center">
                    <img height="40" width="40" class="rounded-sm" :src="`https://ddragon.canisback.com/img/${idToRunes(
                      summoner(match.info.participants).perks.styles[0].selections[0]
                        .perk
                    )}`" />
                    <img height="30" width="30" class="mx-auto rounded-sm object-contain" :src="`https://ddragon.canisback.com/img/${idToRunes(
                      summoner(match.info.participants).perks.styles[1].selections[1]
                        .perk
                    )}`" />
                  </div>
                </div>
              </div>

              <!-- Summoner Stats -->
              <div class="flex flex-col max-w-[150px] text-gray-100 justify-center flex-1 items-center">
                <div class="font-bold">
                  <span class="pr-1">{{ summoner(match.info.participants).kills }} /</span>
                  <span class="pr-1 text-red-400">{{
                      summoner(match.info.participants).deaths
                  }}</span>
                  <span class="pr-1">/ {{ summoner(match.info.participants).assists }}</span>
                </div>
                <p>
                  <span class="text-orange-400">
                    {{
                        isNaN(
                          (summoner(match.info.participants).kills +
                            summoner(match.info.participants).assists) /
                          summoner(match.info.participants).deaths
                        )
                          ? 0
                          : (
                            (summoner(match.info.participants).kills +
                              summoner(match.info.participants).assists) /
                            summoner(match.info.participants).deaths
                          ).toFixed(2)
                    }}
                  </span>
                  <span class="text-gray-400 ml-1 text-sm">KDA</span>
                </p>
                <div>
                  <div class="">
                    <span class="py-1">{{
                        summoner(match.info.participants).totalMinionsKilled
                    }}</span>
                    <span class="text-gray-400 ml-1">CS ({{
                        isNaN(summoner(match.info.participants).totalMinionsKilled /
                          secondsToMinutes(match.info.gameDuration)) ? 0 :
                          (
                            summoner(match.info.participants).totalMinionsKilled /
                            secondsToMinutes(match.info.gameDuration)
                          ).toFixed(1)
                    }})</span>
                    <br />

                    <span class="py-1">
                      {{ summoner(match.info.participants).wardsPlaced }}</span>
                    <span class="text-sm ml-1 text-gray-400">vision</span>
                  </div>
                  <n-tag v-if="
                    summoner(match.info.participants).pentaKills ||
                    summoner(match.info.participants).quadraKills ||
                    summoner(match.info.participants).tripleKills ||
                    summoner(match.info.participants).doubleKills
                  " class="my-3" :color="{ color: '#ee5a52', textColor: 'white', borderColor: 'red' }">
                    {{
                        summoner(match.info.participants).pentaKills
                          ? "Penta Kill"
                          : summoner(match.info.participants).quadraKills
                            ? "Quadra Kill"
                            : summoner(match.info.participants).tripleKills
                              ? "Triple Kill"
                              : summoner(match.info.participants).doubleKills
                                ? "Double Kill"
                                : ""
                    }}
                  </n-tag>
                </div>
              </div>
              <div class="flex flex-row flex-wrap items-center content-center max-w-[120px] gap-1">

                <div v-for="i in 6">
                  <img v-if="summoner(match.info.participants)[(`item${i}`) as keyof Participant] !== 0" height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${summoner(match.info.participants)[(`item${i}`) as keyof Participant]}.png`" />
                  <div v-else class="h-[25px] w-[25px] "
                    :style="{ backgroundColor: summoner(match.info.participants)?.win ? '#12499a' : '#300f3a' }">
                  </div>
                </div>
              </div>
            </div>
            <!-- Red and Blue Teams -->
            <MatchHistoryTeam :participants="match.info.participants"></MatchHistoryTeam>
          </section>
          <!-- More Info Switch and DataTables -->
          <n-space class="mx-3" vertical>
            <keep-alive>
              <n-collapse-transition class="bg-dark-600" v-if="match.show" :show="match.show" appear>
                <div class="flex justify-center mt-4">
                  <MatchHistoryTeamDataTable :participants="match.info.participants" :team="200">
                  </MatchHistoryTeamDataTable>
                </div>
                <n-divider dashed />
                <div class="flex flex-row justify-center">
                  <MatchHistoryTeamDataTable :participants="match.info.participants" :team="100">
                  </MatchHistoryTeamDataTable>
                </div>
              </n-collapse-transition>
              <template v-else></template>
            </keep-alive>
          </n-space>
        </div>
      </div>
    </div>
    <div v-if="filteredMatchHistory.length === 0">
      <p
        class="text-center whitespace-normal text-lg font-bold border-1 text-orange-400 border-red-300  mx-auto px-2 py-1">
        No
        {{ currentFilter }} games were played within the last {{ start + 5 }}
        matches
        , try load
        more
        matches </p>
    </div>
    <n-space justify="center">
      <n-button tertiary type="info" @click="start += 5" :loading="loading" class="mt-8">Load
        More</n-button>
    </n-space>

  </section>
</template>

<style scoped>
.scroll-div {
  @media (min-width: 917px) {
    overflow-x: hidden !important;
  }
}

.n-divider {
  height: 100%;
  background-color: rgb(75, 74, 74);
}
</style>

<script setup lang="ts">
import { MatchInfo, Participant } from "~/types";
import NSpace from "naive-ui/es/space/src/Space";
import NCollapseTransition from "naive-ui/es/collapse-transition/src/CollapseTransition";
import NTag from "naive-ui/es/tag/src/Tag";
import MatchHistoryTeam from "./MatchHistoryTeam.vue";
import MatchHistoryTeamDataTable from "./MatchHistoryTeamDataTable.vue";
import ChevronTop from "./Icons/ChevronTop.vue";
import {
  getSummonerName,
  formatTime,
  timeToDaysAgo,
  toLowerCase,
  mapSpellKeyToName,
  idToRunes,
  secondsToHrsMinsSecs,
  secondsToMinutes,
} from "../../utils";

const props = defineProps<{
  matchHistory: MatchInfo[];
}>();

const route = useRoute();

const matchHistory = ref<MatchInfo[]>(props.matchHistory);

const summoner = (participants: Participant[]): Participant => {
  const participant = participants.filter(
    (participant) =>
      getSummonerName(participant.summonerName) ===
      getSummonerName(route.params.summoner.toString())
  );
  return participant[0];
};

const matchHistoryBackground = (result: boolean): string => {
  if (result) {
    return "#1e2b5e";
  } else {
    return "#3e213b";
  }
};
</script>
<template>
  <section class="">
    <div
      v-for="match in matchHistory"
      :key="match.metadata.matchId"
      :style="{
        background: matchHistoryBackground(summoner(match.info.participants).win),
      }"
      class="rounded p-3 my-3 max-w-4xl mx-auto"
    >
      <div class="overflow-x-scroll scroll-div">
        <div class="min-w-[840px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <p class="my-1 font-bold">{{ match.info.gameMode }}</p>
                <p class="text-xs text-gray-300">
                  {{ timeToDaysAgo(match.info.gameCreation) }}
                </p>
                <p class="my-1" v-if="match.info.gameEndTimestamp">
                  ⏳ {{ secondsToHrsMinsSecs(match.info.gameDuration) }}
                </p>
                <h2 v-else>⏳ {{ formatTime(match.info.gameDuration) }}</h2>
                <n-tag
                  class="my-2 font-bold"
                  :type="summoner(match.info.participants).win ? 'info' : 'error'"
                >
                  <span>{{
                    summoner(match.info.participants).win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <button
                  class="mx-auto flex flex-row px-2 py-1"
                  @click="match.show = !match.show"
                >
                  <chevron-top
                    :class="{ 'rotate-[360deg]': match.show }"
                    class="h-5 w-5 text-gray-300 transform rotate-180 ease-linear duration-300"
                  />
                </button>
              </div>

              <!-- Summoner Image and Name -->
              <div class="flex flex-row">
                <div class="px-4 flex flex-col mt-8 text-center justify-center">
                  <div class="relative">
                    <img
                      class="rounded-sm"
                      height="70"
                      width="70"
                      :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${toLowerCase(
                        summoner(match.info.participants).championName
                      )}.png`"
                    />
                    <span
                      class="text-sm px-[2px] rounded-sm bg-blue-gray-800 absolute top-12 w-min text-white right-0.5"
                    >
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
                    <img
                      height="32"
                      width="32"
                      class="w-8 rounded-sm h-8"
                      :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner1Id.toString()
                      )}.png`"
                    />
                    <img
                      height="32"
                      width="32"
                      class="w-8 h-8 rounded-sm"
                      :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner2Id.toString()
                      )}.png`"
                    />
                  </div>
                  <div class="flex justify-center items-center">
                    <img
                      height="40"
                      width="40"
                      class="rounded-sm"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[0].selections[0]
                          .perk
                      )}`"
                    />
                    <img
                      height="30"
                      width="30"
                      class="mx-auto rounded-sm object-contain"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[1].selections[1]
                          .perk
                      )}`"
                    />
                  </div>
                </div>
              </div>

              <!-- Summoner Stats -->
              <div
                class="flex flex-col max-w-[150px] text-gray-100 justify-center flex-1 items-center"
              >
                <div class="font-bold">
                  <span class="pr-1"
                    >{{ summoner(match.info.participants).kills }} /</span
                  >
                  <span class="pr-1 text-red-400">{{
                    summoner(match.info.participants).deaths
                  }}</span>
                  <span class="pr-1"
                    >/ {{ summoner(match.info.participants).assists }}</span
                  >
                </div>
                <p>
                  <span class="text-orange-400">
                    {{
                      (
                        (summoner(match.info.participants).kills +
                          summoner(match.info.participants).assists) /
                        summoner(match.info.participants).deaths
                      ).toFixed(2) ?? 0
                    }}
                  </span>
                  <span class="text-gray-400 ml-1 text-sm">KDA</span>
                </p>
                <div>
                  <div class="">
                    <span class="py-1">{{
                      summoner(match.info.participants).totalMinionsKilled
                    }}</span>
                    <span class="text-gray-400 ml-1"
                      >CS ({{
                        (
                          summoner(match.info.participants).totalMinionsKilled /
                          secondsToMinutes(match.info.gameDuration)
                        ).toFixed(1)
                      }})</span
                    >
                    <br />

                    <span class="py-1">
                      {{ summoner(match.info.participants).wardsPlaced }}</span
                    >
                    <span class="text-sm ml-1 text-gray-400">vision</span>
                  </div>
                  <n-tag
                    v-if="
                      summoner(match.info.participants).pentaKills ||
                      summoner(match.info.participants).quadraKills ||
                      summoner(match.info.participants).tripleKills ||
                      summoner(match.info.participants).doubleKills
                    "
                    class="my-3"
                    :color="{ color: '#ee5a52', textColor: 'white', borderColor: 'red' }"
                  >
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
              <div
                class="flex flex-row flex-wrap items-center content-center max-w-[120px] gap-1"
              >
                <img
                  v-if="summoner(match.info.participants).item0 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item0
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item1 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item1
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item2 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item2
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item3 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item3
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item4 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item4
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item5 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item5
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item6 !== 0"
                  height="25"
                  width="25"
                  :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${
                    summoner(match.info.participants).item6
                  }.png`"
                />
              </div>
            </div>
            <!-- Red and Blue Teams -->
            <match-history-team
              :participants="match.info.participants"
            ></match-history-team>
          </section>
          <!-- More Info Switch and DataTables -->
          <n-space class="mx-3" vertical>
            <keep-alive>
              <n-collapse-transition
                class="bg-dark-600"
                v-if="match.show"
                :show="match.show"
                appear
              >
                <div class="flex justify-center mt-4">
                  <match-history-team-data-table
                    :participants="match.info.participants"
                    :team="200"
                  >
                  </match-history-team-data-table>
                </div>
                <n-divider dashed />
                <div class="flex flex-row justify-center">
                  <match-history-team-data-table
                    :participants="match.info.participants"
                    :team="100"
                  >
                  </match-history-team-data-table>
                </div>
              </n-collapse-transition>
              <template v-else></template>
            </keep-alive>
          </n-space>
        </div>
      </div>
    </div>
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

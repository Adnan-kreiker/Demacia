<script setup lang="ts">
import { MatchInfo, Participant } from "~/types";
import NSpace from "naive-ui/es/space/src/Space";
import NCollapseTransition from "naive-ui/es/collapse-transition/src/CollapseTransition";
import NTag from "naive-ui/es/tag/src/Tag";
import NDivider from "naive-ui/es/divider/src/Divider";
import MatchHistoryTeam from "./MatchHistoryTeam.vue";
import MatchHistoryTeamDataTable from "./MatchHistoryTeamDataTable.vue";
import ChevronTop from "./Icons/ChevronTop.vue";
import {
  getSummonerName,
  formatTime,
  toLowerCase,
  unixToDate,
  mapSpellKeyToName,
  idToRunes,
  secondsToHrsMinsSecs,
} from "../../utils";

const props = defineProps<{
  matchHistory: MatchInfo[];
}>();

const route = useRoute();

const matchHistory = ref<MatchInfo[]>(props.matchHistory);

const backgroundColorCalc = (val: boolean): string => {
  return val
    ? "rgba(16, 185, 129, var(--tw-border-opacity))"
    : "rgba(239, 68, 68, var(--tw-border-opacity))";
};

const summoner = (participants: Participant[]): Participant => {
  const participant = participants.filter(
    (participant) =>
      getSummonerName(participant.summonerName) ===
      getSummonerName(route.params.summoner.toString())
  );
  return participant[0];
};
</script>
<template>
  <section class="">
    <div
      v-for="match in matchHistory"
      :key="match.metadata.matchId"
      :class="
        summoner(match.info.participants).win ? 'border-green-500' : 'border-red-500'
      "
      class="border-3 p-3 my-3 max-w-4xl mx-auto"
    >
      <div class="overflow-x-scroll scroll-div">
        <div class="min-w-[840px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <p class="border-blue-400 text-blue-300 my-1 border p-1 rounded-sm">
                  {{ unixToDate(match.info.gameCreation) }}
                </p>
                <p class="my-1">{{ match.info.gameMode }}</p>
                <p class="my-1" v-if="match.info.gameEndTimestamp">
                  ⏳ {{ secondsToHrsMinsSecs(match.info.gameDuration) }}
                </p>
                <h2 v-else>⏳ {{ formatTime(match.info.gameDuration) }}</h2>
                <n-tag
                  class="my-2"
                  :type="summoner(match.info.participants).win ? 'success' : 'error'"
                >
                  <span>{{
                    summoner(match.info.participants).win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <button
                  class="mx-auto border flex flex-row border-gray-600 px-2 py-1"
                  @click="match.show = !match.show"
                >
                  <span class="mr-2 text-gray-300">More Info</span>
                  <chevron-top
                    :class="{ 'rotate-[360deg]': match.show }"
                    class="h-5 w-5 text-gray-300 transform rotate-180 ease-linear duration-300"
                  />
                </button>
              </div>
              <n-divider
                :style="{
                  backgroundColor: backgroundColorCalc(
                    summoner(match.info.participants).win
                  ),
                }"
                vertical
              ></n-divider>

              <!-- Summoner Image and Name -->
              <div>
                <div class="px-4 relative flex flex-col text-center justify-center">
                  <img
                    height="70"
                    width="70"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${toLowerCase(
                      summoner(match.info.participants).championName
                    )}.png`"
                  />
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
                      class="w-8 h-8"
                      :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner1Id.toString()
                      )}.png`"
                    />
                    <img
                      height="32"
                      width="32"
                      class="w-8 h-8"
                      :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${mapSpellKeyToName(
                        summoner(match.info.participants).summoner2Id.toString()
                      )}.png`"
                    />
                  </div>
                  <div class="flex justify-center items-center">
                    <img
                      height="40"
                      width="40"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[0].selections[0]
                          .perk
                      )}`"
                    />
                    <img
                      height="30"
                      width="30"
                      class="mx-auto object-contain"
                      :src="`https://ddragon.canisback.com/img/${idToRunes(
                        summoner(match.info.participants).perks.styles[1].selections[1]
                          .perk
                      )}`"
                    />
                  </div>
                </div>
              </div>
              <n-divider
                :style="{
                  backgroundColor: backgroundColorCalc(
                    summoner(match.info.participants).win
                  ),
                }"
                vertical
              ></n-divider>
              <!-- Summoner Stats -->
              <div class="flex flex-col text-gray-100 justify-center flex-1 items-center">
                <span class="my-2"
                  >KDA: {{ summoner(match.info.participants).kills }} /
                  {{ summoner(match.info.participants).deaths }} /
                  {{ summoner(match.info.participants).assists }}
                </span>
                <div class="flex flex-row gap-1">
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
                <div class="my-2">
                  <div class="">
                    <span class="py-1"
                      >CS :{{
                        summoner(match.info.participants).totalMinionsKilled
                      }}</span
                    >
                    <br />
                    <span class="py-1"
                      >Level : {{ summoner(match.info.participants).champLevel }}</span
                    >
                    <br />
                    <span class="py-1"
                      >Wards placed:
                      {{ summoner(match.info.participants).wardsPlaced }}</span
                    >
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
              <n-divider
                :style="{
                  backgroundColor: backgroundColorCalc(
                    summoner(match.info.participants).win
                  ),
                }"
                vertical
              ></n-divider>
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

<script setup lang="ts">
import { CSSProperties } from "vue";
import { MatchInfo, Participant } from "~/types";
import NSpace from "naive-ui/es/space/src/Space";
import NSwitch from "naive-ui/es/switch/src/Switch";
import NCollapseTransition from "naive-ui/es/collapse-transition/src/CollapseTransition";
import NTag from "naive-ui/es/tag/src/Tag";
import NDivider from "naive-ui/es/divider/src/Divider";
import MatchHistoryTeam from "./MatchHistoryTeam.vue";
import MatchHistoryTeamDataTable from "./MatchHistoryTeamDataTable.vue";
import {
  getSummonerName,
  formatTime,
  toLowerCase,
  mapSpellKeyToName,
  idToRunes,
  secondsToHrsMinsSecs,
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

const switchStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
  const style: CSSProperties = {};
  if (checked) {
    style.background = "#565656";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#565656";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
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
      class="border-3 p-4 my-3 max-w-4xl mx-auto"
    >
      <div class="overflow-x-scroll scroll-div">
        <div class="min-w-[840px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <h2>{{ match.info.gameMode }}</h2>
                <h2 v-if="match.info.gameEndTimestamp">
                  {{ secondsToHrsMinsSecs(match.info.gameDuration) }}
                </h2>
                <h2 v-else>{{ formatTime(match.info.gameDuration) }}</h2>
                <n-tag
                  class="my-2"
                  :type="summoner(match.info.participants).win ? 'success' : 'error'"
                >
                  <span>{{
                    summoner(match.info.participants).win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <h2></h2>
              </div>
              <!-- Summoner Image and Name -->
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
                <div class="flex">
                  <img
                    height="40"
                    width="40"
                    :src="`https://ddragon.canisback.com/img/${idToRunes(
                      summoner(match.info.participants).perks.styles[0].selections[0].perk
                    )}`"
                  />
                  <img
                    height="30"
                    width="30"
                    class="mx-auto object-contain"
                    :src="`https://ddragon.canisback.com/img/${idToRunes(
                      summoner(match.info.participants).perks.styles[1].selections[1].perk
                    )}`"
                  />
                </div>
              </div>
              <!-- Summoner Stats -->
              <div class="flex flex-col justify-center flex-1 items-center">
                <span class="my-2">
                  {{ summoner(match.info.participants).kills }} /
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
                  <span class="py-1"
                    >CS :{{ summoner(match.info.participants).totalMinionsKilled }}</span
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
                  <br />
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
            </div>
            <!-- Red and Blue Teams -->
            <match-history-team
              :participants="match.info.participants"
            ></match-history-team>
          </section>
          <!-- More Info Switch and DataTables -->
          <n-space class="mx-3" vertical>
            <n-switch v-model:value="match.show" :rail-style="switchStyle">
              <template #checked>
                <span>Less Information</span>
              </template>
              <template #unchecked>
                <span>More Information</span>
              </template>
            </n-switch>
            <keep-alive>
              <n-collapse-transition
                class="bg-dark-600"
                v-if="match.show"
                :show="match.show"
              >
                <div class="flex justify-center">
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
</style>

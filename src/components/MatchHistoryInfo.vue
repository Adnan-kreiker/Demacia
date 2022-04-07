<script setup lang="ts">
import { CSSProperties } from "vue";
import { MatchInfo, Participant } from "~/types";
import {
  NSwitch,
  NSpace,
  NCollapseTransition,
  NTable,
  NTag,
  NDivider,
  NScrollbar,
} from "naive-ui";
import {
  getSummonerName,
  formatTime,
  unixToDate,
  toLowerCase,
  mapSpellKeyToName,
  idToRunes,
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
  <section class="flex flex-col">
    <div
      v-for="match in matchHistory"
      :key="match.metadata.matchId"
      :class="
        summoner(match.info.participants).win ? 'border-green-500' : 'border-red-500'
      "
      class="border-3 p-4 my-3"
    >
      <n-scrollbar x-scrollable>
        <div class="min-w-[850px]">
          <section class="flex text-white flex-row w-full">
            <!-- Game Information -->
            <div class="flex flex-row flex-1 text-center">
              <div class="flex flex-col justify-center items-center max-w-[180px] px-2">
                <h2>{{ match.info.gameMode }}</h2>
                <h2>{{ formatTime(match.info.gameDuration) }}</h2>
                <n-tag
                  class="my-2"
                  :type="summoner(match.info.participants).win ? 'success' : 'error'"
                >
                  <span>{{
                    summoner(match.info.participants).win ? "Victory" : "Defeat"
                  }}</span>
                </n-tag>
                <h2></h2>
                <p>{{ unixToDate(match.info.gameStartTimestamp) }}</p>
              </div>
              <!-- Summoner Image and Name -->
              <div class="px-4 flex flex-col relative justify-center">
                <div>
                  <img
                    height="70"
                    width="70"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${toLowerCase(
                      summoner(match.info.participants).championName
                    )}.png`"
                  />
                </div>
                <span class="absolute top-[62%] left-[31%]">
                  {{ summoner(match.info.participants).championName }}
                </span>
                <br />
              </div>
              <!-- Summoner's spells -->
              <div class="flex flex-col justify-center items-center">
                <div class="flex gap-1">
                  <img
                    height="32"
                    width="32"
                    class="w-8 h-8"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${mapSpellKeyToName(
                      summoner(match.info.participants).summoner1Id.toString()
                    )}.png`"
                  />
                  <img
                    height="32"
                    width="32"
                    class="w-8 h-8"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${mapSpellKeyToName(
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
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item0
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item1 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item1
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item2 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item2
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item3 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item3
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item4 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item4
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item5 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
                      summoner(match.info.participants).item5
                    }.png`"
                  />
                  <img
                    v-if="summoner(match.info.participants).item6 !== 0"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${
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
            <!-- Red Team -->
            <div class="flex flex-col self-end p-2 text-gray-300 w-[150px] p-4">
              <div
                v-for="participant in match.info.participants.filter(
                  (participant) => participant.teamId == 100
                )"
                :key="participant.championName"
                class="my-1"
              >
                <div class="flex flex-row flex-1 w-full justify-start items-center">
                  <img
                    class="rounded-3xl mr-2"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${toLowerCase(
                      participant.championName
                    )}.png`"
                  />
                  <router-link
                    class="truncate overflow-ellipsis space-nowrap"
                    :to="`/summoner-info/${participant.summonerName}`"
                  >
                    <div class="group">
                      <p class="truncate overflow-ellipsis space-nowrap">
                        {{ participant.summonerName }}
                        <span
                          class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center text-black bg-white rounded tooltip-text group-hover:block"
                          >{{ participant.summonerName }}</span
                        >
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- Blue Team -->
            <div class="flex flex-col self-end p-2 text-gray-300 w-[150px] p-4">
              <div
                v-for="participant in match.info.participants.filter(
                  (participant) => participant.teamId == 200
                )"
                :key="participant.championName"
                class="my-1"
              >
                <div class="flex w-full flex-1 flex-row justify-start items-center">
                  <img
                    class="rounded-3xl mr-2"
                    height="25"
                    width="25"
                    :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${toLowerCase(
                      participant.championName
                    )}.png`"
                  />
                  <router-link
                    class="truncate overflow-ellipsis space-nowrap"
                    :to="`/summoner-info/${participant.summonerName}`"
                  >
                    <div class="group">
                      <p class="truncate overflow-ellipsis space-nowrap">
                        {{ participant.summonerName }}
                        <span
                          class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center text-black bg-white rounded tooltip-text group-hover:block"
                          >{{ participant.summonerName }}</span
                        >
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </section>
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
                  <n-table class="text-gray-600">
                    <tr>
                      <th>Blue Team</th>
                      <th>Tier</th>
                      <th>KDA</th>
                      <th>Damage</th>
                      <th>Wards</th>
                      <th>CS</th>
                      <th>items</th>
                    </tr>
                    <tr
                      v-for="participant in match.info.participants.filter(
                        (participant) => participant.teamId == 200
                      )"
                      :key="participant.championName"
                    >
                      <th class="flex flex-row items-center">
                        <div class="mr-2">
                          <img
                            height="40"
                            width="40"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${toLowerCase(
                              participant.championName
                            )}.png`"
                          />
                        </div>
                        <span class="mr-2">{{ participant.summonerName }}</span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.summonerLevel }}</span>
                      </th>
                      <th>
                        <span class="mx-4">
                          {{ participant.kills }} / {{ participant.deaths }} /
                          {{ participant.assists }}
                        </span>
                      </th>
                      <th>
                        <span class="mx-4">
                          {{ participant.totalDamageDealtToChampions }}
                        </span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.wardsPlaced }}</span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.totalMinionsKilled }}</span>
                      </th>
                      <th>
                        <div class="flex flex-row gap-1">
                          <img
                            v-if="participant.item0 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item0}.png`"
                          />
                          <img
                            v-if="participant.item1 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item1}.png`"
                          />
                          <img
                            v-if="participant.item2 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item2}.png`"
                          />
                          <img
                            v-if="participant.item3 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item3}.png`"
                          />
                          <img
                            v-if="participant.item4 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item4}.png`"
                          />
                          <img
                            v-if="participant.item5 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item5}.png`"
                          />
                          <img
                            v-if="participant.item6 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item6}.png`"
                          />
                        </div>
                      </th>
                    </tr>
                  </n-table>
                </div>
                <n-divider dashed />
                <div class="flex flex-row justify-center">
                  <n-table class="text-gray-600">
                    <tr>
                      <th>Red Team</th>
                      <th>Tier</th>
                      <th>KDA</th>
                      <th>Damage</th>
                      <th>Wards</th>
                      <th>CS</th>
                      <th>items</th>
                    </tr>
                    <tr
                      v-for="participant in match.info.participants.filter(
                        (participant) => participant.teamId == 100
                      )"
                      :key="participant.championName"
                    >
                      <th class="flex flex-row items-center">
                        <div class="mr-2">
                          <img
                            height="40"
                            width="40"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${toLowerCase(
                              participant.championName
                            )}.png`"
                          />
                        </div>
                        <span class="mr-2">{{ participant.summonerName }}</span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.summonerLevel }}</span>
                      </th>
                      <th>
                        <span class="mx-4">
                          {{ participant.kills }} / {{ participant.deaths }} /
                          {{ participant.assists }}
                        </span>
                      </th>
                      <th>
                        <span class="mx-4">
                          {{ participant.totalDamageDealtToChampions }}
                        </span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.wardsPlaced }}</span>
                      </th>
                      <th>
                        <span class="mx-4">{{ participant.totalMinionsKilled }}</span>
                      </th>
                      <th>
                        <div class="flex flex-row gap-1">
                          <img
                            v-if="participant.item0 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item0}.png`"
                          />
                          <img
                            v-if="participant.item1 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item1}.png`"
                          />
                          <img
                            v-if="participant.item2 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item2}.png`"
                          />
                          <img
                            v-if="participant.item3 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item3}.png`"
                          />
                          <img
                            v-if="participant.item4 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item4}.png`"
                          />
                          <img
                            v-if="participant.item5 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item5}.png`"
                          />
                          <img
                            v-if="participant.item6 !== 0"
                            height="25"
                            width="25"
                            :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${participant.item6}.png`"
                          />
                        </div>
                      </th>
                    </tr>
                  </n-table>
                </div>
              </n-collapse-transition>
              <template v-else></template>
            </keep-alive>
          </n-space>
        </div>
      </n-scrollbar>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>

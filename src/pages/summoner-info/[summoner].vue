<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  NCard,
  NTag,
  NCollapseTransition,
  NSpace,
  NSwitch,
  NStatistic,
  NNumberAnimation,
  NTable,
  NDivider,
} from "naive-ui";
import { Summoner, MatchInfo, Participant, SummonerRankedInfo } from "~/types";
import { CSSProperties } from "vue";
import {
  capitalize,
  idToRunes,
  mapSpellKeyToName,
  replaceUnderscoreWithSpace,
  toLowerCase,
  unixToDate,
  formatTime,
} from "../../../utils";

const route = useRoute();

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

const summonerInfo = ref<null | Summoner>(null);

const matchHistory = ref<null | MatchInfo[]>([]);

const summonerRankedInfo = ref<null | SummonerRankedInfo>(null);

const getSummonerInfo = async () => {
  const { summoner } = route.params;
  try {
    const res = await fetch(`http://localhost:5000/api/get-summoner/${summoner}`);
    const data = (await res.json()) as Summoner;

    summonerInfo.value = data;

    const rankedInfo = await fetch(
      `http://localhost:5000/api/get-ranked-info/${summonerInfo.value.id}`
    );

    const rankedData = (await rankedInfo.json()) as SummonerRankedInfo;
    summonerRankedInfo.value = rankedData;

    const matches = await fetch(
      `http://localhost:5000/api/get-matches/${summonerInfo.value.puuid}?start=0&count=10`
    );

    const matchesId = await matches.json();

    Promise.allSettled(
      matchesId.map(async (matchId: string) => {
        const match = await fetch(`http://localhost:5000/api/get-match/${matchId}`);
        const data = await match.json();
        matchHistory.value?.push({ ...data, show: false });
      })
    );
  } catch (error) {
    console.error(error);
  }
};

getSummonerInfo();

const getSummonerName = (summoner: string) => {
  return summoner.replace(/\s/g, "").toLowerCase();
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
  <div v-if="summonerInfo">
    <div class="flex flex-wrap justify-evenly">
      <div>
        <n-card class="max-w-[200px]" :title="summonerInfo.name">
          <template #cover>
            <img
              :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerInfo.profileIconId}.png`"
            />
          </template>
          <p>Level: {{ summonerInfo.summonerLevel }}</p>
        </n-card>
        <n-tag type="info" class="my-3">
          Last Activity :
          {{ unixToDate(summonerInfo.revisionDate) }}
        </n-tag>
      </div>
      <div
        class="flex items-center justify-evenly text-center"
        v-if="summonerRankedInfo && summonerRankedInfo?.length > 0"
      >
        <div class="flex flex-col items-center text-center">
          <p>
            Queue Type: {{ replaceUnderscoreWithSpace(summonerRankedInfo[0].queueType) }}
          </p>
          <n-statistic label="Tier" tabular-nums>{{
            summonerRankedInfo[0].tier
          }}</n-statistic>
          <n-statistic label="Rank" tabular-nums>{{
            summonerRankedInfo[0].rank
          }}</n-statistic>
          <n-statistic label="League Points" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="summonerRankedInfo[0].leaguePoints"
              :active="true"
              :precision="0"
            />
          </n-statistic>
          <div class="flex gap-3">
            <n-statistic label="Wins" tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="summonerRankedInfo[0].wins"
                :active="true"
                :precision="0"
              />
            </n-statistic>
            <n-statistic label="Losses" tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="summonerRankedInfo[0].losses"
                :active="true"
                :precision="0"
              />
            </n-statistic>
          </div>
          <n-statistic label="Win Rate" tabular-nums>
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="
                (summonerRankedInfo[0].wins /
                  (summonerRankedInfo[0].losses + summonerRankedInfo[0].wins)) *
                100
              "
              :active="true"
              :precision="0"
            />%
          </n-statistic>
        </div>
        <img
          class="max-w-[200px] object-contain"
          :src="`/public/emblems/Emblem_${capitalize(summonerRankedInfo[0].tier)}.png`"
          alt=""
        />
      </div>
    </div>

    <section v-if="matchHistory && matchHistory?.length > 0">
      <div
        v-for="match in matchHistory"
        :key="match.metadata.matchId"
        :class="summoner(match.info.participants).win ? 'bg-green-200' : 'bg-red-200'"
        class="border-2 my-3"
      >
        <section class="flex flex-row text-gray-800 w-full">
          <!-- Game Information -->
          <div class="flex flex-row flex-1 text-center">
            <div class="flex flex-col justify-center max-w-[180px] px-2">
              <h2>{{ match.info.gameMode }}</h2>
              <h2>{{ formatTime(match.info.gameDuration) }}</h2>

              <h2>{{ summoner(match.info.participants).win ? "Victory" : "Defeat" }}</h2>
              <p>{{ unixToDate(match.info.gameStartTimestamp) }}</p>
            </div>
            <!-- Summoner Image and Name -->
            <div class="px-4 flex flex-col relative justify-center">
              <div>
                <img
                  height="70"
                  width="70"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(
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
                  class="w-8 h-8"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${mapSpellKeyToName(
                    summoner(match.info.participants).summoner1Id.toString()
                  )}.png`"
                />
                <img
                  class="w-8 h-8"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${mapSpellKeyToName(
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
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item0
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item1 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item1
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item2 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item2
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item3 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item3
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item4 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item4
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item5 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
                    summoner(match.info.participants).item5
                  }.png`"
                />
                <img
                  v-if="summoner(match.info.participants).item6 !== 0"
                  height="25"
                  width="25"
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${
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
                  >Wards placed: {{ summoner(match.info.participants).wardsPlaced }}</span
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
          <div class="flex flex-col self-end p-2 text-gray-600 w-[150px] p-4">
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
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(
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
                        class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center bg-white rounded tooltip-text group-hover:block"
                        >{{ participant.summonerName }}</span
                      >
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- Blue Team -->
          <div class="flex flex-col self-end p-2 text-gray-600 w-[150px] p-4">
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
                  :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(
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
                        class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center bg-white rounded tooltip-text group-hover:block"
                        >{{ participant.summonerName }}</span
                      >
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </section>
        <n-space vertical>
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
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(
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
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item0}.png`"
                        />
                        <img
                          v-if="participant.item1 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item1}.png`"
                        />
                        <img
                          v-if="participant.item2 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item2}.png`"
                        />
                        <img
                          v-if="participant.item3 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item3}.png`"
                        />
                        <img
                          v-if="participant.item4 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item4}.png`"
                        />
                        <img
                          v-if="participant.item5 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item5}.png`"
                        />
                        <img
                          v-if="participant.item6 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item6}.png`"
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
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(
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
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item0}.png`"
                        />
                        <img
                          v-if="participant.item1 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item1}.png`"
                        />
                        <img
                          v-if="participant.item2 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item2}.png`"
                        />
                        <img
                          v-if="participant.item3 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item3}.png`"
                        />
                        <img
                          v-if="participant.item4 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item4}.png`"
                        />
                        <img
                          v-if="participant.item5 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item5}.png`"
                        />
                        <img
                          v-if="participant.item6 !== 0"
                          height="25"
                          width="25"
                          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item6}.png`"
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
    </section>
  </div>
</template>

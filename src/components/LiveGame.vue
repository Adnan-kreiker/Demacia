<script setup lang="ts">
import {
  LiveGame,
  ParticipantLiveGame,
  Summoner,
  SummonerHasRankedInfo,
  SummonerRankedInfo,
  RankedData,
  SummonerRankedInfoInterface,
} from "~/types";
import { getChampionInfoById, unicodeToUtf8 } from "../../utils";
import ErrorComponent from "~/components/ErrorComponent.vue";
import useChampions from "~/hooks/useChampions";
import { queueNameMapper, capitalize } from "../../utils";

const { championsArray } = useChampions();

const summonersNames = ref<string[]>([]);

const summonersData = ref<null | Summoner[]>();

const summonersIds = ref<string[]>([]);

const summonersRankedData = ref<SummonerRankedInfoInterface | null>(null);

const props = defineProps<{
  summonerId: string;
}>();

const gameData = ref<null | LiveGame>(null);

const error = ref(false);

const initialSummonersData: Summoner[] = [];

const getActiveGame = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/get-live-game/${props.summonerId}`
    );

    const data = await response.json();

    if (data.status && data.status.status_code == 404) {
      error.value = true;
      return;
    }
    gameData.value = data;
    summonersNames.value = data.participants.map(
      (participant: ParticipantLiveGame) => participant.summonerName
    );

    await getSummonersInfoByName();

    if (summonersData.value) {
      summonersIds.value = summonersData.value?.map((summoner: Summoner) => summoner.id);
    }
    summonersData.value = initialSummonersData;
    await getSummonersRankedInfoById();
  } catch (err) {
    console.error(err);
    error.value = true;
  }
};

const getSummonersInfoByName = async () => {
  await Promise.allSettled(
    summonersNames.value.map(async (summoner) => {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summoner)}`
      );
      // return (await res.json()) as Summoner;
      const summonerData = (await res.json()) as Summoner;
      initialSummonersData.push(summonerData);
    })
  );
  summonersData.value = initialSummonersData;
  // return res;
};

const getSummonersRankedInfoById = async () => {
  const initialRankedData: SummonerRankedInfoInterface = [];
  await Promise.allSettled(
    summonersIds.value.map(async (summonerId) => {
      const rankedInfo = await fetch(
        `${import.meta.env.VITE_URL}/api/get-ranked-info/${summonerId}`
      );
      const data = (await rankedInfo.json()) as SummonerRankedInfo;
      initialRankedData.push({
        summonerId,
        rankedInfo: data,
      });
    })
  );
  summonersRankedData.value = initialRankedData;
};

const team = (teamId: 100 | 200): ParticipantLiveGame[] => {
  if (gameData.value) {
    return gameData.value.participants.filter(
      (participant) => participant.teamId === teamId
    );
  } else return [];
};

const isRankedInfo = (value: SummonerRankedInfo): value is SummonerHasRankedInfo => {
  // return (value as SummonerHasRankedInfo).length > 0;
  return value && Array.isArray(value) && value.every((val) => val.queueType);
};

const summonersRankedInfo = (
  summonerId: string
):
  | { soloQInfo: RankedData | undefined; flexInfo: RankedData | undefined }
  | undefined => {
  if (Array.isArray(summonersRankedData.value) && summonersRankedData.value.length > 0) {
    const rankedData = summonersRankedData.value.find(
      (summoner) => summoner.summonerId === summonerId
    );
    if (rankedData != null && isRankedInfo(rankedData.rankedInfo)) {
      const filtered = rankedData.rankedInfo.map((info) => {
        if (info.queueType !== "RANKED_TFT_PAIRS") {
          //TODO: WHY DIDN'T FILTER YIELD THE CORRECT RESULT?
          return info;
        }
      });
      return {
        soloQInfo:
          filtered.filter((info) => info?.queueType === "RANKED_SOLO_5x5")[0] ||
          undefined,
        flexInfo:
          filtered.filter((info) => info?.queueType === "RANKED_FLEX_SR")[0] || undefined,
      };
    }
  }
};

getActiveGame();
</script>

<template>
  <div v-if="!error && gameData">
    <p>{{ gameData?.gameMode }}</p>
    <section class="flex mt-6 flex-row overflow-x-scroll gap-5">
      <div
        class="w-[300px] bg-dark-50 bg-opacity-40 p-2"
        v-for="participant in team(100)"
        :key="participant.summonerId"
      >
        <p class="text-lg text-center pb-2 border-b border-green-400">
          {{ participant.summonerName }}
        </p>
        <img
          class="mx-auto mt-2 mb-2"
          height="100"
          width="100"
          :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${
            getChampionInfoById(championsArray, participant.championId)?.image.full
          }
          `"
        />
        <section v-if="summonersRankedInfo(participant.summonerId)">
          <div v-if="summonersRankedInfo(participant.summonerId)?.soloQInfo">
            <section class="">
              <div class="flex gap-2 items-center flex-row">
                <img
                  width="60"
                  height="50"
                  class="max-w-[200px] object-cover"
                  :src="`/emblems/Emblem_${capitalize(
                    summonersRankedInfo(participant.summonerId)?.soloQInfo?.tier
                  )}.png`"
                  alt=""
                />
                <section class="mt-3">
                  <p>
                    {{ summonersRankedInfo(participant.summonerId)?.soloQInfo?.tier }}
                    {{ summonersRankedInfo(participant.summonerId)?.soloQInfo?.rank }}
                    <span class="text-sm text-gray-400">
                      {{
                        summonersRankedInfo(participant.summonerId)?.soloQInfo
                          ?.leaguePoints
                      }}
                      LP
                    </span>
                  </p>
                  <p class="text-sm text-gray-400">
                    ({{
                      queueNameMapper(
                        summonersRankedInfo(participant.summonerId)?.soloQInfo?.queueType
                      )
                    }})
                  </p>
                </section>
              </div>

              <div class="text-center text-xs py-3 text-gray-300">
                <p>
                  Win Rate
                  {{
                    Math.round(
                      (summonersRankedInfo(participant.summonerId)?.soloQInfo?.wins /
                        (summonersRankedInfo(participant.summonerId)?.soloQInfo?.wins +
                          summonersRankedInfo(participant.summonerId)?.soloQInfo
                            ?.losses)) *
                        100
                    )
                  }}%
                  <span>
                    ({{
                      summonersRankedInfo(participant.summonerId)?.soloQInfo?.losses +
                      summonersRankedInfo(participant.summonerId)?.soloQInfo?.wins
                    }}
                    Played)
                  </span>
                </p>
              </div>
            </section>
          </div>
        </section>
        <!-- <p>{{ participant }}</p> -->
      </div>
    </section>
  </div>
  <div v-if="error" class="flex flex-row justify-center">
    <ErrorComponent
      title="No Game Found!"
      status="404"
      description="Summoner is not in an active game!"
      :show-return-home-button="false"
    />
  </div>
</template>

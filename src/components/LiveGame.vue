<script setup lang="ts">
import {
  LiveGame,
  ParticipantLiveGame,
  RankedData,
  Summoner,
  SummonerHasRankedInfo,
  SummonerRankedInfo,
  SummonerRankedInfoInterface,
} from "~/types";
import { getChampionInfoById, unicodeToUtf8 } from "../../utils";
import ErrorComponent from "~/components/ErrorComponent.vue";
import useChampions from "~/hooks/useChampions";

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

const isRankedInfo = (value: any): value is SummonerHasRankedInfo => {
  return (
    value &&
    value.hasOwnProperty("leaguePoints") &&
    value.hasOwnProperty("wins") &&
    value.hasOwnProperty("losses")
  );
};

const summonersRankedInfo = (summonerId: string): RankedData[] | undefined => {
  if (Array.isArray(summonersRankedData.value) && summonersRankedData.value.length > 0) {
    const rankedInfo = summonersRankedData.value.find(
      (summoner) => summoner.summonerId === summonerId
    );
    if (rankedInfo && isRankedInfo(rankedInfo.rankedInfo)) {
      const filtered = rankedInfo.rankedInfo.filter((info) => {
        return info.queueType !== "RANKED_TFT_PAIRS";
      });
      return filtered;
    }
  }
  // return [];
};

getActiveGame();
</script>

<template>
  <div v-if="!error && gameData">
    <p>{{ gameData?.gameMode }}</p>
    <section class="flex mt-6 flex-row overflow-x-scroll gap-5">
      <div
        class="w-[300px] bg-dark-50 bg-opacity-40"
        v-for="participant in team(100)"
        :key="participant.summonerId"
      >
        <p class="text-lg text-center">{{ participant.summonerName }}</p>
        <img
          class="mx-auto"
          height="100"
          width="100"
          :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${
            getChampionInfoById(championsArray, participant.championId)?.image.full
          }
          `"
        />
        <section v-if="summonersRankedInfo(participant.summonerId)">
          <p v-for="rankedInfo in summonersRankedInfo(participant.summonerId)">
            {{ rankedInfo }}
          </p>
        </section>
        <p>{{ participant }}</p>
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

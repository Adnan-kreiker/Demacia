<script setup lang="ts">
import {
  LiveGame,
  ParticipantLiveGame,
  Summoner,
  SummonerRankedInfo,
  SummonerRankedInfoInterface,
} from "~/types";
import { unicodeToUtf8 } from "../../utils";
import ErrorComponent from "~/components/ErrorComponent.vue";
import LiveGameTeamInfo from "./LiveGameTeamInfo.vue";
import { NH1, NText } from "naive-ui";

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
      const summonerData = (await res.json()) as Summoner;
      initialSummonersData.push(summonerData);
    })
  );
  summonersData.value = initialSummonersData;
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

getActiveGame();
</script>

<template>
  <div v-if="!error && gameData">
    <n-h1 prefix="bar">
      <n-text type="primary">
        {{
          gameData?.gameMode.substring(0, 1) +
          gameData?.gameMode.substring(1).toLowerCase()
        }}
        Game
      </n-text>
    </n-h1>
    <LiveGameTeamInfo
      :game-data="gameData"
      :summoners-ranked-data="summonersRankedData"
      :team="100"
    ></LiveGameTeamInfo>
    <LiveGameTeamInfo
      :game-data="gameData"
      :summoners-ranked-data="summonersRankedData"
      :team="200"
    ></LiveGameTeamInfo>
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

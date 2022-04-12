<script setup lang="ts">
import {
  ParticipantLiveGame,
  LiveGame,
  SummonerRankedInfoInterface,
  RankedData,
  SummonerRankedInfo,
  SummonerHasRankedInfo,
} from "~/types";
import { getChampionInfoById, capitalize, queueNameMapper } from "../../utils";
import useChampions from "~/hooks/useChampions";

const { championsArray } = useChampions();

const props = defineProps<{
  gameData: null | LiveGame;
  summonersRankedData: null | SummonerRankedInfoInterface;
  team: 100 | 200;
}>();

const team = (teamId: 100 | 200): ParticipantLiveGame[] => {
  if (props.gameData) {
    return props.gameData.participants.filter(
      (participant) => participant.teamId === teamId
    );
  } else return [];
};
const isRankedInfo = (value: SummonerRankedInfo): value is SummonerHasRankedInfo => {
  return value && Array.isArray(value) && value.every((val) => val.queueType);
};

const summonersRankedInfo = (
  summonerId: string
):
  | { soloQInfo: RankedData | undefined; flexInfo: RankedData | undefined }
  | undefined => {
  if (Array.isArray(props.summonersRankedData) && props.summonersRankedData.length > 0) {
    const rankedData = props.summonersRankedData.find(
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
</script>
<template>
  <section class="flex mt-6 flex-row overflow-x-scroll gap-5">
    <div
      class="w-[300px] bg-dark-50 bg-opacity-40 p-2"
      v-for="participant in team(props.team)"
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
                      summonersRankedInfo(participant.summonerId)?.soloQInfo?.leaguePoints
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
                        summonersRankedInfo(participant.summonerId)?.soloQInfo?.losses)) *
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
    </div>
  </section>
</template>

<style scoped></style>

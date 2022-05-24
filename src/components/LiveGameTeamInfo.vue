<script setup lang="ts">
import NTag from 'naive-ui/es/tag/src/Tag'
import { NDivider } from 'naive-ui'
import {
  capitalize,
  getChampionInfoById,
  idToRunes,
  mapSpellKeyToName,
  queueNameMapper,
} from '../../utils'
import type {
  Champion,
  LiveGame,
  ParticipantLiveGame,
  RankedData,
  SummonerHasRankedInfo,
  SummonerRankedInfo,
  SummonerRankedInfoInterface,
} from '~/types'

const props = defineProps<{
  gameData: null | LiveGame
  summonersRankedData: [] | SummonerRankedInfoInterface
  team: 100 | 200
  championsArray: Champion[]
  region: string
}>()

const team = (teamId: 100 | 200): ParticipantLiveGame[] => {
  if (props.gameData) {
    return props.gameData.participants.filter(
      participant => participant.teamId === teamId,
    )
  }
  else { return [] }
}
const isRankedInfo = (value: SummonerRankedInfo): value is SummonerHasRankedInfo => {
  return value && Array.isArray(value) && value.every(val => val.queueType)
}

// TODO: fix this
const summonersRankedInfo = (
  summonerId: string,
):
| { soloQInfo: RankedData | null; flexInfo: RankedData | null }
| null => {
  if (Array.isArray(props.summonersRankedData) && props.summonersRankedData.length > 0) {
    const rankedData = props.summonersRankedData.find(
      summoner => summoner.summonerId === summonerId,
    )
    if (isRankedInfo(rankedData!.rankedInfo)) {
      const soloQInfo = rankedData?.rankedInfo.filter(info => info?.queueType === 'RANKED_SOLO_5x5')[0] as RankedData
      const flexInfo = rankedData?.rankedInfo.filter(info => info?.queueType === 'RANKED_FLEX_SR')[0] as RankedData

      return {
        soloQInfo,
        flexInfo,
      }
    }
    else { return null }
  }
  else { return null }
}

const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <section
    v-if="props.gameData && props.gameData.participants.length"
    class="flex mt-6 flex-row overflow-x-scroll whitespace-nowrap gap-5"
  >
    <div
      v-for="participant in team(props.team)"
      :key="participant.summonerId"
      class="w-[250px] min-w-[250px] min-h-[350px] bg-dark-50 bg-opacity-40 p-2"
    >
      <router-link
        :to="{
          path: `/summoner-info/${participant.summonerName}`,
          query: { region: props.region },
        }"
      >
        <p
          class="text-lg text-center pb-2 border-b-2"
          :class="props.team === 100 ? 'border-blue-400' : 'border-red-500'"
        >
          {{ participant.summonerName }}
        </p>
      </router-link>
      <img
        class="mx-auto mt-2 mb-2"
        height="80"
        width="80"
        :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${getChampionInfoById(props.championsArray, participant.championId)?.image.full
        }
      `"
      >
      <div class="flex flex-row justify-center">
        <img
          height="38"
          width="42"
          class="object-cover -mt-1"
          :src="`https://ddragon.canisback.com/img/${idToRunes(
            participant.perks.perkIds[0],
          )}`"
        >
        <img
          height="32"
          width="32"
          class="w-8 h-8 mr-2 ml-1"
          :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
            participant.spell1Id.toString(),
          )}.png`"
        >
        <img
          height="32"
          width="32"
          class="w-8 h-8"
          :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${mapSpellKeyToName(
            participant.spell2Id.toString(),
          )}.png`"
        >
      </div>
      <n-divider />
      <section v-if="summonersRankedInfo(participant.summonerId) && summonersRankedInfo(participant.summonerId)?.soloQInfo">
        <div>
          <section>
            <div
              class="flex gap-2 items-center flex-row"
            >
              <img
                width="60"
                height="50"
                class="max-w-[200px] object-cover"
                :src="`/emblems/Emblem_${capitalize(
                  summonersRankedInfo(participant.summonerId)!.soloQInfo!.tier,
                )}.webp`"
                alt=""
              >
              <section class="mt-3">
                <p>
                  {{ summonersRankedInfo(participant.summonerId)?.soloQInfo?.tier }}
                  {{ summonersRankedInfo(participant.summonerId)?.soloQInfo?.rank }}
                  <span class="text-sm text-gray-400">
                    {{
                      summonersRankedInfo(participant.summonerId)!.soloQInfo!.leaguePoints
                    }}
                    LP
                  </span>
                </p>
                <p class="text-sm text-gray-400">
                  ({{
                    queueNameMapper(
                      summonersRankedInfo(participant.summonerId)!.soloQInfo!.queueType,
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
                    (summonersRankedInfo(participant.summonerId)!.soloQInfo!.wins
                      / (summonersRankedInfo(participant.summonerId)!.soloQInfo!.wins
                        + summonersRankedInfo(participant.summonerId)!.soloQInfo!.losses))
                      * 100,
                  )
                }}%
                <span>
                  ({{
                    summonersRankedInfo(participant.summonerId)!.soloQInfo!.losses
                      + summonersRankedInfo(participant.summonerId)!.soloQInfo!.wins
                  }}
                  Played)
                </span>
              </p>
            </div>
          </section>
        </div>
        <section class="flex flex-row flex-wrap gap-3 justify-center">
          <n-tag
            v-if="summonersRankedInfo(participant.summonerId)?.soloQInfo?.hotStreak"
            type="error"
          >
            Hot Streak
          </n-tag>
          <n-tag
            v-if="summonersRankedInfo(participant.summonerId)?.soloQInfo?.veteran"
            type="warning"
          >
            Veteran
          </n-tag>
          <n-tag
            v-if="summonersRankedInfo(participant.summonerId)?.soloQInfo?.freshBlood"
            type="default"
          >
            Waking Up
          </n-tag>
        </section>
      </section>
      <section v-else>
        <h2 class="text-center">
          Unranked
        </h2>
        <img height="90" width="90" class="h-[90px] w-[90px] mx-auto" src="/unranked.png" alt="">
      </section>
    </div>
  </section>
</template>

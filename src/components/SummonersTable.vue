<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";
import NDataTable from "naive-ui/es/data-table/src/DataTable";
import NProgress from "naive-ui/es/progress/src/Progress";

import {
  ChallengerPlayerWithIndex,
  ChallengerPlayerWithAdditionalData,
  Summoner,
  Ranks,
} from "~/types";
import SummonersTableSkeleton from "~/components/SummonersTableSkeleton.vue";
import { unicodeToUtf8 } from "../../utils";
import { RouterLink } from "vue-router";

const props = defineProps<{
  challengerPlayers: ChallengerPlayerWithIndex[];
  page: number;
  rank: Ranks;
  region: string;
}>();

const summonersRank = computed(() => {
  switch (props.rank) {
    case "challengerleagues":
      return "Challenger";
    case "grandmasterleagues":
      return "Grandmaster";
    case "masterleagues":
      return "Master";
  }
});

const challengerPlayersWithData = ref<ChallengerPlayerWithAdditionalData[]>([]);

const sortedChallengerPlayers = computed<ChallengerPlayerWithAdditionalData[]>(() => {
  if (challengerPlayersWithData.value) {
    return challengerPlayersWithData.value.sort(
      (a, b) => b.leaguePoints - a.leaguePoints
    );
  }
  return [];
});

const getSummonersInfo = async () => {
  if (props.challengerPlayers) {
    const result: ChallengerPlayerWithAdditionalData[] = [];
    await Promise.allSettled(
      props.challengerPlayers.map(async (player) => {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(
            player.summonerName
          )}?region=${props.region}`
        );
        const data = (await res.json()) as Summoner;
        result.push({
          ...player,
          ...data,
        });
      })
    );
    challengerPlayersWithData.value = result;
  }
};

getSummonersInfo();

const data = ref<
  | {
    rank: number;
    summoner: string;
    tier: string;
    lp: number;
    level: number;
    winRatio: number;
    icon: number;
  }[]
  | null
>(null);

const loading = computed(() => {
  if (!data.value) {
    return false;
  }
  return data.value.length === 0;
});

watch(
  sortedChallengerPlayers,
  () => {
    if (sortedChallengerPlayers.value) {
      data.value = sortedChallengerPlayers.value.map((player) => {
        return {
          rank: player.idx,
          summoner: player.summonerName,
          tier: summonersRank.value,
          lp: player.leaguePoints,
          level: player.summonerLevel,
          winRatio: Math.floor((player.wins / (player.wins + player.losses)) * 100),
          icon: player.profileIconId,
        };
      });
    }
  },
  {
    immediate: true,
  }
);

const columns: DataTableColumns = [
  {
    title: "Rank",
    key: "rank",
    align: "center",
  },
  {
    title: "Summoner",
    key: "summoner",
    // align: "center",
    width: "200px",
    render (row) {
      const iconId = row.icon as number;
      return h(
        RouterLink,
        {
          to: `/summoner-info/${row.summoner}?region=${props.region}`,
          props: {
            custom: true,
            vSlot: "navigate",
          },
          style: {
            display: "flex",
            alignItems: "center",
          },
          key: row.summoner,
        },
        {
          default: () => {
            return [
              h("img", {
                src: `https://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${iconId}.png`,
                height: "40",
                width: "40",
                style: {
                  borderRadius: "50%",
                },
              }),
              h(
                "span",
                {
                  style: {
                    marginLeft: "15px",
                  },
                },
                row.summoner
              ),
            ];
          },
        }
      );
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "Tier",
    key: "tier",
    align: "center",
  },
  {
    title: "LP",
    key: "lp",
    align: "center",
  },
  {
    title: "Level",
    key: "level",
    align: "center",
  },
  {
    title: "Win Ratio",
    key: "winRatio",
    align: "center",
    render (row) {
      const winRate = row.winRatio as number;
      return h(NProgress, {
        style: {
          height: "24px",
          borderRadius: "4",
        },
        type: "line",
        railColor: "#ee5a52",
        percentage: winRate,
      });
    },
  },
];
</script>

<template>
  <div class="overflow-x-scroll lg:overflow-x-hidden whitespace-nowrap">
    <n-data-table v-if="data" :loading="loading" :columns="columns" class="min-w-[800px] " :data="data"
      min-height="350">
    </n-data-table>
    <summoners-table-skeleton v-else></summoners-table-skeleton>
  </div>
</template>

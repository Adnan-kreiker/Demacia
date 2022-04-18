<script setup lang="ts">
import { useRoute } from "vue-router";
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
import NSelect from "naive-ui/es/select/src/Select";
import NSpace from "naive-ui/es/space/src/Space";
import NTabs from "naive-ui/es/tabs/src/Tabs";
import NTabPane from "naive-ui/es/tabs/src/TabPane";
import NDivider from "naive-ui/es/divider/src/Divider";
import { Summoner, MatchInfo, SummonerRankedInfo, QueueTypes } from "~/types";
import { unicodeToUtf8, regionParamToContinentMapper } from "../../../utils";
import SummonersRankedInfo from "../../components/SummonersRankedInfo.vue";
import MatchHistoryInfo from "../../components/MatchHistoryInfo.vue";
import ErrorComponent from "~/components/ErrorComponent.vue";
import SearchForSummoner from "~/components/SearchForSummoner.vue";
import ChampionMastery from "~/components/ChampionMastery.vue";
import LiveGame from "~/components/LiveGame.vue";
import type { Ref } from "vue";
import { regionStore } from "~/stores/region";

const store = regionStore()

const route = useRoute();

const summonerInfo = ref<null | Summoner>(null);

const matchHistory = ref<MatchInfo[]>([]);

const summonerRankedInfo = ref<null | SummonerRankedInfo>(null);

const summoner = route.params.summoner as string;

const region = ref(route.query.region) as Ref<string>

watch(region, (newRegion) => {
  if (newRegion) {
    store.setRegion(newRegion);
  }
}, {
  immediate: true,
})

const queueOptions = [
  {
    label: "RANKED FLEX SR",
    value: "RANKED_FLEX_SR",
  },
  {
    label: "RANKED SOLO 5x5",
    value: "RANKED_SOLO_5x5",
  },
  {
    label: "RANKED TFT PAIRS",
    value: "RANKED_TFT_PAIRS",
  },
];

const queueType = ref<QueueTypes>("RANKED_SOLO_5x5");

const error = ref(false);

const getSummonerInfo = async () => {
  try {
    // Fetch Summoner's Info
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summoner)}?region=${region.value}`
    );
    const data = (await res.json()) as Summoner;

    summonerInfo.value = data;

    if (summonerInfo.value.status && summonerInfo.value.status.status_code == 404) {
      error.value = true;
    }

    // Get Match History Info
    getMatchHistory();
    // Get Champions Mastery

    // Fetch Summoner's Ranked Info
    const rankedInfo = await fetch(
      `${import.meta.env.VITE_URL}/api/get-ranked-info/${summonerInfo.value.id}?region=${region.value}`
    );

    const rankedData = (await rankedInfo.json()) as SummonerRankedInfo;
    summonerRankedInfo.value = rankedData;
  } catch (err) {
    console.error(err);
    error.value = true;
  }
};

const getMatchHistory = async () => {
  if (summonerInfo.value) {
    try {
      const matches = await fetch(
        `${import.meta.env.VITE_URL}/api/get-matches/${summonerInfo.value.puuid
        }?start=0&count=10&region=${regionParamToContinentMapper(region.value)}`
      );

      const matchesId = await matches.json();

      // Fetch Summoner's Matches
      await Promise.allSettled(
        matchesId.map(async (matchId: string) => {
          const match = await fetch(
            `${import.meta.env.VITE_URL}/api/get-match/${matchId}?region=${regionParamToContinentMapper(region.value)}`
          );
          const data = await match.json();
          matchHistory.value.push({ ...data, show: false });
        })
      );
    } catch (err) {
      error.value = true;
      console.log(err);
    }
  }
};

getSummonerInfo();
</script>

<template>
  <div>
    <div v-if="!error">
      <!-- Summoner's Information -->
      <div v-if="summonerInfo && summonerRankedInfo">
        <n-tabs animated size="large" type="card">
          <n-tab-pane name="summonerInfo" tab="Summoner Info">

            <div class="flex flex-wrap my-8 gap-5 justify-center sm:justify-evenly min-h-[300px]">
              <n-divider class="h-[450px] divider-class" vertical></n-divider>
              <div>
                <summoners-info :summoner-info="summonerInfo"></summoners-info>
              </div>
              <n-divider class="h-[450px] divider-class" vertical></n-divider>
              <div v-if="summonerRankedInfo">
                <n-space v-if="
                  Array.isArray(summonerRankedInfo) && summonerRankedInfo.length > 0
                " :item-style="{ marginBottom: 20 + 'px', minWidth: 100 + '%' }">
                  <n-select v-model:value="queueType" :options="queueOptions"></n-select>
                </n-space>
                <summoners-ranked-info :summonerRankedInfo="summonerRankedInfo" :queue-type="queueType">
                </summoners-ranked-info>
              </div>
            </div>
            <!-- Match History  -->
            <section v-if="matchHistory && matchHistory?.length > 0">
              <match-history-info :match-history="matchHistory"></match-history-info>
            </section>
            <section class="flex flex-col gap-3 justify-center items-center" v-else>
              <n-skeleton v-for="i in 10" :key="i" height="256px" width="70%" />
            </section>
          </n-tab-pane>
          <n-tab-pane name="summonerChampInfo" tab="Champions Mastery">
            <champion-mastery :summoner-info="summonerInfo"></champion-mastery>
          </n-tab-pane>
          <n-tab-pane name="liveGame" tab="Live Game">
            <live-game :summoner-id="summonerInfo.id"></live-game>
          </n-tab-pane>
        </n-tabs>
      </div>

      <div v-else>
        <section class="flex flex-row justify-start gap-2 mb-8">
          <n-skeleton height="42px" width="143px" :sharp="false" />
          <n-skeleton height="42px" width="174px" :sharp="false" />
          <n-skeleton height="42px" width="107px" :sharp="false" />
        </section>
        <section class="w-full flex-grow mb-8 flex-wrap md:flex-nowrap flex gap-3 justify-center flex-col sm:flex-row">
          <n-space vertical class="sm:w-1/3 mx-auto">
            <n-skeleton class="mx-auto" height="240px" width="240px" :sharp="false" />
            <n-skeleton class="mx-auto" height="40px" width="50%" :sharp="false" />
            <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
            <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
          </n-space>
          <div class="sm:w-2/3">
            <n-skeleton class="mx-auto" height="451px" width="80%" />
          </div>
        </section>
        <section class="flex flex-col gap-3 justify-center items-center">
          <n-skeleton v-for="i in 10" :key="i" height="185px" width="80%" />
        </section>
      </div>
    </div>
    <div v-if="error" class="flex flex-col justify-start items-center">
      <error-component :status="'404'" :imageUrl="'/garenNotFound.png'"
        :description="'Make sure you have to correct name'" :title="'Summoner Not Found! &#128373'"></error-component>
      <search-for-summoner></search-for-summoner>
    </div>
  </div>
</template>

<style scoped>
.n-divider.n-divider--vertical {
  height: 450px;
  margin-inline: 5px;

  @media (max-width: 626px) {
    display: none;
  }
}
</style>

<script setup lang="ts">
// import NCard from "naive-ui/es/card/src/Card";
import NTag from "naive-ui/es/tag/src/Tag";
import { Summoner } from "~/types";
import { unixToDate } from "../../utils";

const props = defineProps<{
  summonerInfo: Summoner | null;
}>();

const summonerInfo = ref<Summoner | null>(props.summonerInfo);
</script>
<template>
  <div v-if="summonerInfo" class="flex flex-col justify-center">
    <img
      height="220"
      width="220"
      class="object-contain rounded-md hover:scale-110 transform transition-all duration-500"
      :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${summonerInfo.profileIconId}.png`"
    />

    <p class="text-4xl font-bold text-true-gray-200 mt-3 mr-4">
      {{ summonerInfo.name }}
    </p>
    <n-tag class="mt-4" type="primary">
      <p>Level: {{ summonerInfo.summonerLevel }}</p>
    </n-tag>
    <n-tag type="info" class="my-3">
      Last Activity :
      {{ unixToDate(summonerInfo.revisionDate) }}
    </n-tag>
  </div>
</template>

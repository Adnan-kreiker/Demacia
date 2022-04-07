<script setup lang="ts">
import NCard from "naive-ui/es/card/src/Card";
import NTag from "naive-ui/es/tag/src/Tag";
import { Summoner } from "~/types";
import { unixToDate } from "../../utils";

const props = defineProps<{
  summonerInfo: Summoner | null;
}>();

const summonerInfo = ref<Summoner | null>(props.summonerInfo);
</script>
<template>
  <div v-if="summonerInfo">
    <n-card class="max-w-[220px]" :title="summonerInfo.name">
      <template #cover>
        <img
          height="220"
          width="220"
          :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${summonerInfo.profileIconId}.png`"
        />
      </template>
      <p>Level: {{ summonerInfo.summonerLevel }}</p>
    </n-card>
    <n-tag type="info" class="my-3">
      Last Activity :
      {{ unixToDate(summonerInfo.revisionDate) }}
    </n-tag>
  </div>
</template>

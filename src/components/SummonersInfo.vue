<script setup lang="ts">
import { NCard, NTag } from "naive-ui";
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
          :src="`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${summonerInfo.profileIconId}.png`"
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

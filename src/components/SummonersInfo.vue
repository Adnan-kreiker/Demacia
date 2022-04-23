<script setup lang="ts">
import { Summoner } from "~/types";
import NDivider from "naive-ui/es/divider/src/Divider";
import { unixToDate } from "../../utils";

const props = defineProps<{
  summonerInfo: Summoner | null;
}>();

const summonerInfo = ref<Summoner | null>(props.summonerInfo);

</script>
<template>
  <div v-if="summonerInfo" class="flex flex-row gap-4 ">
    <n-divider class="h-[400px] divider-class" vertical></n-divider>

    <div class="flex-grow">
      <img height="220" fetchpriority="high" width="240"
        class="object-contain mx-auto rounded-md hover:scale-110 transform transition-all duration-500"
        :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${summonerInfo.profileIconId}.png`" />
      <p class="text-4xl font-bold text-center text-true-gray-200 mt-3">
        {{ summonerInfo.name }}
      </p>
      <div class="w-[240px] text-center mx-auto flex-col flex justify-center">
        <span class="mt-4 border-2 w-max self-center p-1 text-green-300 border-green-700 rounded-sm">Level: {{
            summonerInfo.summonerLevel
        }}</span>
        <p type="info" class="mt-4 border-2 w-max self-center p-1 text-cyan-300 border-cyan-700 rounded-sm">
          Last Activity :
          {{ unixToDate(summonerInfo.revisionDate) }}
        </p>
      </div>
    </div>
    <n-divider class="h-[400px] divider-class" vertical></n-divider>

  </div>
</template>

<style scoped>
.n-divider.n-divider--vertical {
  height: 390px;
  margin-inline: 5px;

  @media (max-width: 626px) {
    display: none;
  }
}
</style>
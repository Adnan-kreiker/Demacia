<script setup lang="ts">
import { NDivider, NSkeleton, NSpace } from 'naive-ui'
import { unixToDate } from '../../utils'
import type { Summoner } from '~/types'

const props = defineProps<{
  summonerInfo: Summoner | null
}>()

const summonerInfo = ref<Summoner | null>(props.summonerInfo)

const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <div v-if="summonerInfo" class="flex flex-row gap-4">
    <n-divider class="h-[400px] divider-class" vertical />
    <div class="flex-grow">
      <img
        height="220"
        fetchpriority="high"
        width="240"
        class="object-contain mx-auto rounded-md hover:scale-110 transform transition-all duration-500"
        :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/profileicon/${summonerInfo.profileIconId}.png`"
      >
      <p data-testid="summoner-name" class="text-4xl font-bold text-center text-true-gray-200 mt-3">
        {{ summonerInfo.name }}
      </p>
      <div class="w-[240px] text-center mx-auto flex-col flex justify-center">
        <span data-testid="summoner-level" class="mt-4 border-2 w-max self-center p-1 text-green-300 border-green-700 rounded-sm">Level: {{
          summonerInfo.summonerLevel
        }}</span>
        <p type="info" class="mt-4 border-2 w-max self-center p-1 text-cyan-300 border-cyan-700 rounded-sm">
          Last Activity :
          {{ unixToDate(summonerInfo.revisionDate) }}
        </p>
      </div>
    </div>
    <n-divider class="h-[400px] divider-class" vertical />
  </div>
  <section v-else class="flex flex-row justify-start gap-2 mb-8">
    <n-skeleton height="42px" width="143px" :sharp="false" />
    <n-skeleton height="42px" width="174px" :sharp="false" />
    <n-skeleton height="42px" width="107px" :sharp="false" />
    <n-space vertical class="sm:w-1/3 mx-auto">
      <n-skeleton class="mx-auto" height="240px" width="240px" :sharp="false" />
      <n-skeleton class="mx-auto" height="40px" width="50%" :sharp="false" />
      <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
      <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
    </n-space>
  </section>
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

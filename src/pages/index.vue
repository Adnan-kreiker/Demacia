<script lang="ts" setup>
import SearchForSummoner from "~/components/SearchForSummoner.vue";
// import { NInput, NButton, NSelect } from "naive-ui";
// import { useRouter } from "vue-router";
// const summonerName = ref("");

// const router = useRouter();

// const navigate = () => router.push(`/summoner-info/${summonerName.value}`);

// const servers = ["EUW", "KR", "EUNE", "JP", "BR", "LAN", "LAS"];

// const selectedServer = ref(null);

// const selectOptions = servers.map((server) => {
//   return {
//     label: server,
//     value: server,
//   };
// });
</script>

<template>
  <div class="flex flex-col justify-center h-full items-center">
    <img height="221" width="400" class="max-w-sm my-4" src="/bg.webp" alt="" />
    <search-for-summoner> </search-for-summoner>
    <!-- <n-input
      v-model:value="summonerName"
      class="sm:max-w-2/3 md:max-w-1/2 relative"
      size="large"
      type="text"
      placeholder="Summoner name"
      @keydown.enter="navigate"
    >
      <template #suffix>
        <n-select
          v-model:value="selectedServer"
          class="absolute right-20 text-xs"
          style="width: 50px !important"
          placeholder="EUW"
          :options="selectOptions"
        />
        <n-button
          @click="navigate"
          :disabled="!(summonerName.length > 0)"
          class="bg-blue-500 text-white font-bold"
        >
          .GG
        </n-button>
      </template>
    </n-input> -->
  </div>
</template>

<style></style>

<route lang="yaml">
meta:
  layout: default
</route>

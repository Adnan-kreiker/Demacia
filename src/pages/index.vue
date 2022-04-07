<script lang="ts" setup>
import SearchForSummoner from "~/components/SearchForSummoner.vue";
</script>

<template>
  <div class="flex flex-col justify-center h-full items-center">
    <img height="221" width="400" class="max-w-sm my-4" src="/bg.webp" alt="" />
    <search-for-summoner></search-for-summoner>
  </div>
</template>

<style></style>

<route lang="yaml">
meta:
  layout: default
</route>

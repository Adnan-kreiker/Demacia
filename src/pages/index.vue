<script lang="ts" setup>
import SearchForSummoner from '~/components/SearchForSummoner.vue'
</script>

<template>
  <div class="flex flex-col justify-center h-full items-center">
    <img
      fetchpriority="high"
      height="280"
      class="object-cover yummi-img h-70 my-4"
      src="/yummi.webp"
      alt="Yummi hovering"
    >
    <SearchForSummoner />
  </div>
</template>

<style scoped>
.yummi-img {
  overflow: hidden;
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-20px);
  }

  100% {
    transform: translatey(0px);
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>

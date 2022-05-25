<script lang="ts" setup>
import SearchForSummoner from '~/components/SearchForSummoner.vue'
</script>

<template>
  <div>
    <h2 class="text-center text-4xl mb-6 font-mono font-bold">
      Demacia
    </h2>
    <div class="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      <div class="flex flex-col justify-center items-center py-4 border-2 bg-dark-200 border-gray-600 w-full">
        <img
          fetchpriority="high"
          height="280"
          width="250"
          class="object-cover yummi-img h-70 w-[250px] my-4 mx-auto"
          src="/yummi.webp"
          alt="Yummi hovering"
        >
        <SearchForSummoner />
      </div>
    </div>
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

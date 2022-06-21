<script lang="ts" setup>
import SearchForSummoner from '~/components/SearchForSummoner.vue'
import VercelLogo from '~/components/Icons/VercelLogo.vue'
</script>

<template>
  <div class="pb-8 my-auto">
    <h2 class="text-center text-4xl mb-6 font-mono font-bold">
      Demacia
    </h2>
    <div class="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      <div class="gradient-border p-1 rounded-md">
        <div
          class="flex flex-col justify-center items-center pt-4 pb-7 bg-dark-900 w-full shadow-t-md "
        >
          <img
            fetchpriority="high" height="280" width="250" class="object-cover yummi-img h-70 w-[250px] my-4 mx-auto"
            src="/yummi.webp" alt="Yummi hovering"
          >
          <SearchForSummoner />
        </div>
      </div>
      <div class="flex flex-col justify-center items-center mt-4">
        <div class="flex  justify-center items-center">
          <span class="text-lg mr-4 text-gray-400">Powered by </span>
          <VercelLogo class="h-27 w-27 scale-on-hover" />
        </div>
        <div class="flex">
          <logos-vue class="h-8 w-8 ml-7 scale-on-hover" />
          <logos-vitejs class="h-8 w-8 ml-7 scale-on-hover" />
          <logos-typescript-icon class="h-8 w-8 ml-7 scale-on-hover" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.yummi-img {
  overflow: hidden;
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
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

<script setup lang="ts">
import { NSkeleton, NSpace } from 'naive-ui'
</script>

<template>
  <div>
    <section class="flex flex-row justify-start gap-2 mb-8">
      <n-skeleton height="42px" width="143px" :sharp="false" />
      <n-skeleton height="42px" width="174px" :sharp="false" />
      <n-skeleton height="42px" width="107px" :sharp="false" />
    </section>
    <section class="w-full flex-grow mb-8 flex-wrap md:flex-nowrap flex gap-3 justify-center flex-col sm:flex-row">
      <n-space vertical class="sm:w-1/3 mx-auto">
        <n-skeleton class="mx-auto" height="240px" width="240px" :sharp="false" />
        <n-skeleton class="mx-auto" height="40px" width="50%" :sharp="false" />
        <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
        <n-skeleton class="mx-auto" height="30px" width="70%" :sharp="false" />
      </n-space>
      <div class="sm:w-[55%]">
        <n-skeleton class="mx-auto my-4" height="34px" width="70%" />
        <n-skeleton class="mx-auto" height="451px" width="100%" />
      </div>
    </section>
    <section class="flex flex-col gap-3 justify-center items-center">
      <div class="flex flex-row flex-wrap justify-between">
        <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="48px" width="263px" />
        <n-skeleton class="mx-auto my-8 mx-4 md:mx-12 lg:mx-16 " height="250px" width="250px" />
      </div>
      <n-skeleton v-for="i in 5" :key="i" height="185px" width="840px" />
    </section>
  </div>
</template>

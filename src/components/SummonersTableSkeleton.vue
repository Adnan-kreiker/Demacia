<script lang="ts" setup>
import { NSkeleton } from "naive-ui";
</script>

<template>
  <div class="my-4" v-for="n in 10" :key="n">
    <div class="flex justify-center">
      <n-skeleton class="mr-4" height="60px" circle />
      <n-skeleton height="60px" width="85%" />
    </div>
  </div>
</template>

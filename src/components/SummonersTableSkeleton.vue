<script lang="ts" setup>
import NSkeleton from "naive-ui/es/skeleton/src/Skeleton";
</script>

<template>
  <n-skeleton class="mx-auto" height="40px" width="92%" />
  <div class="my-4" v-for="n in 10" :key="n">
    <div class="flex justify-center">
      <n-skeleton class="mr-4" height="50px" circle />
      <n-skeleton height="50px" width="85%" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { darkTheme, lightTheme, NConfigProvider } from 'naive-ui'
// import ReloadPWA from "../src/components/ReloadPWA.vue";

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "League of Legends cafe",
  meta: [
    { name: "description", content: "All you need to know about League of Legends" },
  ],
});
</script>

<template>
  <!-- <n-config-provider :theme="darkTheme"> -->
  <!-- <ReloadPWA></ReloadPWA> -->
  <router-view />
  <!-- </n-config-provider> -->
</template>

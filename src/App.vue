<script setup lang="ts">
// import { darkTheme, lightTheme, NConfigProvider } from 'naive-ui'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitespa',
  meta: [
    { name: 'description', content: 'Like Vitesse but without SSG' },
  ],
})
</script>

<template>
  <!-- <n-config-provider :theme="darkTheme"> -->
  <router-view />
  <!-- </n-config-provider> -->
</template>

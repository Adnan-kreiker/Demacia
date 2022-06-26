<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Demacia',
  meta: [
    { name: 'description', content: 'League of Legends app to get information about summoners, servers\' status, leaderboards, champions, champions rotations, and live games.' },
  ],
})
</script>

<template>
  <router-view />
</template>


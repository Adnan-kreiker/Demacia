<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'League of Legends wikis',
  meta: [
    { name: 'description', content: 'All you need to know about League of Legends' },
  ],
})
</script>

<template>
  <router-view />
</template>


<script setup lang="ts">
import { NMenu, darkTheme, NConfigProvider } from 'naive-ui'

import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
// import { isDark } from '~/logic'
const activeKey = ref<string | null>(null)
// const fontColor = computed(() => { return isDark.value ? 'white' : 'black' })

const MenuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/',
          },
          activeClass: 'router-active',
        },
        { default: () => 'Home' },
      ),
    key: 'Home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/champions',
          },
          activeClass: 'router-active',
        },
        { default: () => 'Champions' },
      ),
    key: 'Champions',
  },
  {
    label: 'Stats',
    key: 'Stats',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/leaderboards',
          },
          activeClass: 'router-active',
        },
        { default: () => 'Leaderboards' },
      ),
    key: 'Leaderboards',
  },

]
</script>

<template>
  <div class="bg-dark-500 text-gray-200 relative dark:text-gray-200">
    <n-config-provider :theme="darkTheme">
      <nav class="py-3">
        <n-menu v-model="activeKey" class="text-lg" mode="horizontal" :options="MenuOptions"></n-menu>
      </nav>
      <main class="px-4 py-10 min-h-screen">
        <router-view :key="$route.fullPath" />
      </main>
      <Footer></Footer>
    </n-config-provider>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { isDark } from '~/logic'
const activeKey = ref<string | null>(null)
const fontColor = computed(() => { return isDark.value ? 'white' : 'black' })

const MenuOptions: MenuOption[] = [
  {
    label: 'Home',
    key: 'Home',
  },
  {
    label: 'Champions',
    key: 'Champions',
  },
  {
    label: 'Stats',
    key: 'Stats',
  },
  {
    label: 'Leaderboards',
    key: 'Leaderboards',
  },

]
</script>

<template>
  <main class="px-4 py-10  text-gray-700 dark:text-gray-200 min-h-screen">
    <n-menu v-model="activeKey" mode="horizontal" :options="MenuOptions"></n-menu>
    <!-- <n-button @click="toggleDark()">
      Click me
    </n-button> -->
    <router-view />
    <Footer></Footer>
  </main>
</template>

<style>
.n-menu-item-content-header{
  color: v-bind(fontColor) !important;
}
</style>

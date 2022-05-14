<script setup lang="ts">
import NLayoutSider from 'naive-ui/es/layout/src/LayoutSider'
import NMenu from 'naive-ui/es/menu/src/Menu'
import { NIcon } from 'naive-ui/es/icon/src/Icon'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import NLayout from 'naive-ui/es/layout/src/Layout'
import { RouterLink } from 'vue-router'
import StatusIcon from '~/components/Icons/StatusIcon.vue'
import StatisticsIcon from '~/components/Icons/StatisticsIcon.vue'
import YummiIcon from '~/components/Icons/YummiIcon.vue'
import ChampionsIcon from '~/components/Icons/ChampionInfo.vue'
import HomeIcon from '~/components/Icons/HomeIcon.vue'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'triggerCollapse', value: boolean): void
}>()

const activeKey = ref<string | null>(null)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const mobileMenuOptions: MenuOption[] = [
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
    icon: renderIcon(HomeIcon),
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
    icon: renderIcon(ChampionsIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/status',
          },
          activeClass: 'router-active',
        },
        { default: () => 'Status' },
      ),
    key: 'Status',
    icon: renderIcon(StatusIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/champion-rotations',
          },
          activeClass: 'router-active',
        },
        { default: () => 'Champion Rotations' },
      ),
    key: 'Rotations',
    icon: renderIcon(ChampionsIcon),
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
    icon: renderIcon(StatisticsIcon),
  },
]

defineExpose({
  emit,
})

const layoutSiderWidth = computed(() => {
  if (props.collapsed)
    return 0

  return '240px'
})

</script>

<template>
  <router-link to="/">
    <button class="px-2 pt-1">
      <YummiIcon class="h-8.5 w-8.5" />
    </button>
  </router-link>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      :collapsed="props.collapsed"
      :show-trigger="false"
      @collapse="emit('triggerCollapse', true)"
      @expand="emit('triggerCollapse', false)"
    >
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="0"
        :collapsed-icon-size="0"
        :options="mobileMenuOptions"
        @update:value="() => emit('triggerCollapse', true)"
      />
    </n-layout-sider>
  </n-layout>
</template>

<style>
.n-layout .n-layout-scroll-container {
  width: v-bind(layoutSiderWidth) !important;
  top: 0;
}
</style>

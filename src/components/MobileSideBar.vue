<script setup lang="ts">
import NLayoutSider from "naive-ui/es/layout/src/LayoutSider";
import HomeIcon from "~/components/Icons/HomeIcon.vue";
import NMenu from "naive-ui/es/menu/src/Menu";

import ChampionsIcon from "~/components/Icons/ChampionInfo.vue";
import StatisticsIcon from "~/components/Icons/StatisticsIcon.vue";
import StatsIcon from "~/components/Icons/StatsIcon.vue";
import { NIcon } from "naive-ui/es/icon/src/Icon";
import type { MenuOption } from "naive-ui";
import type { Component } from "vue";
import NLayout from "naive-ui/es/layout/src/Layout";
import { RouterLink } from "vue-router";

const props = defineProps<{
  collapsed: boolean;
}>()

const emit = defineEmits<{
  (e: 'triggerCollapse', value: boolean): void
}>()
// const sidePanel = ref(null);

// onClickOutside(sidePanel, () => (emit('triggerCollapse', true)));
const activeKey = ref<string | null>(null);




function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const mobileMenuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/",
          },
          activeClass: "router-active",
        },
        { default: () => "Home" }
      ),
    key: "Home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/champions",
          },
          activeClass: "router-active",
        },
        { default: () => "Champions" }
      ),
    key: "Champions",
    icon: renderIcon(ChampionsIcon),
  },
  {
    label: "Stats",
    key: "Stats",
    icon: renderIcon(StatsIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/champion-rotations",
          },
          activeClass: "router-active",
        },
        { default: () => "Champion Rotations" }
      ),
    key: "Rotations",
    icon: renderIcon(ChampionsIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/leaderboards",
          },
          activeClass: "router-active",
        },
        { default: () => "Leaderboards" }
      ),
    key: "Leaderboards",
    icon: renderIcon(StatisticsIcon),
  },
];

defineExpose({
  emit
})

</script>

<template>
  <n-layout has-sider>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="0" :width="240" :collapsed="props.collapsed"
      :show-trigger="false" @collapse="emit('triggerCollapse', true)" @expand="emit('triggerCollapse', false)">
      <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
        :options="mobileMenuOptions" :on-update:value="() => emit('triggerCollapse', true)" />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { NMenu, darkTheme, NConfigProvider, NBackTop } from "naive-ui";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";
import ChevronTop from "~/components/Icons/ChevronTop.vue";

const activeKey = ref<string | null>(null);

const { y } = useWindowScroll();

const scrollButtonVisibility = computed(() => y.value >= 200);

const MenuOptions: MenuOption[] = [
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
  },
  {
    label: "Stats",
    key: "Stats",
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
  },
];
</script>

<template>
  <div class="bg-dark-500 text-gray-200 relative dark:text-gray-200">
    <n-config-provider :theme="darkTheme">
      <nav class="py-3">
        <n-menu
          v-model="activeKey"
          class="text-lg"
          mode="horizontal"
          :options="MenuOptions"
        ></n-menu>
      </nav>
      <n-back-top :right="40" :bottom="20" show>
        <div
          v-show="scrollButtonVisibility"
          style="width: 50px; height: 50px; text-align: center; border-radius: 100%"
          :style="{
            transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
          }"
        >
          <chevron-top></chevron-top>
        </div>
      </n-back-top>
      <main class="px-4 py-10 min-h-screen">
        <router-view :key="$route.fullPath" />
      </main>
      <Footer></Footer>
    </n-config-provider>
  </div>
</template>

<style>
.n-back-top {
  --n-color: transparent !important;
}
</style>

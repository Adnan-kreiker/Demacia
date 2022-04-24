<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import NMenu from "naive-ui/es/menu/src/Menu";
import { darkTheme } from "naive-ui";
import NConfigProvider from "naive-ui/es/config-provider/src/ConfigProvider";
import NBackTop from "naive-ui/es/back-top/src/BackTop";
import { RouterLink } from "vue-router";
import ChevronTop from "~/components/Icons/ChevronTop.vue";
const MobileSideBar = defineAsyncComponent({
  loader: () =>
    import("../components/MobileSideBar.vue"),
});

const activeKey = ref<string | null>(null);

const collapsed = ref(true);

const { y } = useWindowScroll();

const { width } = useWindowSize();

const scrollButtonVisibility = computed(() => y.value >= 200);

const sidePanel = ref(null);

const menuButton = ref(null);

onClickOutside(sidePanel, () => (collapsed.value = true), {
  ignore: [menuButton],
});

const menuOptions: MenuOption[] = [
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
            path: "/champion-rotations",
          },
          activeClass: "router-active",
        },
        { default: () => "Champion Rotations" }
      ),
    key: "Rotations",
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

const triggerCollapse = () => (collapsed.value = !collapsed.value);
</script>

<template>
  <div id="layout-scroll-container" class="bg-dark-500 text-gray-200 relative dark:text-gray-200">
    <n-config-provider :theme="darkTheme">
      <nav class="py-3">
        <n-menu v-if="width > 700" v-model="activeKey" class="text-lg" mode="horizontal" :options="menuOptions">
        </n-menu>
        <div v-else>
          <button ref="menuButton" @click="triggerCollapse" class="absolute w-10 h-10 top-0 right-3">
            <MenuIcon></MenuIcon>
          </button>
          <MobileSideBar ref="sidePanel" :collapsed="collapsed" />
        </div>
      </nav>
      <n-back-top :right="40" :bottom="20" show>
        <div v-show="scrollButtonVisibility" style="width: 50px; height: 50px; text-align: center; border-radius: 100%"
          :style="{
            transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
          }">
          <chevron-top></chevron-top>
        </div>
      </n-back-top>
      <main class="px-4 py-10 min-h-screen">
        <router-view v-slot="{ Component, route }">
          <transition mode="out-in" name="fade">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </main>
      <TheFooter />
    </n-config-provider>
  </div>
</template>

<style>
.n-back-top {
  --n-color: transparent !important;
}

.n-layout-sider .n-layout-toggle-button {
  transition: color 0.3s var(--n-bezier), right 0.3s var(--n-bezier),
    left 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier);
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: fixed;
  top: 3%;
  right: 4%;
  margin-left: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--n-toggle-button-icon-color);
  border: var(--n-toggle-button-border);
  background-color: var(--n-toggle-button-color);
  box-shadow: 0 2px 4px 0px rgb(0 0 0 / 6%);
  transform: translateX(50%) translateY(-50%);
  z-index: 1;
}

.n-layout-sider {
  flex-shrink: 0;
  box-sizing: border-box;
  /* position: absolute !important; */
  z-index: 1;
  color: var(--n-text-color);
  transition: color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier),
    min-width 0.3s var(--n-bezier), max-width 0.3s var(--n-bezier),
    transform 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier);
  background-color: var(--n-color);
  display: flex;
  justify-content: flex-end;
  height: 100%;
}

.n-layout-sider .n-layout-toggle-bar {
  cursor: pointer;
  height: 72px;
  width: 32px;
  position: absolute;
  top: 2%;
  right: -28px;
}

.n-layout .n-layout-scroll-container {
  /* overflow-x: hidden; */
  box-sizing: border-box;
  position: absolute !important;
}

.n-layout {
  color: var(--n-text-color);
  background-color: var(--n-color);
  box-sizing: border-box;
  position: static;
  z-index: auto;
  flex: auto;
  overflow: hidden;
  transition: box-shadow 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier),
    color 0.3s var(--n-bezier);
}
</style>

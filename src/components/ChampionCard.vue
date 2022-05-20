<script setup lang="ts">
import imageUrl from '../../public/championPlaceholder.webp'
import type { Champion } from '~/types'
const props = defineProps<{
  champ: Champion
}>()

const patchVersion = import.meta.env.VITE_PATCH_VERSION
</script>

<template>
  <div
    v-if="props.champ"
    :style="{ background: `url(${imageUrl}) no-repeat`, backgroundSize: `${96}px ${98}px`, backgroundPosition: 'top' }"
    class="w-[98px] h-[138.39px] hover:bg-dark-50 transition ease duration-500 relative justify-self-center border border-dark-200 :hover:border-green-500"
  >
    <router-link
      :to="`/champion-info/${champ.id}`"

      class="hover:cursor-pointer"
    >
      <img
        class="image_placeholder" loading="lazy" height="98"
        :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.id}.png`"
      >
      <div class="bottom-10.5 absolute right-0">
        <p v-for="(tag, i) in champ.tags" :key="i" class="bg-dark-500 text-white text-xs p-0">
          {{ tag }}
        </p>
      </div>
      <h2 class="text-center font-bold font-mono py-2">
        {{ champ.name }}
      </h2>
    </router-link>
  </div>
</template>

<style>
/* .image_placeholder {
  background: url('/championPlaceholder.webp') no-repeat;
  background-size: 96px 98px;
  height: 98px;
  width: 96px;
  background-position: center;
} */
</style>

<script setup lang="ts">
import type { Champion } from '~/types';

const props = defineProps<{
  champ: Champion
}>()

const patchVersion = import.meta.env.VITE_PATCH_VERSION;

</script>

<template>
  <div v-if="props.champ"
    class="w-[98px] h-[138.39px] hover:bg-dark-50 transition ease duration-500 relative justify-self-center border border-dark-200 :hover:border-green-500">
    <router-link :to="`/champion-info/${champ.id}`" class="hover:cursor-pointer">
      <img height="98" :src="`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.id}.png`" />
      <div class="bottom-10.5 absolute right-0">
        <p v-for="(tag, i) in champ.tags" :key="i" class="bg-dark-500 text-white text-xs p-0">
          {{ tag }}
        </p>
      </div>
    </router-link>
    <h2 class="text-center font-bold font-mono py-2">
      {{ champ.name }}
    </h2>
  </div>
</template>

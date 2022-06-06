<script lang="ts" setup>
import { NButton, NInput, NSelect } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import { regionToRegionParamMapper } from '../../utils'
import { regionStore } from '~/stores/region'
import type { RegionParam, Servers } from '~/types'

const summonerName = ref('')

const router = useRouter()

const store = regionStore()

const region = ref('euw1') as Ref<RegionParam>

watch(region, (newVal: RegionParam) => {
  store.setRegion(newVal)
})

const navigate = () =>
  router.push({
    path: `/summoner-info/${summonerName.value}`,
    query: { region: region.value },
  })

const servers: Servers = ['EUW', 'EUNE', 'NA', 'LAN', 'LAS', 'BR', 'TR', 'RU', 'OCE', 'JP', 'KR']

const selectOptions = servers.map((server) => {
  return {
    label: server,
    value: regionToRegionParamMapper(server).value,
  }
})
</script>

<template>
  <div class="px-3 w-full flex justify-center">
    <n-input
      v-model:value="summonerName"
      class="relative md:max-w-[500px]"
      size="large"
      type="text"
      placeholder="Summoner name"
      @keydown.enter="navigate"
    >
      <template #suffix>
        <n-select
          v-model:value="region"
          class="absolute right-20 text-xs"
          style="width: 50px !important"
          placeholder="EUW"
          :options="selectOptions"
        />
        <n-button :disabled="!(summonerName.length > 0)" class="bg-blue-500 text-white font-bold" @click="navigate">
          GO
        </n-button>
      </template>
    </n-input>
  </div>
</template>

<style>
.n-base-select-menu .n-base-select-option .n-base-select-option__content {
  white-space: normal;
  text-overflow: inherit;
  overflow: visible;
}

.n-base-select-menu .n-base-select-option {
  justify-content: center;
  padding-inline: 2px;
}

.n-base-selection .n-base-selection-label .n-base-selection-input .n-base-selection-input__content {
  white-space: normal;
  text-overflow: inherit;
  overflow: visible;
}

.n-base-selection .n-base-selection-label .n-base-selection-input {
  display: flex;
  justify-content: center;
  padding: 0;
}

.n-input .n-input__suffix .n-base-loading,
.n-input .n-input__prefix .n-base-loading {
  margin-left: 6px;
}

.n-base-selection .n-base-suffix {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -17px;
}
</style>

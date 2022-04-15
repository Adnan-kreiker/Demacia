<script lang="ts" setup>
import NInput from "naive-ui/es/input/src/Input";
import NButton from "naive-ui/es/button/src/Button";
import NSelect from "naive-ui/es/select/src/Select";
import { useRouter } from "vue-router";
const summonerName = ref("");

const router = useRouter();

const navigate = () => router.push(`/summoner-info/${summonerName.value}`);

const servers = ["EUW", "KR", "EUNE", "JP", "BR", "LAN", "LAS"];

const selectedServer = ref(null);

const selectOptions = servers.map((server) => {
  return {
    label: server,
    value: server,
  };
});
</script>

<template>
  <n-input
    v-model:value="summonerName"
    class="sm:max-w-2/3 md:max-w-1/2 relative"
    size="large"
    type="text"
    placeholder="Summoner name"
    @keydown.enter="navigate"
  >
    <template #suffix>
      <n-select
        r
        v-model:value="selectedServer"
        class="absolute right-20 text-xs"
        style="width: 50px !important"
        placeholder="EUW"
        :options="selectOptions"
      />
      <n-button
        @click="navigate"
        :disabled="!(summonerName.length > 0)"
        class="bg-blue-500 text-white font-bold"
      >
        .GG
      </n-button>
    </template>
  </n-input>
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

.n-base-selection
  .n-base-selection-label
  .n-base-selection-input
  .n-base-selection-input__content {
  white-space: normal;
  text-overflow: inherit;
  overflow: visible;
}

.n-base-selection .n-base-selection-label .n-base-selection-input {
  /* padding: 7px; */
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
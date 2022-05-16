<script lang="ts">
import { defineComponent } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
const { updateServiceWorker } = useRegisterSW()
export default defineComponent({
  name: 'ReloadPWA',
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
    const close = async () => {
      offlineReady.value = false
      needRefresh.value = false
    }

    return { offlineReady, needRefresh, updateServiceWorker, close }
  },
  methods: {
    async updateSW() {
      await updateServiceWorker()
    },
  },
})
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="flex flex-wrap" role="alert">
    <div class="message mt-1">
      <!-- <span v-if="offlineReady"> App ready to work offline </span> -->
      <span v-if="!offlineReady">New content available, click on reload button to update.</span>
    </div>
    <div class="buttons flex align-middle mt-2 md:mt-0">
      <button v-if="needRefresh" class="button" @click="updateServiceWorker()">
        Reload
      </button>
      <button v-if="needRefresh" class="button" @click="close">
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { calculatedTimeFromStart } from '../../utils/index'
const props = defineProps<{
  gameStartTime: number
}>()
const featuredGamesTimeSlotKey = ref(0)

let interval: NodeJS.Timer

onMounted(() => {
  interval = setInterval(() => {
    featuredGamesTimeSlotKey.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <p :key="featuredGamesTimeSlotKey">
    {{ calculatedTimeFromStart(props.gameStartTime) }}
  </p>
</template>

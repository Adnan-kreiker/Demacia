<script setup lang="ts">
import { calculatedTimeFromStart } from '../../utils/index'
const props = defineProps<{
  gameStartTime: number
}>()
</script>

<template>
  <p>{{ calculatedTimeFromStart(props.gameStartTime) }}</p>
</template>

<style scoped>

</style>

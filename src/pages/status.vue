<script setup lang="ts">
import useServerStatus from "~/hooks/useServerStatus";

const { status } = useServerStatus()

</script>

<template>
  <p>{{ status }}</p>
</template>

<style scoped>
</style>
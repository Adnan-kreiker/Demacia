<script setup lang="ts">
import { NResult } from "naive-ui";
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <n-result
      status="404"
      title="404 Not Found"
      description="You know life is always ridiculous."
    >
      <template #footer>
        <n-button>Find Something Funny</n-button>
      </template>
    </n-result>
  </main>
</template>

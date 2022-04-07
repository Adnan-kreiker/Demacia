<script setup lang="ts">
import NResult from "naive-ui/es/result/src/Result";
import NButton from "naive-ui/es/button/src/Button";
import { ErrorStatusCode } from "~/types";
const props = defineProps<{
  status: ErrorStatusCode;
  title: string;
  description: string;
}>();

const router = useRouter();

const navigateHome = () => router.push("/");
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <n-result
      :status="props.status"
      :title="props.title"
      :description="props.description"
    >
      <template #footer>
        <n-button @click="navigateHome" ghost>Return Home</n-button>
      </template>
    </n-result>
  </main>
</template>

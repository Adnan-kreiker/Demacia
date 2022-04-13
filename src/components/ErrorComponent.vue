<script setup lang="ts">
import NButton from "naive-ui/es/button/src/Button";
import { ErrorStatusCode } from "~/types";

interface Props {
  status?: ErrorStatusCode;
  title: string;
  showReturnHomeButton?: boolean;
  description: string;
  imageUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  status: "404",
  showReturnHomeButton: true,
  imageUrl: "/notFound.png",
});

const router = useRouter();

const navigateHome = () => router.push("/");
</script>

<template>
  <main class="px-4 py-4 text-center dark:text-gray-200">
    <div class="flex flex-row flex-wraps items-center">
      <img height="300" class="h-[300px]" :src="props.imageUrl" alt="" />
      <div class="my-3 text-xl">
        <p>{{ props.status }}</p>
        <p>{{ props.title }}</p>
        <p>{{ props.description }}</p>
        <n-button v-if="showReturnHomeButton" class="mt-4" @click="navigateHome" ghost
          >Return Home</n-button
        >
      </div>
    </div>
  </main>
</template>

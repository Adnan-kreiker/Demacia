<script setup lang="ts">
import NButton from 'naive-ui/es/button/src/Button'
import type { ErrorStatusCode } from '~/types'

interface Props {
  status?: ErrorStatusCode
  title: string
  showReturnHomeButton?: boolean
  description: string
  imageUrl?: string
}

const { status = '404', title, showReturnHomeButton = true, description, imageUrl = '/notFound.png' } = defineProps<Props>()

const router = useRouter()

const navigateHome = () => router.push('/')
</script>

<template>
  <main class="px-4 py-4 text-center border border-gray-600 mx-6 sm:mx-16 my-6 bg-dark-200 dark:text-gray-200">
    <div class="flex flex-row justify-center flex-wrap items-center">
      <img height="300" width="300" class="h-[300px] object-cover" :src="imageUrl" alt="">
      <div class="md:my-3 text-xl">
        <p>{{ status }}</p>
        <p>{{ title }}</p>
        <p>{{ description }}</p>
        <n-button v-if="showReturnHomeButton" class="mt-4" ghost @click="navigateHome">
          Return Home
        </n-button>
      </div>
    </div>
  </main>
</template>

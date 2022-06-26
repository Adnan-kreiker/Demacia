<script setup lang="ts">
import { NButton } from 'naive-ui'
import ChevronRight from './Icons/ChevronRight.vue'
import type { FilterOption } from '~/types'

const props = defineProps<{
  filterOptions: FilterOption[]
  currentFilter: string
}>()

const emit = defineEmits<{
  (e: 'updateFilter', filter: string): void
}>()

const showFilterList = ref(false)

const updateCurrentFilter = (e: Event) => {
  const event = e.target as HTMLElement
  emit('updateFilter', event.innerText)
}

const filterDiv = ref(null)

onClickOutside(filterDiv, () => {
  showFilterList.value = false
})
</script>

<template>
  <div ref="filterDiv" class="mt-2 relative w-[150px] filter-component">
    <div data-testid="filter-button" class="flex flex-row items-center hover:cursor-pointer" @click="showFilterList = !showFilterList">
      <n-button data-testid="filter-span" class="py-2 px-3 w-[110px] inline-block rounded-sm bg-dark-100 text-white filter-span">
        <span class="mx-auto">
          {{
            props.currentFilter
          }}
        </span>
      </n-button>
      <ChevronRight
        class="h-5 w-5 ml-2 transform  text-light-900  ease duration-200"
        :class="{ 'rotate-90': showFilterList }"
      />
    </div>
    <Transition name="fadeMenu" appear>
      <ul
        v-show="showFilterList"
        data-testid="filter-list"
        class="my-4 absolute z-30 h-max top-5.5 text-center bg-dark-100 w-[110px] rounded-sm shadow-2xl drop-shadow-2xl filter-ul"
      >
        <li
          v-for="option in props.filterOptions"
          :key="option.id"
          :class="{ 'text-green-400 font-bold': currentFilter === option.name }"
          class="p-2 hover:bg-warm-gray-500 hover:cursor-pointer"
          :value="option.name"
          @click="updateCurrentFilter($event), showFilterList = false"
        >
          {{
            option.name
          }}
        </li>
      </ul>
    </Transition>
  </div>
</template>


<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  // Plugin,
  Title,
  Tooltip,
} from 'chart.js'

interface Props {
  winsAndLosses: [wins:number, losses:number]
}

const props = defineProps<Props>()

const chartData = {
  labels: ['Wins', 'Losses'],
  datasets: [
    {
      backgroundColor: ['#1f306a', '#3e213b'],
      data: [props.winsAndLosses[0], props.winsAndLosses[1]],
    },
  ],
}

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
</script>

<template>
  <Doughnut ref="doughnut" :chart-data="chartData" :width="400" :height="400" />
</template>


<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
</script>

<template>
  <Doughnut :chart-data="chartData" :chart-options="chartOptions" :width="250" :height="250" />
</template>

<style>
#doughnut-chart {
  height: 250px !important;
  width: 250px !important;
}
</style>

<template>
  <div ref="chartRef" class="radar-chart"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmIds: Array
})

const chartRef = ref(null)
const weatherStore = useWeatherStore()
let chartInstance = null

onMounted(() => {
  initChart()
})

watch(() => props.farmIds, () => {
  updateChart()
}, { deep: true })

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  updateChart()
  
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
}

const updateChart = () => {
  if (!chartInstance || !props.farmIds.length) return
  
  const farms = props.farmIds.map(id => weatherStore.getFarmById(id)).filter(Boolean)
  
  const indicator = [
    { name: '温度', max: 40 },
    { name: '湿度', max: 100 },
    { name: '降雨量', max: 50 },
    { name: '风速', max: 15 },
    { name: '气压', max: 1030 },
    { name: '光照强度', max: 10000 }
  ]
  
  const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B']
  
  const series = farms.map((farm, index) => ({
    name: farm.name,
    value: [
      farm.temperature,
      farm.humidity,
      farm.rainfall,
      farm.windSpeed,
      farm.pressure,
      farm.lightIntensity
    ],
    itemStyle: {
      color: colors[index % colors.length]
    }
  }))
  
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: farms.map(f => f.name),
      bottom: 0
    },
    radar: {
      indicator: indicator,
      radius: '65%',
      splitNumber: 4
    },
    series: [
      {
        type: 'radar',
        data: series
      }
    ]
  }
  
  chartInstance.setOption(option)
}
</script>

<style lang="scss" scoped>
.radar-chart {
  width: 100%;
  height: 500px;
}
</style>

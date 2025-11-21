<template>
  <div ref="chartRef" class="multi-metric-trend"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmId: String,
  days: Number,
  metrics: Array
})

const chartRef = ref(null)
const weatherStore = useWeatherStore()
let chartInstance = null

onMounted(() => {
  initChart()
})

watch(() => [props.farmId, props.days, props.metrics], () => {
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

const metricConfigs = {
  temperature: { name: '温度', unit: '°C', color: '#EF4444', yAxisIndex: 0 },
  humidity: { name: '湿度', unit: '%', color: '#3B82F6', yAxisIndex: 1 },
  rainfall: { name: '降雨量', unit: 'mm', color: '#06B6D4', yAxisIndex: 2 },
  windSpeed: { name: '风速', unit: 'm/s', color: '#8B5CF6', yAxisIndex: 2 }
}

const updateChart = () => {
  if (!chartInstance || !props.farmId || !props.metrics.length) return
  
  const historyData = weatherStore.getHistoryData(props.farmId, props.days)
  
  const series = props.metrics.map(metric => {
    const config = metricConfigs[metric]
    return {
      name: config.name,
      type: 'line',
      yAxisIndex: config.yAxisIndex,
      data: historyData.map(item => item[metric]),
      smooth: true,
      itemStyle: { color: config.color },
      lineStyle: { width: 2 }
    }
  })
  
  const yAxis = [
    {
      type: 'value',
      name: '温度(°C)',
      position: 'left',
      axisLabel: { formatter: '{value} °C' }
    },
    {
      type: 'value',
      name: '湿度(%)',
      position: 'right',
      axisLabel: { formatter: '{value} %' }
    },
    {
      type: 'value',
      name: '降雨量(mm) / 风速(m/s)',
      position: 'right',
      offset: 60,
      axisLabel: { formatter: '{value}' }
    }
  ]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: props.metrics.map(m => metricConfigs[m].name),
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '15%',
      bottom: '10%',
      containLabel: true
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      type: 'category',
      data: historyData.map(item => item.time.substring(5)),
      axisLabel: {
        interval: Math.floor(historyData.length / 10)
      }
    },
    yAxis: yAxis,
    series: series
  }
  
  chartInstance.setOption(option)
}
</script>

<style lang="scss" scoped>
.multi-metric-trend {
  width: 100%;
  height: 500px;
}
</style>

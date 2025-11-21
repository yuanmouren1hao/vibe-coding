<template>
  <div ref="chartRef" class="timeline-chart"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmIds: Array,
  metric: String
})

const chartRef = ref(null)
const weatherStore = useWeatherStore()
let chartInstance = null

onMounted(() => {
  initChart()
})

watch(() => [props.farmIds, props.metric], () => {
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

const metricConfig = {
  temperature: { name: '温度', unit: '°C', color: '#EF4444' },
  humidity: { name: '湿度', unit: '%', color: '#3B82F6' },
  rainfall: { name: '降雨量', unit: 'mm', color: '#06B6D4' }
}

const updateChart = () => {
  if (!chartInstance || !props.farmIds.length) return
  
  const config = metricConfig[props.metric]
  const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B']
  
  const seriesData = props.farmIds.map((farmId, index) => {
    const farm = weatherStore.getFarmById(farmId)
    const historyData = weatherStore.getHistoryData(farmId, 7)
    
    // 按天聚合
    const dailyData = []
    for (let i = 0; i < 7; i++) {
      const dayData = historyData.slice(i * 24, (i + 1) * 24)
      const avgValue = dayData.reduce((sum, item) => sum + item[props.metric], 0) / dayData.length
      dailyData.push(avgValue.toFixed(1))
    }
    
    return {
      name: farm.name,
      type: 'line',
      data: dailyData,
      smooth: true,
      itemStyle: { color: colors[index % colors.length] },
      lineStyle: { width: 3 }
    }
  })
  
  // 获取日期
  const historyData = weatherStore.getHistoryData(props.farmIds[0], 7)
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = historyData[i * 24].time.split(' ')[0]
    dates.push(date.substring(5))
  }
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: props.farmIds.map(id => weatherStore.getFarmById(id).name),
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: `${config.name}(${config.unit})`
    },
    series: seriesData
  }
  
  chartInstance.setOption(option)
}
</script>

<style lang="scss" scoped>
.timeline-chart {
  width: 100%;
  height: 400px;
}
</style>

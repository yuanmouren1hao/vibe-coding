<template>
  <div ref="chartRef" class="history-preview-chart"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmId: String
})

const chartRef = ref(null)
const weatherStore = useWeatherStore()
let chartInstance = null

onMounted(() => {
  initChart()
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const historyData = weatherStore.getHistoryData(props.farmId, 7)
  
  // 按天聚合数据
  const dailyData = []
  for (let i = 0; i < 7; i++) {
    const dayData = historyData.slice(i * 24, (i + 1) * 24)
    const avgTemp = dayData.reduce((sum, item) => sum + item.temperature, 0) / dayData.length
    const avgHumidity = dayData.reduce((sum, item) => sum + item.humidity, 0) / dayData.length
    
    dailyData.push({
      date: dayData[0].time.split(' ')[0],
      temperature: avgTemp.toFixed(1),
      humidity: avgHumidity.toFixed(1)
    })
  }
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['温度', '湿度']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dailyData.map(item => item.date.substring(5))
    },
    yAxis: [
      {
        type: 'value',
        name: '温度(°C)',
        position: 'left'
      },
      {
        type: 'value',
        name: '湿度(%)',
        position: 'right'
      }
    ],
    series: [
      {
        name: '温度',
        type: 'line',
        data: dailyData.map(item => item.temperature),
        smooth: true,
        itemStyle: { color: '#EF4444' }
      },
      {
        name: '湿度',
        type: 'line',
        yAxisIndex: 1,
        data: dailyData.map(item => item.humidity),
        smooth: true,
        itemStyle: { color: '#3B82F6' }
      }
    ]
  }
  
  chartInstance.setOption(option)
  
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
}
</script>

<style lang="scss" scoped>
.history-preview-chart {
  width: 100%;
  height: 300px;
}
</style>

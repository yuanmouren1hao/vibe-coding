<template>
  <div ref="chartRef" class="forecast-chart"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { generate24HourForecast } from '@/mock/weatherData'

const props = defineProps({
  farmData: Object
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const forecastData = generate24HourForecast(props.farmData)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['温度', '湿度'],
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: forecastData.map(item => item.time),
      axisLabel: {
        interval: 2
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '温度(°C)',
        position: 'left',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      {
        type: 'value',
        name: '湿度(%)',
        position: 'right',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '温度',
        type: 'line',
        smooth: true,
        data: forecastData.map(item => item.temperature),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
            { offset: 1, color: 'rgba(239, 68, 68, 0.05)' }
          ])
        },
        itemStyle: {
          color: '#EF4444'
        },
        lineStyle: {
          width: 3
        }
      },
      {
        name: '湿度',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: forecastData.map(item => item.humidity),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ])
        },
        itemStyle: {
          color: '#3B82F6'
        },
        lineStyle: {
          width: 3
        }
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
.forecast-chart {
  width: 100%;
  height: 400px;
}
</style>

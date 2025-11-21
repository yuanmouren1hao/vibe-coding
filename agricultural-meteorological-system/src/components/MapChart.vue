<template>
  <div ref="chartRef" class="map-chart"></div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import * as echarts from 'echarts'
import shanghaiGeoJSON from '@/assets/shanghai_real.json'

const props = defineProps({
  farmData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['farm-click'])

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
})

watch(() => props.farmData, () => {
  updateChart()
}, { deep: true })

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  
  // 注册上海地图
  echarts.registerMap('shanghai', shanghaiGeoJSON)
  
  updateChart()

  // 点击事件
  chartInstance.on('click', (params) => {
    if (params.componentType === 'series' && params.seriesType === 'scatter') {
      emit('farm-click', params.data.farmId)
    }
  })

  // 响应式
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
}

const updateChart = () => {
  if (!chartInstance || !props.farmData.length) return

  const scatterData = props.farmData.map(farm => ({
    name: farm.name,
    value: [...farm.location, farm.temperature],
    farmId: farm.id,
    temperature: farm.temperature,
    humidity: farm.humidity,
    rainfall: farm.rainfall,
    windSpeed: farm.windSpeed
  }))

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        color: '#1F2937'
      },
      formatter: (params) => {
        if (params.componentType === 'series' && params.seriesType === 'scatter') {
          const data = params.data
          return `
            <div style="padding: 4px;">
              <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px; color: #1F2937;">${data.name}</div>
              <div style="font-size: 12px; color: #6B7280; line-height: 1.8;">
                <div>🌡️ 温度: <span style="font-weight: 600; color: #EF4444;">${data.temperature}°C</span></div>
                <div>💧 湿度: <span style="font-weight: 600; color: #3B82F6;">${data.humidity}%</span></div>
                <div>🌧️ 降雨: <span style="font-weight: 600; color: #06B6D4;">${data.rainfall}mm</span></div>
                <div>💨 风速: <span style="font-weight: 600; color: #8B5CF6;">${data.windSpeed}m/s</span></div>
              </div>
            </div>
          `
        }
        if (params.componentType === 'geo') {
          return `<div style="padding: 8px; font-weight: 600;">${params.name}</div>`
        }
        return params.name
      }
    },
    geo: {
      map: 'shanghai',
      roam: true,
      zoom: 1.1,
      center: [121.47, 31.23],
      label: {
        show: true,
        fontSize: 11,
        color: '#6B7280',
        fontWeight: 'normal'
      },
      itemStyle: {
        areaColor: '#F0F9FF',
        borderColor: '#0EA5E9',
        borderWidth: 1.5
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          color: '#1F2937',
          fontWeight: 'bold'
        },
        itemStyle: {
          areaColor: '#DBEAFE',
          borderColor: '#0284C7',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(14, 165, 233, 0.4)'
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val) => {
          // 根据温度调整大小
          return Math.max(18, Math.min(32, val[2] * 0.8))
        },
        itemStyle: {
          color: (params) => {
            const temp = params.data.temperature
            if (temp < 15) return '#3B82F6'
            if (temp < 25) return '#10B981'
            if (temp < 30) return '#F59E0B'
            return '#EF4444'
          },
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'bottom',
          fontSize: 10,
          color: '#1F2937',
          fontWeight: 'bold',
          distance: 8,
          formatter: (params) => {
            return `${params.data.temperature}°C`
          },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: [2, 6],
          borderRadius: 3
        },
        emphasis: {
          scale: 1.8,
          label: {
            show: true,
            fontSize: 12
          },
          itemStyle: {
            shadowBlur: 25,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 3
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)
}
</script>

<style lang="scss" scoped>
.map-chart {
  width: 100%;
  flex: 1;
  min-height: 500px;
}
</style>

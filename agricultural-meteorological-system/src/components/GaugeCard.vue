<template>
  <div class="gauge-card data-card">
    <div class="gauge-header">
      <span class="gauge-icon">{{ icon }}</span>
      <span class="gauge-title">{{ title }}</span>
    </div>
    <div ref="chartRef" class="gauge-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: String,
  value: Number,
  unit: String,
  min: {
    type: Number,
    default: 0
  },
  max: Number,
  color: String,
  icon: String
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
})

watch(() => props.value, () => {
  updateChart()
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  updateChart()
  
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
}

const updateChart = () => {
  if (!chartInstance) return
  
  const option = {
    series: [
      {
        type: 'gauge',
        min: props.min,
        max: props.max,
        splitNumber: 5,
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [props.value / props.max, props.color],
              [1, '#E5E7EB']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: props.color
          },
          width: 4
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          distance: -30,
          color: '#6B7280',
          fontSize: 10
        },
        detail: {
          valueAnimation: true,
          formatter: `{value}${props.unit}`,
          color: '#1F2937',
          fontSize: 18,
          fontWeight: 'bold',
          offsetCenter: [0, '70%']
        },
        data: [{ value: props.value }]
      }
    ]
  }
  
  chartInstance.setOption(option)
}
</script>

<style lang="scss" scoped>
.gauge-card {
  padding: 16px;
  
  .gauge-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    
    .gauge-icon {
      font-size: 20px;
    }
    
    .gauge-title {
      font-size: 14px;
      color: #6B7280;
      font-weight: 500;
    }
  }
  
  .gauge-chart {
    width: 100%;
    height: 150px;
  }
}
</style>

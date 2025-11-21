<template>
  <div class="stat-card data-card">
    <div class="stat-header">
      <span class="stat-icon">{{ config.icon }}</span>
      <span class="stat-title">{{ config.name }}</span>
    </div>
    
    <div class="stat-content">
      <div class="stat-item">
        <div class="label">平均值</div>
        <div class="value">{{ stats.avg }} {{ config.unit }}</div>
      </div>
      
      <div class="stat-item">
        <div class="label">最大值</div>
        <div class="value max">{{ stats.max }} {{ config.unit }}</div>
      </div>
      
      <div class="stat-item">
        <div class="label">最小值</div>
        <div class="value min">{{ stats.min }} {{ config.unit }}</div>
      </div>
      
      <div class="stat-item">
        <div class="label">标准差</div>
        <div class="value">{{ stats.stdDev }} {{ config.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmId: String,
  metric: String,
  days: Number
})

const weatherStore = useWeatherStore()

const metricConfigs = {
  temperature: { name: '温度', unit: '°C', icon: '🌡️' },
  humidity: { name: '湿度', unit: '%', icon: '💧' },
  rainfall: { name: '降雨量', unit: 'mm', icon: '🌧️' },
  windSpeed: { name: '风速', unit: 'm/s', icon: '💨' }
}

const config = computed(() => metricConfigs[props.metric])

const stats = computed(() => {
  const historyData = weatherStore.getHistoryData(props.farmId, props.days)
  const values = historyData.map(item => item[props.metric])
  
  const sum = values.reduce((a, b) => a + b, 0)
  const avg = sum / values.length
  const max = Math.max(...values)
  const min = Math.min(...values)
  
  const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length
  const stdDev = Math.sqrt(variance)
  
  return {
    avg: avg.toFixed(1),
    max: max.toFixed(1),
    min: min.toFixed(1),
    stdDev: stdDev.toFixed(2)
  }
})
</script>

<style lang="scss" scoped>
.stat-card {
  .stat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #E5E7EB;
    
    .stat-icon {
      font-size: 24px;
    }
    
    .stat-title {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
    }
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .label {
        font-size: 13px;
        color: #6B7280;
      }
      
      .value {
        font-size: 16px;
        font-weight: 600;
        color: #1F2937;
        font-family: 'Courier New', monospace;
        
        &.max {
          color: #EF4444;
        }
        
        &.min {
          color: #3B82F6;
        }
      }
    }
  }
}
</style>

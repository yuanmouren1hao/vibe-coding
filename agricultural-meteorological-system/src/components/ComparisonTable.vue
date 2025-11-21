<template>
  <div class="comparison-table-wrapper">
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="metric-col">指标</th>
          <th v-for="farm in farms" :key="farm.id">{{ farm.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="metric in metrics" :key="metric.key">
          <td class="metric-name">{{ metric.name }}</td>
          <td
            v-for="farm in farms"
            :key="farm.id"
            :style="{ background: getCellColor(metric.key, farm[metric.key], metric.max) }"
          >
            {{ formatValue(farm[metric.key], metric.unit) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/store/weather'

const props = defineProps({
  farmIds: Array
})

const weatherStore = useWeatherStore()

const farms = computed(() => {
  return props.farmIds.map(id => weatherStore.getFarmById(id)).filter(Boolean)
})

const metrics = [
  { key: 'temperature', name: '温度', unit: '°C', max: 40 },
  { key: 'humidity', name: '湿度', unit: '%', max: 100 },
  { key: 'rainfall', name: '降雨量', unit: 'mm', max: 50 },
  { key: 'windSpeed', name: '风速', unit: 'm/s', max: 15 },
  { key: 'pressure', name: '气压', unit: 'hPa', max: 1030 },
  { key: 'lightIntensity', name: '光照强度', unit: 'lux', max: 10000 },
  { key: 'soilTemp', name: '土壤温度', unit: '°C', max: 40 },
  { key: 'soilMoisture', name: '土壤湿度', unit: '%', max: 100 }
]

const formatValue = (value, unit) => {
  return `${value} ${unit}`
}

const getCellColor = (key, value, max) => {
  const ratio = value / max
  const opacity = 0.1 + ratio * 0.3
  
  if (key === 'temperature') {
    return `rgba(239, 68, 68, ${opacity})`
  } else if (key === 'humidity' || key === 'soilMoisture') {
    return `rgba(59, 130, 246, ${opacity})`
  } else if (key === 'rainfall') {
    return `rgba(6, 182, 212, ${opacity})`
  } else {
    return `rgba(16, 185, 129, ${opacity})`
  }
}
</script>

<style lang="scss" scoped>
.comparison-table-wrapper {
  overflow-x: auto;
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    
    thead {
      background: #F9FAFB;
      
      th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        color: #1F2937;
        border-bottom: 2px solid #E5E7EB;
        
        &.metric-col {
          width: 120px;
          position: sticky;
          left: 0;
          background: #F9FAFB;
          z-index: 1;
        }
      }
    }
    
    tbody {
      tr {
        &:hover {
          background: #F0F9FF;
        }
        
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #E5E7EB;
          transition: background 0.2s;
          
          &.metric-name {
            font-weight: 500;
            color: #4B5563;
            position: sticky;
            left: 0;
            background: #fff;
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>

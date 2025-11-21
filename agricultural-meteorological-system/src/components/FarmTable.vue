<template>
  <div class="farm-table">
    <t-table
      :data="sortedData"
      :columns="columns"
      row-key="id"
      stripe
      hover
      size="medium"
      max-height="500"
      @row-click="handleRowClick"
    >
      <template #temperature="{ row }">
        <t-tag :theme="getTemperatureTheme(row.temperature)" variant="light">
          {{ row.temperature }}°C
        </t-tag>
      </template>
      
      <template #humidity="{ row }">
        <div class="progress-cell">
          <span>{{ row.humidity }}%</span>
          <t-progress
            :percentage="row.humidity"
            :theme="getHumidityTheme(row.humidity)"
            size="small"
          />
        </div>
      </template>
      
      <template #rainfall="{ row }">
        <span :style="{ color: getRainfallColor(row.rainfall) }">
          {{ row.rainfall }} mm
        </span>
      </template>
      
      <template #windSpeed="{ row }">
        {{ row.windSpeed }} m/s
        <span class="wind-direction">{{ row.windDirection }}</span>
      </template>
    </t-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  farmData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['farm-click'])

const sortKey = ref('temperature')
const sortOrder = ref('desc')

const columns = [
  {
    colKey: 'name',
    title: '农场名称',
    width: 180,
    fixed: 'left',
    ellipsis: true
  },
  {
    colKey: 'region',
    title: '区域',
    width: 120
  },
  {
    colKey: 'temperature',
    title: '温度',
    width: 100,
    sortType: 'all',
    sorter: true
  },
  {
    colKey: 'humidity',
    title: '湿度',
    width: 150,
    sortType: 'all',
    sorter: true
  },
  {
    colKey: 'rainfall',
    title: '降雨量',
    width: 100,
    sortType: 'all',
    sorter: true
  },
  {
    colKey: 'windSpeed',
    title: '风速/风向',
    width: 130
  }
]

const sortedData = computed(() => {
  return [...props.farmData].sort((a, b) => {
    return b.temperature - a.temperature
  })
})

const getTemperatureTheme = (temp) => {
  if (temp < 15) return 'primary'
  if (temp < 25) return 'success'
  if (temp < 30) return 'warning'
  return 'danger'
}

const getHumidityTheme = (humidity) => {
  if (humidity < 50) return 'warning'
  if (humidity > 75) return 'primary'
  return 'success'
}

const getRainfallColor = (rainfall) => {
  if (rainfall > 10) return '#EF4444'
  if (rainfall > 5) return '#F59E0B'
  return '#6B7280'
}

const handleRowClick = ({ row }) => {
  emit('farm-click', row.id)
}
</script>

<style lang="scss" scoped>
.farm-table {
  :deep(.t-table) {
    .t-table__row {
      cursor: pointer;
      
      &:hover {
        background-color: #F0F9FF !important;
      }
    }
  }

  .progress-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .wind-direction {
    margin-left: 4px;
    font-size: 12px;
    color: #6B7280;
  }
}
</style>

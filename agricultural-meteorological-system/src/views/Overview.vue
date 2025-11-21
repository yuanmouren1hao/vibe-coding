<template>
  <div class="overview-page">
    <!-- 关键指标卡片区 -->
    <div class="metrics-grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.key"
        :title="metric.title"
        :value="metric.value"
        :unit="metric.unit"
        :icon="metric.icon"
        :trend="metric.trend"
        :color="metric.color"
      />
    </div>

    <div class="content-grid">
      <!-- 地图可视化区 -->
      <div class="map-section">
        <div class="data-card">
          <h3 class="section-title">上海农场分布与实时气象</h3>
          <MapChart :farmData="weatherStore.farmDataList" @farm-click="handleFarmClick" />
        </div>
      </div>

      <!-- 农场排行榜 -->
      <div class="ranking-section">
        <div class="data-card">
          <h3 class="section-title">农场气象数据</h3>
          <FarmTable :farmData="weatherStore.farmDataList" @farm-click="handleFarmClick" />
        </div>
      </div>
    </div>

    <!-- 预警提示区 -->
    <div class="alerts-section" v-if="weatherStore.alerts.length > 0">
      <div class="data-card alert-card">
        <h3 class="section-title">⚠️ 气象预警</h3>
        <div class="alerts-list">
          <t-alert
            v-for="(alert, index) in weatherStore.alerts"
            :key="index"
            :theme="alert.type === 'danger' ? 'error' : 'warning'"
            :message="alert.message"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherStore } from '@/store/weather'
import MetricCard from '@/components/MetricCard.vue'
import MapChart from '@/components/MapChart.vue'
import FarmTable from '@/components/FarmTable.vue'

const router = useRouter()
const weatherStore = useWeatherStore()

const metrics = computed(() => {
  const avg = weatherStore.regionAverage
  if (!avg) return []
  
  return [
    {
      key: 'temperature',
      title: '区域平均温度',
      value: avg.temperature,
      unit: '°C',
      icon: '🌡️',
      trend: '+2.3%',
      color: getTemperatureColor(avg.temperature)
    },
    {
      key: 'humidity',
      title: '区域平均湿度',
      value: avg.humidity,
      unit: '%',
      icon: '💧',
      trend: '-1.2%',
      color: '#3B82F6'
    },
    {
      key: 'rainfall',
      title: '今日累计降雨',
      value: avg.rainfall,
      unit: 'mm',
      icon: '🌧️',
      trend: '+5.6%',
      color: '#06B6D4'
    },
    {
      key: 'windSpeed',
      title: '平均风速',
      value: avg.windSpeed,
      unit: 'm/s',
      icon: '💨',
      trend: '+0.8%',
      color: '#8B5CF6'
    }
  ]
})

const getTemperatureColor = (temp) => {
  if (temp < 15) return '#3B82F6' // 蓝色
  if (temp < 25) return '#10B981' // 绿色
  if (temp < 30) return '#F59E0B' // 橙色
  return '#EF4444' // 红色
}

const handleFarmClick = (farmId) => {
  router.push(`/farm/${farmId}`)
}
</script>

<style lang="scss" scoped>
.overview-page {
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .map-section,
  .ranking-section {
    .data-card {
      height: 600px;
      display: flex;
      flex-direction: column;
    }
  }

  .alerts-section {
    .alert-card {
      .alerts-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }

  .section-title {
    margin-bottom: 16px;
  }
}

@media (max-width: 1366px) {
  .overview-page {
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .content-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>

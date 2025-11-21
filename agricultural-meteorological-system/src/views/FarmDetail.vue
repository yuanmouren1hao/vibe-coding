<template>
  <div class="farm-detail-page" v-if="farmData">
    <!-- 面包屑 -->
    <t-breadcrumb class="breadcrumb">
      <t-breadcrumb-item @click="router.push('/overview')">首页</t-breadcrumb-item>
      <t-breadcrumb-item>农场详情</t-breadcrumb-item>
      <t-breadcrumb-item>{{ farmData.name }}</t-breadcrumb-item>
    </t-breadcrumb>

    <!-- 农场信息卡片 -->
    <div class="farm-info-card data-card">
      <div class="info-content">
        <div class="info-left">
          <h2 class="farm-name">{{ farmData.name }}</h2>
          <div class="info-details">
            <div class="info-item">
              <span class="label">所在区域:</span>
              <span class="value">{{ farmData.region }}</span>
            </div>
            <div class="info-item">
              <span class="label">种植面积:</span>
              <span class="value">{{ farmData.area }} 亩</span>
            </div>
            <div class="info-item">
              <span class="label">主要作物:</span>
              <span class="value">{{ farmData.crops.join('、') }}</span>
            </div>
          </div>
        </div>
        <div class="info-right">
          <div class="farm-icon">🌾</div>
        </div>
      </div>
    </div>

    <!-- 实时气象仪表盘 -->
    <div class="dashboard-section">
      <h3 class="section-title">实时气象数据</h3>
      <div class="gauges-grid">
        <GaugeCard
          title="温度"
          :value="farmData.temperature"
          unit="°C"
          :max="45"
          color="#EF4444"
          icon="🌡️"
        />
        <GaugeCard
          title="湿度"
          :value="farmData.humidity"
          unit="%"
          :max="100"
          color="#3B82F6"
          icon="💧"
        />
        <GaugeCard
          title="风速"
          :value="farmData.windSpeed"
          unit="m/s"
          :max="20"
          color="#8B5CF6"
          icon="💨"
        />
        <GaugeCard
          title="降雨量"
          :value="farmData.rainfall"
          unit="mm"
          :max="100"
          color="#06B6D4"
          icon="🌧️"
        />
        <GaugeCard
          title="气压"
          :value="farmData.pressure"
          unit="hPa"
          :min="1000"
          :max="1030"
          color="#10B981"
          icon="🌐"
        />
        <GaugeCard
          title="光照强度"
          :value="farmData.lightIntensity"
          unit="lux"
          :max="10000"
          color="#F59E0B"
          icon="☀️"
        />
        <GaugeCard
          title="土壤温度"
          :value="farmData.soilTemp"
          unit="°C"
          :max="40"
          color="#DC2626"
          icon="🌱"
        />
        <GaugeCard
          title="土壤湿度"
          :value="farmData.soilMoisture"
          unit="%"
          :max="100"
          color="#0EA5E9"
          icon="💧"
        />
      </div>
    </div>

    <div class="charts-grid">
      <!-- 24小时预测 -->
      <div class="chart-section">
        <div class="data-card">
          <h3 class="section-title">24小时气象预测</h3>
          <ForecastChart :farmData="farmData" />
        </div>
      </div>

      <!-- 适种建议 -->
      <div class="suggestions-section">
        <div class="data-card">
          <h3 class="section-title">适种建议</h3>
          <CropSuggestions :weatherData="farmData" />
        </div>
      </div>
    </div>

    <!-- 历史数据快速查看 -->
    <div class="history-preview data-card">
      <div class="history-header">
        <h3 class="section-title">过去7天气象趋势</h3>
        <t-button theme="primary" variant="outline" @click="router.push('/trend')">
          查看详细分析
        </t-button>
      </div>
      <HistoryPreview :farmId="farmData.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWeatherStore } from '@/store/weather'
import GaugeCard from '@/components/GaugeCard.vue'
import ForecastChart from '@/components/ForecastChart.vue'
import CropSuggestions from '@/components/CropSuggestions.vue'
import HistoryPreview from '@/components/HistoryPreview.vue'

const router = useRouter()
const route = useRoute()
const weatherStore = useWeatherStore()

const farmData = ref(null)

onMounted(() => {
  const farmId = route.params.id
  farmData.value = weatherStore.getFarmById(farmId)
})
</script>

<style lang="scss" scoped>
.farm-detail-page {
  .breadcrumb {
    margin-bottom: 24px;
    
    :deep(.t-breadcrumb__item) {
      cursor: pointer;
    }
  }

  .farm-info-card {
    margin-bottom: 24px;
    
    .info-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .info-left {
        flex: 1;
        
        .farm-name {
          font-size: 28px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 16px;
        }
        
        .info-details {
          display: flex;
          gap: 32px;
          
          .info-item {
            .label {
              color: #6B7280;
              margin-right: 8px;
            }
            
            .value {
              color: #1F2937;
              font-weight: 500;
            }
          }
        }
      }
      
      .info-right {
        .farm-icon {
          font-size: 80px;
          opacity: 0.3;
        }
      }
    }
  }

  .dashboard-section {
    margin-bottom: 24px;
    
    .gauges-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .history-preview {
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
}

@media (max-width: 1366px) {
  .farm-detail-page {
    .gauges-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    .charts-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>

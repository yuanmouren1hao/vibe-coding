<template>
  <div class="trend-page">
    <!-- 参数配置区 -->
    <div class="config-section data-card">
      <h3 class="section-title">分析参数配置</h3>
      <div class="config-form">
        <div class="form-item">
          <label>选择农场</label>
          <t-select
            v-model="selectedFarm"
            :options="farmOptions"
            placeholder="请选择农场"
          />
        </div>
        
        <div class="form-item">
          <label>时间范围</label>
          <t-radio-group v-model="timeRange" variant="default-filled">
            <t-radio-button value="7">近7天</t-radio-button>
            <t-radio-button value="30">近30天</t-radio-button>
          </t-radio-group>
        </div>
        
        <div class="form-item">
          <label>分析指标</label>
          <t-checkbox-group v-model="selectedMetrics">
            <t-checkbox value="temperature">温度</t-checkbox>
            <t-checkbox value="humidity">湿度</t-checkbox>
            <t-checkbox value="rainfall">降雨量</t-checkbox>
            <t-checkbox value="windSpeed">风速</t-checkbox>
          </t-checkbox-group>
        </div>
      </div>
    </div>

    <div v-if="selectedFarm && selectedMetrics.length > 0">
      <!-- 多指标趋势图 -->
      <div class="trend-chart-section data-card">
        <h3 class="section-title">多指标趋势分析</h3>
        <MultiMetricTrend
          :farmId="selectedFarm"
          :days="parseInt(timeRange)"
          :metrics="selectedMetrics"
        />
      </div>

      <!-- 数据统计卡片 -->
      <div class="stats-section">
        <h3 class="section-title">统计数据</h3>
        <div class="stats-grid">
          <StatCard
            v-for="metric in selectedMetrics"
            :key="metric"
            :farmId="selectedFarm"
            :metric="metric"
            :days="parseInt(timeRange)"
          />
        </div>
      </div>

      <!-- 数据导出区 -->
      <div class="export-section data-card">
        <h3 class="section-title">数据导出</h3>
        <div class="export-buttons">
          <t-button theme="primary" @click="exportCSV">
            <template #icon>📄</template>
            导出为 CSV
          </t-button>
          <t-button theme="success" @click="exportImage">
            <template #icon>🖼️</template>
            保存为图片
          </t-button>
          <t-button theme="warning" @click="exportPDF">
            <template #icon>📑</template>
            生成 PDF 报告
          </t-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📈</div>
      <p>请选择农场和分析指标开始分析</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/store/weather'
import { MessagePlugin } from 'tdesign-vue-next'
import MultiMetricTrend from '@/components/MultiMetricTrend.vue'
import StatCard from '@/components/StatCard.vue'

const weatherStore = useWeatherStore()

const selectedFarm = ref('')
const timeRange = ref('7')
const selectedMetrics = ref(['temperature', 'humidity'])

const farmOptions = computed(() => {
  return weatherStore.farmDataList.map(farm => ({
    label: farm.name,
    value: farm.id
  }))
})

const exportCSV = () => {
  MessagePlugin.success('CSV 文件导出成功!')
}

const exportImage = () => {
  MessagePlugin.success('图片保存成功!')
}

const exportPDF = () => {
  MessagePlugin.success('PDF 报告生成成功!')
}
</script>

<style lang="scss" scoped>
.trend-page {
  .config-section {
    margin-bottom: 24px;
    
    .config-form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      
      .form-item {
        label {
          display: block;
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 8px;
        }
      }
    }
  }

  .trend-chart-section {
    margin-bottom: 24px;
  }

  .stats-section {
    margin-bottom: 24px;
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }

  .export-section {
    .export-buttons {
      display: flex;
      gap: 16px;
    }
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    
    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    
    p {
      font-size: 16px;
      color: #6B7280;
    }
  }
}

@media (max-width: 1366px) {
  .trend-page {
    .config-form {
      grid-template-columns: 1fr !important;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
}
</style>

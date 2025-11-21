<template>
  <div class="compare-page">
    <!-- 农场选择器 -->
    <div class="farm-selector data-card">
      <div class="selector-header">
        <h3 class="section-title">选择对比农场 (2-4个)</h3>
        <div class="region-filters">
          <t-button
            v-for="region in regions"
            :key="region"
            size="small"
            :variant="selectedRegion === region ? 'base' : 'outline'"
            @click="filterByRegion(region)"
          >
            {{ region }}
          </t-button>
        </div>
      </div>
      
      <t-select
        v-model="selectedFarms"
        :options="farmOptions"
        multiple
        :max="4"
        placeholder="请选择农场"
        clearable
      />
      
      <div class="selected-farms" v-if="selectedFarms.length > 0">
        <t-tag
          v-for="farmId in selectedFarms"
          :key="farmId"
          closable
          @close="removeFarm(farmId)"
        >
          {{ getFarmName(farmId) }}
        </t-tag>
      </div>
    </div>

    <div v-if="selectedFarms.length >= 2">
      <!-- 雷达图对比 -->
      <div class="radar-section data-card">
        <h3 class="section-title">多维度雷达对比</h3>
        <RadarChart :farmIds="selectedFarms" />
      </div>

      <!-- 指标详细对比表格 -->
      <div class="comparison-table data-card">
        <h3 class="section-title">详细数据对比</h3>
        <ComparisonTable :farmIds="selectedFarms" />
      </div>

      <!-- 时间序列对比 -->
      <div class="timeline-section data-card">
        <div class="timeline-header">
          <h3 class="section-title">时间序列对比</h3>
          <t-radio-group v-model="selectedMetric" variant="default-filled">
            <t-radio-button value="temperature">温度</t-radio-button>
            <t-radio-button value="humidity">湿度</t-radio-button>
            <t-radio-button value="rainfall">降雨量</t-radio-button>
          </t-radio-group>
        </div>
        <TimelineChart :farmIds="selectedFarms" :metric="selectedMetric" />
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📊</div>
      <p>请至少选择2个农场进行对比</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/store/weather'
import RadarChart from '@/components/RadarChart.vue'
import ComparisonTable from '@/components/ComparisonTable.vue'
import TimelineChart from '@/components/TimelineChart.vue'

const weatherStore = useWeatherStore()

const selectedFarms = ref([])
const selectedRegion = ref('全部')
const selectedMetric = ref('temperature')

const regions = computed(() => {
  const allRegions = ['全部', ...new Set(weatherStore.farmDataList.map(f => f.region))]
  return allRegions
})

const farmOptions = computed(() => {
  let farms = weatherStore.farmDataList
  
  if (selectedRegion.value !== '全部') {
    farms = farms.filter(f => f.region === selectedRegion.value)
  }
  
  return farms.map(farm => ({
    label: farm.name,
    value: farm.id
  }))
})

const getFarmName = (farmId) => {
  const farm = weatherStore.getFarmById(farmId)
  return farm?.name || farmId
}

const filterByRegion = (region) => {
  selectedRegion.value = region
}

const removeFarm = (farmId) => {
  selectedFarms.value = selectedFarms.value.filter(id => id !== farmId)
}
</script>

<style lang="scss" scoped>
.compare-page {
  .farm-selector {
    margin-bottom: 24px;
    
    .selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .region-filters {
        display: flex;
        gap: 8px;
      }
    }
    
    .selected-farms {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .radar-section,
  .comparison-table,
  .timeline-section {
    margin-bottom: 24px;
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
</style>

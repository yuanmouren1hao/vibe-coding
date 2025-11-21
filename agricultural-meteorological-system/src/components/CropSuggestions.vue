<template>
  <div class="crop-suggestions">
    <div
      v-for="crop in suggestions"
      :key="crop.name"
      class="crop-card"
    >
      <div class="crop-header">
        <span class="crop-icon">🌾</span>
        <span class="crop-name">{{ crop.name }}</span>
      </div>
      <div class="crop-suitability">
        <t-progress
          :percentage="crop.suitability"
          :theme="getSuitabilityTheme(crop.suitability)"
          :label="false"
        />
        <span class="suitability-value">{{ crop.suitability }}%</span>
      </div>
      <div class="crop-reason">{{ crop.reason }}</div>
    </div>

    <div v-if="suggestions.length === 0" class="no-suggestions">
      <span class="icon">🌿</span>
      <p>当前气象条件下暂无特别推荐的作物</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCropSuggestions } from '@/mock/weatherData'

const props = defineProps({
  weatherData: Object
})

const suggestions = computed(() => {
  return getCropSuggestions(props.weatherData)
})

const getSuitabilityTheme = (value) => {
  if (value >= 90) return 'success'
  if (value >= 75) return 'primary'
  return 'warning'
}
</script>

<style lang="scss" scoped>
.crop-suggestions {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .crop-card {
    padding: 16px;
    background: #F9FAFB;
    border-radius: 8px;
    border-left: 4px solid #10B981;

    .crop-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .crop-icon {
        font-size: 24px;
      }

      .crop-name {
        font-size: 16px;
        font-weight: 600;
        color: #1F2937;
      }
    }

    .crop-suitability {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      :deep(.t-progress) {
        flex: 1;
      }

      .suitability-value {
        font-size: 18px;
        font-weight: 700;
        color: #10B981;
        min-width: 50px;
        text-align: right;
      }
    }

    .crop-reason {
      font-size: 13px;
      color: #6B7280;
      line-height: 1.6;
    }
  }

  .no-suggestions {
    text-align: center;
    padding: 40px 20px;
    color: #9CA3AF;

    .icon {
      font-size: 48px;
      display: block;
      margin-bottom: 12px;
    }

    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>

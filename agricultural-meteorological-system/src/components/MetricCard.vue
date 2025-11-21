<template>
  <div class="metric-card" :style="{ borderLeftColor: color }">
    <div class="metric-header">
      <span class="metric-icon">{{ icon }}</span>
      <span class="metric-title">{{ title }}</span>
    </div>
    <div class="metric-content">
      <div class="metric-value">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
      <div class="metric-trend" :class="trendClass">
        {{ trend }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  unit: String,
  icon: String,
  trend: String,
  color: String
})

const trendClass = computed(() => {
  if (props.trend.startsWith('+')) return 'trend-up'
  if (props.trend.startsWith('-')) return 'trend-down'
  return ''
})
</script>

<style lang="scss" scoped>
.metric-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #10B981;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .metric-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;

    .metric-icon {
      font-size: 24px;
    }

    .metric-title {
      font-size: 14px;
      color: #6B7280;
      font-weight: 500;
    }
  }

  .metric-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .metric-value {
      .value {
        font-size: 32px;
        font-weight: 700;
        color: #1F2937;
        font-family: 'Courier New', monospace;
      }

      .unit {
        font-size: 16px;
        color: #6B7280;
        margin-left: 4px;
      }
    }

    .metric-trend {
      font-size: 14px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;

      &.trend-up {
        color: #EF4444;
        background: #FEE2E2;
      }

      &.trend-down {
        color: #10B981;
        background: #D1FAE5;
      }
    }
  }
}
</style>

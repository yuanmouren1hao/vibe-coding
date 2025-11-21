<template>
  <div class="layout-container">
    <t-layout>
      <!-- 侧边导航 -->
      <t-aside :width="240">
        <div class="sidebar">
          <div class="logo-section">
            <div class="logo-icon">🌾</div>
            <div class="logo-text">
              <div class="logo-title">上海农业气象</div>
              <div class="logo-subtitle">服务平台</div>
            </div>
          </div>
          
          <t-menu
            :value="activeMenu"
            theme="light"
            @change="handleMenuChange"
          >
            <t-menu-item value="/overview">
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
              </template>
              区域气象总览
            </t-menu-item>
            
            <t-menu-item value="/compare">
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </template>
              多农场对比
            </t-menu-item>
            
            <t-menu-item value="/trend">
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </template>
              历史趋势分析
            </t-menu-item>
          </t-menu>
          
          <div class="sidebar-footer">
            <div class="update-time">
              <div class="label">数据更新时间</div>
              <div class="time">{{ formattedUpdateTime }}</div>
            </div>
            <t-button
              theme="primary"
              variant="outline"
              block
              @click="handleRefresh"
            >
              刷新数据
            </t-button>
          </div>
        </div>
      </t-aside>

      <!-- 主内容区 -->
      <t-layout>
        <t-header class="header">
          <div class="header-content">
            <div class="header-left">
              <h1 class="page-title">{{ currentPageTitle }}</h1>
            </div>
            <div class="header-right">
              <div class="current-time">{{ currentTime }}</div>
            </div>
          </div>
        </t-header>

        <t-content class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWeatherStore } from '@/store/weather'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const weatherStore = useWeatherStore()

const activeMenu = ref('/overview')
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

let timeInterval = null

onMounted(() => {
  weatherStore.initData()
  activeMenu.value = route.path
  
  // 每秒更新当前时间
  timeInterval = setInterval(() => {
    currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

const formattedUpdateTime = computed(() => {
  return dayjs(weatherStore.lastUpdateTime).format('HH:mm:ss')
})

const currentPageTitle = computed(() => {
  return route.meta.title || '上海农业气象服务平台'
})

const handleMenuChange = (value) => {
  activeMenu.value = value
  router.push(value)
}

const handleRefresh = () => {
  weatherStore.refreshData()
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  height: 100%;
  background: #fff;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  
  .logo-section {
    padding: 24px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #E5E7EB;
    
    .logo-icon {
      font-size: 36px;
    }
    
    .logo-text {
      flex: 1;
      
      .logo-title {
        font-size: 16px;
        font-weight: 600;
        color: #1E3A8A;
        line-height: 1.4;
      }
      
      .logo-subtitle {
        font-size: 14px;
        color: #6B7280;
        line-height: 1.4;
      }
    }
  }
  
  :deep(.t-menu) {
    flex: 1;
    border: none;
    
    .t-menu__item {
      margin: 4px 12px;
      border-radius: 6px;
      
      &.t-is-active {
        background: #EFF6FF;
        color: #1E3A8A;
      }
    }
  }
  
  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid #E5E7EB;
    
    .update-time {
      margin-bottom: 12px;
      padding: 12px;
      background: #F9FAFB;
      border-radius: 6px;
      
      .label {
        font-size: 12px;
        color: #6B7280;
        margin-bottom: 4px;
      }
      
      .time {
        font-size: 14px;
        font-weight: 600;
        color: #1F2937;
        font-family: 'Courier New', monospace;
      }
    }
  }
}

.header {
  background: #fff;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 32px;
  height: 64px;
  
  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
    }
    
    .current-time {
      font-size: 14px;
      color: #6B7280;
      font-family: 'Courier New', monospace;
    }
  }
}

.main-content {
  padding: 24px;
  overflow-y: auto;
  background: #F9FAFB;
}
</style>

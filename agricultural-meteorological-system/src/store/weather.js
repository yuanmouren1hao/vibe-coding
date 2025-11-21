import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateMockData, generateHistoryData } from '@/mock/weatherData'

export const useWeatherStore = defineStore('weather', () => {
  // 所有农场的实时数据
  const farmDataList = ref([])
  
  // 历史数据缓存
  const historyDataCache = ref({})
  
  // 更新时间
  const lastUpdateTime = ref(new Date())

  // 初始化数据
  const initData = () => {
    farmDataList.value = generateMockData()
    lastUpdateTime.value = new Date()
  }

  // 刷新数据
  const refreshData = () => {
    farmDataList.value = generateMockData()
    lastUpdateTime.value = new Date()
  }

  // 根据 ID 获取农场数据
  const getFarmById = (id) => {
    return farmDataList.value.find(farm => farm.id === id)
  }

  // 获取历史数据
  const getHistoryData = (farmId, days = 7) => {
    const cacheKey = `${farmId}_${days}`
    if (!historyDataCache.value[cacheKey]) {
      historyDataCache.value[cacheKey] = generateHistoryData(farmId, days)
    }
    return historyDataCache.value[cacheKey]
  }

  // 计算区域平均值
  const regionAverage = computed(() => {
    if (farmDataList.value.length === 0) return null
    
    const sum = farmDataList.value.reduce((acc, farm) => ({
      temperature: acc.temperature + farm.temperature,
      humidity: acc.humidity + farm.humidity,
      rainfall: acc.rainfall + farm.rainfall,
      windSpeed: acc.windSpeed + farm.windSpeed
    }), { temperature: 0, humidity: 0, rainfall: 0, windSpeed: 0 })

    const count = farmDataList.value.length
    return {
      temperature: (sum.temperature / count).toFixed(1),
      humidity: (sum.humidity / count).toFixed(1),
      rainfall: (sum.rainfall / count).toFixed(1),
      windSpeed: (sum.windSpeed / count).toFixed(1)
    }
  })

  // 获取预警信息
  const alerts = computed(() => {
    const alertList = []
    farmDataList.value.forEach(farm => {
      if (farm.temperature > 35) {
        alertList.push({
          type: 'danger',
          farmName: farm.name,
          message: `${farm.name}温度异常偏高(${farm.temperature}°C),建议加强灌溉`
        })
      }
      if (farm.temperature < 5) {
        alertList.push({
          type: 'warning',
          farmName: farm.name,
          message: `${farm.name}温度偏低(${farm.temperature}°C),注意防寒保暖`
        })
      }
      if (farm.rainfall > 50) {
        alertList.push({
          type: 'warning',
          farmName: farm.name,
          message: `${farm.name}降雨量较大(${farm.rainfall}mm),注意排水防涝`
        })
      }
    })
    return alertList
  })

  return {
    farmDataList,
    lastUpdateTime,
    regionAverage,
    alerts,
    initData,
    refreshData,
    getFarmById,
    getHistoryData
  }
})

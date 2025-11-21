import dayjs from 'dayjs'

// 上海各区域农场配置
const farmConfigs = [
  { id: 'farm1', name: '浦东新区绿谷农场', region: '浦东新区', area: 280, crops: ['水稻', '蔬菜'], location: [121.6, 31.2] },
  { id: 'farm2', name: '崇明生态农庄', region: '崇明区', area: 450, crops: ['有机蔬菜', '水果'], location: [121.4, 31.6] },
  { id: 'farm3', name: '松江家庭农场', region: '松江区', area: 180, crops: ['草莓', '葡萄'], location: [121.2, 31.0] },
  { id: 'farm4', name: '青浦现代农业园', region: '青浦区', area: 520, crops: ['水稻', '玉米'], location: [121.1, 31.15] },
  { id: 'farm5', name: '金山农业基地', region: '金山区', area: 380, crops: ['蔬菜', '花卉'], location: [121.3, 30.9] },
  { id: 'farm6', name: '奉贤都市农场', region: '奉贤区', area: 320, crops: ['水稻', '水产'], location: [121.5, 30.9] },
  { id: 'farm7', name: '嘉定智慧农场', region: '嘉定区', area: 240, crops: ['蔬菜', '水果'], location: [121.25, 31.35] },
  { id: 'farm8', name: '闵行科技农场', region: '闵行区', area: 200, crops: ['有机蔬菜', '草莓'], location: [121.38, 31.1] },
  { id: 'farm9', name: '宝山现代农业示范区', region: '宝山区', area: 350, crops: ['水稻', '蔬菜'], location: [121.45, 31.4] },
  { id: 'farm10', name: '浦东川沙农业园', region: '浦东新区', area: 290, crops: ['水果', '花卉'], location: [121.7, 31.18] }
]

// 生成随机数
const random = (min, max, decimals = 1) => {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

// 生成单个农场的实时数据
const generateFarmData = (config) => {
  const baseTemp = 22 + random(-8, 12)
  
  return {
    ...config,
    // 气象数据
    temperature: random(baseTemp - 2, baseTemp + 2, 1), // 温度 (°C)
    humidity: random(45, 85, 1), // 湿度 (%)
    rainfall: random(0, 15, 1), // 降雨量 (mm)
    windSpeed: random(1, 8, 1), // 风速 (m/s)
    windDirection: ['北', '东北', '东', '东南', '南', '西南', '西', '西北'][Math.floor(Math.random() * 8)],
    pressure: random(1010, 1025, 1), // 气压 (hPa)
    lightIntensity: random(3000, 8000, 0), // 光照强度 (lux)
    soilTemp: random(baseTemp - 3, baseTemp + 1, 1), // 土壤温度 (°C)
    soilMoisture: random(35, 75, 1), // 土壤湿度 (%)
    
    // 统计数据
    todayMaxTemp: random(baseTemp + 2, baseTemp + 6, 1),
    todayMinTemp: random(baseTemp - 4, baseTemp - 1, 1),
    
    // 更新时间
    updateTime: new Date()
  }
}

// 生成所有农场的 Mock 数据
export const generateMockData = () => {
  return farmConfigs.map(config => generateFarmData(config))
}

// 生成历史数据
export const generateHistoryData = (farmId, days = 7) => {
  const data = []
  const now = dayjs()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = now.subtract(i, 'day')
    const baseTemp = 22 + random(-6, 8)
    
    // 每天生成24个数据点(每小时一个)
    for (let hour = 0; hour < 24; hour++) {
      data.push({
        time: date.hour(hour).format('YYYY-MM-DD HH:00'),
        timestamp: date.hour(hour).valueOf(),
        temperature: random(baseTemp - 3, baseTemp + 3, 1),
        humidity: random(50, 80, 1),
        rainfall: hour >= 6 && hour <= 18 ? random(0, 3, 1) : 0,
        windSpeed: random(2, 7, 1),
        pressure: random(1012, 1022, 1),
        lightIntensity: hour >= 6 && hour <= 18 ? random(1000, 8000, 0) : 0
      })
    }
  }
  
  return data
}

// 生成24小时预测数据
export const generate24HourForecast = (currentData) => {
  const data = []
  const now = dayjs()
  const baseTemp = currentData.temperature
  
  for (let i = 0; i < 24; i++) {
    const time = now.add(i, 'hour')
    const hour = time.hour()
    
    // 模拟温度日变化
    let tempOffset = 0
    if (hour >= 6 && hour <= 14) {
      tempOffset = (hour - 6) * 0.8 // 升温
    } else if (hour > 14 && hour <= 20) {
      tempOffset = (20 - hour) * 0.6 // 降温
    } else {
      tempOffset = -3 // 夜间低温
    }
    
    data.push({
      time: time.format('HH:00'),
      hour: time.format('YYYY-MM-DD HH:00'),
      temperature: random(baseTemp + tempOffset - 1, baseTemp + tempOffset + 1, 1),
      humidity: random(currentData.humidity - 5, currentData.humidity + 5, 1),
      rainfall: random(0, 2, 1),
      windSpeed: random(currentData.windSpeed - 1, currentData.windSpeed + 2, 1)
    })
  }
  
  return data
}

// 获取作物适种建议
export const getCropSuggestions = (weatherData) => {
  const { temperature, humidity, rainfall } = weatherData
  const suggestions = []
  
  // 水稻
  if (temperature >= 18 && temperature <= 30 && humidity >= 60) {
    suggestions.push({
      name: '水稻',
      suitability: random(85, 98, 0),
      reason: '温湿度适宜,适合水稻生长'
    })
  }
  
  // 蔬菜
  if (temperature >= 15 && temperature <= 28) {
    suggestions.push({
      name: '叶菜类蔬菜',
      suitability: random(80, 95, 0),
      reason: '温度适中,适合蔬菜种植'
    })
  }
  
  // 草莓
  if (temperature >= 15 && temperature <= 25 && humidity <= 70) {
    suggestions.push({
      name: '草莓',
      suitability: random(75, 90, 0),
      reason: '气候条件适宜草莓生长'
    })
  }
  
  // 玉米
  if (temperature >= 20 && temperature <= 30) {
    suggestions.push({
      name: '玉米',
      suitability: random(70, 88, 0),
      reason: '温度适宜玉米生长期'
    })
  }
  
  // 花卉
  if (temperature >= 16 && temperature <= 26 && humidity >= 50 && humidity <= 70) {
    suggestions.push({
      name: '观赏花卉',
      suitability: random(82, 95, 0),
      reason: '温湿度平衡,适合花卉培育'
    })
  }
  
  // 水果
  if (temperature >= 18 && temperature <= 28 && rainfall < 10) {
    suggestions.push({
      name: '葡萄',
      suitability: random(78, 92, 0),
      reason: '气候干燥适中,利于水果成熟'
    })
  }
  
  return suggestions.sort((a, b) => b.suitability - a.suitability).slice(0, 4)
}

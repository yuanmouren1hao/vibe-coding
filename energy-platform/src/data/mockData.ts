export interface PowerData {
  time: string
  solar: number
  wind: number
  hydro: number
}

export interface MapStation {
  id: string
  name: string
  type: 'solar' | 'wind' | 'hydro'
  lat: number
  lng: number
  capacity: number
  status: 'online' | 'offline' | 'maintenance'
}

export interface StorageDevice {
  id: string
  name: string
  type: 'battery' | 'hydro' | 'thermal'
  capacity: number
  current: number
  charge: number
  discharge: number
  status: 'charging' | 'discharging' | 'idle'
}

export interface HistoricalData {
  month: string
  solar: number
  wind: number
  hydro: number
}

export interface WeatherData {
  time: string
  condition: 'sunny' | 'cloudy' | 'windy'
  temperature: number
  windSpeed: number
}

export interface PlatformData {
  totalCapacity: number
  realTimePower: number
  carbonReduction: number
  efficiency: number
}

// 实时发电数据（24小时）
export const realTimePowerData: PowerData[] = [
  { time: '0', solar: 0, wind: 120, hydro: 180 },
  { time: '3', solar: 0, wind: 135, hydro: 175 },
  { time: '6', solar: 15, wind: 140, hydro: 170 },
  { time: '9', solar: 95, wind: 150, hydro: 165 },
  { time: '12', solar: 165, wind: 145, hydro: 160 },
  { time: '15', solar: 140, wind: 155, hydro: 155 },
  { time: '18', solar: 70, wind: 160, hydro: 150 },
  { time: '21', solar: 5, wind: 135, hydro: 145 },
  { time: '24', solar: 0, wind: 125, hydro: 140 },
]

// 电站分布数据
export const mapStations: MapStation[] = [
  { id: 's1', name: '内蒙古光伏电站', type: 'solar', lat: 40.8, lng: 111.7, capacity: 120, status: 'online' },
  { id: 's2', name: '新疆光伏电站', type: 'solar', lat: 43.8, lng: 87.6, capacity: 150, status: 'online' },
  { id: 's3', name: '青海光伏电站', type: 'solar', lat: 36.6, lng: 101.8, capacity: 180, status: 'online' },
  { id: 's4', name: '甘肃光伏电站', type: 'solar', lat: 38.0, lng: 100.0, capacity: 100, status: 'online' },
  { id: 's5', name: '宁夏光伏电站', type: 'solar', lat: 38.5, lng: 106.3, capacity: 90, status: 'online' },
  { id: 's6', name: '西藏光伏电站', type: 'solar', lat: 31.0, lng: 91.0, capacity: 80, status: 'online' },
  { id: 's7', name: '江苏光伏电站', type: 'solar', lat: 32.0, lng: 119.0, capacity: 70, status: 'online' },
  { id: 's8', name: '山东光伏电站', type: 'solar', lat: 36.7, lng: 117.0, capacity: 85, status: 'online' },
  
  { id: 'w1', name: '内蒙古风电场', type: 'wind', lat: 42.5, lng: 115.0, capacity: 200, status: 'online' },
  { id: 'w2', name: '甘肃风电场', type: 'wind', lat: 40.0, lng: 96.0, capacity: 180, status: 'online' },
  { id: 'w3', name: '新疆风电场', type: 'wind', lat: 45.0, lng: 85.0, capacity: 220, status: 'online' },
  { id: 'w4', name: '河北风电场', type: 'wind', lat: 40.8, lng: 115.5, capacity: 150, status: 'online' },
  { id: 'w5', name: '山东风电场', type: 'wind', lat: 37.5, lng: 120.5, capacity: 130, status: 'online' },
  { id: 'w6', name: '江苏风电场', type: 'wind', lat: 32.5, lng: 120.8, capacity: 140, status: 'online' },
  { id: 'w7', name: '福建风电场', type: 'wind', lat: 26.0, lng: 119.3, capacity: 120, status: 'online' },
  { id: 'w8', name: '广东风电场', type: 'wind', lat: 22.5, lng: 113.3, capacity: 110, status: 'online' },
  
  { id: 'h1', name: '四川水电站', type: 'hydro', lat: 30.0, lng: 103.0, capacity: 300, status: 'online' },
  { id: 'h2', name: '云南水电站', type: 'hydro', lat: 25.0, lng: 102.7, capacity: 280, status: 'online' },
  { id: 'h3', name: '贵州水电站', type: 'hydro', lat: 26.6, lng: 106.7, capacity: 200, status: 'online' },
  { id: 'h4', name: '湖北水电站', type: 'hydro', lat: 30.6, lng: 114.3, capacity: 250, status: 'online' },
  { id: 'h5', name: '湖南水电站', type: 'hydro', lat: 28.2, lng: 112.9, capacity: 180, status: 'online' },
  { id: 'h6', name: '广西水电站', type: 'hydro', lat: 23.8, lng: 108.3, capacity: 160, status: 'online' },
]

// 储能设备状态
export const storageDevices: StorageDevice[] = [
  {
    id: 'b1',
    name: '电池',
    type: 'battery',
    capacity: 2.3,
    current: 2.3,
    charge: 0.046,
    discharge: 0,
    status: 'charging'
  },
  {
    id: 'h1',
    name: '水电',
    type: 'hydro',
    capacity: 1000,
    current: 700,
    charge: 0.7,
    discharge: 0,
    status: 'charging'
  },
  {
    id: 't1',
    name: '热储存',
    type: 'thermal',
    capacity: 2000,
    current: 400,
    charge: 0.4,
    discharge: 0,
    status: 'discharging'
  }
]

// 历史运行数据（12个月）
export const historicalData: HistoricalData[] = [
  { month: '2024年1月', solar: 135, wind: 180, hydro: 145 },
  { month: '2024年2月', solar: 145, wind: 195, hydro: 150 },
  { month: '2024年3月', solar: 155, wind: 185, hydro: 155 },
  { month: '2024年4月', solar: 165, wind: 200, hydro: 148 },
  { month: '2024年5月', solar: 158, wind: 175, hydro: 142 },
  { month: '2024年6月', solar: 170, wind: 188, hydro: 138 },
  { month: '2024年7月', solar: 185, wind: 165, hydro: 135 },
  { month: '2024年8月', solar: 192, wind: 172, hydro: 132 },
  { month: '2024年9月', solar: 178, wind: 195, hydro: 140 },
  { month: '2024年10月', solar: 188, wind: 208, hydro: 145 },
  { month: '2024年11月', solar: 195, wind: 215, hydro: 152 },
  { month: '2024年12月', solar: 205, wind: 198, hydro: 158 },
]

// 天气预报
export const weatherForecast: WeatherData[] = [
  { time: '未来48小时', condition: 'sunny', temperature: 18, windSpeed: 15 },
]

// 能源结构数据
export const energyStructure = {
  solar: 20.5,
  wind: 22.7,
  hydro: 35.3,
  thermal: 15.3
}

// 平台总体数据
export const mockData: PlatformData = {
  totalCapacity: 2.5,
  realTimePower: 1.8,
  carbonReduction: 1200,
  efficiency: 94.5
}

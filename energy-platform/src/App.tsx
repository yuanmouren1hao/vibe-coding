import { useState, useEffect } from 'react'
import { Card } from 'tdesign-react'
import { BsBatteryCharging, BsLightningChargeFill, BsGraphUp } from 'react-icons/bs'
import RealTimePowerChart from './components/RealTimePowerChart'
import ChinaMap from './components/ChinaMap'
import StorageStatus from './components/StorageStatus'
import EfficiencyGauge from './components/EfficiencyGauge'
import EnergyStructure from './components/EnergyStructure'
import HistoricalDataChart from './components/HistoricalDataChart'
import WeatherForecast from './components/WeatherForecast'
import { mockData } from './data/mockData'

function App() {
  const [data, setData] = useState(mockData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        realTimePower: prevData.realTimePower + (Math.random() - 0.5) * 0.1,
        efficiency: Math.min(100, Math.max(0, prevData.efficiency + (Math.random() - 0.5) * 2))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#1e2936] p-4">
      {/* Header */}
      <header className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0ea5e9]">
          <BsLightningChargeFill className="text-lg text-white" />
        </div>
        <h1 className="text-xl font-medium text-white">
          新能源虚拟电厂管理平台
        </h1>
      </header>

      {/* Top Stats - 4 cards in one row */}
      <div className="mb-4 grid grid-cols-4 gap-4">
        <Card className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <BsGraphUp className="text-emerald-400" />
              <span>总装机容量</span>
            </div>
            <div className="text-2xl font-bold text-[#0ea5e9]">
              {data.totalCapacity} <span className="text-base text-gray-400">GW</span>
            </div>
          </div>
        </Card>

        <Card className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <BsLightningChargeFill className="text-blue-400" />
              <span>实时发电量</span>
            </div>
            <div className="text-2xl font-bold text-[#0ea5e9]">
              {data.realTimePower.toFixed(1)} <span className="text-base text-gray-400">GW</span>
            </div>
          </div>
        </Card>

        <Card className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <BsBatteryCharging className="text-green-400" />
              <span>碳减排</span>
            </div>
            <div className="text-2xl font-bold text-[#0ea5e9]">
              {data.carbonReduction} <span className="text-base text-gray-400">吨</span>
            </div>
          </div>
        </Card>

        <Card className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <BsGraphUp className="text-purple-400" />
              <span>运行效率</span>
            </div>
            <div className="text-2xl font-bold text-[#0ea5e9]">
              {data.efficiency.toFixed(1)}<span className="text-base text-gray-400">%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid - 3 columns */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="col-span-3 space-y-4">
          <RealTimePowerChart />
          <EnergyStructure />
        </div>

        {/* Center Column */}
        <div className="col-span-6 space-y-4">
          <ChinaMap />
          <HistoricalDataChart />
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-4">
          <StorageStatus />
          <EfficiencyGauge efficiency={data.efficiency} />
          <WeatherForecast />
        </div>
      </div>
    </div>
  )
}

export default App

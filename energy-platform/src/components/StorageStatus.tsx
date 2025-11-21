import { Card, Progress } from 'tdesign-react'
import { BsBatteryCharging } from 'react-icons/bs'
import { storageDevices } from '../data/mockData'

const StorageStatus = () => {
  const getIconColor = (type: string) => {
    switch (type) {
      case 'battery':
        return 'text-green-400'
      case 'hydro':
        return 'text-cyan-400'
      case 'thermal':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }

  const getProgressColor = (type: string) => {
    switch (type) {
      case 'battery':
        return '#22c55e'
      case 'hydro':
        return '#22d3ee'
      case 'thermal':
        return '#fb923c'
      default:
        return '#64748b'
    }
  }

  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">储能状态</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="space-y-4 p-2">
        {storageDevices.map((device) => {
          const percentage = (device.current / device.capacity) * 100

          return (
            <div key={device.id} className="space-y-2">
              {/* 设备信息 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BsBatteryCharging className={getIconColor(device.type)} />
                  <span className="text-sm text-gray-300">{device.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#0ea5e9]">{percentage.toFixed(0)}%</div>
                </div>
              </div>

              {/* 状态信息 */}
              <div className="text-xs text-gray-400">
                {device.status === 'charging' ? '充电中' : 
                 device.status === 'discharging' ? '放电中' : '空闲'}
              </div>

              {/* 进度条 */}
              <Progress 
                percentage={percentage} 
                strokeWidth={8}
                color={getProgressColor(device.type)}
                trackColor="#2a3f54"
              />

              {/* 详细数据 */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-[#2a3f54]/50 p-2">
                  <div className="text-gray-400">充电</div>
                  <div className="font-semibold text-gray-200">
                    {device.type === 'battery' 
                      ? `${(device.charge * 100).toFixed(0)}%` 
                      : `${(device.charge * 100).toFixed(0)}吨`}
                  </div>
                </div>
                <div className="rounded bg-[#2a3f54]/50 p-2">
                  <div className="text-gray-400">容量</div>
                  <div className="font-semibold text-gray-200">
                    {device.type === 'battery' 
                      ? `${device.capacity}GW` 
                      : `${device.capacity}吨`}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default StorageStatus

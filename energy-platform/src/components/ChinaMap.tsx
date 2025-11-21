import { Card } from 'tdesign-react'
import { mapStations } from '../data/mockData'
import { BsSun, BsWind } from 'react-icons/bs'
import { IoWater } from 'react-icons/io5'

const ChinaMap = () => {
  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">电站分布</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="relative h-[320px] overflow-hidden rounded bg-[#2a3f54] p-4">
        {/* 中国地图轮廓 SVG */}
        <svg 
          viewBox="0 0 800 600" 
          className="absolute inset-0 h-full w-full opacity-40"
        >
          <path
            d="M 650 150 L 680 180 L 670 220 L 640 240 L 620 270 L 600 300 L 580 330 L 560 350 L 530 360 L 500 380 L 480 400 L 450 420 L 420 430 L 380 440 L 350 440 L 320 430 L 290 420 L 260 400 L 240 380 L 220 360 L 200 340 L 180 320 L 170 300 L 160 280 L 150 260 L 140 240 L 130 220 L 125 200 L 130 180 L 140 160 L 160 140 L 180 130 L 200 125 L 220 120 L 240 115 L 260 115 L 280 120 L 300 125 L 320 135 L 340 145 L 360 155 L 380 165 L 400 170 L 420 175 L 440 180 L 460 185 L 480 185 L 500 180 L 520 175 L 540 170 L 560 165 L 580 160 L 600 155 L 620 152 L 640 150 Z"
            fill="none"
            stroke="#4a6b8a"
            strokeWidth="2"
          />
        </svg>

        {/* 图例 */}
        <div className="absolute left-2 top-2 space-y-1 rounded bg-[#3b4f63]/80 p-2 text-xs">
          <div className="flex items-center gap-2">
            <BsSun className="text-yellow-400" />
            <span className="text-gray-400">太阳分布</span>
          </div>
          <div className="flex items-center gap-2">
            <BsWind className="text-emerald-400" />
            <span className="text-gray-400">风能分布</span>
          </div>
          <div className="flex items-center gap-2">
            <IoWater className="text-cyan-400" />
            <span className="text-gray-400">水电分布</span>
          </div>
        </div>

        {/* 电站标记点 */}
        {mapStations.map((station) => {
          const x = (station.lng - 73) * 8
          const y = (54 - station.lat) * 10

          const getIcon = () => {
            if (station.type === 'solar') return <BsSun className="text-yellow-400" />
            if (station.type === 'wind') return <BsWind className="text-emerald-400" />
            return <IoWater className="text-cyan-400" />
          }

          const color = 
            station.type === 'solar' ? '#fbbf24' : 
            station.type === 'wind' ? '#34d399' : 
            '#22d3ee'

          return (
            <div
              key={station.id}
              className="absolute group cursor-pointer"
              style={{ 
                left: `${x}px`, 
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* 图标 */}
              <div className="relative z-10">
                {getIcon()}
              </div>
              
              {/* 脉冲动画 */}
              <div 
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 animate-ping"
                style={{ 
                  backgroundColor: color,
                  animationDuration: '2s'
                }}
              />

              {/* 悬浮信息 */}
              <div className="absolute left-full top-0 ml-2 hidden min-w-[120px] rounded bg-[#3b4f63]/95 p-2 text-xs text-white shadow-lg group-hover:block z-20">
                <div className="font-semibold text-[#0ea5e9]">{station.name}</div>
                <div className="mt-1 text-gray-400">容量: {station.capacity}MW</div>
                <div className="text-gray-400">状态: 
                  <span className="ml-1 text-green-400">
                    {station.status === 'online' ? '在线' : station.status === 'offline' ? '离线' : '维护中'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default ChinaMap

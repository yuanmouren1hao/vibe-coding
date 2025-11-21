import { Card } from 'tdesign-react'
import { BsCloudSun } from 'react-icons/bs'

const WeatherForecast = () => {
  const weatherIcons = [
    { type: 'sunny', icon: '☀️', label: '晴' },
    { type: 'cloudy', icon: '☁️', label: '多云' },
    { type: 'windy', icon: '💨', label: '大风' }
  ]

  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">天气预报</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="space-y-3 p-2">
        {/* 天气图标展示 */}
        <div className="flex items-center justify-around rounded bg-[#2a3f54]/60 p-3">
          {weatherIcons.map((weather) => (
            <div key={weather.type} className="text-center">
              <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#3b4f63]/50 text-2xl">
                {weather.icon}
              </div>
              <div className="text-xs text-gray-400">{weather.label}</div>
            </div>
          ))}
        </div>

        {/* 预报信息 */}
        <div className="space-y-2">
          <div className="rounded bg-[#2a3f54]/50 p-2">
            <div className="mb-2 text-xs font-semibold text-gray-300">未来48小时</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">温度</div>
                <div className="mt-1 text-base font-bold text-[#0ea5e9]">18°C</div>
              </div>
              <div>
                <div className="text-gray-400">风速</div>
                <div className="mt-1 text-base font-bold text-[#0ea5e9]">15m/s</div>
              </div>
            </div>
          </div>

          {/* 发电预测 */}
          <div className="rounded bg-[#2a3f54]/50 p-2">
            <div className="mb-2 flex items-center gap-1 text-xs">
              <BsCloudSun className="text-[#0ea5e9]" />
              <span className="font-semibold text-gray-300">发电预测</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">光伏发电</span>
                <span className="font-semibold text-yellow-400">较好 ↑</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">风力发电</span>
                <span className="font-semibold text-green-400">优秀 ↑</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">水力发电</span>
                <span className="font-semibold text-cyan-400">稳定 →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default WeatherForecast

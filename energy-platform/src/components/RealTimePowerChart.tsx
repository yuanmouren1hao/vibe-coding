import { Card } from 'tdesign-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { realTimePowerData } from '../data/mockData'
import { BsSun, BsWind } from 'react-icons/bs'
import { IoWater } from 'react-icons/io5'

const RealTimePowerChart = () => {
  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">实时发电量</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="space-y-4 p-2">
        {/* 太阳能 */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <BsSun className="text-yellow-400" />
            <span className="text-xs text-gray-400">太阳</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={realTimePowerData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={false}
              />
              <YAxis 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                domain={[0, 200]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2a3f54', 
                  border: '1px solid #4a6b8a',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="solar" 
                stroke="#fbbf24" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 风能 */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <BsWind className="text-emerald-400" />
            <span className="text-xs text-gray-400">风能</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={realTimePowerData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={false}
              />
              <YAxis 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                domain={[0, 200]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2a3f54', 
                  border: '1px solid #4a6b8a',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="wind" 
                stroke="#34d399" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 水电 */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <IoWater className="text-cyan-400" />
            <span className="text-xs text-gray-400">水电</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={realTimePowerData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={false}
              />
              <YAxis 
                stroke="#4a6b8a" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                domain={[0, 200]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2a3f54', 
                  border: '1px solid #4a6b8a',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="hydro" 
                stroke="#22d3ee" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

export default RealTimePowerChart

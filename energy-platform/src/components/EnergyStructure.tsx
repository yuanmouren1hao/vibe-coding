import { Card } from 'tdesign-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { energyStructure } from '../data/mockData'

const EnergyStructure = () => {
  const data = [
    { name: '光源', value: energyStructure.solar, color: '#fbbf24' },
    { name: '风源', value: energyStructure.wind, color: '#34d399' },
    { name: '水源', value: energyStructure.hydro, color: '#22d3ee' },
    { name: '能源', value: energyStructure.thermal, color: '#f87171' }
  ]

  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">能源结构</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="p-2">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
              outerRadius={60}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 图例 */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 rounded bg-[#2a3f54]/50 p-2">
              <div 
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex-1">
                <div className="text-xs font-bold" style={{ color: item.color }}>
                  {item.value}%
                </div>
                <div className="text-xs text-gray-400">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default EnergyStructure

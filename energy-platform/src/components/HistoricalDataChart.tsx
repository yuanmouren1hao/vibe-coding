import { Card } from 'tdesign-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { historicalData } from '../data/mockData'

const HistoricalDataChart = () => {
  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">历史运行数据</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="p-2">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={historicalData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#4a6b8a" 
              tick={{ fill: '#6b7280', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              axisLine={false}
            />
            <YAxis 
              stroke="#4a6b8a" 
              tick={{ fill: '#6b7280', fontSize: 10 }}
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
            <Legend 
              wrapperStyle={{
                paddingTop: '10px',
                fontSize: '12px'
              }}
              iconType="rect"
              iconSize={12}
            />
            <Bar dataKey="solar" fill="#fbbf24" name="光能" radius={[2, 2, 0, 0]} barSize={12} />
            <Bar dataKey="wind" fill="#34d399" name="风能" radius={[2, 2, 0, 0]} barSize={12} />
            <Bar dataKey="hydro" fill="#22d3ee" name="水电" radius={[2, 2, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default HistoricalDataChart

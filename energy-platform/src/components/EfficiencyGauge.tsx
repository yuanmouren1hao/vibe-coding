import { Card } from 'tdesign-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface EfficiencyGaugeProps {
  efficiency: number
}

const EfficiencyGauge = ({ efficiency }: EfficiencyGaugeProps) => {
  const data = [
    { name: '效率', value: efficiency },
    { name: '剩余', value: 100 - efficiency }
  ]

  const COLORS = ['#22d3ee', '#2a3f54']

  const getLevel = (eff: number) => {
    if (eff >= 90) return { text: '优秀', color: '#22c55e', range: '>90%' }
    if (eff >= 70) return { text: '良好', color: '#fbbf24', range: '70-90%' }
    return { text: '一般', color: '#fb923c', range: '<70%' }
  }

  const level = getLevel(efficiency)

  return (
    <Card 
      title={<span className="text-sm text-[#0ea5e9]">效率分析</span>}
      className="border-0 bg-[#3b4f63]/60 backdrop-blur-sm"
    >
      <div className="relative p-2">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 中心文字 */}
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-[#22d3ee]">
            {efficiency.toFixed(0)}
          </div>
          <div className="mt-1 text-xs text-gray-400">效率分析</div>
        </div>

        {/* 刻度标记 */}
        <div className="mt-2 flex justify-between px-2 text-xs text-gray-500">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>

        {/* 指标说明 */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded bg-[#2a3f54]/50 p-2">
            <div className="text-gray-400">优秀</div>
            <div className="mt-1 font-semibold text-green-400">&gt;90%</div>
          </div>
          <div className="rounded bg-[#2a3f54]/50 p-2">
            <div className="text-gray-400">良好</div>
            <div className="mt-1 font-semibold text-yellow-400">70-90%</div>
          </div>
          <div className="rounded bg-[#2a3f54]/50 p-2">
            <div className="text-gray-400">一般</div>
            <div className="mt-1 font-semibold text-orange-400">&lt;70%</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EfficiencyGauge

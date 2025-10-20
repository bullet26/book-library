import { useEffect, useState } from 'react'
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from 'recharts'
import { COLORS, handleResponsive } from './utils'

interface DiagramPieProps {
  chartData: { name: string; count: number }[]
}

export const DiagramPie = (props: DiagramPieProps) => {
  const { chartData } = props
  const [radius, setRadius] = useState({ inner: 85, outer: 100 })
  const width = window.innerWidth

  console.log(chartData)

  useEffect(() => {
    setRadius(handleResponsive())
  }, [])

  return (
    <ResponsiveContainer height="100%" width="100%">
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={radius.inner}
          outerRadius={radius.outer}
          paddingAngle={5}
          dataKey="count"
          cornerRadius={20}>
          {chartData.map(({ name }, i) => (
            <Cell key={name} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: '15px', backgroundColor: '#222222' }}
          itemStyle={{ color: 'white' }}
        />
        <Legend
          layout={width > 600 ? 'vertical' : 'horizontal'}
          align="left"
          verticalAlign="top"
          iconType="star"
          itemSorter={(item) => Number(item.value) * -1}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

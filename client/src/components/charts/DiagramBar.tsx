import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DiagramBarProps {
  chartData: { period: string; count: number }[]
}

const DiagramBar: FC<DiagramBarProps> = (props) => {
  const { chartData } = props

  return (
    <ResponsiveContainer width="95%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid stroke="#414951" strokeDasharray="25 25" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#999999" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DiagramBar

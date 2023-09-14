import { FC, useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DiagramBarProps {
  chartData: { period: string; count: number }[]
}

const DiagramBar: FC<DiagramBarProps> = (props) => {
  const { chartData } = props
  console.log(chartData)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#999999" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DiagramBar

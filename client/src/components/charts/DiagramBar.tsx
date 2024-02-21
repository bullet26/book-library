import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'

interface DiagramBarProps {
  chartData: { period: string; count: number }[]
}

const DiagramBar: FC<DiagramBarProps> = (props) => {
  const { chartData } = props
  const navigate = useNavigate()

  const handleClickDate = (year?: string) => {
    if (year) {
      navigate(`/date/${year}`)
    }
  }

  return (
    <ResponsiveContainer width="95%" height="100%">
      <BarChart data={chartData} onClick={(e) => handleClickDate(e.activeLabel)}>
        <CartesianGrid stroke="#414951" strokeDasharray="25 25" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#999999" />
      </BarChart>
    </ResponsiveContainer>
  )
}
// or Bar onClick={(e) => handleClickDate(e.period)}

export default DiagramBar

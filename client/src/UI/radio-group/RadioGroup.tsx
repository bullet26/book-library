import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'

interface IPaginationProps {
  value: string
  data: string[]
  onChange: (e: RadioChangeEvent) => void
}

export const RadioGroup = (props: IPaginationProps) => {
  const { value, data, onChange } = props

  return (
    <Radio.Group onChange={onChange} value={value}>
      {data.map((item) => {
        return (
          <Radio value={item} key={item}>
            {item}
          </Radio>
        )
      })}
      <Radio value="all">all time</Radio>
    </Radio.Group>
  )
}

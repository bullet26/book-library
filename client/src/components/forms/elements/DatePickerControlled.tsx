import { useController } from 'react-hook-form'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import type { CSSProperties } from 'react'
import s from '../Form.module.scss'

interface DatePickerControlledProps {
  name: string
  style?: CSSProperties
}

export const DatePickerControlled = (props: DatePickerControlledProps) => {
  const { name, style } = props

  const visualizationDateFormat = 'DD/MM/YYYY'

  const {
    field: { value, onChange, ...fields },
    fieldState,
  } = useController({ name })

  return (
    <>
      <DatePicker
        {...fields}
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date)}
        format={visualizationDateFormat}
        status={fieldState.error ? 'error' : ''}
        style={style}
      />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

import dayjs from 'dayjs'
import { DatePicker } from 'antd'
import { useField } from 'formik'
import s from './Input.module.scss'

interface InputProps {
  name: string
}

export const DatepickerInput = (props: InputProps) => {
  const { name } = props
  const [field, meta, helpers] = useField(name)
  const visualizationDateFormat = 'DD/MM/YYYY'

  return (
    <span className={s.input}>
      <DatePicker
        id={name}
        name={name}
        value={field.value}
        defaultValue={dayjs()}
        format={visualizationDateFormat}
        onChange={(date) => {
          helpers.setValue(date, true)
        }}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </span>
  )
}

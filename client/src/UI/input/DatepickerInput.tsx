/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { DatePicker } from 'antd'
import { useField } from 'formik'
import s from './Input.module.scss'

interface InputProps {
  name: string
}

const DatepickerInput: FC<InputProps> = (props) => {
  const { name } = props
  const [field, meta, helpers] = useField(name)

  return (
    <span className={s.input}>
      <DatePicker
        id={name}
        name={name}
        value={field.value}
        onChange={(e) => helpers.setValue(e, true)}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </span>
  )
}

export default DatepickerInput

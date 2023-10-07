/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { useField } from 'formik'
import s from './Input.module.scss'

interface InputProps {
  name: string
  placeholder?: string
  htmlType?: 'text' | 'number'
}

const Input: FC<InputProps> = (props) => {
  const { name, placeholder, htmlType = 'text' } = props
  const [field, meta, helpers] = useField(name)

  return (
    <span className={s.input}>
      <AntInput
        placeholder={placeholder}
        id={name}
        name={name}
        type={htmlType}
        value={field.value}
        onChange={(e) => helpers.setValue(e?.target.value, true)}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </span>
  )
}

export default Input

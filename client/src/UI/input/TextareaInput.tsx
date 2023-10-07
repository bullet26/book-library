/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { useField } from 'formik'
import s from './Input.module.scss'

interface InputProps {
  name: string
  placeholder: string
}

const TextareaInput: FC<InputProps> = (props) => {
  const { TextArea } = AntInput

  const { name, placeholder } = props
  const [field, meta, helpers] = useField(name)

  return (
    <span className={s.input}>
      <TextArea
        placeholder={placeholder}
        id={name}
        name={name}
        autoSize
        value={field.value}
        onChange={(e) => helpers.setValue(e?.target.value, true)}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </span>
  )
}

export default TextareaInput

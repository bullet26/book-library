import { useController } from 'react-hook-form'
import { InputNumber } from 'antd'
import type { CSSProperties } from 'react'
import s from '../Form.module.scss'

interface NumberInputControlledProps {
  name: string
  placeholder: string
  style?: CSSProperties
}

export const NumberInputControlled = (props: NumberInputControlledProps) => {
  const { name, placeholder, style } = props

  const { field, fieldState } = useController({ name })

  return (
    <>
      <InputNumber
        {...field}
        type="number"
        placeholder={placeholder}
        controls={false}
        style={{
          ...style,
          ...(fieldState.error && { border: '1px solid red' }),
        }}
      />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

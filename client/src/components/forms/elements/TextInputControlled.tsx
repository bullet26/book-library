import { useController } from 'react-hook-form'
import { Input } from 'antd'
import s from '../Form.module.scss'

interface TextInputControlledProps {
  name: string
  placeholder: string
}

export const TextInputControlled = (props: TextInputControlledProps) => {
  const { name, placeholder } = props

  const { field, fieldState } = useController({ name })

  return (
    <div style={{ width: '100%' }}>
      <Input
        {...field}
        placeholder={placeholder}
        type="text"
        style={{ ...(fieldState.error && { border: '1px solid red' }) }}
      />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </div>
  )
}

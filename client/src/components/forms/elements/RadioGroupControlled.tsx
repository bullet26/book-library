import { useController } from 'react-hook-form'
import { Radio } from 'antd'
import { MediaType } from '__graphql/__generated__/enums'
import s from '../Form.module.scss'

interface RadioGroupControlledProps {
  name: string
}

export const RadioGroupControlled = (props: RadioGroupControlledProps) => {
  const { name } = props

  const {
    field: { value, onChange, ...fields },
    fieldState,
  } = useController({ name })

  return (
    <>
      <Radio.Group {...fields} onChange={(e) => onChange(e.target.value)} value={value}>
        <Radio value={MediaType.Video}>video</Radio>
        <Radio value={MediaType.Image}>images</Radio>
      </Radio.Group>
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

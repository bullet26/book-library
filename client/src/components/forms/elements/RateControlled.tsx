import { useController } from 'react-hook-form'
import { Rate } from 'antd'
import s from '../Form.module.scss'

interface RateControlledProps {
  name: string
}

export const RateControlled = (props: RateControlledProps) => {
  const { name } = props

  const { field, fieldState } = useController({ name })

  return (
    <>
      <div className={s.ratingWrapper}>
        <div className={s.ratingLabel}>Book rating:</div>
        <Rate {...field} allowHalf style={{ width: '200px', color: '#9E339F' }} />
      </div>
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

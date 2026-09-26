import { useController } from 'react-hook-form'
import type { DropZoneProps } from './DropZone'
import { DropZone } from './DropZone'
import s from '../../Form.module.scss'

interface DropZoneControlledProps {
  name: string
  size?: DropZoneProps['size']
}

export const DropZoneControlled = (props: DropZoneControlledProps) => {
  const { name, size } = props

  const { field, fieldState } = useController({ name })

  return (
    <>
      <DropZone {...field} size={size} />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

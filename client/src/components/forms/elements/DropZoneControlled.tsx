import { useController } from 'react-hook-form'
import { DropZone } from 'UI'
import s from '../Form.module.scss'
import type { DropZoneProps } from 'UI/input-file-upload/DropZone'

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

import { useController } from 'react-hook-form'
import { SearchDropdown } from 'components'
import type { CSSProperties } from 'react'
import type { SearchDropdownProps } from 'components/search/SearchDropdown'
import s from '../Form.module.scss'

interface SearchDropdownControlledProps {
  name: SearchDropdownProps['name']
  style?: CSSProperties
}

export const SearchDropdownControlled = (props: SearchDropdownControlledProps) => {
  const { name, style } = props

  const { field, fieldState } = useController({ name })

  return (
    <div style={{ width: '100%' }}>
      <SearchDropdown {...field} status={fieldState.error && 'error'} style={style} />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </div>
  )
}

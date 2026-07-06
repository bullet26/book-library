import { useController } from 'react-hook-form'
import { SearchDropdown } from 'components'
import type { SearchDropdownProps } from 'components/search/SearchDropdown'
import s from '../Form.module.scss'

interface SearchDropdownControlledProps {
  name: SearchDropdownProps['name']
}

export const SearchDropdownControlled = (props: SearchDropdownControlledProps) => {
  const { name } = props

  const { field, fieldState } = useController({ name })

  return (
    <>
      <SearchDropdown {...field} status={fieldState.error && 'error'} />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

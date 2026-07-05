import { Input as AntInput } from 'antd'
import s from './SearchInput.module.scss'
import type { CSSProperties } from 'react'

interface InputProps {
  placeholder: string
  inputValue: string
  handleChange: (value: string) => void
  style?: CSSProperties
}

export const SearchInputForm = (props: InputProps) => {
  const { Search } = AntInput

  const { placeholder, inputValue, handleChange, style } = props

  return (
    <span className={s.inputForm}>
      <Search
        allowClear
        placeholder={placeholder}
        value={inputValue}
        onSearch={handleChange}
        style={style}
        onChange={(e) => {
          handleChange(e?.target.value)
        }}
      />
    </span>
  )
}

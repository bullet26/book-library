/* eslint-disable import/no-extraneous-dependencies */
import { FC, useEffect } from 'react'
import { Input as AntInput } from 'antd'
import { useField } from 'formik'
import s from './SearchInput.module.scss'

interface InputProps {
  name: string
  status: boolean
  placeholder: string
  onSearch: (searchString: string) => void
  inputValue: string
  handleChange: (value: string) => void
}

const SearchInputForm: FC<InputProps> = (props) => {
  const { Search } = AntInput

  const { name, placeholder, onSearch, inputValue, handleChange, status } = props
  const [field, meta, helpers] = useField(name)

  useEffect(() => {
    let debounce: NodeJS.Timeout | undefined
    if (!status) {
      debounce = setTimeout(() => {
        if (inputValue) {
          onSearch(inputValue)
        }
      }, 500)
    }

    return () => clearInterval(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, status])

  useEffect(() => {
    if (!field.value) {
      handleChange('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value])

  return (
    <span className={s.inputForm}>
      <Search
        allowClear
        placeholder={placeholder}
        id={name}
        name={name}
        value={inputValue || field.value}
        onSearch={handleChange}
        onChange={(e) => {
          handleChange(e?.target.value)
          helpers.setValue(e?.target.value, true)
        }}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </span>
  )
}

export default SearchInputForm

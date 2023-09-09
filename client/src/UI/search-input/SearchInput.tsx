import { useEffect, FC } from 'react'
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import s from './SearchInput.module.scss'

interface SearchInputProps {
  onSearch: (searchString: string) => void
  inputValue: string
  showInputStatus: boolean
  onIconClick: () => void
  onChange: (value: string) => void
}

// eslint-disable-next-line react/display-name
const SearchInput: FC<SearchInputProps> = (props) => {
  const { onSearch, inputValue, onIconClick, onChange, showInputStatus } = props

  const { Search: AntSearch } = Input

  const windowWidth = window.innerWidth

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue)
      }
    }, 500)
    return () => clearInterval(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <>
      {!showInputStatus && (
        <SearchOutlined className={`${s.icon} ${s.searchIcon}`} onClick={onIconClick} />
      )}

      {showInputStatus && (
        <div className={s.inputWrapper}>
          {windowWidth <= 550 && <ArrowLeftOutlined className={s.icon} onClick={onIconClick} />}
          <AntSearch
            placeholder="input search text"
            value={inputValue}
            onSearch={onChange}
            onChange={(e) => onChange(e.target.value)}
            allowClear
            enterButton
            className={s.input}
          />
        </div>
      )}
    </>
  )
}

export default SearchInput

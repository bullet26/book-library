import { FC, useState, useEffect } from 'react'
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import s from './SearchInput.module.scss'

interface SearchInputProps {
  onSearch: (searchString: string) => void
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { onSearch } = props

  const { Search: AntSearch } = Input
  const windowWidth = window.innerWidth

  const [showInputStatus, setShowInputStatus] = useState(windowWidth > 650)
  const [inputValue, setInputValue] = useState('')

  const handleIconClick = () => {
    setShowInputStatus((prevState) => !prevState)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        console.log(inputValue)
        onSearch(inputValue)
      }
    }, 500)
    return () => clearInterval(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const onChange = (value: string) => {
    setInputValue(value)
  }

  return (
    <>
      {!showInputStatus && (
        <SearchOutlined className={`${s.icon} ${s.searchIcon}`} onClick={handleIconClick} />
      )}

      {showInputStatus && (
        <div className={s.inputWrapper}>
          {windowWidth <= 550 && <ArrowLeftOutlined className={s.icon} onClick={handleIconClick} />}
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

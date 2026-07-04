import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import s from './SearchInput.module.scss'
import { MOBILE_WIDTH_THRESHOLD } from 'components/header/Header'

interface SearchInputProps {
  inputValue: string
  onChange: (value: string) => void
  showMobileSearch: boolean
  handleMobileSearchClick: () => void
}

export const SearchInput = (props: SearchInputProps) => {
  const { inputValue, onChange, showMobileSearch, handleMobileSearchClick } = props

  const { Search: AntSearch } = Input

  const windowWidth = window.innerWidth

  return (
    <>
      <div className={s.inputButtonWrapper}>
        {windowWidth <= MOBILE_WIDTH_THRESHOLD && !showMobileSearch && (
          <SearchOutlined
            className={`${s.icon} ${s.searchIcon}`}
            onClick={handleMobileSearchClick}
          />
        )}
      </div>

      <div className={`${showMobileSearch ? s.inputMobileWrapper : ''}`}>
        {windowWidth <= MOBILE_WIDTH_THRESHOLD && showMobileSearch && (
          <ArrowLeftOutlined className={s.icon} onClick={handleMobileSearchClick} />
        )}
        {(windowWidth > MOBILE_WIDTH_THRESHOLD || showMobileSearch) && (
          <AntSearch
            placeholder="input search text"
            value={inputValue}
            onSearch={onChange}
            onChange={(e) => onChange(e.target.value)}
            allowClear
            enterButton
            className={s.input}
          />
        )}
      </div>
    </>
  )
}

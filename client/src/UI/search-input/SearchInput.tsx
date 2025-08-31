import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import s from './SearchInput.module.scss'

interface SearchInputProps {
  inputValue: string
  showInputStatus: boolean
  onIconClick: () => void
  onChange: (value: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
  const { inputValue, onIconClick, onChange, showInputStatus } = props

  const { Search: AntSearch } = Input

  const windowWidth = window.innerWidth

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

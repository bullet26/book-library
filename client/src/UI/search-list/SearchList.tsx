import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchCard } from 'UI'
import { Search as ISearch } from 'types'
import { checkTypes } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: ISearch[]
}

const SearchList: FC<SearchListProps> = (props) => {
  const { data = [] } = props

  const navigate = useNavigate()

  const handleClick = (id: string) => {
    !!id && navigate(`/books/${id}`)
  }

  return (
    <div className={s.wrapper}>
      {data.map((item) => (
        <SearchCard key={item.id} id={item.id} title={checkTypes(item)} onClick={handleClick} />
      ))}
    </div>
  )
}

export default SearchList

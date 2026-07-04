import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { unknownAuthor1, unknownAuthor2 } from 'assets'
import type {
  GetAllAuthorsByBooksCountQuery,
  GetAllAuthorsQuery,
} from '__graphql/__generated__/graphql'
import s from './CardList.module.scss'

type Author = NonNullable<NonNullable<GetAllAuthorsQuery['getAllAuthors']>['authors']>[number]
type MostReadAuthor = NonNullable<GetAllAuthorsByBooksCountQuery['author']>[number]

interface CardListAuthorsProps {
  data: Author[] | MostReadAuthor[]
}
const isMostReadAuthor = (item: Author | MostReadAuthor): item is MostReadAuthor => {
  return 'count' in item
}

export const CardListAuthors = (props: CardListAuthorsProps) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  function getRandomImage() {
    const images = [unknownAuthor1, unknownAuthor2]
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }

  return (
    <div className={s.wrapper}>
      {data?.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          img={item.portraitThumbnail || getRandomImage()}
          title={item?.surname || ''}
          subtitle={item.name}
          count={isMostReadAuthor(item) ? item.count : 0}
          onClick={handleClick}
          type="author"
        />
      ))}
    </div>
  )
}

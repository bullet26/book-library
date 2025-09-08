import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { unknownAuthor1, unknownAuthor2 } from 'assets'
import type { AuthorMostReadResponse, GetAllAuthorsQuery } from '__graphql/__generated__/graphql'
import s from './CardList.module.scss'

type Authors = NonNullable<GetAllAuthorsQuery['getAllAuthors']>['authors']
type Author = Authors[0]
interface CardListAuthorsProps {
  data: Authors | AuthorMostReadResponse[]
}

const isMostRededAuthorResponse = (
  item: Author | AuthorMostReadResponse,
): item is AuthorMostReadResponse => {
  return (item as AuthorMostReadResponse).count !== undefined
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
          count={isMostRededAuthorResponse(item) ? item.count : 0}
          onClick={handleClick}
          type="author"
        />
      ))}
    </div>
  )
}

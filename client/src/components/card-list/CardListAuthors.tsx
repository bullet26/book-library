import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { type Author, type MostRededAuthorResponse } from 'types'
import { unknownAuthor1, unknownAuthor2 } from 'assets'
import s from './CardList.module.scss'

interface CardListAuthorsProps {
  data: Author[] | MostRededAuthorResponse[]
}

const isMostRededAuthorResponse = (
  item: Author | MostRededAuthorResponse,
): item is MostRededAuthorResponse => {
  return (item as MostRededAuthorResponse).count !== undefined
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
          title={item.surname}
          subtitle={item.name}
          count={isMostRededAuthorResponse(item) ? item.count : 0}
          onClick={handleClick}
          type="author"
        />
      ))}
    </div>
  )
}

import { Card } from 'UI'
import type { SerieBooks } from 'types'
import s from './BookSection.module.scss'

interface BookSectionProps extends SerieBooks {
  onClick: (id?: string) => void
}

export const BookSection = (props: BookSectionProps) => {
  const { title, booksInSeries, onClick } = props

  return (
    <>
      <div className={s.titleWrapper}>
        <span className={s.title}>&nbsp;&nbsp;{title}&nbsp;&nbsp;</span>
      </div>
      <div className={s.gridWrapper}>
        {booksInSeries.map(({ title, bookCoverThumbnail, id, rating }) => (
          <Card
            key={id}
            id={id}
            type="small"
            img={bookCoverThumbnail}
            rating={rating}
            title={title}
            onClick={onClick}
          />
        ))}
      </div>
    </>
  )
}

import { FC } from 'react'
import { Card } from 'UI'
import s from './BookSection.module.scss'

interface BookSectionProps {
  seriesTitle: string
  booksInSeries: {
    title: string
    bookCover: string
    bookCoverThumbnail: string
    id: string
    rating?: number
  }[]
  onClick: (id?: string) => void
}

const BookSection: FC<BookSectionProps> = (props) => {
  const { seriesTitle, booksInSeries, onClick } = props

  return (
    <>
      <div className={s.titleWrapper}>
        <span className={s.title}>&nbsp;&nbsp;{seriesTitle}&nbsp;&nbsp;</span>
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

export default BookSection

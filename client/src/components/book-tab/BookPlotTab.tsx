import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Plot } from 'types'
import { ONE_BOOK_PLOT } from 'apollo'
import s from './BookTab.module.scss'

interface PlotQuery {
  book: Plot
}

const BookPlotTab: FC = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery<PlotQuery>(ONE_BOOK_PLOT, {
    variables: { bookID: id },
  })

  const plot = data?.book?.plot

  return !loading ? (
    plot ? (
      // eslint-disable-next-line react/no-danger
      <div className={s.text} dangerouslySetInnerHTML={{ __html: plot as TrustedHTML }} />
    ) : (
      <span>add plot someday</span>
    )
  ) : (
    <div>Loading..</div>
  )
}

export default BookPlotTab

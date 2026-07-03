import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Button } from 'antd'
import { EditFilled } from '@ant-design/icons'
import { ONE_BOOK_PLOT } from '__graphql'
import { UpdateBookPlotForm } from 'components'
import { Error } from 'UI'
import { emptyPlotImg } from 'assets'
import { sanitize } from 'utils'
import s from './BookTab.module.scss'

export const BookPlotTab = () => {
  const { id } = useParams()

  const [isViewMode, setViewModeStatus] = useState(true)

  const { loading, error, data } = useQuery(ONE_BOOK_PLOT, {
    variables: { bookID: id },
    skip: !id,
  })

  const plot = sanitize(data?.book?.plot || '')

  const handleEditClick = () => {
    setViewModeStatus((prev) => !prev)
  }

  return (
    <>
      {!!loading && <div>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!plot && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button icon={<EditFilled />} onClick={handleEditClick} />
        </div>
      )}
      {!!plot && (
        <>
          {isViewMode && <div className={s.text} dangerouslySetInnerHTML={{ __html: plot }} />}
          {!isViewMode && <UpdateBookPlotForm id={data?.book?.id || ''} plot={plot} />}
        </>
      )}
      {!loading && !plot && (
        <div className={s.emptyPlot}>
          <img src={emptyPlotImg} alt="empty-plot" />
        </div>
      )}
    </>
  )
}

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Button, Flex } from 'antd'
import { EditFilled } from '@ant-design/icons'
import { ONE_BOOK_PLOT } from '__graphql'
import { useReactContext } from 'providers'
import { UpdateBookPlotForm } from 'components'
import { Error } from 'UI'
import { emptyPlotImg } from 'assets'
import { sanitize } from 'utils'
import s from './BookTab.module.scss'

export const BookPlotTab = () => {
  const { id } = useParams()
  const { isEditMode: isEditAllow } = useReactContext()

  const [isViewMode, setViewModeStatus] = useState(true)

  const { loading, error, data } = useQuery(ONE_BOOK_PLOT, {
    variables: { bookID: id },
    skip: !id,
  })

  const plot = sanitize(data?.book?.plot || '')

  const handleEditClick = () => {
    setViewModeStatus((prev) => !prev)
  }

  if (loading) return <div>Loading..</div>
  if (error) return <Error message={error?.message} />

  if (!loading && !plot)
    return (
      <div className={s.emptyPlot}>
        <img src={emptyPlotImg} alt="empty-plot" />
      </div>
    )

  return (
    <>
      {!!plot && isEditAllow && (
        <Flex justify="flex-end" style={{ marginBottom: '10px' }}>
          <Button icon={<EditFilled />} onClick={handleEditClick} />
        </Flex>
      )}

      {!!plot && (
        <>
          {isViewMode && <div className={s.text} dangerouslySetInnerHTML={{ __html: plot }} />}
          {!isViewMode && <UpdateBookPlotForm id={data?.book?.id || ''} plot={plot} />}
        </>
      )}
    </>
  )
}

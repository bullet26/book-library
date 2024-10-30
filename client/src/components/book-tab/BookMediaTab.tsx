import { FC } from 'react'
import { Image } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { AllMediaForItem } from 'types'
import { ALL_MEDIA_FOR_BOOK } from 'apollo'
import { Error, VideoEmbed } from 'UI'
import s from './BookTab.module.scss'

interface BookQuery {
  book: { id: string; title: string; media: AllMediaForItem }
}

const BookMediaTab: FC = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery<BookQuery>(ALL_MEDIA_FOR_BOOK, {
    variables: { id },
  })

  const media = data?.book?.media

  return (
    <>
      {!!loading && <div>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!media?.video?.length && (
        <div className={s.videoWrapper}>
          {media?.video.map((item) => <VideoEmbed key={item.id} url={item.url} />)}
        </div>
      )}
      {!!media?.image.length && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 560: 2, 900: 3, 1300: 5 }}>
          <Masonry columnsCount={5} itemStyle={{ maxWidth: '206px', maxHeight: '137px' }}>
            {media?.image.map((item) => <Image key={item.id} src={item.url} />)}
          </Masonry>
        </ResponsiveMasonry>
      )}
      {!loading && !media && <span>You can add media on settings page</span>}
    </>
  )
}

export default BookMediaTab

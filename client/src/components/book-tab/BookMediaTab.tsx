import { Image } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Masonry } from 'antd'
import { ALL_MEDIA_FOR_BOOK } from '__graphql'
import { Error, VideoEmbed } from 'UI'
import s from './BookTab.module.scss'

export const BookMediaTab = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(ALL_MEDIA_FOR_BOOK, {
    skip: !id,
    variables: { id },
  })

  const media = data?.book?.media

  return (
    <>
      {!!loading && <div>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!media?.video?.length && (
        <div className={s.videoWrapper}>
          {media?.video.map((item) => item?.url && <VideoEmbed key={item.id} url={item.url} />)}
        </div>
      )}
      {!!media?.image?.length && (
        <Image.PreviewGroup>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gutter={10}
            items={media?.image.map((img) => ({
              key: `masonry-item-${img.id}`,
              data: img,
            }))}
            itemRender={({ data }) => (
              <Image key={data.id} src={data.url} alt="additional-book-media" />
            )}
          />
        </Image.PreviewGroup>
      )}
      {!loading && !media && <span>You can add media on settings page</span>}
    </>
  )
}

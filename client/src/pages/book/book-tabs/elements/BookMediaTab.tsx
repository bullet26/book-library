import { Flex, Image } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Masonry } from 'antd'
import ReactPlayer from 'react-player'
import { ALL_MEDIA_FOR_BOOK } from '__graphql'
import { Error } from 'UI'

export const BookMediaTab = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(ALL_MEDIA_FOR_BOOK, {
    skip: !id,
    variables: { id },
  })

  const media = data?.book?.media

  if (loading) return <div>Loading..</div>
  if (error) return <Error message={error?.message} />
  if (!media) return <span>You can add media on settings page</span>

  return (
    <Flex vertical gap="large">
      {!!media?.video?.length && (
        <Flex wrap align="center" justify="space-around" gap="medium">
          {media?.video.map(
            (item) =>
              item?.url && (
                <ReactPlayer key={item.id} src={item.url} height="210px" width="390px" controls />
              ),
          )}
        </Flex>
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
    </Flex>
  )
}

import { Tag } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS_BY_TAG } from '__graphql'
import { SortTypeSelect, TagSelect } from 'components'
import { Loader, Error, Card } from 'UI'
import s from './BooksByTag.module.scss'

export const BooksByTag = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const tagID = queryParams.get('tagID')
  const sortBy = queryParams.get('sortBy') || 'author'

  const { loading, error, data } = useQuery(ALL_BOOKS_BY_TAG, {
    skip: !tagID,
    variables: { id: tagID, sortBy },
  })

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  const books = data?.tagData?.booksInTag || []

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <>
          <div className={s.titleWrapper}>
            <div className={s.filterWrapper}>
              <TagSelect tagID={tagID} sortBy={sortBy} />
              <SortTypeSelect tagID={tagID} sortBy={sortBy} />
            </div>
            <div className={s.title}>
              <span>Books by tag:</span>&nbsp;
              <Tag variant="filled" color="magenta">
                #{data?.tagData?.tag}
              </Tag>
            </div>
          </div>

          <div className={s.cardWrapper}>
            {books.map((item) => (
              <Card
                id={item.id}
                img={item.bookCoverThumbnail}
                title={item.title}
                subtitle={`${item.author.name} ${item.author.surname}`}
                rating={item.rating}
                onClick={handleClick}
                type="book"
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

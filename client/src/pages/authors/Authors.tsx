import { useQuery } from '@apollo/client/react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button as AntButton } from 'antd'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { ALL_AUTHORS } from '__graphql'
import { getRandomImage } from 'utils'
import s from './Authors.module.scss'

export const Authors = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()

  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  const authors = data?.getAllAuthors.authors || []
  const totalCount = data?.getAllAuthors.totalCount
  const windowWidth = window.innerWidth

  const handleSubmit = (current: number, pageSize: number) => {
    setSearchParams({ page: String(current), perpage: String(pageSize) })
  }

  const MostRededAuthors = () => (
    <Link to="/most_reded_authors" style={{}}>
      <AntButton shape="round">Show most reded authors</AntButton>
    </Link>
  )

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <div className={s.subHeaderWrapper}>
            <Pagination
              total={totalCount || 0}
              current={Number(searchParams.get('page'))}
              pageSize={Number(searchParams.get('perpage'))}
              handleSubmit={handleSubmit}
            />
            {windowWidth > 729 && <MostRededAuthors />}
            {windowWidth < 729 && <ActivateEditMode />}
          </div>
          {windowWidth < 729 && <MostRededAuthors />}
          <div className={s.cardWrapper}>
            {authors?.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                img={item.portraitThumbnail || getRandomImage()}
                title={item?.surname || ''}
                subtitle={item.name}
                onClick={handleClick}
                type="author"
              />
            ))}
          </div>
          <Pagination
            total={totalCount || 0}
            current={Number(searchParams.get('page'))}
            pageSize={Number(searchParams.get('perpage'))}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  )
}

import { Fragment } from 'react'
import { YearNavigator as YearSelect } from 'components'
import { Loader, Error, ActivateEditMode, Card } from 'UI'
import { DateDivider } from './elements'
import { useBooksByYear } from './hook/useBooksByYear'
import s from './BooksByYear.module.scss'
import { Flex } from 'antd'

export const BooksByYear = () => {
  const {
    books,
    year,
    loading,
    error,

    handleClickCard,
  } = useBooksByYear()

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  return (
    <Flex vertical justify="flex-start" gap="large">
      <Flex justify="space-between" align="flex-start" gap="large">
        <YearSelect year={year} />
        <div className={s.toolbarMobileOnly}>
          <ActivateEditMode />
        </div>
      </Flex>

      <DateDivider message={String(year)} type="main" />
      {books.map(({ month, books }) => {
        return (
          <Fragment key={month}>
            <DateDivider message={month} />
            <div className={s.cardWrapper}>
              {books &&
                books.map((item) => (
                  <Card
                    id={item.id}
                    img={item.bookCoverThumbnail}
                    title={item.title}
                    subtitle={`${item.author.name} ${item.author.surname}`}
                    rating={item.rating}
                    onClick={handleClickCard}
                    type="book"
                  />
                ))}
            </div>
          </Fragment>
        )
      })}
    </Flex>
  )
}

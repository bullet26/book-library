import type { GetOneAuthorByIdQuery } from '__graphql/__generated__/graphql'

export const calcRating = (data: GetOneAuthorByIdQuery | undefined) => {
  if (!data?.author) {
    return {
      booksQuant: 0,
      booksAverageRating: 0,
    }
  }

  const { series, booksWithoutSeries: books } = data.author

  let booksInSeriesQuant = 0
  const booksWithoutSeriesQuant = books.length
  let booksInSeriesTotalRating = 0
  let booksWithoutSeriesTotalRating = 0

  series.forEach(({ booksInSeries }) => {
    booksInSeriesQuant += booksInSeries?.length || 0
    booksInSeries?.forEach((r) => {
      booksInSeriesTotalRating += r?.rating || 0
    })
  })

  books.forEach((r) => {
    booksWithoutSeriesTotalRating += r.rating || 0
  })

  const booksQuant = booksInSeriesQuant + booksWithoutSeriesQuant
  const booksAverageRating =
    Math.ceil(((booksInSeriesTotalRating + booksWithoutSeriesTotalRating) / booksQuant) * 100) / 100

  return {
    booksQuant,
    booksAverageRating,
  }
}

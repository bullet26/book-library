import { Author, Book, Search as ISearch } from 'types'

export const checkTypes = (item: ISearch) => {
  if (Object.hasOwn(item, 'name')) {
    const author = item as Author
    return `${author.name} ${author.surname}`
  }
  if (Object.hasOwn(item, 'title')) {
    const book = item as Book
    return book.title
  }
  return ''
}

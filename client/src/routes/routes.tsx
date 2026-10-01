import { Route, Routes } from 'react-router-dom'
import { MainPage, Books, Authors, Book, Home, Author, Page404, BooksByYear, AddBook } from 'pages'
import { useReactContext } from 'providers'

export const AppRoutes = () => {
  const { isEditMode } = useReactContext()

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="home" element={<Home />} />
        {isEditMode && <Route path="add" element={<AddBook />} />}
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<Book />} />
        <Route path="books/date/:year" element={<BooksByYear />} />
        <Route path="authors" element={<Authors />} />
        <Route path="authors/:id" element={<Author />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

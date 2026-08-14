import { Route, Routes } from 'react-router-dom'
import {
  MainPage,
  Books,
  Authors,
  Book,
  Home,
  Author,
  Page404,
  BooksByDate,
  AddBook,
  BooksByTag,
  MostRededAuthors,
} from 'pages'
import { useReactContext } from 'providers'

export const AppRoutes = () => {
  const { isEditMode } = useReactContext()

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="home" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<Book />} />
        {isEditMode && <Route path="add" element={<AddBook />} />}
        <Route path="date/:year" element={<BooksByDate />} />
        <Route path="tag" element={<BooksByTag />} />
        <Route path="most_reded_authors" element={<MostRededAuthors />} />
        <Route path="authors" element={<Authors />} />
        <Route path="authors/:id" element={<Author />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

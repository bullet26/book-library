import { Route, Routes } from 'react-router-dom'
import { MainPage, BooksByDate, Authors, Book, Home, Author } from 'pages'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="home" element={<Home />} />
        <Route path="books" element={<BooksByDate />} />
        <Route path="books/:id" element={<Book />} />
        <Route path="authors" element={<Authors />} />
        <Route path="authors/:id" element={<Author />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

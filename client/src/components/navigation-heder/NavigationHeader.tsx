import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './NavigationHeader.module.scss'

const NavigationHeader: FC = () => {
  const selectedKey = window.location.pathname.split('/').at(1)
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedKey) {
      navigate('/home')
    }
  }, [])

  return (
    <div className={s.wrapper}>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <div className={`${s.button} ${selectedKey === 'home' && s.active}`}>Home</div>
      </Link>
      <Link to="/books" style={{ textDecoration: 'none' }}>
        <div className={`${s.button} ${selectedKey === 'books' && s.active}`}>Books</div>
      </Link>
      <Link to="/authors" style={{ textDecoration: 'none' }}>
        <div className={`${s.button} ${selectedKey === 'authors' && s.active}`}>Authors</div>
      </Link>
    </div>
  )
}

export default NavigationHeader

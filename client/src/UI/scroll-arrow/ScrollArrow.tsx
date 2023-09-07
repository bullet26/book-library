import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Arrow } from 'assets'
import s from './ScrollArrow.module.scss'

const ScrollArrow: FC = () => {
  const [scroll, setScroll] = useState(0)

  const parentTab = window.location.pathname.split('/').at(1)

  const navigate = useNavigate()

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  const handleClick = () => {
    if (scroll > 700) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else if (scroll < 100) {
      navigate(`/${parentTab}`)
    }
    return false
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`${s.wrapper} ${scroll > 700 && s.show} ${scroll < 100 && s.return}`}>
      <Arrow onClick={handleClick} />
    </div>
  )
}

export default ScrollArrow

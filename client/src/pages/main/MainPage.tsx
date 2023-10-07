import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationHeader, Search } from 'components'
import { Button } from 'UI'
import s from './MainPage.module.scss'

const MainPage: FC = () => {
  const windowWidth = window.innerWidth

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <NavigationHeader />
          {windowWidth >= 729 && <Button />}
        </div>
        <Search />
      </div>

      <Outlet />
    </>
  )
}

export default MainPage

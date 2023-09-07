import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationHeader, Search } from 'components'
import s from './MainPage.module.scss'

const MainPage: FC = () => {
  return (
    <>
      <div className={s.wrapper}>
        <NavigationHeader />
        <Search />
      </div>
      <Outlet />
    </>
  )
}

export default MainPage

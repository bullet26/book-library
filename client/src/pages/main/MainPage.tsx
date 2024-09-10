import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationHeader, ReactHelmetMetadata, Search } from 'components'
import { Button } from 'UI'
import s from './MainPage.module.scss'

const MainPage: FC = () => {
  const windowWidth = window.innerWidth

  return (
    <ReactHelmetMetadata
      title="Books"
      pageURL={window.location.href}
      imageURL="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&h=502&fit=crop&dpr=1"
      description="Library for Tracking Read Books"
      children={
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
      }
    />
  )
}

export default MainPage

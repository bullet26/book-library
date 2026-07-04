import { Outlet } from 'react-router-dom'
import { Header, ReactHelmetMetadata } from 'components'
import s from './MainPage.module.scss'

export const MainPage = () => {
  return (
    <ReactHelmetMetadata
      title="Books"
      pageURL={window.location.href}
      imageURL="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&h=502&fit=crop&dpr=1"
      description="Library for Tracking Read Books"
      children={
        <>
          <Header />

          <div className={s.contentWrapper}>
            <Outlet />
          </div>
        </>
      }
    />
  )
}

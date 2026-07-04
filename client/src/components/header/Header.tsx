import { Search } from 'components'
import { AddBookButton } from 'UI'
import { NavigationHeader } from './NavigationHeader'
import s from './Header.module.scss'
import { useState } from 'react'

export const MOBILE_WIDTH_THRESHOLD = 630

export const Header = () => {
  const windowWidth = window.innerWidth
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleMobileSearchClick = () => {
    setShowMobileSearch((prev) => !prev)
  }

  return (
    <div className={s.headerWrapper}>
      <div className={s.innerWrapper}>
        {(windowWidth > MOBILE_WIDTH_THRESHOLD || !showMobileSearch) && <NavigationHeader />}
        {windowWidth >= 729 && <AddBookButton />}
      </div>
      <Search
        showMobileSearch={showMobileSearch}
        handleMobileSearchClick={handleMobileSearchClick}
      />
    </div>
  )
}

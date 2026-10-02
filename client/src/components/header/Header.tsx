import { useState } from 'react'
import { Flex } from 'antd'
import { Search } from 'components'
import { ActivateEditMode } from 'UI'
import { NavigationHeader } from './NavigationHeader'
import s from './Header.module.scss'

export const MOBILE_WIDTH_THRESHOLD = 630

export const Header = () => {
  const windowWidth = window.innerWidth
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleMobileSearchClick = () => {
    setShowMobileSearch((prev) => !prev)
  }

  return (
    <Flex justify="space-between" gap="large" className={s.headerWrapper}>
      <Flex justify="space-between" align="center" gap="large">
        {(windowWidth > MOBILE_WIDTH_THRESHOLD || !showMobileSearch) && <NavigationHeader />}
        {windowWidth >= 729 && <ActivateEditMode />}
      </Flex>
      <Search
        showMobileSearch={showMobileSearch}
        handleMobileSearchClick={handleMobileSearchClick}
      />
    </Flex>
  )
}

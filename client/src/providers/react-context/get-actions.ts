import { useContext } from 'react'
import { ReactActionsContext } from './ContextProvider'

export const useReactActions = () => {
  const context = useContext(ReactActionsContext)

  if (!context) {
    throw new Error('useReactActions must be used within a ReactActionsContextProvider!')
  }

  return context
}

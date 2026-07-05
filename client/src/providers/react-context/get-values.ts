import { useContext } from 'react'
import { ReactContext } from './ContextProvider'

export const useReactContext = () => {
  const context = useContext(ReactContext)

  if (!context) throw new Error('useTodo must be used within a ReactContextProvider')

  return context
}

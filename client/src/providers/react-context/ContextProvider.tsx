import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

export const ReactContext = createContext({ isEditMode: false })
export const ReactActionsContext = createContext({ setEditModeStatus: (_status: boolean) => {} })

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const appMode = import.meta.env.VITE_APP_MODE

  const [isEditMode, setIsEditMode] = useState(appMode === 'develop')

  const setEditModeStatus = useCallback((status: boolean) => {
    setIsEditMode(status)
  }, [])

  const value = useMemo(() => ({ isEditMode }), [isEditMode])

  const actions = useMemo(() => ({ setEditModeStatus }), [setEditModeStatus])

  return (
    <ReactContext.Provider value={value}>
      <ReactActionsContext.Provider value={actions}>{children}</ReactActionsContext.Provider>
    </ReactContext.Provider>
  )
}

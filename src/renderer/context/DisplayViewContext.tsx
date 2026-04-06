import { createContext, useContext, type ReactNode } from 'react'

export type DisplayView = 'data' | 'traffic'

export type DisplayViewContextValue = {
  view: DisplayView
  serialConnected: boolean
  serialLineCount: number
}

const DisplayViewContext = createContext<DisplayViewContextValue | null>(null)

export function DisplayViewProvider({
  children,
  view,
  serialConnected,
  serialLineCount,
}: {
  children: ReactNode
  view: DisplayView
  serialConnected: boolean
  serialLineCount: number
}) {
  return (
    <DisplayViewContext.Provider value={{ view, serialConnected, serialLineCount }}>
      {children}
    </DisplayViewContext.Provider>
  )
}

export function useDisplayView(): DisplayViewContextValue {
  const v = useContext(DisplayViewContext)
  if (!v) {
    throw new Error('useDisplayView must be used within DisplayViewProvider')
  }
  return v
}

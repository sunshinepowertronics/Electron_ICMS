import { createContext, useContext, type ReactNode } from 'react'

export type DisplayView = 'data' | 'traffic'

export type DisplayViewContextValue = {
  view: DisplayView
  serialConnected: boolean
  serialLineCount: number
  serialLines: string[]
  serialPath: string
  serialBaudRate: number
  serialSlaveId: string
  beginSettingsParamEdit: () => void
  endSettingsParamEdit: () => void
}

const DisplayViewContext = createContext<DisplayViewContextValue | null>(null)

export function DisplayViewProvider({
  children,
  view,
  serialConnected,
  serialLineCount,
  serialLines,
  serialPath,
  serialBaudRate,
  serialSlaveId,
  beginSettingsParamEdit,
  endSettingsParamEdit,
}: {
  children: ReactNode
  view: DisplayView
  serialConnected: boolean
  serialLineCount: number
  serialLines: string[]
  serialPath: string
  serialBaudRate: number
  serialSlaveId: string
  beginSettingsParamEdit: () => void
  endSettingsParamEdit: () => void
}) {
  return (
    <DisplayViewContext.Provider
      value={{
        view,
        serialConnected,
        serialLineCount,
        serialLines,
        serialPath,
        serialBaudRate,
        serialSlaveId,
        beginSettingsParamEdit,
        endSettingsParamEdit,
      }}
    >
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

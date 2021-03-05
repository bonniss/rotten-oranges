import { ThemeProvider } from '@material-ui/core/styles'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { APP_ACTIONS, useAppReducer } from './reducer'
import { mainTheme } from './theme'

export const AppContext = React.createContext({})

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useAppReducer()
  const location = useLocation()

  const changeBackground = bgString => {
    dispatch({
      type: APP_ACTIONS.CHANGE_BACKGROUND,
      payload: bgString || null
    })
  }

  const changeDocumentTitle = title => {
    dispatch({
      type: APP_ACTIONS.CHANGE_TITLE,
      payload: title
    })
  }

  useEffect(() => {
    changeBackground(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.backgroundImage = state.mainBackground
  }, [state.mainBackground])

  useEffect(() => {
    document.title = state.title
  }, [state.title])

  return (
    <AppContext.Provider value={{
      ...state,
      changeBackground,
      changeDocumentTitle
    }}>
      <ThemeProvider theme={mainTheme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
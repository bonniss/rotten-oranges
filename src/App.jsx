import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { AppProvider } from './app/context'
import AppRoute from './app/routes'
import Layout from './components/layout/Layout'

const App = () => {
  return (
    <AppProvider>
      <CssBaseline />
      <Layout>
        <AppRoute />
      </Layout>
    </AppProvider>
  )
}
export default App

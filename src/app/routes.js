import React from 'react'
import loadable from "@loadable/component";
import { Switch, Route, useLocation } from 'react-router-dom'

import Preloader from '../components/preloader/Preloader'
import ErrorBoundary from '../components/error/ErrorBoundary';

const makeLoadable = pageName => loadable(() => import(`../pages/${pageName}`), {
  fallback: <Preloader />
})

const DashBoard = makeLoadable('Dashboard')
const About = makeLoadable('About')
const Goat = makeLoadable('Goat')
const MovieDetail = makeLoadable('MovieDetail')

function AppRoute() {
  const location = useLocation()

  return (
    <ErrorBoundary key={location.pathname}>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/movies/:movieId" component={MovieDetail} />
        <Route path="/greatest-of-all-time" component={Goat} />
        <Route path="/" component={DashBoard} />
      </Switch>
    </ErrorBoundary>
  )
}

export default AppRoute

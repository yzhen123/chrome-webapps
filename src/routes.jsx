import React from 'react'
import { Route, IndexRoute } from 'react-router'
import RouteContainer from './containers/RouteContainer'
import ConfigPage from './containers/ConfigPage'
import AppPage from './containers/AppPage'

export default (
  <Route path="/" component={RouteContainer}>
    <IndexRoute component={AppPage} />
    <Route path="/config" component={ConfigPage} />
  </Route>
)

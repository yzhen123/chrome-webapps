import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import RouteContainer from './containers/RouteContainer'
import ConfigPage from './containers/ConfigPage'
import AppPage from './containers/AppPage'

const base = location.href.substring(0, location.href.lastIndexOf('/') + 1 || location.href.length)
console.log(base)
export default (
  <Route path="/" component={RouteContainer}>
    {/* <IndexRedirect to="/index.html" /> */}
    <IndexRoute component={AppPage} />
    <Route path="/config" component={ConfigPage} />
  </Route>
)

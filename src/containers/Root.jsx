import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'
import Container from 'muicss/lib/react/container'

export default function Root(props) {
  const { store, history } = props
  let devTools

  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    const DevTools = require('./DevTools').default
    devTools = <DevTools />
    /* eslint-ensable */
  }


  return (
    <Provider store={store}>
      <Container fluid>
        <Router history={history} routes={routes} />
        {devTools}
      </Container>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

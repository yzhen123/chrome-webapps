import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'
import Container from 'muicss/lib/react/container'

export default function Root(props) {
  const { store, history } = props
  return (
    <Provider store={store}>
      <Container fluid>
        <Router history={history} routes={routes} />
        {process.env.NODE_ENV === 'development'
            ? <DevTools />
            : null}
      </Container>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

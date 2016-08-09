import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { LOAD_APPS } from '../constants'

function apps(state = [], action) {
  switch (action.type) {
    case LOAD_APPS:
      return action.apps
    default:

  }
  return state
}

const rootReducer = combineReducers({
  apps,
  routing,
})

export default rootReducer

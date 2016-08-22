import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { LOAD_APPS, INSTALL_APP, UNINSTALL_APP, DISABLE_APP, ENABLE_APP } from '../constants'

function apps(state = { result: [] }, action) {
  let nextState = state
  switch (action.type) {
    case LOAD_APPS:
      nextState = action.apps
      console.log('load', nextState)
      break
    case INSTALL_APP:
      nextState.entities.apps[action.app.id] = action.app
      nextState.result.push(action.app.id)
      break
    case UNINSTALL_APP:
      delete nextState.entities.apps[action.appId]
      nextState.result = nextState.result.filter(id => id !== action.appId)
      break
    case ENABLE_APP:
      nextState.entities.apps[action.appId].enabled = true
      break
    case DISABLE_APP:
      nextState.entities.apps[action.appId].enabled = false
      break
    default:
  }
  return nextState
}

const rootReducer = combineReducers({
  apps,
  routing,
})

export default rootReducer

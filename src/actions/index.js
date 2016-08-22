/* global chrome */
import { LOAD_APPS, LAUNCH_APP, APP_TYPES } from '../constants'
import * as Message from '../api/message'

// export function searchApps(searchKey) {
//   return (dispatch, getState) => {
//   }
// }
//

export function loadApps() {
  console.time('loadApps')
  return (dispatch) => {
    Message.send(LOAD_APPS, { types: APP_TYPES }, data => {
      if (!data) {
        alert('extension is not working, please install or enable it!')
        return
      }
      const apps = data.apps
      dispatch({ type: LOAD_APPS, apps })
    })
  }
}

export function launchApp(app) {
  console.log('launchApp');
  return (dispatch) => {
    Message.send(LAUNCH_APP, app.id, data => {
      if (data.error) {
        alert(data.error)
        return
      }
      dispatch(LAUNCH_APP, app.id)
    })
  }
}

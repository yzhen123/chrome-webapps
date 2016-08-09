/* global chrome */
import { LOAD_APPS } from '../constants'
import * as Message from '../api/message'

// export function searchApps(searchKey) {
//   return (dispatch, getState) => {
//   }
// }

export function loadApps() {
  console.time('loadApps')
  return (dispatch) => {
    if (localStorage.APPS) {
      dispatch({ type: LOAD_APPS, apps: JSON.parse(localStorage.APPS) })
      console.timeEnd('loadApps')
    }
    Message.send(LOAD_APPS, apps => {
      localStorage.APPS = JSON.stringify(apps)
      console.timeEnd('loadApps')
      console.log('appsa', apps)
      dispatch({ type: LOAD_APPS, apps })
    })
  }
}

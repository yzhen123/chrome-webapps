import * as Message from '../api/message'
import { INSTALL_APP, UNINSTALL_APP, ENABLE_APP, DISABLE_APP } from '../constants'

function installAction(app) {
  return { type: INSTALL_APP, app }
}

function uninstallAction(appId) {
  return { type: UNINSTALL_APP, appId }
}

function enableAction(appId) {
  return { type: ENABLE_APP, appId }
}
function disableAction(appId) {
  return { type: DISABLE_APP, appId }
}


function baseBindRemoteAction(msgType, actionCreator, dispatch) {
  Message.on(msgType, (data) => {
    dispatch(actionCreator(data))
  })
}

export default function bindRemoteAction(dispatch) {
  baseBindRemoteAction(INSTALL_APP, installAction, dispatch)
  baseBindRemoteAction(UNINSTALL_APP, uninstallAction, dispatch)
  baseBindRemoteAction(ENABLE_APP, enableAction, dispatch)
  baseBindRemoteAction(DISABLE_APP, disableAction, dispatch)
}

/* global chrome */
import * as Message from './message'
const mgm = chrome.management
import App from './model/App'
import { INSTALL_APP, UNINSTALL_APP, ENABLE_APP, DISABLE_APP, LOAD_APPS, LAUNCH_APP } from '../constants'
import { normalize, Schema, arrayOf } from 'normalizr'

const appSchema = new Schema('apps')
/*
mgm.setEnable(id, true/false, cb)
mgm.uninstall(id, {showConfirmDialog: true/false}, cb)
launchApp(id,cb)
createAppShortcut(id, cb)
generateAppForLink(string url, string title, function callback)
setLaunchType(string id, LaunchType launchType, function callback)
LaunchType: "OPEN_AS_REGULAR_TAB", "OPEN_AS_PINNED_TAB", "OPEN_AS_WINDOW", or "OPEN_FULL_SCREEN"

events:
chrome.management.onInstalled.addListener(callback(ExtensionInfo))

onUninstalled  id

onEnabled  ExtensionInfo

onDisabled
 */

const userEvents = {
  bind() {
    this.bindLoadall()
    this.bindLaunch()
    // this.bindUninstall()
    // this.bindEnable()
    // this.bindDisable()
  },
  bindLoadall() {
    Message.on(LOAD_APPS, (data, sendResponse) => {
      App.getAll()
        .then(apps => data.types && apps.filter(app => (app.type in data.types)) || apps)
        .then(apps => normalize(apps, arrayOf(appSchema)))
        .then(flatApps => sendResponse({ code: 0, apps: flatApps }) && console.log(flatApps))
    })
  },
  bindLaunch() {
    Message.on(LAUNCH_APP, (appId, sendResponse) => {
      mgm.launchApp(appId, () => sendResponse({ code: 0 }))
    })
  },
}

export default userEvents

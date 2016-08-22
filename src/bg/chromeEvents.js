/* global chrome */
import * as Message from './message'
const mgm = chrome.management
import App from './model/App'
import { INSTALL_APP, UNINSTALL_APP, ENABLE_APP, DISABLE_APP, LOAD_APPS } from '../constants'
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

const chromeEvents = {
  bind() {
    this.bindInstall()
    this.bindUninstall()
    this.bindEnable()
    this.bindDisable()
  },

  bindInstall() {
    mgm.onInstalled.addListener(appInfo =>
      App.add(appInfo).then(app =>
        Message.send(INSTALL_APP, app)))
  },

  bindUninstall() {
    mgm.onUninstalled.addListener(appId =>
      App.delete(appId).then(() =>
        Message.send(UNINSTALL_APP, appId)))
  },

  bindEnable() {
    mgm.onEnabled.addListener(appInfo =>
      App.update(appInfo.id, { enabled: true })
        .then(() => Message.send(ENABLE_APP, appInfo.id)))
  },

  bindDisable() {
    mgm.onDisabled.addListener(appInfo =>
      App.update(appInfo.id, { enabled: false })
        .then(() => Message.send(DISABLE_APP, appInfo.id)))
  },
}

export default chromeEvents

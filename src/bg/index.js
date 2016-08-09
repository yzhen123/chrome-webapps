/* global chrome */
import * as Message from './message'
import { getAllApps, app2obj } from './getAllApps'
import { INSTALL_APP, UNINSTALL_APP, ENABLE_APP, DISABLE_APP, LOAD_APPS } from '../constants'
const mgm = chrome.management
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

const Bg = {
  init() {
    this.bindEvents()
  },

  bindEvents() {
    this.bindLoadall()
    this.bindInstall()
    this.bindUninstall()
    this.bindEnable()
    this.bindDisable()
  },

  bindInstall() {
    mgm.onInstalled.addListener(appInfo => {
      app2obj(appInfo).then(app => {
        Message.send(INSTALL_APP, app)
      })
    })
  },

  bindUninstall() {
    mgm.onUninstalled.addListener(appId => {
      Message.send(UNINSTALL_APP, appId)
    })
  },

  bindEnable() {
    mgm.onEnabled.addListener(appInfo => {
      Message.send(ENABLE_APP, appInfo.id)
    })
  },

  bindDisable() {
    mgm.onDisabled.addListener(appInfo => {
      Message.send(DISABLE_APP, appInfo.id)
    })
  },

  bindLoadall() {
    Message.on(LOAD_APPS, (data, sendResponse) => {
      getAllApps().then((apps) => {
        console.log('myapps', apps)
        sendResponse(apps)
      })
    })
  },
}

Bg.init()

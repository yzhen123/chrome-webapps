/* global chrome */
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
const canvas = document.createElement('canvas')

function setIcon(app) {
  let iconUrl
  if (!app.icons || app.icons.length === 0) {
    iconUrl = 'assets/app.svg'
  } else {
    iconUrl = app.icons[app.icons.length - 1].url
  }
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = iconUrl

  return new Promise((resolve) => {
    img.addEventListener('load', () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const newApp = Object.assign({ }, app)
      newApp.icon = canvas.toDataURL()
      delete newApp.icons
      resolve(newApp)
    })
  })
}

new Promise(resolve => mgm.getAll(resolve))
// .then(apps =>
//   apps.filter(app =>
//     [mgm.ExtensionType.HOSTED_APP,
//       mgm.ExtensionType.PACKAGED_APP,
//       mgm.ExtensionType.LEGACY_PACKAGED_APP].indexOf(app.type) >= 0))
.then(apps => {
  console.log(apps)
  const newApps = apps.map(app => {
    const newApp = { }
    ;['id', 'name', 'shortName', 'description',
      'version', 'mayDisable', 'enabled',
      'type', 'homepageUrl', 'offlineEnabled',
      'optionsUrl', 'hostPermissions',
      'permissions', 'installType', 'icons']
      .forEach((key) => { newApp[key] = app[key] })
    return newApp
  })
  return Promise.all(newApps.map(newApp => setIcon(newApp)))
})
.then(apps => {
  console.log(apps)
})

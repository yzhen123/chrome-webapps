/* global chrome */

const mgm = chrome.management
const canvas = document.createElement('canvas')

export function app2obj(app) {
  const newApp = {}
  ;['id', 'name', 'shortName', 'description',
    'version', 'mayDisable', 'enabled',
    'type', 'homepageUrl', 'offlineEnabled',
    'optionsUrl', 'hostPermissions',
    'permissions', 'installType',
  ].forEach((key) => {
    newApp[key] = app[key]
  })

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
      newApp.icon = canvas.toDataURL()
      resolve(newApp)
    })
  })
}

let CACHED_APPS
export function getAllApps() {
  // if (CACHED_APPS) {
  //   return new Promise(resolve => resolve(CACHED_APPS))
  // }
  const ret = new Promise(resolve => mgm.getAll(resolve))
    .then(apps =>
       Promise.all(apps.map(app => app2obj(app))))
    .then((apps) => {
      CACHED_APPS = apps
      return apps
    })
  return ret
}

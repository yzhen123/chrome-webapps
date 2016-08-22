import { db } from './db'

const mgm = chrome.management
const canvas = document.createElement('canvas')

function app2obj(app: Object, sort: ?string) {
  const newApp = {};
  ['id', 'name', 'shortName', 'description',
    'version', 'mayDisable', 'enabled',
    'type', 'homepageUrl', 'offlineEnabled',
    'optionsUrl', 'hostPermissions',
    'permissions', 'installType',
  ].forEach((key) => {
    newApp[key] = app[key]
  })

  if (sort) {
    newApp.sort = sort
  }

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

const App = {
  app2obj,
  getAllFromChrome() {
    console.log('load apps from chrome')
    this.updateLastUpdateTime()
    return new Promise(resolve => mgm.getAll(resolve))
      .then(appInfos =>
        Promise.all(appInfos.map(app => app2obj(app))))
  },
  loadAllApps() {
    console.log('loadAllApps')
    return Promise.all([this.getAllFromChrome(), db.apps.clear()])
      .then(([apps]) => db.apps.bulkAdd(apps)
        .then(() => new Promise((resolve) => resolve(apps))))
  },
  getAll() {
    return db.apps.toArray().then(apps => {
      if (apps.length === 0) {
        return this.loadAllApps()
      }
      return apps
    })
  },
  get(id: string) {
    return db.apps.get(id)
  },
  delete(id: string) {
    this.updateLastUpdateTime()
    return db.apps.delete(id)
  },
  add(appInfo: Object) {
    this.updateLastUpdateTime()
    return db.apps.add(this.app2obj(appInfo))
      .then((id) => db.apps.get(id))
  },
  update(key: string, changes: Object) {
    this.updateLastUpdateTime()
    return db.apps.update(key, changes)
  },
  updateLastUpdateTime() {
    localStorage.lastUpdateTime = Date.now()
  },
  getLastUpdateTime() {
    return parseInt(localStorage.lastUpdateTime, 10)
  },
}

// load apps from chrome on start
App.loadAllApps()
window.App = App
export default App

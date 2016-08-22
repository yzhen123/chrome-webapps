import Dexie from 'dexie'

const db = new Dexie('app_db')
db.version(1)
  .stores({ apps: 'id,name,type,enabled,mayDisable' })


export { db }

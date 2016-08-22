'use strict'
const fs = require('fs-extra')
const dir = '/Users/z/Projects/Douban/share/Talion/static/css'

const items = [] // files, directories, symlinks, etc
fs.walk(dir)
  .on('readable', function() {
    let item
    while ((item = this.read())) {
      items.push(item.path)
    }
  })
  .on('end', () => {

      items.forEach((item) => {
          if (fs.statSync(item).isFile()) {
          const content = fs.readFileSync(item, 'utf-8')
          // let match = content.match(/[, ]*?a[:, ]*?{[^}]*?color[^}]*?}/)
          // if (match) {
          //   console.log(item, match[0])
          // }
          let match = content.match(/link-color/)
          if (match) {
            if(!content.match(/_misc/)){
              console.log(item)
            }
          }
        }
      })
  })

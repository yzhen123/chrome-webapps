const fs = require('fs-extra')
const path = require('path')

// make bg symlink
// const bgDstPath = './src/bg'
//
// if (!fs.existsSync(bgDstPath)) {
//   fs.symlinkSync('../extension/bg', bgDstPath, 'dir')
// }


// copy libs
const librariesMap = {
  fa: {
    srcBase: './node_modules/font-awesome',
    entry: ['css', 'fonts'],
    dst: './extension/lib/fa',
  },
  mui: {
    srcBase: './node_modules/muicss/lib/css',
    entry: ['mui.min.css'],
    dst: './extension/lib/mui',
  },
}
Object.keys(librariesMap).forEach((key) => {
  const libConf = librariesMap[key]
  libConf.entry.forEach((entry) => {
    const src = path.resolve(libConf.srcBase, entry)
    const dst = path.resolve(libConf.dst, entry)
    if (!fs.existsSync(dst)) {
      fs.copySync(src, dst)
    }
  })
})

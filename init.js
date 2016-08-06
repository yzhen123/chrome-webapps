const fs = require('fs')

const dstPath = './src/bg'

if (!fs.existsSync(dstPath)) {
  fs.symlinkSync('../app/bg', dstPath, 'dir')
}

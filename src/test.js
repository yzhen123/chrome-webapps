/* @flow */

new Promise((resolve) => {
  setTimeout(resolve, 500)
}).then(() => {
  console.log('resolved')
})

const aa: string = 123

aa.toLowerCase()

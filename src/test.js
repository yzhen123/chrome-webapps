
new Promise((resolve, reject) => {
  setTimeout(resolve, 500)
}).then(() => {
  console.log('resolved');
})

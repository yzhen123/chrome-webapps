/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  // chrome.app.window.create(
  //   'index.html',
  //   {
  //     id: 'mainWindow',
  //     bounds: {width: 800, height: 600}
  //   }
  // );
  // window.open("http://www.cnn.com/", "CNN_WindowName", strWindowFeatures);
  const width=350
  const height=600
  const left=100
  const top=100

  window.open('http://localhost:8080', 
    'appLauncherWin', 
    `menubar=no,location=no,resizable=no,scrollbars=yes,status=no,
      left=${left},top=${top},width=${width},height=${height}`)
});


export function initPopWindow(url) {
  let curPopWinId = -1
  chrome.browserAction.onClicked.addListener(() => {
    if (curPopWinId >= 0) {
      chrome.windows.update(curPopWinId, {
        focused: true,
      })
    } else {
      const winPos = JSON.parse(localStorage.winPos || '{}')
      chrome.windows.create({
        url,
        left: winPos.left || 800,
        top: winPos.top || 80,
        width: winPos.width || 350,
        height: winPos.height || 600,
        focused: true,
        type: 'popup',
      }, (window) => {
        curPopWinId = window.id
      })
    }
  })


  chrome.windows.onRemoved.addListener((winId) => {
    if (winId === curPopWinId) {
      curPopWinId = -1
    }
  })
  chrome.window.onFocusChanged.addListener((winId) => {
    if (winId !== curPopWinId) return
    chrome.windows.get(winId, (winInfo) => {
      console.log(winInfo)
      localStorage.winPos = JSON.stringify({
        left: winInfo.left,
        top: winInfo.top,
        width: winInfo.width,
        height: winInfo.height,
      })
    })
  })
}

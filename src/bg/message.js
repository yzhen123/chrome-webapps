/* global chrome */

const listenersMap = { }

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
    console.log(sender.tab, request)
    if (sender.tab) { // 来自page
      if (listenersMap[request.type]) {
        listenersMap[request.type].forEach(
          listener => listener(request.data, sendResponse))
      }
    }
    return true // 异步 sendResponse
  })
/**
 * registe a listener
 * @param  {string} type     type
 * @param  {func} listener listener callback(request, sendResponse)
 * @return
 */
export function on(type, listener) {
  listenersMap[type] = listenersMap[type] || []
  listenersMap[type].push(listener)
}

export function off(type, listener) {
  listenersMap[type] = listenersMap[type] || []
  listenersMap[type] = listenersMap[type].filter(l => l !== listener)
}

/* eslint-disable no-param-reassign */
export function send(type, data, callback) {
  if (typeof data === 'function' && !callback) {
    callback = data
    data = null
  }

  chrome.tabs.query({
    url: ['*://zaaack.github.io/UCALauncher/*',
          '*://127.0.0.1:*/*',
          '*://localhost:*/*'] }, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { type, data }, (response) => {
        console.log(tab.id, 'send', response)
        if (callback) callback(response)
      })
    })
  })
}

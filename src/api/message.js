/* global chrome */
const extId = 'diagniddnebdbkjpkmhmdhoobojgbgpb'
const listenersMap = {}

// 使用web message api(post message 监听扩展的消息)
window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) return
  const { type, data } = event.data
  if (type && listenersMap[type]) {
    listenersMap[type].forEach(
      listener => listener(data))
  }
}, false)

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
// 使用chrome.runtime.sendMessage的api只能从网页发送消息给扩展，扩展不能直接发送消息给网页。
// 解决办法： 扩展发送消息给content_scripts，然后content_scripts通过postMessage发送消息给网页，或者直接修改dom
/* eslint-disable no-param-reassign */
export function send(type, data, callback) {
  if (typeof data === 'function' && !callback) {
    callback = data
    data = null
  }
  callback = callback || (f => f)
  chrome.runtime.sendMessage(extId, { type, data }, callback)
}

/* global chrome */

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
    if (!sender.tab) { // 来自page
      window.postMessage(request, '*')
      sendResponse('sr success!')
    }
    // return true // 异步 sendResponse
  })

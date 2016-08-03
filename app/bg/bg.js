var homeWinId;
chrome.windows.getCurrent(function(win) {
	homeWinId = win.id;
})
var curPopWinId = -1;

function openApp() {
	// body...
}

chrome.browserAction.onClicked.addListener(function(tab) {
	// window.open("http://m.weibo.cn/","weibo",'height=600,width=400,top=80,left=800,toolbar=no,menubar=no,scrollbars=no,location=no,status=no')

	if (curPopWinId >= 0) {
		chrome.windows.update(curPopWinId, {
			focused: true
		})
	} else {
		chrome.windows.create({
			url: 'http://m.weibo.cn/',
			// tabId: 1,
			left: 800,
			top: 80,
			width: 400,
			height: 600,
			focused: true,
			type: 'popup'
		}, function(window) {
			curPopWinId = window.id;
		})
	}
})

chrome.windows.onRemoved.addListener(function(winId) {
	if (winId === curPopWinId) {
		curPopWinId = -1;
	}
})


//add contextMenus

chrome.contextMenus.create({
	title: '分享到微博',
	contexts: ['all'],
	onclick: function(info, tab) {
		var pageUrl = encodeURIComponent(info.pageUrl)
		var title =  info.selectionText ?
			info.selectionText+' via '
			: tab.title +' '
		var url = 'http://service.weibo.com/share/share.php?url=' +
			pageUrl +
			'&title=' + title +
			' ' + info.pageUrl + '&type=button&language=zh_cn&searchPic=true&style=number'
		chrome.tabs.create({
			url: url
		})
	}
})

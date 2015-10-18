var AppManager = {
  homeWinId: -1,
  _default_conf:{
      name: '微博',
      autostart: true,
      url: 'http://m.weibo.cn',
      left: 800,
      top: 80,
      width: 600,
      height: 800,
      focused: true
  },
  _APP_CONF: {
    '微博': {
      name: '微博',
      autostart: true,
      url: 'http://m.weibo.cn',
      left: 800,
      top: 80,
      width: 600,
      height: 800,
      focused: true
    }
  },
  saveLocalConf: function() {
    localStorage['apps'] = JSON.stringify(AppManager._APP_CONF)
  },
  loadLocalConf: function() {
    AppManager._APP_CONF = JSON.parse(localStorage['apps'])
  },
  conf: function(appName, appConf) {
    if (conf) {
      AppManager._APP_CONF[appName] = appConf
      AppManager.updateLocalConf()
    } else {
      return AppManager._APP_CONF[appName]
    }
  },
  updateAppConf: function() {
    var _this=this
    var appNames = Object.keys(this._APP_CONF);
    appNames.forEach(function(appName, index) {
      var appConf = _this._APP_CONF[appName]
      chrome.windows.get(appConf.winId, function(win) {
        Object.assign(appConf, {
          left: win.left,
          top: win.top,
          width: win.width,
          height: win.height,
          focused: win.focused
        })
        if (index === appNames.length - 1){
          _this.saveLocalConf()
        }
      })
    })
  },
  appApp: function (appConf) {
    if(this._APP_CONF[appConf]){
        Object.assign(this._APP_CONF[appConf],appConf)
    }else{
      this._APP_CONF[appConf]=Object.assign({},this._default_conf,appConf)
    }
    this.saveLocalConf()
  },
  delApp: function (appName) {
    delete this._APP_CONF[appName]
    this.saveLocalConf()
  },
  openAppsOnStart: function () {
    var _this=this
     Object.keys(this._APP_CONF).forEach(function (appName) {
        _this._APP_CONF[appName].autostart
          && _this.openApp(appName)
    })
  },
  openApp: function(appName) {
    var appConf = this.conf(appName)
    if (!appConf) {
      alert('APP NOT FOUND! The name is "' + appName + '"')
    }
    if (appConf.winId >= 0) {
      chrome.windows.update(curPopWinId, {
        focused: true
      })
    } else {
      chrome.windows.create({
        url: appConf.url,
        // tabId: 1,
        left: appConf.left,
        top: appConf.top,
        width: appConf.width,
        height: appConf.height,
        focused: appConf.focused,
        type: 'popup'
      }, function(window) {
        appConf.winId = window.id;
      })
    }
  }
}

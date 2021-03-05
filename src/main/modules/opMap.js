const {
    globalShortcut,
    BrowserWindow
} = require('electron')
const addonSwitch = require('../../build/Release/SwitchToWindow.node');

let mapwin


// 创建地图
function createMap(ipcData, callback) {
    let dataLink = "https://" + ipcData.mapConfig.link
    mapwin = new BrowserWindow({
        width: 1920,
        height: 1080,
        frame: false,
        parent: ipcData.win, //win是主窗口
        fullscreen: true,
        show: false
    })
    mapwin.hide()
    mapwin.loadURL(dataLink);
    console.log("load", dataLink)

    mapShotCutRegister(ipcData)

    mapwin.on('closed', () => {
        mapwin = null
    })
    if (callback) {
        callback()
    }
}

// 重新载入地图，切换地图源时用到
function reloadMap(ipcData) {
    // 开关打开才重载入
    if (ipcData.mapConfig.ifHotKey) {
        if (mapwin == null) {
            createMap(ipcData)
        } else {
            destroyMap(ipcData.mapConfig)
            createMap(ipcData)
        }
    }
}

// 销毁地图
function destroyMap(mapConfig) {
    if (mapwin) {
        mapwin.destroy()
        globalShortcut.unregister(mapConfig.hotKey)
    }
}

// 注册地图热键
function mapShotCutRegister(ipcData) {
    globalShortcut.register(ipcData.mapConfig.hotKey, () => {
        if (mapwin == null) {
            createMap(ipcData, () => {
                mapwin.show()
            })
        } else {
            if (mapwin.isVisible()) {
                if (ipcData.mapConfig.ifDelay) {
                    addonSwitch.switch(ipcData.config.className, ipcData.config.windowName)
                    setTimeout(() => {
                        mapwin.hide()
                    }, 500)
                } else {
                    addonSwitch.switch(ipcData.config.className, ipcData.config.windowName)
                    mapwin.hide()
                }
            } else {
                mapwin.show()
            }
        }
    })
}



module.exports = {
    reloadMap,
    createMap,
    destroyMap,
    mapShotCutRegister
}
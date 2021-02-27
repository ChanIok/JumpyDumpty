const fs = require('fs')
const path = require('path')

const {
    globalShortcut,
    BrowserWindow
} = require('electron')
const addonSwitch = require('../../build/Release/SwitchToWindow.node');

let mapwin

function reloadMap() {
    // 开关打开才重载入
    if (ipcData.mapConfig.ifHotKey) {
        if (mapwin == null) {
            createMap()
        } else {
            destroyMap()
            createMap()
        }
    }
}

function createMap(ipcData, callback) {
    let dataLink = ""
    fs.readFile(path.resolve(__dirname, '../../../../../config/mapconfig.json'), function (err, data) {
        if (err) {
            throw err;
        } else {
            dataLink = "https://" + JSON.parse(data.toString()).link
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
    });
}


function destroyMap(mapConfig) {
    if (mapwin) {
        mapwin.destroy()
        globalShortcut.unregister(mapConfig.hotKey)
    }
}

function mapShotCutRegister(ipcData) {
    // console.log(ipcData)
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
const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu,
    autoUpdater,
} = require('electron')

const path = require('path')
const gotTheLock = app.requestSingleInstanceLock()


const {
    initConfig,
    writeConfig,
    writeOcrConfig,
} = require('./main/opConfig')

const {
    getUserInfo
} = require('./main/getInfo')

const {
    handleIPC
} = require('./main/handleIPC')

const {
    getCookie,
    writeCookie
} = require('./main/getCookie')

const {
    getAccessToken,
    ocrArtifactDetails,
    artifactsReset,
    saveAccessToken,
    expoetToClicpBoard
} = require('./main/ocr')

const {
    ocrHotKeyRegister
} = require('./main/iohook')

const {
    runAutoUpdate
} = require('./main/controls/update')

let win
let willQuitApp = false
let ipcData = {
    ocrConfig: {
        api: 'default',
        hotKey: 'default',
        ifDereplication: 'default',
        widthRatio: '',
        heightRatio: '',
        xPosRatio: '',
        yPosRatio: ''
    },
    mapConfig: {
        link: '',
        hotKey: '',
        ifHotKey: '',
        ifDelay: ''
    },
    config: {
        className: '',
        windowName: '',
        ifAutoCookieButton: false,
        ifAutoUpdate:true
    }
}

let config = {}

function handleIPCmain() {
    ipcMain.on('getInfo', (e, data) => {
        getUserInfo(data, () => {
            e.reply('getInfoFinished')
        })
    })

    ipcMain.on('writeCookie', (e, data) => {
        writeCookie(data)
    })
    ipcMain.on('getCookie', (e) => {
        getCookie(() => {
            e.reply('getCookieFinished')
        })
    })

    ipcMain.on('writeApi', (e, value) => {
        console.log("ready-to-write-api")
        ipcData.ocrConfig.api = value
        writeOcrConfig(ipcData.ocrConfig)
    })
    ipcMain.on('getAccessToken', (e, value1, value2) => {
        getAccessToken(value1, value2, () => {
            e.reply("getAccessTokenFinished")
        })
    })
    ipcMain.on('saveAccessToken', (e, value) => {
        console.log("save-access-token")
        saveAccessToken(value)
    })
    ipcMain.on('artifactsReset', (e) => {
        artifactsReset(() => {
            e.reply("artifactsResetFinished")
        })
    })
    ipcMain.on('expoetToClicpBoard', (e) => {
        expoetToClicpBoard(() => {
            e.reply("expoetToClicpBoardFinished")
        })
    })
}


function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    win.on('close', (e) => {
        if (willQuitApp) {
            win = null
        } else {
            e.preventDefault()
            win.hide()
        }

    })

    //创建系统通知区菜单
    tray = new Tray(path.resolve(__dirname, './assets/logo.ico'));
    const contextMenu = Menu.buildFromTemplate([{
            label: '显示界面',
            click: () => {
                win.show()
            }
        }, {
            type: 'separator'
        }, {
            label: '退出',
            click: () => {
                win.destroy()
                // app.quit()
                // app.exit()
            }
        }, //退出
    ])
    tray.setToolTip('这是一个蹦蹦炸弹')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => { //打开关闭应用
        win.isVisible() ? win.hide() : win.show()
        win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    })

    // win.loadURL("http://localhost:8080")
    win.loadFile('./src/renderer/index.html')
    ipcData.contents = win.webContents
    ipcData.win = win
}



if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        //当运行第二个实例时,将会聚焦到win这个窗口

        if (win.isMinimized()) {
            win.restore()
        } else if (!win.isVisible()) {
            win.show()
        }
        win.focus()
    })
    app.on('ready', () => {
        createWindow()
        initConfig(ipcData) //加载设置
        handleIPCmain()
        handleIPC(ipcData)


        setTimeout(() => {
            if(ipcData.config.ifAutoUpdate){
                console.log("auto-update")
                runAutoUpdate(win)
            }
        }, 5000);

        setTimeout(() => {
            ocrHotKeyRegister(ipcData)
        }, 1000);
    })
}


app.whenReady().then(() => {})


app.on('before-quit', () => {
    ioExit()
    console.log("before-quit")
});



app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
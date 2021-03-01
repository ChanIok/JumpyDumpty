const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu,
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


let win
let willQuitApp = false
let ipcData = {
    ocrConfig: {
        api: 'default',
        hotKey: 'default',
        ifDereplication: 'default',
        widthRatio:'',
        heightRatio:'',
        xPosRatio:'',
        yPosRatio:''
    },
    mapConfig: {
        link: '',
        hotKey: '',
        ifHotKey: '',
        ifDelay: ''
    },
    config:{
        className:'',
        windowName:'',
        ifAutoCookieButton:false
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
        }},{
            type:'separator'
        },{
            label: '退出',
            click: () => {
                // win.destroy()
                // app.quit()
                app.exit()
            }
        }, //直接强制退出
    ])
    tray.setToolTip('这是一个蹦蹦炸弹')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => { //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
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
        initConfig(ipcData) //加载设置，引用类型传参，加载后回调创建地图
        handleIPCmain()
        handleIPC(ipcData)

        setTimeout(() => {
            ocrHotKeyRegister(ipcData)
        }, 1000);
    })
}


app.whenReady().then(() => {})


app.on('before-quit', () => {
    ioExit()
});


// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }

})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
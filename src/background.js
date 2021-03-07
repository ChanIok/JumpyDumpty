const {
    app,
    BrowserWindow,
} = require('electron')


const gotTheLock = app.requestSingleInstanceLock()

const {
    initialize
} = require('./main/controls/opConfig')


const {
    handleIPC
} = require('./main/controls/handleIPC')

const {
    runAutoUpdate
} = require('./main/controls/update')

const {
    createTray
} = require('./main/controls/tray')



let win
let willQuitApp = false
let ipcData = {
    ocrConfig: {
        api: '',
        hotKey: '',
        ifDereplication: '',
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
        ifAutoUpdate: true
    }
}


function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 1280,
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
    createTray(win)

    // win.loadURL("http://localhost:8080")
    win.loadFile('./src/renderer/index.html')
    ipcData.win = win
}


// 防止多开
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
        initialize(ipcData) //初始化并加载设置
        handleIPC(ipcData)

        setTimeout(() => {
            if (ipcData.config.ifAutoUpdate) {
                console.log("auto-update")
                runAutoUpdate(win)
            }
        }, 5000);

 
    })
}


app.on('before-quit', () => {
    ioExit()
    console.log("before-quit")
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
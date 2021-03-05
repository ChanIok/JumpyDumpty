const ioHook = require('iohook')
const {
    globalShortcut,
    Notification
} = require('electron')


const {
    ocrArtifactDetails,
} = require('./ocr')


const {
    createFloatingWindow,
    closeFloatingWindow
} = require('./floatingWin')


let ifOCRHotKey = false
let ifOCRing = false
let ifMouseClick = false



function ocrHotKeyRegister(ipcData) {
    // 注册热键
    globalShortcut.register(ipcData.ocrConfig.hotKey, () => {
        // 关闭热键OCR
        if (ifOCRHotKey) {
            ifOCRHotKey = false
            ipcData.contents.send("ocrShotCutClose")
            showNotification("close")
            ioStop()
        } else { // 开启

            // 鼠标按下
            ioHook.on('mousedown', () => {
                ifMouseClick = true
            });
            ioHook.on('mouseup', () => {
                if (ifMouseClick && !ifOCRing) {
                    ifOCRing = true
                    ipcData.contents.send("ocrShotCutWorking")
                    // 延迟发送OCR请求
                    setTimeout(() => {
                        ocrArtifac(ipcData)
                    }, 50)
                    setTimeout(() => {
                        ifOCRing = false
                    }, 50)
                }
            });
            ioHook.on('mousedrag', () => {
                ifMouseClick = false
            });
            console.log("start-ocr")
            ifOCRHotKey = true
            showNotification("open")
            ipcData.contents.send("ocrShotCutOpen")
            ioStart()
        }
    })


}

// 显示系统通知
function showNotification(res) {
    if (res == "open") {
        let notification = new Notification({
            title: '已开启热键',
            body: '请点击鼠标以抓取圣遗物'
        })
        // notification.show()
        createFloatingWindow()
        setTimeout(() => {
            notification.close()
        }, 1200);
    } else if (res == "close") {
        let notification = new Notification({
            title: '已关闭热键',
            body: "可导出圣遗物"
        })
        notification.show()
        closeFloatingWindow()
        setTimeout(() => {
            notification.close()
        }, 3500);
    }
}


// 单步的OCR操作
function ocrArtifac(ipcData) {
    ocrArtifactDetails(ipcData, true)
}

// iohook相关
function ioStart() {
    ioHook.start()
}

function ioStop() {
    ioHook.stop()
}

function ioExit() {
    ioHook.unload()
    ioHook.stop()
}



module.exports = {
    ioExit,
    ocrHotKeyRegister
}
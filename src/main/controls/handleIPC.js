const {
    ipcMain,
    globalShortcut
} = require('electron')

const {
    writeConfig,
    writeMapConfig,
    writeOcrConfig,
} = require('./opConfig')
const {
    ocrHotKeyRegister
} = require('../modules/iohook')
const {
    reloadMap,
    createMap,
    destroyMap,
    mapShotCutRegister
} = require('../modules/opMap')

const {
    getLatestVersionInfo,
    clearTemp,
    readyToUpdate
} = require('./update')

const {
    getCookie,
    writeCookie
} = require('../modules/getCookie')

const {
    getAccessToken,
    ocrArtifactDetails,
    saveAccessToken,
} = require('../modules/ocr')


const {
    artifactsReset,
    expoetToClicpBoard,
    artifactsImport
} = require('../modules/opOCRData')
const {
    getUserInfo
} = require('../modules/getInfo')
const {
    writeQueryUidsHistory
} = require('../modules/opInfoData')


function handleIPC(ipcData) {
    // 用户查询
    ipcMain.on('getInfo', (e, data) => {
        getUserInfo(data, () => {
            e.reply('getInfoFinished')
        })
    })
    //查询历史记录
    ipcMain.on('writeQueryUidsHistory', (e, value) => {
        writeQueryUidsHistory(value)
    })

    // Cookie相关
    ipcMain.on('writeCookie', (e, data) => {
        writeCookie(data)
    })
    ipcMain.on('getCookie', (e) => {
        getCookie(() => {
            e.reply('getCookieFinished')
        })
    })

    // 写入OCR的API
    ipcMain.on('writeApi', (e, value) => {
        console.log("ready-to-write-api")
        ipcData.ocrConfig.api = value
        writeOcrConfig(ipcData.ocrConfig)
    })
    // 获取AccessToken
    ipcMain.on('getAccessToken', (e, value1, value2) => {
        getAccessToken(value1, value2, () => {
            e.reply("getAccessTokenFinished")
        })
    })
    // 保持AccessToken
    ipcMain.on('saveAccessToken', (e, value) => {
        console.log("save-access-token")
        saveAccessToken(value)
    })

    // 导入圣遗物
    ipcMain.on('importFromClicpBoard', (e) => {
        artifactsImport(ipcData)
    })

    // 清空圣遗物
    ipcMain.on('artifactsReset', (e) => {
        artifactsReset(() => {
            e.reply("artifactsResetFinished")
        })
    })

    // 导出圣遗物到剪贴板
    ipcMain.on('expoetToClicpBoard', (e) => {
        expoetToClicpBoard(() => {
            e.reply("expoetToClicpBoardFinished")
        })
    })

    // OCR热键更改
    ipcMain.on('writeOCRHotKey', (e, data) => {
        globalShortcut.unregister(ipcData.ocrConfig.hotKey)
        ipcData.ocrConfig.hotKey = data
        writeOcrConfig(ipcData.ocrConfig)
        ocrHotKeyRegister(ipcData)
    })

    // OCR去重更改
    ipcMain.on('writeIfDereplication', (e, data) => {
        ipcData.ocrConfig.ifDereplication = data
        console.log("writeIfDereplication")
        writeOcrConfig(ipcData.ocrConfig)
    })

    // OCR抓取
    ipcMain.on('artifactsCatch', (e) => {
        ocrArtifactDetails(ipcData, false, () => {
            e.reply("artifactsCatchFinished")
        })
    })

    // 自动获取Cookie设置
    ipcMain.on('writeifAutoCookie', (e, data) => {
        ipcData.config.ifAutoCookieButton = data
        writeConfig(ipcData.config)
    })


    // 退出程序
    ipcMain.on('exitProcess', () => {
        console.log('win-destroy')
        ipcData.win.destroy()
    })


    // 热键地图操作相关
    ipcMain.on('createMap', () => {
        ipcData.mapConfig.ifHotKey = true
        writeMapConfig(ipcData.mapConfig)
        createMap(ipcData)
    })
    ipcMain.on('destroyMap', () => {

        ipcData.mapConfig.ifHotKey = false
        writeMapConfig(ipcData.mapConfig)
        destroyMap(ipcData.mapConfig)
    })
    ipcMain.on('reloadMap', () => {
        reloadMap(ipcData)
    })

    // 地图设置相关
    ipcMain.on('writeMapUrl', (e, data) => {
        ipcData.mapConfig.link = data
        writeMapConfig(ipcData.mapConfig)
    })
    ipcMain.on('writeMapIfDelay', (e, data) => {
        ipcData.mapConfig.ifDelay = data
        writeMapConfig(ipcData.mapConfig)
    })
    ipcMain.on('writeMapHotKey', (e, data) => {
        globalShortcut.unregister(ipcData.mapConfig.hotKey)
        ipcData.mapConfig.hotKey = data
        writeMapConfig(ipcData.mapConfig)
        mapShotCutRegister(ipcData)
    })

    // 进阶设置修改
    ipcMain.on('writeAdvancedConfig', (e, value1, value2, value3, value4, value5, value6, value7) => {

        ipcData.ocrConfig.ifFullScreen = value3
        ipcData.ocrConfig.widthRatio = parseFloat(value4)
        ipcData.ocrConfig.heightRatio = parseFloat(value5)
        ipcData.ocrConfig.xPosRatio = parseFloat(value6)
        ipcData.ocrConfig.yPosRatio = parseFloat(value7)

        writeOcrConfig(ipcData.ocrConfig)

        ipcData.config.className = value1
        ipcData.config.windowName = value2

        writeConfig(ipcData.config)
    })



    // 获取更新相关
    ipcMain.on('writeifAutoUpdate', (e, data) => {
        ipcData.config.ifAutoUpdate = data
        writeConfig(ipcData.config)
    })

    ipcMain.on('checkUpdate', (e) => {
        getLatestVersionInfo(ipcData.win)
    })
    ipcMain.on('cancelUpdate', (e) => {
        clearTemp()
    })
    ipcMain.on('manualUpdate', (e) => {
        console.log('IPC-manualUpdate')
        readyToUpdate()
    })


}


module.exports = {
    handleIPC
}
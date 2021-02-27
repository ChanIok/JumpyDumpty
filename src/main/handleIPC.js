const {
    app,
    ipcMain,
    globalShortcut
} = require('electron')



const {
    initConfig,
    loadConfig,
    writeConfig,
    writeMapConfig,
    writeOcrConfig,
} = require('./opConfig')
const {
    ocrHotKeyRegister
} = require('./iohook')
const {
    reloadMap,
    createMap,
    destroyMap,
    mapShotCutRegister
} = require('./map/opMap')


const {
    ocrArtifactDetails
} = require('./ocr')




function handleIPC(ipcData) {

    // OCR热键更改
    ipcMain.on('writeOCRHotKey', (e, data) => {
        globalShortcut.unregister(ipcData.ocrConfig.hotKey)
        ipcData.ocrConfig.hotKey = data
        writeOcrConfig(ipcData.ocrConfig)
        ocrHotKeyRegister(ipcData)
        // ipcData.contents.send("ocrHotKeyConflict")
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
        console.log('exit')
        app.exit()
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
    ipcMain.on('writeAdvancedConfig', (e, value1, value2, value3, value4, value5, value6) => {

        ipcData.ocrConfig.widthRatio = value3
        ipcData.ocrConfig.heightRatio = value4
        ipcData.ocrConfig.xPosRatio = value5
        ipcData.ocrConfig.yPosRatio = value6

        writeOcrConfig(ipcData.ocrConfig)

        ipcData.config.className = value1
        ipcData.config.windowName = value2

        writeConfig(ipcData.config)
    })
}


module.exports = {
    handleIPC
}
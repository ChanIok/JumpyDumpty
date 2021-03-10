const path = require('path')
const fs = require('fs')

const {
    createMap
} = require('../modules/opMap')

const {
    ocrHotKeyRegister
} = require('../modules/iohook')

async function initialize(ipcData) {
    await initDir()
    await initDoc()
    await loadConfig(ipcData)
    if (ipcData.mapConfig.ifHotKey) {
        createMap(ipcData)
    }
    ocrHotKeyRegister(ipcData)
}

// 初始化文件夹
function initDir() {
    return new Promise(resolve => {
        fs.mkdirSync(path.resolve(__dirname, '../../../../../config'), {
            recursive: true
        }, function (error) {
            if (error) {
                console.log("mkdir-config-err")
            }
        })
        fs.mkdirSync(path.resolve(__dirname, '../../../../../data'), {
            recursive: true
        }, function (error) {
            if (error) {
                console.log("mkdir-data-err")
            }
        })
        resolve('done')
    })
}



// 初始化文件
async function initDoc() {
    return new Promise(resolve => {
        let mapConfigWrite = {
            link: "webstatic.mihoyo.com/app/ys-map-cn/index.html?bbs_presentation_style=no_header&ts=1606133548270#/map/2?utm_source=bbs&utm_medium=mys&utm_campaign=slm&shown_types=&center=1675.00,-1190.00&zoom=-1.00",
            hotKey: "Alt+E",
            ifHotKey: false,
            ifDelay: true,
        }
        let configWrite = {
            className: 'UnityWndClass',
            windowName: '原神',
            ifAutoCookieButton: false,
            ifAutoUpdate: true
        }

        let ocrConfigWrite = {
            api: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=',
            ifDereplication: true,
            hotKey: "Alt+R",
            widthRatio: 0.2450,
            heightRatio: 0.5100,
            xPosRatio: 0.6800,
            yPosRatio: 0.1100,
            ifFullScreen: false
        }

        let baiduTokenWrite = {
            access_token: ""
        }
        let cookieWrite = {
            cookie: "",
        }
        let artifactsWrite = {}
        let queryUidsHistoryWrite={
            uids:[]
        }

        let rw1 = readAndWriteDoc(mapConfigWrite, "config", "mapconfig")
        let rw2 = readAndWriteDoc(baiduTokenWrite, "config", "baiduToken")
        let rw3 = readAndWriteDoc(ocrConfigWrite, "config", "ocrConfig")
        let rw4 = readAndWriteDoc(configWrite, "config", "config")

        let rw5 = readAndWriteDoc(cookieWrite, "data", "cookie")
        let rw6 = readAndWriteDoc(artifactsWrite, "data", "artifacts")
        let rw7 = readAndWriteDoc(queryUidsHistoryWrite, "data", "queryUidsHistory")

        Promise.all([rw1, rw2, rw3, rw4, rw5, rw6,rw7]).then(() => {
            resolve("done")
        })

    })
}

// 读取并写入数据
async function readAndWriteDoc(dataWrite, fileType, fileName) {
    return new Promise(resolve => {
        fs.readFile(path.resolve(__dirname, `../../../../../${fileType}/${fileName}.json`), function (err, dataRead) {
            if (err) {
                // 大概文件不存在
                // throw err;
            } else {
                if (dataRead != "") {
                    dataRead = JSON.parse(dataRead.toString())
                    for (let itemName in dataWrite) {
                        // 如果读的文件有这个属性,就读
                        if (typeof (dataRead[itemName]) != "undefined") {
                            dataWrite[itemName] = dataRead[itemName]
                        }
                    }
                }
            }
            fs.writeFile(path.resolve(__dirname, `../../../../../${fileType}/${fileName}.json`), JSON.stringify(dataWrite, null, 4), (err) => {
                if (err) {
                    console.log(`write-${fileType}/${fileName}-err`)
                }
                resolve("done")
            })
        })
    })
}

// 加载数据
async function loadConfig(ipcData) {
    return new Promise(resolve => {

        let read1 = readDoc(ipcData, "ocrConfig", "config", "ocrConfig")
        let read2 = readDoc(ipcData, "mapConfig", "config", "mapconfig")
        let read3 = readDoc(ipcData, "config", "config", "config")
        Promise.all([read1, read2, read3]).then(() => {
            console.log("loadedConfig")
            resolve("done")
        })
    })
}

// 读取文件
async function readDoc(ipcData, configName, fileType, fileName) {
    return new Promise(resolve => {
        fs.readFile(path.resolve(__dirname, `../../../../../${fileType}/${fileName}.json`), function (err, dataRead) {
            if (err) {
                console.log(`read-${fileName}-err`, err)
            } else {
                dataRead = JSON.parse(dataRead.toString())

                configData = ipcData[configName]
                for (let itemName in configData) {
                    configData[itemName] = dataRead[itemName]
                }
                ipcData[configName] = configData
            }
            resolve("done")
        });
    })
}

function writeMapConfig(mapConfig) {
    writeDoc(mapConfig, "config", "mapconfig")
}

function writeConfig(config) {
    writeDoc(config, "config", "config")
}

function writeOcrConfig(ocrConfig) {
    writeDoc(ocrConfig, "config", "ocrConfig")
}

function writeDoc(dataWrite, fileType, fileName) {
    fs.writeFile(path.resolve(__dirname, `../../../../../${fileType}/${fileName}.json`), JSON.stringify(dataWrite, null, 4), (err) => {
        if (err) throw err
    })
}

module.exports = {
    initialize,
    writeMapConfig,
    writeConfig,
    writeOcrConfig
}
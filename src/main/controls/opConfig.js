const path = require('path')
const fs = require('fs')

const {
    createMap,
} = require('../modules/opMap')


function initConfig(ipcData) {

    fs.mkdir(path.resolve(__dirname, '../../../../config'), function (error) {
        if (error) {
            // if (error.code == 'EEXIST') {
            //     fs.writeFile(path.resolve(__dirname, '../../../config/mapconfig.json'), mapConfigWrite, (err) => {
            //         if (err) throw err
            //     })
            // } else {
            //     console.log(error);
            //     return false;
            // }
            // 文件夹已创建
            loadConfig(ipcData)
        } else {

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
                ifAutoUpdate:true
            }
            let cookieWrite = {
                cookie: "",
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
            let artifactsWrite = {

            }
            let baiduTokenWrite = {
                access_token: ""
            }
            
            fs.writeFile(path.resolve(__dirname, '../../../../config/mapconfig.json'), JSON.stringify(mapConfigWrite, null, 4), (err) => {
                if (err) throw err
                else {

                }
            })
            fs.writeFile(path.resolve(__dirname, '../../../../config/baiduToken.json'), JSON.stringify(baiduTokenWrite, null, 4), (err) => {
                if (err) throw err
                else {

                }
            })

            fs.writeFile(path.resolve(__dirname, '../../../../config/config.json'), JSON.stringify(configWrite, null, 4), (err) => {
                if (err) throw err
                else {

                }
            })
            fs.writeFile(path.resolve(__dirname, '../../../../config/ocrConfig.json'), JSON.stringify(ocrConfigWrite, null, 4), (err) => {
                if (err) throw err
                else {

                }
            })

            fs.mkdir(path.resolve(__dirname, '../../../../data'), function (error) {
                if (error) {} else {
                    fs.writeFile(path.resolve(__dirname, '../../../../data/cookie.json'), JSON.stringify(cookieWrite, null, 4), (err) => {
                        if (err) throw err
                        else {

                        }
                    })
                    fs.writeFile(path.resolve(__dirname, '../../../../data/artifacts.json'), JSON.stringify(artifactsWrite, null, 4), (err) => {
                        if (err) throw err
                        else {

                        }
                    })

                    setTimeout(() => {
                        loadConfig(ipcData)
                    }, 0);
                }
            })

        }

    })

}

function loadConfig(ipcData) {
    // initConfig()

    let ocrDataConfig = {}
    fs.readFile(path.resolve(__dirname, '../../../../config/ocrConfig.json'), function (err, ocrDataRead) {
        if (err) {
            // throw err;
        } else {
            ocrDataConfig = JSON.parse(ocrDataRead.toString())
            ipcData.ocrConfig.api = ocrDataConfig.api
            ipcData.ocrConfig.hotKey = ocrDataConfig.hotKey
            ipcData.ocrConfig.ifDereplication = ocrDataConfig.ifDereplication
            ipcData.ocrConfig.widthRatio = ocrDataConfig.widthRatio
            ipcData.ocrConfig.heightRatio = ocrDataConfig.heightRatio
            ipcData.ocrConfig.xPosRatio = ocrDataConfig.xPosRatio
            ipcData.ocrConfig.yPosRatio = ocrDataConfig.yPosRatio
            ipcData.ocrConfig.ifFullScreen = ocrDataConfig.ifFullScreen
        }
    });

    let mapDataConfig = {}
    fs.readFile(path.resolve(__dirname, '../../../../config/mapconfig.json'), function (err, dataMapRead) {
        if (err) {
            // throw err;
        } else {
            mapDataConfig = JSON.parse(dataMapRead.toString())

            ipcData.mapConfig.link = mapDataConfig.link
            ipcData.mapConfig.hotKey = mapDataConfig.hotKey
            ipcData.mapConfig.ifHotKey = mapDataConfig.ifHotKey
            ipcData.mapConfig.ifDelay = mapDataConfig.ifDelay
            if (mapDataConfig.ifHotKey) {

                createMap(ipcData)

            }
        }
    });

    let dataConfig = {}
    fs.readFile(path.resolve(__dirname, '../../../../config/config.json'), function (err, dataRead) {
        if (err) {
            // throw err;
        } else {
            dataConfig = JSON.parse(dataRead.toString())
            ipcData.config.className = dataConfig.className
            ipcData.config.windowName = dataConfig.windowName
            ipcData.config.ifAutoCookieButton = dataConfig.ifAutoCookieButton
            ipcData.config.ifAutoUpdate = dataConfig.ifAutoUpdate
        }
    });

}


function writeMapConfig(mapConfig) {
    fs.writeFile(path.resolve(__dirname, '../../../../config/mapconfig.json'), JSON.stringify(mapConfig, null, 4), (err) => {
        if (err) throw err
    })

}

function writeConfig(config) {
    fs.writeFile(path.resolve(__dirname, '../../../../config/config.json'), JSON.stringify(config, null, 4), (err) => {
        if (err) throw err
    })

}

function writeOcrConfig(config) {
    fs.writeFile(path.resolve(__dirname, '../../../../config/ocrConfig.json'), JSON.stringify(config, null, 4), (err) => {
        if (err) throw err
    })
}

module.exports = {
    initConfig,
    loadConfig,
    writeMapConfig,
    writeConfig,
    writeOcrConfig
}
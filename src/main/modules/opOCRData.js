const {
    clipboard
} = require('electron')

const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

// 导入圣遗物
async function artifactsImport(ipcData) {
    let text = clipboard.readText()
    let importNum = 0
    let repeatNum=0
    if (text != '') {

        // 替换字符串
        text = text.replace(/feather/g, "plume")
        text = text.replace(/sand/g, "sands")
        text = text.replace(/cup/g, "goblet")
        text = text.replace(/head/g, "circlet")


        let artifactsOrigin = JSON.parse(text)
        let data = fs.readFileSync(path.resolve(__dirname, '../../../../../data/artifacts.json'))

        let dataSource = JSON.parse(data.toString())

        for (let posName in artifactsOrigin) {
            if (artifactsOrigin[posName].length == 0) {
                continue
            } else {
                let artifactsPostionList = artifactsOrigin[posName]
                for (let artifactItem in artifactsPostionList) {


                    // 重新计算hash
                    let tempData = JSON.parse(JSON.stringify(artifactsPostionList[artifactItem]))
                    delete tempData.omit
                    let hashData = {}
                    hashData.mainTag = tempData.mainTag
                    hashData.normalTags = tempData.normalTags
                    hashData.star = tempData.star
                    hashData.level = tempData.level
                    hashData.position = tempData.position
                    hashData.setName = tempData.setName
                    hashData.detailName = tempData.detailName

                    hashData.id = crypto.createHash('md5').update(JSON.stringify(hashData)).digest("hex")

                    hashData.omit = artifactsPostionList[artifactItem].omit

                    let ifImportSuccess = await compareID(dataSource, hashData)
                    if (ifImportSuccess) {
                        importNum++
                    }else{
                        repeatNum++
                    }

                }
            }
        }
        ipcData.win.webContents.send("importFromClicpBoardFinished", 'success', importNum,repeatNum)
    } else {
        ipcData.win.webContents.send("importFromClicpBoardFinished", 'error', "clipBoardNull")
    }
}

// 查找有无重复的圣遗物
function compareID(dataSource, hashData) {
    return new Promise(resolve => {

        for (let itemName in dataSource) {
            if (dataSource[itemName].length == 0) {
                continue
            } else {
                let temp = dataSource[itemName]
                for (let tempItem in temp) {
                    // 有重复的
                    if (temp[tempItem].id == hashData.id) {
                        resolve(false)
                    }
                }
            }
        }
        dataSource[hashData.position].push(hashData)

        fs.writeFile(path.resolve(__dirname, '../../../../../data/artifacts.json'), JSON.stringify(dataSource, null, 4), (err) => {
            if (err) throw err
            else {
                resolve(true)
            }
        })

    })
}


// 清空存储的圣遗物
function artifactsReset(callback) {
    let data = {
        flower: [],
        plume: [],
        sands: [],
        goblet: [],
        circlet: []
    }
    fs.writeFile(path.resolve(__dirname, '../../../../../data/artifacts.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) throw err
        else {
            console.log("reset")
            if (callback) {
                callback()
            }
        }
    })
}

// 将圣遗物导出到剪贴板
function expoetToClicpBoard(callback) {
    fs.readFile(path.resolve(__dirname, '../../../../../data/artifacts.json'), function (err, data) {
        if (err) {
            // throw err;
        } else {
            clipboard.writeText(data.toString())
            if (callback) {
                callback()
            }
        }
    })
}

module.exports = {
    artifactsReset,
    expoetToClicpBoard,
    artifactsImport
}
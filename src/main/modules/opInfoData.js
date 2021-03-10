const path = require('path')
const fs = require('fs')

// 写入用户信息
function writeUserData(userInfo) {
    fs.writeFile(path.resolve(__dirname, '../../../../../data/userInfo.json'), JSON.stringify(userInfo, null, 4), (err) => {
        if (err) throw err
    })
}

// 写入角色详情信息
function writeCharactersData(charactersInfo) {
    fs.writeFile(path.resolve(__dirname, '../../../../../data/charactersInfo.json'), JSON.stringify(charactersInfo, null, 4), (err) => {
        if (err) throw err
    })
}

// 写入深渊信息
function writeSpiralAbyssData(spiralAbyssInfo) {
    fs.writeFile(path.resolve(__dirname, '../../../../../data/spiralAbyssInfo.json'), JSON.stringify(spiralAbyssInfo, null, 4), (err) => {
        if (err) throw err
    })
}

// 写入查询历史记录
function writeQueryUidsHistory(value) {
    let QueryUidsHistory={
        uids:value
    }
    fs.writeFile(path.resolve(__dirname, '../../../../../data/queryUidsHistory.json'), JSON.stringify(QueryUidsHistory, null, 4), (err) => {
        if (err) throw err
    })
}


module.exports = {
    writeUserData,
    writeCharactersData,
    writeSpiralAbyssData,
    writeQueryUidsHistory
}
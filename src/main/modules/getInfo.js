const axios = require('axios')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const {
    writeUserData,
    writeCharactersData,
    writeSpiralAbyssData
} = require('./opInfoData')


let cookie = ""

// 读取Cookie
function readCookie(callback){
    fs.readFile(path.resolve(__dirname, '../../../../../data/cookie.json'), function (err, data) {
        if (err) {
            // throw err;
        } else {
            dataRead = JSON.parse(data.toString())
            cookie = dataRead.cookie
            // console.log("read-cookie-success")
            if(callback){
                callback()
            }
        }
    });
}

// 获取用户信息
function getUserInfo(uid,callback) {
    readCookie(()=>{
        axios.get("https://api-takumi.mihoyo.com/game_record/genshin/api/index?server=" + getServer(uid) + "&role_id=" + uid, {
            headers: {
                'cookie': cookie,
                'DS': getDS(),
                'Origin': 'https://webstatic.mihoyo.com',
                'x-rpc-app_version': '2.3.0',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G960F Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36 miHoYoBBS/2.5.1',
                'x-rpc-client_type': '5',
                'Referer': 'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,en-US;q=0.9',
                'X-Requested-With': 'com.mihoyo.hyperion',
                'Accept': 'application/json, text/plain, */*',
            },
        }).then((response) => {
            if (response.data.retcode == 0) {
                writeUserData(response.data)
                getSpiralAbyssInfo(uid)
                handleInfo(uid,response,callback)
            } else {
                writeUserData(response.data)
                console.log("getInfoERR:",response.data)
                callback()
            }
        }).catch((err) => {
            console.log(err)
        })
    })
  
}

// 获取深渊信息
function getSpiralAbyssInfo(uid,callback) {
    readCookie(()=>{
        axios.get("https://api-takumi.mihoyo.com/game_record/genshin/api/spiralAbyss?server=" + getServer(uid) + "&role_id=" + uid + "&schedule_type=1", {
            headers: {
                'cookie': cookie,
                'DS': getDS(),
                'Origin': 'https://webstatic.mihoyo.com',
                'x-rpc-app_version': '2.3.0',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G960F Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36 miHoYoBBS/2.5.1',
                'x-rpc-client_type': '5',
                'Referer': 'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,en-US;q=0.8',
                'X-Requested-With': 'com.mihoyo.hyperion',
                'Accept': 'application/json, text/plain, */*',
            },
        }).then((response) => {
            if (response.data.retcode == 0) {
                writeSpiralAbyssData(response.data)
            } else {
             
                console.log("getSpiralAbyssInfoERR:",response.data)
            }
            // console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    })
}




// 获取角色详情
function getCharactersInfo(uid, characterIDs,callback) {
    roleInfoServer = getServer(uid)
    axios({
        url: "https://api-takumi.mihoyo.com/game_record/genshin/api/character",
        method: 'post',
        data: {
            "character_ids": characterIDs,
            "role_id": uid,
            "server": getServer(uid),
        },
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'cookie': cookie,
            'DS': getDS(),
            'Origin': 'https://webstatic.mihoyo.com',
            'x-rpc-app_version': '2.3.0',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G960F Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Safari/537.36 miHoYoBBS/2.5.1',
            'x-rpc-client_type': '5',
            'Referer': 'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.8',
            'X-Requested-With': 'com.mihoyo.hyperion',
            'Accept': 'application/json, text/plain, */*',
        }
    }).then(function (response) {
        writeCharactersData(response.data)
        callback()
    }, function (err) {
        console.log('err')
    })
}


// 将用户的所有角色id导出到数组，再获取该数组的所有角色详情
function handleInfo(uid,res,callback) {
    let data = res.data
    let characterIDs = []
    if (data.retcode != 0) {
        return (
            "Api报错，返回内容为：\r\n" +
            data
        )
    } else {
        characterList = data.data.avatars
        for (let item of characterList) {
            characterIDs.push(item.id)
        }
        getCharactersInfo(uid, characterIDs,callback)
    }
}


// 获取服务器名字
function getServer(uid) {
    if (uid[0] == "1") {
        return "cn_gf01"
    } else if (uid[0] == "5") {
        return "cn_qd01"
    }
    return ""
}


// 获取签名
function getDS() {
    // v2.3.0-web @povsister & @journey-ad
    let n= 'h8w582wxwgqvahcdkpvdhbh2w9casgfl'
    let i = Math.round(((new Date().getTime()) / 1000)).toString()
    let r = randomString(6)
    let c = crypto.createHash('md5').update("salt=" + n + "&t=" + i + "&r=" + r).digest("hex")
    return (i + "," + r + "," + c)
}

// 生成随机字符串
function randomString(e) {
    let t = "0123456789abcdefghijklmnopqrstuvwxyz",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

module.exports = {
    getUserInfo
}
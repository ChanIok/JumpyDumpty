const {
  app,
} = require('electron')



const fs = require('fs')

const path = require('path')

const axios = require('axios')
const request = require("request");



const {
  createGzip,
  createUnzip
} = require('zlib');
const {
  pipeline
} = require('stream');

const {
  createReadStream,
  createWriteStream
} = require('fs');
const crypto = require('crypto')
const {
  version
} = require(path.resolve(__dirname, '../../../package.json'))



const exec = require('child_process').exec
// 本地需要启动的后台服务名称
let cmdStr = 'Dodoco'
// 当前的所在目录
let cmdPath = app.getAppPath().replace(/\\resources\\app.asar/, '')
// let cmdPath = app.getAppPath()
let workerProcess


// 当前版本号
let appVersion = version
let latestRes

// 是否自动更新
let ifAutoUpdate = false


let jsdelivrUrl = 'https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/'


// 获取最新版本信息
function getLatestVersionInfo(win) {
  ifScriptDownload = false

  console.log("start-to-getVersion")
  axios({
    url: jsdelivrUrl + 'latest.json' + "?_=" + Date.parse(new Date()) / 1000,
    // url: 'http://127.0.0.1:10996/latest.json',
    method: 'get',
    timeout: 20000,
  }).then(function (latestResData) {

    latestRes = latestResData.data

    console.log("latest:", latestRes.version, ",current:", appVersion)

    win.webContents.send("getVersionFinished", "success-version", latestRes.version, appVersion)
    getLatestVersionScript(win)
  }, function (err) {
    win.webContents.send("getVersionFinished", "error-get")
    console.log("get-latest-err")
  })
}

// 获取更新脚本
function getLatestVersionScript(win) {
  if (latestRes.version > appVersion) {
    fs.mkdirSync(path.resolve(__dirname, '../../../../temp'), {
      recursive: true
    }, function (err) {
      if (err) {

      } else {
        console.log("creat done");
      }
    })

    fs.writeFile(path.resolve(__dirname, '../../../../temp/latest.json'), JSON.stringify(latestRes, null, 4), (err) => {
      if (err) throw err
      else {}
    })

    let scrpitUrl = jsdelivrUrl + latestRes.version + '/script.js' + "?_=" + Date.parse(new Date()) / 1000
    // let url = 'http://127.0.0.1:10996/script.js'
    let scrpitStream = fs.createWriteStream(path.resolve(__dirname, '../../../../temp/script.js'));
    request(scrpitUrl).pipe(scrpitStream).on("close", function (err) {
      if (err) {
        console.log("get-script-err")
        win.webContents.send("getVersionFinished", "error-get")
      } else {
        console.log("script-downloaded");
        getLatestVersionPackage(win)
      }
    })
  }
}


// 获取升级压缩包
function getLatestVersionPackage(win) {
  // 获取更新包
  let url = jsdelivrUrl + latestRes.version + '/app.asar.gz' + "?_=" + Date.parse(new Date()) / 1000
  // let url = 'http://127.0.0.1:10996/app.asar.gz'
  let stream = fs.createWriteStream(path.resolve(__dirname, '../../../../temp/app.asar.gz'));
  request(url).pipe(stream).on("close", function (err) {
    if (err) {
      console.log("get-pack-err")
      win.webContents.send("getVersionFinished", "error-get")
    }
    console.log("downloaded-package");
    uZip(() => {
      updateSourceHandle(win)
    })
  })
}

// 解压
function uZip(callback) {
  let unzip = createUnzip();
  let source = createReadStream(path.resolve(__dirname, '../../../../temp/app.asar.gz'));
  let destination = createWriteStream(path.resolve(__dirname, '../../../../temp/app'));
  pipeline(source, unzip, destination, (err) => {
    if (err) {
      console.error('uZiperror:', err);
      process.exitCode = 1;
    }
    callback()
  });
}


// 比对md5
function updateSourceHandle(win) {
  fs.readFile(path.resolve(__dirname, '../../../../temp/app'), function (err, res) {
    if (err) {
      throw err
    } else {
      hash = crypto.createHash('md5').update(res).digest("hex")
      if (latestRes.hash == hash) {
        console.log("hashCorrect")

        console.log('path', cmdPath)
        // runExe()
        if (ifAutoUpdate) {
          win.webContents.send("autoUpdateReady")
          readyToUpdate()
        }
        win.webContents.send("getVersionFinished", "success-ready")
      } else {
        console.log("hashError")
        win.webContents.send("getVersionFinished", "error-hash")
      }
    }
  })
}




function readyToUpdate() {
  let {
    preScript
  } = require(path.resolve(__dirname, '../../../../temp/script.js'))
  preScript()
  console.log('ready-to-update');
  app.on('will-quit', () => {
    runExe()
    console.log("will-quit")
  });
}

// 拉起嘟嘟可替换蹦蹦炸弹的app.asar
function runExe() {
  // 执行命令行
  workerProcess = exec(cmdStr, {
    cwd: cmdPath
  })

  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })

  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data)
  })

  workerProcess.on('close', function (code) {
    console.log('out code：' + code)
  })
}

// 清除下载目录
function clearTemp() {
  fs.access(path.resolve(__dirname, '../../../../temp/app'), fs.constants.F_OK, (err) => {
    if (err) {
      console.log("temp not exist")
    } else {
      removeDir(path.resolve(__dirname, '../../../../temp'))
    }
  })
}

function removeDir(dir) {
  let files = fs.readdirSync(dir)
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      //文件夹就递归
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir) //如果文件夹是空的直接删除
}



// 自动更新
function runAutoUpdate(win) {
  ifAutoUpdate = true
  clearTemp()
  getLatestVersionInfo(win)

}

function runAfterScript() {
  fs.access(path.resolve(__dirname, '../../../../temp/script.js'), fs.constants.F_OK, (err) => {
    if (err) {
      console.log("script not exist")
    } else {
      let {
        afterScript
      } = require(path.resolve(__dirname, '../../../../temp/script.js'))
      afterScript()
    }
  })
}
app.on("ready", () => {
  runAfterScript()
})
module.exports = {
  runExe,
  clearTemp,
  readyToUpdate,
  getLatestVersionInfo,
  runAutoUpdate
}
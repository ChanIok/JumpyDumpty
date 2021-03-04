<template>
    <div id="second-content-wrapper">
        <myTitle style="margin-bottom: 0;"></myTitle>
        <div id="container">

            <span class="big-title">设置</span>
            <span class="title">Cookie</span>


            <span class="note">自动抓取Cookie</span>
            <div class="hot-key-switch">
                <a-switch @change="onAutoCookieSwitchChange" :checked="ifAutoCookieButton" />
            </div>
            <span class="explain" style="margin-top: 5px;">登录并刷新米游社观测枢大地图(地图预览功能)时自动抓取Cookie</span>


            <span class="note">手动设置Cookie</span>
            <div style="margin-bottom: 5px">
                <div id="cookie-input">
                    <a-input default-value="请输入你的Cookie" v-model="cookieValue" placeholder="请输入你的Cookie"
                        @change="saveCookie" style="width: 100%" />
                </div>
            </div>
            <span class="explain">Cookie可自动开启功能自动获取。手动获取方法可参考：https://github.com/yinghualuowu/GenshinDailyHelper</span>
            <a-divider />


            <span class="title">自动更新</span>


            <span class="note">使程序保持最新状态</span>
            <div class="update-auto-switch">
                <a-switch @change="onAutoUpdateSwitchChange" :checked="ifAutoUpdateSwitch" />
            </div>
            <span class="explain" style="margin-top: 5px;">注意：该功能从GitHub上获取更新文件，不一定稳定</span>

            <div id="check-update-button">
                <a-button type="primary" @click="checkUpdate">
                    检测更新
                </a-button>
            </div>
            <transition name="slide-fade">
                <div id="updata-status" v-if="ifUpdating">
                    <a-spin v-if="!ifToUpdate&&!ifChoosedUpdate" style="margin-right: 10px;" />
                    <span id="updata-status-note">{{updateStatus}}</span>
                    <span id="if-to-update" v-if="ifToUpdate&&!ifChoosedUpdate">
                        <a-button type="primary" @click="manualUpdate">
                            确定
                        </a-button>
                        <a-button @click="cancelUpdate">取消</a-button>
                    </span>

                </div>
            </transition>
            <a-divider />


            <span class="title">进阶设置</span>
            <span class="explain" style="margin-bottom: 15px;">普通用户请勿修改此处设置！</span>
            <span class="note">窗口句柄设置</span>
            <div style="position: relative;">
                <div id="class-name-input">
                    <a-input default-value="" v-model="className" placeholder="请输入窗口类名" @change="saveAdvancedConfig"
                        style="width: 30%" />
                    <span class="input-explain">窗口类名</span>
                </div>
                <div id="windows-name-input">
                    <a-input default-value="" v-model="windowName" placeholder="请输入窗口名" @change="saveAdvancedConfig"
                        style="width: 30%" />
                    <span class="input-explain">窗口名</span>
                </div>
                <span class="note" style="margin-top: 10px;margin-bottom: 5px;">OCR截图设置</span>
                <span class="note" style="font-weight: 300;">全屏截图模式</span>
                <div class="hot-key-switch">
                    <a-switch @change=" saveifFullScreenConfig" :checked="ifFullScreenButton" />
                </div>
                <span class="explain" style="margin-bottom: 10px;">如若找不到窗口或截图失败可启用该功能</span>
                <div id="width-ratio-input">
                    <a-input default-value="" v-model="widthRatio" placeholder="请输入截图宽度比例" @change="saveAdvancedConfig"
                        style="width: 30%" />
                    <span class="input-explain">截图宽度比例</span>
                </div>
                <div id="height-ratio-input">
                    <a-input default-value="" v-model="heightRatio" placeholder="请输入截图高度比例" @change="saveAdvancedConfig"
                        style="width: 30%" />
                    <span class="input-explain">截图高度比例</span>
                </div>
                <div id="xpos-ratio-input">
                    <a-input default-value="" v-model="xPosRatio" placeholder="请输入截图起始X坐标比例"
                        @change="saveAdvancedConfig" style="width: 30%" />
                    <span class="input-explain">截图起始X坐标比例</span>
                </div>
                <div id="ypos-ratio-input">
                    <a-input default-value="" v-model="yPosRatio" placeholder="请输入截图起始Y坐标比例"
                        @change="saveAdvancedConfig" style="width: 30%" />
                    <span class="input-explain">截图起始Y坐标比例</span>
                </div>

                <div id="advanced-config-reset-button">
                    <a-button type="primary" @click="advancedConfigReset">
                        重置默认值
                    </a-button>
                </div>
            </div>


            <a-divider />

            <span class="title" style="margin-top: 10px;">关于</span>
            <span class="note">本程序开源且免费，当前版本{{appVersion}}，项目地址：https://github.com/ChanIok/JumpyDumpty</span>
            <span class="note">问题可直接在GitHub或NGA反馈：https://bbs.nga.cn/read.php?tid=25647353</span>
            <span class="explain">如果觉得有用，可以给个star，谢谢你</span>

        </div>
    </div>
</template>

<script>
    const {
        ipcRenderer
    } = window.require("electron");

    import myTitle from '../coms/Title.vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                appVersion: '',
                cookieValue: '',
                ifAutoCookieButton: false,
                className: 'UnityWndClass',
                windowName: '原神',
                ifFullScreenButton: false,
                widthRatio: 0.2450,
                heightRatio: 0.5100,
                xPosRatio: 0.6800,
                yPosRatio: 0.1100,
                ifAutoUpdateSwitch: true,
                ifUpdating: false,
                updateStatus: '正在获取新版本的信息',
                ifToUpdate: false,
                ifChoosedUpdate: false
            }
        },
        mounted() {
            this.getConfig()
            this.readCookie()
            this.handleIPC()
        },
        components: {
            myTitle
        },
        methods: {
            readCookie() {
                axios.get('../../../../data/cookie.json').then(res => {
                    if (res.status === 200) {
                        this.cookieValue = res.data.cookie
                    }
                })
            },
            getConfig() {
                axios.get('../../../../config/config.json').then(res => {
                    if (res.status === 200) {
                        if (res.data.ifAutoCookieButton) {
                            // 按钮打开
                            this.ifAutoCookieButton = true
                        } else {
                            this.ifAutoCookieButton = false
                        }
                        if (res.data.ifAutoUpdate) {
                            // 按钮打开
                            this.ifAutoUpdateSwitch = true
                        } else {
                            this.ifAutoUpdateSwitch = false
                        }

                        this.className = res.data.className
                        this.windowName = res.data.windowName
                    }
                })
                axios.get('../../../../config/ocrConfig.json').then(res => {
                    if (res.status === 200) {
                        if (res.data.ifFullScreen) {
                            this.ifFullScreenButton = true
                        } else {
                            this.ifFullScreenButton = false
                        }
                        this.widthRatio = res.data.widthRatio
                        this.heightRatio = res.data.heightRatio
                        this.xPosRatio = res.data.xPosRatio
                        this.yPosRatio = res.data.yPosRatio
                    }
                })
                axios.get('../../package.json').then(res => {
                    if (res.status === 200) {
                        console.log('package',res.data)
                        this.appVersion = res.data.version
                    }
                })
            },
            onAutoCookieSwitchChange(checked) {
                if (checked) {
                    this.ifAutoCookieButton = true
                } else {
                    this.ifAutoCookieButton = false
                }
                ipcRenderer.send("writeifAutoCookie", this.ifAutoCookieButton);
            },
            onAutoUpdateSwitchChange(checked) {
                if (checked) {
                    this.ifAutoUpdateSwitch = true
                } else {
                    this.ifAutoUpdateSwitch = false
                }
                ipcRenderer.send("writeifAutoUpdate", this.ifAutoUpdateSwitch);
            },
            saveCookie() {
                ipcRenderer.send("writeCookie", this.cookieValue);
            },
            advancedConfigReset() {
                this.className = 'UnityWndClass',
                    this.windowName = '原神',
                    this.ifFullScreenButton = false
                this.widthRatio = 0.2450,
                    this.heightRatio = 0.5100,
                    this.xPosRatio = 0.6800,
                    this.yPosRatio = 0.1100,
                    this.saveAdvancedConfig()
            },
            saveifFullScreenConfig(checked) {
                if (checked) {
                    this.ifFullScreenButton = true
                } else {
                    this.ifFullScreenButton = false
                }
                ipcRenderer.send("writeAdvancedConfig", this.className, this.windowName, this.ifFullScreenButton, this
                    .widthRatio, this
                    .heightRatio, this
                    .xPosRatio, this
                    .yPosRatio)
            },
            saveAdvancedConfig() {
                ipcRenderer.send("writeAdvancedConfig", this.className, this.windowName, this.ifFullScreenButton, this
                    .widthRatio, this
                    .heightRatio, this
                    .xPosRatio, this
                    .yPosRatio)
            },
            checkUpdate() {
                if (!this.ifToUpdate && !this.ifChoosedUpdate) {
                    this.ifUpdating = true
                    ipcRenderer.send("checkUpdate")
                    ipcRenderer.on("getVersionFinished", (e, res, latestVersion, currentVersion) => {
                        if (res == "success-version") {
                            if (latestVersion > currentVersion) {
                                this.updateStatus = "最新的蹦蹦炸弹版本为：" + latestVersion + "，而现在的这个的还是：" +
                                    currentVersion +
                                    "，正在获取更新包..."
                            } else {
                                this.updateStatus = "已经是最新版的蹦蹦炸弹啦：" + latestVersion
                            }
                        } else if (res == "success-ready") {
                            this.ifToUpdate = true
                            this.updateStatus = "新版蹦蹦炸弹部署完毕，是否安装呢？"
                        } else if (res == "error-get") {
                            this.updateStatus = "服务器炸了，获取不到信息，建议还是去云盘下"
                        } else if (res == "error-hash") {
                            this.updateStatus = "服务器有问题，获取的文件不对！建议还是去云盘下"
                        }

                    })
                }

            },
            manualUpdate() {
                ipcRenderer.send("manualUpdate")
                this.ifToUpdate = false
                this.ifChoosedUpdate = true
                this.updateStatus = "准备工作完成！下一次启动将会是全新的蹦蹦炸弹~"
            },
            cancelUpdate() {
                ipcRenderer.send("cancelUpdate")
                this.ifUpdating = false
                this.updateStatus = '正在获取新版本的信息'
                this.ifToUpdate = false
                this.ifChoosedUpdate = false
            },
            handleIPC() {
                ipcRenderer.removeAllListeners('getVersionFinished')
            }
        }
    };
</script>

<style scoped>
    .big-title {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 28px;
        display: block;
    }

    .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        display: inline-block;
    }

    .note {
        width: 100%;
        margin-bottom: 7px;
        display: inline-block;
    }

    .explain {
        font-weight: 300;
        font-size: 13px;
        margin-bottom: 28px;
        display: block;
    }

    .input-explain {
        font-weight: 300;
        font-size: 13px;
        display: inline-block;
        margin-left: 20px;
    }

    #cookie-input {
        width: 70%;
        max-width: 800px;
        min-width: 200px;
        overflow: hidden;
    }

    #second-content-wrapper {
        background-color: rgb(250, 250, 250);
        height: 100%;
        overflow: hidden;
    }

    #container {
        padding: 40px;
        overflow: auto;
        height: calc(100% - 32px);
    }


    #container::-webkit-scrollbar {
        width: 8px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    #container::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(255, 151, 151, 0.2);
        background: #e9b5b5;

    }

    #container::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
    }

    #advanced-config-reset-button {
        position: absolute;
        left: calc(200px + 35%);
        bottom: 6px;
    }

    #updata-status {
        margin-top: 15px;
    }

    .slide-fade-enter-active {
        transition: all .2s ease;
    }

    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        opacity: 0;
    }
</style>
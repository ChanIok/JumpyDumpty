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
            <span class="explain">登录或刷新米游社观测枢大地图(地图预览功能)时自动抓取Cookie</span>


            <span class="note">手动设置Cookie</span>
            <div style="margin-bottom: 5px">
                <div id="cookie-input">
                    <a-input default-value="请输入你的Cookie" v-model="cookieValue" placeholder="请输入你的Cookie"
                        @change="saveCookie" style="width: 100%" />
                </div>
            </div>
            <span class="explain">Cookie可自动开启功能自动获取。手动获取方法可参考：https://github.com/yinghualuowu/GenshinDailyHelper</span>
            <a-divider />

            <span class="title">进阶设置</span>
            <span class="explain" style="margin-bottom: 15px;">普通用户请勿修改此处设置！</span>
            <span class="note">窗口句柄设置</span>
            <div>
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
            </div>


            <a-divider />

            <span class="title" style="margin-top: 10px;">关于</span>
            <span class="note">本程序开源且免费，项目地址：https://github.com/ChanIok/JumpyDumpty</span>
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
                cookieValue: '',
                ifAutoCookieButton: false,
                className: 'UnityWndClass',
                windowName: '原神',
                widthRatio: 0.2450,
                heightRatio: 0.5100,
                xPosRatio: 0.6800,
                yPosRatio: 0.1100
            }
        },
        mounted() {
            this.getConfig()
            this.readCookie()
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
                        this.className = res.data.className
                        this.windowName = res.data.windowName
                    }
                })
                axios.get('../../../../config/ocrConfig.json').then(res => {
                    if (res.status === 200) {
                        this.widthRatio = res.data.widthRatio
                        this.heightRatio = res.data.heightRatio
                        this.xPosRatio = res.data.xPosRatio
                        this.yPosRatio = res.data.yPosRatio
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
            saveCookie() {
                ipcRenderer.send("writeCookie", this.cookieValue);
            },
            saveAdvancedConfig() {
                ipcRenderer.send("writeAdvancedConfig", this.className, this.windowName, this.widthRatio, this
                    .heightRatio, this
                    .xPosRatio, this
                    .yPosRatio)
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
        width: 5px;
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
</style>
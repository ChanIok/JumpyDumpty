<template>
    <div id="second-container">
        <div id="anchor-swrappper">
            <a-anchor id="anchor">
                <a-anchor-link class="anchor-link" href="#about" title="关于" />
                <a-anchor-link class="anchor-link" href="#thanks" title="感谢" />
                <a-anchor-link class="anchor-link" href="#help" title="使用帮助">
                    <a-anchor-link class="anchor-second" href="#map" title="快捷地图" />
                    <a-anchor-link class="anchor-second" href="#query" title="用户查询" />
                    <a-anchor-link class="anchor-second" href="#ocr" title="圣遗物导出" />
                    <a-anchor-link class="anchor-second" href="#mona" title="莫娜占卜铺" />
                    <a-anchor-link class="anchor-second" href="#advanced-settings" title="进阶设置" />
                </a-anchor-link>
                <a-anchor-link class="anchor-link" href="#question" title="常见问题">

                </a-anchor-link>
            </a-anchor>
        </div>

        <div id="third-content-wrapper">
            <myTitle style="margin-bottom: 0;margin-top: 0;"></myTitle>
            <div id="container">
                <div id="about">
                    <span class="title">关于</span>
                    <span class="note">本程序开源且免费，当前版本{{appVersion}}，项目地址：
                        <span @click="clickLink('github')" class="click-link">
                            https://github.com/ChanIok/JumpyDumpty
                        </span>最新的进展和问题都会在此公布</span>
                    <span class="note">使用须知：本程序仅供学习交流，您应承担使用该程序带来的所有风险。</span>
                    <span class="explain">在学业之余 完全出于个人兴趣的创作，不接受捐赠，如果觉得有用，可以在
                        <span @click="clickLink('github')" class="click-link">
                            GitHub
                        </span>
                        上给个star，这是对我的最大鼓励，谢谢你</span>
                    <!-- <a-divider /> -->
                </div>
                <div id="thanks">
                    <span class="title">感谢</span>
                    <span class="note">
                        <span @click="clickLink('hwa')" class="click-link">
                            hwa
                        </span>对我的帮助</span>
                    <span class="note">wormtql的
                        <span @click="clickLink('wormtql')" class="click-link">
                            莫娜占卜铺
                        </span></span>
                    <span class="note click-link" @click="clickLink('helper')">
                        genshin-impact-helper
                    </span>
                    <a-divider style="margin-top: 10px;" />
                </div>
                <div id="help">
                    <span class="big-title">使用帮助</span>
                    <div id="map">
                        <span class="title">快捷地图</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    如何打开热键地图？
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    确保你的热键地图功能处于打开状态，热键无占用，
                                    <span style="font-weight: 600;">按下对应热键即可</span>

                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/map_1.jpg"
                                        height="394px" width="361px" class="docs-imgs" alt="">
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title" id="change-hot-key">
                                    如何修改热键？
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    点击按钮后，按下你喜欢的热键（如Alt+Q），接着点击其它空白区域，即可修改成功
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/map_2.jpg"
                                        height="144px" width="311px" class="docs-imgs" alt="">
                                </div>
                            </a-list-item>
                        </a-list>
                    </div>
                    <div id="query">
                        <span class="title">用户查询</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    如何查询用户信息？
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    1. 在设置界面打开“自动获取Cookie”开关
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/query_1.jpg"
                                        width="500px" height="336px" class="docs-imgs" alt="">
                                    2. 切换到“地图预览”界面（或打开热键地图），<span
                                        style="font-weight: 600;">登录米游社帐号</span>（请注意不同窗口大小的视图可能不一样，可尝试改变窗口大小）
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/query_2.jpg"
                                        width="1096px" height="788px" class="docs-imgs" alt="">
                                    3. 随意切换菜单，重新刷新“地图预览”界面
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/query_3.jpg"
                                        width="202px" height="166px" class="docs-imgs" alt="">
                                    4. 当右上角有成功提示弹出，即可进行下一步查询
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/query_4.jpg"
                                        width="427px" height="167px" class="docs-imgs" alt="">
                                    5. 输入你需要的查询用户ID，点击或回车即可
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/query_5.jpg"
                                        width="347px" height="169px" class="docs-imgs" alt="">
                                </div>
                            </a-list-item>
                        </a-list>
                    </div>

                    <div id="ocr">
                        <span class="title">圣遗物导出</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    导出圣遗物总流程
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    1. 获取百度OCR的Access Token，获取方法可参考以下Up的视频
                                    <br>请确保创建的应用为 <span style="font-weight: 700;">文字识别</span> ，否则会出现"error_code":6的报错！
                                    <span class="note click-link" @click="clickLink('baidu-ocr-help')">
                                        https://www.bilibili.com/video/BV1yN411X7iv?t=23
                                    </span>
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_1.jpg"
                                        width="260px" height="300px" class="docs-imgs" alt="">
                                    <div style="line-height: 28px;">2. 设置你的游戏为<span
                                            style="font-weight: 600;">16:9的窗口模式</span>（全屏模式下无法看到固定浮窗，非16:9识别可能会有异常）
                                    </div>

                                    3. 根据你的热键设置，<span style="font-weight: 600;">按下对应的热键</span>，进入快速抓取模式

                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_2.jpg"
                                        width="441px" height="178px" class="docs-imgs" alt="">
                                    4. 此时屏幕右下角会有固定浮窗弹出
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_3.jpg"
                                        width="389px" height="266px" class="docs-imgs" alt="">
                                    5. 切换回游戏，<span style="font-weight: 600;">逐个点击背包的圣遗物</span>，同时可观察到右下角浮窗的识别信息
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_4.jpg"
                                        width="360px" height="242px" class="docs-imgs" alt="">
                                    6. 再按一次热键，退出快速抓取模式，回到抓取界面，点击“<span style="font-weight: 600;">导出json到剪贴板</span>”
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_5.jpg"
                                        width="195px" height="107px" class="docs-imgs" alt="">
                                </div>

                            </a-list-item>

                            <a-list-item class="list-item">
                                <div class="second-title">
                                    运行条件
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    <span class="note">
                                        管理员权限(无权限只能手动抓取)
                                    </span>
                                    <span class="note">
                                        游戏不能最小化，独占全屏也可以（但全屏下不能看到固定浮窗的反馈消息，不太建议。如果是ALT+ENTER退出全屏，还需要拖动一下游戏窗口，能看到任务栏即可）
                                    </span>
                                    <span class="note">
                                        <span style="font-weight: 700;">分辨率必须为 16：9</span> ，如
                                        3840×2160，2560X1440，1920×1080，1600×900，1366×768，1280×720
                                    </span>
                                    <span class="note">
                                        建议窗口模式下运行，分辨率越高越好，Api 建议使用高精度版（但实测高精度版不一定比标准版好）
                                    </span>

                                </div>
                            </a-list-item>


                            <a-list-item class="list-item">
                                <div class="second-title">
                                    注意事项
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    <span class="note">
                                        <span style="font-weight: 600;">导出的 json 可配合 worm
                                            大佬的项目使用：莫娜占卜铺（见本程序的莫娜占卜铺）</span>
                                    </span>
                                    <span class="note">
                                        快速抓取模式下可以进行鼠标拖动（可以随便拖动背包界面），仅鼠标点击会被判定为有效。
                                    </span>
                                    <span class="note">
                                        快速抓取模式下的点击不要太快（1.1.7版本后建议至少1秒1次），百度 api 默认限制 1 秒两次请求
                                    </span>
                                    <span class="note">
                                        由于百度OCR的结果经常把某些字符和数字漏掉，程序对一些异常的数值做了尝试性的修复,不一定百分百准确，请务必核对
                                    </span>
                                    <span class="note">
                                        1.1.7版本后增加了等级和星数的识别，点击一次会向百度请求两次，即高精度模式点击250次后会耗尽免费次数，此时可改用普通模式
                                    </span>
                                </div>

                            </a-list-item>
                        </a-list>
                    </div>

                    <div id="mona">
                        <span class="title">莫娜占卜铺</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    如何配合wormtql的莫娜占卜铺项目使用？
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    1. 先获取上述导出流程所述的json，之后点击莫娜占卜铺的“导入json”按钮
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_6.jpg"
                                        width="1200px" height="472px" class="docs-imgs" alt="">
                                    2. 使用粘贴快捷键Ctrl+V将上面的得到的json粘贴进去，根据需求选择你的导入方式
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_7.jpg"
                                        width="957px" height="385px" class="docs-imgs" alt="">
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    如何将莫娜占卜铺的圣遗物数据导入本地？
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    1. 点击莫娜占卜铺的“导出json”按钮，和“复制”按钮
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_8.jpg"
                                        width="1118px" height="408px" class="docs-imgs" alt="">
                                    2. 打开圣遗物抓取界面，点击“从剪贴板导入到本地”
                                    <img src="https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/images/ocr_9.jpg"
                                        width="385px" height="139px" class="docs-imgs" alt="">
                                </div>
                            </a-list-item>
                        </a-list>
                    </div>
                    <div id="advanced-settings">
                        <span class="title">进阶设置</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    如果你的客户端为其他版本，非国服或者使用PS Remote Play
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    <div style="line-height: 24px;">1. 请自行搜索并下载Microsoft
                                        Spy++，获取你的客户端的窗口类名和窗口名，并在进阶设置中填入对应值</div>
                                    <div style="line-height: 24px;">2. 测试热键地图功能能否在隐藏地图时激活你的客户端窗口，并测试OCR的手动抓取功能能否获取图片
                                    </div>

                                    <div style="line-height: 24px;margin-top: 10px;">
                                        如若不能获取图片（无法根据句柄截图），可尝试开启全屏截图功能，通过调整比例参数获得适合的图片，图片保存在蹦蹦炸弹\data\artifact.jpg</div>
                                    <span>如何设置该部分可参阅：</span>
                                    <span class="note click-link" @click="clickLink('nga-advset')">
                                        https://bbs.nga.cn/read.php?tid=25647353&page=6#pid496610213Anchor
                                    </span>
                                    <span class="note click-link" @click="clickLink('git-advset')">
                                        https://github.com/ChanIok/JumpyDumpty/issues/4
                                    </span>

                                </div>
                            </a-list-item>
                        </a-list>
                    </div>
                </div>
                <div id="question">
                    <span class="big-title">常见问题</span>


                    <div id="about-map">
                        <span class="title">以下为常见问题</span>
                        <span class="note">如出现问题请检查步骤是否正确，如有无法解决的情况可尝试点击程序界面左下角菜单的：问题反馈</span>
                        <a-list bordered>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    按下热键后无反应，不能打开地图
                                </div>
                                <a-divider style="margin-top: 10px;" />
                                <div class="second-descript">
                                    大概率是热键冲突，你可以<a href="#change-hot-key">尝试更换其他热键</a>
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    不能自动获取Cookie
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    请确保你的米游社帐号处于登录状态，也可以尝试手动获取Cookie
                                    <br>手动获取方法可参考此处的第一步：
                                    <span class="note click-link" @click="clickLink('git-cookie-get')">
                                        https://github.com/yinghualuowu/GenshinDailyHelper
                                    </span>
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    查询时显示：该用户数据未公开
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    由于用户查询是调用米游社的接口，如果对方的米游社没绑定或者设置资料隐藏就会无法查询
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    OCR的热键按下后，没反应，看不到右下角的窗口
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    请尝试手动抓取是否正常，如果正常：
                                    大概率是热键冲突，你可以参考地图部分<a href="#change-hot-key">尝试更换其他热键</a>
                                    <br>
                                    亦有可能是未获得管理员权限，程序无法捕捉鼠标点击事件
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    录入的圣遗物有误，或者提示分析该圣遗物异常
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    有误的数据可以在莫娜占卜铺直接修改
                                    <br>
                                    分析该圣遗物异常多半是百度OCR返回的数据有问题，可以切换下分辨率或者API接口（实测高精度版不一定比标准版好）
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    录入的圣遗物失败，提示"error code": 6, "error _msg": No permission to access data
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                  大概率是创建的百度应用不正确，请确保你创建的应用为：文字识别
                                  <br>已经有部分人反馈按照教程却创建到了语音应用，请在你的 百度智能云-管理中心 核对
                                </div>
                            </a-list-item>
                            <a-list-item class="list-item">
                                <div class="second-title">
                                    出现了莫名其妙的弹窗报错或者其他问题
                                </div>
                                <a-divider style="margin-top:10px;" />
                                <div class="second-descript">
                                    可以试试万能的重新解压运行和重启大法，还有关掉你的杀软（作者收到的很多莫名其妙的问题都是这样解决的）
                                </div>
                            </a-list-item>
                        </a-list>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    const shell = require('electron').shell
    import myTitle from '../coms/Title.vue'
    import axios from 'axios'

    export default {
        data() {
            return {
                appVersion: ''
            }
        },
        mounted() {
            this.loadConfig()
        },
        components: {
            myTitle
        },
        methods: {
            clickLink(value) {
                if (value == 'github') {
                    shell.openExternal('https://github.com/ChanIok/JumpyDumpty')
                } else if (value == 'hwa') {
                    shell.openExternal('https://github.com/yllhwa')
                } else if (value == 'wormtql') {
                    shell.openExternal('https://github.com/wormtql/genshin_artifact')
                } else if (value == 'helper') {
                    shell.openExternal('https://github.com/y1ndan/genshin-impact-helper')
                } else if (value == 'baidu-ocr-help') {
                    shell.openExternal('https://www.bilibili.com/video/BV1yN411X7iv?t=23')
                } else if (value == 'git-advset') {
                    shell.openExternal('https://github.com/ChanIok/JumpyDumpty/issues/4')
                } else if (value == 'nga-advset') {
                    shell.openExternal('https://bbs.nga.cn/read.php?tid=25647353&page=6#pid496610213Anchor')
                } else if (value == 'git-cookie-get') {
                    shell.openExternal('https://github.com/yinghualuowu/GenshinDailyHelper')
                }


            },
            loadConfig() {
                axios.get('../../package.json').then(res => {
                    if (res.status === 200) {
                        console.log('package', res.data)
                        this.appVersion = res.data.version
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .big-title {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 10px;
        margin-top: 30px;
        display: block;
    }

    .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
        margin-top: 20px;
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

    #second-container {
        display: flex;
        height: 100%;

    }

    #third-content-wrapper {
        background-color: rgb(250, 250, 250);
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    #container {
        position: relative;
        padding: 20px;
        padding-top: 10px;
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

    #anchor-swrappper {
        height: 100%;
        width: 20%;
        min-width: 200px;
        max-width: 300px;
        background-color: #fff;
        /* padding-left: 20px; */
        padding-top: 52px;
        padding-left: 30px;
    }

    #anchor {
        margin-left: 50px;
        margin-top: 20px;
        height: 100%;
    }

    .anchor-link {
        font-size: 16px;
        line-height: 24px;
    }

    .anchor-second {
        font-weight: 300;
        font-size: 14px;
    }

    .click-link {
        cursor: pointer;
        color: #000;
    }

    .click-link:hover {
        color: rgb(241, 89, 89)
    }

    #thanks .note {
        padding-left: 20px;
    }

    .second-title {
        width: 100%;
        font-weight: 600;
        font-size: 16px;
    }

    .second-descript {
        width: 100%;

    }

    .list-item {
        display: block;
    }

    .docs-imgs {
        display: block;
        margin-left: 15px;
        margin-top: 10px;
        margin-bottom: 20px;
        max-width: 100%;
        height: auto;
    }
</style>
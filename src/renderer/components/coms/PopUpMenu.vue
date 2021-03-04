<template>
    <div>
        <a-button type="primary" icon="menu" id="pop-up-menu-button" size="large" @click="clickPopUpMenu" />
        <transition name="slide-fade">
            <div id="pop-up-menu-wrapper" v-show="ifPopUpMenu">
                <a-menu style="width: 180px" mode="vertical" @click="handlePopUpMenuClick" id="pop-up-menu">
                    <a-menu-item key="1">
                        <a-icon type="project" class="menu-icon" />
                        项目地址
                    </a-menu-item>

                    <a-sub-menu key="sub1" class="pop-up-sub-menu">
                        <span slot="title">
                            <a-icon type="question-circle" class="menu-icon" /> 问题反馈</span>
                        <a-menu-item key="2">
                            <a-icon type="github" />
                            GitHub

                        </a-menu-item>
                        <a-menu-item key="3">
                            <a-icon type="coffee" />
                            NGA

                        </a-menu-item>
                    </a-sub-menu>


                    <a-menu-item key="4">
                        <a-icon type="close" class="menu-icon" />
                        退出程序
                    </a-menu-item>
                </a-menu>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    #pop-up-menu-button {
        /* width: 100%; */
        background-color: #ce3c3c;
        border: 0;
        position: absolute;
        left: calc(50% - 20px);
        bottom: 20px;
    }

    #pop-up-menu-wrapper {
        left: calc(50% + 40px);
        position: absolute;
        bottom: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
        z-index: 996;
    }

    #pop-up-menu span {
        z-index: 997;
    }

    .slide-fade-enter-active {
        transition: all .15s ease;
    }

    .slide-fade-leave-active {
        transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        opacity: 0;
    }

    .menu-icon {
        margin-right: 10px !important;
    }
</style>
<style>
    .pop-up-sub-menu .ant-menu-submenu-arrow {
        display: inline-block !important;
    }
</style>

<script>
    const shell = require('electron').shell
    const {
        ipcRenderer
    } = window.require("electron")
    
    export default {
        name: 'popUpMenu',
        data() {
            return {
                ifPopUpMenu: false,
                clickedPopUpMenu: false
            }
        },
        mounted() {
            this.hidePopUpMenu()
        },
        methods: {
            clickPopUpMenu() {
                this.clickedPopUpMenu = true
                this.ifPopUpMenu = !this.ifPopUpMenu
            },
            handlePopUpMenuClick(e) {
                console.log('click ', e)
                if (e.key == 1) {
                    shell.openExternal('https://github.com/ChanIok/JumpyDumpty')
                } else if (e.key == 2) {
                    shell.openExternal('https://github.com/ChanIok/JumpyDumpty/issues')
                } else if (e.key == 3) {
                    shell.openExternal('https://bbs.nga.cn/read.php?tid=25647353')
                } else if (e.key == 4) {
                    ipcRenderer.send("exitProcess")
                }
                this.ifPopUpMenu = false
            },

            hidePopUpMenu() {
                document.addEventListener('click', (e) => {
                    let sp1 = document.getElementById("pop-up-menu-wrapper")
                    let sp2 = document.getElementById("pop-up-menu-button")
                    if (sp2) {
                        if (!sp2.contains(event.target) && !sp1.contains(event.target)) {
                            this.ifPopUpMenu = false;
                        }
                    }


                })
            }
        }
    }
</script>
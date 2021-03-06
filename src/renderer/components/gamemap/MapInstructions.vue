<template>
    <div id="third-content">
        <span class="big-title">介绍</span>

        <span class="title">
            一个快捷的资源地图工具

        </span>
        <span class="note">
            由于平时在探索地图找资源时（如神瞳，特产，宝箱），需要用浏览器打开资源地图对照着来找。
        </span>
        <span class="note">
            但如果频繁切换窗口会过于麻烦，就算用 Alt+Tab 也有闪烁，于是弄了这个热键呼出地图的小工具。
        </span>
        <span class="note">
            呼出地图窗口后，由于原神从游戏切换其他窗口默认会最小化，隐藏地图窗口时调用了 windows api 的函数重新激活原神窗口，从而实现近似于游戏地图的体验
        </span>

        <a-divider />
        <span class="note">更多内容请参阅：
            <span class="click-link" @click="()=>{
                this.$router.push('/documentation')
            }">帮助文档</span>

        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            // clickbutton() {
            //     sendAxios()
            // }
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

    #third-content {
        padding: 50px;
        color: #404040;
        font-size: 14px;
    }

    .note {
        width: 100%;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 7px;
        display: inline-block;
    }

    .click-link {
        cursor: pointer;
        color: #000;
    }

    .click-link:hover {
        color: rgb(241, 89, 89)
    }
</style>
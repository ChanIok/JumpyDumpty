<template>
    <div id="third-content">
        <span class="big-title">介绍</span>

        <div class="title">
            一个圣遗物识别工具
        </div>
        <span class="note">
            主要利用百度OCR的API的进行识别
        </span>
        <span class="note">
            导出的 json 主要配合 wormtql 大佬的项目使用：<span class="click-link" @click="()=>{
                this.$router.push('/calculation')
            }">莫娜占卜铺</span>
        </span>
        <a-divider />
        <span class="note">
            更多内容请参阅：<span class="click-link" @click="()=>{
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
        overflow: auto;
        height: 100%;
        background-color: rgb(250, 250, 250);
    }

    #third-content::-webkit-scrollbar {
        width: 8px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }



    #third-content::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(255, 151, 151, 0.2);
        background: #ffababea;

    }

    #third-content::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;

    }

    .note {
        width: 100%;
        line-height: 21px;
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
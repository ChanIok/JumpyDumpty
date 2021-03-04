import Vue from 'vue'

import FloatingWin from './FloatingWin.vue'
// 导入浮窗组件
new Vue({
    el: '#floating-window',
    components: {
        FloatingWin
    },
    template: '<FloatingWin/>'
})
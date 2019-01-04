import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router/router'
import store from './store/'
import wx from 'weixin-js-sdk'
import {
    WechatShareUtils
} from './service/WechatShareUtils'
import './config/rem'
import 'babel-polyfill'
import FastClick from 'fastclick'
import VueHtml2Canvas from 'vue-html2canvas';
Vue.use(VueHtml2Canvas);
import VueClipboard from 'vue-clipboard2'
import { Swipe, SwipeItem } from 'c-swipe';
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
import { userInfo } from './service/getData'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
Vue.use(wx)

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

router.beforeEach((to, from, next) => {
    // WechatShareUtils.configJsApi(window.location.href)
    // wx.error(function () {
    //     window.location.href = window.location.href
    // })
    if (to.meta.title === undefined) {
        document.title = '链上臻品'
    } else {
        document.title = to.meta.title
    }
    // localStorage.setItem("X-youpinchain-Token", "D06EAEA76CC5B0C96769A0E8FB2CA2FD");
    if (localStorage.getItem('X-youpinchain-Token') == undefined) {
        let token = to.query.T
        if (token) {
            localStorage.setItem("X-youpinchain-Token", token)
            let query = Object.assign({}, to.query)
            delete query.T
            next({path: to.path, query: query})
        } else {
            WechatShareUtils.redirectToAuth(to.fullPath)
        }
    } else {

        userInfo().then(res => {
            if (res.errno === 401) {
                WechatShareUtils.redirectToAuth(to.fullPath)
            } else {
                sessionStorage.setItem("userInfo", JSON.stringify(res.data))
                next();
            }
        });
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

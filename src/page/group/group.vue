<template>
    <div class="order_page">
        <!-- <head-top head-title="秒拼" go-back='true'></head-top> -->
        <!-- <ul class="nav_tab">
            <li v-for="(item,index) in tabList" :key="index" :class="{active: activeTab == index }" @click="findOrder(index)">{{item.tab}}</li>
        </ul> -->
        <transition name="router-slid" mode="out-in">
            <router-view @findOrder="updateOrder()" :sendData="activeTab"></router-view>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import footGuide from 'src/components/footer/footGuide'
    import wx from 'weixin-js-sdk'
    import {
        WechatShareUtils
    } from '../../service/WechatShareUtils'

    export default {
        data(){
            return{
                activeTab: 0,
                tabList: [
                    {
                        tab: '进行中',
                        name: 'current'
                    },
                    {
                        tab: '预告',
                        name: 'preview'
                    }
                ],
                routerPath: ''
            }
        },
        props: ['showErrMsg'],
        created () {
            this.routerPath = window.location.href.toString().split('group/')[1]
            for(var i = 0; i <= this.tabList.length - 1; i++){
                if(this.tabList[i].name === this.routerPath){
                    this.activeTab = i;
                }
            }
        },
        mounted(){
            wx.ready(function () {
                var shareLink = window.location.href
                WechatShareUtils.onMenuShareAppMessage('链上臻品！', '优质商品精心臻选！', shareLink, 'https://mmbiz.qpic.cn/mmbiz_jpg/jV5hZicRoCyPicial3ca4gicOUOETlqX0koqEcDxNC9mUkmFzbdq801Wwu2U335MWicZxI1Zlqnfa9hbxciayOFeB94w/0?wx_fmt=jpeg')
            })
        },
        components: {
            headTop,
            footGuide
        },
        computed: {
        },
        methods: {
            findOrder (index) {
                if (this.activeTab !== index) {
                    this.activeTab = index
                    this.$router.replace({name: this.tabList[index].name})
                    window.scrollTo(0, 0)
                }
            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/group';
</style>

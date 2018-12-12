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
    import {loadMore} from 'src/components/common/mixin'
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
        mixins: [loadMore],
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
    @import 'src/style/mixin';

    .order_page{
        background-color: #f1f1f1;
        margin-bottom: .49rem;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .nav_tab{
        @include wh(100%,.45rem);
        @include sc(.15rem,$g6);
        background: $fc;
        line-height: .45rem;
        display: flex;
        margin-bottom: .16rem;
        li{
            flex: 1;
            text-align: center;
        }
        .active{
            color: $red;
            border-bottom: .02rem solid $red;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(.4rem, 0, 0);
        opacity: 0;
    }
</style>

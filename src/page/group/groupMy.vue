<!-- 发起或参与拼团详情页，可分享 -->
<template>
    <div class="goods">
        <div class="info_box">
            <router-link tag="div" :to="'/groupDet/' + groupSuit.id" class="group_info clear">
                <img :src="groupSuit.thumbnailPic" alt="" class="left image"
                        :class="{'noImage': !groupSuit.thumbnailPic}">
                <div class="left goods_info">
                    <p class="name">已经有<span>{{members.length}}</span>人参与拼团</p>
                    <div class="right_tip" v-if="endTimeDown>0">
                        <p>距拼团结束</p>
                        <p>
                            <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>
                        </p>
                    </div>
                    <div class="right_tip" v-else>
                        <p class="activityEnd">已结束</p>
                    </div>
                    <p class="price"><span class="RMB">￥</span>{{groupMy.discountPrice}}</p>
                    <!--<p class="desr">￥{{groupSuit.suitPrice}}</p>-->
                </div>
            </router-link>
            <div class="aid_friend">
                <ul class="friend_list">
                    <li v-for="(item,index) in members" :key="index"><img :src="item.headImgUrl"><p v-if="index === 0">团长</p></li>
                    <li class="none"><div>?</div><p>待邀请</p></li>
                    <li class="none" v-if="totalPages > 1" @click="loadMoreMember()"><div><span>查看<br>更多</span></div></li>
                </ul>
            </div>
            <div class="invite_btn clear" v-if="endTimeDown > 0" @click="showShareBox">邀请好友</div>
        </div>
        <!-- 拼团流程 -->
        <div class="assembling_process">
            <div class="panel_title">拼团流程</div>
            <div class="content">
                <ul class="process">
                    <li>
                        <img src="../../images/group/process01.png" alt="">
                        <p class="text">团长开团</p>
                    </li>
                    <li>
                        <img src="../../images/group/process02.png" alt="">
                        <p class="text">邀请好友</p>
                    </li>
                    <li>
                        <img src="../../images/group/process03.png" alt="">
                        <p class="text">拼团成功</p>
                    </li>
                    <li>
                        <img src="../../images/group/process04.png" alt="">
                        <p class="text">等待发货</p>
                    </li>
                </ul>
                <p class="rules">奖励规则 <br>
                    {{groupMy.rulesNum}}人即可享受拼团优惠 <br>
                    <!--5人即每人获得20元优惠卷-->
                </p>
            </div>
        </div>
        <div class="poster" v-show="showShare">
            <p class="text">1.长按屏幕保存图片</p>
            <p class="text">2.将图片分享给好友或朋友圈</p>
            <div class="invite_landing" ref="test">
                <img :src="output" width="100%" ref="output" v-if="output"/>
                <div class="box" v-else>
                    <div class="groupMyInfo">
                        <p :class="{'padd-t': groupMy.groupSuitType === 1}"><strong>{{leaderAddress.consignee}}</strong>邀请您参加{{!sex ? '' : sex === '女' ? '她的' : '他的'}}团购</p>
                        <p v-if="groupMy.groupSuitType === 2" class="ellipsis">同一收货地址：{{leaderAddress.address}}</p>
                    </div>
                    <div class="header">
                        <img src="../../images/group/icon_share.png" alt="" class="icon_head">
                        <img :src="groupSuit.sharePic" class="boxImg" alt="">
                        <div class="descrInfo">
                            <p class="left"><span>¥&nbsp;{{groupMy.discountPrice}}</span>/份 &nbsp; <span>{{groupSuit.minimum}}份起订</span></p>
                            <p class="right">拼团中</p>
                        </div>
                    </div>
                    <div class="container" >
                        <div class="left">
                            <div class="title ellipsis">{{groupSuit.suitName}}</div>
                            <p class="content">{{groupSuit.describe}}</p>
                            <p class="discountPrice">同一地址团购：<span>¥</span>{{sameAddressPrice}}</p>
                            <!--<p class="tips" v-if="groupMy.groupSuitType === 2">(团长发起，并享劳动鼓励金)</p>-->
                            <p class="originalPrice">不同地址团购：<span>¥</span>{{diffetentAddressPrice}}</p>
                            <p class="originalPrice">单买价：<span>¥</span>{{groupSuit.suitPrice}}</p>
                        </div>
                        <div class="right">
                            <div class="qrcode" id="qrcode_1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <img @click="showShare = false" src="../../images/bounty-plan/close_model.png" alt="" width="30" class="close_model">
        </div>
    </div>
</template>

<script>
    import {
        ModalHelper
    } from "../../service/Utils";
    import {
        countDown,
        convertImgToBase64
    } from "src/config/mUtils";
    import {
        groupMy,
        groupDet,
        groupMyAddress,
        groupMembers,
        systemTime
    } from "../../service/getData";
    import {
        WechatShareUtils
    } from '../../service/WechatShareUtils'
    import wx from 'weixin-js-sdk'
    import {QRCode} from '../../plugins/qrcode.js'
    export default {
        data() {
            return {
                showShare: false,
                groupMyId: '',
                groupSuit: {},
                groupMy: {},
                members: [],
                page: 1,
                size: 10,
                totalPages: 1,
                leaderAddress: {},
                endTimeDown: null,
                timer: null,
                systemTime: null,
                shareLink: '',
                qrcode: Object,
                output: null,
                sameAddressPrice: 0,
                diffetentAddressPrice: 0,
                sex: ''
            };
        },
        mounted() {
            this.groupMyId = this.$route.params.groupMyId;
            systemTime().then((res) => {
                this.systemTime = res.data
                this.initData();
            })
            this.getMembers(this.page, this.size);
        },
        watch: {
            showShare: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
            },
            endTimeDown: function (val) {
                var that = this
                if (!val) {
                    clearInterval(that.timer)
                    that.timer = setTimeout(function () {
                        that.initData()
                    },1000)
                }
            }
        },
        components: {
        },
        created() {
        },
        methods: {
            showShareBox () {
                var that = this;
                if (that.output) {
                    that.showShare = true;
                    return;
                } else {
                    that.qrcode = new QRCode(document.getElementById('qrcode_1'), {
                        text: that.shareLink,
                        width: 150,
                        height: 150,
                        colorDark: '#000000',
                        colorLight: '#ffffff'
                    })
                    that.showShare = true;
                    convertImgToBase64(that.groupSuit.sharePic, function (base64Img) {
                        that.groupSuit.sharePic = base64Img;
                        setTimeout(function () {
                            if (that.shareLink) {
                                that.print();
                            }
                        }, 100);
                    });
                }
            },
            print() {
                const el = this.$refs.test;
                const options = {
                    type: 'dataURL',
                    useCORS: true,
                    logging: false
                    // allowTaint: true
                }
                var that = this;
                that.$html2canvas(el, options).then(function(result) {
                    that.output = result;
                });
            },
            initData() {
                var that = this;
                groupMyAddress(0, that.groupMyId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupMy = res.data.groupMy;
                    that.leaderAddress = res.data.orderAddressVo;
                    that.endTimeDown = res.data.groupMy.endTime - that.systemTime;
                    countDown(that.endTimeDown, time => {
                        that.endTimeDown = time
                    })
                    groupDet(that.groupMy.groupSuitId).then(res => {
                        that.groupSuit = res.data.groupSuit;
                        var shareLink = process.env.DOMAIN + '/groupDet/' + that.groupSuit.id + '?groupMyId=' + that.groupMyId;
                        let sessionUserInfo = sessionStorage.getItem("userInfo");
                        that.sex = JSON.parse(sessionUserInfo).sex;
                        if (sessionUserInfo) {
                            if (shareLink.indexOf("?") !== -1) {
                                shareLink = shareLink + "&inviter=" + JSON.parse(sessionUserInfo).vipId;
                            } else {
                                shareLink = shareLink + "?inviter=" + JSON.parse(sessionUserInfo).vipId;
                            }
                        }
                        that.shareLink = shareLink;
                        wx.ready(function () {
                            let title = '我发起了一个拼团，大家一起来拼团吧 ' + that.groupSuit.suitName;
                            if (that.groupMy.groupSuitType === 2) {
                                title = '我在' + that.leaderAddress.address + '发起了一个拼团，大家一起来拼团吧！'
                            }
                            WechatShareUtils.onMenuShareAppMessage(title, that.groupSuit.describe, shareLink, that.groupSuit.thumbnailPic)
                        })
                        res.data.suitTypes.forEach(item => {
                            if (item.type === 1) {
                                that.diffetentAddressPrice = item.discountPrice;
                            } else {
                                that.sameAddressPrice = item.discountPrice;
                            }
                        });
                    })

                })

            },
            getMembers (page, size) {
                groupMembers(0, this.groupMyId, page, size).then(res => {
                    this.members = res.data.members;
                    this.totalPages = res.data.totalPages;
                })
            },
            loadMoreMember () {
                this.page += 1;
                this.getMembers(this.page, this.size);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .goods {
        border-color: $bc;
        .invite_btn {
            @include wh(92%,.45rem);
            @include sc(.15rem,$fc);
            text-align: center;
            line-height: .45rem;
            margin: 0 auto .15rem;
            border-radius: .225rem;
            background-color: $red;
            padding-bottom: .35rem;
        }
        .info_box {
            background-color: $fc;
            padding-bottom: .1rem;
            .group_info {
                padding: .25rem 0 0rem .15rem;
                .image {
                    margin-right: .35rem;
                    width: 1.4rem;
                    height: 1.4rem;
                    border-radius: 5px;
                }
                img.noImage {
                    background-color: #000;
                }
                .goods_info {
                    width: 50%;
                    .name {
                        @include sc(.15rem, $g3);
                        padding: .0rem 0 .03rem;
                        span {
                            color: $red;
                            font-weight: bold;
                        }
                    }
                    .desr {
                        @include sc(.12rem, $g6);
                    }
                    .price {
                        @include sc(.18rem, $red);
                        font-weight: bold;
                        .RMB {
                            font-size: .13rem;
                            font-weight: bold;
                        }
                    }
                    .right_tip {
                        position: relative;
                        width: .9rem;
                        text-align: center;
                        background-color: #FB9D1C;
                        height: .64rem;
                        margin: .05rem 0 .06rem;
                        p:first-child {
                            @include sc(0.14rem, $fc);
                            padding: 0.09rem 0 .05rem;
                        }
                        p:last-child {
                            @include sc(.14rem, $fc);
                        }
                        p.activityEnd {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100%;
                            @include sc(.18rem, $g3);
                        }
                        &:before {
                            content: "";
                            position: absolute;
                            display: block;
                            top: .28rem;
                            left: -.05rem;
                            border-top: .05rem solid transparent;
                            border-right: .05rem solid #FB9D1C;
                            border-bottom: .05rem solid transparent;
                        }
                        .shadow_box {
                            @include wh(.18rem, .18rem);
                            @include sc(.14rem, $fc);
                            background-color: #912714;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: .025rem;
                        }
                    }
                }
            }
            .aid_friend {
                .friend_list {
                    overflow: hidden;
                    margin: 0.2rem auto 0;
                    padding: .25rem .3rem .1rem;
                    border-top: .01rem solid #EFEFF4;
                    // display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    li {
                        float: left;
                        text-align: center;
                        width: 20%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: .15rem;
                        img {
                            @include wh(.42rem,.42rem);
                            border-radius: 50%;
                        }
                        p {
                            @include wh(.74rem,.26rem);
                            @include sc(.2rem, $fc);
                            border-radius: .13rem;
                            background-color: $red;
                            position: absolute;
                            bottom: -0.06rem;
                            transform: scale(.5);
                        }
                    }
                    li.none {
                        div {
                            @include wh(.42rem,.42rem);
                            margin: 0 auto;
                            border: .02rem dashed $g9;
                            border-radius: 50%;
                            line-height: .42rem;
                            box-sizing: border-box;
                            @include sc(.24rem, $g9);
                            span {
                                font-size: .12rem;
                                line-height: 1.4;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-top: .05rem;
                            }
                        }
                        p {
                            background-color: $g9;
                        }
                    }
                }
            }
        }
        .assembling_process {
            background-color: $fc;
            margin: .15rem 0 0;
            padding-bottom: .1rem;
            .process {
                overflow: hidden;
                margin: .335rem auto .2rem;
                text-align: center;
                width: 86%;
                li {
                    float: left;
                    width: 25%;
                    position: relative;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        right: -.22rem;
                        top: .18rem;
                        @include wh(.45rem, .01rem);
                        background-color:#E9EAEB;
                    }
                }
                li:last-child {
                    &:before {
                        content: '';
                        display: none;
                    }
                }
                img {
                    @include wh(.3rem, .32rem);
                    // border: .01rem dashed $g3;
                }
                .text {
                    @include sc(.14rem, $g3);
                }
            }
            .rules {
                width: 80%;
                margin: 0 auto .12rem;
                overflow: hidden;
                clear: both;
                line-height: 2.2;
                @include sc(.13rem, $g6);
            }
        }
        .poster {
            position: absolute;
            top: 0;
            z-index: 9999;
            @include wh(100vw,100vh);
            background: rgba(0, 0, 0, 1);
            padding-top: .12rem;
            .text {
                @include sc(.15rem, $fc);
                text-align: center;
                font-weight: bold;
            }
            .close_model {
                position: absolute;
                bottom: .4rem;
                left: 47%;
            }
            .invite_landing {
                overflow: hidden;
                position: relative;
                top: 0.1rem;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                background: rgba(0, 0, 0, 0.8);
                width: 84%;
                .box {
                    overflow: auto;
                    width: 100%;
                    max-height: 4.8rem;
                    background-color: $fc;
                    padding: .05rem .15rem .12rem;
                    border-radius: .05rem;
                    .groupMyInfo {
                        margin: 0.15rem 0 0.0rem .7rem;
                        text-align: left;
                        // height: .3rem;
                        p:first-child {
                            @include sc(.13rem,$g3B);
                            line-height: .13rem;
                            strong {
                                @include sc(.13rem,$black);
                                margin-right: .05rem;
                            }
                        }
                        p:nth-child(2) {
                            @include sc(.12rem,$g3B);
                            transform: scale(.87) translateX(-.2rem);
                            width: 113%;
                        }
                        p.padd-t {
                            padding: .05rem 0 .1rem;
                        }
                    }
                    .header {
                        border: .03rem solid #A40000;
                        border-radius: .05rem;
                        position: relative;
                        .icon_head {
                            position: absolute;
                            top: -.37rem;
                            left: -.04rem;
                            @include wh(.61rem,.6rem);
                        }
                        .descrInfo {
                            @include wh(100%,.4rem);
                            line-height: .45rem;
                            background-color: #A40000;
                            overflow: hidden;
                            padding: 0 .12rem;
                            .left {
                                @include sc(.13rem,$fc);
                                span:first-child {
                                    font-size: .2rem;
                                    font-weight: bold;
                                }
                                span:last-child {
                                    font-size: .12rem;
                                }
                            }
                            .right {
                                @include wh(1rem,.15rem);
                                @include sc(.12rem,#A40000);
                                background-color: #FFFF00;
                                border-radius: .08rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-top: .15rem;
                            }
                        }
                    }
                    .boxImg{
                        display: block;
                        width: 100%;
                        height: 1.75rem;
                        border-radius: .02rem .02rem 0 0;
                    }
                    .container {
                        overflow: hidden;
                        padding: .12rem .0rem 0rem .01rem;
                        .left {
                            width: 63%;
                            .title {
                                @include sc(.15rem, #262424);
                                max-height: .36rem;
                                font-weight: bold;
                            }
                            .content {
                                @include sc(.12rem, #434343);
                                // @include line-ellipsis(2);
                                max-height: .32rem;
                                overflow: hidden;
                            }
                            .discountPrice {
                                @include sc(.15rem, #A40000);
                                font-weight: bold;
                                margin-top: .05rem;
                                span {
                                    display: inline-block;
                                    font-weight: bold;
                                    @include sc(.13rem, #A40000);
                                    margin-right: .04rem;
                                }
                            }
                            .tips {
                                @include sc(.12rem, $black);
                                font-weight:bold;
                                margin: .02rem 0;
                                transform: scale(.9) translateX(-.1rem);
                            }
                            .originalPrice {
                                @include sc(.12rem, $black);
                                font-weight: bold;
                                margin-top: .05rem;
                                span {
                                    display: inline-block;
                                    font-weight: bold;
                                    @include sc(.12rem, $black);
                                    transform: scale(.85) translateY(.01rem);
                                    margin-right: .02rem;
                                }
                            }
                        }
                        .qrcode {
                            @include wh(1rem,1rem);
                            border-radius: .05rem;
                            background: #000;
                            margin-top: .1rem;
                        }
                    }
                }
            }
        }
    }
</style>

<!-- 发起或参与拼团详情页，可分享 -->
<template>
    <div class="position-re">   
        <div class="goods" v-if="!showLoading">
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
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from "src/components/common/loading";
    import {
        ModalHelper
    } from "../../service/Utils";
    import {
        countDown,
        convertImgToBase64
    } from "src/config/mUtils";
    import {
        groupMy,
        groupSuit,
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
                sex: '',
                showLoading: true
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
            loading
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
                    groupSuit(that.groupMy.groupSuitId).then(res => {
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
                        that.showLoading = false;
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
    @import "../../style/groupMy";
</style>

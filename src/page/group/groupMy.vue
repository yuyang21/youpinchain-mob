<!-- 发起或参与拼团详情页，可分享 -->
<template>
    <div class="goods">
        <div class="info_box">
            <div class="group_info clear">
                <router-link tag="div" :to="'/groupDet/' + groupSuit.id">
                    <img :src="groupSuit.thumbnailPic" alt="" class="left"
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
                        <p class="desr">￥{{groupSuit.originalPrice}}</p>
                    </div>
                </router-link>
            </div>
            <div class="aid_friend">
                <ul class="friend_list">
                    <li><img :src="leader.headImgUrl"><p>团长</p></li>
                    <li v-for="(item,index) in members" :key="index"><img :src="item.headImgUrl"></li>
                    <li class="none"><div>?</div><p>待邀请</p></li>
                    <li class="none" v-if="members.length > 15"><div><span>查看<br>更多</span></div></li>
                </ul>
            </div>
            <div class="invite_btn clear" v-if="endTimeDown > 0" @click="showShare = true;">邀请好友</div>
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
        <share-mask v-if="showShare" :showShare="showShare"></share-mask>
    </div>
</template>

<script>
    import shareMask from "src/components/common/shareMask";
    import {
        ModalHelper
    } from "../../service/Utils";
    import {
        countDown
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
    export default {
        data() {
            return {
                showShare: false,
                groupMyId: '',
                groupSuit: {},
                groupMy: {},
                members: [],
                leader: {},
                endTimeDown: null,
                timer: null,
                systemTime: null
            };
        },
        mounted() {
            this.groupMyId = this.$route.params.groupMyId;
            systemTime().then((res) => {
                this.systemTime = res.data
                this.initData();
            })
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
            shareMask
        },
        created() {

        },
        methods: {
            initData() {
                var that = this;
                groupMyAddress(0, that.groupMyId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupMy = res.data.groupMy;
                    that.endTimeDown = res.data.groupMy.endTime - that.systemTime;
                    countDown(that.endTimeDown, time => {
                        that.endTimeDown = time
                    })
                    groupDet(that.groupMy.groupSuitId).then(res => {
                        that.groupSuit = res.data.groupSuit;
                        wx.ready(function () {
                            var shareLink = process.env.DOMAIN + '/groupDet/' + that.groupSuit.id + '?groupMyId=' + that.groupMyId;
                            let title = '我发起了一个拼团，大家一起来拼团吧 ' + that.groupSuit.suitName;
                            if (that.groupMy.groupSuitType === 2) {
                                title = '我在' + that.groupMy.orderAddressVo.address + '发起了一个拼团，大家一起来拼团吧！'
                            }
                            WechatShareUtils.onMenuShareAppMessage(title, that.groupSuit.describe, shareLink, that.groupSuit.thumbnailPic)
                        })
                    })

                })
                groupMembers(0, that.groupMyId, 1, 10).then(res => {
                    that.leader = res.data.members[0];
                    that.members = res.data.members.slice(1);
                })

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
    .fade-leave-to
        /* .fade-leave-active below version 2.1.8 */

    {
        opacity: 0;
    }

    .goods {
        border-color: $bc;
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
                        background-color: #000000;
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
                        box-sizing: content-box;
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
    }

    .group_info {
        padding: .25rem 0 0rem .15rem;
        img {
            margin-right: .35rem;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 5px;
        }
        img.noImage {
            background-color: #000;
        }
        li {
            width: 100%;
            clear: both;
            overflow: hidden;
            margin-bottom: .12rem;
            position: relative;
            border-bottom: 1px solid #f8f8f8;
            padding-bottom: .15rem;
        }
        li:last-child {
            margin-bottom: 0;
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
    .info_box {
        background-color: $fc;
        padding-bottom: .1rem;
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
</style>

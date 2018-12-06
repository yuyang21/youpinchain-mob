<!-- 团购详情 -->
<template>
    <div class="goods">
        <head-top class="header" go-back='true' is-share="true" :showShare="showShare"
                  :headTitle="headTitle"/>
        <div class="top_main">
            <carousel :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500"
                      :perPage="1" :paginationPadding="5" :paginationSize="8"
                      :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color">
                <img :src="groupSuit.normalPic" alt="" class="show">
            </carousel>
            <div class="presell_box">

                <div class="left_price left" v-if="groupSuit.preSaleDelivery !== undefined">
                    <p class="price"><span>￥</span>{{groupPrice}} <s>￥{{groupSuit.originalPrice}}</s></p>
                    <p class="tip">商品预计{{(groupSuit.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
                </div>
                <div class="left_price left" v-else>
                    <p class="price" :class="{'margin-t-p8': groupSuit.preSaleDelivery === undefined}"><span>￥</span>{{groupPrice}} <s>￥{{groupSuit.originalPrice}}</s></p>
                </div>
                <div class="right_tip right" v-if="!groupMyId && endTimeDown>0 && startTimeDown<1">
                    <p>距开团结束</p>
                    <p v-if="endTimeDown > 24*60*60">
                        <span class="shadow_box">{{Math.floor(endTimeDown/60/60/24)}}</span>天<span class="shadow_box">{{endTimeDown - Math.floor(endTimeDown/60/60/24)*24*60*60 | timeArry(0)}}</span>时<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>分
                    </p>
                    <p v-else>
                        <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>时<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>分<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>秒
                    </p>
                </div>
                <div class="right_tip right" v-if="groupMyId">
                    <p>距拼团结束</p>
                    <p>
                        <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>
                    </p>
                </div>
                <div class="right_tip right" :class="{'activityEnd': endTimeDown <= 0}" v-if="endTimeDown <= 0">
                    <p>拼团结束</p>
                </div>
            </div>
            <div class="title">
                <!--<p class="price" v-if="!groupSuit.presentPrice"><span>￥</span>{{groupSuit.presentPrice}} <s>￥{{groupSuit.originalPrice}}</s></p>-->
                <p class="name"><span class="presell_text" v-if="groupSuit.presentPrice">【预售】</span>{{groupSuit.suitName}}
                </p>
                <p class="desr">{{groupSuit.describe}}</p>
            </div>
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
                <p class="mode">模式一：<span>普通拼团，享受价格优惠</span></p>
                <p class="mode">模式二：<span>社区拼团，团长选择收货地址，团员线下与团长进行后续收货服务。团员享受更高的价格优惠，团长获得现金返利。</span></p><br>
            </div>
        </div>
        <!-- 拼团详情 -->
        <div class="goods_info">
            <div class="panel_title">拼团详情</div>
            <ul class="goodslistul clear">
                <li v-for="item in suitDet" :key="item.id">
                    <router-link tag="div" :to="'/goods/' + item.productId">
                        <img :src="item.productThumbnailPic" alt="" class="left"
                             :class="{'noImage': !item.productThumbnailPic}">
                        <div class="left goods_li">
                            <p class="name">{{item.productName + ' ' +
                                item.productNetContent}}*1{{item.productPacking}}</p>
                            <p class="desr">{{item.productDescribe}}</p>
                            <p class="price"><span class="RMB">￥</span>{{item.productPresentPrice}}</p>
                            <p class="single_price">单买价￥{{item.productOriginalPrice}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="add_cart_container" v-if="endTimeDown>0 && startTimeDown<1">
            <div class="cart_btn right" v-if="groupMyId" @click="toSubmitOrder(1)">￥{{groupMy.discountPrice}} <br> 参与拼团</div>
            <div class="cart_btn right" v-else @click="toSubmitOrder(1)">￥{{groupPrice}} <br> 发起拼团</div>
            <div class="cart_btn_alone right" @click="toSubmitOrder(0)">￥{{groupSuit.suitPrice}} <br> 单独购买</div>
        </div>
        <div class="add_cart_container activityEnd_btns" v-if="endTimeDown <= 0">
            <div class="cart_btn right" @click="toSubmitOrder(1)">{{!groupMyId ? '我要开团' : '查看其他拼团'}}</div>
            <div class="cart_btn_alone right">拼团结束</div>
        </div>
        <share-mask v-if="showShare" :showShare="showShare"></share-mask>
    </div>
</template>

<script>
    import {
        Carousel,
        Slide
    } from "vue-carousel";
    import shareMask from "src/components/common/shareMask";
    import headTop from "src/components/header/head";
    import {
        ModalHelper
    } from "../../service/Utils";
    import {
        countDown
    } from "src/config/mUtils";
    import {
        groupMyAddress,
        groupDet
    } from "../../service/getData";
    import {
        WechatShareUtils
    } from '../../service/WechatShareUtils'
    import wx from 'weixin-js-sdk'

    export default {
        data() {
            return {
                showShare: false,
                headTitle: "",
                goodsid: "",
                groupMyId: '',
                groupMy: {},
                groupSuit: {},
                suitTypes: [],
                suitDet: [],
                groupPrice: 0,
                cart_num: 0,
                number: [1, 2, 3, 4, 5],
                pagination: {
                    activeColor: "#e4372e",
                    color: "#fff"
                },
                endTimeDown: null,
                startTimeDown: null,
                timer: null,
            };
        },
        watch: {
            showShare: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
            },
            endTimeDown: function (val) {
                var that = this
                if (!val) {
                    clearInterval(that.timer)
                    setTimeout(function () {
                        that.initData()
                    },1000)
                }
            }
        },
        mounted() {
            this.groupSuitId = this.$route.params.suitId;
            this.groupMyId = this.$route.query.groupMyId;
            this.initData();
        },
        components: {
            Carousel,
            Slide,
            shareMask,
            headTop
        },
        computed: {},
        props: ["showErrMsg"],
        methods: {
            initData() {
                var that = this;
                groupDet(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupSuit = res.data.groupSuit;
                    that.suitDet = res.data.suitDet;
                    that.headTitle = res.data.groupSuit.suitName;
                    that.suitTypes = res.data.suitTypes;

                    // that.startTimeDown = res.data.startTimeDown;
                    wx.ready(function () {
                        var shareLink = window.location.href
                        WechatShareUtils.onMenuShareAppMessage('超值拼团 ' + that.groupSuit.suitName, that.groupSuit.describe, shareLink, that.groupSuit.thumbnailPic)
                    })

                    // 因请求是异步，无法保证时间先后，所以需判断
                    if (!this.groupMyId) {
                        that.groupPrice = that.suitTypes[0].discountPrice;
                        that.suitTypes.forEach(t => {
                            that.groupPrice = Math.min(that.groupPrice, t.discountPrice);
                        })

                        that.endTimeDown = res.data.suitEndTimeDown;
                        countDown(that.endTimeDown, time => {
                            that.endTimeDown = time
                        })
                    }
                });

                // 有用户拼团Id，说明这是一个已开的团，只能参团
                if (this.groupMyId) {
                    groupMyAddress(this.groupSuitId, this.groupMyId).then(res => {
                        if (res.errno !== 0) {
                            return;
                        }
                        that.groupMy = res.data.groupMy;
                        that.groupPrice = res.data.groupMy.discountPrice;
                        that.endTimeDown = res.data.groupMy.endTime - new Date().getTime()/1000;

                        countDown(that.endTimeDown, time => {
                            that.endTimeDown = time
                        })
                    });
                }
            },
            /**
             * 到提交订单页面
             */
            toSubmitOrder(type) {
                if (this.groupMyId && this.endTimeDown <= 0) {
                    this.$router.push('/group');
                    return;
                }
                let suitDet = this.suitDet
                let groupSuit = this.groupSuit
                let currentTime = new Date().getTime();
                let groupMyId = this.groupMyId;
                sessionStorage.setItem(
                    "suit_" + currentTime,
                    JSON.stringify(suitDet)
                );
                sessionStorage.setItem(
                    "groupSuit_" + currentTime,
                    JSON.stringify(groupSuit)
                );
                sessionStorage.setItem(
                    "suitType_" + currentTime,
                    JSON.stringify(this.suitTypes)
                );
                this.$router.push("/confirmGroup?type="+type+"&groupKey=groupSuit_"+currentTime+"&suitKey=suit_" + currentTime+"&suitTypeKey=suitType_" + currentTime+"&groupMyId="+groupMyId);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";

    .goods {
        padding: 0.45rem 0 0.5rem;
        background-color: $bc;
        .top_main {
            .show {
                @include wh(100%, 3.75rem);
            }
        }
        .presell_box {
            overflow: hidden;
            padding: 0.08rem 0 0.12rem 0.12rem;
            background-image: linear-gradient(133deg, #fc5b46, #fa424f);
            @include wh(100%, 0.64rem);
            .left_price {
                .price {
                    @include sc(0.238rem, $fc);
                    font-weight: bold;
                    span {
                        @include sc(0.15rem, $fc);
                        font-weight: bold;
                    }
                    s {
                        @include sc(0.12rem, $fc);
                        font-weight: normal;
                    }
                }
                .price.margin-t-p8 {
                    margin-top: .08rem;
                }
                .tip {
                    @include sc(0.12rem, $fc);
                    margin-top: -0.05rem;
                }
            }
            .right_tip {
                position: relative;
                width: .9rem;
                text-align: center;
                background-color: #FB9D1C;
                height: .64rem;
                margin-top: -.08rem;
                p:first-child {
                    @include sc(0.14rem, $fc);
                    padding: 0.09rem 0 .05rem;
                }
                p:last-child {
                    @include sc(.14rem, $fc);
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
            .right_tip.activityEnd {
                background-color: $g9;
                &:before {
                    border-right: .05rem solid $g9; 
                }
                p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }
            }
        }
        .title {
            background-color: $fc;
            padding: 0.1rem 0.15rem 0.1rem;
            border-radius: 0.12rem 0.12rem 0 0;
            .price {
                @include sc(0.238rem, $red);
                font-weight: bold;
                span {
                    @include sc(0.12rem, $red);
                    font-weight: normal;
                }
                s {
                    @include sc(0.12rem, $g9);
                    font-weight: normal;
                }
            }
            .name {
                @include sc(0.18rem, $g3);
                padding: 0.01rem 0 0.0rem;
                .presell_text {
                    @include sc(0.18rem, $g3);
                    margin: 0.08rem 0 0 -0.1rem;
                    display: inline-block;
                }
            }
            .desr {
                @include sc(0.12rem, $g6);
            }
        }
        .goods_info {
            background-color: $fc;
            margin: .15rem 0 .5rem;
            .info_content {
                p {
                    @include sc(0.13rem, $g6);
                    line-height: 0.35rem;
                    border-bottom: 1px solid #f7f7fa;
                    padding: 0rem 0.21rem;
                }
            }
            .single_price {
                @include sc(.12rem, $g9);
            }
        }
        .certificates {
            text-align: center;
            background-color: $bc;
            padding: 0.3rem 0.08rem;
            .abstract {
                @include sc(0.2rem, $g3);
                margin-bottom: 0.27rem;
            }
            ul {
                display: flex;
                li {
                    flex: 1;
                    background-color: #fcfbfc;
                    margin: 0 0.04rem;
                    padding: 0.1rem 0;
                    border-radius: 0.05rem;
                    img {
                        width: 0.34rem;
                    }
                    p {
                        @include sc(0.13rem, $g6);
                    }
                }
            }
        }
        .description_detail {
            .abstractImg {
                width: 100%;
                display: block;
            }
            ul {
                li {
                    padding: 0.3rem;
                    background-color: #fcfbfc;
                    .abstract {
                        @include sc(0.2rem, $g3);
                        text-align: center;
                    }
                    p {
                        @include sc(0.13rem, $g6);
                        text-align: justify;
                    }
                    p:last-child {
                        margin-top: 0.25rem;
                    }
                    .tip {
                        @include sc(0.13rem, $g6);
                        text-align: center;
                    }
                }
                li:nth-child(even) {
                    background-color: $bc;
                }
            }
        }
        .add_cart_container {
            position: fixed;
            bottom: 0;
            overflow: hidden;
            clear: both;
            @include wh(100%, 0.49rem);
            .cart_icon_num {
                @include wh(1.06rem, 0.49rem);
                background-color: $fc;
                .icon {
                    position: relative;
                    margin: 0.13rem auto;
                    @include wh(0.245rem, 0.225rem);
                    @include bis("../../images/tab-buy-normal.png");
                }
            }
            .cart_btn, .cart_btn_alone {
                height: 0.49rem;
                text-align: center;
                padding: .07rem 0;
                line-height: 1.25;
                @include sc(0.15rem, $fc);
            }
            .cart_btn {
                background-color: $red;
                width: 70%;
            }
            .cart_btn_alone {
                background-color: #FF9FA2;
                width: 30%;
            }
        }
        .add_cart_container.activityEnd_btns {
            .cart_btn_alone {
                background-color: $g9;
                line-height: .35rem;
            }
            .cart_btn {
                line-height: .35rem;
            }
        }
        .assembling_process {
            background-color: $fc;
            margin: .15rem 0;
            .process {
                overflow: hidden;
                margin: .335rem auto .25rem;
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
                    @include wh(.335rem, .35rem);
                    border: .01rem dashed $g3;
                }
                .text {
                    @include sc(.14rem, $g3);
                }
            }
            .mode {
                width: 85%;
                margin: 0 auto .12rem;
                overflow: hidden;
                clear: both;
                @include sc(.13rem, $g6);
                span {
                    float: right;
                    width: 82.3%;
                    text-align: justify;
                    @include sc(.13rem, $g6);
                }
            }
        }
    }

    .goodslistul {
        padding: .25rem .15rem 0rem;
        img {
            margin-right: .12rem;
            width: .95rem;
            height: .95rem;
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
        .goods_li {
            width: 55%;
            .name {
                @include sc(.15rem, $g3);
                padding: .02rem 0 .03rem;
            }
            .desr {
                @include sc(.12rem, $g6);
            }
            .coupon {
                border-radius: 10px;
                display: inline-block;
                transform: scale(0.82) translateX(-8px);
                margin: .2rem 0 .1rem;
                padding: 0 .05rem;
            }
            .useCoupon {
                @include sc(.12rem, $red);
                border: 1px solid $red;
            }
            .unuseCoupon {
                @include sc(.12rem, $g9);
                border: 1px solid $g9;
            }
            .price {
                // margin-top: .6rem;
                @include sc(.18rem, $red);
                font-weight: bold;
                s {
                    @include sc(.12rem, $g9);
                    font-weight: normal;
                }
            }
        }
        .shopping_cart {
            position: absolute;
            right: 0;
            bottom: .25rem;
            @include wh(.315rem, .315rem);
            @include bis('../../images/shopping_cart.png');
        }
    }
</style>

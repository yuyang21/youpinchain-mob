<!-- 团购详情 -->
<template>
    <div class="goods">
        <head-top class="header" go-back='true' is-share="true" :showShare="showShare"
                  :headTitle="headTitle"/>
        <div class="scrollBox">
            <div class="top_main">
                <div v-if="headPic && headPic.length <= 0">
                    <img :src="groupSuit.normalPic" alt="" class="show">
                </div>
                <swipe ref="swipe" :speed="500" :loop="true" :autoplayTime="1500" v-else>
                    <swipe-item v-for="(item,index) in headPic" :key="index">
                        <div class="header_image">
                            <img :src="item" alt="" width="100%" class="show">
                        </div>
                    </swipe-item>
                </swipe>
                <div class="presell_box">

                    <div class="left_price left" v-if="groupSuit.preSaleDelivery !== undefined">
                        <p class="price"><span>￥</span>{{groupPrice}} <s>￥{{groupSuit.suitPrice}}</s></p>
                        <p class="tip">商品预计{{(groupSuit.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
                    </div>
                    <div class="left_price left" v-else>
                        <p class="price" :class="{'margin-t-p8': groupSuit.preSaleDelivery === undefined}">
                            <span>￥</span>{{groupPrice}} <s>￥{{groupSuit.suitPrice}}</s>
                        </p>
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
                    <div class="right_tip right" v-if="groupMyId && endTimeDown>0">
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
                    <p class="mode">模式一：<span>不同地址拼团，享受价格优惠</span></p>
                    <p class="mode">模式二：<span>同一地址拼团，团长选择收货地址，团员线下与团长进行后续收货服务。团长获得劳动鼓励金。</span></p><br>
                </div>
            </div>
            <!-- 拼团商品 -->
            <div class="goods_info" v-if="groupSuit.type == 2">
                <div class="panel_title">拼团商品</div>
                <ul class="goodslistul clear">
                    <li v-for="(item, index) in suitDet" :key="item.id">
                        <!-- <router-link tag="div" :to="'/goods/' + item.productId"> -->
                        <div>
                            <img :src="item.productThumbnailPic" alt="" class="left"
                                :class="{'noImage': !item.productThumbnailPic}">
                            <div class="left goods_li">
                                <p class="name">{{item.productName + ' ' +
                                    item.productNetContent}}*1{{item.productPacking}}</p>
                                <!--<p class="desr">{{item.productDescribe}}</p>-->
                                <!--<p class="price"><span class="RMB">￥</span>{{item.productPresentPrice}}</p>-->
                                <div class="cart_btns right" v-if="item.productStock > 0">
                                    <span class="subduction" @click="addNumber(index, -1)"><img src="../../images/sub-icon.png"/></span>
                                    <span class="num">{{item.buyNum}}</span>
                                    <span class="add" @click="addNumber(index, 1)"><img src="../../images/add-icon.png"/></span>
                                </div>
                                <div class="cart_btns right" v-else>
                                    <p class="desr">卖光了</p>
                                </div>
                            </div>
                        </div>
                        <!-- </router-link> -->
                    </li>
                </ul>
            </div>
            <!-- 拼团详情 -->
            <div class="goods_info" v-if="footPic && footPic.length > 0">
                <div class="panel_title">拼团详情</div>
                <div class="goodsImgs">
                    <img :src="item" alt="" v-for="(item,index) in footPic" :key="index" width="100%">
                </div>
            </div>
        </div>
        <div class="add_cart_container" v-if="endTimeDown>0 && startTimeDown<1">
            <div :class="groupSuit.type == 2?'cart_btn right cart_btn_center':'cart_btn right'" v-if="groupMyId" @click="toSubmitOrder(false)"><template v-if="groupSuit.type != 2">￥{{groupMy.discountPrice}} <br></template> 参与拼团</div>
            <div :class="groupSuit.type == 2?'cart_btn right cart_btn_center':'cart_btn right'" v-else @click="toSubmitOrder(false)"><template v-if="groupSuit.type != 2">￥{{groupPrice}} <br></template> 发起拼团</div>
            <div :class="groupSuit.type == 2?'cart_btn_alone right cart_btn_center':'cart_btn_alone right'" @click="toSubmitOrder(true)"><template v-if="groupSuit.type != 2">￥{{groupSuit.suitPrice}} <br></template> 立即支付</div>
        </div>
        <div class="add_cart_container activityEnd_btns" v-if="endTimeDown <= 0">
            <div class="cart_btn right" @click="toSubmitOrder(false, true)">{{groupMyId ? '我要开团' : '查看其他拼团'}}</div>
            <div class="cart_btn_alone right">拼团结束</div>
        </div>
        <share-mask v-if="showShare" :showShare="showShare"></share-mask>
    </div>
</template>

<script>
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
        groupSuit,
        groupPro
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
                endTimeDown: null,
                startTimeDown: null,
                timer: null,
                headPic: [],
                footPic: []
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
            document.querySelector('.scrollBox').style.height = document.documentElement.clientHeight - document.querySelector('.header').clientHeight - document.querySelector('.add_cart_container').clientHeight + 'px';
        },
        components: {
            shareMask,
            headTop
        },
        computed: {},
        props: ["showErrMsg"],
        methods: {
            initData() {
                var that = this;
                groupSuit(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupSuit = res.data.groupSuit;
                    that.headTitle = res.data.groupSuit.suitName;
                    that.suitTypes = res.data.suitTypes;
                    that.headPic = res.data.headPic;
                    that.footPic = res.data.footPic;

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
                groupPro(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.suitDet = res.data;
                    that.suitDet.forEach(s => {
                        s.suitNum = 0
                    })

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
            toSubmitOrder(isAloneBuy, isOpenGroup) {
                let isNum = 0;
                if (this.groupSuit.type === 2) {
                    let isNum = 0;
                    this.suitDet.forEach(s => {
                        isNum += s.buyNum
                    })
                    // if (isNum < 1) {
                    //     this.$parent.showErrMsg('至少选择一件');
                    //     return;
                    // }
                }
                if (!this.groupMyId && this.endTimeDown <= 0) {
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
                let path = "/confirmGroup?isAloneBuy="+isAloneBuy+"&groupKey=groupSuit_"+currentTime+"&suitKey=suit_" + currentTime+"&suitTypeKey=suitType_" + currentTime;
                if (!isOpenGroup) {
                    path = path + '&groupMyId=' + groupMyId;
                }
                this.$router.push(path);
            },
            addNumber(index, number) {
                if (this.suitDet[index].buyNum <= 0 && number < 0) {
                    return
                }
                this.suitDet[index].buyNum = this.suitDet[index].buyNum + number;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../static/swipe/swipe.min.css';
    @import "src/style/mixin";

    .goods {
        padding: 0.45rem 0 0.5rem;
        background-color: $bc;
        overflow: hidden;
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
                width: 1.2rem;
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
            margin: .15rem 0;
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

            .goodsImgs {
                img {
                    width: 100%;
                    display: block;
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
            .cart_btn_center {
                line-height: 2.25;
            }
            .cart_btn {
                background-color: $red;
                width: 60%;
            }
            .cart_btn_alone {
                background-color: #FF9FA2;
                width: 40%;
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
        img.left {
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
            .cart_btns {
                position: absolute;
                right: .2rem;
                bottom: .2rem;
                .subduction img,
                .num,
                .add img {
                    width: .2rem;
                    height: .2rem;
                    display: inline-flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                }
                .num {
                    font-size: .18rem;
                    color: #e4372e;
                    vertical-align: top;
                    margin: 0 .05rem;
                }
                .subduction,
                .add {
                    display: inline-flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
    .scrollBox {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        z-index: 1;
    }
</style>

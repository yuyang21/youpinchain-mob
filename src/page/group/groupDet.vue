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
                <div class="left_price left">
                    <p class="price"><span>￥</span>{{groupSuit.suitPrice}} <s>￥{{groupSuit.originalPrice}}</s></p>
                    <p class="tip">商品预计{{(groupSuit.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
                </div>
                <div class="right_tip right" v-if="endTimeDown>0 && startTimeDown<1">
                    <p>距开团结束</p>
                    <p>
                        <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>
                    </p>
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
            <div class="info_title">拼团流程</div>
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
            <div class="info_title">拼团详情</div>
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
        <!-- <div class="certificates">
            <p class="abstract">奖励规则</p>
            <ul>
                <li v-for="item in rules">
                    <p v-if="item.describe">{{item.describe}}</p>
                    <p v-else>{{item.rewardRulesName}}:满足拼团人数超过{{item.rulesNum}},即可获得{{item.rewardName}}</p>
                </li>
            </ul>
        </div>
        <div class="description_detail">
            <img class="abstractImg" src="../../images/group/group_explain.jpg" alt="">
            <ul>
                <li>
                    <p class="abstract">预售说明</p>
                    <p align="center" style="text-align:center">为保证新鲜，生猪屠宰排酸后即发货。
                        <br/>9月18日屠宰，即日其可下单购买。
                        <br/>数量有限、售完为止。
                    </p>
                </li>
                <li>
                    <p class="abstract">物流说明</p>
                    <div class="tip">（以下时效是以快递发出后计算）</div>
                    <p>覆盖区域：仲秋活动仅限北京和江浙沪地区<br> 物流费用：消费不满199元，快递费15元；消费>199元，包邮。
                        <br/> 快递公司：默认顺丰或者申通。
                        <br/> 特别提示：北京订单为淮安至北京冷链车统一运送，北京同城快递达至客户手中。
                    </p>
                </li>
                <li>
                    <p class="abstract">售后说明</p>
                    <p>若因外箱破损或快递延误发现腐烂变质情况，请在收获后3小时联系客服，我们来为您处理，保证您购物无忧。 <br/> 温馨提示：因生鲜产品特殊性，物流签收超过24小时后，不支持退换货，敬请谅解。
                    </p>
                </li>
            </ul>
        </div> -->
        <div class="add_cart_container" v-if="endTimeDown>0 && startTimeDown<1">
            <div class="cart_btn right" v-if="groupMyId" @click="toSubmitOrder(1)">加入团购</div>
            <div class="cart_btn right" v-else @click="toSubmitOrder(1)">我要开团</div>
            <div class="cart_btn_alone right" @click="toSubmitOrder(0)">单独购买</div>
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
        showBack
    } from "src/config/mUtils";
    import {
        addToCart,
        groupDet,
        cartProductCount
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
                groupSuit: {},
                suitDet: [],
                rules: [],
                cart_num: 0,
                number: [1, 2, 3, 4, 5],
                pagination: {
                    activeColor: "#e4372e",
                    color: "#fff"
                },
                preview: '',
                endTimeDown: null,
                startTimeDown:null,
                timer: null,
                timer2: null,
                timer3: null,
            };
        },
        watch: {
            showShare: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
            },
            endTimeDown: function (val) {
                var that = this
                if (!val) {
                    clearInterval(that.timer3)
                    that.timer3 = setTimeout(function () {
                        that.initData()
                    },1000)
                }
            }
        },
        mounted() {
            this.goodsid = this.$route.params.suitId;
            this.groupMyId = this.$route.query.groupMyId;
            this.initData();
            this.initCartCount();
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
            toCredential(index) {
                this.$router.push("/credentials/#w_anchor" + index);
            },
            initData() {
                var that = this;
                groupDet(that.goodsid).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupSuit = res.data.groupSuit;
                    that.suitDet = res.data.suitDet;
                    that.rules = res.data.rules;
                    that.endTimeDown = res.data.endTimeDown;
                    that.startTimeDown = res.data.startTimeDown;
                    !res.data.preSaleDelivery ?
                        (that.groupSuit.preSaleDelivery = "2018-09-18T00:58:28") :
                        null;
                    wx.ready(function () {
                        var shareLink = window.location.href
                        WechatShareUtils.onMenuShareAppMessage('超值拼团 ' + that.groupSuit.suitName, that.groupSuit.describe, shareLink, that.groupSuit.thumbnailPic)
                    })
                    that.computeNumber()
                });

                //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                showBack(status => {
                    that.headTitle = status ? that.groupSuit.name : "";
                });
            },
            initCartCount() {
                cartProductCount().then(res => {
                    if (res.errno == 0) {
                        this.cart_num = res.data;
                    }
                });
            },
            addCartList(goods) {
                addToCart(this.goodsid, 1).then(res => {
                    if (res.errno === 0) {
                        this.showErrMsg("添加成功");
                        this.initCartCount();
                    }
                });
            },
            /**
             * 到提交订单页面
             */
            toSubmitOrder(type) {
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
                this.$router.push("/confirmGroup?type="+type+"&groupKey=groupSuit_"+currentTime+"&suitKey=suit_" + currentTime+"&groupMyId="+groupMyId);
            },
            // 倒计时
            computeNumber () {
                var that = this
                var time = that.endTimeDown
                var start_time = new Date().getTime(); //获取开始时间的毫秒数
                if(that.endTimeDown){
                    this.timer = setInterval(function () {
                        if(that.endTimeDown >= 1){
                            var end_time = new Date().getTime();
                            var diff_time = Math.floor((end_time - start_time) / 1000);
                            //拿到时间差作为时间标记（行走时间）
                            document.addEventListener('visibilitychange',function() {
                                if(document.visibilityState=='visible') {
                                    that.endTimeDown = time - diff_time
                                } else {
                                }
                            })
                            that.endTimeDown -= 1
                            that.luckDrawTime -= 1
                            if(that.endTimeDown < 1){
                                that.endTimeDown = 0
                            }
                        } else {
                            clearInterval(that.timer)
                            return
                        }
                    },1000)
                }
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
        .info_title {
            padding-left: 0.16rem;
            border-left: 7px solid $red;
            line-height: 0.45rem;
            border-bottom: 1px solid #f7f7fa;
            @include wh(100%, 0.45rem);
            @include sc(0.15rem, $g6);
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
            .cart_btn {
                line-height: 0.49rem;
                text-align: center;
                background-color: $red;
                width: 50%;
                @include sc(0.15rem, $fc);
            }
            .cart_btn_alone {
                line-height: 0.49rem;
                text-align: center;
                background-color: $orange;
                width: 50%;
                @include sc(0.15rem, $fc);
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
                    width: 83.6%;
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

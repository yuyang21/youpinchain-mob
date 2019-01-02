<template>
    <div>
        <nav class="shop_list_container">
            <div class="swiper-container" v-if="carts.length">
                <div class="topBG"></div>
                <div class="shop_info">
                    <div v-for="(cartList, index) in carts" :key="index"
                         :class="{'border-no': index === carts.length - 1}" class="lists">
                        <div class="title">
                            <span :class="[cartList.choose ? 'choose' : 'unselected']"
                                  @click="checkCart(cartList)"></span>
                            <span>{{cartList.brandName}}</span>
                        </div>
                        <ul class="goods">
                            <div class="left">
                                <li v-for="item in cartList.cartListDtos" :key="item.cartId">
                                    <span :class="[item.choose && item.available ? 'choose' : 'unselected']"
                                          @click="checkCart(item)"></span>
                                </li>
                            </div>
                            <div class="right">
                                <li v-for="item in cartList.cartListDtos" :key="item.cartId">
                                    <img :src="item.thumbnailPic" alt="" class="img"
                                         :class="{'noImage': !item.thumbnailPic}">
                                    <div class="goods_info">
                                        <p class="name" style="-webkit-box-orient: vertical;">{{item.productName}}</p>
                                        <p class="price"><span class="RMB">￥</span>{{item.presentPrice}}</p>
                                    </div>
                                    <div class="cart_btns">
                                        <span class="subduction" :class="{'disabled': item.number <= 1}"
                                              @click="item.number > 1 ? addNumber(item, -1) : deleteCart(item)"></span>
                                        <span class="num">{{item.number}}</span>
                                        <span class="add" @click="addNumber(item, 1)"></span>
                                    </div>

                                    <p class="red" v-if="!item.isShow">已下架</p>
                                    <p class="red" v-else-if="!item.available">库存不足</p>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <ul class="payment_info">
                        <li>
                            <p>商品总价</p>
                            <p><span class="RMB">￥</span>{{goodsPrice | number}}</p>
                        </li>
                        <li>
                            <p>商品实付</p>
                            <p><span class="RMB">￥</span>{{payment | number}}</p>
                        </li>
                        <li>
                            <p>运费</p>
                            <p><span class="RMB">￥</span>{{fare}}</p>
                        </li>
                    </ul>
                    <div class="right totalPrice">
                        合计
                        <p><span class="RMB">￥</span>{{totalPrice | number}}</p>
                    </div>
                </div>
            </div>
            <div class="no_list" v-else>
                <img src="../../images/buy-icon-n-normol.png" alt="您还没有添加任何商品哦～" width="15%">
                <p>您还没有添加任何商品哦～</p>
            </div>
        </nav>
        <!-- 推荐商品 -->
        <div class="recommend_nav">
            <div class="recommend_header">推荐商品</div>
            <ul class="recommend_list">
                <li v-for="item in hotgoodslist" :key="item.id">
                    <router-link tag="div" :to="'/goods/' + item.id"><img :src="item.thumbnailPic" alt="" class="img">
                    </router-link>
                    <router-link tag="div" :to="'/goods/' + item.id" class="left">
                        <p class="name">{{item.name + ' ' + item.netContent}}*1{{item.packing}}</p>
                        <p class="price"><span class="RMB">￥</span>{{item.presentPrice}} <s class="RMB">￥{{item.originalPrice}}</s>
                        </p>
                    </router-link>
                    <div class="right add_cart" :class="{'shopping_cart_disabled': item.stock <= 0}"
                         @touchstart="addToCart(item, $event)"></div>
                </li>
            </ul>
            <router-link :to="'/home'" class="load_more" v-if="hasMore">查看更多商品</router-link>
        </div>
        <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot"
                    :key="index">
            <span class="move_dot" v-if="item"></span>
        </transition>
        <!-- 底部总计 -->
        <ul class="settlement">
            <li @click="checkSelectAll()">
                <span :class="[selectAll ? 'selectAll' : 'unselected']"></span> 全选
            </li>
            <li>
                <p>合计 &nbsp;&nbsp;<span class="red"><span class="RMB">￥</span>{{totalPrice | number}}</span></p>
                <p>运费 &nbsp;&nbsp;<span class="RMB">￥</span>{{Number(fare).toFixed(2)}}</p>
            </li>
            <li @click="toSubmitOrder()">去结算</li>
        </ul>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        findCart,
        updateCart,
        deleteCart,
        submitOrder,
        productHotList,
        addToCart
    } from "../../service/getData";

    export default {
        data() {
            return {
                selectAll: false,
                totalPrice: 0,
                goodsPrice: 0,
                payment: 0,
                fare: 0,
                carts: [],
                hotgoodslist: [],
                showMoveDot: [], //控制下落的小圆点显示隐藏
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                hasMore: false,
                proIds: []
            };
        },
        async beforeMount() {
        },
        props: ['showErrMsg'],
        mounted() {
            productHotList().then(res => {
                this.hotgoodslist = res.data.productList
                this.hasMore = res.data.totalPages > this.page
            })
            this.loadCarts();
        },
        created() {
            this.proIds = JSON.parse(
                sessionStorage.getItem(this.$route.query.rebuyKey)
            );
        },
        components: {
            footGuide
        },
        computed: {},
        methods: {
            loadCarts() {
                var that = this;
                findCart(1, 100).then(res => {
                    that.carts = res.data.cart;
                    that.carts.forEach(cart => {
                        cart.choose = true;
                        if (cart.cartListDtos)
                            cart.cartListDtos.forEach(cartList => {
                                cartList.choose = true;
                                if (that.proIds) {
                                    if (that.proIds.indexOf(cartList.productId) === -1) {
                                        cartList.choose = false;
                                    }
                                }
                                cartList.available = true;
                                if (cartList.stock - cartList.number < 0 || !cartList.isShow) {
                                    cartList.available = false;
                                }
                            })
                    });
                    that.reComputePrice();
                });
            },
            addToCart(product) {
                var that = this
                if (product.stock <= 0) {
                    that.showErrMsg('库存不足');
                    return;
                }
                let elLeft = event.target.getBoundingClientRect().left;
                let elBottom = event.target.getBoundingClientRect().bottom;
                that.showMoveDot.push(true);
                that.showMoveDotFun(that.showMoveDot, elLeft, elBottom);
                addToCart(product.id, 1).then(res => {
                    that.$parent.getCartNum();
                    that.loadCarts();
                })
            },
            showMoveDotFun(showMoveDot, elLeft, elBottom) { // 显示下落圆球
                this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
                this.elLeft = elLeft;
                this.elBottom = elBottom;
            },
            beforeEnter(el) {
                el.style.transform = `translate3d(${this.elLeft - 180}px,${this.elBottom - window.innerHeight}px,0px)`;
                el.style.opacity = 0;
            },
            afterEnter(el) {
                el.style.transform = `translate3d(0,0,0px)`;
                el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.style.opacity = 1;
            },
            checkCart(cart) {
                cart.choose = !cart.choose;
                if (cart.cartListDtos) {
                    cart.cartListDtos.forEach(c => {
                        c.choose = cart.choose;
                    })
                }
                this.reComputePrice();
            },

            checkSelectAll() {
                this.selectAll = !this.selectAll;
                this.carts.forEach(cart => {
                    if (cart.cartListDtos)
                        cart.cartListDtos.forEach(cartList => {
                            cartList.choose = this.selectAll;
                        })
                });
                this.reComputePrice();
            },
            /**
             * 重新计算购物车中商品价格
             */
            reComputePrice: function () {
                this.goodsPrice = 0;
                this.payment = 0;
                this.totalPrice = 0;
                this.fare = 0;
                this.carts.forEach(cart => {
                    let brandNum = 0;
                    let brandPrice = 0;

                    if (cart.cartListDtos && cart.cartListDtos.length > 0) {
                        cart.cartListDtos.forEach(cartItem => {
                            if (cartItem.choose && cartItem.available) {
                                let itemGoodsPrice = cartItem.presentPrice * cartItem.number;
                                this.goodsPrice += itemGoodsPrice;
                                this.payment += itemGoodsPrice;
                                brandNum += cartItem.number;
                                brandPrice += itemGoodsPrice;
                            }
                        })
                        if (brandNum > 0) {
                            if (cart.expressCost && cart.expressCost.freeExpress === 1 && brandPrice < cart.expressCost.freeExpressValue) { // 下单金额
                                this.fare += cart.expressCost.expressPrice;
                            }
                            if (cart.expressCost && cart.expressCost.freeExpress === 2 && brandNum < cart.expressCost.freeExpressValue) { // 下单金额
                                this.fare += cart.expressCost.expressPrice;
                            }
                        }
                    }
                });
                this.totalPrice = this.fare + this.payment;
            },

            /**
             * 到提交订单页面
             */
            toSubmitOrder() {
                if (!this.carts || this.carts.length <= 0) {
                    return;
                }
                let orderCar = [];
                this.carts.forEach(cartBrand => {
                    if (cartBrand.cartListDtos) {
                        let brandItems = [];
                        cartBrand.cartListDtos.forEach(cartItem => {
                            if (cartItem.choose && cartItem.available) {
                                brandItems.push(cartItem);
                            }
                        })
                        if (brandItems.length > 0) {
                            orderCar.push({
                                brandId: cartBrand.brandId,
                                brandName: cartBrand.brandName,
                                expressCost: cartBrand.expressCost,
                                cartListDtos: brandItems
                            })
                        }
                    }
                })
                if (orderCar.length <= 0) {
                    return;
                }

                let currentTime = new Date().getTime();
                sessionStorage.setItem(
                    "products_" + currentTime,
                    JSON.stringify(orderCar)
                );
                this.$router.push("/confirmOrder?cartsKey=products_" + currentTime);
            },

            /**
             * 添加或删除购物车商品数量
             */
            addNumber(cart, number) {
                if (number < 0 && !cart.isShow) {
                    this.deleteCart(cart);
                    return;
                }
                updateCart(cart.cartId, number).then(res => {
                    if (res.errno == 0) {
                        cart.number = cart.number + number;

                        if (cart.stock - cart.number < 0 || !cart.isShow) {
                            cart.available = false;
                        } else {
                            cart.available = true;
                        }
                        this.reComputePrice();
                        this.$parent.getCartNum();
                    }
                });
            },

            /**
             * 删除购物车
             */
            deleteCart(cartItem) {
                deleteCart(cartItem.cartId).then(res => {
                    if (res.errno === 0) {
                        let needDeleteBrandCart = null;
                        this.carts.forEach(brandCart => {
                            if (cartItem.brandId === brandCart.brandId) {
                                brandCart.cartListDtos.splice(brandCart.cartListDtos.indexOf(cartItem), 1);
                                if (brandCart.cartListDtos.length === 0) {
                                    needDeleteBrandCart = brandCart;
                                }
                            }
                        })

                        if (needDeleteBrandCart) {
                            this.carts.splice(this.carts.indexOf(needDeleteBrandCart), 1);
                        }

                        this.reComputePrice();
                        this.$parent.getCartNum();
                    }
                });
            }
        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";

    .move_dot {
        position: fixed;
        bottom: .3rem;
        left: 52.7%;
        background: $red;
        display: block;
        border-radius: 50%;
        @include wh(.15rem, .15rem);
        z-index: 99999;
    }

    .recommend_nav {
        background-color: $fc;
        padding-bottom: 1.65rem;
        .recommend_header {
            padding-left: 0.16rem;
            border-left: 7px solid $red;
            line-height: 0.45rem;
            border-bottom: 1px solid #f7f7fa;
            border-top: 1px solid #f7f7fa;
            @include wh(100%, 0.45rem);
            @include sc(0.15rem, $g6);
        }
        .recommend_list {
            overflow: hidden;
            background-color: $fc;
            padding: 0.25rem 0.15rem 0;
            li:nth-child(odd) {
                float: left;
            }
            li:nth-child(even) {
                float: right;
            }
            li {
                @include wh(47.5%, 2.35rem);
                .img {
                    @include wh(100%, 1.65rem);
                    display: block;
                    border-radius: 5px;
                    margin-bottom: 0.02rem;
                }
                .left {
                    width: 80%;
                }
                .name {
                    @include sc(0.15rem, $g3);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .price {
                    @include sc(0.18rem, $red);
                    font-weight: bold;
                    s {
                        @include sc(0.12rem, $g9);
                        font-weight: normal;
                    }
                }
                .add_cart, .shopping_cart_disabled {
                    @include wh(0.315rem, 0.315rem);
                    @include bis("../../images/shopping_cart.png");
                    margin-top: 0.08rem;
                }
                .shopping_cart_disabled {
                    @include bis('../../images/shopping_cart_disabled.png');
                }
            }
        }
        .load_more {
            @include wh(35%, 0.28rem);
            @include sc(0.14rem, $red);
            background-color: $fc;
            margin: 0rem auto;
            text-align: center;
            line-height: 0.28rem;
            border-radius: 15px;
            border: 1px solid $red;
            display: block;
        }
    }

    .shop_list_container {
        background-color: $fc;
        .no_list {
            padding: 0.5rem 0;
            text-align: center;
            p {
                @include sc(0.12rem, $g6);
                margin: 0.15rem 0 0;
            }
        }
        .swiper-container {
            padding-bottom: 0.15rem;
            background-color: $bc;
            .topBG {
                @include wh(100%, 0.83rem);
                @include bis("../../images/gwc-bg.png");
            }
            .shop_info {
                margin: -0.48rem auto 0;
                width: 95%;
                background-color: $fc;
                padding: 0 0.15rem 0.2rem;
                border-radius: 10px;
                overflow: hidden;
                .lists {
                    // border-bottom: .36rem solid $f7;
                    .title {
                        padding: .25rem 0;
                        display: flex;
                        align-items: center;
                        span:last-child {
                            @include sc(.16rem, $g3);
                            font-weight: 500;
                            padding-left: .1rem;
                        }
                    }
                    .unselected {
                        border-radius: 50%;
                        display: inline-block;
                        border: 1.5px solid $g9;
                        @include wh(0.19rem, 0.19rem);
                    }
                    .choose {
                        @include bis("../../images/selected.png");
                        display: inline-block;
                        @include wh(0.19rem, 0.19rem);
                    }
                }
                .goods {
                    overflow: hidden;
                    .left {
                        li {
                            height: 1.25rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                    .right {
                        width: 90%;
                        box-shadow: 0rem 0rem .1rem .02rem $bc;
                        border-radius: .05rem;
                        margin: .05rem;
                        padding: .0rem .1rem 0;
                        li {
                            position: relative;
                            padding: .15rem .0rem;
                            overflow: hidden;
                        }
                    }
                    .img {
                        float: left;
                        border-radius: .05rem;
                        @include wh(0.95rem, 0.945rem);
                        vertical-align: middle;
                        margin-left: 0.05rem;
                    }
                    .goods_info {
                        float: left;
                        width: 60%;
                        margin-left: .08rem;
                        .name {
                            @include sc(0.15rem, $g3);
                            height: .45rem;
                            margin-bottom: .27rem;
                            @include line-ellipsis(2);
                        }
                        .price {
                            @include sc(0.18rem, $red);
                            font-weight: bold;
                        }
                    }
                    .cart_btns {
                        position: absolute;
                        right: 0rem;
                        top: 0.88rem;
                        display: flex;
                        .subduction,
                        .num,
                        .add {
                            @include wh(0.23rem, 0.23rem);
                            display: inline-flex;
                            flex: 1;
                            align-items: center;
                            justify-content: center;
                        }
                        .num {
                            @include sc(0.18rem, $red);
                            vertical-align: top;
                            margin: 0 0.1rem;
                        }
                        .subduction {
                            @include bis("../../images/sub-icon.png");
                        }
                        .subduction.disabled {
                            @include bis("../../images/sub-disable-icon.png");
                        }
                        .add {
                            @include bis("../../images/add-icon.png");
                        }
                    }
                }
                .payment_info {
                    overflow: hidden;
                    padding: 0.2rem 0 .15rem;
                    border-bottom: 1px solid $gd;
                    li {
                        @include wh(100%, 0.35rem);
                        line-height: 0.35rem;
                        display: flex;
                        p {
                            @include sc(0.15rem, $g6);
                        }
                        p:nth-child(odd) {
                            float: left;
                        }
                        p:nth-child(even) {
                            flex: 4;
                            text-align: right;
                        }
                        p.coupon {
                            color: $g9;
                        }
                    }
                }
                .totalPrice {
                    margin-top: 0.12rem;
                    p {
                        display: inline-block;
                        @include sc(0.2rem, $g3);
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .settlement {
        position: fixed;
        bottom: 0.49rem;
        line-height: 0.675rem;
        background-color: $fc;
        border-top: solid 0.5px $bc;
        @include wh(100%, 0.675rem);
        overflow: hidden;
        li {
            float: left;
            text-align: center;
        }
        li:nth-child(1) {
            width: 34.33%;
            text-align: left;
            padding-left: 0.2rem;
            color: $g6;
        }
        li:nth-child(2) {
            text-align: left;
            line-height: 1;
            padding-top: 0.05rem;
            width: 38.3333%;
            .red {
                @include sc(0.18rem, $red);
                font-weight: 600;
            }
            p {
                line-height: 1.5;
                @include sc(0.15rem, $g6);
            }
        }
        li:nth-child(3) {
            width: 27.33%;
            @include sc(0.15rem, $fc);
            background-color: $red;
        }
        .unselected,
        .selectAll {
            display: inline-block;
            @include wh(0.19rem, 0.19rem);
            vertical-align: text-bottom;
            margin-right: 5px;
        }
        .unselected {
            border: 1.5px solid $g9;
            border-radius: 50%;
        }
        .selectAll {
            @include bis("../../images/selected.png");
        }
    }
</style>

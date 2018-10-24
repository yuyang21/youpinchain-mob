<template>
    <div class="mescroll" ref="mescroll">
        <div>
            <section id="hot_goods">
                <ul class="goodslistul clear">
                    <li v-for="item in goOn" :key="item.id">
                        <router-link tag="div" :to="'/groupDet/' + item.id">
                            <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                            <div class="left goods_info">
                                <p class="name">{{item.suitName}}</p>
                                <p class="desr">{{item.describe}}</p>
                                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                                <p class="price"><span class="RMB">￥</span>{{item.suitPrice}} <s>￥{{item.originalPrice}}</s></p>
                            </div>
                        </router-link>
                        <div class="shopping_cart" @touchstart="addToGroup(item.id, $event)"><p>立即拼团</p></div>
                    </li>
                </ul>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item"></span>
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        findCart,
        updateCart,
        deleteCart,
        addToCart,
        groupList
    } from "../../../service/getData";

    export default {
        data() {
            return {
                selectAll: false,
                totalPrice: 0,
                goodsPrice: 0,
                payment: 0,
                fare: 0,
                carts: [],
                goOn: [],
                showMoveDot: [], //控制下落的小圆点显示隐藏
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                hasMore: false,
                proIds:[]
            };
        },
        async beforeMount() {},
        mounted() {
            groupList().then(res => {
                this.goOn = res.data.goOn
                //this.hasMore = res.data.totalPages > this.page
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
            loadCarts () {
                findCart(1, 100).then(res => {
                    this.carts = res.data.cart;
                    this.carts.forEach(cart => {
                        cart.choose = true;
                        if(this.proIds){
                            if(this.proIds.indexOf(cart.productId) == -1){
                                cart.choose = false;
                            }
                        }
                        cart.available = true;
                        if (cart.stock - cart.number < 0 || !cart.isShow){
                            cart.available = false;
                        }
                    });
                    this.reComputePrice();
                });
            },
            addToGroup (suitId) {
                var that = this
                let elLeft = event.target.getBoundingClientRect().left;
                let elBottom = event.target.getBoundingClientRect().bottom;
                that.showMoveDot.push(true);
                that.showMoveDotFun(that.showMoveDot, elLeft, elBottom);
                addToCart(productId, 1).then(res => {
                    that.$parent.getCartNum();
                    that.loadCarts();
                })
            },
            showMoveDotFun (showMoveDot, elLeft, elBottom) { // 显示下落圆球
                this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
                this.elLeft = elLeft;
                this.elBottom = elBottom;
            },
            beforeEnter(el){
                el.style.transform = `translate3d(${this.elLeft - 180}px,${this.elBottom - window.innerHeight}px,0px)`;
                el.style.opacity = 0;
            },
            afterEnter(el){
                el.style.transform = `translate3d(0,0,0px)`;
                el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.style.opacity = 1;
            }
        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
    @import '../../../static/mescroll/mescroll.min.css';
    @import '../../../style/mixin';
    .header_image {
        height: 4.2rem;
    }

    .move_dot {
        position: fixed;
        bottom: .32rem;
        left: 52.7%;
        background: $red;
        display: block;
        border-radius: 50%;
        @include wh(.15rem, .15rem);
    }
    .home {
        padding-bottom: .5rem;
    }

    .product_nav {
        overflow: hidden;
        clear: both;
        text-align: center;
        background-color: $fc;
        @include wh(100%, .575rem);
        line-height: .575rem;
        li {
            float: left;
            @include wh(33.333%, .575rem);
            @include sc(.15rem, $g6);
        }
        li.active {
            background-color: $red;
            color: $fc;
        }
    }

    #hot_goods {
        background-color: $fc; // margin-top: .15rem;
        padding: .2rem 0 0;
        .goods_title {
            text-align: center;
            margin: 0 auto;
            display: block;
            line-height: .41rem;
            text-shadow: 0px 1px 5px rgba(118, 176, 252, 0.67);
            @include wh(42%, .41rem);
            @include sc(.15rem, $fc);
            @include bis('../../../images/home-bg-rmsp-normol.png');
        }
        .goodslistul {
            padding: .25rem .15rem 0rem;
            img {
                margin-right: .12rem;
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
                width: 55%;
                .name {
                    @include sc(.15rem, $g3);
                    padding: .05rem 0 .03rem;
                }
                .desr {
                    @include sc(.12rem, $g6);
                    height: .75rem;
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
                bottom: .15rem;
                @include wh(.655rem, .215rem);
                background: #dd3333;
                p {
                    line-height: 1.5;
                    @include sc(0.15rem, $fc);
                }
            }
        }
    }
</style>

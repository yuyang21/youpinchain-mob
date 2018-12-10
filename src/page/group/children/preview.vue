<template>
    <div class="mescroll" ref="mescroll">
        <div>
            <section id="hot_goods">
                <ul class="goodslistul clear">
                    <li v-for="item in preview" :key="item.id">
                        <router-link tag="div" :to="'/groupDet/' + item.id">
                            <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                            <div class="left goods_info">
                                <p class="name">{{item.suitName}}</p>
                                <p class="desr">{{item.describe}}</p>
                                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                                <p class="price"><span class="RMB">￥</span>{{item.minimumPrice}}
                                    <s>￥{{item.suitPrice}}</s></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter"
                            v-for="(item,index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item"></span>
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        groupList
    } from "../../../service/getData";

    export default {
        data() {
            return {
                showMoveDot: [], //控制下落的小圆点显示隐藏
                preview: [],
                hasMore: false,
            };
        },
        async beforeMount() {
        },
        mounted() {
            groupList().then(res => {
                this.preview = res.data.preview
                //this.hasMore = res.data.totalPages > this.page
            })
        },
        created() {

        },
        components: {},
        computed: {},
        methods: {}
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

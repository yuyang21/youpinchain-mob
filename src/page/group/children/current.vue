<template>
    <div>
        <div class="mescroll" ref="mescroll">
            <swipe ref="swipe" :speed="1000" :loop="true" :autoplayTime="2000" class="header_image">
                <swipe-item v-for="item in brand" :key="item.id">
                    <!-- <router-link tag="div" :to="{path:'/introduce/'+ item.id}"> -->
                    <div>
                        <img :src="item.pictureUrl" alt="" width="100%" class="show">
                    </div>
                    <!-- </router-link> -->
                </swipe-item>
            </swipe>
            <section id="hot_goods">
                <ul class="goodslistul clear">
                    <router-link tag="li" :to="'/groupDet/' + item.id" class="overflow-hi" v-for="item in goOn" :key="item.id">
                        <!-- <div class="left position-re">
                            <p class="count_down" v-if="item.endTimeDown > 24*60*60">距结束 <span>{{Math.floor(item.endTimeDown/60/60/24)}}天{{item.endTimeDown - Math.floor(item.endTimeDown/60/60/24)*24*60*60 | timeArry(0)}}时{{item.endTimeDown | timeArry(1)}}分</span></p>
                            <p class="count_down" v-else>距结束 <span>{{item.endTimeDown | timeArry(0)}}时{{item.endTimeDown | timeArry(1)}}分{{item.endTimeDown | timeArry(2)}}秒</span></p>
                        </div> -->
                        <img :src="item.normalPic" alt="" class="image" :class="{'noImage': !item.normalPic}">
                        <div class="goods_info">
                            <p class="name ellipsis">{{item.suitName}}</p>
                            <p class="desr ellipsis">{{item.describe}}</p>
                            <!-- <p class="tip"><span>固定地址享受超高优惠</span></p> -->
                            <div class="left">
                                <p class="price"><span class="lable">3人成团</span><span class="RMB">￥</span>{{item.minimumPrice}}</p>
                                <!-- <p class="single_price">单买价<span>￥</span>{{item.suitPrice}}</p> -->
                            </div>
                            <div class="right shopping_cart"><p>立即拼团</p></div>
                        </div>
                    </router-link>
                </ul>
            </section>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        findCart,
        groupList,
        systemTime,
        homeIndex
    } from "../../../service/getData";
    import {
        countDown
    } from "src/config/mUtils";
    import MeScroll from '../../../static/mescroll/mescroll.min.js'
    export default {
        data() {
            return {
                goOn: [],
                timer: null,
                mescroll: null,
                systemTime: null,
                brand: {}
            };
        },
        watch: {},
        async beforeMount() {},
        mounted() {
            var that = this
            that.mescroll = new MeScroll(that.$refs.mescroll, {
                down: {
                    use: false,
                },
                up: {
                    callback: that.upCallback,
                    page: {
                        num: 0,
                        size: 10,
                    }
                }
            });
            that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
            //获取商品列表
            homeIndex().then(res => {
                that.brand = res.data.brand
            })
        },
        created() {
            systemTime().then((res) => {
                this.systemTime = res.data
            })
        },
        computed: {},
        methods: {
            upCallback (page) {
                groupList(page.num, page.size).then(res => {
                    this.showLoading = false;
                    let arr = res.data.goOn;
                    if (page.num === 1) this.goOn = [];
                    var that = this;
                    arr.forEach((t, index) => {
                        arr[index].endTimeDown = (new Date(t.endTime).getTime() / 1000) - that.systemTime;
                    })
                    setTimeout(function () {
                        that.goOn = that.goOn.concat(arr);
                        that.goOn.forEach((t, index) => {
                            countDown(t.endTimeDown, time => {
                                that.goOn[index].endTimeDown = time
                            })
                        })
                        that.$nextTick(() => {
                            that.mescroll.endSuccess(arr.length, page.num < res.data.totalPages);
                        })
                    },300)

                }).catch((e)=> {
                    this.mescroll.endErr();
                })
            }
        },
        components: {
            footGuide
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../../static/swipe/swipe.min.css';
    @import '../../../static/mescroll/mescroll.min.css';
    @import '../../../style/mixin';
    #hot_goods {
        background-color: $fc;
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
            .count_down {
                @include wh(100%, .22rem);
                @include sc(.14rem, $fc);
                line-height: .22rem;
                position: absolute;
                top: 0;
                background-color: #E42826;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                text-align: left;
                span {
                    @include sc(.14rem, $fc);
                    display: inline-block;
                    float: right;
                    text-align: left;
                }
            }
            li {
                width: 100%;
                clear: both;
                overflow: hidden;
                margin-bottom: .15rem;
                position: relative;
                border-bottom: 1px solid #f8f8f8;
                padding-bottom: .15rem;
                // .left.position-re {
                    // @include wh(1.4rem,1.4rem);
                    .image {
                        margin-right: .12rem;
                        width: 100%;
                        height: 1.75rem;
                        border-radius: 5px;
                        background-color: #F8DCE8;
                        // border: .03rem solid $red;
                        box-sizing: border-box;
                    }
                    img.noImage {
                        background-color: #000;
                    }
                // }
            }
            li:last-child {
                margin-bottom: 0;
            }
            .goods_info {
                width: 100%;
                .name {
                    @include sc(.15rem, $g3);
                    padding: .03rem 0;
                }
                .desr {
                    @include sc(.12rem, $g6);
                }
                .tip {
                    @include wh(1.7rem, .28rem);
                    @include sc(.2rem, #FB9D1C);
                    display: flex;
                    align-items:center;
                    justify-content:center;
                    border: .02rem solid #FFBA00;
                    border-radius: .14rem;
                    // margin: 0.04rem 0 .12rem;
                    transform: scale(.55) translateX(-.72rem);
                }
                .left {
                    width: 75%;
                    .price {
                        // margin-top: .6rem;
                        @include sc(.18rem, $red);
                        font-weight: bold;
                        s {
                            @include sc(.12rem, $g9);
                            font-weight: normal;
                        }
                        .RMB {
                            margin-left: -.3rem;
                        }
                    }
                    .lable {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        @include wh(.75rem, .3rem);
                        @include sc(.18rem, #E42826);
                        border: .02rem solid rgba(228,40,38,1);
                        border-radius: .025rem;
                        transform: scale(.55) translateX(-.3rem);
                    }
                    .single_price {
                        @include sc(.12rem, $g9);
                        span {
                            font-size: .12rem;
                            transform: scale(0.85) translateY(.01rem);
                            display: inline-block;
                        }
                    }
                }
            }
            .shopping_cart {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: .025rem;
                @include wh(.675rem, .275rem);
                background: #E42826;
                p {
                    line-height: 1.5;
                    @include sc(0.13rem, $fc);
                    text-align: center;
                }
            }
        }
    }
    .header_image {
        min-height: 4.15rem;
    }
</style>

<template>
    <div class="mescroll" ref="mescroll">
        <section id="hot_goods">
            <ul class="goodslistul clear">
                <router-link tag="li" :to="'/groupDet/' + item.id" class="overflow-hi" v-for="item in goOn" :key="item.id">
                    <div class="left position-re">
                        <p class="count_down">距结束 <span>{{endTimeDown | timeArry(0)}}:{{endTimeDown | timeArry(1)}}:{{endTimeDown | timeArry(2)}}</span></p>
                        <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                    </div>
                    <div class="left goods_info">
                        <p class="name">{{item.suitName}}</p>
                        <p class="desr">{{item.describe}}</p>
                        <p class="tip"><span>固定地址享受超高优惠</span></p>
                        <p class="price"><span class="RMB">￥</span>{{item.suitPrice}} <span class="lable">3人成团</span></p>
                        <p class="single_price">单买价￥{{item.originalPrice}}</p>
                    </div>
                    <div class="shopping_cart"><p>立即拼团</p></div>
                </router-link>
            </ul>
        </section>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        findCart,
        groupList
    } from "../../../service/getData";

    export default {
        data() {
            return {
                goOn: [],
                timer: null,
                endTimeDown: 9100
            };
        },
        watch: {},
        async beforeMount() {},
        mounted() {
            this.computeNumber()
            this.getGroupList()
        },
        created() {
        },
        computed: {},
        methods: {
            getGroupList () {
                groupList(1, 10).then(res => {
                    this.goOn = res.data.goOn
                })
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
        },
        components: {
            footGuide
        }
    };
</script>

<style lang="scss" scoped>
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
                padding: 0 .1rem;
                span {
                    @include sc(.14rem, $fc);
                    display: inline-block;
                    float: right;
                    width: 43%;
                    text-align: left;
                    margin-left: .12rem;
                }
            }
            li {
                width: 100%;
                clear: both;
                overflow: hidden;
                margin-bottom: .12rem;
                position: relative;
                border-bottom: 1px solid #f8f8f8;
                padding-bottom: .15rem;
                .left.position-re {
                    @include wh(1.4rem,1.4rem);
                    img {
                        margin-right: .12rem;
                        width: 100%;
                        border-radius: 5px;
                        background-color: #F8DCE8;
                    }
                    img.noImage {
                        background-color: #000;
                    }
                }
            }
            li:last-child {
                margin-bottom: 0;
            }
            .goods_info {
                width: 55%;
                padding-left: .08rem;
                .name {
                    @include sc(.15rem, $g3);
                    padding: .05rem 0 .03rem;
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
                .price {
                    // margin-top: .6rem;
                    @include sc(.18rem, $red);
                    font-weight: bold;
                    s {
                        @include sc(.12rem, $g9);
                        font-weight: normal;
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
                    transform: scale(.5) translateX(-.35rem);
                }
                .single_price {
                    @include sc(.12rem, $g9);
                }
            }
            .shopping_cart {
                position: absolute;
                right: 0;
                bottom: .29rem;
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
</style>

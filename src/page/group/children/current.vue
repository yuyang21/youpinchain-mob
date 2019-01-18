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
                                <p class="price"><span class="lable">拼团更划算</span><span class="RMB">￥</span>{{item.minimumPrice}}</p>
                                <!-- <p class="single_price">单买价<span>￥</span>{{item.suitPrice}}</p> -->
                            </div>
                            <div class="right shopping_cart"><p>抢购</p></div>
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
    @import '../../../style/current';
</style>

<template>
    <div class="unpaid">
        <ul class="order_list_ul">
            <div v-if="orderList.length <= 0" class="no_list">暂无订单记录</div>
            <li v-else class="order_list_li" v-for="item in orderList" :key="item.id">
                <section class="order_item_top">
                    <section>
                        <header class="order_item_top_header">
                            <p class="order_time">{{item.addTime | timeformat}}</p>
                            <p class="order_status">
                                <template v-if="item.groupMyType == 2">(拼团成功)</template>
                                <template v-if="item.groupMyType == 3">(拼团失败)</template>
                                {{item.orderStatusText}}
                            </p>
                        </header>
                        <router-link :to="{path:'/orderDetail/' + item.id}" tag="div">
                            <section class="goods_img">
                                <div class="goods_box">
                                    <img class="restaurant_image" v-for="(goods,index) in item.productList"
                                         :src="goods.pictureUrl" v-if="index < 4" :key="index">
                                    <!-- <p class="" v-if="item.productList.length == 1">{{item.productList[0].productName}}</p> -->
                                </div>
                                <p>共{{item.productList.length}}件</p>
                                <svg fill="#bbb" style="width: 0.15rem;margin-left: 0rem;height: .64rem;">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </section>
                        </router-link>
                    </section>
                    <div class="order_item_bottom">
                        <span class="order_text">实际支付<b class="red"><span class="RMB">￥</span><strong
                                class="order_price_size">{{item.actualPrice}}</strong></b></span>
                        <div class="order_button_border_grey" @click="showAlertTip = !showAlertTip">联系客服</div>
                        <div class="order_again">
                            <compute-time v-if="item.handleOption.pay" :time="item.expiryTime"></compute-time>
                            <!--<span class="order_button_border_red" @click="cancelOrder(item.id)" v-if="item.handleOption.cancel">取消订单</span>-->
                            <router-link :to="{path:'/orderTrack/'+item.expNo + '/' + item.expCode}" tag="span"
                                         class="order_button_border_red"
                                         v-if="item.handleOption.confirm">查看物流
                            </router-link>
                            <span class="order_button_border_red" @click="confirmOrder(item.id)"
                                  v-if="item.handleOption.confirm">确认收货</span>
                            <span class="order_button_border_red" @click="rebuy(item.id)"
                                  v-if="item.handleOption.rebuy">再次购买</span>
                        </div>
                    </div>
                </section>
            </li>
        </ul>
        <alert-tip :showAlertTip="showAlertTip" :type="2" v-show="showAlertTip"
                   :alertText="`<p>请添加客服微信 <br> Lsyp-123</p>`"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import computeTime from 'src/components/common/computeTime'
    import loading from 'src/components/common/loading'
    import {loadMore} from 'src/components/common/mixin'
    import alertTip from 'src/components/common/alertTip'
    import {getOrderList, cancelOrder, confirmOrder, rebuy} from "../../../service/getData";
    import MeScroll from '../../../static/mescroll/mescroll.min.js'

    export default {
        data() {
            return {
                showAlertTip: false,
                status_title: ['待支付', '待发货', '已发货', '已完成', '已取消'],
                showLoading: true, //显示加载动画
                orderList: [],
                mescroll: null
            }
        },
        props: ['sendData', 'showErrMsg'],
        mounted() {
            this.list()
        },
        created() {
        },
        mixins: [loadMore],
        components: {
            loading,
            computeTime,
            alertTip
        },
        computed: {},
        methods: {
            list() {
                var that = this
                that.mescroll = new MeScroll(that.$refs.mescroll, {
                    down: {
                        use: true,
                    },
                    up: {
                        callback: that.upCallback,
                        page: {
                            num: 0,
                            size: 4,
                        }
                    }
                });

                // 列表没有数据时，不存在
                if (that.$refs.mescroll) {
                    that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
                }
            },
            // 取消订单
            cancelOrder(orderId) {
                cancelOrder(orderId).then(res => {
                    if (res.errno !== 0) {
                        this.$parent.showErrMsg("失败");
                        return;
                    }
                    this.$parent.showErrMsg("成功");
                    this.list();
                })
            },
            // 确认收货
            confirmOrder(orderId) {
                confirmOrder(orderId).then(res => {
                    if (res.errno !== 0) {
                        this.$parent.showErrMsg("失败");
                        return;
                    }
                    this.$parent.showErrMsg("成功");
                    this.list();
                })
            },
            rebuy(orderId) {
                rebuy(orderId).then(res => {
                    console.info(res)
                    if (res.errno !== 0) {
                        this.$parent.showErrMsg("失败");
                        return;
                    }
                    var arr = [];
                    for (var i = 0; i < sessionStorage.length; i++) {
                        if (sessionStorage.key(i).substring(0, 7) == "proIds_") {
                            arr.push(sessionStorage.key(i));
                        }
                    }

                    for (var i = 0; i < arr.length; i++) {
                        sessionStorage.removeItem(arr[i]);
                    }

                    let currentTime = new Date().getTime();
                    sessionStorage.setItem(
                        "proIds_" + currentTime,
                        JSON.stringify(res.data)
                    );
                    this.$router.push("/cart?rebuyKey=proIds_" + currentTime);
                })
            },
            upCallback(page) {
                getOrderList(page.num, page.size, 401).then(res => {
                    this.showLoading = false;
                    let arr = res.data.orderVoList;
                    if (page.num == 1) this.orderList = [];
                    var that = this
                    setTimeout(function () {
                        that.orderList = that.orderList.concat(arr);
                        that.$nextTick(() => {
                            that.mescroll.endSuccess(arr.length);
                        })
                    }, 300)
                }).catch((e) => {
                    this.mescroll.endErr();
                })
            }
        },
        watch: {}
    }
</script>


<style lang="scss" scoped>
    @import '../../../static/mescroll/mescroll.min.css';
    @import '../../../style/order';
</style>

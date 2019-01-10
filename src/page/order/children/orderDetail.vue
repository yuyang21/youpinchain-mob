 <template>
  <div class="order_detail_page">
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
                <div class="page-top-red"></div>
                <section class="order_titel border_radius" @click="goTrack">
                    <div class="status-img" :class="'status_0'"></div>
                    <div>{{orderData.orderStatusText}}</div>
                    <svg fill="#333" class="arrow_right" v-show="orderData.handleOption.confirm">
                        <!--v-show="orderData.handleOption.confirm"-->
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </section>
                <section class="distribution-information border_radius" v-if="orderData.handleOption.confirm">
                    <img src="../../../images/ddxq-ps.png" alt="">
                    <div>
                        <!--<p>配送员：{{orderData.expCode}}</p>-->
                        <!--<p>联系电话：{{orderData.expNo}}</p>-->
                        <p>{{exp.context}}</p>
                    </div>
                </section>
                <section class="address border_radius">
                    <div class="address-detail">
                        <p>{{orderData.address}}</p>
                        <p><span>{{orderData.consignee}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{orderData.mobile}}</span></p>
                    </div>
                </section>
                <section class="food_list border_radius">
                    <div class="food_list_header">
                        <div class="shop_name">
                            <span>商品清单</span>
                        </div>
                        <span class="food_number">共{{orderProduct.length}}件</span>
                    </div>
                    <ul class="goods">
                        <li v-for="item in orderProduct" :key="item.id">
                            <img :src="item.picUrl" alt="" class="img">
                            <div class="goods_info">
                                <p class="name">{{item.productName}}</p>
                                <p class="price"><span>￥</span>{{item.retailPrice}}</p>
                            </div>
                            <div class="cart_btns">
                                <span class="num">x{{item.number}}</span>
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="order_detail_style border_radius">
                    <header>订单价格</header>
                    <section class="item_style">
                        <p class="item_left">商品总价</p>
                        <div class="item_right">
                            <p>￥{{orderData.productPrice}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">优惠价格</p>
                        <div class="item_right">
                            <p>-￥0</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">运费</p>
                        <div class="item_right">
                            <p>+￥{{orderData.freightPrice}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">包装费</p>
                        <div class="item_right">
                            <p>+￥0</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">包装费减免</p>
                        <div class="item_right">
                            <p>-￥0</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">实际支付</p>
                        <div class="item_right">
                            <p>￥{{orderData.actualPrice}}</p>
                        </div>
                    </section>
                </section>
                <section class="order_detail_style border_radius">
                    <header>订单信息</header>
                    <section class="item_style">
                        <p class="item_left">订单编号</p>
                        <div class="item_right">
                            <p>{{orderData.orderSn}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">支付方式</p>
                        <div class="item_right">
                            <p>在线支付</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">下单时间</p>
                        <div class="item_right">
                            <p>{{orderData.addTime | timeformat}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">预计送达时间</p>
                        <div class="item_right">
                            <p>--</p>
                        </div>
                    </section>
                </section>
                <section class="sale_after">
                    <span class="red" @click="showAlertTip = !showAlertTip">联系客服</span>
                    <compute-time v-if="orderData.handleOption.pay" :time="orderData.expiryTime" @click.native="toPay(orderData.id)"></compute-time>
                    <span class="grey" @click="cancelOrder(orderData.id)" v-if="orderData.handleOption.cancel">取消订单</span>
                    <router-link :to="{path:'/orderTrack/' + orderData.expNo + '/' + orderData.expCode}" tag="span" class="grey"
                                 v-if="orderData.handleOption.confirm" >查看物流</router-link>
                    <span class="grey" @click="confirmOrder(orderData.id)" v-if="orderData.handleOption.confirm">确认收货</span>
                    <!--<router-link tag="span" to="/home" class="order_button_red" v-if="orderData.handleOption.rebuy" >再次购买</router-link>-->
                </section>
            </section>
        </section>
        <alert-tip :showAlertTip="showAlertTip" :type="2" v-show="showAlertTip" :alertText="`<p>请添加客服微信 <br> Lsyp-123</p>`"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import footGuide from 'src/components/footer/footGuide'
    import alertTip from 'src/components/common/alertTip'
    import {getOrderDetail,cancelOrder,confirmOrder,prepayOrder,expresses} from "../../../service/getData";

    export default {

      data(){
            return{
                orderId:"",
                showLoading: true, //显示加载动画
                showAlertTip: false,
                status_text:[{
                    title: '未发货',
                    text: '您的订单还未发货～'
                },{
                    title: '已发货',
                    text: '您的订单已经发货啦～'
                },{
                    title: '配送中',
                    text: '您的订单正在配送中～'
                },{
                    title: '已完成',
                    text: '您的订单已完成～'
                },{
                    title: '待支付',
                    text: '您的订单待支付～'
                }],
                orderData:{},
                orderProduct:{},
                exp:{}
            }
        },
        props: ['showErrMsg'],
        created () {
            this.orderId = this.$route.params.orderId
        },
        mounted(){
            getOrderDetail(this.orderId).then(res => {
                if (res.errno !== 0){
                    return;
                }
                this.orderData = res.data.orderInfo;
                this.orderProduct = res.data.orderProduct;
                this.showLoading = false;

                //TODO 测试使用单号
                if(!this.orderData.expNo){
                    this.orderData.expNo="821721174311"
                }
                if (this.orderData.handleOption.confirm && this.orderData.expNo){
                    expresses(this.orderData.expCode, this.orderData.expNo).then(res => {
                        if (res.errno !== 0){
                            return;
                        }
                        var trackData = JSON.parse(
                            res.data
                        );
                        if (trackData.message === "ok"){
                            this.exp = trackData.data[0]
                        }
                    })
                }
            })
        },
        components: {
            loading, footGuide, alertTip
        },
        computed: {
        },
        methods: {
            goTrack () {
                if (!this.orderData.handleOption.confirm) {
                    return
                }
                this.$router.push({path:'/orderTrack/' + this.orderData.expNo + '/' + this.orderData.expCode})
            },
            // 取消订单
            cancelOrder(orderId){
                var that = this;
                cancelOrder(orderId).then(res =>{
                    if(res.errno !== 0) {
                        that.showErrMsg("失败");
                        return;
                    }
                    that.$router.push('/order/undelivery');
                })
            },
            // 确认收货
            confirmOrder(orderId){
                var that = this;
                confirmOrder(orderId).then(res =>{
                    if(res.errno !== 0) {
                        that.showErrMsg("失败");
                        return;
                    }
                    that.$router.push('/order/completed');
                })
            },
            toPay(orderId) {
                var that = this;
                prepayOrder(orderId).then(resp => {
                    if (resp.errno === 403) {
                        that.showErrMsg(resp.errmsg)
                    } else {
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": resp.data.appId, //公众号名称，由商户传入
                                "timeStamp": resp.data.timeStamp, //时间戳，自1970年以来的秒数
                                "nonceStr": resp.data.nonceStr, //随机串
                                "package": resp.data.packageValue,
                                "signType": resp.data.signType, //微信签名方式：
                                "paySign": resp.data.paySign //微信签名
                            },
                            function (res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    that.$router.push('/order/undelivery');
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/orderDetail';
</style>

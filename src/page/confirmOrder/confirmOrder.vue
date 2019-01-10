<template>
    <div class="confirmOrderContainer header-top">
        <head-top head-title="订单确认" go-back='true'></head-top>
        <nav class="shop_list_container">
            <div class="swiper-container" v-if="productList.length">
                <div class="topBG" v-if="choosedAddress"></div>
                <div class="address">
                    <div class="no_address" v-if="!choosedAddress">
                        <section class="adddetail">
                            <form action="" v-on:submit.prevent>
                                <section class="ui-padding-block">
                                    <div class="input-new">
                                        <span>姓名</span>
                                        <input type="text" placeholder="请填写收件人姓名" v-model="address.name">
                                    </div>
                                    <div class="add-detail">
                                        <div class="input-new">
                                            <span>联系电话</span>
                                            <input type="tel" maxlength="11" placeholder="请填写收货人手机号"
                                                   v-model="address.mobile"
                                                   v-on:input="address.mobile = address.mobile.replace(/\D/g, '')"/>
                                        </div>
                                    </div>
                                    <div class="input-new">
                                        <span>所在地区</span>
                                        <input type="text" id="address-input" readonly="readonly" style="width:2.5rem;"
                                               placeholder="请选择" v-model="address.tipText"/>
                                        <svg fill="#bbb" style="width: 0.18rem;margin: 0 0.05rem 0 0.1rem;">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                 xlink:href="#arrow-right"></use>
                                        </svg>
                                    </div>
                                    <div class="input-new">
                                        <span>地址</span>
                                        <textarea placeholder="请填写详细地址" id="adinfo" value="" rows="2"
                                                  v-model="address.address"></textarea>
                                    </div>
                                </section>
                                <div id="container"></div>
                            </form>
                        </section>
                        <section class="addbutton">
                            <button :class="{butopacity:butpart}" @click.prevent="submitAddress(address)">保存</button>
                        </section>
                    </div>
                    <router-link :to="{name: 'addressList', query:{path: 'confirmOrder'}}" class="address_info" v-else>
                        <div class="address-detail">
                            <p>{{choosedAddress.provinceName + choosedAddress.cityName + choosedAddress.areaName +
                                choosedAddress.address}}</p>
                            <p><span>{{choosedAddress.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{choosedAddress.mobile}}</span>
                            </p>
                        </div>
                        <div class="deletesite">
                            <span></span>
                        </div>
                    </router-link>
                </div>
                <div class="shop_info">
                    <ul class="goods">
                        <li v-for="item in productList" :key="item.id">
                            <img :src="item.thumbnailPic" alt="" class="img">
                            <div class="goods_info">
                                <p class="name">{{item.productName}}</p>
                                <p class="price"><span class="RMB">￥</span>{{item.presentPrice}}</p>
                            </div>
                            <div class="cart_btns">
                                <span class="num">x{{item.number}}</span>
                            </div>
                        </li>
                        <transition name="fade">
                            <div v-if="showTotal" class="load_more" @click="loadAllProducts();">共{{productList.length}}件
                                <img src="../../images/path-2.png" width="4%"></div>
                        </transition>
                    </ul>
                    <ul class="payment_info">
                        <li>
                            <p>商品总价</p>
                            <p><span class="RMB">￥</span>{{Number(goodsPrice).toFixed(2)}}</p>
                        </li>
                        <!--<router-link :to="{name: 'couponList', query:{path: 'confirmOrder'}}" tag="li">-->
                        <!--<p>优惠券</p>-->
                        <!--<p class="RMB" v-if="coupon">￥-{{coupon.money}}</p>-->
                        <!--<p class="coupon" v-else>不使用</p>-->
                        <!--</router-link>-->
                        <li>
                            <p>运费</p>
                            <p><span class="RMB">￥</span>{{Number(fare).toFixed(2)}}</p>
                        </li>
                        <li>
                            <p>包装费</p>
                            <p><span class="RMB">￥</span>{{Number(packingFee | 5).toFixed(2)}}</p>
                        </li>
                        <li>
                            <p>包装费减免</p>
                            <p><span class="RMB">-￥</span>{{Number(packingFeeReduction | 5).toFixed(2)}}</p>
                        </li>
                    </ul>
                    <div class="right totalPrice">
                        实际支付
                        <p><span class="RMB">￥</span>{{Number(goodsPrice + fare).toFixed(2)}}</p>
                    </div>
                </div>
                <div class="shop_info">
                    <div class="input-new">
                        <span>留言</span>
                        <input type="text" maxlength="50" style="width: 100%;" placeholder="建议留言前先与客服进行确认，50字以内"
                               v-model="message">
                    </div>
                </div>
            </div>
        </nav>
        <ul class="settlement">
            <li @click="paymentCall()">去付款</li>
            <li>付款 &nbsp;<span class="red"><span class="RMB">￥</span>{{Number(goodsPrice + fare).toFixed(2)}}</span>
            </li>
        </ul>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import AjaxPicker from "ajax-picker";
    import loading from "src/components/common/loading";
    import {
        mapState,
        mapMutations
    } from "vuex";
    import {
        submitOrder,
        getDefaultAddress,
        getAddressList,
        getRegionsList,
        prepayOrder,
        addAddress
    } from "../../service/getData";

    export default {
        data() {
            return {
                showTotal: false,
                shopCart: null, // 购物车数据
                totalPrice: 0,
                goodsPrice: 0,
                packingFee: 0,
                packingFeeReduction: 0,
                fare: 0,
                productList: [],
                payment: 0,
                butpart: false, //  新增地址按钮的透明度
                choosedAddress: undefined,
                address: {
                    name: '', // 姓名
                    mobile: '', // 手机号
                    tipText: '', // 送餐地址
                    address: '', // 地址
                },
                orderId: 0,
                message: '',
                coupon: '',
                couponId: '',
                showLoading: false
            }
        },
        props: ['showErrMsg'],
        watch: {},
        computed: {},
        mounted() {
            this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
            if (!this.choosedAddress) {
                this.setRegions();
                this.getDefaultAddress()
            }
            this.coupon = JSON.parse(sessionStorage.getItem('choosedCoupon'));
            if (this.coupon) {
                this.totalPrice -= this.coupon.money
                this.couponId = this.coupon.id
            }
        },
        created() {
            this.brandCartList = JSON.parse(
                sessionStorage.getItem(this.$route.query.cartsKey)
            );

            this.showTotal = this.brandCartList.length > 2;

            this.productList = [];
            this.brandCartList.forEach(cart => {
                let brandNum = 0;
                let brandPrice = 0;

                cart.cartListDtos.forEach(cartItem => {
                    let itemGoodsPrice = cartItem.presentPrice * cartItem.number;
                    this.goodsPrice += itemGoodsPrice;
                    this.payment += itemGoodsPrice;
                    brandNum += cartItem.number;
                    brandPrice += itemGoodsPrice;
                    this.productList.push(cartItem)
                })

                if (cart.expressCost && cart.expressCost.freeExpress === 1 && brandPrice < cart.expressCost.freeExpressValue) { // 下单金额
                    this.fare += cart.expressCost.expressPrice;
                }
                if (cart.expressCost && cart.expressCost.freeExpress === 2 && brandNum < cart.expressCost.freeExpressValue) { // 下单金额
                    this.fare += cart.expressCost.expressPrice;
                }
            });
            this.totalPrice = this.fare + this.payment;
            sessionStorage.setItem('goodsPrice', JSON.stringify(this.goodsPrice));
        },
        methods: {
            // ...mapMutations(["CHOOSE_ADDRESS"]),

            loadAllProducts() {

            }
            ,
            async paymentCall() {
                this.showLoading = true;
                var that = this;
                if (!that.choosedAddress) {
                    if (!that.checkAddress(that.address)) {
                        this.showLoading = false;
                        return;
                    }
                    that.submitAddress(that.address, function () {
                        that.doPayCall();
                    })
                } else {
                    that.doPayCall();
                }
            }
            ,

            doPayCall() {
                if (this.orderId != 0) {
                    this.doPay(this.orderId);
                    return;
                }

                let cartIds = [];
                this.productList.forEach(cart => {
                    cartIds.push(cart.cartId);
                });
                let addressId = this.choosedAddress.id;
                let that = this;
                submitOrder(cartIds, addressId, that.couponId, that.message).then(res => {
                    if (res.errno !== 0) {
                        this.showErrMsg(res.errmsg);
                        this.showLoading = false;
                        return;
                    }
                    that.orderId = res.data;
                    that.doPay(that.orderId);
                })
            }
            ,

            /**
             * 去支付，调起微信支付
             */
            doPay(orderId) {
                prepayOrder(orderId).then(resp => {
                    this.showLoading = false;
                    var that = this;
                    if (resp.errno === 403) {
                        this.showErrMsg(resp.errmsg)
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
            ,

            /**
             * 校验用户输入的地址
             */
            checkAddress(address) {
                if (!address.name) {
                    this.showErrMsg('请填写收件人姓名')
                    return false;
                }
                if (!address.mobile) {
                    this.showErrMsg('请填写收货人手机号')
                    return false;
                }
                if (address.mobile.length < 11) {
                    this.showErrMsg('请填写正确的收货人手机号')
                    return false;
                }
                if (!address.tipText) {
                    this.showErrMsg('请选择您的所在地区')
                    return false;
                }
                if (!address.address) {
                    this.showErrMsg('请填写详细地址')
                    return false;
                }

                return true;
            }
            ,
            //保存地址
            async submitAddress(address, successFun) {
                if (!this.checkAddress(address)) {
                    return;
                }
                addAddress(
                    address.name,
                    address.provinceId,
                    address.cityId,
                    address.areaId,
                    address.mobile,
                    address.address
                ).then(res => {
                    address.id = res.data;
                    if (res.errno == 0) {
                        localStorage.setItem('choosedAddress', JSON.stringify(address));
                        this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
                    }
                    successFun();
                });
            }
            ,
            // 设置地址插件
            setRegions() {
                var that = this;
                getRegionsList(0).then(res => {
                    that.provinces = res.data;
                    var provinces = this.provinces;
                    var picker = new AjaxPicker({
                        title: "配送至",
                        tipText: ["省份", "城市", "区/县"],
                        input: "address-input",
                        container: "container",
                        renderArr: [
                            function () {
                                picker.render(provinces);
                            },
                            function () {
                                getRegionsList(picker.result1.id).then(res => {
                                    picker.render(res.data);
                                });
                            },
                            function () {
                                getRegionsList(picker.result2.id).then(res => {
                                    picker.render(res.data);
                                });
                            }
                        ],
                        success: function (arr) {
                            console.log(arr)
                            var addressD = "";
                            for (var i = 0; i < arr.length; i++) {
                                addressD += " " + arr[i].value;
                            }
                            document.getElementById("address-input").value = addressD.substring(1);
                            that.address.provinceId = picker.result1.id;
                            that.address.provinceName = picker.result1.value;
                            that.address.cityId = picker.result2.id;
                            that.address.cityName = picker.result1.value;
                            that.address.areaId = picker.result3.id;
                            that.address.areaName = picker.result3.value;
                            that.address.tipText = addressD.substring(1);
                        }
                    });
                });
            }
            ,
            // 获取默认地址信息
            getDefaultAddress() {
                // 默认用户地址
                getDefaultAddress().then(res => {
                    if (res.errno == 0 && res.data) {
                        let address = res.data;
                        let index = -1;
                        this.choosedAddress = address;
                        localStorage.setItem('choosedAddress', JSON.stringify(address));
                    } else {
                        getAddressList(1, 1).then(res => {
                            if (res.errno == 0 && res.data.length > 0) {
                                this.choosedAddress = res.data[0];
                                localStorage.setItem('choosedAddress', JSON.stringify(this.choosedAddress));
                            }
                        })
                    }
                });
            }
        }
        ,
        components: {
            headTop,
            loading
        }
        ,
    }
    ;
</script>

<style lang="scss" scoped>
    @import '../../style/confirmOrder'
</style>

<template>
    <div class="confirmOrderContainer">
        <!-- <head-top head-title="拼团确认" go-back='true'></head-top> -->
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
                    <div class="address_info" v-else>
                        <div class="address-detail">
                            <p :class="{'line-through': groupMy && groupMy.groupSuitType === 2}">{{choosedAddress.provinceName +
                                choosedAddress.cityName + choosedAddress.areaName +
                                choosedAddress.address}}</p>
                            <p :class="{'line-through': groupMy && groupMy.groupSuitType === 2}">{{choosedAddress.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosedAddress.mobile}}</p>
                            <div v-if="groupMyId === 'undefined' && groupType === '1'" class="label"
                                 :class="{'selected': groupSuitType === item.type}" v-for="(item,index) in suitTypes"
                                 :key="index" @click="selectSuitType(item.type)">{{item.text}}
                            </div>
                            <div class="tips" v-if="groupSuitType === 2">
                                您的地址及电话会展示给您的团员 <br>
                                <span class="left">团长职责：</span><span class="left">负责团员的货物，保证团员及时收货物 </span>
                                <span class="left">奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;励：</span><span class="left">根据您的头衔计算相应奖励</span>
                            </div>
                            <div v-if="groupMy && groupMy.groupSuitType === 2">
                                <br>
                                <div class="position-re">
                                    <p class="left address-tuan">{{tuanAddress.address}}</p>
                                    <img src="../../images/group/icon.png" class="icon" @click="showTipsBox">
                                    <span class="tip_box" v-if="showTip">因为您参与的是社区拼团，所以您的商品会寄送到此地址（团长地址）</span>
                                </div>
                                <p class="clear"><span>{{tuanAddress.consignee}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{tuanAddress.mobile}}</span>
                                </p>
                            </div>
                        </div>
                        <router-link :to="{name: 'addressList', query:{path: 'confirmOrder'}}" class="deletesite">
                            <span></span>
                        </router-link>
                    </div>
                </div>
                <div class="shop_info">
                    <!-- <p class="name">{{groupSuit.suitName}}</p> -->
                    <ul class="goods">
                        <li v-for="item in productList" :key="item.id">
                            <img :src="item.productThumbnailPic" alt="" class="img">
                            <div class="goods_info">
                                <p class="name">{{item.productName}}</p>
                                <p class="price"><span class="RMB">￥</span>{{item.productPresentPrice}}</p>
                            </div>
                            <div class="cart_btns">
                                <span class="num">x {{item.suitNumber}}</span>
                            </div>
                        </li>
                        <transition name="fade">
                            <div v-if="showTotal" class="load_more" @click="loadAllProducts();">共{{productList.length}}件
                                <img src="../../images/path-2.png" width="4%"></div>
                        </transition>
                    </ul>
                    <div class="purchase_num">
                        <p class="left">购买数量</p>
                        <div class="cart_btns right">
                            <span class="subduction" :class="{'disabled': suitNum <= groupSuit.minimum}"
                                  @click="addNumber(suitNum, -groupSuit.stepSize)"></span>
                            <span class="num">{{suitNum}}</span>
                            <span class="add" @click="addNumber(suitNum, groupSuit.stepSize)"></span>
                        </div>
                    </div>
                    <ul class="payment_info">
                        <li>
                            <p>商品总价</p>
                            <p><span class="RMB">￥</span>{{goodsPrice | number}}</p>
                        </li>
                        <router-link :to="{name: 'couponList', query:{path: 'confirmOrder'}}" tag="li">
                            <p>优惠价格</p>
                            <p class="RMB coupon">-￥{{coupon ? coupon.money : 0 | number}}</p>
                            <!-- <p class="coupon" v-else>不使用</p> -->
                        </router-link>
                        <li>
                            <p>运费</p>
                            <p><span class="RMB">￥</span>{{fare}}</p>
                        </li>
                        <!--<li>-->
                        <!--<p>包装费</p>-->
                        <!--<p><span class="RMB">￥</span>{{packingFee}}</p>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--<p>包装费减免</p>-->
                        <!--<p><span class="RMB">￥</span>{{packingFeeReduction}}</p>-->
                        <!--</li>-->
                    </ul>
                    <div class="right totalPrice">
                        实际支付
                        <p><span class="RMB">￥</span>{{(totalPrice + fare) | number}}</p>
                    </div>
                </div>
                <!-- <div class="shop_info">
                    <div class="input-new">
                        <span>留言</span>
                        <input type="text" maxlength="50" style="width: 100%;" placeholder="建议留言前先与客服进行确认,50字以内"
                               v-model="message">
                    </div>
                </div> -->
            </div>
        </nav>
        <ul class="settlement">
            <li @click="paymentCall()">去付款</li>
            <li>付款 &nbsp;<span class="red"><span class="RMB">￥</span>{{(totalPrice + fare) | number}}</span></li>
        </ul>
        <div class="mask_box" v-show="showTip" @click="showTip = false;"></div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import {
        ModalHelper
    } from "../../service/Utils";
    import AjaxPicker from "ajax-picker";
    import {
        mapState,
        mapMutations
    } from "vuex";
    import {
        submitGroup,
        getDefaultAddress,
        getAddressList,
        getRegionsList,
        prepayOrder,
        addAddress,
        openGroup,
        groupMyAddress
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
                groupSuit: {},
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
                groupType: '',
                groupMyId: null,
                groupMy: null,
                payButton: false,
                coupon: '',
                couponId: '',
                suitNum: 1,
                showTip: false,
                groupSuitType: 1,
                suitTypes: [],
                tuanAddress: {}
            }
        },
        props: ['showErrMsg'],
        watch: {
            showTip: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
            }
        },
        computed: {},
        mounted() {
            if (localStorage.getItem('choosedAddress') != 'undefined') {
                this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
            }
            if (!this.choosedAddress) {
                this.setRegions();
                this.getDefaultAddress()
            }
            this.coupon = JSON.parse(sessionStorage.getItem('choosedCoupon'));
            if (this.coupon) {
                this.totalPrice -= this.coupon.money
                this.couponId = this.coupon.id
            }
            console.log(this.choosedAddress.id)
        },
        created() {
            this.productList = JSON.parse(
                sessionStorage.getItem(this.$route.query.suitKey)
            );
            this.groupSuit = JSON.parse(
                sessionStorage.getItem(this.$route.query.groupKey)
            );
            this.suitTypes = JSON.parse(
                sessionStorage.getItem(this.$route.query.suitTypeKey)
            );
            this.suitTypes.forEach(t => {
                if (t.type === 1) {
                    t.text = '普通拼团';
                } else if (t.type === 2) {
                    t.text = '社区拼团';
                }
            });

            // 最低起售份数
            this.suitNum = this.groupSuit.minimum;
            this.groupType = this.$route.query.type
            this.groupMyId = this.$route.query.groupMyId
            this.showTotal = this.productList.length > 2;
            this.reComputePrice();
            this.groupMyId !== 'undefined' ? this.getGroupMyAddress() : null;
        },
        methods: {
            getGroupMyAddress() {
                groupMyAddress(this.groupSuit.id, this.groupMyId).then((res) => {
                    this.groupMy = res.data.groupMy;
                    this.tuanAddress = res.data.orderAddressVo;
                })
            },
            showTipsBox() {
                this.showTip = true;
                document.querySelector('.mask_box').style.height = document.documentElement.clientHeight + 'px';
            },
            // ...mapMutations(["CHOOSE_ADDRESS"]),

            loadAllProducts() {

            },
            async paymentCall() {
                var that = this;
                if (that.payButton) {
                    return;
                }
                that.payButton = true;
                if (!that.choosedAddress) {
                    if (!that.checkAddress(that.address)) {
                        that.payButton = false;
                        return;
                    }
                    // that.submitAddress(that.address, function () {
                    //     that.doPayCall();
                    // })
                } else {
                    that.doPayCall();
                }
            },

            doPayCall() {
                let that = this;
                let suitId = that.groupSuit.id
                let addressId = that.choosedAddress.id;
                let type = Number(that.groupType);
                let groupSuitType = that.groupSuitType;
                let suitNum = that.suitNum;
                let groupMyId = that.groupMyId === 'undefined' ? null : Number(that.groupMyId);

                // 开团
                if (!groupMyId) {
                    openGroup(suitId, type, groupSuitType, suitNum, groupMyId).then((res) => {
                        // 开团失败时
                        if (res.errno !== 0) {
                            that.showErrMsg(res.errmsg);
                            return;
                        }
                        groupMyId = res.data;
                        submitGroup(suitId, addressId, that.couponId, that.message, suitNum, groupMyId).then(res => {
                            if (res.errno !== 0) {
                                that.showErrMsg(res.errmsg)
                                that.payButton = false;
                                return;
                            }
                            that.orderId = res.data.orderId;
                            that.doPay(that.orderId, groupMyId);
                        })
                    })
                } else { // 参团
                    submitGroup(suitId, addressId, that.couponId, that.message, suitNum, groupMyId).then(res => {
                        if (res.errno !== 0) {
                            that.showErrMsg(res.errmsg)
                            that.payButton = false;
                            return;
                        }
                        that.orderId = res.data.orderId;
                        that.doPay(that.orderId, groupMyId);
                    })
                }

            },

            /**
             * 去支付，调起微信支付
             */
            doPay(orderId, groupMyId) {
                prepayOrder(orderId).then(resp => {
                    var that = this;
                    if (resp.errno === 403) {
                        this.showErrMsg("订单不可支付")
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
                                that.payButton = false;
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    that.$router.push('/groupMy/' + groupMyId);
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
            },

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
            },
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
            },
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
            },
            // 获取默认地址信息
            getDefaultAddress() {
                // 默认用户地址
                getDefaultAddress().then(res => {
                    console.info(res)
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
            },
            selectSuitType(type) {
                this.groupSuitType = type;
                this.reComputePrice();
            },
            reComputePrice() {
                this.goodsPrice = 0;
                this.totalPrice = 0;

                // 根据拼团的类型计算不同的套装价格
                this.suitTypes.forEach(t => {
                    if (t.type === this.groupSuitType) {
                        if (this.groupSuit.id === t.productId) {
                            this.goodsPrice += t.discountPrice * this.suitNum;
                        }
                    }
                })

                this.totalPrice = this.goodsPrice;
                this.goodsPrice > 199 ? this.fare = 0 : this.fare = 15;
                sessionStorage.setItem('goodsPrice', JSON.stringify(this.goodsPrice));
            },
            addNumber(suitNum, number) {
                if (number < 0 && suitNum <= this.groupSuit.minimum) {
                    return;
                }
                this.suitNum += number
                this.reComputePrice();
            }
        },
        components: {
            headTop
        },
    };
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to
        /* .fade-leave-active below version 2.1.8 */

    {
        opacity: 0;
    }

    .confirmOrderContainer {
        padding-bottom: 0.49rem;
    }

    .line-through {
        text-decoration: line-through;
    }

    .mask_box {
        background-color: rgba(0, 0, 0, 0.3);
        @include wh(100%, 0rem);
        position: fixed;
        top: 0;
        z-index: 3;
    }

    .shop_list_container {
        background-color: $bc;
        .swiper-container {
            padding-bottom: 0.15rem;
            .topBG {
                @include wh(100%, 0.83rem);
                @include bis("../../images/gwc-bg.png");
            }
            .address_info {
                background-color: $fc;
                width: 95%;
                margin: -0.48rem auto 0;
                padding: 0.2rem 0.15rem 0.2rem 0.57rem;
                @include fj(space-between);
                border-radius: 10px;
                box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.51);
                .address-detail {
                    position: relative;
                    width: 84%;
                    p {
                        line-height: 1.6;
                        @include sc(0.15rem, $g3);
                        span {
                            display: inline-block;
                            @include sc(0.15rem, $g3);
                        }
                    }
                    p:nth-of-type(1) {
                        margin-bottom: 0.15rem;
                    }
                    .label {
                        @include wh(.625rem, .24rem);
                        @include sc(.13rem, $g9);
                        border: .01rem solid $g9;
                        border-radius: .025rem;
                        margin: .12rem .22rem .12rem 0;
                        text-align: center;
                        line-height: .23rem;
                        float: left;
                    }
                    .label.selected {
                        @include sc(.13rem, $red);
                        border: .01rem solid $red;
                    }
                    .tips {
                        @include sc(.13rem, $g9);
                        line-height: 1.9;
                        overflow: hidden;
                        clear: both;
                        span {
                            @include sc(.13rem, $g9);
                        }
                        span:nth-child(odd) {
                            width: 69%;
                        }
                    }
                    .address-tuan {
                        width: 93%;
                    }
                    .icon {
                        width: .165rem;
                        float: left;
                        margin-top: .03rem;
                    }
                    .tip_box {
                        @include wh(2.8rem, .67rem);
                        @include sc(.12rem, $red);
                        display: block;
                        padding: .1rem .12rem;
                        background: url('../../images/group/tip_box.png') no-repeat 0 0;
                        background-size: 100% 100%;
                        box-sizing: border-box;
                        line-height: 1.45;
                        position: absolute;
                        top: -.57rem;
                        right: -.2rem;
                        z-index: 4;
                        pointer-events: none;
                    }
                }
                .address-detail:before {
                    content: "";
                    position: absolute;
                    left: -0.28rem;
                    top: 0rem;
                    @include bis("../../images/gwc-icon-add.png");
                    @include wh(0.16rem, 0.22rem);
                }
                .deletesite {
                    display: flex;
                    margin-top: 0.1rem;
                    span {
                        display: block;
                        @include wh(0.1rem, 0.175rem);
                        @include bis("../../images/path.png");
                    }
                }
            }
            .no_address {
                .adddetail {
                    margin-top: 0.11rem;
                    @include borderRadius(10px);
                    background: $fc;
                }
                .ui-padding-block {
                    .add-detail {
                        display: block;
                    }
                    .input-new {
                        @include wh(100%, 0.45rem);
                        padding: 0 0 0 0.12rem;
                        display: flex;
                        @include sc(0.15rem, $g6);
                        border-bottom: 1px solid $bc;
                        span {
                            width: 0.7rem;
                            line-height: 0.45rem;
                            margin-right: 0.14rem;
                        }
                        input {
                            display: flex;
                            width: 2.7rem;
                            font-size: 0.15rem;
                        }
                        .verifies {
                            border-color: #ea3106;
                        }
                        p {
                            @include sc(0.08rem, #ea3106);
                            padding-left: 0.1rem;
                            margin-top: 0.04rem;
                        }
                    }
                    .input-new:nth-of-type(4) {
                        height: 0.9rem;
                        textarea {
                            padding: 0.15rem 0 0 0;
                            width: 2.7rem;
                            font-size: 0.15rem;
                        }
                    }
                }
                .addbutton {
                    margin: 0.15rem auto;
                    width: 3.5rem;
                    button {
                        width: 100%;
                        @include sc(0.15rem, $fc);
                        line-height: 0.45rem;
                        background: $red;
                        font-weight: 700;
                        @include borderRadius(0.23rem);
                    }
                    .butopacity {
                        transition: all 0.4s;
                        opacity: 1;
                    }
                }
            }
        }
        .shop_info {
            margin: 0.15rem auto 0;
            width: 95%;
            background-color: $fc;
            padding: 0.2rem 0;
            border-radius: 10px;
            overflow: hidden;
            .goods {
                padding: 0 .15rem;
                li {
                    position: relative;
                    margin-bottom: 0.26rem;
                }
                .img {
                    display: inline-block;
                    border-radius: 5px;
                    @include wh(0.95rem, 0.945rem);
                    background-color: #000;
                    vertical-align: middle;
                    margin-left: 0.05rem;
                }
                .goods_info {
                    display: inline-block;
                    .name {
                        @include sc(0.15rem, $g3);
                        top: -0.1rem;
                        position: relative;
                    }
                    .price {
                        @include sc(0.18rem, $red);
                        font-weight: bold;
                        position: relative;
                        top: 0.38rem;
                    }
                }
                .cart_btns {
                    position: absolute;
                    right: 0.2rem;
                    bottom: 0.25rem;
                    .num {
                        display: inline-block;
                        text-align: center;
                        @include wh(0.245rem, 0.245rem);
                        @include sc(0.18rem, $g9);
                        vertical-align: top;
                        font-weight: bold;
                    }
                }
            }
            .payment_info {
                overflow: hidden;
                clear: both;
                margin: .15rem;
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
                margin: 0.12rem .15rem 0 0;
                color: $g6;
                p {
                    display: inline-block;
                    @include sc(0.2rem, $g3);
                    font-weight: bold;
                }
            }
            .purchase_num {
                @include wh(100%, .49rem);
                @include sc(.15rem, $g6);
                background-color: $f7;
                padding: 0 .13rem;
                line-height: .49rem;
                .cart_btns {
                    margin-top: .15rem;
                    display: flex;
                    .subduction,
                    .num,
                    .add {
                        @include wh(0.2rem, 0.2rem);
                        display: inline-flex;
                        flex: 1;
                        align-items: center;
                        justify-content: center;
                    }
                    .num {
                        @include sc(0.18rem, $red);
                        vertical-align: top;
                        margin: 0 0.05rem;
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
            .input-new {
                padding: 0 .15rem;
            }
        }
    }

    .settlement {
        position: fixed;
        bottom: 0;
        line-height: 0.49rem;
        background-color: $fc;
        border-top: solid 1px $bc;
        @include wh(100%, 0.49rem);
        overflow: hidden;
        li {
            float: right;
            text-align: center;
        }
        li:nth-child(2) {
            text-align: left;
            padding-right: 0.12rem;
            @include sc(0.15rem, $g6);
            .red {
                @include sc(0.18rem, $red);
                font-weight: 600;
            }
        }
        li:nth-child(1) {
            width: 30.33%;
            @include sc(0.15rem, $fc);
            background-color: $red;
        }
        .unselected {
            border-radius: 50%;
            display: inline-block;
            border: 1.5px solid $g9;
            @include wh(0.19rem, 0.19rem);
            vertical-align: text-bottom;
        }
        .selectAll {
            @include bis("../../images/selected.png");
            display: inline-block;
            @include wh(0.19rem, 0.19rem);
            vertical-align: text-bottom;
        }
    }

    .load_more {
        @include wh(100%, 0.36rem);
        @include sc(0.15rem, $g6);
        background-color: $f7;
        text-align: center;
        line-height: 0.36rem;
    }
</style>

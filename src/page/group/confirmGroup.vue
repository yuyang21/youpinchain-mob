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
                            <p :class="{'line-through': groupMy && groupMy.groupSuitType === 2}">
                                {{choosedAddress.provinceName +
                                choosedAddress.cityName + choosedAddress.areaName +
                                choosedAddress.address}}</p>
                            <p :class="{'line-through': groupMy && groupMy.groupSuitType === 2}">{{choosedAddress.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosedAddress.mobile}}</p>
                            <!-- 拼团方式 -->
                            <ul class="groupSuitType" v-if="!groupMy && !isAloneBuy">
                                <li class="left">拼团方式</li>
                                <li class="right" @click="suitTypeBox = true;showTipsBox();">
                                    <span>{{!groupSuitType ? '请选择拼团方式': groupSuitType === 1 ? '不同地址拼团': '同一地址拼团(推荐)'}}</span>
                                    <img src="../../images/path.png" alt="">
                                </li>
                            </ul>
                            <div class="tips" v-if="!groupMy && groupSuitType === 2 && !isAloneBuy">
                                选择同一地址拼团，支持“大美乡村计划”—扶持农业，收获健康，感谢您选择更环保·更温暖的生活方式。<br>
                                <span class="left">团长职责：</span><span class="left">邀请您附近伙伴拼团，团长统一收货并组织团员取货。</span>
                                <span class="left">大美奖励：</span><span class="left">订单结束后团长获得鼓励金</span>
                            </div>
                            <div class="tips" v-if="!groupMy && groupSuitType === 1 && !isAloneBuy">
                                快来邀请好友分享美味吧~<br>
                                <span>3人即可成团享受优惠价格，如收货地址相同推荐选择“同一地址拼团”更划算，更温暖。</span>
                            </div>
                            <div v-if="groupMy && groupMy.groupSuitType === 2">
                                <br>
                                <div class="position-re">
                                    <p class="left address-tuan">{{tuanAddress.address}}</p>
                                    <img src="../../images/group/icon.png" class="icon" @click="showTipsBox">
                                    <span class="tip_box" v-if="showTip">因为您参与的是同一地址拼团，所以您的商品会寄送到此地址（团长地址）</span>
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
                                <p class="name">{{item.productName + ' ' + item.productNetContent}}</p>
                                <p class="price"><span class="RMB">￥</span>{{item.productPresentPrice}}</p>
                            </div>
                            <div class="cart_btns" v-if="groupSuit.type === 1">
                                <span class="num">x {{item.suitNumber}}</span>
                            </div>
                            <div class="cart_btns2" v-else>
                                <template v-if="item.productStock > 0">
                                    <span class="subduction" @click="addProNum(item.productId,-1)"></span>
                                    <span class="num">{{item.buyNum ? item.buyNum: 0}}</span>
                                    <span class="add" @click="addProNum(item.productId,1)"></span>
                                </template>
                                <template v-else>
                                    <p class="desr">卖光了</p>
                                </template>
                            </div>
                        </li>
                        <!--<transition name="fade">-->
                            <!--<div v-if="showTotal" class="load_more" @click="loadAllProducts();">共{{productList.length}}件-->
                                <!--<img src="../../images/path-2.png" width="4%"></div>-->
                        <!--</transition>-->
                    </ul>
                    <div class="purchase_num" v-if="groupSuit.type === 1">
                        <p class="left">购买数量</p>
                        <div class="cart_btns right">
                            <!--:class="{'disabled': suitNum <= groupSuit.minimum}"-->
                            <span class="subduction"
                                  @click="addNumber(suitNum, -groupSuit.stepSize)"></span>
                            <span class="num">{{suitNum}}</span>
                            <span class="add" @click="addNumber(suitNum, groupSuit.stepSize)"></span>
                        </div>
                    </div>
                    <div class="right totalPrice red" v-if="groupSuit.type === 1">
                        套装单价
                        <p><span class="RMB">￥</span>{{packPrice | number}}</p>
                    </div>
                </div>
                <div class="shop_info margin-t-p3">
                    <ul class="payment_info">
                        <li>
                            <p>商品总价</p>
                            <p><span class="RMB">￥</span>{{goodsPrice | number}}</p>
                        </li>
                        <!--<router-link :to="{name: 'couponList', query:{path: 'confirmOrder'}}" tag="li">-->
                            <!--<p>优惠价格</p>-->
                            <!--<p class="RMB coupon">-￥{{coupon ? coupon.money : 0 | number}}</p>-->
                            <!--&lt;!&ndash; <p class="coupon" v-else>不使用</p> &ndash;&gt;-->
                        <!--</router-link>-->
                        <li>
                            <p>运费{{fareInfo}}</p>
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
        <div class="mask_box" v-show="showTip" @click="showTipsBox"></div>
        <div class="suitTypeBox" v-show="suitTypeBox">
            <div class="title">
                拼团方式
                <p class="right" @click="suitTypeBox = false;showTip = false;">
                    <img src="../../images/close.png" alt="">
                </p>
            </div>
            <ul class="levels">
                <li class="label"
                    :class="{'selected': groupSuitType === item.type}" v-for="(item,index) in suitTypes"
                    :key="index" @click="selectSuitType(item.type)">{{item.text}}
                </li>
            </ul>
        </div>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import loading from "src/components/common/loading";
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
        groupMyAddress,
        expressCost
    } from "../../service/getData";

    export default {
        data() {
            return {
                showTotal: false,
                shopCart: null, // 购物车数据
                totalPrice: 0,
                goodsPrice: 0,
                packPrice: 0,
                packingFee: 0,
                packingFeeReduction: 0,
                fare: 0,
                fareInfo: '',
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
                isAloneBuy: false,
                groupMyId: null,
                groupMy: null,
                payButton: false,
                coupon: '',
                couponId: '',
                suitNum: 1,
                buyNum: 0,
                showTip: false,
                groupSuitType: 2, // 默认推荐同一地址
                suitTypes: [],
                tuanAddress: {},
                expressCostData: null,
                showLoading: false,
                suitTypeBox: false
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
        },
        created() {
            this.productList = JSON.parse(
                sessionStorage.getItem(this.$route.query.suitKey)
            );
            console.info(this.productList)
            this.groupSuit = JSON.parse(
                sessionStorage.getItem(this.$route.query.groupKey)
            );
            this.suitTypes = JSON.parse(
                sessionStorage.getItem(this.$route.query.suitTypeKey)
            );
            this.suitTypes.forEach(t => {
                if (t.type === 1) {
                    t.text = '不同地址拼团';
                } else if (t.type === 2) {
                    t.text = '同一地址拼团';
                }
                if (t.type === this.groupSuitType && this.groupSuit.id === t.productId) {
                    this.packPrice = t.discountPrice;
                }

            });
            if (this.suitTypes.length === 1){
                this.groupSuitType = this.suitTypes[0].type
            }

            // 最低起售份数
            this.suitNum = this.groupSuit.minimum;
            this.isAloneBuy = this.$route.query.isAloneBuy === 'true'
            this.groupMyId = this.$route.query.groupMyId
            this.showTotal = this.productList.length > 2;
            this.groupMyId !== 'undefined' && this.groupMyId ? this.getGroupMyAddress() : null;
            // 运费
            var that = this
            expressCost(this.groupSuit.expressCostId).then(res => {
                that.expressCostData = res.data;
                this.reComputePrice();
                if (that.expressCostData.freeExpress === 1) {
                    this.fareInfo = '(满' + that.expressCostData.freeExpressValue + '元包邮)'
                } else if (that.expressCostData.freeExpress === 2) {
                    this.fareInfo = this.fareInfo = '(满' + that.expressCostData.freeExpressValue + '件包邮)'
                }

            })

        },
        methods: {
            getGroupMyAddress() {
                var that = this
                groupMyAddress(this.groupSuit.id, this.groupMyId).then((res) => {
                    that.groupMy = res.data.groupMy;
                    that.tuanAddress = res.data.orderAddressVo;
                    that.groupSuitType = res.data.groupMy.groupSuitType;
                    that.packPrice = that.groupMy.discountPrice;
                    this.reComputePrice();
                })
            },
            showTipsBox() {
                if (this.suitTypeBox && this.showTip) {
                    return
                }
                this.showTip = !this.showTip;
                document.querySelector('.mask_box').style.height = document.documentElement.clientHeight + 'px';
            },
            // ...mapMutations(["CHOOSE_ADDRESS"]),

            loadAllProducts() {

            },
            async paymentCall() {

                // 自定义购买商品判断
                if (this.groupSuit.type === 2 && this.buyNum <= 0) {
                    this.showErrMsg('请至少选择一件商品！')
                    return
                }

                var that = this;
                if (!that.groupSuitType) {
                    that.suitTypeBox = true;
                    that.showTipsBox();
                    return;
                }
                if (that.payButton) {
                    return;
                }
                that.payButton = true;
                this.showLoading = true;
                setTimeout(function () {
                    that.showLoading = false;
                }, 3000);
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
                let isAloneBuy = Boolean(that.isAloneBuy);
                let groupSuitType = that.groupSuitType;
                let suitNum = that.suitNum;
                let groupMyId = that.groupMyId === 'undefined' ? null : Number(that.groupMyId);
                let products = that.productList

                // 开团
                if (!groupMyId) {
                    openGroup(suitId, isAloneBuy, groupSuitType, suitNum, groupMyId).then((res) => {
                        // 开团失败时
                        if (res.errno !== 0) {
                            that.showErrMsg(res.errmsg);
                            return;
                        }
                        groupMyId = res.data;
                        submitGroup(suitId, addressId, that.couponId, that.message, suitNum, groupMyId,products).then(res => {
                            if (res.errno !== 0) {
                                that.showErrMsg(res.errmsg)
                                that.payButton = false;
                                return;
                            }
                            that.orderId = res.data;
                            that.doPay(that.orderId, groupMyId);
                        })
                    })
                } else { // 参团
                    submitGroup(suitId, addressId, that.couponId, that.message, suitNum, groupMyId,products).then(res => {
                        if (res.errno !== 0) {
                            that.showErrMsg(res.errmsg)
                            that.payButton = false;
                            return;
                        }
                        that.orderId = res.data;
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
                    that.showLoading = false;
                    that.payButton = false;
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
                                that.payButton = false;
                                console.log(res.err_msg)
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    if (!that.isAloneBuy) {
                                        window.location.href = process.env.DOMAIN + '/groupMy/' + groupMyId;
                                        // that.$router.push('/groupMy/' + groupMyId);
                                    } else {
                                        window.location.href = process.env.DOMAIN + '/order';
                                    }

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
                let that = this
                this.goodsPrice = 0;
                this.totalPrice = 0;

                if (this.groupSuit.type === 1) {
                    // 参团
                    if (this.groupMy) {
                        this.packPrice = this.groupMy.discountPrice;
                        this.goodsPrice += this.groupMy.discountPrice * this.suitNum;
                    } else {
                        // 开团根据拼团的类型计算不同的套装价格
                        if (this.isAloneBuy) {
                            this.packPrice = this.groupSuit.suitPrice;
                            this.goodsPrice += this.groupSuit.suitPrice * this.suitNum;
                        } else {
                            this.suitTypes.forEach(suitType => {
                                if (suitType.type === this.groupSuitType) {
                                    if (this.groupSuit.id === suitType.productId) {
                                        this.packPrice = suitType.discountPrice;
                                        this.goodsPrice += suitType.discountPrice * this.suitNum;
                                    }
                                }
                            })
                        }

                    }
                } else if (this.groupSuit.type === 2) { // 自定义拼团

                    this.buyNum = 0;
                    // 单独购买
                    if (this.isAloneBuy) {
                        this.productList.forEach(pro => {
                            pro.groupProductPrice.forEach(productPrice => {
                                if (productPrice.buyType === 1) {
                                    pro.realProductPrice = productPrice.presentPrice;
                                    that.goodsPrice += pro.buyNum * productPrice.presentPrice;
                                    that.buyNum += pro.buyNum;
                                }
                            })
                        })
                    } else {
                        // 参团
                        if (this.groupMy) {
                            this.groupSuitType = this.groupMy.groupSuitType;
                        }
                        // 根据拼团的类型计算不同的套装价格

                        if (this.groupSuitType === 1) { //普通拼团，不同地址
                            this.productList.forEach(pro => {
                                pro.groupProductPrice.forEach(productPrice => {
                                    if (productPrice.buyType === 2) {
                                        pro.realProductPrice = productPrice.presentPrice;
                                        that.goodsPrice += pro.buyNum * productPrice.presentPrice;
                                        that.buyNum += pro.buyNum;
                                    }
                                })
                            })
                        } else { // 同一地址拼团
                            this.productList.forEach(pro => {
                                pro.groupProductPrice.forEach(productPrice => {
                                    if (productPrice.buyType === 3) {
                                        pro.realProductPrice = productPrice.presentPrice;
                                        that.goodsPrice += pro.buyNum * productPrice.presentPrice;
                                        that.buyNum += pro.buyNum;
                                    }
                                })
                            })
                        }
                    }
                }

                let buyNum = 0;
                if (this.groupSuit.type === 2) {
                    buyNum = this.buyNum;
                } else {
                    buyNum = this.suitNum
                }
                this.totalPrice = this.goodsPrice;
                sessionStorage.setItem('goodsPrice', JSON.stringify(this.goodsPrice));
                this.fare = this.expressCostData.expressPrice;
                if (this.expressCostData.freeExpress === 1 && this.goodsPrice >= this.expressCostData.freeExpressValue) { // 金额包邮
                    this.fare = 0;
                } else if (this.expressCostData.freeExpress === 2 && buyNum >= this.expressCostData.freeExpressValue) { // 数量包邮
                    this.fare = 0;
                }

            },
            addNumber(suitNum, number) {
                if (number < 0 && suitNum <= this.groupSuit.minimum) {
                    if (this.groupSuit.minimum > 1) {
                        this.showErrMsg('该商品至少购买' + this.groupSuit.minimum + '份');
                    }
                    return;
                }
                this.suitNum += number
                this.reComputePrice();
            },
            addProNum(productId,number) {
                let that = this
                this.productList.forEach(item =>{
                    if(item.productId === productId){
                        if (item.buyNum <= (item.minimum ? item.minimum : 0) && number <= 0) {
                            if (item.minimum > 0) {
                                that.showErrMsg('该商品至少购买' + item.minimum + '份');
                            }
                            return
                        }

                        item.buyNum += number

                    }
                })
                this.reComputePrice();
            }
        },
        components: {
            headTop,
            loading
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../style/confirmGroup";
</style>

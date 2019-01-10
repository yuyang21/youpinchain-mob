<template>
<div class="goods">
    <head-top class="header" go-back='true' is-share="true" :showShare="showShare" :headTitle="headTitle"></head-top>
    <div class="top_main">
        <swipe ref="swipe" :speed="500" :loop="true" :autoplayTime="1500">
            <swipe-item v-for="item in goods.headPic" :key="item.id">
                <div class="header_image">
                    <img :src="item" alt="" width="100%" class="show">
                </div>
            </swipe-item>
        </swipe>
        <div class="presell_box" v-if="goods.preSale">
            <div class="left_price left">
                <p class="price"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
                <p class="tip">商品预计{{(goods.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
            </div>
            <div class="right_tip right">
                <p>预售</p>
                <p>江浙沪北京地区专供</p>
            </div>
        </div>
        <div class="title">
            <p class="price" v-if="!goods.preSale"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
            <p class="name"><span class="presell_text" v-if="goods.preSale">【预售】</span>{{goods.name}}</p>
            <p class="desr">{{goods.describe}}</p>
        </div>
    </div>
    <div class="goods_info">
        <div class="panel_title">商品详情</div>
        <!--<div class="info_content" v-html="goods.Desc"></div>-->
        <div class="info_content">
            <p>品名：{{goods.name}}</p>
            <p>净含量：{{goods.netContent}}</p>
            <p>包装形式：{{goods.packing}}</p>
            <p>保存状态：{{goods.storage}}</p>
            <p>保存期限：{{goods.qualityGuaranteePeriod}}</p>
        </div>
        <!-- <div>
        <img v-for="item in goods.footPic" :src="item" alt="" width="100%" class="show">
      </div> -->
    </div>
    <div class="certificates" v-if="(goods.jianyiProv && goods.jianyiProv.length > 0) || (goods.certificate && goods.certificate.length > 0)
    || (goods.businessLicense && goods.businessLicense.length > 0)">
        <p class="abstract">证件资质</p>
        <ul>
            <li v-if="goods.jianyiProv && goods.jianyiProv.length > 0" @click="toCredential(0)"><img src="../../images/store/credentials_1.png" alt="">
                <p>检疫证</p>
            </li>
            <li v-if="goods.certificate && goods.certificate.length > 0" @click="toCredential(1)"><img src="../../images/store/credentials_2.png" alt="">
                <p>合格证</p>
            </li>
            <li v-if="goods.businessLicense && goods.businessLicense.length > 0" @click="toCredential(2)"><img src="../../images/store/credentials_3.png" alt="">
                <p>经营许可证</p>
            </li>
        </ul>
    </div>
    <div class="description_detail">
        <!--<img class="abstractImg" src="../../images/store/Impression_bg.png" alt="">-->
        <ul>
            <li>
                <p>{{goods.name}}</p>
                <p>{{goods.describe}}</p>
            </li>
        </ul>
        <template v-for="item in goods.footPic">
            <img :src="item" style="width: 100%;display: block">
        </template>
    </div>
    <div class="add_cart_container">
        <router-link class="cart_icon_num left" :to="'/cart'">
            <div class="icon"><span class="red-points" v-if="cart_num">{{cart_num}}</span></div>
        </router-link>
        <div class="cart_btn right" @click="addCartList(goods)">加入购物车</div>
    </div>
    <share-mask v-if="showShare" :showShare="showShare"></share-mask>
</div>
</template>

<script>
import shareMask from "src/components/common/shareMask";
import headTop from "src/components/header/head";
import {
    ModalHelper
} from "../../service/Utils";
import {
    showBack
} from "src/config/mUtils";
import {
    addToCart,
    getProductDetail,
    cartProductCount
} from "../../service/getData";
import {
    WechatShareUtils
} from '../../service/WechatShareUtils'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            showShare: false,
            headTitle: "",
            goodsid: "",
            goods: {},
            cart_num: 0
        };
    },
    watch: {
        showShare: function (newVal, oldVal) {
            newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
        }
    },
    mounted() {
        this.goodsid = this.$route.params.goodsid;
        this.initData();
        this.initCartCount();
    },
    components: {
        shareMask,
        headTop
    },
    computed: {},
    props: ["showErrMsg"],
    methods: {
        toCredential(index) {
            this.$router.push("/credentials/#w_anchor" + index);
        },
        initData() {
            var that = this;
            getProductDetail(that.goodsid).then(res => {
                if (res.errno !== 0) {
                    return;
                }
                that.goods = res.data;
                !res.data.preSaleDelivery ?
                    (that.goods.preSaleDelivery = "2018-09-18T00:58:28") :
                    null;
                wx.ready(function () {
                    var shareLink = window.location.href
                    WechatShareUtils.onMenuShareAppMessage('链上臻品！', '优质商品精心臻选！', shareLink, 'https://mmbiz.qpic.cn/mmbiz_jpg/jV5hZicRoCyPicial3ca4gicOUOETlqX0koqEcDxNC9mUkmFzbdq801Wwu2U335MWicZxI1Zlqnfa9hbxciayOFeB94w/0?wx_fmt=jpeg')
                })
            });

            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                that.headTitle = status ? that.goods.name : "";
            });
        },
        initCartCount() {
            cartProductCount().then(res => {
                if (res.errno == 0) {
                    this.cart_num = res.data;
                }
            });
        },
        addCartList(goods) {
            addToCart(this.goodsid, 1).then(res => {
                if (res.errno === 0) {
                    this.showErrMsg("添加成功");
                    this.initCartCount();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../static/swipe/swipe.min.css';
@import "../../style/goods";
</style>

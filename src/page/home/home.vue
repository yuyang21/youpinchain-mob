<template>
<div class="home">
    <div class="mescroll" ref="mescroll">
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <div v-show="!showLoading">
            <swipe ref="swipe" :speed="500" :loop="true" :autoplayTime="1500">
                <swipe-item v-for="item in brand" :key="item.id">
                    <router-link tag="div" class="header_image" :to="{path:'/introduce/'+ item.id}">
                        <img :src="item.pictureUrl" alt="" width="100%" class="show">
                    </router-link>
                </swipe-item>
            </swipe>

            <!--<router-link tag="div" class="header_image" :to="{path:'/introduce/'+ brand.id}">-->
                <!--<img :src="brand.pictureUrl" alt="" width="100%" class="show">-->
            <!--</router-link>-->
            <!-- <ul class="product_nav">
            <li v-for="(tab, index) in product_nav" :key="index" :class="{'active': index === activeTab}" v-if="tab.name !== 'brand'"
                @click="toggleTab(tab.id,index)">{{tab.name}}</li>
          </ul> -->
            <section id="hot_goods">
                <h4 class="goods_title">热卖商品</h4>
                <ul class="goodslistul clear">
                    <li v-for="item in hotgoodslist" :key="item.id">
                        <router-link tag="div" :to="'/goods/' + item.id">
                            <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                            <div class="left goods_info">
                                <p class="name">{{item.name + ' ' + item.netContent}}*1{{item.packing}}</p>
                                <p class="desr">{{item.describe}}</p>
                                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                                <p class="price"><span class="RMB">￥</span>{{item.presentPrice}} <s>￥{{item.originalPrice}}</s></p>
                            </div>
                        </router-link>
                        <div class="shopping_cart" :class="{'shopping_cart_disabled': item.stock <= 0}" @touchstart="addToCart(item, $event)"></div>
                    </li>
                </ul>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item"></span>
                </transition>
            </section>
        </div>
    </div>
    <foot-guide></foot-guide>
</div>
</template>

<script>
import footGuide from '../../components/footer/footGuide'
import {
    homeIndex,
    addToCart,
    productList
} from '../../service/getData'
import {
    WechatShareUtils
} from '../../service/WechatShareUtils'
import loading from "../../components/common/loading";
import wx from 'weixin-js-sdk'
import MeScroll from '../../static/mescroll/mescroll.min.js'
export default {
    data() {
        return {
            brand: {},
            goodsList: [],
            product_nav: [],
            activeTab: 0,
            hotgoodslist: [],
            showLoading: true,
            showMoveDot: [], //控制下落的小圆点显示隐藏
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
            datasBrandId: "",
            mescroll: null
        }
    },
    mounted() {
        //获取商品列表
        homeIndex().then(res => {
            // this.product_nav = res.data.brandDatas
            this.brand = res.data.brand
            this.showLoading = false;
            this.getDatasBrandId(res.data.brandDatas)
        })
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
        that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
        wx.ready(function () {
            var shareLink = window.location.href
            WechatShareUtils.onMenuShareAppMessage('链上臻品！', '优质商品精心臻选！', shareLink, 'https://mmbiz.qpic.cn/mmbiz_jpg/jV5hZicRoCyPicial3ca4gicOUOETlqX0koqEcDxNC9mUkmFzbdq801Wwu2U335MWicZxI1Zlqnfa9hbxciayOFeB94w/0?wx_fmt=jpeg')
        })

    },
    components: {
        footGuide,
        loading
    },
    props: ['showErrMsg'],
    computed: {},
    methods: {
        toggleTab(dataId, index) {
            this.$router.push("/growing-environment?dataId=" + dataId);
            this.activeTab = index
        },
        addToCart(product, event) { // 加入购物车，计算按钮位置。
            if (product.stock <= 0) {
                this.showErrMsg('库存不足');
                return;
            }
            let elLeft = event.target.getBoundingClientRect().left;
            let elBottom = event.target.getBoundingClientRect().bottom;
            this.showMoveDot.push(true);
            let that = this;
            this.showMoveDotFun(this.showMoveDot, elLeft, elBottom);
            addToCart(product.id, 1).then(res => {
                that.$parent.getCartNum();
            })
        },
        showMoveDotFun(showMoveDot, elLeft, elBottom) { // 显示下落圆球
            this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
            this.elLeft = elLeft;
            this.elBottom = elBottom;
        },
        beforeEnter(el) {
            console.log(this.elBottom)
            el.style.transform = `translate3d(${this.elLeft - 230}px,${20 +this.elBottom - window.innerHeight}px,0px)`;
            el.style.opacity = 0;
        },
        afterEnter(el) {
            el.style.transform = `translate3d(0,0,0px)`;
            el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            this.showMoveDot = this.showMoveDot.map(item => false);
            el.style.opacity = 1;
        },
        getDatasBrandId(nav) {
            if (nav == undefined) {
                return
            }
            nav.forEach(key => {
                if (key.name === 'brand') {
                    this.datasBrandId = key.id
                }
            })
        },
        upCallback(page) {
          productList(page.num, page.size).then(res => {
            this.showLoading = false;
            let arr = res.data.productList;
            if (page.num === 1) this.hotgoodslist = [];
            var that = this;
            setTimeout(function () {
              that.hotgoodslist = that.hotgoodslist.concat(arr);
              that.$nextTick(() => {
                that.mescroll.endSuccess(arr.length, page.num < res.data.totalPages);
              })
            },300)

          }).catch((e)=> {
            this.mescroll.endErr();
          })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../static/swipe/swipe.min.css';
@import '../../static/mescroll/mescroll.min.css';
@import '../../style/home'
</style>

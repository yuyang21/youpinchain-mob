<!-- 团购详情 -->
<template>
    <div class="goods">
        <head-top class="header" go-back='true' is-share="true" :showShare="showShare"
                  :headTitle="headTitle"/>
        <div class="scrollBox">
            <div class="top_main">
                <div v-if="headPic && headPic.length <= 0">
                    <img :src="groupSuit.normalPic" alt="" class="show">
                </div>
                <swipe ref="swipe" :speed="500" :autoplayTime="0" :pagination="headPic.length > 1" v-else>
                    <swipe-item v-for="(item,index) in headPic" :key="index">
                        <div class="header_image">
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="false" :options="playerOptions" v-if="item.indexOf('mp4') != -1"></video-player>
                            <img :src="item" v-if="item.indexOf('mp4') == -1" width="100%" class="show">
                        </div>
                    </swipe-item>
                </swipe>
                <div class="presell_box">

                    <div class="left_price left" v-if="groupSuit.preSaleDelivery !== undefined">
                        <p class="price"><span>￥</span>{{groupPrice}} <s>￥{{groupSuit.suitPrice}}</s></p>
                        <p class="tip">商品预计{{(groupSuit.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
                    </div>
                    <div class="left_price left" v-else>
                        <p class="price" :class="{'margin-t-p8': groupSuit.preSaleDelivery === undefined}">
                            <span>￥</span>{{groupPrice}} <s>￥{{groupSuit.suitPrice}}</s>
                        </p>
                    </div>
                    <div class="right_tip right" v-if="!groupMyId && endTimeDown>0 && startTimeDown<1">
                        <p>距开团结束</p>
                        <p v-if="endTimeDown > 24*60*60">
                            <span class="shadow_box">{{Math.floor(endTimeDown/60/60/24)}}</span>天<span class="shadow_box">{{endTimeDown - Math.floor(endTimeDown/60/60/24)*24*60*60 | timeArry(0)}}</span>时<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>分
                        </p>
                        <p v-else>
                            <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>时<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>分<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>秒
                        </p>
                    </div>
                    <div class="right_tip right" v-if="groupMyId && endTimeDown>0">
                        <p>距拼团结束</p>
                        <p>
                            <span class="shadow_box">{{endTimeDown | timeArry(0)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(1)}}</span>:<span class="shadow_box">{{endTimeDown | timeArry(2)}}</span>
                        </p>
                    </div>
                    <div class="right_tip right" :class="{'activityEnd': endTimeDown <= 0}" v-if="endTimeDown <= 0">
                        <p>拼团结束</p>
                    </div>
                </div>
                <div class="title">
                    <!--<p class="price" v-if="!groupSuit.presentPrice"><span>￥</span>{{groupSuit.presentPrice}} <s>￥{{groupSuit.originalPrice}}</s></p>-->
                    <p class="name"><span class="presell_text" v-if="groupSuit.presentPrice">【预售】</span>{{groupSuit.suitName}}
                    </p>
                    <p class="desr">{{groupSuit.describe}}</p>
                </div>
            </div>
            <!-- 拼团流程 -->
            <div class="assembling_process">
                <div class="panel_title">拼团流程</div>
                <div class="content">
                    <ul class="process">
                        <li>
                            <img src="../../images/group/process01.png" alt="">
                            <p class="text">团长开团</p>
                        </li>
                        <li>
                            <img src="../../images/group/process02.png" alt="">
                            <p class="text">邀请好友</p>
                        </li>
                        <li>
                            <img src="../../images/group/process03.png" alt="">
                            <p class="text">拼团成功</p>
                        </li>
                        <li>
                            <img src="../../images/group/process04.png" alt="">
                            <p class="text">等待发货</p>
                        </li>
                    </ul>
                    <!--<p class="mode">模式一：<span>不同地址拼团，享受价格优惠</span></p>-->
                    <!--<p class="mode">模式二：<span>同一地址拼团，团长选择收货地址，团员线下与团长进行后续收货服务。团长获得劳动鼓励金。</span></p><br>-->
                </div>
            </div>

            <div class="assembling_process" v-if="brandId">
                <div class="panel_title">检测报告</div>
                <div class="content">
                    <router-link tag="li" :to="{path:'/introduce/'+ brandId}">
                        <img style="width: 40px;margin: 5px 5px 5px 15px;height: 40px;" src="../../images/store/credentials_2.png" alt="">
                    </router-link>
                </div>
            </div>
            <!-- 拼团商品 -->
            <div class="goods_info" v-if="groupSuit.type == 2">
                <div class="panel_title">拼团商品</div>
                <ul class="goodslistul clear">
                    <li v-for="(item, index) in suitDet" :key="item.id">
                        <!-- <router-link tag="div" :to="'/goods/' + item.productId"> -->
                        <div>
                            <img :src="item.productThumbnailPic" alt="" class="left"
                                :class="{'noImage': !item.productThumbnailPic}">
                            <div class="left goods_li">
                                <p class="name">{{item.productName + ' ' +
                                    item.productNetContent}}</p>
                                <!--<p class="desr">{{item.productDescribe}}</p>-->
                                <!--<p class="price"><span class="RMB">￥</span>{{item.productPresentPrice}}</p>-->
                                <div class="cart_btns right" v-if="item.productStock > 0">
                                    <span class="subduction" @click="addNumber(index, -1)"><img src="../../images/sub-icon.png"/></span>
                                    <span class="num">{{item.buyNum}}</span>
                                    <span class="add" @click="addNumber(index, 1)"><img src="../../images/add-icon.png"/></span>
                                </div>
                                <div class="cart_btns right" v-else>
                                    <p class="desr">卖光了</p>
                                </div>
                            </div>
                        </div>
                        <!-- </router-link> -->
                    </li>
                </ul>
            </div>
            <!-- 拼团详情 -->
            <div class="goods_info" v-if="footPic && footPic.length > 0">
                <div class="panel_title">拼团详情</div>
                <div class="goodsImgs">
                    <img :src="item" alt="" v-for="(item,index) in footPic" :key="index" width="100%">
                </div>
            </div>
        </div>
        <div class="add_cart_container" v-if="endTimeDown>0 && startTimeDown<1">
            <div :class="groupSuit.type == 2?'cart_btn right cart_btn_center':'cart_btn right'" v-if="groupMyId" @click="toSubmitOrder(false)"><template v-if="groupSuit.type != 2">￥{{groupMy.discountPrice}} <br></template> 参与拼团</div>
            <div :class="groupSuit.type == 2?'cart_btn right cart_btn_center':'cart_btn right'" v-else @click="toSubmitOrder(false)"><template v-if="groupSuit.type != 2">￥{{groupPrice}} <br></template> 发起拼团</div>
            <div :class="groupSuit.type == 2?'cart_btn_alone right cart_btn_center':'cart_btn_alone right'" @click="toSubmitOrder(true)"><template v-if="groupSuit.type != 2">￥{{groupSuit.suitPrice}} <br></template> 立即支付</div>
        </div>
        <div class="add_cart_container activityEnd_btns" v-if="endTimeDown <= 0">
            <div class="cart_btn right" @click="toSubmitOrder(false, true)">{{groupMyId ? '我要开团' : '查看其他拼团'}}</div>
            <div class="cart_btn_alone right">拼团结束</div>
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
        countDown
    } from "src/config/mUtils";
    import {
        groupMyAddress,
        groupSuit,
        groupPro,
        getBrandId
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
                groupMyId: '',
                groupMy: {},
                groupSuit: {},
                suitTypes: [],
                suitDet: [],
                groupPrice: 0,
                cart_num: 0,
                endTimeDown: null,
                startTimeDown: null,
                timer: null,
                headPic: [],
                footPic: [],
                brandId: null,
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",
                        src: "" //url地址
                    }],
                    // poster: "../../static/images/test.jpg", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: false,
                        durationDisplay: false,
                        remainingTimeDisplay: false,
                        fullscreenToggle: false  //全屏按钮
                    }
                }
            };
        },
        watch: {
            showShare: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
            },
            endTimeDown: function (val) {
                var that = this
                if (!val) {
                    clearInterval(that.timer)
                    setTimeout(function () {
                        that.initData()
                    },1000)
                }
            }
        },
        mounted() {
            this.groupSuitId = this.$route.params.suitId;
            this.groupMyId = this.$route.query.groupMyId;
            this.initData();
            document.querySelector('.scrollBox').style.height = document.documentElement.clientHeight - document.querySelector('.header').clientHeight - document.querySelector('.add_cart_container').clientHeight + 'px';
        },
        components: {
            shareMask,
            headTop
        },
        computed: {},
        props: ["showErrMsg"],
        methods: {
            playVideo () {
                var vdo = document.getElementById("videoPlay");
                vdo.play();
            },
            initData() {
                var that = this;
                groupSuit(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.groupSuit = res.data.groupSuit;
                    that.headTitle = res.data.groupSuit.suitName;
                    that.suitTypes = res.data.suitTypes;
                    that.headPic = res.data.headPic;
                    that.footPic = res.data.footPic;

                    that.headPic.forEach(img => {
                        if (img.indexOf('mp4') != -1) {
                            that.playerOptions.sources[0].src = img;
                        } else {
                            that.playerOptions = null;
                        }
                    })

                    // that.startTimeDown = res.data.startTimeDown;
                    wx.ready(function () {
                        var shareLink = window.location.href
                        WechatShareUtils.onMenuShareAppMessage('超值拼团 ' + that.groupSuit.suitName, that.groupSuit.describe, shareLink, that.groupSuit.thumbnailPic)
                    })

                    // 因请求是异步，无法保证时间先后，所以需判断
                    if (!this.groupMyId) {
                        that.groupPrice = that.suitTypes[0].discountPrice;
                        that.suitTypes.forEach(t => {
                            that.groupPrice = Math.min(that.groupPrice, t.discountPrice);
                        })

                        that.endTimeDown = res.data.suitEndTimeDown;
                        countDown(that.endTimeDown, time => {
                            that.endTimeDown = time
                        })
                    }
                });
                groupPro(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    that.suitDet = res.data;
                    that.suitDet.forEach(s => {
                        s.suitNum = 0
                    })

                });
                // 有用户拼团Id，说明这是一个已开的团，只能参团
                if (this.groupMyId) {
                    groupMyAddress(this.groupSuitId, this.groupMyId).then(res => {
                        if (res.errno !== 0) {
                            return;
                        }
                        that.groupMy = res.data.groupMy;
                        that.groupPrice = res.data.groupMy.discountPrice;
                        that.endTimeDown = res.data.groupMy.endTime - new Date().getTime()/1000;

                        countDown(that.endTimeDown, time => {
                            that.endTimeDown = time
                        })
                    });
                }
                getBrandId(that.groupSuitId).then(res => {
                    if (res.errno !== 0) {
                        return;
                    }
                    if (res.data && res.data.length === 1){
                        that.brandId = res.data[0]
                    }
                });
            },
            /**
             * 到提交订单页面
             */
            toSubmitOrder(isAloneBuy, isOpenGroup) {
                let isNum = 0;
                if (this.groupSuit.type === 2) {
                    let isNum = 0;
                    this.suitDet.forEach(s => {
                        isNum += s.buyNum
                    })
                    // if (isNum < 1) {
                    //     this.$parent.showErrMsg('至少选择一件');
                    //     return;
                    // }
                }
                if (!this.groupMyId && this.endTimeDown <= 0) {
                    this.$router.push('/group');
                    return;
                }
                let suitDet = this.suitDet
                let groupSuit = this.groupSuit
                let currentTime = new Date().getTime();
                let groupMyId = this.groupMyId;
                sessionStorage.setItem(
                    "suit_" + currentTime,
                    JSON.stringify(suitDet)
                );
                sessionStorage.setItem(
                    "groupSuit_" + currentTime,
                    JSON.stringify(groupSuit)
                );
                sessionStorage.setItem(
                    "suitType_" + currentTime,
                    JSON.stringify(this.suitTypes)
                );
                let path = "/confirmGroup?isAloneBuy="+isAloneBuy+"&groupKey=groupSuit_"+currentTime+"&suitKey=suit_" + currentTime+"&suitTypeKey=suitType_" + currentTime;
                if (!isOpenGroup) {
                    path = path + '&groupMyId=' + groupMyId;
                }
                this.$router.push(path);
            },
            addNumber(index, number) {
                if (this.suitDet[index].buyNum <= 0 && number < 0) {
                    return
                }
                this.suitDet[index].buyNum = this.suitDet[index].buyNum + number;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../static/swipe/swipe.min.css';
    @import '../../static/video-js/video-js.css';
    @import '../../static/video-js/custom-theme.css';
    @import "../../style/groupDet";
</style>

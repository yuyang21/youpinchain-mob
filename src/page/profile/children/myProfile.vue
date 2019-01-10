<template>
    <div class="profile_page">
        <section>
            <div class="profile-top-red"></div>
            <section class="profile-number">
                <div class="profile-link">
                    <img :src="userInfo.userImgUrl" alt="" class="privateImage" v-if="userInfo && userInfo.userImgUrl">
                    <div class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </div>
                    <p class="user-name">{{userInfo.username}}</p>
                </div>
            </section>
            <section class="info-data">
                <router-link to='/order' class="my-order" tag="div">
                    <span>我的订单</span>
                    <span class="to-all-order">
                        全部订单
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
                <ul class="clear">
                    <router-link to="/order/unpaid" tag="li" class="info-data-link">
                        <span class="info-data-top"><b class="red-points" v-if="userInfo.unpaid">{{userInfo.unpaid}}</b></span>
                        <span class="info-data-bottom">待支付</span>
                    </router-link>
                    <router-link to="/order/undelivery" tag="li" class="info-data-link">
                       <span class="info-data-top"><b class="red-points" v-if="userInfo.undelivery">{{userInfo.undelivery}}</b></span>
                       <span class="info-data-bottom">待发货</span>
                    </router-link>
                    <router-link to="/order/delivered" tag="li" class="info-data-link">
                        <span class="info-data-top"><b class="red-points" v-if="userInfo.delivered">{{userInfo.delivered}}</b></span>
                        <span class="info-data-bottom">已发货</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的收益 -->
                <router-link to='/profile/income' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>我的收益</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 我的优惠券 -->
                <router-link to='/coupon' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>我的优惠券</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 地址管理 -->
                <router-link to='/address' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>地址管理</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 联系客服 -->
                <div class="myorder" @click="showAlertTip = !showAlertTip">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>联系客服</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <!-- 关于我们 -->
                <!-- <router-link to='/aboutUs' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>关于我们</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link> -->
            </section>
            
        </section>
        <alert-tip :showAlertTip="showAlertTip" :type="2" :alertText='`<p>请添加客服微信 <br> Lsyp-123</p>`' v-show="showAlertTip"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import alertTip from "src/components/common/alertTip";
import footGuide from "src/components/footer/footGuide";
import { orderStat, userInfo } from '../../../service/getData';

export default {
  data() {
    return {
      showAlertTip: false,
      orderStat: {},
      userInfo: {
        userImgUrl: "",
        username: "",
        unpaid: 0,
        undelivery: 0,
        delivered: 0
      }
    };
  },
  mounted() {
      orderStat().then(res => {
          if(res.errno !== 0){
            return;
          }

          res.data.orderStat.forEach(stat => {
            if (stat.status == 101) {
              this.userInfo.unpaid = stat.count;
            }
            if (stat.status == 201 || stat.status == 200) {
              this.userInfo.undelivery = stat.count;
            }

            if (stat.status == 301) {
              this.userInfo.delivered = stat.count;
            }

          });

      }),

      userInfo().then(res => {
        if (res.errno == 0) {
          this.userInfo.userImgUrl = res.data.headImgUrl;
          this.userInfo.username = res.data.nickName;
        }
      })
  },
  components: {
    footGuide,
    alertTip
  },

  computed: {},

  methods: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "../../../style/myProfile";
</style>

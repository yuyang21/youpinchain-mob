<template>
  <div class="rating_page">
    <head-top head-title="我的优惠卷" go-back='true'></head-top>
    <section class="address">
      <ul class="addresslist">
        <li v-for='(item, index) in coupons' :key="index">
          <!--<span class="default-address"></span>-->
          <div class="address-detail">
            <p>{{item.money}}</p>
            <p>{{item.couponName}}</p>
            <p>{{item.describe}}</p>
            <p>有效期至：{{item.deadline}}</p>
          </div>
        </li>
      </ul>
      <div class="no_address" v-show="coupons.length === 0">暂无可使用的优惠卷哦～</div>
    </section>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {
        couponList
    } from '../../../service/getData'
    import loading from "src/components/common/loading";
    import {
        mapState,
        mapMutations
    } from 'vuex'


    export default {
        data() {
            return {
                coupons: [], //地址列表,
                showLoading: true //显示加载动画
            }
        },
        mounted() {
        },
        updated() {
        },
        created() {
            this.loadAddresses();
        },
        components: {
            headTop,
            loading
        },
        computed: {},
        props: [],
        methods: {
            loadAddresses() {
                couponList().then(res => {
                    this.coupons = res.data.couponUser;
                    this.showLoading = false;
                })
            }
        },
        watch: {}
    }
</script>


<style lang="scss" scoped>
  @import 'src/style/mixin';
  .rating_page {
    padding-bottom: .5rem;
    position: absolute;
    top: 0;
    z-index: 202;
    @include wh(100%, 100);
    p,
    span {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
  }

  .edit {
    right: 0.08rem;
    @include sc(0.14rem, $fc);
    @include ct;
  }

  .address {
    width: 100%;
    margin-top: .54rem;
    padding-bottom: .6rem;
    min-height: 4rem;
    .addresslist {
      li {
        margin: .16rem .12rem;
        padding: .21rem .17rem .25rem .57rem;
        @include fj(space-between);
        border-radius: 10px;
        background-color: $fc;
        box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.4);
        position: relative;
        @include bis('../../../images/coupon.jpg');
        .default-address {
          @include wh(.43rem, .42rem);
          position: absolute;
          left: 0;
          top: 0;
          @include bis('../../../images/add-slected.png');
        }
        .address-detail {
          position: relative;
          @include fj;
          p {
            float:left;
            line-height: 1.6;
            @include sc(.15rem, $fc);
            span {
              display: inline-block;
              @include sc(.15rem, $fc);
            }
          }
          p:first-child {
            @include sc(0.45rem, $fc);
          }
          p:nth-of-type(1) {
            margin-bottom: .24rem;
          }
        }
        .deletesite {
          display: flex;
          align-items: center;
          width: .5rem;
          span {
            display: block;
            @include wh(.23rem, .23rem);
            margin-left: .2rem;
            @include bis('../../../images/icon-edit-nor.png')
          }
        }
      }
    }
    .no_address {
      @include sc(.15rem, $g6);
      text-align: center;
      line-height: 6rem;
      background: $fc;
      position: fixed;
      bottom: .5rem;
      width: 100%;
    }
    .addsite {
      background: $red;
      @include wh(100%, .5rem);
      line-height: .5rem;
      position: fixed;
      bottom: 0;
      text-align: center;
      @include sc(.15rem, $fc);
      font-weight: bold;
    }
  }

  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(.4rem, 0, 0);
    opacity: 0;
  }
</style>

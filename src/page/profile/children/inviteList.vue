<template>
  <div class="inviteList header-top">
    <head-top head-title="我的邀请成员" go-back='true'></head-top>
    <div ref="mescroll" v-show="!showLoading">
      <ul class="content" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index">
          <img :src="item.headImgUrl" :class="{'noImage': !item.headImgUrl}" alt="头像">
        </li>
      </ul>
      <div v-else class="no_list">暂时没有邀请人，快去邀请吧！</div>
    </div>
    <div class="poster" v-show="showPoster">
      <p>1.长按屏幕保存图片</p>
      <p>2.将图片分享给好友或朋友圈</p>
      <div class="invite_landing" ref="test">
        <img :src="output" width="100%" v-if="showImages" ref="output"/>
        <div class="box" v-if="!showImages">
          <img src="../../../images/bounty-plan/share_poster.png" class="boxImg" alt="" >
          <div class="container" >
            <div class="title">&nbsp;领金条 &nbsp; 拍大奖 <br>拣金钻 &nbsp; 兑好物</div>
            <div class="qrcode" id="qrcode_1"></div>
            <div class="content">争做创世居民，送无门槛竞拍礼包，有实惠，优先享。</div>
          </div>
        </div>
      </div>
      <img @click="showPoster = false" src="../../../images/bounty-plan/close_model.png" alt="" width="30" class="close_model">
    </div>
    <div class="invite_btn" @click="sharePoster">邀请赚赏金</div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import MeScroll from '../../../static/mescroll/mescroll.min.js'
  import loading from "src/components/common/loading"
  import {QRCode} from '../../../plugins/qrcode.js'
  import {
    userInvites,
    inviteCode
  } from '../../../service/getData'
  export default {
    data () {
      return {
        list: [],
        showLoading: true,
        showPoster: false,
        qrcode: Object,
        url: '',
        output: null,
        showImages: false,
        finishedDraw: false
      }
    },
    mounted() {
      var that = this
      that.mescroll = new MeScroll(that.$refs.mescroll, {
        down: {
          use: true,
        },
        up: {
          callback: that.upCallback,
          page: {
            num: 0,
            size: 10,
          }
        }
      });
      that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
    },
    created () {
    },
    methods: {
      upCallback (page) {
        userInvites(page.num, page.size).then(res => {
          let arr = res.data.data;
          if (page.num === 1) this.list = [];
          var that = this;
          setTimeout(function () {
            that.list = that.list.concat(arr);
            // that.list = [];
            that.showLoading = false;
            that.$nextTick(() => {
              that.mescroll.endSuccess(arr.length, page.num < res.data.totalPages);
            })
          },300)
        }).catch((e)=> {
          this.mescroll.endErr();
        })
      },
      sharePoster () {
        var that = this
        //获取我的分享码
        inviteCode().then(res => {
          that.url = res.data
          that.qrcode = new QRCode(document.getElementById('qrcode_1'), {
            text: that.url,
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff'
          })
          that.showPoster = true
          if(that.finishedDraw){
            return
          }
          setTimeout(function (){
            if (that.url) {
              that.print()
            }
          }, 100)
          that.finishedDraw = true
        })
      },
      print() {
        const el = this.$refs.test;
        const options = {
          type: 'dataURL'
        }
        var that = this
        that.$html2canvas(el, options).then(function(result) {
          that.showImages = true
          that.output = result;
        });
      }
    },
    components: {
      headTop,
      loading
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../static/mescroll/mescroll.min.css';
  @import "src/style/mixin";
  .inviteList {
    background-color: $bc;
    position: relative;
    padding-bottom: .5rem;
    .no_list {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 3rem;
      color: $g9;
      background-color: $f5;
    }
    .content {
      margin-top: .15rem;
      overflow: auto;
      width: 100%;
      background-color: $fc;
      li {
        @include wh(25%, .775rem);
        float: left;
        border-bottom: .01rem solid $bc;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 76%;
          vertical-align: middle;
          background-color: $bc;
          border-radius: 50%;
          font-size: .12rem;
        }
        img.noImage {
          width: .565rem;
        }
      }
    }
    .invite_btn {
      @include sc(.15rem, $fc);
      @include wh(100%,.45rem);
      position: fixed;
      bottom: 0;
      background: #fc5340;
      line-height: .46rem;
      text-align: center;
      margin: .8rem auto 0;
    }
    .poster{
      position: absolute;
      top: 0;
      z-index: 9999;
      @include wh(100vw,100vh);
      background: rgba(0, 0, 0, 1);
      padding-top: .2rem;
      .close_model {
        position: absolute;
        bottom: .3rem;
        left: 47%;
      }
      p {
        @include sc(.15rem, $fc);
        text-align: center;
        font-weight: bold;
      }

      .invite_landing {
        overflow: hidden;
        position: relative;
        top: 0.3rem;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.8);
        @include wh(2.16rem, 3.84rem);
        img {
          display: block;
          position: relative;
          right: -1px;
          bottom: -2px;
        }
        .box {
          position: relative;
          width: 100%;
          height: 100%;
          .boxImg{
            @include wh(2.16rem, 3.84rem);
            position: absolute;
            left: 0;
            top: 0;
          }
          .container {
            position: relative;
            z-index: 111;
            margin: 0 auto;
            padding-top: 1.12rem;
            width: 80%;
            text-align: center;
            .title {
              @include sc(.11rem, $g3);
              height: .36rem;
              transform: scale(0.95) translate(.2rem, .05rem);
            }
            .content {
              @include sc(.11rem, $g3);
                transform: scale(0.8);
                width: 88%;
                margin-left: 6%;
            }
            .qrcode {
              @include wh(1.2rem,1.2rem);
              border-radius: .05rem;
              background: #000;
              margin: 0.12rem .26rem;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="user_center">
    <div class="container">
      <img :src="userInfo.headImgUrl" alt="" class="userImg">
      <p class="user_name">{{userInfo.nickName}}</p>
      <div class="user_id">
        <div>会员ID:{{userInfo.vipId}}</div>
        <div class="copy_btn" v-clipboard:copy="userInfo.vipId" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
      </div>
      <div class="qrcode_box">
        <p>我的邀请二维码</p>
        <div class="qrcode" id="qrcode"></div>
        <p>邀请1名好友+10金条</p>
      </div> 
    </div>
    <div class="gold_entry">
      <ul>
        <router-link tag="li" :to="'/bountyPlan/userCenter/goldRecord/0'"><img src="../../../../images/bounty-plan/money_reward_icon1.png" alt="" width="30"><span>我的金钻</span><img src="../../../../images/path.png" alt=""></router-link>
        <router-link tag="li" :to="'/bountyPlan/userCenter/goldRecord/1'"><img src="../../../../images/bounty-plan/money_reward_icon2.png" alt="" width="30"><span>我的金条</span><img src="../../../../images/path.png" alt=""></router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import {QRCode} from '../../../../plugins/qrcode.js'
  import { userInfo, inviteCode } from '../../../../service/getData'
  export default {
    data () {
      return {
        userInfo: {
          vipId: ''
        },
        qrcode: Object,
        url: ''
      }
    },
    watch: {

    },
    props: ['showErrMsg'],
    mounted() {
      var that = this
      userInfo().then(function(res){
        that.userInfo = res.data
      })
      //获取我的分享码
      inviteCode().then(res => {
          that.url = res.data
          that.qrcode = new QRCode(document.getElementById('qrcode'), {
              text: that.url,
              width: 150,
              height: 150,
              colorDark: '#000000',
              colorLight: '#ffffff'
          })
      })
    },
    created() {
    },
    methods: {
      onCopy () {
        this.$parent.$parent.showErrMsg('复制成功')
      },
      onError () {
        this.$parent.$parent.showErrMsg('复制失败，请手动选择复制')
      }
    },
  }
</script>
<style lang="scss" scoped>
  .user_center{
    background-color: $bc;
    min-height: 100vh;
  }
  .userImg{
    @include wh(.9rem, 0.9rem);
    margin: 0 auto;
    display: block;
    border-radius: 50%;
  }
  .container{
    @include bis('../../../../images/bounty-plan/starry_sky_bg2.png');
    text-align: center;
    padding: .2rem 0 .36rem;
    .qrcode_box {
      @include wh(2.69rem, 2.32rem);
      margin: 0 auto;
      background: $fc;
      border-radius: .1rem;
      padding: .05rem 0 .1rem 0;
      .qrcode {
        @include wh(1.41rem,1.41rem);
        border-radius: .05rem;
        background: #000;
        margin: 0.12rem auto .05rem;
      }
      p{
        line-height: 1.6;
      }
      p:first-child{
        @include sc(.15rem,$g3);
        line-height: .4rem;
        border-bottom: 1px solid $gd;
        margin-bottom: .14rem;
      }
      p:last-child{
        @include sc(.13rem,$g6);
      }
    }
    .user_id{
      @include sc(.12rem,$fc);
      overflow: hidden;
      width: 2.4rem;
      margin: 0.14rem auto;
      position: relative;
      height: .18rem;
      div{
        @include sc(.12rem,$fc);
        float: right;
        line-height: .18rem;
        position: absolute;
        top: 0;
        right: 0;
      }
      div:first-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        width: 100%;
      }
      div:last-child{
        z-index: 10;
      }
      .copy_btn{
        background: rgba(252, 76, 66, .56);
        padding: 0 .06rem;
        border-radius: .02rem;
      }
    }
    .user_name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      margin: .2rem 0 .1rem;
      color: $fc;
      font-size: .18rem;
    }
  }
  .added{
    width: .665rem;
    margin-bottom: .08rem;
  }
  .gold_entry{
    background: $fc;
    border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
    margin-top: -.1rem;
    ul {
      li{
        height: .55rem;
        line-height: .55rem;
        clear: both;
        overflow: hidden;
        @include sc(.15rem, $g6);
        span{
          float: left;
        }
        img:first-child{
          float: left;
          width: .32rem;
          margin: .17rem .19rem .17rem .14rem;
        }
        img:last-child{
          float: right;
          width: .1rem;
          margin: .18rem .1rem;
        }
      }
      li:first-child{
        border-bottom: 1px solid $bc; 
      }
    }
  }
</style>

<template>
  <div class="income header-top">
    <head-top head-title="我的收益" go-back='true'></head-top>
    <ul class="number_statistics">
      <li>
        <p>邀请人数</p>
        <p>{{profileInfo.inviteNum}}人</p>
      </li>
      <li>
        <p>下单人数</p>
        <p>{{profileInfo.inviteOrderNum}}人</p>
      </li>
    </ul>
    <div class="royalty_ratio">
      <div class="panel_title">当前邀请用户奖励提成比</div>
      <div class="content">
        <div class="tips">
          <u>如何提高比率</u>
          <img src="../../../images/group/icon.png" alt="">
        </div>
        <ul class="img">
          <li v-for="(item,index) in levels" :key="index" :class="{'level': level === item.id}"></li>
          <hr color="#FCC931" width="88%" height=".025rem">
        </ul>
        <ul class="levels">
          <li v-for="(item,index) in levels" :key="index">{{item.name}}</li>
        </ul>
        <p class="text">奖励：<br> 用户下单金额*(有效下单人数提成比+邀请用户提成比)</p>
      </div>
    </div>
    <div class="myincome">
      <div class="title">
        <p class="left"><img src="../../../images/mine-income.png" alt="">我的收益</p>
        <router-link tag="div" :to="'/profile/incomeDetails'" class="right">查看收益明细<img src="../../../images/path.png" alt=""></router-link>
      </div>
      <ul class="content">
        <li>
          <p><span>¥</span>{{todayInfo.todayAmount}}</p>
          <p>今日收益</p>
        </li>
        <li>
          <p><span>¥</span>{{todayInfo.todayOrderAmount}}</p>
          <p>今日下单金额</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.invitePayNum}}</p>
          <p>用户累计下单</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.totalAmount}}</p>
          <p>累计收益</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.totalAmount - profileInfo.canWithdrawAmount - profileInfo.alreadyWithdrawAmount}}</p>
          <p>预估收益余额</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.alreadyWithdrawAmount}}</p>
          <p>已累计提现</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.canWithdrawAmount}}</p>
          <p>可提现金额</p>
        </li>
        <li>
          <div class="btn">申请提现</div>
        </li>
      </ul>
      <div class="tips">
        <p>说明：</p>
        <p><span class="left">1.</span><span class="left">余额中包含所有已付款用户，如果发生退款则会扣除未成功的金额 </span></p>
        <p><span class="left">2.</span><span class="left">头衔：根据邀请用户数+有效下单数量计算</span></p>
        <p><span class="left">3.</span><span class="left">具体收益细则请查看明细</span></p>
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import footGuide from "src/components/footer/footGuide";
  import {
    accountsInfo,
    todayProfit,
    rewardGrade
  } from '../../../service/getData'
  export default {
    data () {
      return {
        profileInfo: {},
        todayInfo: {},
        levels: [
          {
            id: 1,
            name: '短工'
          },
          {
            id: 2,
            name: '长工'
          },
          {
            id: 3,
            name: '贫民'
          },
          {
            id: 4,
            name: '富农'
          },
          {
            id: 5,
            name: '土豪'
          }
        ],
        level: null
      }
    },
    created () {
      this.getInfo();
    },
    methods: {
      getInfo () {
        var that = this
        accountsInfo().then(function (res) {
          that.profileInfo = res.data
        })
        todayProfit().then(function (res) {
          that.todayInfo = res.data
        })
        rewardGrade().then((res) => {
          that.level = res.data.id
        })
      }
    },
    components: {
      headTop,
      footGuide
    }
  }
</script>
<style lang="scss" scoped>
  @import "src/style/mixin";
  .income {
    background-color: $bc;
    padding-bottom: .48rem;
    .number_statistics {
      overflow: hidden;
      background-color: $fc;
      margin-bottom: .15rem;
      li {
        overflow: hidden;
        height: .55rem;
        line-height: .55rem;
        padding: 0 .15rem;
        p:first-child {
          float: left;
          @include sc(.15rem, $g6);
          text-align: left;
        }
        p:last-child {
          float: right;
          @include sc(.15rem, $red);
          text-align: right;
        }
      }
      li:first-child {
        border-bottom: .01rem solid $bc;
      }
    }
    .royalty_ratio {
      .content {
        overflow: hidden;
        clear: both;
        width: 100%;
        background-color: $fc;
        padding: .15rem .2rem;
        margin: 0 auto;
        .tips {
          float: right;
          @include sc(.13rem, $g6);
          img {
            @include wh(.165rem, .165rem);
            vertical-align: sub;
            margin-left: .03rem;
          }
        }
        .levels {
          overflow: hidden;
          width: 100%;
          text-align: center;
          .img {
            margin: .15rem 0 .0;
          }
          li {
            float: left;
            width: 20%;
            @include sc(.14rem, $g3);
          }
        }
        .text {
          @include sc(.13rem, $g6);
          text-align: left;
          line-height: 1.7;
          padding: .15rem 0 0.07rem .1rem;
        }
        .img {
          overflow: hidden;
          clear: both;
          position: relative;
          height: 1.2rem;
          hr {
            margin-top: 1.12rem;
          }
          li {
            float: left;
            background-color: #FDE749;
            width: .29rem;
            position: absolute;
            bottom: 0.15rem;
            border-radius: .025rem;
          }
          li:nth-child(1) {
            height: .28rem;
            left: 6%;
          }
          li:nth-child(2) {
            height: .38rem;
            left: 26%;
          }
          li:nth-child(3) {
            height: .48rem;
            left: 46%;
          }
          li:nth-child(4) {
            height: .58rem;
            left: 66%;
          }
          li:nth-child(5) {
            height: .68rem;
            left: 86%;
          }
          li.level{
            &:before {
              content: '';
              display: block;
              @include wh(.24rem,.24rem);
              background: url('../../../images/profile/icon.png') no-repeat 0 0;
              background-size: 100% 100%;
              position: absolute;
              top: -.28rem;
              left: .015rem;
            }
          }
        }
      }
      .panel_title {
        padding-left: .1rem;
      }
    }
    .myincome {
      background-color: $fc;
      margin-top: .15rem;
      border-radius: .1rem .1rem 0 0;
      .title {
        @include wh(100%,.55rem);
        overflow: hidden;
        line-height: .55rem;
        padding: 0 .13rem;
        .left {
          @include sc(.15rem,$g6);
          img {
            @include wh(.29rem,.29rem);
            vertical-align: middle;
            margin: -.03rem .15rem 0 0;
          }
        }
        .right {
          @include sc(.13rem,$g6);
          img {
            @include wh(.1rem,.175rem);
            vertical-align: text-bottom;
            margin-left: .15rem;
          }
        }
      }
      .content {
        overflow: hidden;
        border-top: .01rem solid $bc;
        li {
          float: left;
          @include wh(50%,.715rem);
          p:first-child {
            @include sc(.24rem, $red);
            margin: .12rem 0 .06rem .12rem;
            height: .28rem;
            span {
              font-size: .18rem;
              margin-right: .05rem;
              font-weight: normal;
            }
          }
          p:last-child {
            @include sc(.13rem,$g9);
            margin-left: .12rem;
          }
          .btn {
            @include wh(1.085rem,.3rem);
            @include sc(.13rem,$fc);
            background-color: $red;
            text-align: center;
            line-height: .3rem;
            border-radius: .15rem;
            margin: .2075rem 0 0 .05rem;
          }
        }
        li:nth-child(even) {
          border-left: .01rem solid $bc; 
          border-bottom: .01rem solid $bc; 
        }
        li:nth-child(odd) {
          border-bottom: .01rem solid $bc; 
        }
        li:last-child {
          border-left: none;
        }
      }
      .tips {
        @include sc(.13rem, $g6);
        line-height: 1.9;
        padding: .15rem .15rem .3rem;
        p {
          @include sc(.13rem, $g6);
          margin-bottom: .12rem;
          overflow: hidden;
          span {
            @include sc(.13rem, $g6);
            line-height: 1.4;
          }
          span:nth-child(even) {
            width: 95%;
            padding-left: .05rem;
          }
        }
      }
    }
  }
</style>
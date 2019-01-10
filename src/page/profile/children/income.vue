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
        <p>{{profileInfo.invitePayNum}}人</p>
      </li>
    </ul>
    <!--<div class="royalty_ratio">-->
      <!--<div class="panel_title">当前邀请用户奖励提成比</div>-->
      <!--<div class="content">-->
        <!--&lt;!&ndash;<div class="tips">&ndash;&gt;-->
          <!--&lt;!&ndash;<u>如何提高</u>&ndash;&gt;-->
          <!--&lt;!&ndash;<img src="../../../images/group/icon.png" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<ul class="img">-->
          <!--<li v-for="(item,index) in levels" :key="index" :class="{'level': level === item.sortNo}"></li>-->
          <!--<hr color="#FCC931" width="88%" height=".025rem">-->
        <!--</ul>-->
        <!--<ul class="levels">-->
          <!--<li v-for="(item,index) in levels" :key="index"-->
            <!--:style="{width: 100 / levels.length + '%'}">{{item.name}}</li>-->
        <!--</ul>-->
        <!--<p class="text">奖励：<br> 用户下单金额*(有效下单人数提成比+邀请用户提成比)</p>-->
      <!--</div>-->
    <!--</div>-->
    <div class="myincome">
      <div class="title">
        <p class="left"><img src="../../../images/mine-income.png" alt="">我的收益</p>
        <router-link tag="div" :to="'/profile/incomeDetails'" class="right">查看收益明细<img src="../../../images/path.png" alt=""></router-link>
      </div>
      <ul class="content">
        <li>
          <p><span>¥</span>{{todayInfo.todayAmount || 0}}</p>
          <p>今日收益</p>
        </li>
        <li>
          <p><span>¥</span>{{todayInfo.todayOrderAmount || 0}}</p>
          <p>今日下单金额</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.invitePayAmount || 0}}</p>
          <p>用户累计下单</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.totalAmount || 0}}</p>
          <p>累计收益</p>
        </li>
        <li>
          <p><span>¥</span>{{(profileInfo.totalAmount - profileInfo.canWithdrawAmount - profileInfo.alreadyWithdrawAmount) || 0}}</p>
          <p>预估收益余额</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.alreadyWithdrawAmount || 0}}</p>
          <p>已累计提现</p>
        </li>
        <li>
          <p><span>¥</span>{{profileInfo.canWithdrawAmount || 0}}</p>
          <p>可提现金额</p>
        </li>
        <li>
          <div class="btn" :class="{'disabled': profileInfo.canWithdrawAmount <= 0}" @click="withdraws(profileInfo.canWithdrawAmount)">申请提现</div>
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
    rewardGrade,
    withdraws,
    rewardGrades
  } from '../../../service/getData'
  export default {
    data () {
      return {
        profileInfo: {},
        todayInfo: {},
        levels: [],
        level: null,
        busy: false,
        rewardGrades: {}
      }
    },
    props: ['showErrMsg'],
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
        // rewardGrade().then((res) => {
        //   that.level = res.data.sortNo
        // })
        // rewardGrades().then(res => {
        //   that.levels = res.data.data
        // })
      },
      withdraws (amount) {
        var that = this;
        if (that.busy) {
          return;
        }
        that.busy = true;
        setTimeout(function () {
          that.busy = false;
        }, 2000)
        if (amount <= 0) {
          // that.$parent.showErrMsg('可提现金额需大于0');
          return;
        }
        withdraws(amount).then(res => {
          if (res.errno !== 0) {
            that.$parent.showErrMsg(res.errmsg);
          } else {
            that.$parent.showErrMsg('提现成功');
            that.getInfo();
          }
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
  @import "../../../style/income";
</style>

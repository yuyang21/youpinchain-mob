<template>
  <div class="origins">
    <div class="header">
      <div class="info">
        <p>
          <span>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种</span>
          <span>苏淮猪</span>
        </p>
        <p class="margin-b-2">
          <span>生&nbsp;长&nbsp;周&nbsp;期</span>
          <span>2018.1-2018.9</span>
        </p>
        <p>
          <span>住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>   
          <span>南农大淮安研究院猪场</span>
        </p>
        <div>
          <span>区块链地址</span>
          <p>96e4d64ea35bd5ae1a97506b0ffba5efd7753bbcb84b0966f648738b3078243c</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import {
   source
 } from '../../service/getData';
  export default {
    data () {
      return {
      }
    },
    mounted () {
      source().then(function (res) {

      })
    },
  }
</script>
<style scoped lang="scss">
  @import '../../style/mixin';
  .origins {
    .header {
      @include wh(100%,6.095rem);
      background: #1d1b1c url('../../images/origins/header.png') no-repeat 0 0;
      background-size: 100%;
      padding-top: 3.5rem;
      .info {
        @include wh(3.36rem,2.315rem);
        border-radius: .1rem;
        background-color: $fc;
        border: solid .04rem #a7d646;
        margin: 0 auto;
        padding: .5rem .12rem 0 .34rem;
        p {
          margin-bottom: .15rem;
          // overflow: hidden;
          width: 100%;
          span:nth-child(1) {
            @include sc(.128rem,#a7d646);
            font-weight: bold;
            line-height: 1.49;
            clear: both;
            float: left;
          }
          span:nth-child(2) {
            @include sc(.118rem,$g3);
            line-height: 1.62;
            font-weight: bold;
            margin-left: .225rem;
            float: left;
            width: 60%;
          }
        }
        .margin-b-2 {
          margin-bottom: .22rem;
        }
      }
    }
  }
</style>

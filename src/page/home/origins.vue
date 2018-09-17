<template>
  <div class="origins">
    <div class="header">
      <div class="info">
        <p>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种
          <span>苏淮猪</span>
        </p>
        <p>生&nbsp;长&nbsp;周&nbsp;期
          <span>2018.1-2018.9</span>
        </p>
        <p>住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址   
          <span>南农大淮安研究院猪场</span>
        </p>
        <p>区块链地址   
          <span>xxxx</span>
        </p>
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
        padding: .54rem .12rem 0 .34rem;
        p {
          font-weight: bold;
          line-height: 1.49;
          margin-bottom: .15rem;
          @include sc(.128rem,#a7d646);
          span {
            @include sc(.118rem,$g3);
            line-height: 1.62;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>

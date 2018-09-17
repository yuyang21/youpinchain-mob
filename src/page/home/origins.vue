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
        <p>
          <span>区块链地址</span>
          <span>96e4d64ea35bd5ae1a97506b0ffba5efd7753bbcb84b0966f648738b3078243c</span>
        </p>
      </div>
    </div>
    <div class="growth-environment">
      <div class="abstract">
        <img src="../../images/origins/ball-grey.png" alt="" class="padding-top-20">
        <p class="subject_c">猪肉分割</p>
        <p class="subject_e subtitle">TEST PROOF</p>
      </div>
      <div class="video_box">
        <img src="../../images/origins/audio-bg.png" alt="">
        <p>生长环境</p>
      </div>
      <ul>
        <li>
          <img src="../../images/origins/growth_01.png" alt="" class="list_img">
          <span>现代化智能示范级养殖基地</span>
        </li>
        <li v-for="item in growth_list">
          <img :src="item.url" alt="" class="list_img">
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>
    <div class="test-proof">
      <div class="abstract">
        <img src="../../images/origins/ball-white.png" alt="" class="padding-top-20">
        <p class="subject_c">猪肉分割</p>
        <p class="subject_e subtitle">TEST PROOF</p>
      </div>
      <div class="imgBox">
        <img src="../../images/origins/testProof_1.jpg" alt="">
        <img src="../../images/origins/testProof_2.jpg" alt="">
      </div>
      <p class="tip">综合无抗养殖技术，确保舌尖上的美味安全</p>
    </div>
    <div class="pork-segmentation">
      <div style="position: relative; z-index: 1;" class="abstract">
        <img src="../../images/origins/ball-green.png" alt="" class="padding-top-20">
        <p class="subject_c" style="color: #a6d543;">猪肉分割</p>
        <p class="subject_e subtitle" style="color: #a6d543;">PORK SEGMENTATION</p>
      </div>
      <img src="../../images/origins/segmentation.png" alt="" width="90%" style="margin-top: -.15rem;">
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
        growth_list: [{
          url: require('../../images/origins/growth_02.png'),
          text: '生长性能测定站'
        },
        {
          url: require('../../images/origins/growth_03.png'),
          text: '超声波雾化消毒机'
        },{
          url: require('../../images/origins/growth_04.png'),
          text: '空气源热泵地暖'
        },{
          url: require('../../images/origins/growth_05.png'),
          text: '24小时监控系统'
        },{
          url: require('../../images/origins/growth_06.png'),
          text: '猪场养殖环境'
        }],
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
  div{ word-wrap: break-word; word-break: normal; }
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
    .growth-environment{
      background: #e6e1e3;
      text-align: center;
      padding: 0 .2rem .22rem;
      .video_box{
        width: 100%;
        img{
          width: 100%;
          display: block;
        }
        p{
          @include sc(.13rem, #333333);
          line-height: .35rem;
          background: $fc;
        }
      }
      .abstract{
        img{
          padding-top: .2rem;
        }
        .subject_c{
          @include sc(.24rem,#333333);
        }
        .subject_e{
          @include sc(.12rem,#999999);
          margin-bottom: .21rem;
        }
      }
      ul{
        margin-top: .53rem;
        li{
          @include wh(100%, 1.86rem);
          background: #afafaf;
          border-radius: .05rem;
          @include sc(.13rem, $fc);
          margin-bottom: .15rem;
        }
        li:nth-child(odd){
          padding: .06rem .125rem .06rem .06rem;
          img{
            float: left;
            @include wh(2.75rem, auto);
          }
          span{
            float: right;
            width: .205rem;
            font-size: .13rem;
            line-height: 1;
            padding-top: .1rem;
            position: relative;
            padding-left: .08rem;
          }
          span:before{
            position: absolute;
            content: '';
            @include wh(.015rem,.49rem);
            border-radius:.01rem;
            left: 0;
            top: 0.1rem;
            background: $fc;
          } 
        }
        li:nth-child(even){
          padding: .06rem .06rem .06rem .125rem;
          img{
            float: right;
            @include wh(2.75rem, auto);
          }
          span{
            float: left;
            width: .205rem;
            font-size: .13rem;
            line-height: 1;
            padding-top: .1rem;
            position: relative;
            padding-right: .08rem;
          }
          span:after{
            position: absolute;
            content: '';
            @include wh(.015rem,.49rem);
            border-radius:.01rem;
            right: 0;
            top: 0.1rem;
            background: $fc;
          } 
        }
      }
    }
    .test-proof{
      background: #1a1a19;
      text-align: center;
      padding: 0 .27rem .2rem;
      .abstract{
        img{
          padding-top: .2rem;
        }
        .subject_c{
          @include sc(.24rem,$fc);
        }
        .subject_e{
          @include sc(.12rem,rgba(255, 255, 255, 0.6));
          margin-bottom: .21rem;
        }
      }
      .imgBox{
        margin-bottom: .36rem;
        img{
          width: 100%;
          display: block;
          margin: 0.14rem auto;
        }
      }
      .tip{
        @include sc(.13rem,$fc);
      }
    }
    .pork-segmentation{
      background: #ffffff;
      padding-bottom: 40px;
      text-align: center;
      padding-left: .12rem;
      padding-right: .12rem;
      .padding-top-20{
        padding-top: .2rem;
      }
    }
    .abstract{
      text-align: center;
      img{
        display: block;
        margin: 0 auto;
        width: .42rem;
      }
      .subject_c{
        font-size: .24rem;
        margin: .12rem auto .08rem;
        line-height: .2rem;
      }
      .subject_e{
        font-size: .12rem;
      }
    }
  }
</style>

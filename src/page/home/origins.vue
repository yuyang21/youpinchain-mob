<template>
  <div class="origins">
    <div class="header">
      <ul class="info">
        <li>
          品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种
          <p>苏淮猪</p>
        </li>
        <li class="margin-b-2">
          生&nbsp;长&nbsp;周&nbsp;期
          <p>2018.1-2018.9</p>
        </li>
        <li class="margin-b-2">
          住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址 
          <p>南农大淮安研究院猪场</p>
        </li>
        <li>
          区块链地址
          <p class="overflow-hi">96e4d64ea35bd5ae1a97506b0ffba5efd7753bbcb84b0966f648738b3078243c</p>
        </li>
        <img src="../../images/origins/pig-avatar.png" alt="">
      </ul>
    </div>
    <div class="growth">
      <div class="title">
        <img src="../../images/origins/ball-green.png" alt="">
        <p class="text_cn">成长溯源</p>
        <p class="text_en">THT SOURCE OF GROWTH</p>
      </div>
      <ul>
        <li v-for="(item,index) in growth" :key="index">
          <div class="left">
            <div class="step">{{item.stage}}</div>
            <p class="text">{{item.text}}</p>
            <p class="time">{{item.time}}</p>
          </div>
          <div class="right">
            <img :src="item.imgUrl" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="genealogy">
      <div class="title">
        <img src="../../images/origins/ball-grey.png" alt="">
        <p class="text_cn">品牌描述</p>
        <p class="text_en">TRACEABILITY OF GENEALOGY</p>
        <p class="text_cn">黑猪界的贵族，不含抗生素</p>
      </div>
      <div class="video">
        <video src="https://zhenpin.datbc.com/video/tech.mp4" :poster="videoBox"></video>
        <p class="desr">无抗养殖技术</p>
      </div>
      <div class="text">
        <p>科学家团队养殖</p>
        <div class="desr_text">苏淮猪养殖方法由南京农业大学黄瑞华教授团队30年潜心研究，饲养人员均为具有农业大学硕士及以上学历的人员，保障全过程科学健康养殖。</div>
        <p>国际顶级的生长环境</p>
        <div class="desr_text">智能化恒温宿舍，进口全自动饲养设备，国际顶尖科研级设备全天候精准监测猪的生长与环境数据，精心呵护苏淮猪的生活品质。</div>
        <p>专家团队贴身护理</p>
        <div class="desr_text">专家团队研究分析猪的每天生长性能数据，科学化计算配备采食量、料肉比。所用饲料不添加激素、不含抗生素，保证无抗绿色健康肉质。</div>
        <p class="ft-18">代化的屠宰包装</p>
        <div class="desr_text">由现代化企业进行屠宰，先电击后屠宰最大程度降低应激反应，冷库排酸，专业分割人员按照订单规范化分割，并采用真空独立包装，保障每件产品的新鲜。</div>
      </div>
    </div>
    <div class="feed">
      <div class="title">
        <img src="../../images/origins/ball-green.png" alt="">
        <p class="text_cn">饲料配方</p>
        <p class="text_en">TRACEABILITY OF GENEALOGY</p>
      </div>
      <div class="video">
        <video src="https://zhenpin.datbc.com/video/tech.mp4" :poster="videoBox"></video>
        <p class="desr bg-green ft-white">无抗饲料</p>
        <div class="text">
          <p>微生物发酵饲料</p>
          <div class="desr_text">采用微生物发酵饲料原料加工而成的饲料为微生物发酵饲料。微生物发酵饲料益于动物的消化、促进动物健康。苏淮猪食用的饲料均为微生物发酵、低蛋白、高纤维、低矿物元素的无抗生素饲料。</div>
        </div>
        <ul>
          <li>
            <img src="../../images/origins/feed_01.png" alt="">
            <span></span>
            <p>超微沸石粉</p>
          </li>
          <li>
            <img src="../../images/origins/feed_02.png" alt="">
            <span></span>
            <p>蛋白配方</p>
          </li>
          <li>
            <img src="../../images/origins/feed_03.png" alt="">
            <span></span>
            <p>米糠配方</p>
          </li>
        </ul>
        <p class="tip">严格选用配方原料，饲料企业定制加工</p>
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
        growth: [
          {
            stage: '出生保育',
            text: '淮阴种猪场',
            time: '1月15日-6月2日',
            imgUrl: require('../../images/origins/growth_source_01.png')
          },
          {
            stage: '育肥出栏',
            text: '南农大淮安研究院猪场',
            time: '6月2日-9月16日',
            imgUrl: require('../../images/origins/growth_source_02.png')
          },
          {
            stage: '屠宰排酸',
            text: '江苏淮安苏食肉品有限公司',
            time: '9月17日-9月18日',
            imgUrl: require('../../images/origins/growth_source_03.png')
          },
          {
            stage: '分割包装',
            text: '南农大淮安研究院',
            time: '9月18日-9月19日',
            imgUrl: require('../../images/origins/growth_source_04.png')
          }
        ],
        videoBox: require('../../images/origins/audio-bg.png')
      }
    },
    mounted () {
      source().then(function (res) {
        // this.growth = res.data
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
        padding: .5rem 0 0 .1rem;
        position: relative;
        li {
          margin-bottom: .15rem;
          @include sc(.128rem,#a7d646);
          font-weight: bold;
          line-height: 1.49;
          p {
            @include sc(.118rem,$g3);
            line-height: 1.62;
            font-weight: bold;
            margin-left: .225rem;
            display: inline-block;
            width: 60%;
          }
        }
        .margin-b-2 {
          margin-bottom: .22rem;
        }
        img {
          position: absolute;
          top: .14rem;
          right: .14rem;
          @include wh(1.16rem,1.07rem);
        }
      }
    }
    .title {
      margin: 0 auto;
      text-align: center;
      img {
        @include wh(.42rem,.41rem);
        display: block;
        margin: 0 auto;
      }
      .text_cn {
        line-height: 0.83;
        margin: .12rem 0 .08rem;
        font-size: .24rem;
      }
      .text_en {
        line-height: 1.63;
        letter-spacing: 1px;
        font-size: .12rem;
      }
    }
    .growth {
      padding: .32rem .3rem 0.15rem .18rem;
      .title {
        .text_cn, .text_en {
          color: #7eaf17;
        }
      }
      ul {
        margin: .23rem auto 0;
        li {
          margin-bottom: .31rem;
          height: 1.06rem;
          clear: both;
          .left {
            text-align: center;
            padding-top: .15rem;
            padding-left: .1rem;
            width: 36%;
            .step {
              @include wh(.925rem,.355rem);
              background: url('../../images/origins/box-bg.png') no-repeat 0 0;
              background-size: 100%;
              line-height: .355rem;
              @include sc(.17rem,$fc);
              padding-right: .03rem;
              position: relative;
              margin-bottom: .09rem;
              &:after {
                content: '';
                display: block;
                border-radius: 60%;
                position: absolute;
                @include wh(.06rem,.065rem);
                background-color: $fc;
                border: solid 2px #a7d646;
                right: -.15rem;
                top: .11rem;
              }
            }
            .text {
              @include sc(.13rem,$g3);
              margin-left: -.23rem;
            }
            .time {
              @include sc(.13rem,rgba(102, 102, 102, 0.7));
              margin-left: -.23rem;
            }
          }
          .right {
            width: 60.5%;
            img {
              float: right;
              width: 100%;
            }
          }
        }
      }
    }
    .video {
      video {
        @include wh(100%,1.56rem);
        margin-top: .08rem;
        display: block;
      }
      .desr {
        @include wh(100%,.35rem);
        line-height: .35rem;
        background: $fc;
        @include sc(.13rem,$g3);
        text-align: center;
      }
      .bg-green {
        background: #a6d543;
      }
      .ft-white {
        color: $fc;
      }
    }
    .genealogy, .feed {
      background-color: #272626;
      padding: .2rem .2rem 0.02rem;
      .title {
        .text_cn {
          color: $fc;
        }
        .text_en {
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .text {
        margin-top: .25rem;
        p {
          @include sc(.15rem, $fc);
          line-height: 1.39;
          margin-bottom: .025rem;
        }
        .ft-18 {
          font-size: .18rem;
        }
        .desr_text {
          @include sc(.13rem, $fc);
          line-height: 1.87;
          margin-bottom: .25rem;
        }
      }
    }
    .feed {
      background: $fc;
      padding-top: .3rem;
      .title {
        .text_cn, .text_en {
          color: #7eaf17;
        }
      }
      .video {
        margin-top: .25rem;
        .text {
          p {
            @include sc(.15rem,$g3);
            font-weight: bold;
          }
          .desr_text {
            @include sc(.13rem,$g6);
            line-height: 1.8;
          }
        }
      }
      ul {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        li {
          float: left;
          width: 27.33%;
          text-align: center;
          margin: 0 auto;
          img {
            border-radius: 50%;
            border: 4px solid #292323;
            background: #292323;
            width: 100%;
            display: block;
            margin-bottom: .025rem;
          }
          span {
            background: url('../../images/origins/formula_1.png') no-repeat 0.03rem .01rem;
            background-size: 100%;
            @include wh(100%,.12rem);
            border-radius: .35rem;
            display: block;
            margin: 0 auto;
          }
          p {
            line-height: 1.5;
            @include sc(.12rem,$g6);
            margin-top: .06rem;
            padding-left: .1rem;
          }
        }
        li:nth-child(2) {
          margin: 0 .26rem;
        }
      }
      .tip {
        line-height: 1.92;
        @include sc(.13rem,$g3);
        font-weight: bold;
        text-align: center;
        margin: .2rem auto .3rem;
      }
    }
  }
</style>

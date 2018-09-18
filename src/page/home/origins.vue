<template>
  <div class="origins">
    <div class="header">
      <div class="card">
        <img src="../../images/origins/ball-white.png" alt="">
        <p class="title">区块苏淮猪身份证</p>
        <p class="en">BLOCK CHAIN SUHUAI PIG IDENTITY CARD</p>
        <hr>
        <p class="support">技术支持:重庆数资区块链研究院 &nbsp;|&nbsp; 南京农业大学淮安研究院</p>
      </div>
      <ul class="info">
        <li>
          品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种
          <p>苏淮猪</p>
        </li>
        <li class="margin-b-2">
          生&nbsp;长&nbsp;周&nbsp;期
          <p>{{birth}}-{{pack}}</p>
        </li>
        <li class="margin-b-2">
          住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址 
          <p>南农大淮安研究院猪场</p>
        </li>
        <li>
          区块链地址
          <p class="overflow-hi">{{blockChainHS}}</p>
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
            <p class="time">{{item.startTime}}-{{item.endTime}}</p>
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
        <p class="text_en">BRAND DESCRIPTION</p>
        <p class="text_cn">黑猪界的贵族，不含抗生素</p>
      </div>
      <div class="video" @click="playVideo('tech')">
        <video src="https://zhenpin.datbc.com/video/tech.mp4" id="tech" width="100%" height="1.56rem"></video>
        <img :src="videoBox" alt="">
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
        <p class="text_en">FEED FORMULA</p>
      </div>
      <div class="video" @click="playVideo('feed')">
        <video src="https://zhenpin.datbc.com/video/feed.mp4" id="feed" width="100%" height="1.56rem"></video>
        <img :src="videoBox" alt="">
        <p class="desr bg-green ft-white">无抗饲料</p>
      </div>
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
    <div class="growth-environment">
      <div class="abstract">
        <img src="../../images/origins/ball-grey.png" alt="" class="padding-top-20">
        <p class="subject_c">生长环境</p>
        <p class="subject_e subtitle">GROWTH ENVIRONMENT</p>
      </div>
      <div class="video_box" @click="playVideo('env')">
        <video src="https://zhenpin.datbc.com/video/env.mp4" id="env"  width="100%" height="1.56rem"></video>
        <img :src="videoBox" alt="">
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
        <p class="subject_c">无抗检验证明</p>
        <p class="subject_e subtitle">TEST PROOF</p>
      </div>
      <div class="imgBox">
        <img src="../../images/store/test_report.png" alt="">
        <img src="../../images/store/feeding_09.png" alt="">
      </div>
      <p class="tip">综合无抗养殖技术，确保舌尖上的美味安全</p>
    </div>
    <div class="test-proof">
      <div class="abstract">
        <img src="../../images/origins/ball-white.png" alt="" class="padding-top-20">
        <p class="subject_c">动物检疫合格证明</p>
        <p class="subject_e subtitle">TEST PROOF</p>
      </div>
      <div class="imgBox">
        <img src="../../images/store/certificates_01.png" alt="">
        <p class="tip">动物检疫合格证明，确保舌尖上的美味安全</p>
      </div>
    </div>
    <div class="test-proof">
      <div class="abstract">
        <img src="../../images/origins/ball-white.png" alt="" class="padding-top-20">
        <p class="subject_c">肉品品质检验合格证明</p>
        <p class="subject_e subtitle">TEST PROOF</p>
      </div>
      <div class="imgBox">
        <img src="../../images/store/certificates_02.png" alt="">
        <p class="tip">肉品品质检验合格证明，确保舌尖上的美味安全</p>
      </div>
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
 import {Utils} from '../../service/Utils'
 import {
   source
 } from '../../service/getData';
  export default {
    data () {
      return {
        growth_list: [
          {
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
            url: require('../../images/store/growth_01.png'),
            text: '猪场养殖环境'
          }
        ],
        growth: [],
        videoBox: require('../../images/origins/audio-bg.png'),
        blockChainHS: '',
        birth: '',
        pack: ''
      }
    },
    mounted () {
      Utils.isIos() ? document.querySelectorAll('video')[0].setAttribute('controls', 'controls') : null
      Utils.isIos() ? document.querySelectorAll('video')[1].setAttribute('controls', 'controls') : null
      Utils.isIos() ? document.querySelectorAll('video')[2].setAttribute('controls', 'controls') : null
      var that = this
      source().then(function (res) {
        that.blockChainHS = res.data.blockChainHS
        var time = res.data
        that.birth = time.birth ? (time.birth.split('.')[0] + '.' + time.birth.split('.')[1]) : '2018.1'
        that.pack = time.pack ? time.pack.split('.')[0] + '.' + time.pack.split('.')[1] : '2018.9'
        that.growth = [
          {
            stage: '出生保育',
            text: '淮阴种猪场',
            startTime: time.birth ? (time.birth.split('.')[1] + '月' + time.birth.split('.')[2] + '日') : '1月15日',
            endTime: time.fatten ? (time.fatten.split('.')[1] + '月' + time.fatten.split('.')[2] + '日') : '6月2日',
            imgUrl: require('../../images/origins/growth_source_01.png')
          },
          {
            stage: '育肥出栏',
            text: '南农大淮安研究院猪场',
            startTime: time.fatten ? (time.fatten.split('.')[1] + '月' + time.fatten.split('.')[2] + '日') : '6月2日',
            endTime: time.outPigsty ? (time.outPigsty.split('.')[1] + '月' + time.outPigsty.split('.')[2] + '日') : '9月16日',
            imgUrl: require('../../images/origins/growth_source_02.png')
          },
          {
            stage: '屠宰排酸',
            text: '江苏淮安苏食肉品有限公司',
            startTime: time.acidExcretion ? (time.acidExcretion.split('.')[1] + '月' + time.acidExcretion.split('.')[2] + '日') : '9月17日',
            endTime: time.slaughter ? (time.slaughter.split('.')[1] + '月' + time.slaughter.split('.')[2] + '日') : '9月18日',
            imgUrl: require('../../images/origins/growth_source_03.png')
          },
          {
            stage: '分割包装',
            text: '南农大淮安研究院',
            startTime: time.slaughter ? (time.slaughter.split('.')[1] + '月' + time.slaughter.split('.')[2] + '日') : '9月18日',
            endTime: time.pack ? (time.pack.split('.')[1] + '月' + time.pack.split('.')[2] + '日') : '9月19日',
            imgUrl: require('../../images/origins/growth_source_04.png')
          }
        ]
      })
    },
    methods: {
      playVideo (id) {
        var tech = document.getElementById('tech')
        var feed = document.getElementById('feed')
        var env = document.getElementById('env')
        var video = document.getElementById(id);
        video.nextElementSibling.style.display = 'none'
        video.play();
        video.style.width = '100%'
        if (id === 'tech') {
          feed.nextElementSibling.style.display = 'block'
          env.nextElementSibling.style.display = 'block'
        } else if (id === 'feed') {
          tech.nextElementSibling.style.display = 'block'
          env.nextElementSibling.style.display = 'block'
        } else {
          tech.nextElementSibling.style.display = 'block'
          feed.nextElementSibling.style.display = 'block'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../style/mixin';
  div{ word-wrap: break-word; word-break: normal; }
  video::-webkit-media-controls-panel {
    background: rgba(0,0,0,.6);
    height: .23rem;
    position: absolute;
    bottom: 0;
    z-index: 2;
  }
  .origins {
    .header {
      @include wh(100%,6.095rem);
      background: #1d1b1c url('../../images/origins/header.png') no-repeat 0 0;
      background-size: 100%;
      padding: .5rem .22rem;
      .card {
        border-radius: .1rem;
        background-color: rgba(0,0,0,.6);
        @include wh(100%,2.06rem);
        margin: 0 auto .85rem;
        text-align: center;
        padding: .14rem 0 .29rem;
        .title {
          @include sc(.3rem,$fc);
          letter-spacing: .024rem;
          margin-top: .3rem;
        }
        .en {
          @include sc(.07rem,rgba(255, 255, 255, 0.78));
          letter-spacing: 3.4px;
          text-shadow: 0px 1.5px 9px #504d4b;
          transform: scale(.95) translateX(-4.2%);
          width: 110%;
        }
        hr {
          @include wh(2.045rem,.01rem);
          background: rgba(255,255,255,.15);
          border: none;
          margin-top: .07rem;
        }
        .support {
          @include sc(.11rem,$fc);
          line-height: 1.73;
        }
        img {
          width: .42rem;
          border: 1px solid $fc;
          border-radius: 50%;
          padding: .02rem;
        }
      }
      .info {
        @include wh(100%,2.315rem);
        border-radius: .1rem;
        background-color: $fc;
        border: solid .04rem #a7d646;
        margin: 0 auto;
        padding: .45rem 0 0 .1rem;
        position: relative;
        li {
          margin-bottom: .12rem;
          @include sc(.128rem,#a7d646);
          font-weight: bold;
          line-height: 1.49;
          display: flex;
          p {
            @include sc(.118rem,$g3);
            line-height: 1.62;
            font-weight: bold;
            margin-left: .225rem;
            display: inline-block;
            width: 60%;
            vertical-align: top;
          }
        }
        .margin-b-2 {
          margin-bottom: .22rem;
        }
        img {
          position: absolute;
          top: .1rem;
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
        font-size: .12rem;
      }
    }
    .growth {
      padding: .32rem .3rem 0.1rem .18rem;
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
      position: relative;
      img {
        position: absolute;
        top: 0;
        width: 100%;
        // pointer-events: none;
      }
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
      padding: .2rem .2rem 0.05rem;
      .title {
        .text_cn {
          color: $fc;
        }
        .text_en {
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .video {
        margin-top: .15rem;
      }
      .text {
        margin-top: .25rem;
        p {
          @include sc(.15rem, $fc);
          line-height: 1.39;
          margin-bottom: .02rem;
          font-weight: bold;
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
      .text {
        margin-bottom: .4rem;
        p {
          @include sc(.15rem,$g3);
          font-weight: bold;
        }
        .desr_text {
          @include sc(.13rem,$g6);
          line-height: 1.8;
        }
      }
      .video {
        margin-top: .25rem;
      }
      ul {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        li {
          float: left;
          width: 27%;
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
            background: url('../../images/origins/formula_1.png') no-repeat 0.035rem .01rem;
            background-size: 100%;
            @include wh(100%,.14rem);
            border-radius: .35rem;
            display: block;
            margin: 0 auto;
          }
          p {
            line-height: 1.5;
            @include sc(.12rem,$g6);
            margin-top: .045rem;
            padding-left: .1rem;
          }
        }
        li:nth-child(2) {
          margin: 0 8.2%;
        }
      }
      .tip {
        line-height: 1.92;
        @include sc(.13rem,$g3);
        font-weight: bold;
        text-align: center;
        margin: .2rem auto .23rem;
      }
    }
    .growth-environment{
      background: #e6e1e3;
      text-align: center;
      padding: 0 .2rem .22rem;
      .video_box{
        position: relative;
        width: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          // pointer-events: none;
        }
        video{
          width: 100%;
          height: 1.56rem;
          margin-top: .08rem;
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

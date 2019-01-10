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
        <p class="text_en">THE SOURCE OF GROWTH</p>
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
        <p class="ft-18">现代化的屠宰包装</p>
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
  @import '../../style/origins';
</style>

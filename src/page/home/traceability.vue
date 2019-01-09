<template>
  <div class="traceability">
    <div class="top">
      黑猪界的贵族&nbsp;•&nbsp;舌尖上的美味！
    </div>
    <div class="part_1">
      <ul>
        <li class="border_bg">南京农业大学黄瑞华教授30年精心培育，科学养殖打造“一家杀猪百家香”的优质猪种。</li>
        <li class="border_bg">养殖环境全程可控，先进的养殖环境与设施既确了保猪生长环境的可控性，也可以不断优化猪舍环境。</li>
        <li class="border_bg">饲料无抗生物发酵，不添加激素、抗生素等。添加微生物菌剂，增强生猪的抵抗力，对于疫苗严格按照免疫程序进行接种。根据不同日龄猪实行标准化、程序化添加，以改善肉质。</li>
        <li class="border_bg">由专业屠宰企业进行规范化屠宰、冷链排酸后，通过冷链物流运到位于智慧谷的规范化分割包装加工间，由专业小刀手进行细分割，并采用先进的密封小包装。 </li>
      </ul>
    </div>
    <div class="growth">
      <div class="header part part1">
        <img src="../../images/store/growth_01.png" width="100%">
        <p class="title">生长环境</p>
        <div class="text">猪场位于淮安市现代农业科技示范园内，是一所占地约3500平方米的智慧型现代化猪场。猪场运用现代化的设施设备不断优化猪舍环境，确保猪生长环境的可控性。</div>
      </div>
      <div class="part part6">
        <img class="left" src="../../images/store/growth_05.png" width="56%">
        <div class="text right">生长性能测定站</div>
      </div>
      <div class="part part7">
        <div class="text left">空气源热泵地暖</div>
        <img class="right" src="../../images/store/growth_06.png" width="56%">
      </div>
      <div class="part part8">
        <img class="left" src="../../images/store/growth_07.png" width="56%">
        <div class="text right">监控系统</div>
      </div>
      <div class="part part7">
        <div class="text left multiline">自动刮粪系统及保温型粪尿异位发酵处理系统等设施设备</div>
        <img class="right" src="../../images/store/growth_08.png" width="56%">
      </div>
      <div class="part part6">
        <img class="left" src="../../images/store/growth_09.png" width="56%">
        <div class="text right">环境监测</div>
      </div>
    </div>
    <div class="source">
      <p class="title">成长溯源</p>
      <ul>
        <li v-for="item in pigMsgList">
          <img :src="item.imgUrl" alt="">
          <div>
            <p>{{item.msg1}}</p>
            <p>{{item.msg2}}<br>{{item.msg3}}</p>
          </div>
        </li>
      </ul>
      <img src="../../images/store/growth_14.png" alt="" width="100%">
    </div>
    <div class="part_bottom">
      <div class="part">
        <div class="title">屠宰车间</div>
        <p>配备了先进的生猪屠宰、肉制品加工设备（关键设备均从欧美等国进口）和产品质量安全检测设备。占地面积208亩,拥有10000吨低温冷库和1000吨预冷库、急冻库。</p>
      </div>
      <div class="part">
        <div class="title">检测报告</div>
        <img src="../../images/store/test_report.png" alt="" width="90%">
        <img src="../../images/store/feeding_09.png" alt="" width="90%">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pigMsgList: [{
          msg1: '出生保育',
          msg2: '2月5日-6月3日',
          msg3: '淮阴种猪场',
          imgUrl: require('../../images/store/growth_10.png')
        },
        {
          msg1: '育肥出栏',
          msg2: '6月14日',
          msg3: '转栏至南农大淮安研究院试验猪场',
          imgUrl: require('../../images/store/growth_11.png')
        },
        {
          msg1: '屠宰排酸',
          msg2: '9月17日',
          msg3: '江苏淮安苏食肉品有限公司',
          imgUrl: require('../../images/store/growth_12.png')
        },
        {
          msg1: '分割包装',
          msg2: '9月18日',
          msg3: '南农大淮安研究院',
          imgUrl: require('../../images/store/growth_13.png')
        },]
      }
    },
    watch: {

    },
    mounted() {
      
    },
    created() {
      
    },
    methods: {

    },
  }
</script>
<style scoped lang="scss">
  @import '../../style/traceability';
</style>

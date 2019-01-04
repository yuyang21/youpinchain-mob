<template>
  <div class="introduceHome">
    <div class="part_1">
      <ul>
        <li class="border_bg">科学家团队养殖。苏淮猪养殖方法由南京农业大学黄瑞华教授团队30年潜心研究，饲养人员为农业大学硕士以上学历，保障科学健康养殖。</li>
        <li class="border_bg">国际顶级的生长环境。智能化恒温宿舍，进口全自动饲养设备，国际顶尖科研级设备全天候精准监测猪的生长与环境数据，精心呵护苏淮猪的生活品质。</li>
        <li class="border_bg">专家团队贴身护理。专家团队每天研究分析猪的生长性能数据，科学化计算配备采食量、料肉比。饲料不添加激素、不含抗生素，保证无抗绿色健康肉质。</li>
        <li class="border_bg">由专业屠宰企业进行规范化屠宰、冷链排酸后，通过冷链物流运到位于智慧谷的规范化分割包装加工间，由专业小刀手进行细分割，并采用先进的密封小包装。 </li>
      </ul>
    </div>
    <div class="part_2">
      <div class="goods" v-for="item in productList">
        <div class="abstract"><strong>·</strong>&nbsp;&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;<strong>·</strong></div>
        <img :src="item.thumbnailPic" alt="" class="" :class="{'noImage': !item.thumbnailPic}">
        <p>{{item.name}}{{item.netContent}}*1{{item.packing}}</p>
        <p>原价：￥{{item.originalPrice | number}}</p>
        <p>预售价：￥<span>{{item.presentPrice | number}}</span>/{{item.netContent}}</p>
        <router-link tag="p" :to="'/goods/' + item.id">立即购买</router-link>
      </div>
      <div class="load_more"><router-link tag="button" to="/">查看更多商品</router-link></div>
    </div>
    <div class="part_3">
      <ul>
        <li>
          <div class="title">肉鲜味美，重拾儿时的味道！</div>
          <p>无抗猪肉，使用无抗生物发酵饲料饲养，内脏吃得放心，更适合孕妇、儿童；</p>
          <p>生长周期8-10个月；</p>
          <p>营养丰富，富含氨基酸、蛋白质、不饱和脂肪酸等营养物质；</p>
          <p>肌内脂含量高，肉嫩多汁、适口性强，真正小时候猪肉的味道</p>
        </li>
        <li>
          <img src="../../../images/store/introduce_03.png" alt="">
          <div class="title">肉鲜味美，重拾儿时的味道！</div>
          <p>专业冷链仓储，严控温度区间；专业冷链保温箱，环保降解专用袋，为新鲜品质保驾护航最后一公里。</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { productHotList } from '../../../service/getData'
  export default {
    data () {
      return {
        productList: null,
      }
    },
    watch: {

    },
    mounted() {
      var that = this
      productHotList(1,2).then(function (res) {
        that.productList = res.data.productList
      })
    },
    created() {
    },
    methods: {
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../style/introduce';
</style>


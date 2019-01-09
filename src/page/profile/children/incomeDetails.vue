<template>
  <div class="income_details header-top">
    <head-top head-title="收益明细" go-back='true'></head-top>
    <div ref="mescroll" v-show="!showLoading">
      <ul v-if="detailList.length > 0">
        <li v-for="(item,index) in detailList" :key="index">
          <p>{{item.createTime | dateWithHourMin('.')}}</p>
          <p class="ellipsis" align="center">{{item.describe}}</p>
          <p>{{item.amount > 0 ? '+' : ''}}{{item.amount}}</p>
        </li>
      </ul>
      <div v-else class="no_list">暂无记录</div>
    </div>
    <transition name="loading">
        <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import MeScroll from '../../../static/mescroll/mescroll.min.js'
  import loading from "src/components/common/loading"
  import {
    incomeDeals
  } from '../../../service/getData'
  export default {
    data () {
      return {
        detailList: [],
        mescroll: null,
        showLoading: true
      }
    },
    mounted() {
      var that = this
      that.mescroll = new MeScroll(that.$refs.mescroll, {
          down: {
            use: true,
          },
          up: {
              callback: that.upCallback,
              page: {
                num: 0,
                size: 10,
              }
          }
      });
      that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
    },
    created () {
    },
    methods: {
      upCallback (page) {
        incomeDeals(page.num, page.size).then(res => {
          let arr = res.data.data;
          if (page.num === 1) this.detailList = [];
          var that = this;
          setTimeout(function () {
            that.detailList = that.detailList.concat(arr);
            that.showLoading = false;
            that.$nextTick(() => {
              that.mescroll.endSuccess(arr.length, page.num < res.data.totalPages);
            })
          },300)
        }).catch((e)=> {
          this.mescroll.endErr();
        })
      }
    },
    components: {
      headTop,
      loading
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../static/mescroll/mescroll.min.css';
  @import "../../../style/incomeDetail";
</style>

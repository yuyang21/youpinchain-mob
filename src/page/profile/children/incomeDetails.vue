<template>
  <div class="income_details header-top">
    <head-top head-title="收益明细" go-back='true'></head-top>
    <ul ref="mescroll">
      <li v-for="(item,index) in detailList" :key="index">
        <p>{{item.createTime | dateWithHourMin('.')}}</p>
        <p class="ellipsis" align="center">{{item.describe}}</p>
        <p>{{item.amount > 0 ? '+' : ''}}{{item.amount}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import MeScroll from '../../../static/mescroll/mescroll.min.js'
  import {
    incomeDeals
  } from '../../../service/getData'
  export default {
    data () {
      return {
        detailList: [],
        mescroll: null
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
          this.showLoading = false;
          let arr = res.data.data;
          if (page.num === 1) this.detailList = [];
          var that = this;
          setTimeout(function () {
            that.detailList = that.detailList.concat(arr);
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
      headTop
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../static/mescroll/mescroll.min.css';
  @import "src/style/mixin";
  .income_details {
    ul {
      overflow: hidden;
      background-color: $fc;
      width: 100%;
      clear: both;
      li {
        @include wh(100%, .55rem);
        border-bottom: .01rem solid $bc;
        line-height: .55rem;
        padding: 0 .12rem;
        clear: both;
        overflow: hidden;
        // box-sizing: content-box;
        p {
          float: left;
          @include sc(.15rem, $g6);
          width: 32%;
        }
        p:nth-child(2) {
          width: 48%;
        }
        p:last-child {
          color: $red;
          text-align: right;
          width: 20%;
        }
      }
    }
  }
</style>

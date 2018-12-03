<template>
  <div class="income_details header-top">
    <head-top head-title="收益明细" go-back='true'></head-top>
    <ul>
      <li v-for="(item,index) in detailList" :key="index">
        <p>{{item.createTime | date('.')}}</p>
        <p class="ellipsis">{{item.describe}}</p>
        <p>{{item.amount > 0 ? '+' : ''}}{{item.amount}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import {
    incomeDeals
  } from '../../../service/getData'
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        detailList: []
      }
    },
    created () {
      this.getDetail(this.page, this.size)
    },
    methods: {
      getDetail (page, size) {
        var that = this
        incomeDeals(page, size).then((res) => {
          that.detailList = res.data.data
        })
      }
    },
    components: {
      headTop
    }
  }
</script>
<style lang="scss" scoped>
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
          width: 30%;
        }
        p:nth-child(2) {
          width: 50%;
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
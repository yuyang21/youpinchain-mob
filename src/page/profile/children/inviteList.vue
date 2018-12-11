<template>
  <div class="inviteList header-top">
    <head-top head-title="我的邀请成员" go-back='true'></head-top>
    <div ref="mescroll" v-show="!showLoading">
      <ul class="content" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index">
          <img :src="item.headImgUrl" :class="{'noImage': !item.headImgUrl}" alt="头像">
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
    userInvites
  } from '../../../service/getData'
  export default {
    data () {
      return {
        list: [],
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
        userInvites(page.num, page.size).then(res => {
          let arr = res.data.data;
          if (page.num === 1) this.list = [];
          var that = this;
          setTimeout(function () {
            that.list = that.list.concat(arr);
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
  @import "src/style/mixin";
  .inviteList {
    background-color: $bc;
    .no_list {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 3rem;
      color: $g9;
      background-color: $f5;
    }
    .content {
      margin-top: .15rem;
      overflow: hidden;
      width: 100%;
      background-color: $fc;
      li {
        @include wh(25%, .775rem);
        float: left;
        border-bottom: .01rem solid $bc;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 76%;
          vertical-align: middle;
          background-color: $bc;
          border-radius: 50%;
          font-size: .12rem;
        }
        img.noImage {
          width: .565rem;
        }
      }
    }
  }
</style>
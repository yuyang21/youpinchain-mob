<template>
  <div class="inviteList header-top">
    <head-top head-title="我的邀请成员" go-back='true'></head-top>
    <ul class="content">
      <li v-for="(item, index) in list" :key="index">
        <img :src="item.headImgUrl" :class="{'noImage': !item.headImgUrl}" alt="头像">
      </li>
    </ul>
  </div>
</template>
<script>
  import headTop from '../../../components/header/head'
  import {
    userInvites
  } from '../../../service/getData'
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        list: []
      }
    },
    created () {
      this.getList(this.page, this.size)
    },
    methods: {
      getList (page, size) {
        var that = this
        userInvites(page, size).then(function (res) {
          that.list = res.data.data
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
  .inviteList {
    background-color: $bc;
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
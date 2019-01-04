<template>
    <div class="introduce">
        <ul class="tabs">
            <li v-for="(item,index) in brandDatas" :key="index" :class="{'active': activeTab == item.id}" @click="switchTab(item.id)">{{item.name}}</li>
        </ul>
        <div class="introduceHome">
            <template v-for="item in brandsPic">
                <video :src="item" @click="playVideo('video'+item.id)" :id="'video'+item.id" v-if="item.indexOf('.mp4') !== -1" style="width: 100%" tabindex="-1"></video>
                <img :src="item" v-else-if="item !== 'goods'" style="width: 100%">
                <div class="part_2" v-if="item === 'goods'">
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
            </template>
        </div>
    </div>
</template>
<script>
    import {
        brands,
        productHotList,
        brandsPics
    } from '../../../service/getData'
  export default {
    data () {
      return {
        activeTab: 0,
        brandDatas: [],
        productList: null,
        brandsPic:null
      }
    },
    watch: {

    },
    mounted() {
        var that = this
        brands(this.$route.params.brandId).then(res => {
            console.info(res)
            that.brandDatas = res.data
            that.activeTab = res.data[0].id
            that.getPic(that.activeTab)
        })

        productHotList(1,2).then(function (res) {
            that.productList = res.data.productList
        })
    },
    created() {
    },
    methods: {
        switchTab: function (index) {
            var that = this
            if (that.activeTab !== index) {
                that.activeTab = index
                that.getPic(that.activeTab)
            }
        },
        getPic: function (dataId) {
            var that = this
            brandsPics(dataId).then(res => {
                that.brandsPic = res.data
                console.info(that.brandsPic)
            })
        },
        playVideo (id) {
            var video = document.getElementById(id);
            video.play();
            video.style.width = '100%'
        }
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
    @import '../../../style/introduce';
</style>


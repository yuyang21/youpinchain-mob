<template>
    <div class="introduce">
        <ul class="tabs">
            <li v-for="(item,index) in brandDatas" :key="index" :class="{'active': activeTab == item.id}" @click="switchTab(item.id)">{{item.name}}</li>
        </ul>
        <div class="introduceHome">
            <template v-for="item in brandsPic">
                <img :src="item" v-if="item !== 'goods'" style="width: 100%">
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
        }
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
    @import '../../../style/mixin';
    .introduce {
        padding-top: .45rem;
        .tabs {
            @include wh(100%,.45rem);
            @include sc(.15rem,$g6);
            line-height: .45rem;
            background: $fc;
            position: fixed;
            top: 0;
            z-index: 9;
            li {
                float: left;
                @include wh(33.33%,.45rem);
                border-bottom: 1px solid $ge;
                text-align: center;
            }
            li.active {
                color: #e73525;
                font-weight: 500;
                position: relative;
                &:after {
                    content: '';
                    display: block;
                    @include wh(.36rem,.03rem);
                    border-radius: 1.5px;
                    background-color: #e73525;
                    position: absolute;
                    bottom: -2px;
                    left: 33%;
                }
            }
        }
    }

    @import '../../../style/mixin';
    .introduceHome {
        background: $fc;
        .part_1{
            ul{
                padding: .3rem .47rem .35rem;
                li{
                    margin-top: .3rem;
                    border-top: 1px solid $gd;
                    padding-top: .1rem;
                    @include sc(.13rem, $g6);
                    text-align: justify;
                }
                li:first-child{
                    margin-top: 0rem;
                }
            }
        }
        .part_2{
            padding-bottom: .5rem;
            background-color: #efeff4;
            .load_more{
                border-top: 1px solid #f8f8f8;
                padding: .2rem 0;
                background: $fc;
                button{
                    width: 35%;
                    height: 0.28rem;
                    font-size: 0.14rem;
                    color: #e4372e;
                    background-color: #fff;
                    margin: 0rem auto;
                    text-align: center;
                    line-height: .28rem;
                    border-radius: 15px;
                    border: 1px solid #e4372e;
                    display: block;
                }
            }
            .goods{
                @include wh(100%, 5.8rem);
                @include bis('../../../images/store/introduce_bg.png');
                background-color: $bc;
                background-position: 0 .4rem;
                background-size: 100% auto;
                text-align: center;
                img{
                    @include wh(2.2rem, 2.2rem);
                    display: block;
                    margin: 0 auto;
                    padding-top: .9rem;
                }
                .abstract{
                    @include sc(.2rem ,#fcfbfc);
                    padding-top: .4rem;
                    font-weight: bold;
                    line-height: .5rem;
                    strong{
                        font-size: .4rem;
                        vertical-align: middle;
                        line-height: 0.5rem;
                    }
                }
                p{
                    margin-bottom: .04rem;
                }
                p:nth-child(3){
                    padding-top: .2rem;
                    @include sc(.2rem, $g3);
                }
                p:nth-child(4){
                    @include sc(.15rem, $g9);
                }
                p:nth-child(5){
                    @include sc(.17rem, $g3);
                    span{
                        font-size: .25rem;
                    }
                }
                p:last-child{
                    border-radius: .15rem;
                    background-color: #e73525;
                    line-height: .325rem;
                    height: .325rem;
                    width: 1rem;
                    margin: 0 auto;
                    @include sc(.15rem, $fc);
                    margin-top: .12rem;
                }
            }

        }
        .part_3{
            background: $fc;
            padding-bottom: .3rem;
            ul{
                li:nth-child(even){
                    background: $bc;
                }
                li:nth-child(2){
                    img{
                        width: 100%;
                        display: block;
                    }
                    p:last-child{
                        padding-bottom: .4rem;
                        margin-bottom: 0;
                    }
                }
                li{
                    background: $fc;
                    p{
                        @include sc(.13rem, $g6);
                        padding: 0 .29rem;
                        margin-bottom: .1rem;
                        text-align: justify;
                    }
                    p:last-child{
                        margin-bottom: .25rem;
                    }
                }
            }
            .title{
                @include sc(.2rem, $g3);
                text-align: center;
                padding: .3rem 0;
            }
        }
    }
    .border_bg{
        position: relative;
        &:before{
            content: '';
            @include wh(.06rem, .06rem);
            position: absolute;
            border-top: 1px solid $gd;
            border-left: 1px solid $gd;
            background: $fc;
            transform:rotate(45deg);
            left: 50%;
            top: -.04rem;
            z-index: 1;
        }
    }
</style>


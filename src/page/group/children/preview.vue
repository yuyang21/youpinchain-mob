<template>
    <div class="mescroll" ref="mescroll">
        <div>
            <section id="hot_goods">
                <ul class="goodslistul clear">
                    <li v-for="item in preview" :key="item.id">
                        <router-link tag="div" :to="'/groupDet/' + item.id">
                            <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                            <div class="left goods_info">
                                <p class="name">{{item.suitName}}</p>
                                <p class="desr">{{item.describe}}</p>
                                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                                <p class="price"><span class="RMB">￥</span>{{item.minimumPrice}}
                                    <s>￥{{item.suitPrice}}</s></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter"
                            v-for="(item,index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item"></span>
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
    import footGuide from "src/components/footer/footGuide";
    import {
        groupList
    } from "../../../service/getData";

    export default {
        data() {
            return {
                showMoveDot: [], //控制下落的小圆点显示隐藏
                preview: [],
                hasMore: false,
            };
        },
        async beforeMount() {
        },
        mounted() {
            groupList().then(res => {
                this.preview = res.data.preview
                //this.hasMore = res.data.totalPages > this.page
            })
        },
        created() {

        },
        components: {},
        computed: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>
    @import '../../../static/mescroll/mescroll.min.css';
    @import '../../../style/preview';
</style>

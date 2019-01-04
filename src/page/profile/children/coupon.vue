<template>
    <div class="rating_page">
        <head-top head-title="我的优惠卷" go-back='true'></head-top>
        <section class="address">
            <div class="input-new" v-if="confirmOrder">
                <p class="setDefault">不使用优惠卷</p>
                <div style="display:flex;align-items:center;margin-right: .1rem;">
                    <div class="wrap" @click="nonuse()">
                        <my-switch size="md" open-name="" close-name="" v-model="checked" v-bind:disabled="checked"></my-switch>
                    </div>
                </div>
            </div>
            <ul class="addresslist">
                <li v-for='(item, index) in coupons'
                    :class="{unavailable: goodsPrice && (goodsPrice < item.money || goodsPrice < item.condition)}"
                    @click="selectOrEdit(item, index)" :key="index">
                    <span class="default-address" v-show="choosedCoupon && choosedCoupon.id === item.id"></span>
                    <div class="address-detail">
                        <p>{{item.money}}</p>
                        <p>{{item.couponName}}</p>
                        <p v-if="item.couponType === 1" v>{{item.condition}}</p>
                        <p>{{item.describe}}</p>
                        <p>有效期至：{{item.deadline}}</p>
                    </div>
                </li>
            </ul>
            <div class="no_address" v-show="coupons.length === 0">暂无可使用的优惠卷哦～</div>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import mySwitch from '../../../components/common/vue-switch';
    import {
        couponList
    } from '../../../service/getData'
    import loading from "src/components/common/loading";
    import {
        mapState,
        mapMutations
    } from 'vuex'


    export default {
        data() {
            return {
                coupons: [], //优惠卷列表,
                showLoading: true, //显示加载动画
                goodsPrice: '',
                choosedCoupon: '',
                checked: false,
                confirmOrder: false
            }
        },
        mounted() {
            if (this.$route.query.path === 'confirmOrder'){
                this.goodsPrice = JSON.parse(sessionStorage.getItem('goodsPrice'));
                this.confirmOrder = true;
                this.choosedCoupon = JSON.parse(sessionStorage.getItem('choosedCoupon'));
            }
        },
        updated() {
        },
        created() {
            this.loadAddresses();
        },
        components: {
            headTop,
            loading,
            'my-switch': mySwitch
        },
        computed: {},
        props: [],
        methods: {
            loadAddresses() {
                couponList().then(res => {
                    this.coupons = res.data.couponUser;
                    this.showLoading = false;
                })
            },
            selectOrEdit(coupon, index) {
                if (this.goodsPrice < coupon.money || this.goodsPrice < coupon.condition) {
                    this.checked = true;
                    return;
                }
                this.checked = false;
                if (this.$route.query.path === 'confirmOrder') {
                    sessionStorage.setItem('choosedCoupon', JSON.stringify(coupon));
                    this.$router.go(-1);
                }
            },
            nonuse(){
                if (this.checked){
                    sessionStorage.setItem('choosedCoupon', '');
                    this.choosedCoupon = '';
                }
            }
        },
        watch: {}
    }
</script>


<style lang="scss" scoped>
    @import '../../../style/coupon';
</style>

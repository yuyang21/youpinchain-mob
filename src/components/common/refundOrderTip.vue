<template>
    <div class="mask-common mask1" v-client-height>
        <div class="alert-wrap">
            <div class="text">
                <p>确定要申请退款吗？请填写退款说明!</p>
                <textarea maxlength="50" style="width: 100%;border-radius:7px;"
                          placeholder="建议留言前先与客服进行确认,50字以内"
                          v-model="refund"></textarea>
            </div>
            <div class="i-know">
                <div @click="cancelAlertTip()">取消</div>
                <div @click="confirmAlertTip()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ModalHelper
    } from '../../service/Utils'

    export default {
        name: 'refundOrderTip',
        data() {
            return {
                refund: ''
            }
        },
        props: {
            'showRefundOrderTip': {
                type: Boolean
            },
            'orderId': {
                type: Number
            }
        },
        watch: {
            '$parent.showRefundOrderTip': function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
            }
        },
        mounted() {
        },
        created() {
        },
        methods: {
            confirmAlertTip() {
                this.$parent.showRefundOrderTip = false
                this.$emit('fn')
                this.$parent.refundOrderTip(this.orderId, this.refund)
            },
            cancelAlertTip() {
                this.$parent.showRefundOrderTip = false;
            }
        },
        components: {},
        desrtoyed() {
        }
    }
</script>

<style lang="scss" scoped>

    .mask-common {
        position: fixed;
        top: 0;
        z-index: 999999;
        bottom: -5px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background-color: rgba(0, 0, 0, 0.9);
        -webkit-overflow-scrolling: touch;
        overflow-y: hidden !important;
        text-align: center;
    }

    .i-know {
        display: flex;
        @include sc(.18rem, $g3);
        line-height: .46rem;
        background-color: $fc;
        border-radius: 0 0 .2rem .2rem;
    }

    .i-know div {
        flex: 1;
    }

    .i-know div:first-child {
        color: $g3;
        border-right: 1px solid $gd;
    }

    .i-know div:last-child {
        color: $red;
    }

    .mask1 .alert-wrap .text {
        @include sc(.18rem, $g3);
        height: 1rem;
        padding: .3rem .2rem 0;
        border-bottom: 1px solid $gd;
        border-radius: .2rem .2rem 0 0;
        line-height: 1.33;
    }

    .mask1 .alert-wrap {
        @include wh(2.995rem, 1.47rem);
        border-radius: 10px;
        background-color: #f5fcff;
        margin: 1.2rem auto;
    }
</style>

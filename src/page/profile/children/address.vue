<template>
<div class="rating_page">
    <head-top head-title="地址管理" go-back='true'></head-top>
    <section class="address">
        <ul class="addresslist">
            <li v-for='(item, index) in adressList' @click="selectOrEdit(item, index)" :key="index">
                <span class="default-address" v-show="choosedAddressIndex === index && selectedAddress"></span>
                <div class="address-detail">
                    <p>{{item.detailedAddress}}</p>
                    <p><span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.mobile}}</span></p>
                </div>
                <div class="deletesite" @click.stop="toEdit(item, index)">
                    <span></span>
                </div>
            </li>
        </ul>
        <div class="no_address" v-show="adressList.length === 0">您还没有添加过地址哦～</div>
        <div @click="toAddAddress()">
            <div class="addsite">
                + 添加新地址
            </div>
        </div>
    </section>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import headTop from 'src/components/header/head'
import {
    getAddressList
} from '../../../service/getData'
import {
    mapState,
    mapMutations
} from 'vuex'


export default {
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        if (to.name == 'addressList'){
            this.loadAddresses();
        }
        next();
    },
    data() {
        return {
            adressList: [], //地址列表,
            choosedAddressIndex: -1, // 用户选中的地址
            selectedAddress: true
        }
    },
    mounted() {
    },
    updated() {
    },
    created() {
        if (this.$route.query.path !== 'confirmOrder') {
            this.selectedAddress = false;
        }
        this.loadAddresses();
    },
    components: {
        headTop,
    },
    computed: {},
    props: [],
    methods: {
        loadAddresses() {
            getAddressList(1, 100).then(res => {
                this.adressList = res.data;
                if (localStorage.getItem('choosedAddress')) {
                    var index = -1;
                    let choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
                    this.adressList.forEach(address => {
                        index++;
                        if (choosedAddress && address.id == choosedAddress.id) {
                            this.choosedAddressIndex = index;
                        }
                    });
                }
            })
        },
        ...mapMutations([
            'CHOOSE_ADDRESS'
        ]),
        selectOrEdit(address, index) {
            if (this.$route.query.path === 'confirmOrder') {
                localStorage.setItem('choosedAddress', JSON.stringify(address));
                this.$router.go(-1);
            } else {
                var query = {
                    addressId: address.id
                }
                this.$router.push({
                    name: 'editAddress',
                    query: query
                });
            }
        },
        toEdit(address, index) {
            var query = {
                addressId: address.id
            }
            if (this.$route.query.path === 'confirmOrder') {
                query = {
                    addressId: address.id,
                    path: 'confirmOrder'
                }
            }

            this.$router.push({
                name: 'editAddress',
                query: query
            })
        },
        toAddAddress() {
            var query = {}
            if (this.$route.query.path === 'confirmOrder') {
                query = {
                    path: 'confirmOrder'
                }
            }

            this.$router.push({
                name: 'editAddress',
                query: query
            })
        }
    },
    watch: {}
}
</script>

  
<style lang="scss" scoped>
@import '../../../style/address';
</style>

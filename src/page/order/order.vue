 <template>
    <div class="order_page header-top">
        <head-top head-title="我的订单" go-back='true'></head-top>
        <ul class="nav_tab">
            <li v-for="(item,index) in tabList" :key="index" :class="{active: activeTab == index }" @click="findOrder(index)">{{item.tab}}</li>
        </ul> 
        <transition name="router-slid" mode="out-in">
            <router-view @findOrder="updateOrder()" :sendData="activeTab"></router-view>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import footGuide from 'src/components/footer/footGuide'

    export default {
      data(){
            return{
                activeTab: 0,
                tabList: [
                  {
                    tab: '全部',
                    name: 'all'
                  },
                  {
                    tab: '待支付',
                    name: 'unpaid'
                  },
                  {
                    tab: '待发货',
                    name: 'undelivery'
                  },
                  {
                    tab: '已发货',
                    name: 'delivered'
                  },
                  {
                    tab: '已完成',
                    name: 'completed'
                  }
                ],
                routerPath: ''
            }
        },
        props: ['showErrMsg'],
        created () {
            this.routerPath = window.location.href.toString().split('order/')[1]
            for(var i = 0; i <= this.tabList.length - 1; i++){
                if(this.tabList[i].name === this.routerPath){
                    this.activeTab = i;
                }
            }
        },
        mounted(){
        },
        components: {
            headTop,
            footGuide
        },
        computed: {
        },
        methods: {
            findOrder (index) {
                if (this.activeTab !== index) {
                  this.activeTab = index
                  this.$router.replace({name: this.tabList[index].name})
                  window.scrollTo(0, 0)
                }
            }
        },
        watch: {
        }
    }
</script>
  
<style lang="scss" scoped>
    @import '../../style/order'
</style>

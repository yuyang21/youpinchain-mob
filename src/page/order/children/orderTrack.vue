 <template>
  <div class="order_track_page">
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
				<div class="page-top-red"></div>
				<section class="order_track_detail border_radius">
					<ul>
						<li class="order_track_step" v-for="(item,index) in trackData.data" :key="index">
							<div>
								<p>{{item.time | date_hm}}</p>
								<p>{{item.time | date_md}}</p>
							</div>
							<span v-if="item.context.indexOf('已收取快件') !== -1" class="circle_only"><b></b></span>
							<span v-else-if="item.context.indexOf('正在派送') !== -1" class="have_after distributing"><b></b></span>
							<span v-else-if="item.context.indexOf('已签收') !== -1" class="have_after">收</span>
							<span v-else class="have_after circle_only" :class="{'no_line': index == trackData.data.length-1}"><b></b></span>
							<div class="align_center">
								<p>{{item.context}}</p>
							</div>
						</li>
					</ul>	
				</section>
            </section> 
        </section>  
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import footGuide from 'src/components/footer/footGuide'
    import {addzero} from '../../../config/mUtils'
    import {expresses} from "../../../service/getData";

    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
				expNo:"",
				expCode: "",
				trackData:{}
            }
        },
        created () {
            this.expNo = this.$route.params.expNo
            this.expCode = this.$route.params.expCode
			//TODO 测试使用单号
			if(!this.expNo){
                this.expNo="821721174311"
			}
        },
        mounted(){
            expresses(this.expCode, this.expNo).then(res => {
                if (res.errno !== 0){
                    return;
                }
                this.trackData = JSON.parse(
                    res.data
                );
                console.info(this.trackData)
                this.showLoading = false;
            })
        },
        components: {
            loading, footGuide
        },
        computed: {
        },
        methods: {
        	addzero (number) {
        		return number < 10 ? '0' + number : number;
        	}
        },
        watch: {
        },
        filters: {
        	date_md: function(time) {
				time = time.replace(/-/g,'/')
        		return (addzero(new Date(time).getMonth() + 1)) + '-' + addzero(new Date(time).getDate()); 
        	},
        	date_hm: function(time) {
				time = time.replace(/-/g,'/')
        		return (addzero(new Date(time).getHours()) + ':' + addzero(new Date(time).getMinutes()));
        	}
        }
    }
</script>
  
<style lang="scss" scoped>
    @import '../../../style/orderTrack';
</style>

<template>
    <div class="bid_record" v-client-height>
        <div class="box" v-if="pageType === 'bid'">
            <ul class="header">
                <li>状态</li>
                <li>出价金条</li>
                <li>出价时间</li>
            </ul>
            <ul class="body">
                <div class="no_record" v-if="recordList.length <= 0">暂无记录</div>
                <li v-for="(item, index) in recordList" :key="index" v-else>
                    <p>{{item.bidState === 0 ? '出局' : item.bidState === 1 ? '领先' : '成交'}}</p>
                    <p>{{item.bidPrice}}</p>
                    <p>{{item.addTime | time}}</p>
                </li>
            </ul>
        </div>
        <div class="box my" v-if="pageType === 'my'">
            <ul class="header">
                <li>竞拍场次</li>
                <li>竞拍结果</li>
                <li>操作</li>
            </ul>
            <ul class="body">
                <div class="no_record" v-if="recordList.length <= 0">暂无记录</div>
                <li v-for="(item, index) in recordList" :key="index" v-else>
                    <p>{{item.addTime | date('.')}}</p>
                    <p>{{item.bidState === 0 ? '出局' : '成功'}}</p>
                    <p :class="{'red': item.bidState === 2}" @click="takeReward(item)">{{item.bidState === 4 ? '逾期未领取' : item.bidState === 3 ? '奖励已领取' : item.bidState === 2 ? '领取奖励' : '——'}}</p>
                </li>
                <div class="load_more" v-if="page < totalPage" @click="loadMore">查看更多</div>
            </ul>
        </div>
    </div>
</template>
<script>
    import { bidRecord, myBidRecords } from '../../../../service/getData'
    export default {
        data () {
            return {
                pageType: this.$route.params.type,
                recordList: [],
                page: 1,
                pageSize: 10,
                totalPage: 1,
                auctionId: this.$route.query.auctionId
            }
        },
        props: ['showErrMsg'],
        watch: {
        },
        mounted() {
        },
        created() {
            this.pageType === 'bid' ? document.title = '出价记录' : document.title = '我的竞拍'
            this.pageType === 'bid' ? this.getBidRecord(this.auctionId) : this.getMyBidRecords(this.page, this.pageSize)
        },
        methods: {
            getBidRecord (auctionId) {
                var that = this
                bidRecord(auctionId).then(function(response) {
                    if (response && response.errno === 0) {
                        that.recordList = response.data
                    } else {
                        that.$parent.showErrMsg(response.errmsg)
                    }
                })
            },
            getMyBidRecords (page,pageSize) {
                var that = this
                myBidRecords(page,pageSize).then(function(response) {
                    if (response && response.errno === 0) {
                        var recordList = response.data.auctionBids
                        for (var i = 0; i < recordList.length; i++) {
                            that.recordList.push(recordList[i])
                        }
                        that.totalPage = Math.ceil(response.data.count / response.data.pageSize)
                        that.page = response.data.page
                        that.pageSize = response.data.pageSize
                    } else {
                        that.$parent.showErrMsg(response.errmsg)
                    }
                })
            },
            loadMore () {
                this.page += 1 
                this.getMyBidRecords(this.page,this.pageSize)
            },
            takeReward (bid) {
                var that = this
                if (bid.bidState !== 2) {
                    return
                } else {
                    this.$router.push('/auction/rewardExchange/'+ that.auctionId + '/' + bid.id)
                }
            }
        },
        components: {
        }
    }
</script>
<style scoped lang="scss">
    .bid_record {
        background: #06020a url('../../../../images/bounty-plan/starry_sky_bg1.png') no-repeat;
        background-size: 100% 52%;
        padding-top: .3rem;
        .box {
            @include wh(90%,93%);
            background: url('../../../../images/auction/record_bg.png') no-repeat;
            background-size: 100%;
            margin: 0 auto;
            padding: .3rem .25rem 0;
            border-radius: .125rem;
            .cirle-left {
                @include wh(.3rem,.3rem);
                position: absolute;
                top: .5rem;
                left: 0;
                background: transparent;
            }
            .header {
                overflow: hidden;
                border-bottom: 1px solid #fa633c;
                li {
                    @include sc(.15rem,#fc5340);
                    line-height: 2.4;
                    float: left;
                    width: 33.33%;
                    letter-spacing: 1px;
                    text-align: center;
                }
                li:first-child {
                    width: 30%;
                    padding-left: .12rem; 
                    text-align: left;
                }
                li:last-child {
                    text-align: right;
                }
            }
            .body {
                overflow: scroll;
                height: 90%;
                padding-top: .15rem;
                li {
                    overflow: hidden;
                    p {
                        @include sc(.14rem,$g6);
                        height: .4rem;
                        line-height: .4rem;
                        float: left;
                        width: 33.33%;
                        letter-spacing: 1px;
                        text-align: center;
                    }
                    p:first-child {
                        width: 30%;
                        padding-left: .12rem; 
                        text-align: left;
                    }
                    p:last-child {
                        text-align: right;
                    }
                }
            }
            .no_record {
                @include sc(.13rem,$g6);
                text-align: center;
                margin-top: 1.5rem;
            }
        }
        .box.my {
            .header {
                li:first-child {
                    width: 33%;
                    padding-left: 0.05rem;
                }
                li:last-child {
                    text-align: center;
                }
            }
            .body {
                li {
                    p {
                        letter-spacing: 0.1px;
                    }
                    p:first-child {
                        width: 33%;
                        padding-left: 0;
                    }
                    p:last-child {
                        text-align: center;
                        @include sc(.13rem,$g9);
                    }
                    p.red {
                        color: #fa444e;
                    }
                }
            }
        }
        .load_more {
            @include sc(.13rem,$g6);
            text-align: center;
            margin-top: .15rem;
        }
    }
</style>

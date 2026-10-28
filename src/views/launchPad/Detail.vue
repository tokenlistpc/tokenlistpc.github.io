<script setup>
import { onMounted, inject, watch, ref, reactive, computed, onBeforeUnmount } from 'vue'
import Back from '@/components/Back.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import CopyText from '@/components/CopyText.vue'
import IconText from '@/components/IconText.vue'
import PieChart from '@/components/PieChart.vue'
import Progress from '@/components/Progress.vue'
import CountDown from './components/CountDown.vue'
import JoinUserInfo from './components/JoinUserInfo.vue'
import WhiteList from './components/WhiteList.vue'
import CancelLaunch from './components/CancelLaunch.vue'
import LaunchPromotion from './components/LaunchPromotion.vue'
import WhiteListInfo from './components/WhiteListInfo.vue'
import ProjectInfo from './components/ProjectInfo.vue'
import { getChainIcon, getTokenIcon, isExpired, numFormat, formatAddress } from "@/utils"
import dayjs from 'dayjs'
import api from "@/api"
import cfg from "@/config"
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { useLpManageStore } from '@/store/launchpad/manage.js'
import { ethers } from "ethers"
import BigNumber from "bignumber.js"

const props = defineProps({
    chainId: String,
    launchPadAddress: String,
})
const currentChain = computed(() => {
    return cfg.chainList.find(x => x.chainId == props.chainId)
})
const store = useStore()
const lpManageStore = useLpManageStore()
const { t } = useI18n()
const joinUserInfoVisible = ref(false)
const whiteListVisible = ref(false)
const cancelLaunchVisible = ref(false)
const launchPromotionVisible = ref(false)
const whiteListInfoVisible = ref(false)
const projectInfoVisible = ref(true)
const status = ref('')
const distanceTime = ref(null)
const detail = reactive({

})

async function getDetail() {

}
let intervalStatus = null
function checkStatus() {
    intervalStatus = setInterval(function () {
        console.log(lpManageStore.status)
        if (lpManageStore.status == 'normal') {
            if (((new Date()).valueOf() / 1000) <= lpManageStore.startTime) {
                status.value = 'upcoming'
            } else {
                status.value = 'salelive'
                clearInterval(intervalStatus);
            }
        } else if (lpManageStore.status == 'canceled') {
            status.value = 'canceled'
            clearInterval(intervalStatus);
        } else if (lpManageStore.status == 'ended') {
            status.value = 'ended'
            clearInterval(intervalStatus);
        }
    }, 1000)
}
checkStatus()
let intervalTime = null
function getDistanceTime() {
    intervalTime = setInterval(function () {
        if (lpManageStore.status == 'normal') {
            let leftTime
            if (((new Date()).valueOf() / 1000) <= lpManageStore.startTime) {
                leftTime = ((new Date()).valueOf() / 1000) - lpManageStore.startTime
            } else {
                leftTime = ((new Date()).valueOf() / 1000) - lpManageStore.endTime
            }
            distanceTime.value = {
                leftd: Math.floor(leftTime / (60 * 60 * 24)),
                lefth: Math.floor(leftTime / (60 * 60) % 24),
                leftm: Math.floor(leftTime / (60) % 60),
                lefts: Math.floor(leftTime % 60),
            }
        } else {
            clearInterval(intervalTime);
        }
    }, 1000)
}
checkStatus()
getDistanceTime()
onBeforeUnmount(() => {
    clearInterval(intervalStatus);
    clearInterval(intervalTime);
});
onMounted(() => {
    console.log(props.chainId)
    console.log(props.launchPadAddress)
    getPresaleInfo()
})

async function getPresaleInfo() {
    lpManageStore.$reset()
    await lpManageStore.getTokenListPresale(props.chainId, props.launchPadAddress, store.walletAddress)
}

function operateSuccess() {
}

const chainIcon = computed(() => {
    if (lpManageStore.chain) {
        return cfg.chainList.find(x => x.chain == lpManageStore.chain).chainIcon
    }
})

const youtubeShowUrl = computed(() => {
    if (lpManageStore.youtube) {
        let urlStr = lpManageStore.youtube.split('?')[1]
        const urlSearchParams = new URLSearchParams(urlStr)
        const result = Object.fromEntries(urlSearchParams.entries())
        return "//www.youtube.com/embed/" + result.v + "?wmode=transparent"
    } else {
        return ''
    }
})

const chartData = computed(() => {
    if (lpManageStore.tokenTotalSupply && lpManageStore.saleAmount && lpManageStore.tokenLiquidityAmount) {
        console.log(lpManageStore.tokenTotalSupply)
        console.log(lpManageStore.saleAmount)
        console.log(lpManageStore.tokenLiquidityAmount)
        let tokenTotalSupply = ethers.formatUnits(lpManageStore.tokenTotalSupply, Number(lpManageStore.tokenDecimal))
        let saleAmount = ethers.formatUnits(lpManageStore.saleAmount, Number(lpManageStore.tokenDecimal))
        let tokenLiquidityAmount = ethers.formatUnits(lpManageStore.tokenLiquidityAmount, Number(lpManageStore.tokenDecimal))
        console.log(tokenTotalSupply)
        console.log(saleAmount)
        console.log(tokenLiquidityAmount)
        if (lpManageStore.isAutoList) {
            return [
                { value: Number(saleAmount), name: 'Presale' },
                { value: Number(tokenLiquidityAmount), name: 'Liquidity' },
                { value: BigNumber(tokenTotalSupply).minus(saleAmount).minus(tokenLiquidityAmount).toNumber(), name: 'Unlocked' },
            ]
        } else {
            return [
                { value: Number(saleAmount), name: 'Presale' },
                { value: BigNumber(tokenTotalSupply).minus(saleAmount).toNumber(), name: 'Unlocked' },
            ]
        }
    }
})

const tokenSymbol = computed(() => {
    if (lpManageStore.tokenSymbol) {
        return lpManageStore.tokenSymbol
    }
})

function getChainSwapName(chain, swapRouterAddress) {
    let res = api.ave.getChainSwaps(chain)
    let swaps = []
    if (res.data.status == 1) {
        let resData = res.data.data
        if (resData && resData.length > 0) {
            for (let item of resData) {
                let swapIcon = "https://www.avestorage.cloud/swap/" + item.name + ".jpeg"
                let chainSwap = {
                    chain: item.chain,
                    factoryAddress: item.factory_address.toLowerCase(),
                    isSwapSupported: item.is_swap_supported,
                    name: item.name,
                    routerAddress: item.router_address.toLowerCase(),
                    showName: item.show_name,
                    sortId: item.sort_id,
                    swapUrl: item.swap_url,
                    swapIcon: swapIcon
                }
                swaps.push(chainSwap)
            }
        }
    }
    return swaps.find(x => x.routerAddress.toLowerCase() == swapRouterAddress.toLowerCase()).showName
}



</script>
<template>
    <div class="launch-pad-detail">
        <Back></Back>
        <div class="content">
            <div class="left-content">
                <div class="item">
                    <div class="token">
                        <TokenIcon class="token-icon" :bigIcon="lpManageStore.logo.url" :smallIcon="chainIcon"></TokenIcon>
                        <div class="info">
                            <div class="name">
                                <div class="token-name">{{ lpManageStore.tokenName }}</div>
                                <div class="launch-type" v-if="lpManageStore.launchType=='normal'">普通预售</div>
                            </div>
                            <div class="web-link-list">
                                <svg-icon name="officialWeb" class="icon" v-if="lpManageStore.website" />
                                <svg-icon name="tgWeb" class="icon" v-if="lpManageStore.telegram" />
                                <svg-icon name="twitterWeb" class="icon" v-if="lpManageStore.twitter" />
                                <svg-icon name="discordWeb" class="icon" v-if="lpManageStore.discord" />
                                <svg-icon name="githubWeb" class="icon" v-if="lpManageStore.github" />
                                <svg-icon name="facebookWeb" class="icon" v-if="lpManageStore.facebook" />
                                <svg-icon name="redditWeb" class="icon" v-if="lpManageStore.reddit" />
                                <svg-icon name="instagramWeb" class="icon" v-if="lpManageStore.instagram" />
                                <svg-icon name="youtubeWeb" class="icon" v-if="lpManageStore.youtube" />
                            </div>
                        </div>
                    </div>
                    <div class="status">
                        <span v-if="status=='upcoming'" class="status-item upcoming">
                            <span class="spot"></span>
                            <span>即将开始</span>
                        </span>
                        <span v-else-if="status=='salelive'" class="status-item sale-live">
                            <span class="spot"></span>
                            <span>预售中</span>
                        </span>
                        <span v-else-if="status=='canceled'" class="status-item canceled">
                            <span class="spot"></span>
                            <span>已取消</span>
                        </span>
                        <span v-else-if="status=='ended'" class="status-item ended">
                            <span class="spot"></span>
                            <span>即将开始</span>
                        </span>
                    </div>
                </div>
                <div class="introduce">
                    <div>{{ lpManageStore.description }}</div>
                </div>
                <div class="yutube">
                    <iframe v-if="youtubeShowUrl" class="iframe-video" id="ifrId" :src="youtubeShowUrl" frameborder="0" style="width: 100%"></iframe>
                </div>
                <div class="item">
                    <div class="key">
                        预售合约地址
                    </div>
                    <div class="value">
                        <CopyText isBlue="true" :smallText="lpManageStore.contractAddress" :text="lpManageStore.contractAddress"></CopyText>
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        代币地址
                    </div>
                    <div class="value">
                        <CopyText isBlue="true" :smallText="lpManageStore.tokenAddress" :text="lpManageStore.tokenAddress"></CopyText>
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        代币名称
                    </div>
                    <div class="value">
                        {{lpManageStore.tokenName}}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        代币精度
                    </div>
                    <div class="value">
                        {{ lpManageStore.tokenDecimal }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        发行总量
                    </div>
                    <div class="value" v-if="lpManageStore.tokenTotalSupply">
                        {{numFormat(Number(ethers.formatUnits(lpManageStore.tokenTotalSupply,lpManageStore.tokenDecimal)))}}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        预售总量
                    </div>
                    <div class="value" v-if="lpManageStore.saleAmount">
                        {{numFormat(Number(ethers.formatUnits(lpManageStore.saleAmount,lpManageStore.tokenDecimal)))}}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        募资代币
                    </div>
                    <div class="value">
                        {{ lpManageStore.baseTokenSymbol }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        预售价格
                    </div>
                    <div class="value">
                        1 {{ lpManageStore.baseTokenSymbol }} = {{ lpManageStore.salePrice }} {{ lpManageStore.tokenSymbol }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        上市价格
                    </div>
                    <div class="value">
                        1 {{ lpManageStore.baseTokenSymbol }} = {{ lpManageStore.listPrice }} {{ lpManageStore.tokenSymbol }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        软顶
                    </div>
                    <div class="value" v-if="lpManageStore.softCap">
                        {{ ethers.formatUnits(lpManageStore.softCap,lpManageStore.baseTokenDecimal) }} {{ lpManageStore.baseTokenSymbol }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        硬顶
                    </div>
                    <div class="value" v-if="lpManageStore.hardCap">
                        {{ ethers.formatUnits(lpManageStore.hardCap,lpManageStore.baseTokenDecimal) }} {{ lpManageStore.baseTokenSymbol }}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        交易所
                    </div>
                    <div class="value" v-if="lpManageStore.chain">
                        {{ getChainSwapName(lpManageStore.chain,lpManageStore.swapRouterAddress) }}
                    </div>
                </div>
                <div class="item" v-if="lpManageStore.isAutoList">
                    <div class="key">
                        流动性比例
                    </div>
                    <div class="value">
                        {{BigNumber(lpManageStore.liquidityRate).times(100)}}%
                    </div>
                </div>
                <div class="item" v-if="lpManageStore.isAutoList">
                    <div class="key">
                        流动性锁定时间
                    </div>
                    <div class="value">
                        {{BigNumber(lpManageStore.lpLockTime).div(86400)}}天
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        预售开始时间
                    </div>
                    <div class="value">
                        {{dayjs(lpManageStore.startTime*1000).format('YYYY-MM-DD HH:mm:ss')}}
                    </div>
                </div>
                <div class="item">
                    <div class="key">
                        预售结束时间
                    </div>
                    <div class="value">
                        {{dayjs(lpManageStore.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}}
                    </div>
                </div>
                <div class="item" v-if="lpManageStore.isWhiteListEnabled">
                    <div class="key">
                        白名单
                    </div>
                    <div class="value" v-if="lpManageStore.whitelistDuration">
                        存在白名单，{{BigNumber(lpManageStore.whitelistDuration).div(60)}}分钟后转为公开预售
                    </div>
                    <div class="value" v-else>
                        存在白名单，不可转为公开预售
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="key">
                        线性释放
                    </div>
                    <div class="value">
                        首次释放 10%， 之后周期间隔1天，每个周期释放 10%
                    </div>
                </div> -->
                <div class="item" v-if="lpManageStore.isAffiliateEnabled">
                    <div class="key">
                        预售推广奖励
                    </div>
                    <div class="value">
                        奖励池占总资金池比例 {{BigNumber(lpManageStore.affiliateFee).times(100)}}%
                    </div>
                </div>
                <div class="token-distribute">
                    <div class="small-title">
                        代币分配
                    </div>
                    <div class="chart">
                        <PieChart :data="chartData" :tokenSymbol="tokenSymbol"></PieChart>
                    </div>
                </div>
                <div class="invite-panel" v-if="lpManageStore.isAffiliateEnabled">
                    <div class="small-title">
                        邀请面板
                    </div>
                    <div class="my-invite">
                        <div class="invite-title">我的邀请链接</div>
                        <el-input class="invite-link" v-model="input1" placeholder="Please input">
                            <template #suffix><el-button class="copy">复制</el-button></template>
                        </el-input>
                    </div>
                    <div class="item">
                        <div class="key">
                            已邀请用户
                        </div>
                        <div class="value">
                            10
                        </div>
                    </div>
                    <div class="item">
                        <div class="key">
                            已获得奖励（估算值）
                        </div>
                        <div class="value">
                            0.05 BNB
                        </div>
                    </div>
                    <div class="item">
                        <div class="key">
                            已领取奖励
                        </div>
                        <div class="value">
                            0 BNB
                        </div>
                    </div>
                    <div class="claim-reward">
                        <el-button class="btn btn-40 btn-default-gray">领取奖励</el-button>
                        <div class="info">奖励在预售完成后领取</div>
                    </div>
                </div>
            </div>
            <div class="right-content">
                <div class="launch-operate">
                    <div class="launch-status">
                        <div class="upcoming" v-if="status=='upcoming'">
                            <div class="text">距预售开始还有</div>
                            <CountDown class="count-down"></CountDown>
                        </div>
                        <div class="sale-live">
                            <div class="text">距预售结束还有</div>
                            <CountDown class="count-down"></CountDown>
                        </div>
                        <div class="canceled">
                            <el-icon class="icon">
                                <CircleCloseFilled />
                            </el-icon>
                            <div class="text">预售已取消</div>
                        </div>
                        <div class="ended">
                            <el-icon class="icon">
                                <WarningFilled />
                            </el-icon>
                            <div class="text">预售已结束</div>
                        </div>
                    </div>
                    <div class="progress">
                        <Progress :strokeWidth="14" :isShowData="true"></Progress>
                    </div>
                    <div class="operate">
                        <!-- <div class="buy">
                            <div class="item">
                                <div>数量</div>
                                <div class="gray">余额 3 BNB</div>
                            </div>
                            <el-input class="input-num" v-model="input" placeholder="P0.5~1 BNB" >
                                <template #suffix><span class="max">最大</span></template>
                            </el-input>
                            <el-button class="buy-btn btn-40 btn-gradient" type="primary">购买</el-button>
                        </div> -->
                        <div class="receive">
                            <div class="item">
                                <div>可领取退回代币 </div>
                                <div>1 BNB</div>
                            </div>
                            <div class="item">
                                <div>已领取退回代币 </div>
                                <div>1 BNB</div>
                            </div>
                            <el-button class="receive-btn btn-40 btn-gradient" type="primary">领取退回代币</el-button>
                        </div>
                    </div>
                </div>
                <div class="launch-info">
                    <el-alert class="warn-info" :closable="false" title="您的地址不在白名单内，需等到公开预售阶段投入。" type="error" />
                    <div class="item">
                        <div class="key">状态</div>
                        <div class="blue">即将开始</div>
                    </div>
                    <div class="item">
                        <div class="key">预售类型</div>
                        <div class="blue">白名单</div>
                    </div>
                    <div class="item">
                        <div class="key">最低购买额度</div>
                        <div>0.5 BNB</div>
                    </div>
                    <div class="item">
                        <div class="key">最高购买额度</div>
                        <div>1 BNB</div>
                    </div>
                    <div class="item">
                        <div class="key">当前参与人数</div>
                        <div>10</div>
                    </div>
                    <div class="item">
                        <div class="key">您已购买</div>
                        <div>1 BNB</div>
                    </div>
                </div>
                <div class="manager-panel">
                    <div class="title">
                        <svg-icon name="managerPanel" class="icon" />管理员面板
                    </div>
                    <div class="operate">
                        <el-button class="btn btn-36 btn-default-gray">复制预售链接</el-button>
                        <el-button class="btn btn-36 btn-default-gray">查看参与用户信息</el-button>
                        <el-button class="btn btn-36 btn-default-gray">修改项目信息</el-button>
                        <el-button class="btn btn-36 btn-default-gray">设置白名单地址</el-button>
                        <el-button class="btn btn-36 btn-default-gray">设置白名单信息</el-button>
                        <el-button class="btn btn-36 btn-default-gray">开启预售推广</el-button>
                        <el-button class="btn btn-36 btn-default-gray">取消预售</el-button>
                        <el-button class="btn btn-36 btn-gradient">完成预售</el-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <el-dialog v-model="joinUserInfoVisible" title="参与用户信息" width="520" destroy-on-close>
        <JoinUserInfo></JoinUserInfo>
    </el-dialog>
    <el-dialog v-model="whiteListVisible" title="设置白名单地址" width="440" destroy-on-close>
        <WhiteList></WhiteList>
    </el-dialog>
    <el-dialog v-model="cancelLaunchVisible" title="取消预售" width="440" destroy-on-close>
        <CancelLaunch></CancelLaunch>
    </el-dialog>
    <el-dialog v-model="launchPromotionVisible" title="开启预售推广" width="440" destroy-on-close>
        <LaunchPromotion></LaunchPromotion>
    </el-dialog>
    <el-dialog v-model="whiteListInfoVisible" title="设置白名单信息" width="440" destroy-on-close>
        <WhiteListInfo></WhiteListInfo>
    </el-dialog>
    <el-dialog v-model="projectInfoVisible" title="修改项目信息" width="600" destroy-on-close>
        <ProjectInfo></ProjectInfo>
    </el-dialog>
</template>

<style scoped lang='scss'>
.launch-pad-detail {
    .content {
        font-size: 14px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .left-content {
            width: 100%;
            margin-right: 15px;
            .item {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .key {
                    color: #999;
                }
            }
            .token {
                display: flex;
                .info {
                    margin-left: 8px;
                    .name {
                        display: flex;
                        font-size: 24px;
                        .launch-type {
                            margin-left: 6px;
                        }
                    }
                    .web-link-list {
                        .icon {
                            width: 18px;
                            height: 18px;
                            margin-right: 18px;
                        }
                    }
                }
            }
            .status {
                .status-item {
                    border-radius: 4px;
                    padding: 0 10px;
                    font-size: 12px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    .spot {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                }

                .upcoming {
                    background: rgb(255, 159, 55, 0.1);
                    color: #ff9f37;
                    .spot {
                        background: #ff9f37;
                    }
                }
                .sale-live {
                    background: rgba(27, 200, 158, 0.1);
                    color: #1bc89e;
                    .spot {
                        background: #1bc89e;
                    }
                }
                .canceled {
                    background: rgba(153, 153, 153, 0.1);
                    color: #999999;
                    .spot {
                        background: #999999;
                    }
                }
                .ended {
                    background: rgba(211, 29, 250, 0.1);
                    color: #d31dfa;
                    .spot {
                        background: #d31dfa;
                    }
                }
            }
            .introduce {
                font-size: 16px;
                margin-top: 20px;
                font-weight: 600;
            }
            .yutube {
                margin: 10px 0 20px 0;
                width: 100%;
                .iframe-video {
                    height: 25vw;
                    min-height: 230px;
                }
            }
            .small-title {
                font-weight: bold;
            }
            .token-distribute {
                margin-top: 40px;
                .chart {
                    margin-top: 10px;
                }
            }
            .invite-panel {
                margin-top: 10px;
                .invite-title {
                    margin-top: 10px;
                }
                .invite-link {
                    margin-top: 10px;
                    height: 44px;
                    .copy {
                        width: 70px;
                        height: 30px;
                        background: #f5f5f5;
                        border: none;
                        color: #01a7ff;
                    }
                }
            }
            .claim-reward {
                margin-top: 20px;
                text-align: center;
                .btn {
                    width: 240px;
                }
                .info {
                    color: #ff9f37;
                    margin-top: 10px;
                }
                margin-bottom: 20px;
            }
            .token-icon {
                --sizeBig: 48px;
                --sizeSmall: 20px;
            }
        }
        .right-content {
            width: 290px;
            min-width: 280px;
            .item {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .key {
                    color: #999;
                }
                .gray {
                    color: #bfbfbf;
                }
                .blue {
                    color: #01a7ff;
                }
            }
            .launch-operate {
                padding: 0 15px 20px 15px;
                box-sizing: border-box;
                border: 1px solid #e6e7e8;
                border-radius: 10px;
                .item {
                    font-size: 12px;
                }
                .launch-status {
                    margin-top: 30px;
                    text-align: center;
                    .count-down {
                        margin-top: 10px;
                        text-align: center;
                    }
                    .icon {
                        font-size: 24px;
                        color: #999999;
                    }
                    .canceled,
                    .ended {
                        .text {
                            font-size: 20px;
                        }
                    }
                }
                .progress {
                    margin-top: 15px;
                }
                .operate {
                    .input-num {
                        margin-top: 5px;
                        height: 40px;
                        .max {
                            font-size: 12px;
                            color: #01a7ff;
                            cursor: pointer;
                        }
                    }
                    .buy-btn {
                        margin-top: 20px;
                        width: 100%;
                    }
                    .receive-btn {
                        width: 100%;
                        margin-top: 40px;
                    }
                }
            }
            .launch-info {
                margin-top: 20px;
                padding: 20px 15px;
                box-sizing: border-box;
                border: 1px solid #e6e7e8;
                border-radius: 10px;
                .item {
                    font-size: 14px;
                }
                .warn-info {
                    margin-bottom: 20px;
                }
            }
            .manager-panel {
                margin-top: 20px;
                padding: 20px 15px;
                box-sizing: border-box;
                border: 1px solid #e6e7e8;
                border-radius: 10px;
                .title {
                    display: flex;
                    align-items: center;
                }
                .operate {
                    margin-top: 10px;
                }
                .icon {
                    width: 16px;
                    height: 16px;
                }

                .btn {
                    margin-top: 10px;
                    width: 100%;
                    margin-left: 0;
                }
            }
        }
    }
}
</style>
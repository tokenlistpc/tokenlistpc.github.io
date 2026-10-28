<script setup>
import { reactive, ref, onBeforeMount, onMounted, computed, onBeforeUnmount } from 'vue'
import { getTokenIcon, getChainIcon, sleep, numFormat } from "@/utils"
import { ethers } from "ethers"
import TokenIcon from '@/components/TokenIcon.vue'
import ProgressPro from '@/components/ProgressPro.vue'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { useLpStore } from '@/store/Launchpad/index.js';
import cfg from "@/config"

const props = defineProps({
    launchpadItem: Object,
    isTokenList: Boolean
})
const emit = defineEmits(["view"])
const lpStore = useLpStore()
const showTime = ref('')
let interval = null

function formatTime(v) {
    if (v < 10) {
        return "0" + v.toString()
    }
    return v.toString()
}

function countdown(launchpadItem) {
    let time
    if (launchpadItem.status == 'salelive') {
        time = launchpadItem.endTime
    } else if (launchpadItem.status == 'upcoming') {
        time = launchpadItem.startTime
    }
    interval = setInterval(function () {
        let nowTime = parseInt(new Date().getTime() / 1000) //获取当前时间
        if (nowTime < time) {
            let leftTime = time - nowTime
            // console.log(leftTime)
            showTime.value = showTimeFn(leftTime)
        } else if (nowTime >= time) {
            clearInterval(interval)
            showTime.value = "00 : 00 : 00";
        }
    }, 1000)
}

function showTimeFn(lefttime) {
    // 倒计时展示
    let leftd = Math.floor(lefttime / (60 * 60 * 24)),
        lefth = Math.floor(lefttime / (60 * 60) % 24),
        leftm = Math.floor(lefttime / (60) % 60),
        lefts = Math.floor(lefttime % 60);
    if (leftd > 0) {
        return formatTime(leftd) + " : " + formatTime(lefth) + " : " + formatTime(leftm) + " : " + formatTime(lefts);
    } else {
        return formatTime(lefth) + " : " + formatTime(leftm) + " : " + formatTime(lefts);
    }
}
onMounted(() => {
    countdown(props.launchpadItem)
})


const topAmount = computed(() => {
    if (props.launchpadItem.hardCap !== '' && props.launchpadItem.hardCap !== '0') {
        return ethers.formatUnits(props.launchpadItem.hardCap, props.launchpadItem.currencyDecimals)
    } else {
        return ethers.formatUnits(props.launchpadItem.softCap, props.launchpadItem.currencyDecimals)
    }
})

const platform = computed(() => {
    console.log(props.launchpadItem.platform)
    return lpStore.platforms.find(x => x.value == props.launchpadItem.platform)?.name
})

const progress = computed(() => {
    return BigNumber(ethers.formatUnits(props.launchpadItem.cumulateAmount, props.launchpadItem.currencyDecimals)).dividedBy(topAmount.value).multipliedBy(100).toFixed(2)
})

onBeforeUnmount(() => {
    clearInterval(interval);
});

function view() {
    emit('view', props.launchpadItem)
}
</script>
<template>
    <div class="launch-pad-item">
        <div class="status sale-live" v-if="props.launchpadItem.status=='salelive'">
            <span class="spot"></span>
            <span>{{ $t(props.launchpadItem.status) }}</span>
        </div>
        <div class="status upcoming" v-else-if="props.launchpadItem.status=='upcoming'">
            <span class="spot "></span>
            <span>{{ $t(props.launchpadItem.status) }}</span>
        </div>
        <div class="status ended" v-else-if="props.launchpadItem.status=='ended'">
            <span class="spot"></span>
            <span>{{ $t(props.launchpadItem.status) }}</span>
        </div>
        <div class="status canceled" v-else-if="props.launchpadItem.status=='canceled'">
            <span class="spot "></span>
            <span>{{ $t(props.launchpadItem.status) }}</span>
        </div>
        <div class="top">
            <div class="left">
                <TokenIcon v-if="!isTokenList" class="token-icon" :bigIcon="props.launchpadItem.icon?props.launchpadItem.icon:'error'" :smallIcon="lpStore.networks.find(x=>x.value==props.launchpadItem.chainId).icon"></TokenIcon>
                <TokenIcon v-else class="token-icon" :bigIcon="props.launchpadItem.icon?props.launchpadItem.icon:'error'" :smallIcon="cfg.chainList.find(x=>x.chainId==props.launchpadItem.chainId).chainIcon"></TokenIcon>
            </div>
            <div class="right">
                <div class="tags" v-if="!isTokenList">
                    <span v-if="props.launchpadItem.tags.indexOf('KYC')>-1" class="tag kyc" plain type="primary">KYC</span>
                    <span v-if="props.launchpadItem.tags.indexOf('SAFU')>-1" class="tag safu" plain type="primary">SAFU</span>
                    <span v-if="props.launchpadItem.tags.indexOf('Audit')>-1" class="tag audit" plain type="primary">Audit</span>
                    <span v-if="props.launchpadItem.tags.indexOf('DOXX')>-1" class="tag doxx" plain type="primary">DOXX</span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="token-info">
                <div class="token-name">{{ props.launchpadItem.tokenName }}</div>
            </div>
            <div class="line1">
                <div class="price">
                    <div v-if="props.launchpadItem.hardCap!==''&&props.launchpadItem.hardCap!=='0'">
                        <div class="small-title">{{$t('soft')}}/{{$t('hard')}}</div>
                        <div class="value">{{numFormat(ethers.formatUnits(props.launchpadItem.softCap, props.launchpadItem.currencyDecimals))}} <span v-if="!isTokenList">{{ props.launchpadItem.currencySymbol }}</span><span v-else>{{ props.launchpadItem.baseTokenSymbol }}</span> - {{numFormat(ethers.formatUnits(props.launchpadItem.hardCap, props.launchpadItem.currencyDecimals))}} <span v-if="!isTokenList">{{ props.launchpadItem.currencySymbol }}</span><span v-else>{{ props.launchpadItem.baseTokenSymbol }}</span></div>
                    </div>
                    <div v-else>
                        <div class="small-title">{{$t('soft')}}</div>
                        <div class="value">{{numFormat(ethers.formatUnits(props.launchpadItem.softCap, props.launchpadItem.currencyDecimals))}} <span v-if="!isTokenList">{{ props.launchpadItem.currencySymbol }}</span><span v-else>{{ props.launchpadItem.baseTokenSymbol }}</span></div>
                    </div>
                </div>
                <div class="sale-status">
                    <div v-if="props.launchpadItem.status=='salelive'">
                        <div>{{$t('endsIn')}}:</div>
                        <div class="value">{{ showTime }}</div>
                    </div>
                    <div v-else-if="props.launchpadItem.status=='upcoming'">
                        <div>{{$t('startsIn')}}:</div>
                        <div class="value">{{ showTime }}</div>
                    </div>
                    <div v-else-if="props.launchpadItem.status=='ended'">
                        <div class="value">{{$t('saleEnded')}}</div>
                    </div>
                    <div v-else-if="props.launchpadItem.status=='canceled'">
                        <div class="value">{{$t('saleCanceled')}}</div>
                    </div>
                </div>
            </div>
            <div class="progress">
                <div class="small-title">{{$t('progress')}}({{progress}}%)</div>
                <ProgressPro :cumulateAmount="ethers.formatUnits(props.launchpadItem.cumulateAmount, props.launchpadItem.currencyDecimals)" :topAmount="topAmount" :symbol="props.launchpadItem.currencySymbol"></ProgressPro>
                <!-- <Progress cumulateAmount="10" topAmount="10" :symbol="props.launchpadItem.currencySymbol"></Progress> -->
            </div>
            <div class="line3">
                <div class="liquidity" v-if="!isTokenList">{{$t('liquidity')}} <span>{{props.launchpadItem.liquidityPercentage}}%</span></div>
                <div class="liquidity" v-else-if="isTokenList&&props.launchpadItem.liquidityRate">{{$t('liquidity')}} <span>{{BigNumber(props.launchpadItem.liquidityRate).div(100)}}%</span></div>
                <div class="lastdays" v-if="!isTokenList">
                    <text v-if="props.launchpadItem.liquidityLockDays==0||props.launchpadItem.liquidityLockDays==''">{{$t('unlocked')}}</text>
                    <text v-else>{{$t('locked')}} <span>{{props.launchpadItem.liquidityLockDays}} {{$t('days')}}</span></text>
                </div>
                <div class="lastdays" v-else>
                    <text>{{$t('locked')}} <span>{{BigNumber(props.launchpadItem.lpLockTime).div(86400)}} {{$t('days')}}</span></text>
                </div>
            </div>
            <div class="bottom">
                <div class="platform" v-if="!isTokenList">
                    {{$t('platform',{platform:platform})}}
                    <TokenIcon v-if="props.launchpadItem.platform=='pinksale'" class="token-icon" bigIcon="/images/pinkswap.png"></TokenIcon>
                    <TokenIcon v-else-if="props.launchpadItem.platform=='uncx'" class="token-icon" bigIcon="/images/uncx.png"></TokenIcon>
                    <TokenIcon v-else-if="props.launchpadItem.platform=='dx'" class="token-icon" bigIcon="/images/dx.jpg"></TokenIcon>
                </div>
                <div class="platform" v-else>
                    {{$t('platform',{platform:'TokenList'})}}
                    <TokenIcon class="token-icon" bigIcon="/images/tokenList.jpg"></TokenIcon>
                </div>
                <div class="view" type="primary" @click="view()">{{ $t('view') }}</div>
            </div>
        </div>

    </div>
</template>
<style scoped lang='scss'>
.launch-pad-item {
    height: 100%;
    border: 1px solid #ebedf0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    .status {
        border-radius: 0 10px 0 10px;
        position: absolute;
        right: 0;
        top: 0;
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: #999;
        display: inline-block;
        .spot {
            display: inline-block;
            margin-top: 6px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }
    .status.sale-live {
        color: rgb(27, 200, 158);
        background: rgb(27, 200, 158, 0.1);
        .spot {
            background: #1bc89e;
        }
    }
    .status.upcoming {
        color: rgb(255, 159, 55);
        background: rgb(255, 159, 55, 0.1);
        .spot {
            background: #ff9f37;
        }
    }
    .status.ended {
        color: rgb(211, 29, 250);
        background: rgb(211, 29, 250, 0.1);
        .spot {
            background: #d31dfa;
        }
    }
    .status.canceled {
        color: rgb(153, 153, 153);
        background: rgb(153, 153, 153, 0.1);
        .spot {
            background: #999999;
        }
    }
    .top {
        padding: 20px 20px 10px 20px;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            .token-icon {
                --sizeBig: 48px;
                --sizeSmall: 20px;
            }
        }
        .right {
            margin-top: 20px;
            .tags {
                --van-tag-font-size: 12px;
                color: #fff;
                .tag {
                    margin-right: 3px;
                    padding: 5px 8px;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .kyc {
                    background: #1bc89e;
                }
                .safu {
                    background: #d415f6;
                }
                .audit {
                    background: #3f80f7;
                }
                .doxx {
                    background: #ffcc3e;
                }
            }
            .done {
                position: absolute;
                left: -80px;
                .icon {
                    font-size: 70px;
                }
            }
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 0 20px 10px 20px;
        background: #fff;
        .token-info {
            .token-name {
                font-size: 16px;
                font-weight: bold;
            }
        }
        .price {
            color: #333;
            font-size: 16px;
            padding-bottom: 4px;
            font-weight: bold;
            .value {
                color: #01a7ff;
                margin-top: 6px;
            }
        }
        .line1 {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;

            .sale-status {
                min-width: 100px;
                font-size: 12px;
                line-height: 18px;
                color: #999;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .value {
                    color: #333;
                }
            }
        }
        .progress {
            margin-top: 5px;
            .small-title {
                font-size: 12px;
                color: #999;
                margin-bottom: 5px;
            }
        }
        .line3 {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-bottom: 10px;
            > div {
                width: 153px;
                background: #f6f6f6;
                border-radius: 4px;
                min-height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                span {
                    color: #3f80f7;
                }
            }
            > div:first-child {
                margin-right: 10px;
            }
        }
        .bottom {
            // border: 1px solid red;
            // margin-top: auto;
            // margin-bottom: 0px;
            border-top: 1px solid #ebedf0;
            display: flex;
            justify-content: space-between;
            padding-top: 10px;
            .platform {
                display: flex;
                align-items: center;
                // line-height: 40px;
                font-size: 12px;
                color: #999;
                .token-icon {
                    --sizeBig: 24px;
                    margin-left: 6px;
                }
            }
            .view {
                cursor: pointer;
                width: 80px;
                margin-left: 20px;
                background: #eff9ff;
                border-radius: 4px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #01a7ff;
                font-size: 14px;
                font-weight: bold;
            }
            .view:hover {
                opacity: 0.8;
            }
        }
    }
}
.launch-pad-item:hover {
    border: 1px solid #01a7ff;
}
</style>
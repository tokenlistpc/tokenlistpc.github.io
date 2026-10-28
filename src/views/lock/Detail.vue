<script setup>
import { onMounted, inject, watch, ref, reactive } from 'vue'
import Back from '@/components/Back.vue'
import TokenName from '@/components/TokenName.vue'
import CopyText from '@/components/CopyText.vue'
import IconText from '@/components/IconText.vue'
import EditDialog from "@/views/lock/components/editDialog/Index.vue"
import UnlockDialog from "@/views/lock/components/unlockDialog/Index.vue"
import TransferDialog from "@/views/lock/components/transferDialog/Index.vue"
import { getChainIcon, getTokenIcon, isExpired, diffDay, formatAddress } from "@/utils"
import dayjs from 'dayjs'
import api from "@/api"
import cfg from "@/config"
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { ethers } from "ethers"

const props = defineProps({
    lockId: String,
    tokenType: String,
})
const store = useStore()
const { t } = useI18n()
const getDetailDone = ref(false)
const unlockDialogVisible = ref(false)
const editDialogVisible = ref(false)
const transferDialogVisible = ref(false)
const detail = reactive({
    id: props.lockId,
    address: "",
    amountString: "",
    tokenList: [],
    lockDate: 0,
    unlockDate: 0,
    isLpToken: false,
    symbol: "",
    chain: "",
    isExpired: false,
    chainCoinSymbol: "",
    decimals: 0,
})

async function getDetail() {
    getDetailDone.value = false
    let lockContract
    if (props.tokenType == 'lpTokenV3') {
        lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
    } else {
        lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
    }
    let d;
    try {
        console.log(props.lockId)
        d = await lockContract.getLockById(props.lockId)
    } catch (e) {
        ElMessage.error(t('failedToGetDetail'))
        return
    }
    detail.lockDate = Number(d[4])
    detail.unlockDate = Number(d[5])
    detail.tokenId = d.tokenId
    detail.address = d[1]
    detail.owner = d[2]
    detail.isExpired = dayjs().unix() >= detail.unlockDate
    detail.chain = store.chain
    detail.chainCoinSymbol = store.chainCoinSymbol
    if (props.tokenType == 'lpToken') {
        try {
            const lpContract = await api.wallet.metamask.contractLP(detail.address)
            let decimals = await lpContract.decimals()
            detail.decimals = decimals
            let tAddress0 = await lpContract.token0();
            let token0 = await api.wallet.metamask.contractERC20(tAddress0)
            let tSymbol0 = await token0.symbol();
            let tAddress1 = await lpContract.token1();
            let token1 = await api.wallet.metamask.contractERC20(tAddress1)
            let tSymbol1 = await token1.symbol();
            detail.isLpToken = true
            detail.tokenList[0] = {
                symbol: tSymbol0.toUpperCase(),
                address: tAddress0.toLowerCase(),
            }
            detail.tokenList[1] = {
                symbol: tSymbol1.toUpperCase(),
                address: tAddress1.toLowerCase(),
            }
            detail.amountString = ethers.formatUnits(d[3], decimals)
            detail.symbol = `${tSymbol0}/${tSymbol1}`
        } catch (e) {
            console.log(e)
        }
    } else if (props.tokenType == 'token') {
        try {
            const tokenContract = await api.wallet.metamask.contractERC20(detail.address)
            let symbol = await tokenContract.symbol();
            let decimals = await tokenContract.decimals()
            detail.decimals = decimals
            detail.tokenList = []
            detail.isLpToken = false
            detail.symbol = symbol.toUpperCase()
            detail.amountString = ethers.formatUnits(d[3], decimals)
        } catch (e) {
            console.log(e)
        }
    } else if (props.tokenType == 'lpTokenV3') {
        try {
            const lpContract = await api.wallet.metamask.contractNFT(detail.address)
            let positions = await lpContract.positions(detail.tokenId)
            console.log(positions.token0)
            let tAddress0 = positions.token0
            let token0 = await api.wallet.metamask.contractERC20(tAddress0)
            let tSymbol0 = await token0.symbol();
            let tAddress1 = positions.token1
            let token1 = await api.wallet.metamask.contractERC20(tAddress1)
            let tSymbol1 = await token1.symbol();
            detail.isLpToken = true
            detail.tokenList[0] = {
                symbol: tSymbol0.toUpperCase(),
                address: tAddress0.toLowerCase(),
            }
            detail.tokenList[1] = {
                symbol: tSymbol1.toUpperCase(),
                address: tAddress1.toLowerCase(),
            }
            detail.liquidity = positions.liquidity
            detail.symbol = `${tSymbol0}/${tSymbol1}`
        } catch (e) {
            console.log(e)
        }
    }
    console.log(detail)
    getDetailDone.value = true
}

onMounted(() => {
    getDetail()

})

function operateSuccess() {
    getDetail()
}

</script>
<template>
    <div class="token-detail">
        <Back></Back>
        <div class="content" v-loading="!getDetailDone">
            <ul v-if="getDetailDone">
                <li class="top">
                    <TokenName v-if="props.tokenType=='token'" class="token-name" :name="detail.symbol" :bigIcon="getTokenIcon(detail.chain, detail.address.toLocaleLowerCase())" :smallIcon="getChainIcon(detail.chain)"></TokenName>
                    <TokenName v-else class="token-name" :name="detail.symbol" :token1="getTokenIcon(detail.chain, detail.tokenList[0].address.toLocaleLowerCase())" :token2="getTokenIcon(detail.chain, detail.tokenList[1].address.toLocaleLowerCase())"></TokenName>
                    <div class="right"><span class="lock-date">{{ $t('unlockTime2') }}：{{ dayjs.unix(detail.lockDate).format("YYYY-MM-DD HH:mm:ss") }}</span></div>
                </li>
                <li>
                    <div class="left">{{ $t('contractChian') }}</div>
                    <div class="right">
                        <IconText :icon="getChainIcon(detail.chain)" :text="cfg.chainList.find(x=>x.chain==detail.chain.toLowerCase()).chainShow"></IconText>
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('contractAddress') }}</div>
                    <div class="right">
                        <CopyText :smallText="formatAddress(detail.address)" :text="detail.address"></CopyText>
                    </div>
                </li>
                <li v-if="props.tokenType=='lpTokenV3'">
                    <div class="left">{{$t('tokenID')}}</div>
                    <div class="right">
                        {{ detail.id }}
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('lockNumber') }}</div>
                    <div class="right">
                        <div class="value" v-if="props.tokenType=='lpTokenV3'">{{ ethers.formatEther(detail.liquidity.toString()) }}</div>
                        <div class="value" v-else>{{ detail.amountString }}</div>
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('unlockTime2') }}</div>
                    <div class="right">
                        <div class='unlock-date'>
                            {{ dayjs.unix(detail.unlockDate).format("YYYY-MM-DD HH:mm:ss") }}
                            <el-tag v-if="detail.isExpired" class="over-time tag" size="small" type="info">{{ $t('expired') }}</el-tag>
                            <el-tag v-else class="progress tag" size="small" type="info">{{ $t('dayLeft', { day: diffDay(dayjs.unix(detail.unlockDate).toDate()) }) }} </el-tag>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('lockUser') }}</div>
                    <div class="right">
                        <CopyText :smallText="formatAddress(detail.owner)" :text="detail.owner"></CopyText>
                    </div>
                </li>
            </ul>
            <div class="operate" v-if="getDetailDone && store.walletAddress && detail.owner.toLowerCase() == store.walletAddress.toLowerCase()">
                <el-button v-if="!detail.isExpired" class="btn" text bg type="primary" @click="editDialogVisible=true">
                    <template #icon>
                        <el-icon style="font-size:16px">
                            <EditPen />
                        </el-icon>
                    </template>
                    {{ $t('edit') }}
                </el-button>
                <el-button v-if="detail.isExpired" class="btn" text bg type="primary" @click="unlockDialogVisible=true">
                    <template #icon>
                        <el-icon>
                            <Unlock />
                        </el-icon>
                    </template>
                    {{ $t('withdraw') }}
                </el-button>
                 <el-button class="btn" text bg type="primary" @click="transferDialogVisible=true">
                    <template #icon>
                        <el-icon>
                            <Right />
                        </el-icon>
                    </template>
                    {{ $t('transfer') }}
                </el-button>
            </div>
        </div>
    </div>
    <UnlockDialog v-if="unlockDialogVisible" @operateSuccess="operateSuccess" v-model="unlockDialogVisible" :lockId="detail.id" :isLockV2="props.tokenType!=='lpTokenV3'" :isLpToken="props.tokenType!=='token'" :unlockDate="detail.unlockDate" :tokenList="detail.tokenList" :symbol="detail.symbol" :address="detail.address" :amountString="detail.amountString" :chain="detail.chain" :decimals="detail.decimals" />
    <EditDialog v-if="editDialogVisible" @operateSuccess="operateSuccess" v-model="editDialogVisible" :lockId="detail.id" :isLockV2="props.tokenType!=='lpTokenV3'" :isLpToken="props.tokenType!=='token'" :unlockDate="detail.unlockDate" :tokenList="detail.tokenList" :symbol="detail.symbol" :address="detail.address" :amountString="detail.amountString" :chain="detail.chain" :decimals="detail.decimals" />
    <TransferDialog v-if="transferDialogVisible" @operateSuccess="operateSuccess" v-model="transferDialogVisible" :lockId="detail.id" :isLockV2="props.tokenType!=='lpTokenV3'" :isLpToken="props.tokenType!=='token'" :unlockDate="detail.unlockDate" :tokenList="detail.tokenList" :symbol="detail.symbol" :address="detail.address" :amountString="detail.amountString" :chain="detail.chain" :decimals="detail.decimals" />
</template>

<style scoped lang='scss'>
.token-detail {
    height: 700px;
    .content {
        font-size: 14px;
        min-height: 200px;
        ul {
            margin-top: 20px;
            .top {
                line-height: 30px;
                margin-bottom: 20px;
                .lock-date {
                    font-size: 12px;
                    color: #999;
                }
                .token-name {
                    --sizeBig: 30px;
                    --sizeSmall: 14px;
                }
            }
            li {
                line-height: 20px;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .left {
                    color: #999;
                }
                .unlock-date {
                    display: flex;
                    line-height: 20px;
                    .tag {
                        margin-left: 5px;
                        line-height: 20px;
                    }
                    .over-time {
                        color: #01a7ff;
                    }
                    .progress {
                        color: #ff9f37;
                    }
                }
            }
        }
        .operate {
            margin-top: 25px;
            text-align: center;
            .btn {
                margin: 0 10px;
                color: #333;
                width: 160px;
                height: 40px;
            }
        }
    }
}
</style>
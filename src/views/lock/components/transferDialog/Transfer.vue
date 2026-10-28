<script setup>
import { onMounted, inject, watch, ref, reactive } from 'vue'
import TokenIcon from '@/components/TokenIcon.vue'
import { getTokenIcon, getChainIcon, copy, formatAddress, isAddress, diffDay } from "@/utils"
import dayjs from "dayjs"
import api from "@/api"
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import { useStore } from '@/store'
import { ethers } from "ethers"
import { useI18n } from 'vue-i18n'
import SelectLockDate from "@/components/SelectLockDate.vue"
import { ElMessage, ElLoading } from "element-plus"
import InputLockNumber from "@/components/InputLockNumber.vue"
import DoubleToken from "@/components/DoubleToken.vue"
import BigNumber from 'bignumber.js'


const store = useStore()
const { t } = useI18n()

const props = defineProps({
    lockId: {
        type: String,
        default: ""
    },
    isLockV2: {
        type: Boolean,
        default: false
    },
    isLpToken: {
        type: Boolean,
        default: false
    },
    unlockDate: Number,
    tokenList: Array,
    symbol: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    amountString: {
        type: String,
        default: ""
    },
    chain: {
        type: String,
        default: ""
    },
    decimals: {
        type: Number,
        default: 18
    },
})

const emit = defineEmits(["close", "operateSuccess"])
const newOwnerAddress = ref('')

const showGas = ref(0)
const transferSuccessDialog = ref(false)
const unlockTxHash = ref("")

function verifyAddress() {
    newOwnerAddress.value = newOwnerAddress.value.trim()
};

async function estimateGas() {
    const gasPrice = await api.wallet.metamask.getGasPrice()
    // 余额判断
    const balance = await api.wallet.metamask.getBalance(store.walletAddress)
    console.log("balance", balance)
    let gasLimit
    if (props.isLockV2) {
        const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
        gasLimit = await lockContract.transferLockOwnership.estimateGas(props.lockId, store.walletAddress)
    } else {
        const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
        gasLimit = await lockContract.transferLockOwnership.estimateGas(props.lockId, store.walletAddress)
    }
    console.dir(gasLimit)
    showGas.value = ethers.formatEther(gasLimit * gasPrice).toString()
    console.log(showGas.value)
}

async function confirmClick() {
    if (!isAddress(newOwnerAddress.value)) {
        ElMessage.error(t('pleaseEnterTrueAddress'))
        return false
    }
    if (newOwnerAddress.value.toLowerCase() == store.walletAddress.toLowerCase()) {
        ElMessage.error(t('transferConsistentOwner'))
        return false
    }
    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })
    if (props.isLockV2) {
        try {
            const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            let res = await lockContract.transferLockOwnership(props.lockId, newOwnerAddress.value)
            console.dir(res)
            unlockTxHash.value = res.hash
            transferSuccessDialog.value = true
            await res.wait()
            emit('operateSuccess')
        } catch (e) {
            let msg = api.wallet.metamask.parseError(e)
            ElMessage.error(t(msg))
            console.log(e)
        } finally {
            loading.close()
        }
    } else {
        try {
            const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
            let res = await lockContract.transferLockOwnership(props.lockId, newOwnerAddress.value)
            console.dir(res)
            unlockTxHash.value = res.hash
            transferSuccessDialog.value = true
            await res.wait()
            emit('operateSuccess')
        } catch (e) {
            let msg = api.wallet.metamask.parseError(e)
            ElMessage.error(t(msg))
            console.log(e)
        } finally {
            loading.close()
        }
    }

}

async function init() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        onClose()
        return
    }
    // const loading = ElLoading.service({
    //     lock: true,
    //     text: "Loading...",
    // })
    // try {
    //     await estimateGas()
    // } catch (e) {
    //     console.log(e)
    // } finally {
    //     loading.close()
    // }
}


function onClose() {
    emit("close")
}
init()
</script>

<template>
    <ul class="info">
        <li>
            <div class="key">{{ $t('withdrawAssets') }}</div>
            <div class="value">
                <template v-if="props.isLpToken">
                    <DoubleToken class="token-icon-20 image" :token1="getTokenIcon(props.chain, props.tokenList[0].address)" :token2="getTokenIcon(props.chain, props.tokenList[1].address)"></DoubleToken>
                </template>
                <template v-else>
                    <icon-text :icon="getTokenIcon(props.chain, props.address)" :text="props.symbol"></icon-text>
                </template>
            </div>
        </li>
        <li>
            <div class="key">{{ $t('unlockTime') }}</div>
            <div class="value">
                <span>{{ dayjs.unix(props.unlockDate).format("YYYY-MM-DD HH:mm:ss") }}</span>
                <span>(<span class="blue-font">{{ $t('dayLeft', { day: diffDay(dayjs.unix(props.unlockDate).toDate()) })
                }}</span>)</span>
            </div>
        </li>
        <!-- <li>
            <div class="key">{{ $t('gas') }}</div>
            <div class="value">{{ `${showGas ? showGas : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li> -->
        <li class="transfer-address">
            <div>{{$t('transferLockedTo')}}</div>
            <div class="owner-address">
                <el-input v-model="newOwnerAddress" @blur="verifyAddress" :placeholder="$t('enterReceivingAddress')" class="ipt" />
            </div>
        </li>
    </ul>
    <div class="dlg-bottom">
        <el-button class="btn-gradient btn-block" block @click="confirmClick">{{$t('confirmTransfer')}}</el-button>
    </div>
    <OperateSuccessDialog v-model="transferSuccessDialog" :txHash="lockTxHash" @close="onClose">
    </OperateSuccessDialog>
</template>
<style scoped lang='scss'>
.info {
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .key {
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            font-weight: 400;
        }

        .value {
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            font-weight: 400;
        }
    }
    .transfer-address {
        display: flex;
        flex-direction: column;
        .owner-address {
            margin-top: 10px;
        }
    }
    li:last-child {
        margin-bottom: 0;
    }
}
</style>

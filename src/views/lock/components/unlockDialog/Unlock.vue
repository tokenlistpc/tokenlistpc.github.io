<script setup>
import { onMounted, inject, watch, ref, reactive } from 'vue'
import TokenIcon from '@/components/TokenIcon.vue'
import { getTokenIcon, getChainIcon, copy, formatAddress, diffDay } from "@/utils"
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
const withdrawFee = ref(0n)

const showGas = ref(0)
const unlockSuccessDialog = ref(false)
const unlockTxHash = ref("")


async function estimateGas() {
    const gasPrice = await api.wallet.metamask.getGasPrice()
    // 余额判断
    const balance = await api.wallet.metamask.getBalance(store.walletAddress)
    console.log("balance", balance)
    let gasLimit
    if (props.isLockV2) {
        const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
        withdrawFee.value = await lockContract.withdrawFee()
        if (balance < withdrawFee.value) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: ethers.formatEther(withdrawFee.value) }))
        }
        gasLimit = await lockContract.unlock.estimateGas(props.lockId, {
            value: withdrawFee.value
        })
    } else {
        const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
        withdrawFee.value = await lockContract.withdrawFee()
        if (balance < withdrawFee.value) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: ethers.formatEther(withdrawFee.value) }))
        }
        gasLimit = await lockContract.unlock.estimateGas(props.lockId, {
            value: withdrawFee.value
        })
    }
    console.dir(gasLimit)
    showGas.value = ethers.formatEther(gasLimit * gasPrice).toString()
    console.log(showGas.value)
}

async function confirmClick() {
    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })

    if (props.isLockV2) {
        try {
            const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            withdrawFee.value = await lockContract.withdrawFee()
            let res = await lockContract.unlock(props.lockId, {
                value: withdrawFee.value
            })
            console.dir(res)
            unlockTxHash.value = res.hash
            unlockSuccessDialog.value = true
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
            withdrawFee.value = await lockContract.withdrawFee()
            let res = await lockContract.unlock(props.lockId, {
                value: withdrawFee.value
            })
            console.dir(res)
            unlockTxHash.value = res.hash
            unlockSuccessDialog.value = true
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
    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })
    try {
        await estimateGas()
    } catch (e) {
        console.log(e)
    } finally {
        loading.close()
    }
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
            <div class="key">{{ $t('withdrawNumber') }}</div>
            <div class="value"><span>{{ $t('toBeWithdrawNumber') + ": " }}</span>{{ amountString }}</div>
        </li>
        <li>
            <div class="key">{{ $t('withdrawFee') }}</div>
            <div class="value">{{ `${withdrawFee ? ethers.formatEther(withdrawFee) : '--'}
                            ${store.nativeCurrencySymbol}` }}
            </div>
        </li>
        <li>
            <div class="key">{{ $t('gas') }}</div>
            <div class="value">{{ `${showGas ? showGas : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li>
    </ul>

    <div class="dlg-bottom">
        <el-button class="btn-gradient btn-block" block @click="confirmClick">{{ $t('withdraw') }}</el-button>
    </div>
    <OperateSuccessDialog v-model="unlockSuccessDialog" :txHash="lockTxHash" @close="onClose">
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

    li:last-child {
        margin-bottom: 0;
    }
}
</style>

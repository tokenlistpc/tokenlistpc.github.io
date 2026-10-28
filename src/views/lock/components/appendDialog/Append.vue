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

const emit = defineEmits(["close"])

const editFee = ref(0n)

const appendAmountString = ref('')
const balanceAmountString = ref('')


const showGas = ref('')
const lockSuccessDialog = ref(false)
const lockTxHash = ref("")



async function getBalance() {
    // 这里不用区分是否是LP 因为都有 balanceOf
    const tokenContract = await api.wallet.metamask.contractERC20(props.address)
    const balance = await tokenContract.balanceOf(store.walletAddress)
    balanceAmountString.value = ethers.formatUnits(balance, props.decimals)


    console.log("value:" + balanceAmountString.value)
    if (balance == 0n) {
        ElMessage.error(t('balanceSlow'))
        emit("error")
    }
}

async function estimateGas() {
    if (!props.isLockV2) {
        return
    }
    const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
    editFee.value = await lockContract.editFee()

    // 余额判断
    const balance = await api.wallet.metamask.getBalance(store.walletAddress)
    console.log("balance", balance)
    if (balance < editFee.value) {
        ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: ethers.formatEther(editFee.value) }))
    }

    const tokenContract = await api.wallet.metamask.contractERC20(props.address)
    const decimals = await tokenContract.decimals()
    const minAmountString = ethers.formatUnits("1", decimals)
    const amountString = BigNumber(props.amountString).plus(BigNumber(minAmountString)).toString()
    const amount = ethers.parseUnits(amountString, decimals)
    const gasPrice = await api.wallet.metamask.getGasPrice()
    let gasLimit = await lockContract.editLock.estimateGas(props.lockId.toString(), amount.toString(), 0n, {
        value: editFee.value
    })
    showGas.value = ethers.formatEther(gasLimit * gasPrice).toString()
}


async function confirmClick() {
    if (!props.isLockV2) {
        return
    }
    if (!appendAmountString.value) {
        ElMessage.error(t('enterAmount'))
        return
    }

    // 余额判断 当输入金额大于余额时 提示余额不足
    if (BigNumber(appendAmountString.value).gt(BigNumber(balanceAmountString.value))) {
        ElMessage.error(t('balanceSlow'))
        return
    }
    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })

    const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
    const tokenContract = await api.wallet.metamask.contractERC20(props.address)
    const decimals = await tokenContract.decimals()
    const amountString = BigNumber(props.amountString).plus(BigNumber(appendAmountString.value)).toString()
    console.log(amountString)
    const amount = ethers.parseUnits(amountString, decimals)
    try {
        editFee.value = await lockContract.editFee()
        let res = await lockContract.editLock(props.lockId.toString(), amount.toString(), 0n, {
            value: editFee.value
        })
        console.dir(res)
        lockTxHash.value = res.hash
        lockSuccessDialog.value = true
    } catch (e) {
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
        console.log(e)
    } finally {
        loading.close()
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
        await getBalance()
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
            <div class="key">{{ $t('appendAssets') }}</div>
            <div class="value">
                <template v-if="props.isLpToken">
                    <DoubleToken class="token-icon-20 image" :token1="getTokenIcon(props.chain, props.tokenList[0].address)"
                        :token2="getTokenIcon(props.chain, props.tokenList[1].address)"></DoubleToken>
                </template>
                <template v-else>
                    <icon-text :icon="getTokenIcon(props.chain, props.address)" :text="props.symbol"></icon-text>
                </template>
            </div>
        </li>
        <li>
            <div class="key">{{ $t('currentAmount') }}</div>
            <div class="value">{{ props.amountString }}</div>
        </li>
        <li>
            <div class="key">{{ $t('balance') }}</div>
            <div class="value">{{ `${balanceAmountString} ${props.symbol}` }}</div>
        </li>
        <li>
            <div class="key">{{ $t('editFee') }}</div>
            <div class="value">{{ `${editFee ? ethers.formatEther(editFee) : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li>
        <li>
            <div class="key">{{ $t('gas') }}</div>
            <div class="value">{{ `${showGas ? showGas : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li>
    </ul>
    <div class="input-qty">
        <div class="key">输入追加锁定金额</div>
        <div class="value">
            <InputLockNumber v-model:amount="appendAmountString" :total="balanceAmountString ? balanceAmountString : '0'"
                :decimals="props.decimals" />
        </div>
    </div>
    <div class="dlg-bottom">
        <el-button class="btn-gradient btn-block" block @click="confirmClick">{{ $t('confirmAndLock') }}</el-button>
    </div>
    <OperateSuccessDialog v-model="lockSuccessDialog" :txHash="lockTxHash" @close="onClose">
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

.input-qty {
    margin-top: 20px;

    .key {
        margin-bottom: 10px;
    }
}

.btn {
    margin-top: 50px;
}

.tips {
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    font-weight: 400;
}
</style>

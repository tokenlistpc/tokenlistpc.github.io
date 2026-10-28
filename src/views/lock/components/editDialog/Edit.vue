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

const editFee = ref(0n)

const unlockDate = ref(dayjs.unix(props.unlockDate).toDate())
const newAmountString = ref(props.amountString)
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
    console.log("estimateGas")
    const unlockDateTs = dayjs.unix(props.unlockDate).add(1, 'day').unix()
    const gasPrice = await api.wallet.metamask.getGasPrice()
    // 余额判断
    const balance = await api.wallet.metamask.getBalance(store.walletAddress)
    console.log("balance", balance)
    let gasLimit
    if (props.isLockV2) {
        const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
        const tokenContract = await api.wallet.metamask.contractERC20(props.address)
        const decimals = await tokenContract.decimals()
        const amount = ethers.parseUnits(props.amountString, decimals)
        editFee.value = await lockContract.editFee()
        if (balance < editFee.value) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: ethers.formatEther(editFee.value) }))
        }
        gasLimit = await lockContract.editLock.estimateGas(props.lockId, amount.toString(), unlockDateTs, {
            value: editFee.value
        })
    } else {
        const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
        editFee.value = await lockContract.editFee()
        if (balance < editFee.value) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: ethers.formatEther(editFee.value) }))
        }
        gasLimit = await lockContract.editLock.estimateGas(props.lockId, unlockDateTs, {
            value: editFee.value
        })
    }
    console.dir(gasLimit)
    showGas.value = ethers.formatEther(gasLimit * gasPrice).toString()
    console.log(showGas.value)
}


function verifyAmount() {
    console.log(newAmountString.value)
    if (BigNumber(newAmountString.value).lt(props.amountString) || !newAmountString.value) {
        newAmountString.value = props.amountString
    }
}

async function confirmClick() {
    if (!unlockDate.value) {
        ElMessage.error(t('selectUnlockTime'))
        return
    }
    if (BigNumber(newAmountString.value).lt(props.amountString) || !newAmountString.value) {
        ElMessage.error(t('newLockedAmountLimit'))
        return
    }
    // console.log(1122, newAmountString.value)
    // console.log('1122', BigNumber(newAmountString.value).minus(props.amountString).toString())
    if ((BigNumber(newAmountString.value).minus(props.amountString)).gt(BigNumber(balanceAmountString.value))) {
        ElMessage.error(props.symbol + t('balanceSlow'))
        return
    }

    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })

    const unlockDateTs = dayjs(unlockDate.value).unix()
    if (props.isLockV2) {
        const lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
        const tokenContract = await api.wallet.metamask.contractERC20(props.address)
        const decimals = await tokenContract.decimals()
        const amount = ethers.parseUnits(newAmountString.value, decimals)
        console.log(amount)
        try {
            editFee.value = await lockContract.editFee()
            let res = await lockContract.editLock(props.lockId.toString(), amount.toString(), unlockDateTs, {
                value: editFee.value
            })
            console.dir(res)
            lockTxHash.value = res.hash
            lockSuccessDialog.value = true
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
        const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
        try {
            editFee.value = await lockContract.editFee()
            let res = await lockContract.editLock(props.lockId.toString(), unlockDateTs, {
                value: editFee.value
            })
            console.dir(res)
            lockTxHash.value = res.hash
            lockSuccessDialog.value = true
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
        emit("close")
        return
    }
    const loading = ElLoading.service({
        lock: true,
        text: "Loading...",
    })
    try {
        unlockDate.value = dayjs.unix(props.unlockDate).add(1, 'day').endOf('day').toDate()
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
    <ul class="info" v-if="props.chain">
        <li>
            <div class="key">{{ $t('lockAssets') }}</div>
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
        <li>
            <div class="key">{{ $t('editFee') }}</div>
            <div class="value">{{ `${editFee ? ethers.formatEther(editFee) : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li>
        <li>
            <div class="key">{{ $t('gas') }}</div>
            <div class="value">{{ `${showGas ? showGas : '--'} ${store.nativeCurrencySymbol}` }}</div>
        </li>
    </ul>
    <div class="select-date">
        <div class="key">{{ $t('setDelayDate') }}</div>
        <div class="value">
            <SelectLockDate v-model="unlockDate" :min-date="dayjs.unix(props.unlockDate).add(1, 'day').endOf('day').toDate()" />
        </div>
    </div>
    <div class="change-amount" v-if="props.isLockV2">
        <div class="key">{{ $t('newLockedAmount') }}</div>
        <div class="value">
            <el-input size="large" type="number" v-model="newAmountString" @blur="verifyAmount" :placeholder="$t('pleaseEnter')" clearable />
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

.select-date {
    margin-top: 20px;

    .key {
        margin-bottom: 10px;
    }
}
.change-amount {
    margin-top: 20px;

    .key {
        margin-bottom: 10px;
    }
}
</style>

<script setup>
import { computed, inject, watch, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, copy, formatAddress } from "@/utils"
import { ethers } from "ethers"
import api from "@/api"
import Rate from "@/components/Rate.vue"
import { useStore } from '@/store';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import BigNumber from "bignumber.js"
import { useCtManageStore } from '@/store/create/manage.js';

const { t } = useI18n()
const store = useStore()
const manageStore = useCtManageStore()

const emit = defineEmits(["operateSuccess"])
const btnLoading = ref(false)
const buyFundFee = ref(manageStore.buyFundFee)
const buyLPFee = ref(manageStore.buyLPFee)
const buyBurnFee = ref(manageStore.buyBurnFee)
const buyRewardFee = ref(manageStore.buyRewardFee)
const sellFundFee = ref(manageStore.sellFundFee)
const sellLPFee = ref(manageStore.sellLPFee)
const sellBurnFee = ref(manageStore.sellBurnFee)
const sellRewardFee = ref(manageStore.sellRewardFee)
const txHash = ref('')
const showOperateSuccess = ref(false)

const buyFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return BigNumber(buyFundFee.value).plus(buyLPFee.value).plus(buyBurnFee.value)
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return BigNumber(buyFundFee.value).plus(buyLPFee.value).plus(buyRewardFee.value)
    }else if (manageStore.deployerId == 4) {
        return BigNumber(buyFundFee.value).plus(buyLPFee.value).plus(buyRewardFee.value).plus(buyBurnFee.value)
    }
})
const sellFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return BigNumber(sellFundFee.value).plus(sellLPFee.value).plus(sellBurnFee.value)
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return BigNumber(sellFundFee.value).plus(sellLPFee.value).plus(sellRewardFee.value)
    }else if (manageStore.deployerId == 4) {
        return BigNumber(sellFundFee.value).plus(sellLPFee.value).plus(sellRewardFee.value).plus(sellBurnFee.value)
    }
})

const maxBuyFundFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(buyLPFee.value).minus(buyBurnFee.value))
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return Number(BigNumber(20).minus(buyLPFee.value).minus(buyRewardFee.value))
    }else if (manageStore.deployerId == 4) {
        return Number(BigNumber(25).minus(buyLPFee.value).minus(buyRewardFee.value).minus(buyBurnFee.value))
    }
})
const maxBuyLPFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(buyFundFee.value).minus(buyBurnFee.value))
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return Number(BigNumber(20).minus(buyFundFee.value).minus(buyRewardFee.value))
    }else if (manageStore.deployerId == 4) {
        return Number(BigNumber(25).minus(buyFundFee.value).minus(buyRewardFee.value).minus(buyBurnFee.value))
    }

})
const maxBuyBurnFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(buyFundFee.value).minus(buyLPFee.value))
    }else if (manageStore.deployerId == 4) {
        return Number(BigNumber(25).minus(buyFundFee.value).minus(buyLPFee.value).minus(buyRewardFee.value))
    }
})

const maxBuyRewardFee = computed(() => {
    if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return Number(BigNumber(20).minus(buyFundFee.value).minus(buyLPFee.value).toNumber())
    }else if (manageStore.deployerId == 4) {
        return Number(BigNumber(25).minus(buyFundFee.value).minus(buyLPFee.value).minus(buyBurnFee.value))
    }
})

const maxSellFundFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(sellLPFee.value).minus(sellBurnFee.value))
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return Number(BigNumber(20).minus(sellLPFee.value).minus(sellRewardFee.value))
    } else if (manageStore.deployerId == 4) { 
        return Number(BigNumber(25).minus(sellLPFee.value).minus(sellRewardFee.value).minus(sellBurnFee.value))
    }
})
const maxSellLPFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(sellFundFee.value).minus(sellBurnFee.value))
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return Number(BigNumber(20).minus(sellFundFee.value).minus(sellRewardFee.value))
    }  else if (manageStore.deployerId == 4) { 
        return Number(BigNumber(25).minus(sellFundFee.value).minus(sellRewardFee.value).minus(sellBurnFee.value))
    }

})
const maxSellBurnFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return Number(BigNumber(20).minus(sellFundFee.value).minus(sellLPFee.value))
    } else if (manageStore.deployerId == 4) { 
        return Number(BigNumber(25).minus(sellFundFee.value).minus(sellLPFee.value).minus(sellRewardFee.value))
    }
})

const maxSellRewardFee = computed(() => {
    if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7||manageStore.deployerId == 8) {
        return BigNumber(20).minus(sellFundFee.value).minus(sellLPFee.value).toNumber()
    } else if (manageStore.deployerId == 4) { 
        return Number(BigNumber(25).minus(sellFundFee.value).minus(sellLPFee.value).minus(sellBurnFee.value))
    }
})


async function editTax() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        if (BigNumber(buyFundFee.value).plus(buyBurnFee.value).plus(buyLPFee.value).plus(sellFundFee.value).plus(sellBurnFee.value).plus(sellLPFee.value).lte(0)) {
            ElMessage.error(t('taxlimit1'))
            return
        }
    } else if (manageStore.deployerId == 2||manageStore.deployerId == 7) {
        if (BigNumber(buyFundFee.value).plus(buyLPFee.value).plus(sellFundFee.value).plus(sellLPFee.value).lte(0)) {

            ElMessage.error(t('taxlimit2'))
            return
        }
    } else if (manageStore.deployerId == 3||manageStore.deployerId == 8) {
        if (BigNumber(buyFundFee.value).plus(buyRewardFee.value).plus(buyLPFee.value).plus(sellFundFee.value).plus(sellRewardFee.value).plus(sellLPFee.value).lte(0)) {
            ElMessage.error(t('taxlimit1'))
            return
        }
    }
    btnLoading.value = true
    try {
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        let customs
        if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
            customs = [
                BigNumber(buyLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyBurnFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellBurnFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellFundFee.value).div(100).multipliedBy(10000).toNumber(),
            ]
        } else if (manageStore.deployerId == 2||manageStore.deployerId == 7) {
            customs = [
                BigNumber(buyLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellFundFee.value).div(100).multipliedBy(10000).toNumber(),
            ]
        } else if (manageStore.deployerId == 3||manageStore.deployerId == 8) {
            customs = [
                BigNumber(buyFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellLPFee.value).div(100).multipliedBy(10000).toNumber(),
            ]
        } else if (manageStore.deployerId == 4) {
            customs = [
                BigNumber(buyFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(buyBurnFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellFundFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellLPFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellRewardFee.value).div(100).multipliedBy(10000).toNumber(),
                BigNumber(sellBurnFee.value).div(100).multipliedBy(10000).toNumber(),
            ]
        }

        const res = await tokenContract.completeCustoms(customs)
        ElMessage.success(t('submitSuccess'))
        txHash.value = res.hash
        showOperateSuccess.value = true
        await res.wait()
        manageStore.getTokenFee(manageStore.tokenAddress)
        ElMessage.success(t('editTaxSuccessfully'))
        emit('operateSuccess')
    } catch (e) {
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    } finally {
        btnLoading.value = false
    }
}

</script>
<template>
    <div class="edit-rate">
        <div class="dlg-item">
            <div class="dlg-item-title">
                <span v-if="manageStore.deployerId != 4">{{ $t('editBuyTax',{buyFee:buyFee,maxBuyFee:20}) }}</span>
                <span v-else>{{ $t('editBuyTax',{buyFee:buyFee,maxBuyFee:25}) }}</span>
            </div>
            <div class="dlg-item-value">
                <div class="rate-item">
                    <div class="rate-item-title">{{ $t('marketingTax') }}</div>
                    <Rate class="rate-item-value" v-model="buyFundFee" :max="maxBuyFundFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item">
                    <div class="rate-item-title">{{ $t('liquidityTax') }}</div>
                    <Rate class="rate-item-value" v-model="buyLPFee" :max="maxBuyLPFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item" v-if="manageStore.deployerId == 1||manageStore.deployerId == 4||manageStore.deployerId == 6">
                    <div class="rate-item-title">{{ $t('burnTax') }}</div>
                    <Rate class="rate-item-value" v-model="buyBurnFee" :max="maxBuyBurnFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item" v-if="manageStore.deployerId==2||manageStore.deployerId == 3||manageStore.deployerId == 4||manageStore.deployerId == 7||manageStore.deployerId == 8">
                    <div class="rate-item-title">{{ $t('rewardTax') }}</div>
                    <Rate class="rate-item-value" v-model="buyRewardFee" :max="maxBuyRewardFee" :min="0" :step="0.1" :precision="2" />
                </div>
            </div>
        </div>
        <div class="dlg-item">
            <div class="dlg-item-title">
                <span v-if="manageStore.deployerId != 4">{{ $t('editSellTax',{sellFee:sellFee,maxSellFee:20}) }}</span>
                <span v-else>{{ $t('editSellTax',{sellFee:sellFee,maxSellFee:25}) }}</span>
            </div>
            <div class="dlg-item-value">
                <div class="rate-item">
                    <div class="rate-item-title">{{ $t('marketingTax') }}</div>
                    <Rate class="rate-item-value" v-model="sellFundFee" :max="maxSellFundFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item">
                    <div class="rate-item-title">{{ $t('liquidityTax') }}</div>
                    <Rate class="rate-item-value" v-model="sellLPFee" :max="maxSellLPFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item" v-if="manageStore.deployerId == 1||manageStore.deployerId == 4||manageStore.deployerId == 6">
                    <div class="rate-item-title">{{ $t('burnTax') }}</div>
                    <Rate class="rate-item-value" v-model="sellBurnFee" :max="maxSellBurnFee" :min="0" :step="0.1" :precision="2" />
                </div>
                <div class="rate-item" v-if="manageStore.deployerId == 2||manageStore.deployerId == 3||manageStore.deployerId == 4||manageStore.deployerId == 7||manageStore.deployerId == 8">
                    <div class="rate-item-title">{{ $t('rewardTax') }}</div>
                    <Rate class="rate-item-value" v-model="sellRewardFee" :max="maxSellRewardFee" :min="0" :step="0.1" :precision="2" />
                </div>
            </div>
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" :loading="btnLoading" @click="editTax">{{ $t('submit') }}</el-button>
        </div>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
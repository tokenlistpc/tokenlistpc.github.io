<script setup>
import { computed, inject, watch, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, copy, formatAddress } from "@/utils"
import { ethers } from "ethers"
import api from "@/api"
import { useStore } from '@/store';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import { useCtManageStore } from '@/store/create/manage.js';

const { t } = useI18n()
const store = useStore()
const manageStore = useCtManageStore()

const emit = defineEmits(["operateSuccess"])
const amount = ref(manageStore.maxWalletAmount)
const txHash = ref('')
const loading = ref(false)
const showOperateSuccess = ref(false)



async function edit() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    // 判断下金额
    if (!amount.value) {
        ElMessage.error(t('amountEmpty'))
        return
    }
    // 不能超过多少位
    if (amount.value.replace('.', '').length > 34) {
        ElMessage.error(t('amountOver'))
        return;
    }
    // 小数位数不能超过decimals
    let numArray = amount.value.split('.')
    if (numArray[1] && numArray[1].length > manageStore.decimals) {
        ElMessage.error(t('amountOver'))
        return;
    }
    loading.value = true
    try {
        const contract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        let res = await contract.changeWalletLimit(ethers.parseUnits(amount.value, manageStore.decimals))
        txHash.value = res.hash
        showOperateSuccess.value = true
        res.wait().then(async (data) => {
            if (data.status === 1) {
                ElMessage.success(t('upChainSuccessfully'))
                let maxWalletAmount = await contract.maxWalletAmount()
                manageStore.maxWalletAmount = ethers.formatUnits(maxWalletAmount.toString(), manageStore.decimals)
                loading.value = false
                emit('operateSuccess')
            }
        })
    } catch (e) {
        loading.value = false
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    } finally {

    }
}

</script>
<template>
    <div class="mint">
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('walletAmount') }}</div>
            <el-input class="ipt-block" type="number" v-model="amount" :placeholder="$t('pleaseEnter')" />
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" :loading="loading" @click="edit">{{ $t('submit') }}</el-button>
        </div>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
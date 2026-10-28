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
const amount = ref('')
const address = ref(store.walletAddress)
const txHash = ref('')
const loading = ref(false)
const showOperateSuccess = ref(false)

function addressBlur() {
    if (!(/^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(address.value))) {
        ElMessage.error(t('addressWrong'))
    }
}

async function mintClick() {
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
    if (!/^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(address.value)) {
        ElMessage.error(t('addressWrong'))
        return
    }
    loading.value = true
    try {
        const contract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        let res = await contract.mint(address.value, ethers.parseUnits(amount.value, manageStore.decimals))
        txHash.value = res.hash
        showOperateSuccess.value = true
        res.wait().then(async (data) => {
            if (data.status === 1) {
                ElMessage.success(t('upChainSuccessfully'))
                let totalSupply = await contract.totalSupply()
                manageStore.totalSupply = ethers.formatUnits(totalSupply.toString(), manageStore.decimals)
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
            <div class="dlg-item-title">{{ $t('currentTotal') }}</div>
            <el-input class="ipt-block" disabled v-model="manageStore.totalSupply" />
        </div>
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('mintTokenAmount') }}</div>
            <el-input class="ipt-block" type="number" v-model="amount" :placeholder="$t('pleaseEnter')" />
        </div>
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('receivingAddress') }}</div>
            <el-input class="ipt-block" v-model="address" @blur="addressBlur" :placeholder="$t('pleaseEnter')" />
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" :loading="loading" @click="mintClick">{{ $t('submitAdd') }}</el-button>
        </div>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
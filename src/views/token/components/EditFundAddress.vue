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

const txHash = ref('')
const showOperateSuccess = ref(false)
const btnLoading = ref(false)
const newFundAddress = ref('')
const presentFundAddress=computed(() => { 
    return manageStore.fundAddress
})
async function edit() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    newFundAddress.value=newFundAddress.value.trim()
    if (!/^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(newFundAddress.value)) {
        ElMessage.error(t('trueFormat'))
        return
    }
    if (newFundAddress.value.toLowerCase() == presentFundAddress.value.toLowerCase()) {
        ElMessage.error(t('transferConsistent'))
        return
    }
    btnLoading.value = true
    try {
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        const res = await tokenContract.setFundAddress(newFundAddress.value)
        ElMessage.success(t('submitSuccess'))
        txHash.value = res.hash
        showOperateSuccess.value = true
        await res.wait()
        manageStore.fundAddress = (await tokenContract.fundAddress()).toLowerCase()
        emit('operateSuccess')
        ElMessage.success(t('upChainSuccessfully'))
    } catch (e) {
        console.log(e)
        if (e.info && e.info.error && e.info.error.code === 4001) {
            ElMessage.error(t('userCancelOperate'))
        } else if (e.error && e.error.message && e.error.message == 'Canceled') {
            ElMessage.error(t('userCancelOperate'))
        } else {
            ElMessage.error(t('transferFail'))
        }
    } finally {
        btnLoading.value = false
    }
}


</script>
<template>
    <div class="transfer">
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('currentFundAddress') }}</div>
            <el-input class="ipt-block" disabled v-model="presentFundAddress" />
        </div>
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('newFundAddress') }}</div>
            <el-input class="ipt-block" v-model="newFundAddress" :placeholder="$t('input')" />
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" :loading="btnLoading" @click="edit">{{ $t('submit') }}</el-button>
        </div>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
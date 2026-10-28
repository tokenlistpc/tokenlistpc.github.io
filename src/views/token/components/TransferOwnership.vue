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
const ownerAddress = ref(manageStore.owner)
const transferAddress = ref('')

async function transfer() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    transferAddress.value=transferAddress.value.trim()
    if (!/^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(transferAddress.value)) {
        ElMessage.error(t('trueFormat'))
        return
    }
    if (transferAddress.value == ownerAddress.value) {
        ElMessage.error(t('transferConsistent'))
        return
    }
    btnLoading.value = true
    try {
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        const res = await tokenContract.transferOwnership(transferAddress.value)
        ElMessage.success(t('submitSuccess'))
        txHash.value = res.hash
        showOperateSuccess.value = true
        await res.wait()
        manageStore.owner = await tokenContract.owner()
        transferAddress.value = ""
        emit('operateSuccess')
        ElMessage.success(t('transferSuccess'))
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
            <div class="dlg-item-title">{{ $t('ownership') }}</div>
            <el-input class="ipt-block" disabled v-model="ownerAddress" />
        </div>
        <div class="dlg-item">
            <div class="dlg-item-title">{{ $t('transferTo') }}</div>
            <el-input class="ipt-block" v-model="transferAddress" :placeholder="$t('input')" />
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" :loading="btnLoading" @click="transfer">{{ $t('submit') }}</el-button>
        </div>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
<script setup>
import { computed, inject, watch, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, copy, formatAddress } from "@/utils"
import { ethers } from "ethers"
import api from "@/api"
import { useStore } from '@/store';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import CopyText from '@/components/CopyText.vue'
import { useCtManageStore } from '@/store/create/manage.js';

const { t } = useI18n()
const store = useStore()
const manageStore = useCtManageStore()

const addressList = ref([{
    addressAdd: '',
    isAdded: false,
}])
const addLoading = ref(false)

const removeAddressList = ref([])
const removeLoading = ref(false)

const emit = defineEmits(["operateSuccess"])

const txHash = ref('')
const showOperateSuccess = ref(false)

function formatter(value) {
    if (value) {
        return value.trim();
    } else {
        return value
    }
};

function addAddress() {
    addressList.value.push({
        addressAdd: '',
        isAdded: false,
    })
}

function deleteAddress(index) {
    addressList.value.splice(index, 1)
}


async function verifyAddress(index) {
    addressList.value[index].addressAdd=addressList.value[index].addressAdd.trim()
    let addressAdd = addressList.value[index].addressAdd
    addressList.value[index].isAdded = false
    if (!addressAdd) {
        return
    }
    const p = /^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/
    if (!p.test(addressAdd)) {
        addressList.value[index].addressAdd = ''
        ElMessage.error(t('addressWrong'))
        return
    } 
    console.log(addressList.value.find(x => x.addressAdd.toLowerCase() == addressAdd.toLowerCase()))
    if (addressList.value.filter(x => x.addressAdd.toLowerCase() == addressAdd.toLowerCase()).length > 1) {
        addressList.value[index].addressAdd = ''
        ElMessage.error(t('addressHasEntered'))
    }
    if (manageStore.deployerId == 4) {
        addLoading.value = true
        removeLoading.value = true
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        console.log(tokenContract)
        const res = await tokenContract._feeWhiteList(addressAdd)
        if (res) {
            addressList.value[index].isAdded = true
        } else { 
            addressList.value[index].isAdded = false
        }
        addLoading.value = false
        removeLoading.value = false
    } else { 
        if (manageStore.whiteList.findIndex(x => x == addressAdd.toLowerCase()) != -1) {
            addressList.value[index].isAdded = true
        } else {
            addressList.value[index].isAdded = false
        }
    }
    
}

async function addWhiteList() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    let addresses = []
    for (let index in addressList.value) {
        if (addressList.value[index].addressAdd && !addressList.value[index].isAdded) {
            addresses.push(addressList.value[index].addressAdd)
        }
    }
    if (addresses.length == 0) {
        ElMessage.error(t('enterAddressLimit'))
        return
    }
    addLoading.value = true
    console.log(addresses)
    try {
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        console.log(tokenContract)
        const res = await tokenContract.setFeeWhiteList(addresses, true)
        // console.log(res)
        txHash.value = res.hash
        showOperateSuccess.value=true
        await res.wait()
        if (manageStore.deployerId!=4) { 
            await manageStore.getWhiteList(manageStore.tokenAddress)
            removeAddressList.value = []
        }
        addressList.value = [{
            addressAdd: '',
            isAdded: false,
        }]
        ElMessage.success(t('addWhiteListSuccess'))
    } catch (e) {
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    } finally {
        addLoading.value = false
    }
}

async function removeWhiteList() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    let removeAddresses = []
    if (manageStore.deployerId == 4) {
        for (let index in addressList.value) {
            if (addressList.value[index].addressAdd && addressList.value[index].isAdded) {
                removeAddresses.push(addressList.value[index].addressAdd)
            }
        }
        if (removeAddresses.length == 0) {
            ElMessage.error(t('enterRemoveAddressLimit'))
            return
        }
    } else { 
        removeAddresses = removeAddressList.value
        if (removeAddresses.length == 0) {
            ElMessage.error(t('selectAddressLimit'))
            return
        }
    }
    
    removeLoading.value = true
    try {
        const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        console.log(tokenContract)
        const res = await tokenContract.setFeeWhiteList(removeAddresses, false)
        console.log(res)
        txHash.value = res.hash
        showOperateSuccess.value=true
        await res.wait()
        if (manageStore.deployerId != 4) { 
            await manageStore.getWhiteList(manageStore.tokenAddress)
            removeAddressList.value = []
        }
        addressList.value = [{
            addressAdd: '',
            isAdded: false,
        }]
        ElMessage.success(t('removeWhiteListSuccess'))
    } catch (e) {
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    } finally {
        removeLoading.value = false
    }
}

</script>
<template>
    <div class="mint">
        <div class="dlg-item" v-for="(item,index) in addressList" :key="index">
            <el-icon class="close" v-if="addressList.length>1" @click="deleteAddress(index)">
                <CircleCloseFilled />
            </el-icon>
            <el-input class="ipt-block" clearable :formatter="formatter" @change="verifyAddress(index)" v-model="addressList[index].addressAdd" :placeholder="t('inputAddress')" />
            <div class="err-info has-added" v-if="addressList[index].addressAdd&&addressList[index].isAdded">{{$t('addressAdded')}}</div>
        </div>
        <div class="dlg-item">
            <el-button class="add-address" size="small" @click="addAddress()">
                <el-icon class="icon">
                    <Plus />
                </el-icon>
                {{ $t('addAddress') }}
            </el-button>
        </div>
        <div class="dlg-bottom" v-if="manageStore.deployerId!=4">
            <el-button class="btn-gradient btn-block" :loading="addLoading" @click="addWhiteList">{{ $t('add') }}</el-button>
            <div class="white-list-table">
                <div v-if="manageStore.whiteList.length>0" class="white-list-table-title">
                    <span>{{ $t('added') }}</span>
                    <el-button class="btn-gradient" :loading="removeLoading" @click="removeWhiteList" type="primary" size="small">{{$t('remove')}}</el-button>
                </div>
                <el-checkbox-group class="checkbox-group" v-model="removeAddressList">
                    <el-checkbox class="white-list-table-item" :label="item" v-for="(item,index) of manageStore.whiteList" :key="index">
                        <CopyText :text="item" :smallText="formatAddress(item)"></CopyText>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="dlg-bottom" v-else>
            <div class="operate">
                <el-button class="btn remove" :loading="removeLoading" @click="removeWhiteList">{{$t('remove')}}</el-button>
                <el-button class="btn-gradient btn" :loading="addLoading" @click="addWhiteList">{{ $t('add') }}</el-button>
            </div>
        </div>
        <OperateSuccessDialog :txHash="txHash" v-model="showOperateSuccess"></OperateSuccessDialog>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.dlg-item {
    margin-bottom: 10px;
    position: relative;
    .close {
        position: absolute;
        z-index: 999;
        font-size: 20px;
        cursor: pointer;
        top: -9px;
        right: -6px;
    }
    .err-info {
        margin-left:10px;
        margin-top: 2px;
        font-size: 12px;
        color: rgb(226, 63, 63);
    }
    .has-added{
        color: #FF9F37;
    }
    .add-address {
        width: 100%;
        height: 25px;
        .icon {
            margin-right: 5px;
        }
    }
}
.dlg-bottom {
    margin-top: 20px;
    .operate{
        display: flex;
        .btn{
            width: 100%;
        }
        .remove{
            background: #F5F5F5;
            border: none;
        }
    }
}
.white-list-table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.checkbox-group {
    margin-top: 10px;
}
.white-list-table-item {
    width: 100%;
    margin-top: 0px !important;
    display: flex;
    justify-content: flex-start !important;
    height: 25px;
}
</style>
<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import api from '@/api'
import TokenName from '@/components/TokenName.vue'
import CopyText from '@/components/CopyText.vue'
import { getChainIcon, getTokenIcon, isExpired, diffDay, formatAddress, numFormat } from "@/utils"
import { useStore } from '@/store'
import { useMtStore } from '@/store/transfer';
import dayjs from 'dayjs'
import cfg from "@/config"
import { ethers } from "ethers"

const store = useStore()
const mtStore = useMtStore()
const transferData = reactive({
    loading: false,
    transferList: [],
    pageSize: 15,
    pageNumber: 1,
    totalRecords: 0
})

const comboTransferList = computed(() => {
    if (transferData.pageNumber == 1) {
        return mtStore.transferringList.concat(transferData.transferList);
    } else { 
        return transferData.transferList
    }
})

async function getMultiSendHistoryFn() {
    transferData.loading = true
   
    try {
        const res = await api.multiSend.getMultiSendHistory(store.walletAddress, transferData.pageSize, transferData.pageNumber, store.chain)
        console.log(res)
        if (res.data.status == 0) {
            transferData.totalRecords=res.data.data.total
            transferData.transferList = res.data.data.list
            // 判断是否存在待执行项并且待执行不存在转账列表
            if (mtStore.transferringList.length > 0 && res.data.data.list.length > 0) {
                for (let index in mtStore.transferringList) {
                    if (res.data.data.list.find(x => x.txHash == mtStore.transferringList[index].txHash)) {
                        mtStore.transferringList.splice(index, 1)
                    }
                }
            }
            
        } else {
            error.value = true
        }
    } catch (err) {
        console.log(err)
    } finally {
        transferData.loading = false
    }
}


function jumpToTxHash(row) { 
    let chainItem = cfg.chainList.find(x => x.chain == row.chain)
    if (chainItem) {
        window.open(chainItem.txBlockExplorerUrl + row.txHash, '_blank')
    } else {
        ElMessage.error(t('unsupportedNetwork'))
    }
}

watch(
    () => store.isConnecting,
    (value) => {
        if (value) {
            console.log(222)
            getMultiSendHistoryFn()
        }
    },
    { immediate: true }
)

</script>
<template>
    <div class="transfer-history">
        <div class="empty" v-if="comboTransferList.length==0&&!transferData.loading">
            <img style="width: 80px;" src="@/assets/imgs/noData.png" :fit="fit" />
            <div class="info">{{$t('noToken')}}，<span @click="getMultiSendHistoryFn" style="color:#409eff;cursor: pointer;">{{ $t('refresh') }}</span></div>
        </div>
        <div class="list" v-else>
            <el-table class="table-mine" v-loading="transferData.loading" @row-click="jumpToTxHash" :data="comboTransferList">
                <el-table-column prop="tokenName" :label="$t('tokenName')" width="150">
                    <template #default="scope">
                        <TokenName class="token-name" :symbol="scope.row.tokenSymbol" 
                            :bigIcon="getTokenIcon(store.chain.toLowerCase(), scope.row.tokenAddress.toLowerCase())"
                            :smallIcon="getChainIcon(store.chain.toLowerCase())"></TokenName>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="amount" label="类型" width="150">
                    <template #default="scope">
                    </template>
                </el-table-column> -->
                <el-table-column prop="amount" :label="$t('addressCount')">
                    <template #default="scope">
                        {{ scope.row.receiverCount }}
                    </template>
                </el-table-column>
                <el-table-column prop="amount" :label="$t('transferAmount')">
                    <template #default="scope">
                        {{ ethers.formatEther(scope.row.sendAmount) }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="unlockDate" label="预估消耗Gas">
                    <template #default="scope">
                        {{  }}
                    </template>
                </el-table-column> -->
                <el-table-column prop="address" :label="$t('transferTime')" >
                    <template #default="scope">
                        {{ dayjs.unix(scope.row.sendTime).format("YYYY-MM-DD HH:mm") }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" :label="$t('status')" >
                    <template #default="scope">
                        <span v-if="scope.row.status == 0" class="status finish">{{ $t('transferFinish') }}</span>
                        <span v-else-if="scope.row.status == 1" class="status fail">{{ $t('mulTransferFail') }}</span>
                        <span v-else class="status wait">{{ $t('transferWait') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="unlockDate" :label="$t('txHash')">
                    <template #default="scope">
                        <CopyText :smallText="formatAddress(scope.row.txHash,6)" :text="scope.row.txHash"></CopyText>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="transferData.totalRecords" @current-change="getMultiSendHistoryFn" :page-size="transferData.pageSize" v-model:current-page="transferData.pageNumber" />

            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.empty {
    margin-top: 90px;
    margin-bottom: 330px;
    text-align: center;

    .info {
        margin-top: 10px;
        color: #999;
        font-size: 14px;
    }

    .create {
        font-size: 16px;
        margin-top: 40px;
        width: 136px;
        height: 40px;
    }
}

.list {
    margin-top: 20px;

    .token-name {
        --sizeBig: 30px;
        --sizeSmall: 14px;
    }
}

.pagination {
    margin: 30px 0 10px 0;
    display: flex;
    justify-content: center;
}
</style>
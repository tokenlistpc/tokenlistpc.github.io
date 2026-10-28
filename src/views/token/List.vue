<script setup>
import { computed, inject, watch, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import TokenName from '@/components/TokenName.vue'
import CopyText from '@/components/CopyText.vue'
import { getChainIcon, getTokenIcon, isExpired, diffDay, formatAddress, numFormat } from "@/utils"
import cfg from "@/config"
import api from "@/api"
import { useStore } from '@/store';
import { useConfigStore } from "@/store/config"
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs'
import { ethers } from "ethers"


const store = useStore()
const configStore = useConfigStore()
const totalRecords = ref(0)
const pageSize = ref(10)
const { t } = useI18n()
const route = useRoute();
const router = useRouter()
const tokenData = reactive({
    pageNumber: 1,
    tokenList: [],
    loading: false,
})

async function getTotalRecords() {
    try {
        let tokenFactoryContract
        if (store.create.v2) {
            tokenFactoryContract = await api.wallet.metamask.contractTokenFactoryV2(store.create.tokenFactoryV2Address)
        } else {
            tokenFactoryContract = await api.wallet.metamask.contractTokenFactory(store.create.tokenFactoryAddress)
        }
        let res = await tokenFactoryContract.totalOwnRecordsForUser(store.walletAddress)
        totalRecords.value = Number(res)
    } catch (err) {
        console.error(err)
    }
}

async function getOwnRecords() {
    if (!store.walletAddress) {

        ElMessage.error(t('pleaseConnectWallet'))
        tokenData.loading = false
        return
    }
    tokenData.loading = true
    try {
        await getTotalRecords()
        if (totalRecords.value == 0) {
            throw 'noRecords'
        }

        // let start = ((tokenData.pageNumber - 1) * pageSize.value).toString()
        // let end = ((tokenData.pageNumber - 1) * pageSize.value + pageSize.value - 1).toString()

        // let pageNumTotal = Math.ceil(totalRecords.value / pageSize.value)
        // console.log(totalRecords.value)
        let start = totalRecords.value-((tokenData.pageNumber - 1) * pageSize.value+ pageSize.value)
        let end = totalRecords.value-((tokenData.pageNumber - 1) * pageSize.value)-1
        if (start < 0) {
            start = 0
        }
        
        let tokenFactoryContract
        if (store.create.v2) {
            tokenFactoryContract = await api.wallet.metamask.contractTokenFactoryV2(store.create.tokenFactoryV2Address)
        } else {
            tokenFactoryContract = await api.wallet.metamask.contractTokenFactory(store.create.tokenFactoryAddress)
        }
        let res = await tokenFactoryContract.getOwnRecords(store.walletAddress, start.toString(), end.toString())
        console.log(res)
        tokenData.tokenList = []
        for (let item of res) {
            let tokenItem = {
                tokenAddress: item[6].toLowerCase(),
                createTime: Number(item[0]),
                symbol: item[4],
                name: item[3],
                chain: store.chain,
                deployerId: Number(item[5]),
                owner: item[2]
            }
            tokenData.tokenList.unshift(tokenItem)
        }
        console.log(tokenData.tokenList)
    } catch (err) {
        console.log(err)
    } finally {
        tokenData.loading = false
    }
}


watch(
    () => store.isConnecting,
    (value) => {
        if (value) {
            console.log(222)
            getOwnRecords()
        }
    },
    { immediate: true }
)

function handleCurrentChange() {
    getOwnRecords()
}

// 打开链接钱包模态框
function connectWalletClick() {
    configStore.loginDialogVisible = true
}

// 跳转代币创建
function jumpToCreate() {
    router.push('/token/create')
}

// 跳转代币详情
function jumpToDetail(row) {
    router.push(`/token/manage/${row.deployerId}/${row.chain}/${row.tokenAddress}`)
}

</script>
<template>
    <div class="token-list">
        <div class="empty" v-if="!tokenData.loading && tokenData.tokenList.length == 0">
            <img style="width: 80px;" src="@/assets/imgs/noData.png" :fit="fit" />
            <div class="info">{{$t('noToken')}}，<span @click="getOwnRecords" style="color:#409eff;cursor: pointer;">{{ $t('refresh') }}</span></div>
            <el-button v-if="store.isConnecting" type="primary" class="btn-gradient create" @click="jumpToCreate()">{{ $t('tokenCreate') }}</el-button>
            <el-button v-else type="primary" class="btn-gradient create" @click="connectWalletClick()">{{ $t('connectWallet') }}</el-button>
        </div>
        <div class="list" v-else>
            <el-table class="table-mine" v-loading="tokenData.loading" :data="tokenData.tokenList">
                <el-table-column :label="$t('tokenName')" width="150">
                    <template #default="scope">
                        <TokenName class="token-name" :symbol="scope.row.symbol" :name="scope.row.name" :bigIcon="getTokenIcon(store.chain.toLowerCase(), scope.row.tokenAddress.toLowerCase())" :smallIcon="getChainIcon(store.chain.toLowerCase())"></TokenName>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="contractAddress" label="发行总量">
                    <template #default="scope">
                        {{ numFormat(scope.row.totalSupply) }}
                    </template>
                </el-table-column> -->
                <el-table-column :label="$t('template')" width="150">
                    <template #default="scope">
                        <span v-if="scope.row.deployerId == 0||scope.row.deployerId == 5">{{ $t('freeTax') }}</span>
                        <span v-else-if="scope.row.deployerId == 1||scope.row.deployerId == 6">{{ $t('feeToken') }}</span>
                        <span v-else-if="scope.row.deployerId == 2||scope.row.deployerId == 7">{{$t('selfDividendToken')}}</span>
                        <span v-else-if="scope.row.deployerId == 3||scope.row.deployerId == 8">{{$t('addPoolDividend')}}</span>
                        <span v-else-if="scope.row.deployerId == 4">{{$t('dividendToken')}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('managerAddress')">
                    <template #default="scope">
                        <CopyText :text="scope.row.owner" :smallText="formatAddress(scope.row.owner)"></CopyText>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tokenAddress')">
                    <template #default="scope">
                        <CopyText :text="scope.row.tokenAddress" :smallText="formatAddress(scope.row.tokenAddress)"></CopyText>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('createTime')">
                    <template #default="scope">
                        {{ dayjs.unix(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('operate')" width="90">
                    <template #default="scope">
                        <el-button key="primary" type="primary" @click="jumpToDetail(scope.row)" link>{{ $t('view') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="totalRecords" @current-change="handleCurrentChange" :page-size="pageSize" v-model:current-page="tokenData.pageNumber" />
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.token-list {
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
}
</style>
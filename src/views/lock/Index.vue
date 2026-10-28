<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import TokenIcon from '@/components/TokenIcon.vue'
import TokenName from '@/components/TokenName.vue'
import CopyText from '@/components/CopyText.vue'
import UnlockDialog from "@/views/lock/components/unlockDialog/Index.vue"
import EditDialog from "@/views/lock/components/editDialog/Index.vue"
import TransferDialog from "@/views/lock/components/transferDialog/Index.vue"
import cfg from "@/config"
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, diffDay, formatAddress } from "@/utils"
import { useRoute, useRouter } from 'vue-router'
import api from "@/api"
import BigNumber from "bignumber.js"
import dayjs from 'dayjs'
import { ethers } from "ethers"
import { useStore } from '@/store'
import { useLmListStore } from '@/store/lock/list'


const store = useStore()
const lmListStore = useLmListStore()
const { t } = useI18n()
const route = useRoute();
const router = useRouter()

const tokenAddress = ref('')
const lockTotal = ref(0)
const hasQueryAddress = ref(false)
const lockChainList = computed(() => {
    return cfg.chainList.filter(x => !!x.lock && x.isTestChain == store.isTestChain)
})


// 选择链
async function selectChain(chainId) {
    console.log(chainId)
    if (chainId == store.chainId) {
        return
    }
    try {
        let chain = lockChainList.value.find(x => x.chainId == chainId)
        await api.wallet.metamask.switchNetwork(chain)
    } catch (e) {
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    }
}

const currentRow = ref(null)
const unlockDialogVisible = ref(false)
const editDialogVisible = ref(false)
const transferDialogVisible = ref(false)
function jumpToLock() {
    router.push('/lock/create/token')
    console.dir(lmListStore)
}

// 搜索锁定代币列表
async function searchLockList() {
    hasQueryAddress.value = false
    if (!tokenAddress.value) {
        lmListStore.searchLockList.list = []
        return
    }
    const p = /^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/
    const pass = p.test(tokenAddress.value)
    if (!pass) {
        lmListStore.searchLockList.list = []
        return
    }
    let tokenType = lmListStore.tokenType
    hasQueryAddress.value = true
    lmListStore.searchLockList.loading = true
    try {
        let lockContract
        let resCumulativeLockInfo
        let wrongToken
        let resLocksForToken
        let tokenLockList = []
        if (tokenType == 'lpTokenV3') {
            lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
            resLocksForToken = await lockContract.getLocksForToken(tokenAddress.value, 0n, 10000n)
        } else {
            lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            resCumulativeLockInfo = await lockContract.cumulativeLockInfo(tokenAddress.value)
            wrongToken = '0x0000000000000000000000000000000000000000'
            if (resCumulativeLockInfo.token == wrongToken) {
                throw 'tokenErr'
            }
            // factory==wrongToken  说明token是token 
            if (resCumulativeLockInfo.factory == wrongToken && tokenType !== 'token') {
                throw 'typeErr'
            }
            if (resCumulativeLockInfo.factory !== wrongToken && tokenType !== 'lpToken') {
                throw 'typeErr'
            }
            resLocksForToken = await lockContract.getLocksForToken(resCumulativeLockInfo.token, 0n, 10000n)
            console.log(resLocksForToken)
        }
        for (let item of resLocksForToken) {
            let tokenLockItem
            if (tokenType == 'token' && resCumulativeLockInfo.factory == wrongToken) {
                tokenLockItem = await getTokenLockItem(item, 0)
            } else if (tokenType == 'lpToken' && resCumulativeLockInfo.factory !== wrongToken) {
                tokenLockItem = await getTokenLockItem(item, 1)
            } else if (tokenType == 'lpTokenV3') {
                tokenLockItem = await getTokenLockItem(item, 2)
            }
            // console.log(tokenLockItem) 
            tokenLockList.push(tokenLockItem)
        }
        if (lmListStore.tokenType !== tokenType) {
            throw "tokenTypeErr"
        }
        lmListStore.searchLockList.list = tokenLockList
    } catch (err) {
        lmListStore.searchLockList.list = []
        console.log(err)
    } finally {
        lmListStore.searchLockList.loading = false
    }
}

function selectTabItem(lockType) {
    if (hasQueryAddress.value ? lmListStore.searchLockList.loading : lmListStore.lockList[lmListStore.lockType].loading) {
        return
    }
    lmListStore.lockType = lockType
    if (lmListStore.lockList[lmListStore.lockType].list.length == 0) {
        getLockListByLockType()
    }
}

// 监听,当路由发生变化的时候执行
watch(() => route.params?.tokenType,
    (tokenType) => {
        hasQueryAddress.value = false
        tokenAddress.value = ''
        lmListStore.tokenType = tokenType
        // 初始化列表
        lmListStore.lockType = 0
        lockTotal.value = 0
        for (let index in lmListStore.lockList) {
            lmListStore.lockList[index].pageNumber = 1
            lmListStore.lockList[index].list = []
            lmListStore.lockList[index].loading = false
        }
        console.log(lmListStore.lockList)
        getLockListByLockType()
    },
    { immediate: true }
)

// 跳转详情
function jumpToDetail(row) {
    console.log(row)
    let url = ''
    if (lmListStore.tokenType == 'token') {
        url = '/lock/detail/token/' + row.id
    } else if (lmListStore.tokenType == 'lpToken') {
        url = '/lock/detail/lpToken/' + row.id
    } else if (lmListStore.tokenType == 'lpTokenV3') {
        url = '/lock/detail/lpTokenV3/' + row.id
    }
    router.push(url)
}

async function getLockListByLockType() {
    if (lmListStore.lockType == 0) {
        await getTokenLockList()
    } else {
        await getMyTokenLockList()
    }
}

function handleCurrentChange() {
    getLockListByLockType()
}

async function getTokenLockList() {
    let tokenType = lmListStore.tokenType
    lmListStore.lockList[lmListStore.lockType].loading = true
    let start = (lmListStore.lockList[lmListStore.lockType].pageNumber - 1) * lmListStore.pageSize
    let end = ((lmListStore.lockList[lmListStore.lockType].pageNumber - 1) * lmListStore.pageSize + lmListStore.pageSize - 1)
    try {
        let resTokenLockInfo
        let lockContract
        let lockTokenArr = []
        // 判断是toekn类型
        if (tokenType == "token") {
            lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            let allNormalTokenLockedCount = await lockContract.allNormalTokenLockedCount()
            console.log(allNormalTokenLockedCount)
            console.log(Number(allNormalTokenLockedCount))
            if (allNormalTokenLockedCount == 0n) {
                throw "err"
            }
            lockTotal.value = Number(allNormalTokenLockedCount)
            resTokenLockInfo = await lockContract.getCumulativeNormalTokenLockInfo(start, end)
            for (let lockInfoItem of resTokenLockInfo) {
                lockTokenArr.push(lockContract.getLocksForToken(lockInfoItem.token, 0n, 10000n))
            }
        } else if (tokenType == "lpToken") {
            lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            let allLpTokenLockedCount = await lockContract.allLpTokenLockedCount()
            if (allLpTokenLockedCount == 0n) {
                throw "err"
            }
            lockTotal.value = Number(allLpTokenLockedCount)
            resTokenLockInfo = await lockContract.getCumulativeLpTokenLockInfo(start, end)
            for (let lockInfoItem of resTokenLockInfo) {
                lockTokenArr.push(lockContract.getLocksForToken(lockInfoItem.token, 0n, 10000n))
            }
        } else if (tokenType == "lpTokenV3") {
            lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
            let allLpTokenLockedCount = await lockContract.allTokenLockedCount()
            if (allLpTokenLockedCount == 0n) {
                throw "err"
            }
            lockTotal.value = Number(allLpTokenLockedCount)
            resTokenLockInfo = await lockContract.getAllTokenLockInfo(start, end)
            for (let lockInfoItem of resTokenLockInfo) {
                lockTokenArr.push(lockInfoItem)
            }
        }
        Promise.all(lockTokenArr).then((resLockTokenArr) => {
            let tokenLockList = []
            console.log('resLockTokenArr', resLockTokenArr)
            if (tokenType == "lpTokenV3") {
                for (let item of resLockTokenArr) {
                    tokenLockList.push(getTokenLockItem(item, 2))
                }
            } else {
                for (let lockToken of resLockTokenArr) {
                    for (let item of lockToken) {
                        // 判断token类型
                        if (tokenType == "token") {
                            tokenLockList.push(getTokenLockItem(item, 0))
                        } else if (tokenType == "lpToken") {
                            tokenLockList.push(getTokenLockItem(item, 1))
                        }
                    }
                }
            }
            Promise.all(tokenLockList).then((resTokenLockList) => {
                console.log("resTokenLockList", resTokenLockList)
                if (lmListStore.tokenType !== tokenType) {
                    throw "tokenTypeErr"
                }
                lmListStore.lockList[lmListStore.lockType].list = resTokenLockList
            }).catch(err => {
                throw err
            }).finally(fin => {
                lmListStore.lockList[lmListStore.lockType].loading = false
            })
        }).catch((err) => {
            throw err
        })
    } catch (err) {
        lmListStore.lockList[lmListStore.lockType].loading = false
    }
}

async function getMyTokenLockList() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    let tokenType = lmListStore.tokenType
    lmListStore.lockList[lmListStore.lockType].loading = true
    try {
        let resTokenLockInfo
        let lockContract
        if (tokenType == "lpTokenV3") {
            lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
            resTokenLockInfo = await lockContract.locksForUser(store.walletAddress)
        } else {
            lockContract = await api.wallet.metamask.contractTokenLockV2(store.lock.tokenLockV2Address)
            if (tokenType == "token") {
                resTokenLockInfo = await lockContract.normalLocksForUser(store.walletAddress)
            } else if (tokenType == "lpToken") {
                resTokenLockInfo = await lockContract.lpLocksForUser(store.walletAddress)
            }
        }
        console.log(resTokenLockInfo)
        lmListStore.lockList[lmListStore.lockType].list = []
        let lockList = []
        for (let item of resTokenLockInfo) {
            // console.log(item)
            let tokenLockItem
            if (tokenType == "token") {
                tokenLockItem = await getTokenLockItem(item, 0)
            } else if (tokenType == "lpToken") {
                tokenLockItem = await getTokenLockItem(item, 1)
            } else if (tokenType == "lpTokenV3") {
                tokenLockItem = await getTokenLockItem(item, 2)
            }
            lockList.push(tokenLockItem)
            lmListStore.lockList[lmListStore.lockType].list.push(tokenLockItem)
        }
        if (lmListStore.tokenType !== tokenType) {
            throw "tokenTypeErr"
        }
        lmListStore.lockList[lmListStore.lockType].list = lockList
    } catch (err) {
        console.log(err)
    } finally {
        lmListStore.lockList[lmListStore.lockType].loading = false
    }
}


async function getTokenLockItem(item, type) {
    let tokenLockItem = {}
    tokenLockItem.id = item.id
    tokenLockItem.tokenAddress = item.token.toLowerCase()
    tokenLockItem.owner = item.owner.toLowerCase()
    tokenLockItem.lockDate = dayjs.unix(BigNumber(Number(item.lockDate))).format("YYYY-MM-DD HH:mm:ss")
    tokenLockItem.unlockDate = dayjs.unix(BigNumber(Number(item.tgeDate))).format("YYYY-MM-DD HH:mm:ss")
    // type==0 token type==1 LP
    if (type == 0) {
        // tokenV2
        let tokenContract = await api.wallet.metamask.contractERC20(item.token)
        tokenLockItem.tokenList = []
        tokenLockItem.tokenSymbol = await tokenContract.symbol();
        tokenLockItem.tokenIcon = getTokenIcon(store.chain, item.token.toLowerCase())
        // Token的精度
        const decimals = await tokenContract.decimals()
        tokenLockItem.decimals = decimals
        tokenLockItem.amount = ethers.formatUnits(item.amount, decimals)
        tokenLockItem.unlockedAmount = ethers.formatUnits(item.unlockedAmount, decimals)
    } else if (type == 1) {
        // LPV2
        let t = await api.wallet.metamask.contractLP(item.token)
        // console.log(t)
        let tAddress0 = await t.token0()
        let token0 = await api.wallet.metamask.contractERC20(tAddress0)
        let tSymbol0 = await token0.symbol();
        let tAddress1 = await t.token1()
        let token1 = await api.wallet.metamask.contractERC20(tAddress1)
        let tSymbol1 = await token1.symbol();
        // let LPTokenLockItem = {}
        // let LPTokenContract = api.wallet.metamask.contract(item.token)
        tokenLockItem.tokenList = []
        tokenLockItem.tokenList[0] = {
            symbol: tSymbol0.toUpperCase(),
            address: tAddress0.toLowerCase(),
            amount: 0
        }
        tokenLockItem.tokenList[1] = {
            symbol: tSymbol1.toUpperCase(),
            address: tAddress1.toLowerCase(),
            amount: 0
        }
        tokenLockItem.tokenSymbol = tSymbol0 + '/' + tSymbol1
        tokenLockItem.tokenIcon0 = getTokenIcon(store.chain, tAddress0.toLowerCase())
        tokenLockItem.tokenIcon1 = getTokenIcon(store.chain, tAddress1.toLowerCase())
        // Token的精度
        const decimals = await t.decimals()
        // console.log(decimals)
        tokenLockItem.decimals = decimals
        tokenLockItem.amount = ethers.formatUnits(item.amount, decimals)
        tokenLockItem.unlockedAmount = ethers.formatUnits(item.unlockedAmount.toString(), decimals)
    } else if (type == 2) {
        // LPV3
        console.log(item.id)
        tokenLockItem.tokenId = item.tokenId
        let t = await api.wallet.metamask.contractNFT(item.token)
        let positions = await t.positions(tokenLockItem.tokenId)
        console.log(positions.token0)
        let tAddress0 = positions.token0
        let token0 = await api.wallet.metamask.contractERC20(tAddress0)
        let tSymbol0 = await token0.symbol();
        let tAddress1 = positions.token1
        let token1 = await api.wallet.metamask.contractERC20(tAddress1)
        let tSymbol1 = await token1.symbol();
        // let LPTokenLockItem = {}
        // let LPTokenContract = api.wallet.metamask.contract(item.token)
        tokenLockItem.tokenList = []
        tokenLockItem.tokenList[0] = {
            symbol: tSymbol0.toUpperCase(),
            address: tAddress0.toLowerCase(),
            amount: 0
        }
        tokenLockItem.tokenList[1] = {
            symbol: tSymbol1.toUpperCase(),
            address: tAddress1.toLowerCase(),
            amount: 0
        }
        tokenLockItem.tokenSymbol = tSymbol0 + '/' + tSymbol1
        tokenLockItem.tokenIcon0 = getTokenIcon(store.chain, tAddress0.toLowerCase())
        tokenLockItem.tokenIcon1 = getTokenIcon(store.chain, tAddress1.toLowerCase())
        tokenLockItem.liquidity = positions.liquidity
    }
    return tokenLockItem
}

function openWithdraw(row) {
    currentRow.value = row
    unlockDialogVisible.value = true
}

function openDealy(row) {
    currentRow.value = row
    editDialogVisible.value = true
}

function openTransfer(row) {
    currentRow.value = row
    transferDialogVisible.value = true
}

function operateSuccess() {
    for (let index in lmListStore.lockList) {
        lmListStore.lockList[index].pageNumber = 1
        lmListStore.lockList[index].list = []
        lmListStore.lockList[index].loading = false
    }
    // if (hasQueryAddress.value) {
    searchLockList()
    // } else {
    getLockListByLockType()
    // }
}

</script>
<template>
    <div class="lock-master">
        <el-input v-model="tokenAddress" :placeholder="$t('tokenLPToken')" @input="searchLockList" class="input-with-select" clearable>
            <template #prepend>
                <el-select class="select-chain" :model-value="store.chainId ? store.chainId : ' '" @change="selectChain">
                    <template #prefix>
                        <TokenIcon class="token-icon" v-if="store.isConnecting && store.chain && lockChainList.some(x => x.chainId == store.chainId)" :bigIcon=getChainIcon(store.chain)></TokenIcon>
                        <span v-else class="error">ERROR</span>
                    </template>
                    <el-option v-for="item in lockChainList" :key="item.chainId" :label="item.chainShow" :value="item.chainId">
                        <div class="option">
                            <TokenIcon class="token-icon" :bigIcon="getChainIcon(item.chain.toLowerCase())"></TokenIcon>
                            <span>{{ item.chainShow }}</span>
                        </div>
                    </el-option>
                </el-select>
            </template>
        </el-input>
        <div class="operate">
            <ul class="tab" v-if="!hasQueryAddress">
                <li :class="{ 'tab-item-selected': lmListStore.lockType == index }" v-for="(tab, index) in lmListStore.lockList" :key="index" @click="() => selectTabItem(index)">{{
                        $t(tab.name) }}</li>
            </ul>
            <el-button type="primary" class="btn-gradient lock" @click="jumpToLock">{{ $t('oneKeyLock') }}</el-button>
        </div>
        <div class="empty" v-if="(hasQueryAddress && lmListStore.searchLockList.list.length == 0 && !lmListStore.searchLockList.loading) || (lmListStore.lockList[lmListStore.lockType].list.length == 0 && !lmListStore.lockList[lmListStore.lockType].loading)">
            <img style="width: 80px;" src="@/assets/imgs/noData.png" :fit="fit" />
            <div class="info">{{ $t('noLockToken') }}，<span @click="getLockListByLockType" style="color:#409eff;cursor: pointer;">{{ $t('refresh') }}</span>
            </div>
        </div>
        <div class="list" v-else>
            <el-table class="table-mine" style="width: 100%" v-loading="hasQueryAddress ? lmListStore.searchLockList.loading : lmListStore.lockList[lmListStore.lockType].loading" :data="hasQueryAddress ? lmListStore.searchLockList.list : lmListStore.lockList[lmListStore.lockType].list">
                <el-table-column :label="$t('tokenName')" width="180">
                    <template #default="scope">
                        <TokenName v-if="lmListStore.tokenType == 'token'" class="token-name" :name="scope.row.tokenSymbol" :bigIcon="scope.row.tokenIcon"></TokenName>
                        <TokenName v-else class="token-name" :name="scope.row.tokenSymbol" :token1="scope.row.tokenIcon0" :token2="scope.row.tokenIcon1"></TokenName>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contractAddress')" width="140">
                    <template #default="scope">
                        <CopyText :text="scope.row.tokenAddress" :smallText="formatAddress(scope.row.tokenAddress)">
                        </CopyText>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" v-if="lmListStore.tokenType == 'lpTokenV3'" :label="$t('lockNumber')" width="180">
                    <template #default="scope">
                        {{ ethers.formatEther(scope.row.liquidity.toString()) }}
                    </template>
                </el-table-column>
                <el-table-column prop="amount" v-else :label="$t('lockNumber')" width="180">
                </el-table-column>
                <el-table-column prop="unlockDate" :label="$t('unlockTime2')" min-width="230">
                    <template #default="scope">
                        <div class='unlock-date'>
                            {{ scope.row.unlockDate }}
                            <el-tag class="over-time tag" v-if="isExpired(scope.row.unlockDate)" size="small" type="info">{{
                                $t('expired') }}</el-tag>
                            <el-tag class="progress tag" v-else size="small" type="info">{{ $t('dayLeft', {
                                day:
                                    diffDay(scope.row.unlockDate)
                            }) }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" :label="$t('lockUser')" width="150">
                    <template #default="scope">
                        <CopyText :text="scope.row.owner" :smallText="formatAddress(scope.row.owner)">
                        </CopyText>
                    </template>
                </el-table-column>
                <el-table-column prop="address" :label="$t('operate')" width="220">
                    <template #default="scope">
                        <el-button key="primary" type="primary" @click="jumpToDetail(scope.row)" link>{{ $t('view')
                        }}</el-button>
                        <el-button key="primary" v-if="isExpired(scope.row.unlockDate) && (scope.row.owner.toLowerCase() == store.walletAddress)" type="primary" @click="openWithdraw(scope.row)" link>{{ $t('withdraw') }}</el-button>
                        <el-button key="primary" v-if="!isExpired(scope.row.unlockDate) && (scope.row.owner.toLowerCase() == store.walletAddress)" type="primary" @click="openDealy(scope.row)" link>{{ $t('edit') }}</el-button>
                        <el-button key="primary" v-if="(scope.row.owner.toLowerCase() == store.walletAddress)" type="primary" @click="openTransfer(scope.row)" link>{{ $t('transfer') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="!hasQueryAddress && lmListStore.lockType == 0">
                <el-pagination background layout="prev, pager, next" :total="lockTotal" @current-change="handleCurrentChange" :page-size="lmListStore.pageSize" v-model:current-page="lmListStore.lockList[lmListStore.lockType].pageNumber" />
            </div>
        </div>
    </div>
    <UnlockDialog v-if="unlockDialogVisible" @operateSuccess="operateSuccess" v-model="unlockDialogVisible" :lockId="currentRow.id" :isLockV2="lmListStore.tokenType !== 'lpTokenV3'" :isLpToken="lmListStore.tokenType !== 'token'" :unlockDate="dayjs(currentRow.unlockDate).unix()" :tokenList="currentRow.tokenList" :symbol="currentRow.tokenSymbol" :address="currentRow.tokenAddress" :amountString="currentRow.amount" :chain="store.chain" :decimals="currentRow.decimals" />
    <TransferDialog v-if="transferDialogVisible" @operateSuccess="operateSuccess" v-model="transferDialogVisible" :lockId="currentRow.id" :isLockV2="lmListStore.tokenType !== 'lpTokenV3'" :isLpToken="lmListStore.tokenType !== 'token'" :unlockDate="dayjs(currentRow.unlockDate).unix()" :tokenList="currentRow.tokenList" :symbol="currentRow.tokenSymbol" :address="currentRow.tokenAddress" :amountString="currentRow.amount" :chain="store.chain" :decimals="currentRow.decimals" />
    <EditDialog v-if="editDialogVisible" @operateSuccess="operateSuccess" v-model="editDialogVisible" :lockId="currentRow.id" :isLockV2="lmListStore.tokenType !== 'lpTokenV3'" :isLpToken="lmListStore.tokenType !== 'token'" :unlockDate="dayjs(currentRow.unlockDate).unix()" :tokenList="currentRow.tokenList" :symbol="currentRow.tokenSymbol" :address="currentRow.tokenAddress" :amountString="currentRow.amount" :chain="store.chain" :decimals="currentRow.decimals" />
</template>
<style lang='scss'></style>
<style scoped lang='scss'>
.option {
    display: flex;

    .token-icon {
        margin-top: 7px;
        --sizeBig: 20px;
        margin-right: 5px;
    }
}

.lock-master {
    .select-chain {
        width: 150px;
        background: #fff;

        .token-icon {
            --sizeBig: 20px;
        }

        .error {
            margin-right: 3px;
            font-size: 18px;
            color: #f56c6c;
        }
    }

    .search {
        height: 100%;
        width: 60px;
        color: #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .btn-gradient:hover {
        color: #fff;
    }

    .operate {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .lock {
            width: 120px;
            height: 36px;
        }
    }

    .tab {
        display: flex;
        font-size: 16px;
        line-height: 36px;
        color: #999999;
        font-weight: 500;

        li {
            margin-right: 40px;
            cursor: pointer;
        }

        .tab-item-selected {
            color: #333333;
        }
    }

    .empty {
        margin-top: 90px;
        margin-bottom: 330px;
        text-align: center;

        .info {
            margin-top: 10px;
            color: #999;
            font-size: 14px;
        }
    }

    .list {
        margin-top: 20px;

        .token-name {
            --sizeBig: 30px;
            --sizeSmall: 14px;
        }

        .address {
            .icon {
                margin-left: 6px;
                color: #999;
                font-size: 14px;
            }
        }

        .unlock-date {
            display: flex;

            .tag {
                margin-left: 5px;
                font-size: 12px;
            }

            .over-time {
                color: #01a7ff;
            }

            .progress {
                color: #ff9f37;
            }
        }
    }

    .pagination {
        margin: 30px 0 10px 0;
        display: flex;
        justify-content: center;
    }
}
</style>
<script setup>
import { computed, inject, watch, ref, reactive, onMounted } from 'vue'
import { getTokenIcon, getChainIcon, sleep, numFormat } from "@/utils"
import TokenIcon from '@/components/TokenIcon.vue'
import TokenName from '@/components/TokenName.vue'
import Progress from '@/components/Progress.vue'
import BigNumber from 'bignumber.js'
import LaunchpadItem from '@/components/LaunchpadItem.vue'
import { useLpStore } from '@/store/launchpad';
import api from "@/api"
import dayjs from 'dayjs'
import storage from "good-storage"
import { ethers } from "ethers"

const lpStore = useLpStore()
const tokenName = ref('')
const checkedChains = ref([])
const checkedPlatform = ref('all')
const checkedStatus = ref('all')
const showType = ref('')
const sort = reactive({
    type: '',
    isAsc: false
})
const launchpad = reactive({
    page: 1,
    pageSize: 30,
    total: 0,
    launchpadList: [],
    loading: false,
})
showType.value = storage.get("launchpadShowType", 'block')

function changePageSize() {
    if (showType.value == 'block') {
        launchpad.pageSize = 30
    } else if (showType.value == 'list') {
        launchpad.pageSize = 50
    }
}
changePageSize()
function changeShowType(type) {
    if (type == showType.value) {
        return
    }
    showType.value = type
    changePageSize()
    storage.set("launchpadShowType", type)
    getLaunchpadList()
}

function sortFn(type) {
    if (type == sort.type) {
        if (type) {
            sort.isAsc = !sort.isAsc
        } else {
            return
        }
    } else {
        sort.type = type
        sort.isAsc = false
    }
    getLaunchpadList()
}

// 筛选
function select() {
    getLaunchpadList()
}

// 重置
function reset() {
    tokenName.value = ''
    checkedChains.value = []
    checkedPlatform.value = 'all'
    checkedStatus.value = 'all'
    getLaunchpadList()
}

function handleCurrentChange() {
    getLaunchpadList()
}

function handleSizeChange() {
    getLaunchpadList()
}

async function getLaunchpadList() {
    launchpad.loading = true
    let search = ''
    if (tokenName.value) {
        search = tokenName.value
    }
    let chainIds = ''
    if (checkedChains.value.length > 0) {
        chainIds = checkedChains.value.toString()
    }
    let platform = ''
    if (checkedPlatform.value !== 'all') {
        platform = checkedPlatform.value
    }
    let status = ''
    if (checkedStatus.value !== 'all') {
        status = checkedStatus.value
    }
    try {
        let res = await api.launchpad.getLaunchpadList(launchpad.page, launchpad.pageSize, search, chainIds, platform, status, sort)
        console.log(res)
        if (res.data.status == 0) {
            launchpad.launchpadList = []
            launchpad.total = res.data.data.total
            for (let item of res.data.data.list) {
                launchpad.launchpadList.push(item)
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        launchpad.loading = false
    }
}
onMounted(() => {
    getLaunchpadList()
})

// 跳转详情
function view(launchpadItem) {
    if (launchpadItem.detailUrl) {
        window.open(launchpadItem.detailUrl)
    } else {
        if (launchpadItem.platform == 'pinksale') {
            window.open('https://www.pinksale.finance/launchpad/' + launchpadItem.address + '?chain=' + lpStore.networks.find(x => x.value == launchpadItem.chainId).pinkName)
        } else if (launchpadItem.platform == 'uncx') {
            let swap
            if (launchpadItem.chain == 'eth') {
                swap = 'uni-v2'
            } else if (launchpadItem.chain == 'bsc') {
                swap = 'pancake-v2'
            }
            let url = 'https://app.uncx.network/amm/' + swap + '/ilo/' + launchpadItem.address
            window.open(url)
        }
    }
}

</script>
<template>
    <div class="launchpad">
        <div class="top-operate">
            <div class="form-input">
                <div class="search">
                    <div class="item">
                        <el-input clearable v-model="tokenName" :placeholder="$t('enterTokenName')" />
                    </div>
                </div>
                <div class="select">
                    <div class="item">
                        <div class="label">{{ $t('network') }}</div>
                        <el-select class="select-chain" collapse-tags v-model="checkedChains" :placeholder="$t('selectNetwork')" multiple>
                            <el-option v-for="item in lpStore.networks" :key="item.value" :label="item.name" :value="item.value">
                                <div class="option">
                                    <TokenIcon class="token-icon" :bigIcon="item.icon"></TokenIcon>
                                    <span>{{item.name}}</span>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <div class="label">{{ $t('platform1') }}</div>
                        <el-select class="select-platform" v-model="checkedPlatform">
                            <el-option v-for="item in lpStore.platforms" :key="item.value" :label="$t(item.name)" :value="item.value">
                                <div class="option option-platform">
                                    <img v-if="item.icon" class="platform-icon" :src="item.icon">
                                    <span>{{$t(item.name)}}</span>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <div class="label">{{ $t('status') }}</div>
                        <el-select class="select-status" v-model="checkedStatus">
                            <el-option v-for="item in lpStore.statusList" :key="item.value" :label="$t(item.name)" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="form-btn">
                <el-button type="primary" class="btn" @click="select()">{{ $t('search1') }}</el-button>
                <el-button class="btn" @click="reset()">{{ $t('reset') }}</el-button>
                <svg-icon :name="showType=='block'?'blockSelect':'block'" class="icon" @click="changeShowType('block')" />
                <svg-icon :name="showType=='list'?'listSelect':'list'" class="icon" @click="changeShowType('list')" />
            </div>
        </div>
        <div class="sort">
            <div class="item" @click="sortFn('')">
                {{ $t('defaultSort') }}
            </div>
            <div class="item" @click="sortFn('tagNum')">
                {{ $t('kycTags') }}
                <div class="arrow">
                    <svg-icon :name="sort.type=='tagNum'&&sort.isAsc?'topSelect':'top'" class="icon" />
                    <svg-icon :name="sort.type=='tagNum'&&!sort.isAsc?'downSelect':'down'" class="icon" />
                </div>
            </div>
            <div class="item" @click="sortFn('softcap')">
                {{ $t('softCap') }}
                <div class="arrow">
                    <svg-icon :name="sort.type=='softcap'&&sort.isAsc?'topSelect':'top'" class="icon" />
                    <svg-icon :name="sort.type=='softcap'&&!sort.isAsc?'downSelect':'down'" class="icon" />
                </div>
            </div>
            <div class="item" @click="sortFn('startTime')">
                {{ $t('startTime') }}
                <div class="arrow">
                    <svg-icon :name="sort.type=='startTime'&&sort.isAsc?'topSelect':'top'" class="icon" />
                    <svg-icon :name="sort.type=='startTime'&&!sort.isAsc?'downSelect':'down'" class="icon" />
                </div>
            </div>
        </div>
        <div class="launchpad-content">
            <div class="empty" v-if="!launchpad.loading && launchpad.launchpadList.length == 0">
                <img style="width: 80px;" src="@/assets/imgs/noData.png" :fit="fit" />
                <div class="info">{{$t('noLaunchpad')}}，<span @click="getLaunchpadList" style="color:#409eff;cursor: pointer;">{{ $t('refresh') }}</span></div>
            </div>
            <div class="list" v-else v-loading="launchpad.loading">
                <div v-if="showType=='block'">
                    <el-row :gutter="15">
                        <el-col :lg="8" :span="12" class="item" v-for="item of launchpad.launchpadList" :key="item.address">
                            <LaunchpadItem :launchpadItem="item" :isTokenList="false" @view="view"></LaunchpadItem>
                        </el-col>
                    </el-row>
                </div>
                <div v-else-if="showType=='list'">
                    <el-table class="table-list" :data="launchpad.launchpadList" @row-click="view">
                        <el-table-column :label="$t('projectToken')" width="175">
                            <template #default="scope">
                                <TokenName class="token-name" :symbol="scope.row.tokenName" :name="scope.row.tokenSymbol" :bigIcon="scope.row.icon?scope.row.icon:'error'" :smallIcon="getChainIcon(scope.row.chain.toLowerCase())"></TokenName>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('status')" width="94">
                            <template #default="scope">
                                <div class="status sale-live" v-if="scope.row.status=='salelive'">
                                    <span>{{ $t(scope.row.status) }}</span>
                                </div>
                                <div class="status upcoming" v-else-if="scope.row.status=='upcoming'">
                                    <span>{{ $t(scope.row.status) }}</span>
                                </div>
                                <div class="status ended" v-else-if="scope.row.status=='ended'">
                                    <span>{{ $t(scope.row.status) }}</span>
                                </div>
                                <div class="status canceled" v-else-if="scope.row.status=='canceled'">
                                    <span>{{ $t(scope.row.status) }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('kycTag')" width="203">
                            <template #default="scope">
                                <div class="tags">
                                    <span v-if="scope.row.tags.indexOf('KYC')>-1" class="tag kyc" plain type="primary">KYC</span>
                                    <span v-if="scope.row.tags.indexOf('SAFU')>-1" class="tag safu" plain type="primary">SAFU</span>
                                    <span v-if="scope.row.tags.indexOf('Audit')>-1" class="tag audit" plain type="primary">Audit</span>
                                    <span v-if="scope.row.tags.indexOf('DOXX')>-1" class="tag doxx" plain type="primary">DOXX</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('softHard')">
                            <template #default="scope">
                                <div v-if="scope.row.hardCap!==''&&scope.row.hardCap!=='0'">
                                    <div class="value">{{numFormat(ethers.formatUnits(scope.row.softCap, scope.row.currencyDecimals))}} - {{numFormat(ethers.formatUnits(scope.row.hardCap, scope.row.currencyDecimals))}} {{ scope.row.currencySymbol }}</div>
                                </div>
                                <div v-else>
                                    <div class="value">{{numFormat(ethers.formatUnits(scope.row.softCap, scope.row.currencyDecimals))}} {{ scope.row.currencySymbol }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('progress1')" width="90">
                            <template #default="scope">
                                <div v-if="scope.row.hardCap !== '' && scope.row.hardCap !== '0'">
                                    {{ BigNumber(ethers.formatUnits(scope.row.cumulateAmount, scope.row.currencyDecimals)).dividedBy(ethers.formatUnits(scope.row.hardCap, scope.row.currencyDecimals)).multipliedBy(100).toFixed(2) }}%
                                    <Progress :cumulateAmount="ethers.formatUnits(scope.row.cumulateAmount, scope.row.currencyDecimals)" :topAmount="ethers.formatUnits(scope.row.hardCap, scope.row.currencyDecimals)"></Progress>
                                </div>
                                <div v-else>
                                    {{ BigNumber(ethers.formatUnits(scope.row.cumulateAmount, scope.row.currencyDecimals)).dividedBy(ethers.formatUnits(scope.row.softCap, scope.row.currencyDecimals)).multipliedBy(100).toFixed(2) }}%
                                    <Progress :cumulateAmount="ethers.formatUnits(scope.row.cumulateAmount, scope.row.currencyDecimals)" :topAmount="ethers.formatUnits(scope.row.softCap, scope.row.currencyDecimals)"></Progress>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('platform2')" width="88">
                            <template #default="scope">
                                <div class="launch-platform">
                                    <TokenIcon v-if="scope.row.platform=='pinksale'" class="token-icon" bigIcon="/images/pinkswap.png"></TokenIcon>
                                    <TokenIcon v-else-if="scope.row.platform=='uncx'" class="token-icon" bigIcon="/images/uncx.png"></TokenIcon>
                                    <TokenIcon v-else-if="scope.row.platform=='dx'" class="token-icon" bigIcon="/images/dx.jpg"></TokenIcon>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('startEnd')">
                            <template #default="scope">
                                {{ dayjs.unix(scope.row.startTime).format("YYYY.MM.DD") }}-{{ dayjs.unix(scope.row.endTime).format("YYYY.MM.DD") }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="sizes,prev, pager, next" :total="launchpad.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:page-size="launchpad.pageSize" :page-sizes="[10, 20, 30, 50, 100]" v-model:current-page="launchpad.page" />
            </div>
        </div>
    </div>

</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.option {
    display: flex;

    .token-icon {
        margin-top: 7px;
        --sizeBig: 20px;
        margin-right: 5px;
    }
    .platform-icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
}
.option-platform {
    align-items: center;
}
.launchpad {
    .top-operate {
        display: flex;
        .form-input {
            display: flex;
            width: 100%;
            .search {
                width: 100%;
                min-width: 120px;
            }
            .select {
                display: flex;
                justify-content: flex-end;

                > div.item {
                    display: flex;
                    line-height: 36px;
                    font-size: 14px;
                    margin-left: 15px;
                    .label {
                        min-width: 30px;
                        margin-right: 10px;
                        color: #999;
                    }
                }
                .token-icon {
                    --sizeBig: 20px;
                }
                .select-chain {
                    width: 145px;
                }
                .select-platform {
                    width: 130px;
                }
                .select-status {
                    width: 115px;
                }
            }
        }
        .form-btn {
            padding-left: 15px;
            display: flex;
            align-items: center;
            .btn {
                height: 36px;
            }
            .icon {
                cursor: pointer;
                margin-left: 15px;
                width: 20px;
                height: 20px;
            }
        }
    }
    .sort {
        display: flex;
        margin-top: 10px;
        color: #999;
        font-size: 14px;
        .item {
            margin-right: 40px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .arrow {
                margin-left: 3px;
                display: flex;
                flex-direction: column;
                .icon {
                    width: 8px;
                    height: 8px;
                }
            }
        }
    }
    .launchpad-content {
        .empty {
            margin-top: 90px;
            margin-bottom: 130px;
            text-align: center;
            .info {
                margin-top: 10px;
                color: #999;
                font-size: 14px;
            }
        }
        .list {
            min-height: 200px;
            .item {
                margin-top: 20px;
            }
            .table-list {
                margin-top: 10px;
                .token-name {
                    --sizeBig: 30px;
                    --sizeSmall: 14px;
                }
                .status.salelive {
                    color: #1bc89e;
                }
                .status.upcoming {
                    color: #ff9f37;
                }
                .status.ended {
                    color: #d31dfa;
                }
                .status.canceled {
                    color: #999999;
                }
                .tags {
                    --van-tag-font-size: 12px;
                    color: #fff;
                    .tag {
                        margin-right: 3px;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-size: 12px;
                    }
                    .kyc {
                        background: #1bc89e;
                    }
                    .safu {
                        background: #d415f6;
                    }
                    .audit {
                        background: #3f80f7;
                    }
                    .doxx {
                        background: #ffcc3e;
                    }
                }
                .launch-platform {
                    .token-icon {
                        --sizeBig: 24px;
                    }
                }
            }
        }
    }
    .pagination {
        margin: 30px 0 10px 0;
        display: flex;
        justify-content: center;
    }
}
@media screen and (max-width: 1325px) {
    .top-operate {
        flex-wrap: wrap;
        .form-btn {
            margin-top: 15px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .btn {
                height: 36px;
            }
            .icon {
                padding-left: 15px;
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>
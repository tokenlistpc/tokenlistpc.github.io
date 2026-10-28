<script setup>
import { computed, inject, watch, ref, reactive, onMounted } from 'vue'
import { getTokenIcon, getChainIcon, sleep, numFormat } from "@/utils"
import TokenIcon from '@/components/TokenIcon.vue'
import TokenName from '@/components/TokenName.vue'
import Progress from '@/components/Progress.vue'
import BigNumber from 'bignumber.js'
import LaunchpadItem from '@/components/LaunchpadItem.vue'
import { useLpStore } from '@/store/launchpad';
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'
import api from "@/api"
import dayjs from 'dayjs'
import { ethers } from "ethers"
import { useStore } from "@/store"
import cfg from "@/config"

const lpStore = useLpStore()
const store = useStore()
const tokenName = ref('')
const checkedChains = ref([])
const checkedStatus = ref('all')
const router = useRouter()
const sort = reactive({
    type: '',
    isAsc: false
})
const launchpad = reactive({
    page: 1,
    pageSize: 6,
    total: 0,
    launchpadList: [],
    loading: false,
})


// 筛选
function select() {
    getLaunchpadList()
}

// 重置
function reset() {
    tokenName.value = ''
    checkedChains.value = []
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
    let status = ''
    if (checkedStatus.value !== 'all') {
        status = checkedStatus.value
    }
    try {
        let res = await api.launchpad.getTokenListLaunchpadList(launchpad.page, launchpad.pageSize, search, chainIds, status)
        console.log(res)
        if (res.data.status == 0) {
            launchpad.launchpadList = []
            launchpad.total = res.data.data.total
            for (let item of res.data.data.list) {
                launchpad.launchpadList.push(item)
            }
        } else {
            throw 'err'
        }
    } catch (err) {
        ElMessage.error("获取预售列表失败")
        console.log(err)
    } finally {
        launchpad.loading = false
    }
}

onMounted(() => {
    getLaunchpadList()
})

const launchPadChainList = computed(() => {
    return cfg.chainList.filter(x => !!x.create && x.isTestChain == store.isTestChain)
})

// 跳转详情
function view(launchpadItem) {
    router.push('/launchpad/detail/' + launchpadItem.chainId + '/' + launchpadItem.address)
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
                            <el-option v-for="item in launchPadChainList" :key="item.chainId" :label="item.chainShow" :value="item.chainId">
                                <div class="option">
                                    <TokenIcon class="token-icon" :bigIcon="item.chainIcon"></TokenIcon>
                                    <span>{{item.chainShow}}</span>
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
            </div>
        </div>
        <div class="launchpad-content">
            <div class="empty" v-if="!launchpad.loading && launchpad.launchpadList.length == 0">
                <img style="width: 80px;" src="@/assets/imgs/noData.png" :fit="fit" />
                <div class="info">{{$t('noLaunchpad')}}，<span @click="getLaunchpadList" style="color:#409eff;cursor: pointer;">{{ $t('refresh') }}</span></div>
            </div>
            <div class="list" v-else v-loading="launchpad.loading">
                <div>
                    <el-row :gutter="15">
                        <el-col :lg="8" :span="12" class="item" v-for="item of launchpad.launchpadList" :key="item.address">
                            <LaunchpadItem :launchpadItem="item" :isTokenList="true" @view="view"></LaunchpadItem>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="sizes,prev, pager, next" :total="launchpad.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:page-size="launchpad.pageSize" :page-sizes="[6, 12, 30]" v-model:current-page="launchpad.page" />
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
        }
    }
    .pagination {
        margin: 30px 0 10px 0;
        display: flex;
        justify-content: center;
    }
}
</style>
<script setup>
import { computed, inject, watch, ref, reactive } from "vue"
import { ElMessage, ElLoading } from "element-plus"
import { useI18n } from "vue-i18n"
import { useStore } from "@/store"
import { useConfigStore } from "@/store/config"

import api from "@/api"
import { ethers } from "ethers"
import cfg from "@/config"
import InputLockNumber from "@/components/InputLockNumber.vue"
import SelectLockDate from "@/components/SelectLockDate.vue"
import dayjs from "dayjs"
import { diffDay } from "@/utils"
import OperateSuccessDialog from "@/components/OperateSuccessDialog.vue"
import SelectToken from "./components/SelectToken.vue"

const { t } = useI18n()
const store = useStore()
const configStore = useConfigStore()

const selectTokenDialogVisible = ref(false)
const token = ref(null)
const lockAmountString = ref("")
const tomorrow = dayjs().add(1, "day").endOf("day").toDate()
const unlockDate = ref(tomorrow)
const needApprove = ref(false)
const approveLoading = ref(false)
const selectChainId = ref(null)
const showGas = ref("")


// 选择公链
const lockChainList = computed(() => {
    return cfg.chainList.filter(x => !!x.lock && x.isTestChain == store.isTestChain)
})

watch(() => store.isConnecting,
    (value) => {
        console.log(value)
        if (!value) {
            return
        }
        if (!lockChainList.value.some(x => x.chainId == store.chainId)) {
            return
        }
        if (selectChainId.value == store.chainId) {
            return
        }
        selectChainId.value = store.chainId
        token.value = null
    }, { immediate: true }
)

const selectChain = computed(() => {
    if (selectChainId.value) {
        return lockChainList.value.find(x => x.chainId == selectChainId.value)
    }
    return null
})


async function chainSelectChange(chainId) {
    if (store.isConnecting) {
        if (store.walletType == "metamask") {
            let chain = lockChainList.value.find(x => x.chainId == chainId)
            await api.wallet.metamask.switchNetwork(chain)
        }
    } else {
        ElMessage.error(t('pleaseConnectWallet'))
    }
}


watch(() => [token.value], async () => {
    lockAmountString.value = ""
    if (token.value) {
        // TODO 这里最好再获取下余额
        await checkAllowance()
    } else {
        needApprove.value = false
    }
})


function tokenSelected(t) {
    token.value = t
    selectTokenDialogVisible.value = false
}

function selectTokenClick() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (!selectChainId.value) {
        ElMessage.error(t('pleaseSelectChain'))
        return
    }
    selectTokenDialogVisible.value = true
}


/**
 * 批准合约金额
 */
async function approveClick() {
    // 初始化
    approveLoading.value = true
    try {
        let res = await api.wallet.metamask.approveMaxAmount(
            token.value.address,
            store.lock.tokenLockV2Address
        )
        console.log(res)
        // tradeHash.value = res.hash        // 等待上链
        await res.wait()
        needApprove.value = false
    } catch (e) {
        console.log(e)
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
        // tradeStatus.value = -1
        // await sleep(2000)
    } finally {
        approveLoading.value = false
    }
}

const createLoading = ref(false)
const lockTxHash = ref("")
const lockConfirmDialogVisible = ref(false)

/**
 * 检测限额
 */
async function checkAllowance() {
    if (!token.value) {
        return
    }
    if (token.value.address == api.wallet.MAIN_COIN_ADDRESS) {
        needApprove.value = false
        return
    }

    const isAllowanceEnough = await api.wallet.metamask.isAllowanceEnough(
        store.lock.tokenLockV2Address,
        token.value.address,
        store.walletAddress
    )
    if (isAllowanceEnough) {
        needApprove.value = false
    } else {
        needApprove.value = true
    }
}

async function lockClick() {
    // 初始化
    createLoading.value = true
    lockTxHash.value = ""
    try {
        // 判断输入

        if (!token.value) {
            ElMessage.error(t("pleaseSelectToken"))
            return
        }

        if (!lockAmountString.value) {
            ElMessage.error(t("enterAmount"))
            return
        }

        if (!unlockDate.value) {
            ElMessage.error(t('selectUnlockTime'))
            return
        }
        if (token.value.chain !== store.chain) {
            ElMessage.error(t('networkNotMatch'))
            return
        }

        // TODO 余额判断 当输入金额大于余额时 提示余额不足

        // 检测限额
        await checkAllowance()
        if (needApprove.value) {
            ElMessage.error(t("approveFirst"))
            return
        }
        await createLock()
    } catch (e) {
        console.log(e)
    } finally {
        createLoading.value = false
    }
}

async function createLock() {
    const gasPrice = await api.wallet.metamask.getGasPrice()
    let gasLimit
    const unlockDateTs = dayjs(unlockDate.value).endOf("day").unix()
    const tokenAddress = token.value.address
    // 这里不用判断是否LP 因为只获取精度
    const tokenContract = await api.wallet.metamask.contractERC20(tokenAddress)
    const decimals = await tokenContract.decimals()
    const amount = ethers.parseUnits(lockAmountString.value, decimals)
    const lockContract = await api.wallet.metamask.contractTokenLockV2(
        store.lock.tokenLockV2Address
    )
    // console.dir(lockContract)
    gasLimit = await lockContract.lock.estimateGas(
        store.walletAddress,
        tokenAddress,
        false,
        amount.toString(),
        unlockDateTs,
        ""
    )
    console.dir(gasLimit)
    showGas.value = ethers.formatEther(gasLimit * gasPrice)
    lockConfirmDialogVisible.value = true
}
const lockSuccessDialog = ref(false)

async function createLockConfirm() {
    const loading = ElLoading.service({
        lock: true,
        text: t('upChainNow'),
    })
    const unlockDateTs = dayjs(unlockDate.value).endOf("day").unix()
    const tokenAddress = token.value.address
    const tokenContract = await api.wallet.metamask.contractERC20(tokenAddress)
    const decimals = await tokenContract.decimals()

    const amount = ethers.parseUnits(lockAmountString.value, decimals)

    const lockContract = await api.wallet.metamask.contractTokenLockV2(
        store.lock.tokenLockV2Address
    )
    try {
        let res = await lockContract.lock(
            store.walletAddress,
            tokenAddress,
            false,
            amount.toString(),
            unlockDateTs,
            ""
        )
        console.dir(res)
        lockTxHash.value = res.hash
        lockSuccessDialog.value = true
        lockConfirmDialogVisible.value = false
    } catch (e) {
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
        console.log(e)
    } finally {
        loading.close()
    }
}
</script>
<template>
    <div class="form">
        <div class="form-item">
            <div class="form-item-title">{{ $t('selectChain') }}</div>
            <div class="form-item-value">
                <el-select :model-value="selectChainId" :placeholder="$t('pleaseSelectChain')" class="block" size="large"
                    @change="chainSelectChange">
                    <el-option v-for="item in lockChainList" :key="item.chainId" :label="item.chainShow"
                        :value="item.chainId" class="select-option">
                        <icon-text :icon="item.chainIcon" :text="item.chainShow"></icon-text>
                    </el-option>
                    <template #prefix>
                        <img class="select-icon" :src="selectChain.chainIcon" alt="" v-if="selectChain">
                    </template>
                </el-select>
            </div>
        </div>
        <div class="form-item">
            <div class="form-item-title">{{ $t('selectToken') }}</div>
            <div class="form-item-value">
                <div class="select" @click="selectTokenClick">
                    <template v-if="token">
                        <icon-text :icon="token.icon" :text="token.symbol"></icon-text>
                    </template>
                    <template v-else>
                        <div class="placeholder">{{ $t('pleaseSelectToken1') }}</div>
                    </template>
                    <el-icon>
                        <ArrowDownBold />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-item-title">
                <div>{{ t('setNumberOfLock') }}</div>
                <div class="title-note">
                    {{ $t('balance') }}: {{ token ? token.amount : "- -" }}
                </div>
            </div>
            <div class="form-item-value">
                <InputLockNumber v-model:amount="lockAmountString" :total="token ? token.amount : '0'"
                    :decimals="token ? token.decimals : 18" />
            </div>
        </div>

        <div class="form-item">
            <div class="form-item-title">{{ $t('setDate') }}</div>
            <div class="form-item-value">
                <SelectLockDate v-model="unlockDate" />
            </div>
        </div>

        <div class="form-bottom">
            <div class="form-bottom-btns">
                <template v-if="store.isConnecting">
                    <template v-if="needApprove">
                        <el-button class="btn-gradient" @click="approveClick" :loading="approveLoading">Approve</el-button>
                    </template>
                    <template v-else>
                        <el-button class="btn-gradient" @click="lockClick" :loading="createLoading">{{ $t('oneKeyLock')
                        }}</el-button>
                    </template>
                </template>
                <template v-else>
                    <el-button class="btn btn-gradient" @click="() => (configStore.loginDialogVisible = true)">{{
                        $t('connectWallet') }}</el-button>
                </template>
            </div>
        </div>
    </div>

    <el-dialog v-model="selectTokenDialogVisible" :title="$t('selectToken')" class="dlg dlg-select-token" destroy-on-close>
        <SelectToken @select="(t) => tokenSelected(t)"></SelectToken>
    </el-dialog>
    <el-dialog v-model="lockConfirmDialogVisible" :title="$t('lockConfirm')" class="dlg dlg-lock-confirm">
        <ul class="dlg-item">
            <li>
                <div class="key">{{ $t('lockAssets') }}</div>
                <div class="value">
                    <icon-text :icon="token.icon" :text="token.symbol"></icon-text>
                </div>
            </li>
            <li>
                <div class="key">{{ $t('lockNumber') }}</div>
                <div class="value">{{ lockAmountString }}</div>
            </li>
            <li>
                <div class="key">{{ $t('contractChian') }}</div>
                <div class="value">{{ store.currentChain.chainShow }}</div>
            </li>
            <li>
                <div class="key">{{ $t('unlockTime') }}</div>
                <div class="value">{{ dayjs(unlockDate).format("YYYY-MM-DD") }}(<span>{{ $t('dayLeft', {
                    day: diffDay(unlockDate)
                }) }}</span>)</div>
            </li>
            <li>
                <div class="key">{{ $t('gas') }}</div>
                <div class="value">{{ `${showGas} ${store.nativeCurrencySymbol}` }}</div>
            </li>
        </ul>
        <div class="tips">
            <p>{{ $t('attention') }}</p>
            <p>{{ $t('createTips1') }}</p>
            <p>{{ $t('createTips2') }}</p>
            <p>{{ $t('createTips3') }}</p>
        </div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" @click="createLockConfirm">{{ $t('confirmAndLock') }}</el-button>
        </div>
    </el-dialog>

    <OperateSuccessDialog v-model="lockSuccessDialog" :txHash="lockTxHash"></OperateSuccessDialog>
</template>

<style scoped lang="scss">
.select-option {
    display: flex;
    align-items: center;
}

.form {
    .form-item {
        margin-top: 20px;

        .form-item-title {
            font-size: 14px;
            color: #333333;
            font-weight: 700;

            margin-bottom: 10px;

            display: flex;
            justify-content: space-between;

            .title-note {
                margin-left: 10px;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 400;
            }
        }

        .form-item-value {
            .select {
                height: 40px;
                border: 1px solid #e6e7e8;
                border-radius: 4px;
                padding: 0 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;

                .placeholder {
                    font-size: 14px;
                    color: #999999;
                    letter-spacing: 0;
                    line-height: 20px;
                    font-weight: 400;
                }

                .icon {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .image {
                        margin-right: 6px;
                    }

                    .text {
                        font-size: 12px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 16px;
                        font-weight: 500;
                    }
                }
            }

            .select-icon {
                width: 20px;
                border-radius: 50%;
            }

            .ipt {
                height: 44px;
            }
        }
    }

    .form-item-row {
        display: flex;
        justify-content: space-between;

        align-items: center;
    }

    .form-bottom {
        margin-top: 48px;
        text-align: center;

        .fee {
            font-size: 12px;
            color: #01a7ff;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .form-bottom-btns {
            margin-bottom: 36px;

            .btn-gradient {
                width: 485px;
                height: 40px;
            }
        }
    }
}
</style>

<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { ElMessage, ElLoading } from "element-plus"

import SelectLockDate from "@/components/SelectLockDate.vue"
import dayjs from "dayjs"
import { diffDay, isAddress } from "@/utils"
import OperateSuccessDialog from "@/components/OperateSuccessDialog.vue"
import api from "@/api"
import { ethers } from "ethers"

import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

const tokenContractAddress = ref('')
const tokenId = ref('')
const tomorrow = dayjs().add(1, 'day').endOf('day').toDate()
const unlockDate = ref(tomorrow)

const needApprove = ref(false)
const approveLoading = ref(false)

const positions = ref(null)


/**
 * 批准合约金额
 */
async function approveClick() {
    // 初始化
    approveLoading.value = true
    try {
        const nft = await api.wallet.metamask.contractNFT(tokenContractAddress.value)
        let owner = await nft.ownerOf(tokenId.value)
        if (owner.toLowerCase() != store.walletAddress) {
            ElMessage.error(t('notOwnToken'))
            return
        }

        let res = await nft.approve(store.lock.tokenLockV3Address, tokenId.value)
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
const showGas = ref("")



function changeTokenContractAddress(v) {
    tokenContractAddress.value = v
    lockV3Verify()
}

function changeTokenId(v) {
    tokenId.value = v
    lockV3Verify()
}
// TODO 这里改下用途
const lockV3VerifyLoading = ref(false)
const isLockV3Verify = ref(false)

async function lockV3Verify() {
    isLockV3Verify.value = false
    if (!tokenContractAddress.value || !isAddress(tokenContractAddress.value)) {
        return
    }
    if (!tokenId.value) {
        return
    }
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    // 初始化
    lockV3VerifyLoading.value = true
    try {
        const nft = await api.wallet.metamask.contractNFT(tokenContractAddress.value)
        let owner
        try {
            // TODO 这里如果输入没有的ID 则会报错 捕捉下
            owner = await nft.ownerOf(tokenId.value)
        } catch (e) {
            console.error(e)
            ElMessage.error(t('trueTokenAddressIDFormat'))
            return
        }


        const p = await nft.positions(tokenId.value)
        const token0Address = p[2]
        const token1Address = p[3]
        const token0 = await api.wallet.metamask.contractERC20(token0Address)
        const token0Symbol = await token0.symbol()
        const token1 = await api.wallet.metamask.contractERC20(token1Address)
        const token1Symbol = await token1.symbol()
        positions.value = {
            token0: p[2],
            token0Symbol: token0Symbol,
            token1: p[3],
            token1Symbol: token1Symbol,
            liquidity: p[7]
        }
        const n = await nft.getApproved(tokenId.value)
        needApprove.value = n.toLowerCase() != store.lock.tokenLockV3Address.toLowerCase()
        isLockV3Verify.value = true
    } catch (e) {
        console.log(e)
    } finally {
        lockV3VerifyLoading.value = false
    }
}

async function lockClick() {
    // 初始化
    createLoading.value = true
    lockTxHash.value = ""
    try {
        const nft = await api.wallet.metamask.contractNFT(tokenContractAddress.value)
        let owner = await nft.ownerOf(tokenId.value)
        if (owner.toLowerCase() != store.walletAddress) {
            ElMessage.error(t('notOwnToken'))
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
    const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
    gasLimit = await lockContract.lock.estimateGas(store.walletAddress, tokenContractAddress.value, tokenId.value, unlockDateTs, '')
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
    const lockContract = await api.wallet.metamask.contractTokenLockV3(store.lock.tokenLockV3Address)
    try {
        let res = await lockContract.lock(store.walletAddress, tokenContractAddress.value, tokenId.value, unlockDateTs, '')
        console.dir(res)
        lockTxHash.value = res.hash
        lockSuccessDialog.value = true
        lockConfirmDialogVisible.value = false
    } catch (e) {
        console.log(e)
    } finally {
        loading.close()
    }
}
</script>
<template>
    <div class="form">
        <div class="form-item">
            <div class="form-item-title">{{ $t('enterTokenAddress') }}</div>
            <div class="form-item-value">
                <el-input :model-value="tokenContractAddress" @update:model-value="changeTokenContractAddress"
                    :placeholder="$t('contractAddress')" class="ipt" />
            </div>
        </div>
        <div class="form-item">
            <div class="form-item-title">{{ $t('enterTokenId') }}</div>
            <div class="form-item-value">
                <el-input :model-value="tokenId" @update:model-value="changeTokenId" :placeholder="$t('forExample')"
                    class="ipt" type="number" />
                <!-- TODO 这里得看看实际的效果 我没测试过 -->
                <ul class="info" v-if="isLockV3Verify">
                    <li class="item">
                        <div class="key">{{ $t('transactionPairs') }}</div>
                        <div class="value">{{ positions ? `${positions.token0Symbol}/${positions.token1Symbol}` : "--/--" }}
                        </div>
                    </li>
                    <li class="item">
                        <div class="key">{{ $t('lockQuantity') }}</div>
                        <div class="value">{{ positions ? ethers.formatEther(positions.liquidity.toString()) : "--" }}</div>
                    </li>
                </ul>
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

    <el-dialog v-model="lockConfirmDialogVisible" :title="$t('lockConfirm')" class="dlg dlg-lock-confirm">
        <ul class="dlg-item">
            <li>
                <div class="key">{{ $t('transactionPairs') }}</div>
                <div class="value">{{ positions.value ? `${positions.value.token0Symbol}/${positions.value.token1Symbol}` :
                    "--/--" }}</div>
            </li>
            <li>
                <div class="key">{{ $t("lockQuantity") }}</div>
                <div class="value">{{ positions.value ? ethers.formatEther(positions.value.liquidity.toString()) : "--" }}
                </div>
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

<style scoped lang='scss'>
.form {
    .form-item {
        margin-top: 20px;

        .form-item-title {
            font-size: 14px;
            color: #333333;
            font-weight: 700;

            margin-bottom: 10px;

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
            .info {
                font-size: 14px;
                letter-spacing: 0;
                font-weight: 400;
                padding: 12px 0;

                li {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;

                    .key {
                        color: #999999;
                    }

                    .value {
                        color: #333333;

                        .token {
                            --sizeBig: 20px;

                            display: flex;
                            justify-content: flex-start;

                            align-items: center;

                            font-size: 14px;
                            color: #333333;
                            letter-spacing: 0;
                            text-align: right;
                            font-weight: 400;

                            .token-icon {
                                margin-right: -4px;
                            }

                            .token-icon:last-child {
                                margin-right: 6px;
                            }
                        }
                    }
                }

                li:last-child {
                    margin-bottom: 0;
                }
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
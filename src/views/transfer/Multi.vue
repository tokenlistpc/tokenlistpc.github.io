<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import Step from "@/components/Step.vue"
import SelectToken from "./components/SelectToken.vue"
import InputAddressList from "./components/InputAddressList.vue"
import { useStore } from "@/store"
import api from '@/api'
import { ElMessage, ElLoading } from 'element-plus'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { useMtStore } from '@/store/transfer'
import { useRouter, useRoute } from 'vue-router'

import { useI18n } from "vue-i18n"

const { t } = useI18n()

const router = useRouter()

const store = useStore()
const mtStore = useMtStore()
const stepList = reactive(["ready", "confirm", "multiTransfer"])
const step = ref(0)
const transferType = ref(0)
const oneKeyLockLoading = ref(false)
const childInputAddressList=ref(null)
const transferTypeList = ref([
    {
        name: "customTransfer",
        value: 0
    },
    {
        name: "randomAddress",
        value: 1
    },
])


const customRuleList = ref([
    {
        name: "dividedEquallyByTotal",
        value: 0,
    },
    {
        name: "eachAddressEqual",
        value: 1,
    }
])

const customRule = ref(0)
const isCustom = ref(false)

const iptAddressList = ref([])

const needApprove = ref(false)
const approveLoading = ref(false)

const token = ref(null)
const selectTokenDialogVisible = ref(false)

async function selectTokenClick(t1) {
    token.value = t1
    selectTokenDialogVisible.value = false
    if (token.value.address == api.wallet.MAIN_COIN_ADDRESS) {
        needApprove.value = false
        return
    }
    const isAllowanceEnough = await api.wallet.metamask.isAllowanceEnough(store.transfer.multiSenderAddress, token.value.address, store.walletAddress)
    if (isAllowanceEnough) {
        needApprove.value = false
    } else {
        needApprove.value = true
    }
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
            store.transfer.multiSenderAddress
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


function tokenClick() {
    selectTokenDialogVisible.value = true
}

function inputAddressChange(custom, addressList) {
    isCustom.value = custom
    iptAddressList.value = addressList
}


const singleAmountString = ref("")
const totalAmountString = ref("")

const customTotalAmount = computed(() => {
    if (transferType.value == 0 && isCustom.value) {
        let total = BigNumber(0)
        for (let i = 0; i < iptAddressList.value.length; i++) {
            const l = iptAddressList.value[i]
            total = total.plus(BigNumber(l.amountString))
        }
        return total.toNumber()
    }
    return 0
})

const randomAddressString = ref("")
const randomSingleAmountString = ref("")

// 真实转账列表 address amountString
const realTransferList = ref([])
// 真实总转账金额
const realTotalAmount = ref(0)

const gas = ref(0)
const baseFee = ref(0)
const realReceiptTotalAmount = ref(0)
const nativeCurrencyBalance = ref(0)
const totalServiceFee = computed(() => {
    return BigNumber(gas.value).plus(baseFee.value).toNumber()
})

const notEnoughBalance = computed(() => {
    return nativeCurrencyBalance.value < totalServiceFee.value
})



watch(() => [realTransferList.value, step.value, token.value], async () => {
    console.log("watch watch watch")
    if (step.value == 1 && realTransferList.value.length > 0 && token.value) {
        const loading = ElLoading.service({
            lock: true,
            text: t('estimatingGas'),
        })

        try {
            // 余额
            let nativeCurrencyBalanceBint = await api.wallet.metamask.getBalance(store.walletAddress)
            nativeCurrencyBalance.value = BigNumber(ethers.formatEther(nativeCurrencyBalanceBint)).toNumber()

            const msContract = await api.wallet.metamask.contractMultiTransfer(store.transfer.multiSenderAddress)

            let totalAmount = BigNumber(0)
            let addressList = []
            let amountBintList = []

            for (let i = 0; i < realTransferList.value.length; i++) {
                const r = realTransferList.value[i]
                totalAmount = totalAmount.plus(BigNumber(r.amountString))

                addressList.push(r.address)
                amountBintList.push(ethers.parseUnits(r.amountString, token.value.decimals))
            }
            realTotalAmount.value = totalAmount.toNumber()

            // 服务费
            const baseFeeBint = await msContract.getFee(realTransferList.value.length)
            baseFee.value = ethers.formatUnits(baseFeeBint, token.value.decimals)

            // gas
            // 转账携带金额
            let transferValueBint = baseFeeBint
            if (token.value.address == api.wallet.MAIN_COIN_ADDRESS) {
                transferValueBint = baseFeeBint + ethers.parseUnits(totalAmount.toString(), token.value.decimals)
            }


            const gasPriceBint = await api.wallet.metamask.getGasPrice()
            let gasLimitBint = (await msContract.multiSend.estimateGas(token.value.address, addressList, amountBintList, {
                value: transferValueBint
            })) * 2n

            gas.value = ethers.formatEther(gasLimitBint * gasPriceBint)

            // 到账总金额
            const receiptTotalAmountBint = await msContract.multiSend.staticCall(token.value.address, addressList, amountBintList, {
                value: transferValueBint
            })
            realReceiptTotalAmount.value = ethers.formatUnits(receiptTotalAmountBint, token.value.decimals)



        } catch (e) {
            console.dir(e)
            let msg = api.wallet.metamask.parseError(e)
            ElMessage.error(t(msg))

        } finally {
            loading.close()
        }
    } else {
        gas.value = 0
        baseFee.value = 0
        realTotalAmount.value = 0
        realReceiptTotalAmount.value = 0
    }
}, {
    deep: true
})


async function nextStepClick() {
    if (!token.value) {
        ElMessage.error(t('pleaseSelectToken1'))
        return
    }
    if (transferType.value == 0) {
        if (iptAddressList.value.length === 0) {
            ElMessage.error(t('enterTransferAddress'))
            return
        }

        if (iptAddressList.value.length > 400) {
            ElMessage.error(t('numOfAddressLimit'))
            return
        }
        // 自定义转账
        if (isCustom.value) {

        } else {
            if (customRule.value == 0) {
                if (!totalAmountString.value) {
                    ElMessage.error(t('enterTransferAmount'))
                    return
                }
            } else {
                if (!singleAmountString.value) {
                    ElMessage.error(t('enterTransferAmount'))
                    return
                }
            }
        }
    } else {
        // 随机转账
        if (!randomAddressString.value) {
            ElMessage.error(t('pleaseEnterNumOfaddress'))
            return
        }
        // 判断数值 是不是不是整数  是不是小于等于0 是不是大于400
        let randomAddress = BigNumber(randomAddressString.value).toNumber()
        if (randomAddress <= 0) {
            ElMessage.error(t('pleaseEnterNumOfaddress'))
            return
        }

        if (randomAddress > 400) {
            ElMessage.error(t('numOfAddressLimit'))
            return
        }

        if (!randomSingleAmountString.value) {
            ElMessage.error(t('pleaseEnterAmount'))
            return
        }
        // 判断数值 是不是小于等于0

        let randomSingleAmount = BigNumber(randomSingleAmountString.value).toNumber()
        if (randomSingleAmount <= 0) {
            ElMessage.error(t('pleaseEnterCorrectAmount'))
            return
        }
    }

    const transferList = []
    
    if (transferType.value == 0) {
        if (isCustom.value) {
            for (let i = 0; i < iptAddressList.value.length; i++) {
                const l = iptAddressList.value[i]

                transferList.push({
                    address: l.address,
                    amountString: l.amountString
                })
            }
        } else {
            if (customRule.value == 0) {
                const singleString = BigNumber(totalAmountString.value).div(iptAddressList.value.length).dp(2).toString()
                for (let i = 0; i < iptAddressList.value.length; i++) {
                    const l = iptAddressList.value[i]
                    transferList.push({
                        address: l.address,
                        amountString: singleString
                    })
                }
            } else {
                for (let i = 0; i < iptAddressList.value.length; i++) {
                    const l = iptAddressList.value[i]
                    transferList.push({
                        address: l.address,
                        amountString: singleAmountString.value
                    })
                }
            }
        }
    } else {
        const randomAddressQty = parseInt(randomAddressString.value)

        // TODO 需要改进一下
        for (let i = 0; i < randomAddressQty; i++) {
            let wallet = ethers.Wallet.createRandom()
            transferList.push({
                address: wallet.address.toLowerCase(),
                amountString: randomSingleAmountString.value
            })
        }
    }
    realTransferList.value = transferList

    let totalAmount = BigNumber(0)
    let addressList = []
    let amountBintList = []

    for (let i = 0; i < realTransferList.value.length; i++) {
        const r = realTransferList.value[i]
        totalAmount = totalAmount.plus(BigNumber(r.amountString))
        addressList.push(r.address)
        amountBintList.push(ethers.parseUnits(r.amountString, token.value.decimals))
    }

    if (token.value.amount < totalAmount) {
        ElMessage.error(t("transferAmountExceeds"))
        return
    }
    step.value = 1
}

function removeRealTransferItem(index) {
    console.log(index)
    realTransferList.value.splice(index, 1)
}


async function confirmClick() {
    if (realTransferList.value.length == 0) {
        ElMessage.error(t('noAddressForTransfer'))
        return
    }

    let totalAmount = BigNumber(0)
    let addressList = []
    let amountBintList = []

    for (let i = 0; i < realTransferList.value.length; i++) {
        const r = realTransferList.value[i]
        totalAmount = totalAmount.plus(BigNumber(r.amountString))
        addressList.push(r.address)
        amountBintList.push(ethers.parseUnits(r.amountString, token.value.decimals))
    }

    if (token.value.amount < totalAmount) {
        ElMessage.error(t("transferAmountExceeds"))
        return
    }

    const loading = ElLoading.service({
        lock: true,
        text: t('trading'),
    })
    try {
        const msContract = await api.wallet.metamask.contractMultiTransfer(store.transfer.multiSenderAddress)

        const baseFeeBint = await msContract.getFee(realTransferList.value.length)
        let transferValueBint = baseFeeBint
        if (token.value.address == api.wallet.MAIN_COIN_ADDRESS) {
            transferValueBint = baseFeeBint + ethers.parseUnits(totalAmount.toString(), token.value.decimals)
        }

        let gasLimitBint = (await msContract.multiSend.estimateGas(token.value.address, addressList, amountBintList, {
            value: transferValueBint
        })) * 2n

        const lockRes = await msContract.multiSend(token.value.address, addressList, amountBintList, {
            value: transferValueBint,
            gasLimit: gasLimitBint
        })
        console.dir(lockRes)
        const txHash = lockRes.hash
        // 等待上链
        const contractRes = await lockRes.wait()
        console.dir(contractRes)
        // 交易hash
        console.log("txHash: " + txHash)
        if (contractRes.status != 1) {
            ElMessage.error(t('upChainFail'))
            // 上链失败 将失败结果上传至服务器
            await api.multiSend.sendMultiSendFailTx(store.chain, txHash)
        } else {
            // 将结果传入store
            let item = {
                receiverCount: 0,
                sendAmount: ethers.parseUnits(totalAmount.toString(), token.value.decimals).toString(),
                sendTime: dayjs().unix(),
                sender: store.walletAddress,
                status: -1,
                tokenAddress: token.value.address,
                tokenDecimal: token.value.decimals,
                tokenSymbol: token.value.symbol,
                txHash: txHash
            }
            console.dir(item)
            mtStore.transferringList.push(item)
            step.value = 2
        }
    } catch (e) {
        console.dir(e)
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
    } finally {
        loading.close()
    }
}

function intFormatter(v) {
    console.log("intFormatter", v)
    return v.replace(".", "")
}

function clearAddress() {
    childInputAddressList.value.clearAddress()
    iptAddressList.value=[]
    isCustom.value = false
} 

</script>
<template>
    <div>
        <div>
            <Step :step-list="stepList" :current="step" />
        </div>
    </div>
    <div class="form">
        <template v-if="step == 0">
            <div class="form-item">
                <div class="form-item-title">{{ $t('selectToken') }}</div>
                <div class="form-item-value">
                    <div class="select" @click="tokenClick">
                        <template v-if="token">
                            <icon-text :icon="token.icon" :text="token.symbol"></icon-text>
                        </template>
                        <template v-else>
                            <div class="placeholder">{{ $t('pleaseSelectToken') }}</div>
                        </template>
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </div>
                </div>
            </div>

            <div class="form-item">
                <div class="form-item-title">{{ $t('selectTransferType') }}</div>
                <div class="form-item-value">
                    <el-button v-for="t in transferTypeList" :key="t.value" class="btn btn-select-type" :class="{
                        'btn-gradient': t.value == transferType
                    }" @click="transferType = t.value">{{ $t(t.name) }}</el-button>
                </div>
            </div>
            <template v-if="transferType == 0">
                <div class="form-item address-list">
                    <div class="form-item-title">
                        <div>{{ $t('receivingAddress1') }}</div>
                        <div class="clear" @click="clearAddress">
                            <svg-icon name="clear"></svg-icon>
                            <div>{{ $t('clear') }}</div>
                        </div>
                    </div>
                    <div class="form-item-value">
                        <InputAddressList ref="childInputAddressList" :isCustom="isCustom" :addressList="iptAddressList" @ipt-change="inputAddressChange" />
                        <div class="address-list-tips">
                            <div>{{ $t('copyAddressTips1') }}</div>
                            <div>{{ $t('copyAddressTips2') }}</div>
                            <div>{{ $t('copyAddressTips3') }}</div>
                        </div>
                    </div>
                </div>
                <div class="form-item rule">
                    <div class="form-item-title">{{$t('distributionRules')}}：</div>
                    <div class="form-item-value">
                        <template v-if="isCustom">
                            <el-radio-group :model-value="0">
                                <el-radio :label="0">{{ $t('customAmount') }}</el-radio>
                            </el-radio-group>
                        </template>
                        <template v-else>
                            <el-radio-group v-model="customRule">
                                <el-radio v-for="r in customRuleList" :key="r.value" :label="r.value">{{ $t(r.name)
                                }}</el-radio>
                            </el-radio-group>
                        </template>
                    </div>
                </div>
                <template v-if="isCustom">
                    <div class="form-item">
                        <div class="form-item-title">{{ $t('totalQuantity') }}</div>
                        <div class="form-item-value">
                            <el-input class="ipt" v-model="customTotalAmount" type="number" disabled />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="form-item" v-if="customRule == 0">
                        <div class="form-item-title">{{ $t('totalQuantity') }}</div>
                        <div class="form-item-value">
                            <el-input class="ipt" v-model="totalAmountString" type="number" />
                        </div>
                    </div>
                    <div class="form-item" v-else>
                        <div class="form-item-title">{{ $t('distributionAmount') }}</div>
                        <div class="form-item-value">
                            <el-input class="ipt" v-model="singleAmountString"  type="number" />
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('inputAddressNum') }}</div>
                    <div class="form-item-value">
                        <el-input class="ipt" :placeholder="$t('maximum')" v-model="randomAddressString" type="number" :formatter="intFormatter" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('inputAmountPerAddress') }}</div>
                    <div class="form-item-value">
                        <el-input class="ipt" v-model="randomSingleAmountString" type="number" />
                    </div>
                </div>
            </template>
            <!-- 
            <div class="form-item">
                <div class="form-item-title">实际支付总额</div>
                <div class="form-item-value">
                    <div class="real-pay-amount">$189.23(<span>含转账消耗8%</span>)</div>
                </div>
            </div> -->

            <div class="form-bottom">
                <div class="form-bottom-btns">
                    <template v-if="needApprove">
                        <el-button class="btn btn-gradient" @click="approveClick"
                            :loading="approveLoading">{{ $t('approve') }}</el-button>
                    </template>
                    <template v-else>
                        <el-button class="btn btn-gradient" @click="nextStepClick" :loading="oneKeyLockLoading">{{ $t('oneClickTransfer') }}</el-button>
                    </template>
                </div>
            </div>
        </template>
        <template v-else-if="step == 1">
            <div class="info">
                <div class="info-item">
                    <div class="info-key">{{ realTransferList.length }}</div>
                    <div class="info-value">{{ $t('addressCount') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-key">{{ `${realTotalAmount} ${token.symbol}` }}</div>
                    <div class="info-value">{{ $t('realTotalPayment') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-key">{{ `${realReceiptTotalAmount} ${token.symbol}` }}</div>
                    <div class="info-value">{{ $t('totalAmountOfReceived') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-key">{{ `${token.amount} ${token.symbol}` }}</div>
                    <div class="info-value">{{ $t('tokenBalance') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-key">{{ `${gas} ${store.nativeCurrencySymbol}` }}</div>
                    <div class="info-value">{{ $t('estimatedGas') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-key">{{ `${baseFee} ${store.nativeCurrencySymbol}` }}</div>
                    <div class="info-value">{{ $t('serviceFee') }}</div>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-title">{{ $t('receivingAddress1') }}</div>
                <div class="form-item-value">
                    <table class="receiving-address">
                        <tr>
                            <th>{{ $t('walletAddress') }}</th>
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('operate') }}</th>
                        </tr>
                        <tr v-for="(r, index) in realTransferList" :key="index">
                            <td class="address">{{ r.address }}</td>
                            <td>{{ `${r.amountString} ${token.symbol}` }}</td>
                            <td>
                                <el-button type="danger" plain class="btn-remove"
                                    @click="removeRealTransferItem(index)">{{ $t('remove') }}</el-button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- <div class="form-item">
                <div class="form-item-title">实际支付总额</div>
                <div class="form-item-value">
                    <div class="real-pay-amount">$189.23(<span>含转账消耗8%</span>)</div>
                </div>
            </div> -->
            <el-alert v-if="notEnoughBalance"
                :title="$t('notEnoughFee',{nativeCurrencySymbol:store.nativeCurrencySymbol,nativeCurrencyBalance:nativeCurrencyBalance,totalServiceFee:totalServiceFee})"
                type="error" show-icon />

            <div class="form-bottom">
                <div class="form-bottom-btns">
                    <el-button class="btn" @click="step=0">{{ $t('previousStep') }}</el-button>
                    <el-button class="btn btn-gradient" @click="confirmClick">{{ $t('confirm') }}</el-button>
                </div>
            </div>
        </template>
        <template v-else-if="step == 2">
            <div class="create-success">
                <svg-icon name="createSuccess"></svg-icon>
                <div class="text">{{ $t('transferResultSuccess1') }}</div>
                <el-button @click="router.push('/transfer/history')">{{ $t('transferResultSuccess2') }}</el-button>
            </div>
        </template>
    </div>

    <el-dialog v-model="selectTokenDialogVisible" :title="$t('selectToken')" class="dlg dlg-select-token"
        destroy-on-close>
        <SelectToken @select="(t) => selectTokenClick(t)"></SelectToken>
    </el-dialog>
</template>

<style scoped lang='scss'>
.fl-sb {
    display: flex;
    justify-content: space-between;
}

.fl-fs {
    display: flex;
    justify-content: flex-start;
}

.rule {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .form-item-title {
        margin-bottom: 0 !important;
        margin-right: 12px;
    }
}

.btn-select-type {
    width: 216px;
    height: 32px;
    margin-right: 24px;
}

.address-list-tips {
    font-size: 14px;
    color: #F6465D;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 400;

    margin-top: 4px;
}

.address-list {


    .form-item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .clear {
        font-size: 14px;
        color: #999999;
        font-weight: 400;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;

        .svg-icon {
            width: 16px;
            height: 16px;

            margin-right: 4px;
        }
    }
}


.receiving-address {
    width: 100%;
    border: 1px solid #E6E7E8;
    border-radius: 4px;



    tr {
        height: 40px;

        th {
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            line-height: 16px;
            font-weight: 400;
            border: 1px solid #E6E7E8;
            text-align: center;

            &:first-child {
                text-align: left;
                padding-left: 20px;
            }

        }

        td {
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            line-height: 16px;
            font-weight: 400;
            border: 1px solid #E6E7E8;
            text-align: center;

            &:first-child {
                text-align: left;
                padding-left: 20px;
            }

            .btn-remove {
                border: none;
                height: 26px;
            }

        }

        .address {
            color: #01A7FF;
        }
    }

}

.real-pay-amount {
    font-size: 18px;
    color: #333333;
    line-height: 25px;
    font-weight: 500;

    span {
        color: #F6465D;
    }
}

.ipt {
    height: 44px !important;
}

.form {
    .item-switch {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 14px;
            color: #333333;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .note {
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            line-height: 16px;
            font-weight: 400;
        }


    }

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
            .select {
                height: 44px;
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
            }

            .select-icon {
                width: 20px;
                border-radius: 50%;
            }

            .ipt {
                height: 44px;
            }

            .deployer-list {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;

                .btn-deployer {
                    width: 100%;
                }

                .btn-deployer:not(:last-child) {
                    margin-right: 24px;
                }
            }

            .deployer-note {
                font-size: 12px;
                color: #ff9f37;
                line-height: 16px;
                font-weight: 400;
            }

            .rate-item {
                height: 42px;
                border: 1px solid #e6e7e8;
                border-radius: 4px;

                display: flex;
                justify-content: space-between;
                align-items: center;

                padding: 0 12px;

                margin-bottom: 10px;

                .rate-item-title {
                    font-size: 14px;
                    color: #999999;
                    letter-spacing: 0;
                    line-height: 20px;
                    font-weight: 400;
                }
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
        display: flex;
        flex-direction: column;
        align-items: center;

        .fee {
            font-size: 12px;
            color: #01a7ff;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .form-bottom-btns {
            width: 480px;
            margin-bottom: 36px;
            display: flex;
            justify-content: space-between;

            .btn {
                width: 100%;
                height: 40px;
                margin:0 10px;
            }

            .btn-gradient {}
        }
    }

    .info {
        margin-top: 34px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .info-item {
            box-sizing: border-box;
            border: 1px solid #E6E7E8;
            border-radius: 4px;

            display: flex;
            flex-direction: column;
            align-items: center;
            width: calc((100% - 10px) / 2);
            margin-bottom: 10px;
            margin-right: 10px;
            padding: 13px 0;

            &:nth-of-type(2n) {
                margin-right: 0;
            }

            .info-key {
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                font-weight: 500;
                margin-bottom: 5px;
            }

            .info-value {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: left;
                line-height: 22px;
                font-weight: 400;
            }
        }
    }
}

.create-success {
    margin-top: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .svg-icon {
        width: 48px;
        height: 48px;
    }

    .text {
        margin-top: 10px;
        margin-bottom: 30px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: 500;
    }
}
</style>
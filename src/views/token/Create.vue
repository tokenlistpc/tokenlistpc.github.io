<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import cfg from "@/config"
import Step from "@/components/Step.vue"
import Rate from "@/components/Rate.vue"
import { useStore } from "@/store"
import { useConfigStore } from "@/store/config"
import { ElMessage } from 'element-plus'
import BigNumber from 'bignumber.js'
import { useI18n } from 'vue-i18n'
import api from "@/api"
import { isAddress, formatAddress, sleep, getTokenIcon } from "@/utils"
import SelectToken from "@/views/token/components/SelectToken.vue"
import SelectSwap from "@/components/SelectSwap.vue"
import { ElLoading } from 'element-plus'
import { ethers } from "ethers"
import { useRoute, useRouter } from 'vue-router'
import { copy } from "@/utils"


const { t } = useI18n()
const store = useStore()
const router = useRouter()

const configStore = useConfigStore()

const createTokenConfirmVisible = ref(false)
const openSourceConfigVisible = ref(false)
const selectTokenDialogVisible = ref(false)
const selectSwapDialogVisible = ref(false)

const createTokenLoading = ref(false)
const createConfirmLoading = ref(false)
const showTaxInstruction = ref(false)

const step = ref(0)

function changeStep(i) {
    console.log("changeStep", i)
}

const name = ref("")
const symbol = ref("")
const decimals = ref(18)
const totalSupply = ref("")
const canMint = ref(false)

const token = ref(null)
const chainSwap = ref(null)

const rewardToken = ref("")
const mustHoldNum = ref("")

const buyFundFeeRate = ref(0)
const buyBurnFeeRate = ref(0)
const buyLPFeeRate = ref(0)
const buyRewardFeeRate = ref(0)

const sellFundFeeRate = ref(0)
const sellBurnFeeRate = ref(0)
const sellLPFeeRate = ref(0)
const sellRewardFeeRate = ref(0)

const fundAddress = ref("")

const enableManualStartTrade = ref(false)
const enableKillBlock = ref(false)
const killBlock = ref("")
const enableChangeTax = ref(false)
const enableWhiteList = ref(false)
const enableWalletLimit = ref(false)
const maxWalletAmount = ref("")
const enableSwapLimit = ref(false)
const maxSwapAmount = ref("")


const txHash = ref("")
const deployerList = computed(() => {
    const list = []
    if (store.selectedChain) {
        for (let i = 0; i < store.selectedChain.create.deployerList.length; i++) {
            let d = store.selectedChain.create.deployerList[i]
            let deployerName = ""
            let isNew = false
            switch (d.deployerId) {
                case 0:
                case 5:
                    deployerName = "freeTax"
                    break;
                case 1:
                case 6:
                    deployerName = "feeToken"
                    break;
                case 2:
                case 7:
                    deployerName = "selfDividendToken"
                    break;
                case 3:
                case 8:
                    deployerName = "addPoolDividend"
                    break;
                case 4:
                    deployerName = "dividendToken"
                    isNew = true
                    break;
                default:
                    break;
            }

            list.push({
                "deployerId": d.deployerId,
                "deployerName": deployerName,
                "isNew": isNew
            })
        }
    } else {
        list.push({
            "deployerId": 4,
            "deployerName": "dividendToken",
            "isNew": true
        })
    }
    return list
})
const currentDeployerId = ref(4)


function changeCurrentDeployerId(deployerId) {
    console.log("changeCurrentDeployerId", deployerId)
    if (deployerId == 4) {
        decimals.value = 18
    }
    currentDeployerId.value = deployerId
}
const stepList = computed(() => {
    if (currentDeployerId.value == 0 || currentDeployerId.value == 5) {
        return ["selectTemplate", "createSuccess"]
    } else {
        return ["selectTemplate", "taxSetting", "issueControl", "createSuccess"]
    }
})


const baseFeeShow = computed(() => {
    if (store.selectedChain && store.selectedChain.create) {
        let deployer = store.selectedChain.create.deployerList.find(x => x.deployerId == currentDeployerId.value)
        console.log(deployer)
        console.log(deployerList)
        if (!deployer) {
            currentDeployerId.value = deployerList.value[0].deployerId
            deployer = store.selectedChain.create.deployerList.find(x => x.deployerId == currentDeployerId.value)
        }
        console.log(deployer)
        return deployer.baseFee
    }
    return 0
})

const maxRate = computed(() => {
    return currentDeployerId.value == 4 ? 25 : 20
})

// 买入时 最大营销费用
const maxBuyFundFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(buyBurnFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(buyRewardFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(buyRewardFeeRate.value).minus(buyLPFeeRate.value).minus(buyBurnFeeRate.value).toNumber()
    }
    return 0
})



// 买入时 最大营销费用
const maxBuyLPFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(buyFundFeeRate.value).minus(buyBurnFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(buyFundFeeRate.value).minus(buyRewardFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(buyRewardFeeRate.value).minus(buyFundFeeRate.value).minus(buyBurnFeeRate.value).toNumber()
    }
    return 0
})

const maxBuyBurnFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(buyFundFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(buyRewardFeeRate.value).minus(buyFundFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    }
})

const maxBuyRewardFee = computed(() => {
    if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(buyFundFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(buyBurnFeeRate.value).minus(buyFundFeeRate.value).minus(buyLPFeeRate.value).toNumber()
    }
    return 0
})

const maxSellFundFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(sellBurnFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(sellRewardFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(sellBurnFeeRate.value).minus(sellRewardFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    }
    return 0
})


const maxSellLPFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellBurnFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellRewardFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellRewardFeeRate.value).minus(sellBurnFeeRate.value).toNumber()
    }
    return 0
})

const maxSellBurnFee = computed(() => {
    if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellRewardFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    }
    return 0
})

const maxSellRewardFee = computed(() => {
    if (currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    } else if (currentDeployerId.value == 4) {
        return BigNumber(maxRate.value).minus(sellFundFeeRate.value).minus(sellBurnFeeRate.value).minus(sellLPFeeRate.value).toNumber()
    }
    return 0
})


const createChainList = computed(() => {
    return cfg.chainList.filter(x => !!x.create && x.isTestChain == store.isTestChain)
})

const selectChain = computed(() => {
    if (store.selectedChain) {
        return createChainList.value.find(x => x.chainId == store.selectedChain.chainId)
    }
    return null
})

async function chainSelectChange(chain) {
    console.log(chain)
    try {
        await store.changeSelectedChain(chain)
    } catch (e) {
        console.log(e)
        const msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
    }
}

function nextStepClick() {
    if (step.value == 0) {
        if (!checkStep0()) {
            return
        }
    } else if (step.value == 1) {
        if (!checkStep1()) {
            return
        }
    }
    step.value = step.value + 1
}

function backStepClick() {
    step.value = step.value - 1
}


function selectTokenClick(t) {
    token.value = t
    selectTokenDialogVisible.value = false
}

function selectSwapClick(s) {
    chainSwap.value = s
    selectSwapDialogVisible.value = false
}

function killBlockChange(v) {
    if (v) {
        if (enableManualStartTrade.value == false) {
            enableManualStartTrade.value = true
        }
    }
}

function checkStep0() {
    // 验证表单数据
    if (!name.value) {
        ElMessage.error(t('pleaseEnterName'))
        return false
    }
    if (!symbol.value) {
        ElMessage.error(t('pleaseEnterSymbol'))
        return false
    }
    if (!totalSupply.value) {
        ElMessage.error(t('pleaseEnterTotal'))
        return false
    }

    if (!decimals.value) {
        ElMessage.error(t('pleaseEnterDecimals'))
        return false
    }
    return true
}

function checkStep1() {
    if (currentDeployerId.value != 4) {
        if (!token.value) {
            ElMessage.error(t('pleaseSelectCurrency'))
            return false
        }
    }

    if (!chainSwap.value) {
        ElMessage.error(t('pleaseSelectSwap'))
        return false
    }

    if (currentDeployerId.value === 1 || currentDeployerId.value == 6) {
        if (BigNumber(buyFundFeeRate.value).plus(buyBurnFeeRate.value).plus(buyLPFeeRate.value).plus(sellFundFeeRate.value).plus(sellBurnFeeRate.value).plus(sellLPFeeRate.value).lte(0)) {
            ElMessage.error(t('taxMustGt0'))
            return false
        }
    } else if (currentDeployerId.value === 2 || currentDeployerId.value == 7) {
        if (BigNumber(buyFundFeeRate.value).plus(buyLPFeeRate.value).plus(sellFundFeeRate.value).plus(sellLPFeeRate.value).lte(0)) {
            ElMessage.error(t('taxlimit2'))
            return false
        }
    } else if (currentDeployerId.value === 3 || currentDeployerId.value == 8) {
        if (!rewardToken.value) {
            ElMessage.error(t("dividendTokenError"))
            return false
        }
        if (!isAddress(rewardToken.value)) {
            ElMessage.error(t('pleaseEnterTrueAddress'))
            return false
        }

        if (BigNumber(buyFundFeeRate.value).plus(buyLPFeeRate.value).plus(buyRewardFeeRate.value).plus(sellFundFeeRate.value).plus(sellLPFeeRate.value).plus(sellRewardFeeRate.value).lte(0)) {
            ElMessage.error(t('taxMustGt0'))
            return false
        }
    } else if (currentDeployerId.value === 4) {
        if (!mustHoldNum.value) {
            ElMessage.error(t('EnterMinDividend'))
            return false
        }
        if (Number(mustHoldNum.value) <= 0) {
            ElMessage.error(t('minDividendBt0'))
            return false
        }
    }

    if ((Number(buyFundFeeRate.value) > 0 || Number(sellFundFeeRate.value) > 0) && !fundAddress.value) {
        ElMessage.error(t('pleaseEnterMarketingAddress'))
        return false
    }

    if (fundAddress.value) {
        if (!isAddress(fundAddress.value)) {
            ElMessage.error(t('pleaseEnterTrueAddress'))
            return false
        }
    }
    return true
}

function checkStep2() {
    if (enableKillBlock.value && (!killBlock.value || Number(killBlock.value) <= 0)) {
        ElMessage.error(t('pleaseEnterKillBlockNumber'))
        return false
    }

    if (enableKillBlock.value == true && enableManualStartTrade.value === false) {
        ElMessage.error(t('enterKillBlockNumberMust'))
        return false
    }

    if (enableWalletLimit.value && (!maxWalletAmount.value || Number(maxWalletAmount.value) <= 0)) {
        ElMessage.error(t('pleaseEnterMaxWalletLimit'))
        return false
    }
    if (enableSwapLimit.value && (!maxSwapAmount.value || Number(maxSwapAmount.value) <= 0)) {
        ElMessage.error(t('pleaseEnterMaxSwapLimit'))
        return false
    }
    return true
}

async function createTokenClick() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (store.chainId != selectChain.value.chainId) {
        ElMessage.error(t('switchNetwork'))
        return
    }

    if (!checkStep0()) {
        return
    }

    if (currentDeployerId.value == 1 || currentDeployerId.value == 2 || currentDeployerId.value == 3 || currentDeployerId.value == 4 ||
        currentDeployerId.value == 6 || currentDeployerId.value == 7 || currentDeployerId.value == 8) {
        if (!checkStep1()) {
            return
        }

        if (!checkStep2()) {
            return
        }
    }

    createTokenLoading.value = true

    const baseFee = store.create.deployerList.find(x => x.deployerId == currentDeployerId.value).baseFee
    const baseFeeN = ethers.parseEther(baseFee.toString())

    // 余额判断
    const balance = await api.wallet.metamask.getBalance(store.walletAddress)
    console.log("balance", balance)
    if (balance < baseFeeN) {
        ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: baseFee }))
        createTokenLoading.value = false
        return
    }
    createTokenConfirmVisible.value = true
    createTokenLoading.value = false
}

async function swapCreateTokenParams() {
    const stringParams = []
    const addressParams = []
    const numberParams = []
    const boolParams = []

    if (currentDeployerId.value == 0 || currentDeployerId.value == 5) {
        // name
        stringParams[0] = name.value
        // symbol
        stringParams[1] = symbol.value
        // decimals
        numberParams[0] = parseInt(decimals.value)
        // totalSupply
        numberParams[1] = ethers.parseUnits(totalSupply.value, parseInt(decimals.value))
        if (currentDeployerId.value == 0) {
            // canMint
            boolParams[0] = canMint.value
        }
    } else if (currentDeployerId.value == 1 || currentDeployerId.value == 6) {
        // name
        stringParams[0] = name.value
        // symbol
        stringParams[1] = symbol.value
        // currency(底池币种,如果是BNB，使用WBNB地址)
        let currency = token.value.tokenAddress
        let currencyIsEth = false
        if (currency === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            const swapContract = await api.wallet.metamask.contractSwap(chainSwap.value.routerAddress)
            const weth = await swapContract.WETH()
            currency = weth.toLowerCase()
            currencyIsEth = true
        }
        addressParams[0] = currency
        // swapRouter(dex router合约地址)
        addressParams[1] = chainSwap.value.routerAddress
        // receiveAddress(持有者地址)
        addressParams[2] = store.walletAddress
        // fundAddress(营销地址)
        addressParams[3] = fundAddress.value ? fundAddress.value : "0x0000000000000000000000000000000000000000"
        // decimals
        numberParams[0] = parseInt(decimals.value)
        // totalSupply
        numberParams[1] = ethers.parseUnits(totalSupply.value, parseInt(decimals.value))
        // _buyFundFee（买入营销费，扩大10000倍，如5%，则输入值500）
        numberParams[2] = BigNumber(buyFundFeeRate.value).times(100).toNumber()
        // _buyBurnFee（买入销毁费，扩大10000倍，如5%，则输入值500）
        numberParams[3] = BigNumber(buyBurnFeeRate.value).times(100).toNumber()
        // _buyLPFee（买入回流费，扩大10000倍，如5%，则输入值500）
        numberParams[4] = BigNumber(buyLPFeeRate.value).times(100).toNumber()
        // _sellFundFee（卖出营销费，扩大10000倍，如5%，则输入值500）
        numberParams[5] = BigNumber(sellFundFeeRate.value).times(100).toNumber()
        // _sellBurnFee（卖出销毁费，扩大10000倍，如5%，则输入值500）
        numberParams[6] = BigNumber(sellBurnFeeRate.value).times(100).toNumber()
        // _sellLPFee（卖出回流费，扩大10000倍，如5%，则输入值500）
        numberParams[7] = BigNumber(sellLPFeeRate.value).times(100).toNumber()
        // killBlock（杀区块数量）
        numberParams[8] = killBlock.value ? BigNumber(killBlock.value).toNumber() : 0
        // maxSwapAmount（最大交易数量，注意要乘以1e18)）
        numberParams[9] = maxSwapAmount.value ? ethers.parseUnits(maxSwapAmount.value, parseInt(decimals.value)) : 0n
        // maxWalletAmount（最大持币数量，注意要乘以1e18)）
        numberParams[10] = maxWalletAmount.value ? ethers.parseUnits(maxWalletAmount.value, parseInt(decimals.value)) : 0n



        if (currentDeployerId.value == 1) {
            // canMint
            boolParams[0] = canMint.value
            // currencyIsEth（底池是否是原生资产，如BNB）
            boolParams[1] = currencyIsEth
            // enableManualStartTrade（是否开启手动交易）
            boolParams[2] = enableManualStartTrade.value
            // enableKillBlock（是否开启自动杀区块）
            boolParams[3] = enableKillBlock.value
            // enableSwapLimit（是否开启交易限制）
            boolParams[4] = enableSwapLimit.value
            // enableWalletLimit（是否开启持币限制）
            boolParams[5] = enableWalletLimit.value
            // enableChangeTax（是否开启税收开关）
            boolParams[6] = enableChangeTax.value
            // enableWhiteList（是否开启白名单）
            boolParams[7] = enableWhiteList.value
        } else {
            // currencyIsEth（底池是否是原生资产，如BNB）
            boolParams[0] = currencyIsEth
            // enableManualStartTrade（是否开启手动交易）
            boolParams[1] = enableManualStartTrade.value
            // enableKillBlock（是否开启自动杀区块）
            boolParams[2] = enableKillBlock.value
            // enableSwapLimit（是否开启交易限制）
            boolParams[3] = enableSwapLimit.value
            // enableWalletLimit（是否开启持币限制）
            boolParams[4] = enableWalletLimit.value
            // enableChangeTax（是否开启税收开关）
            boolParams[5] = enableChangeTax.value
            // enableWhiteList（是否开启白名单）
            boolParams[6] = enableWhiteList.value
        }
    } else if (currentDeployerId.value == 2 || currentDeployerId.value == 7) {
        // name
        stringParams[0] = name.value
        // symbol
        stringParams[1] = symbol.value
        // currency(底池币种,如果是BNB，使用WBNB地址)
        let currency = token.value.tokenAddress
        let currencyIsEth = false
        if (currency === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            const swapContract = await api.wallet.metamask.contractSwap(chainSwap.value.routerAddress)
            const weth = await swapContract.WETH()
            currency = weth.toLowerCase()
            currencyIsEth = true
        }
        addressParams[0] = currency
        // swapRouter(dex router合约地址)
        addressParams[1] = chainSwap.value.routerAddress
        // receiveAddress(持有者地址)
        addressParams[2] = store.walletAddress
        // fundAddress(营销地址)
        addressParams[3] = fundAddress.value ? fundAddress.value : "0x0000000000000000000000000000000000000000"
        // decimals
        numberParams[0] = parseInt(decimals.value)
        // _tTotal
        numberParams[1] = ethers.parseUnits(totalSupply.value, parseInt(decimals.value))
        // _buyFundFee（买入营销费，扩大10000倍，如5%，则输入值500）
        numberParams[2] = BigNumber(buyFundFeeRate.value).times(100).toNumber()
        // _buyRewardFee（买入分红费，扩大10000倍，如5%，则输入值500）
        numberParams[3] = BigNumber(buyRewardFeeRate.value).times(100).toNumber()
        // _buyLPFee（买入回流费，扩大10000倍，如5%，则输入值500）
        numberParams[4] = BigNumber(buyLPFeeRate.value).times(100).toNumber()
        // _sellFundFee（卖出营销费，扩大10000倍，如5%，则输入值500）
        numberParams[5] = BigNumber(sellFundFeeRate.value).times(100).toNumber()
        // _sellRewardFee（卖出分红费，扩大10000倍，如5%，则输入值500）
        numberParams[6] = BigNumber(sellRewardFeeRate.value).times(100).toNumber()
        // _sellLPFee（卖出回流费，扩大10000倍，如5%，则输入值500）
        numberParams[7] = BigNumber(sellLPFeeRate.value).times(100).toNumber()
        // killBlock（杀区块数量）
        numberParams[8] = killBlock.value ? BigNumber(killBlock.value).toNumber() : 0
        // maxSwapAmount（最大交易数量，注意要乘以1e18)）
        numberParams[9] = maxSwapAmount.value ? ethers.parseUnits(maxSwapAmount.value, parseInt(decimals.value)) : 0n
        // maxWalletAmount（最大持币数量，注意要乘以1e18)）
        numberParams[10] = maxWalletAmount.value ? ethers.parseUnits(maxWalletAmount.value, parseInt(decimals.value)) : 0n

        // currencyIsEth（底池是否是原生资产，如BNB）
        boolParams[0] = currencyIsEth
        // enableManualStartTrade（是否开启手动交易）
        boolParams[1] = enableManualStartTrade.value
        // enableKillBlock（是否开启自动杀区块）
        boolParams[2] = enableKillBlock.value
        // enableSwapLimit（是否开启交易限制）
        boolParams[3] = enableSwapLimit.value
        // enableWalletLimit（是否开启持币限制）
        boolParams[4] = enableWalletLimit.value
        // enableChangeTax（是否开启税收开关）
        boolParams[5] = enableChangeTax.value
        // enableWhiteList（是否开启白名单）
        boolParams[6] = enableWhiteList.value
    } else if (currentDeployerId.value == 3 || currentDeployerId.value == 8) {
        // name
        stringParams[0] = name.value
        // symbol
        stringParams[1] = symbol.value
        // currency(底池币种,如果是BNB，使用WBNB地址)
        let currency = token.value.tokenAddress
        let currencyIsEth = false
        if (currency === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            const swapContract = await api.wallet.metamask.contractSwap(chainSwap.value.routerAddress)
            const weth = await swapContract.WETH()
            currency = weth.toLowerCase()
            currencyIsEth = true
        }
        addressParams[0] = currency
        // swapRouter(dex router合约地址)
        addressParams[1] = chainSwap.value.routerAddress
        // receiveAddress(持有者地址)
        addressParams[2] = store.walletAddress
        // fundAddress(营销地址)
        addressParams[3] = fundAddress.value ? fundAddress.value : "0x0000000000000000000000000000000000000000"
        // rewardToken(分红币的地址，如果是BNB，使用WBNB地址)
        addressParams[4] = rewardToken.value
        // decimals
        numberParams[0] = parseInt(decimals.value)
        // _tTotal
        numberParams[1] = ethers.parseUnits(totalSupply.value, parseInt(decimals.value))
        // _buyFundFee（买入营销费，扩大10000倍，如5%，则输入值500）
        numberParams[2] = BigNumber(buyFundFeeRate.value).times(100).toNumber()
        // _buyRewardFee（买入分红费，扩大10000倍，如5%，则输入值500）
        numberParams[3] = BigNumber(buyRewardFeeRate.value).times(100).toNumber()
        // _buyLPFee（买入回流费，扩大10000倍，如5%，则输入值500）
        numberParams[4] = BigNumber(buyLPFeeRate.value).times(100).toNumber()
        // _sellFundFee（卖出营销费，扩大10000倍，如5%，则输入值500）
        numberParams[5] = BigNumber(sellFundFeeRate.value).times(100).toNumber()
        // _sellRewardFee（卖出分红费，扩大10000倍，如5%，则输入值500）
        numberParams[6] = BigNumber(sellRewardFeeRate.value).times(100).toNumber()
        // _sellLPFee（卖出回流费，扩大10000倍，如5%，则输入值500）
        numberParams[7] = BigNumber(sellLPFeeRate.value).times(100).toNumber()
        // killBlock（杀区块数量）
        numberParams[8] = killBlock.value ? BigNumber(killBlock.value).toNumber() : 0
        // maxSwapAmount（最大交易数量，注意要乘以1e18)）
        numberParams[9] = maxSwapAmount.value ? ethers.parseUnits(maxSwapAmount.value, parseInt(decimals.value)) : 0n
        // maxWalletAmount（最大持币数量，注意要乘以1e18)）
        numberParams[10] = maxWalletAmount.value ? ethers.parseUnits(maxWalletAmount.value, parseInt(decimals.value)) : 0n

        // currencyIsEth（底池是否是原生资产，如BNB）
        boolParams[0] = currencyIsEth
        // enableManualStartTrade（是否开启手动交易）
        boolParams[1] = enableManualStartTrade.value
        // enableKillBlock（是否开启自动杀区块）
        boolParams[2] = enableKillBlock.value
        // enableSwapLimit（是否开启交易限制）
        boolParams[3] = enableSwapLimit.value
        // enableWalletLimit（是否开启持币限制）
        boolParams[4] = enableWalletLimit.value
        // enableChangeTax（是否开启税收开关）
        boolParams[5] = enableChangeTax.value
        // enableWhiteList（是否开启白名单）
        boolParams[6] = enableWhiteList.value
        if (currentDeployerId.value == 3) {
            boolParams[7] = canMint.value
        }
    } else if (currentDeployerId.value == 4) {
        // name
        stringParams[0] = name.value
        // symbol
        stringParams[1] = symbol.value

        // fundAddress(营销地址)
        addressParams[0] = fundAddress.value ? fundAddress.value : "0x0000000000000000000000000000000000000000"
        // dividendToken(分红币的地址，不能使用BNB或WBNB)
        addressParams[1] = rewardToken.value
        // swapRouter(dex router合约地址)
        addressParams[2] = chainSwap.value.routerAddress

        // maxSwapAmount（最大交易数量，注意要乘以1e18)）
        numberParams[0] = maxSwapAmount.value ? ethers.parseUnits(maxSwapAmount.value, parseInt(decimals.value)) : 0n
        // maxWalletAmount（最大持币数量，注意要乘以1e18)）
        numberParams[1] = maxWalletAmount.value ? ethers.parseUnits(maxWalletAmount.value, parseInt(decimals.value)) : 0n
        // _buyFundFee（买入营销费，扩大10000倍，如5%，则输入值500）
        numberParams[2] = BigNumber(buyFundFeeRate.value).times(100).toNumber()
        // _buyLPFee（买入回流费，扩大10000倍，如5%，则输入值500）
        numberParams[3] = BigNumber(buyLPFeeRate.value).times(100).toNumber()
        // _buyRewardFee（买入分红费，扩大10000倍，如5%，则输入值500）
        numberParams[4] = BigNumber(buyRewardFeeRate.value).times(100).toNumber()
        // _buyBurnFee（买入销毁费，扩大10000倍，如5%，则输入值500）
        numberParams[5] = BigNumber(buyBurnFeeRate.value).times(100).toNumber()
        // _sellFundFee（卖出营销费，扩大10000倍，如5%，则输入值500）
        numberParams[6] = BigNumber(sellFundFeeRate.value).times(100).toNumber()
        // _sellLPFee（卖出回流费，扩大10000倍，如5%，则输入值500）
        numberParams[7] = BigNumber(sellLPFeeRate.value).times(100).toNumber()
        // _sellRewardFee（卖出分红费，扩大10000倍，如5%，则输入值500）
        numberParams[8] = BigNumber(sellRewardFeeRate.value).times(100).toNumber()
        // _sellBurnFee（卖出销毁费，扩大10000倍，如5%，则输入值500）
        numberParams[9] = BigNumber(sellBurnFeeRate.value).times(100).toNumber()
        // _tTotal
        numberParams[10] = ethers.parseUnits(totalSupply.value, parseInt(decimals.value))
        // mustHoldNum(分红持有本币的最低门槛，注意要乘以代币精度) 
        numberParams[11] = mustHoldNum.value ? ethers.parseUnits(mustHoldNum.value, parseInt(decimals.value)) : 0n
        // killBlock（杀区块数量）
        numberParams[12] = killBlock.value ? BigNumber(killBlock.value).toNumber() : 0

        // enableManualStartTrade（是否开启手动交易）
        boolParams[0] = enableManualStartTrade.value
        // enableKillBlock（是否开启自动杀区块）
        boolParams[1] = enableKillBlock.value
        // enableSwapLimit（是否开启交易限制）
        boolParams[2] = enableSwapLimit.value
        // enableWalletLimit（是否开启持币限制）
        boolParams[3] = enableWalletLimit.value
        // enableChangeTax（是否开启税收开关）
        boolParams[4] = enableChangeTax.value
        // enableWhiteList（是否开启白名单）
        boolParams[5] = enableWhiteList.value
    }
    return {
        stringParams: stringParams,
        addressParams: addressParams,
        numberParams: numberParams,
        boolParams: boolParams
    }
}

async function createTokenConfirm() {
    const baseFee = store.create.deployerList.find(x => x.deployerId == currentDeployerId.value).baseFee

    createConfirmLoading.value = true
    try {
        let contract
        if (store.create.v2) {
            contract = await api.wallet.metamask.contractTokenFactoryV2(store.create.tokenFactoryV2Address)
        } else {
            contract = await api.wallet.metamask.contractTokenFactory(store.create.tokenFactoryAddress)
        }
        // let baseFee = await contract.baseFee();
        const { stringParams, addressParams, numberParams, boolParams } = await swapCreateTokenParams()

        const baseFeeN = ethers.parseEther(baseFee.toString())
        let res

        if (store.create.v2) {
            let utm = "0x0000000000000000000000000000000000000000"
            if (configStore.utm && isAddress(configStore.utm)) {
                utm = configStore.utm
            }
            console.log("create v2")
            console.log(contract)
            console.log(currentDeployerId.value, utm, stringParams, addressParams, numberParams, boolParams)
            res = await contract.tokenCreate(currentDeployerId.value, utm, stringParams, addressParams, numberParams, boolParams, {
                value: baseFeeN
            })
        } else {
            console.log(currentDeployerId.value, stringParams, addressParams, numberParams, boolParams)
            res = await contract.tokenCreate(currentDeployerId.value, stringParams, addressParams, numberParams, boolParams, {
                value: baseFeeN
            })
        }

        console.dir(res)
        txHash.value = res.hash
        let coreLoading
        if (store.chain == "core") {
            // TODO
            coreLoading = ElLoading.service({
                lock: true,
                text: t('upChainNow'),
            })
        }
        res.wait().then(async (data) => {
            console.log("upChainSuccessfully")
            console.log(data)
            if (data.status === 1) {
                ElMessage.success(t('upChainSuccessfully'))
                if (store.chain == "core") {
                    if (coreLoading) {
                        coreLoading.text = t('verityContractNow')
                    }
                    console.log(data.logs)
                    const log = data.logs.find(x => x.fragment && x.fragment.name == 'TokenCreated')
                    console.log(log)
                    const ta = log.args[1]
                    console.log(ta)
                    try {
                        const guid = await api.coredao.verifysourcecode(currentDeployerId.value, stringParams, addressParams, numberParams, boolParams, ta)
                        await sleep(500)
                        await api.coredao.checkverifystatus(guid)
                        ElMessage.success(t('verityContractSuccess'))
                    } catch (e) {
                        ElMessage.error(t('verityContractFail'))
                    } finally {
                        if (coreLoading) {
                            coreLoading.close()
                        }
                    }
                }
            }
        })
        success()
    } catch (e) {
        console.log(JSON.stringify(e))
        if (e.info && e.info.error && e.info.error.code === 4001) {
            ElMessage.error(t('userCancelOperate'))
        } else if (e.error && e.error.message && e.error.message == 'Canceled') {
            ElMessage.error(t('userCancelOperate'))
        } else if (e.data && e.data.code == -32000) {
            const wantBalance = e.data.message.match(/(\d+) want (\d+)/)[2]
            ElMessage.error(t('balanceSlow2', { chainMianCoin: token.value.nativeCurrencySymbol, amount: ethers.formatUnits(wantBalance) }))
        } else if (e.code === "INSUFFICIENT_FUNDS") {
            ElMessage.error(t('balanceSlow'))
        } else if (e.info && e.info.error && e.info.error.code == -32603 && e.info.error.data.message.endsWith("transfer amount exceeds balance")) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: baseFee }))
        } else if (e.code == "CALL_EXCEPTION" && e.info.error.message.endsWith("transfer amount exceeds balance")) {
            ElMessage.error(t('balanceSlow2', { chainMianCoin: store.nativeCurrencySymbol, amount: baseFee }))
        } else {
            ElMessage.error(t('unkonwError'))
        }
    } finally {
        createTokenConfirmVisible.value = false
        createConfirmLoading.value = false
    }
}

function success() {
    step.value = stepList.value.length - 1
}


async function copySourceCodeClick() {
    let sourceCode = await api.tools.getSourceCode(currentDeployerId.value)
    copy(sourceCode)
}

async function copyConstructorArgumentsClick() {
    const { stringParams, addressParams, numberParams, boolParams } = await swapCreateTokenParams()
    let constructorArguments = api.tools.getConstructorArguments(stringParams, addressParams, numberParams, boolParams)
    constructorArguments = constructorArguments.slice(2)
    copy(constructorArguments)
}
</script>
<template>
    <div>
        <div>
            <Step :step-list="stepList" :current="step" @step-click="(i) => changeStep(i)" />
        </div>
        <div class="form">
            <template v-if="step == 0">
                <div class="form-item">
                    <div class="form-item-title">{{ $t('selectChain') }}</div>
                    <div class="form-item-value">
                        <el-select :model-value="selectChain?.chainId" :placeholder="$t('pleaseSelectChain')" class="block"
                            size="large">
                            <el-option v-for="item in createChainList" :key="item.chainId" :label="item.chainShow"
                                :value="item.chainId" class="select-option" @click="chainSelectChange(item)">
                                <icon-text :icon="item.chainIcon" :text="item.chainShow"></icon-text>
                            </el-option>
                            <template #prefix>
                                <img class="select-icon" :src="selectChain.chainIcon" alt="" v-if="selectChain">
                            </template>
                        </el-select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('selectTemplate') }}</div>
                    <div class="form-item-value">
                        <div class="deployer-list">
                            <el-button v-for="d in deployerList" class="btn-deployer" :key="d.deployerId"
                                :class="{ 'btn-gradient': d.deployerId == currentDeployerId }"
                                @click="() => changeCurrentDeployerId(d.deployerId)">
                                <span class="name" :class="{ 'new-name': d.isNew }">
                                    {{ $t(d.deployerName) }}
                                    <span class="new" :class="{ 'new-select': d.deployerId == currentDeployerId }"
                                        v-if="d.isNew">NEW</span>
                                </span>
                            </el-button>
                        </div>
                        <div class="deployer-note" v-if="currentDeployerId == 0">{{ $t('freeTaxExplain') }}</div>
                        <div class="deployer-note" v-if="currentDeployerId == 5">{{ $t('freeTaxV2Explain') }}</div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 1">{{
                            $t('feeTokenExplain') }}</div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 6">{{
                            $t('feeTokenV2Explain') }}</div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 2 || currentDeployerId == 7">{{
                            $t('selfDividendTokenExplain') }}
                        </div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 3">{{
                            $t('addPoolDividendExplain') }}
                        </div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 8">{{
                            $t('addPoolDividendV2Explain') }}
                        </div>
                        <div class="deployer-note" v-else-if="currentDeployerId == 4">{{ $t('dividendTokenExplain') }}
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('tokenName') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="name" :placeholder="$t('lettersLimit')" class="ipt" maxlength="20" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('tokenSymbol') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="symbol" :placeholder="$t('lettersLimit')" class="ipt" maxlength="20" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('tokenPrecision') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="decimals" type="number" class="ipt" :disabled="currentDeployerId == 4" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('tokenAmount') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="totalSupply" type="number" :placeholder="$t('pleaseEnter')" class="ipt" />
                    </div>
                </div>
                <div class="form-item form-item-row" v-if="currentDeployerId !== 2 && currentDeployerId < 4">
                    <div class="form-item-title">{{ $t('isMintToken') }}<span class="title-note">*{{ $t('cannotClose')
                    }}</span></div>
                    <div class="form-item-value">
                        <el-switch v-model="canMint" size="large" />
                    </div>
                </div>

                <div class="form-item" v-if="currentDeployerId == 0 || currentDeployerId == 5">
                    <div class="form-item-title">{{ $t('holder') }}</div>
                    <div class="form-item-value">
                        <el-input :model-value="store.walletAddress" :placeholder="$t('pleaseConnectWallet')" class="ipt"
                            disabled />
                    </div>
                </div>
                <div class="form-bottom">
                    <div class="fee" v-if="store.selectedChain && store.selectedChain.create">{{ $t('creationFee', {
                        'baseFeeAmount': baseFeeShow, 'baseFeeSymbol':
                            store.selectedChain.nativeCurrency.symbol
                    }) }}</div>
                    <template v-if="store.isConnecting">
                        <template v-if="currentDeployerId == 0 || currentDeployerId == 5">
                            <div class="form-bottom-btns"> <el-button class="btn btn-gradient" @click="createTokenClick"
                                    :loading="createTokenLoading">{{ $t('create') }}</el-button></div>
                        </template>
                        <template v-else>
                            <div class="form-bottom-btns"> <el-button class="btn btn-gradient" @click="nextStepClick">{{
                                $t('nextStep') }}</el-button></div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="form-bottom-btns"> <el-button class="btn btn-gradient"
                                @click="() => configStore.loginDialogVisible = true">{{ $t('connectWallet') }}</el-button>
                        </div>
                    </template>
                </div>
            </template>
            <template v-else-if="currentDeployerId != 0 && currentDeployerId != 5 && step == 1">
                <div class="form-item" v-if="currentDeployerId != 4">
                    <div class="form-item-title">{{ $t('poolToken') }}</div>
                    <div class="form-item-value">
                        <div class="select" @click="selectTokenDialogVisible = true">
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
                    <div class="explain">{{ $t('currencyExplain') }}</div>
                </div>
                <div class="form-item" v-else>
                    <div class="form-item-title">{{ $t('poolToken') }}</div>
                    <div class="form-item-value disabled">
                        <div class="select">
                            <icon-text v-if="store.currentChain.chain == 'bsc_testnet'"
                                :icon="getTokenIcon('bsc', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')"
                                :text="store.currentChain.nativeCurrency.symbol"></icon-text>
                            <icon-text v-else
                                :icon="getTokenIcon(store.currentChain.chain, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')"
                                :text="store.currentChain.nativeCurrency.symbol"></icon-text>
                        </div>
                    </div>
                    <div class="explain">
                        {{ $t('dividendTokenCurrencyExplain', { currencyToken: store.currentChain.nativeCurrency.symbol })
                        }}
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('choosePlatform') }}</div>
                    <div class="form-item-value">
                        <div class="select" @click="selectSwapDialogVisible = true">
                            <template v-if="chainSwap">
                                <icon-text :icon="chainSwap.swapIcon" :text="chainSwap.showName"></icon-text>
                            </template>
                            <template v-else>
                                <div class="placeholder">{{ $t('pleaseChoosePlatform') }}</div>
                            </template>
                            <el-icon>
                                <ArrowDownBold />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <div class="form-item" v-if="currentDeployerId == 3 || currentDeployerId == 4 || currentDeployerId == 8">
                    <div class="form-item-title">{{ $t('rewardToken') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="rewardToken" :placeholder="$t('enterContract')" class="ipt" :maxlength="42" />
                    </div>
                    <div class="explain" v-if="currentDeployerId == 3 || currentDeployerId == 8">{{ $t('rewardTokenInfo', {
                        chainToken:
                            store.nativeCurrencySymbol
                    }) }}</div>
                    <div class="explain" v-else-if="currentDeployerId == 4">
                        <span>{{
                            $t('rewardTokenExplain', {
                                token: store.nativeCurrencySymbol, wToken: 'W' +
                                    store.nativeCurrencySymbol
                            })
                        }}</span>
                    </div>
                </div>

                <div class="form-item" v-if="currentDeployerId == 4">
                    <div class="form-item-title">{{ $t('minDividend') }}</div>
                    <div class="form-item-value">
                        <el-input v-model="mustHoldNum" type="number" :placeholder="$t('EnterMinDividend')" class="ipt" />
                    </div>
                    <div class="explain">{{ $t('minDividendExplain') }}</div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('buyTax', { max: maxRate }) }}
                        <el-icon class="icon" @click="showTaxInstruction = true">
                            <QuestionFilled />
                        </el-icon>
                    </div>
                    <div class="form-item-value">
                        <div class="rate-item">
                            <div class="rate-item-title">{{ $t('marketingTax') }}</div>
                            <Rate v-model="buyFundFeeRate" :max="maxBuyFundFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item">
                            <div class="rate-item-title">{{ $t('liquidityTax') }}</div>
                            <Rate v-model="buyLPFeeRate" :max="maxBuyLPFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item"
                            v-if="currentDeployerId == 2 || currentDeployerId == 3 || currentDeployerId == 4 || currentDeployerId == 7 || currentDeployerId == 8">
                            <div class="rate-item-title">{{ $t('rewardTax') }}</div>
                            <Rate v-model="buyRewardFeeRate" :max="maxBuyRewardFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item"
                            v-if="currentDeployerId == 1 || currentDeployerId == 4 || currentDeployerId == 6">
                            <div class="rate-item-title">{{ $t('burnTax') }}</div>
                            <Rate v-model="buyBurnFeeRate" :max="maxBuyBurnFee" :min="0" :step="1" :precision="2" />
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('sellTax', { max: maxRate }) }}
                        <el-icon class="icon" @click="showTaxInstruction = true">
                            <QuestionFilled />
                        </el-icon>
                    </div>
                    <div class="form-item-value">
                        <div class="rate-item">
                            <div class="rate-item-title">{{ $t('marketingTax') }}</div>
                            <Rate v-model="sellFundFeeRate" :max="maxSellFundFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item">
                            <div class="rate-item-title">{{ $t('liquidityTax') }}</div>
                            <Rate v-model="sellLPFeeRate" :max="maxSellLPFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item"
                            v-if="currentDeployerId == 2 || currentDeployerId == 3 || currentDeployerId == 4 || currentDeployerId == 7 || currentDeployerId == 8">
                            <div class="rate-item-title">{{ $t('rewardTax') }}</div>
                            <Rate v-model="sellRewardFeeRate" :max="maxSellRewardFee" :min="0" :step="1" :precision="2" />
                        </div>
                        <div class="rate-item"
                            v-if="currentDeployerId == 1 || currentDeployerId == 4 || currentDeployerId == 6">
                            <div class="rate-item-title">{{ $t('burnTax') }}</div>
                            <Rate v-model="sellBurnFeeRate" :max="maxSellBurnFee" :min="0" :step="1" :precision="2" />
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">{{ $t('addressSetting') }}</div>
                    <div class="form-item-value">
                        <div class="rate-item">
                            <div class="rate-item-title">{{ $t('holder') }}</div>
                            <div class="holder">{{ store.walletAddress }}</div>
                        </div>
                        <div class="rate-item fund-address">
                            <div class="rate-item-title">{{ $t('marketingAddress') }}</div>
                            <el-input class="ipt-right" v-model="fundAddress" :placeholder="$t('pleaseEnter')" />
                        </div>
                    </div>
                </div>
                <div class="form-bottom">
                    <div class="form-bottom-btns">
                        <el-button class="btn" @click="backStepClick">{{ $t('previousStep') }}</el-button>

                        <el-button class="btn btn-gradient" @click="nextStepClick">{{ $t('nextStep') }}</el-button>
                    </div>
                </div>
            </template>
            <template v-else-if="currentDeployerId != 0 && currentDeployerId != 5 && step == 2">
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('manuallyOpenTheTrading') }}</div>
                        <div class="note">
                            {{ $t('manuallyOpenTheTradingInfo1') }}{{ $t('manuallyOpenTheTradingInfo2') }}{{
                                $t('manuallyOpenTheTradingInfo3') }}
                        </div>
                    </div>
                    <el-switch v-model="enableManualStartTrade" size="large" />
                </div>
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('autoKillBlock') }}</div>
                        <template v-if="!enableKillBlock">
                            <div class="note">{{ $t('autoKillBlockInfo') }}</div>
                        </template>
                        <template v-else>
                            <el-input class="ipt-switch" v-model="killBlock" type="number"
                                :placeholder="$t('pleaseEnterTheNumberOfBlocks')" />
                        </template>
                    </div>
                    <el-switch v-model="enableKillBlock" size="large" @change="killBlockChange" />
                </div>
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('taxSwitch') }}</div>
                        <div class="note">{{ $t('taxSwitchInfo') }}</div>
                    </div>
                    <el-switch v-model="enableChangeTax" size="large" />
                </div>
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('whiteList2') }}</div>
                        <div class="note">{{ $t('whiteList2Info') }}</div>
                    </div>
                    <el-switch v-model="enableWhiteList" size="large" />
                </div>
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('maxWalletLimit') }}</div>
                        <template v-if="!enableWalletLimit">
                            <div class="note">{{ $t('maxWalletLimitInfo') }}</div>
                        </template>
                        <template v-else>
                            <el-input class="ipt-switch" v-model="maxWalletAmount" type="number"
                                :placeholder="$t('pleaseEnterMaxWalletNumber')" />
                        </template>
                    </div>
                    <el-switch v-model="enableWalletLimit" size="large" />
                </div>
                <div class="form-item item-switch">
                    <div>
                        <div class="title">{{ $t('maxSwapLimit') }}</div>
                        <template v-if="!enableSwapLimit">
                            <div class="note">{{ $t('maxSwapLimitInfo') }}</div>
                        </template>
                        <template v-else>
                            <el-input class="ipt-switch" v-model="maxSwapAmount" type="number"
                                :placeholder="$t('pleaseEnterMaxSwapNumber')" />
                        </template>
                    </div>
                    <el-switch v-model="enableSwapLimit" size="large" />
                </div>
                <div class="form-bottom">
                    <div class="form-bottom-btns">
                        <el-button class="btn" @click="backStepClick">{{ $t('previousStep') }}</el-button>
                        <el-button class="btn btn-gradient" @click="createTokenClick" :loading="createTokenLoading">{{
                            $t('create') }}</el-button>
                    </div>
                </div>
            </template>
            <template
                v-else-if="((currentDeployerId == 0 || currentDeployerId == 5) && step == 1) || (currentDeployerId != 0 && currentDeployerId != 5 && step == 3)">
                <div class="create-success">
                    <svg-icon name="createSuccess"></svg-icon>
                    <div class="text">{{ $t('createSuccess') }}</div>
                    <el-button @click="router.push('/token/list')">{{ $t('viewToken') }}</el-button>
                </div>
            </template>

        </div>
    </div>

    <el-dialog v-model="selectTokenDialogVisible" :title="$t('selectCurrency')" class="dlg dlg-select-token"
        destroy-on-close>
        <SelectToken @select="(t) => selectTokenClick(t)"></SelectToken>
    </el-dialog>

    <el-dialog v-model="selectSwapDialogVisible" :title="$t('selectSwap')" class="dlg dlg-select-token" destroy-on-close>
        <SelectSwap @select="(t) => selectSwapClick(t)"></SelectSwap>
    </el-dialog>

    <el-dialog v-model="createTokenConfirmVisible" :title="$t('confirmation')" class="dlg dlg-lock-confirm">
        <ul class="dlg-item">
            <li>
                <div class="key">{{ $t('contractChian') }}</div>
                <div class="value">
                    <icon-text v-if="selectChain" :icon="selectChain.chainIcon" :text="selectChain.chainShow"></icon-text>
                </div>
            </li>
            <li>
                <div class="key">{{ $t('createTemplate') }}</div>
                <div class="value">{{ $t(deployerList.find(x => x.deployerId == currentDeployerId).deployerName) }}</div>
            </li>
            <li>
                <div class="key">{{ $t('tokenNameSymbol') }}</div>
                <div class="value">{{ `${name}(${symbol})` }}</div>
            </li>
            <li>
                <div class="key">{{ $t('tokenPrecision') }}</div>
                <div class="value">{{ decimals }}</div>
            </li>
            <li>
                <div class="key">{{ $t('tokenAmount') }}</div>
                <div class="value">{{ totalSupply }}</div>
            </li>
            <template v-if="currentDeployerId != 0 && currentDeployerId != 5">
                <li v-if="token">
                    <div class="key">{{ $t('poolToken') }}</div>
                    <div class="value">
                        <icon-text :icon="token.icon" :text="token.symbol"></icon-text>
                    </div>
                </li>
                <li v-if="chainSwap">
                    <div class="key">{{ $t('swap') }}</div>
                    <div class="value">
                        <icon-text :icon="chainSwap.swapIcon" :text="chainSwap.showName"></icon-text>
                    </div>
                </li>
                <li v-if="currentDeployerId == 3 || currentDeployerId == 8">
                    <div class="key">{{ $t('rewardToken') }}</div>
                    <div class="value">{{ formatAddress(rewardToken, 6) }}</div>
                </li>
                <li>
                    <div class="key">{{ $t('buyTax1') }}</div>
                    <template v-if="currentDeployerId == 1 || currentDeployerId == 6">
                        <div class="value">{{
                            $t('buyTax1Detail', {
                                buyFundFeeRate: buyFundFeeRate, buyLPFeeRate: buyLPFeeRate,
                                buyBurnFeeRate: buyBurnFeeRate
                            })
                        }}</div>
                    </template>
                    <template
                        v-else-if="currentDeployerId == 2 || currentDeployerId == 3 || currentDeployerId == 7 || currentDeployerId == 8">
                        <div class="value">{{
                            $t('buyTax1Detail1', {
                                buyFundFeeRate: buyFundFeeRate, buyLPFeeRate: buyLPFeeRate,
                                buyRewardFeeRate: buyRewardFeeRate
                            })
                        }}
                        </div>
                    </template>
                    <template v-else-if="currentDeployerId == 4">
                        <div class="value">{{
                            $t('buyTax1Detail2', {
                                buyFundFeeRate: buyFundFeeRate, buyLPFeeRate: buyLPFeeRate,
                                buyRewardFeeRate: buyRewardFeeRate, buyBurnFeeRate: buyBurnFeeRate
                            })
                        }}
                        </div>
                    </template>
                </li>
                <li>
                    <div class="key">{{ $t('sellTax1') }}</div>
                    <template v-if="currentDeployerId == 1 || currentDeployerId == 6">
                        <div class="value">{{
                            $t('buyTax1Detail', {
                                buyFundFeeRate: sellFundFeeRate, buyLPFeeRate: sellLPFeeRate,
                                buyBurnFeeRate: sellBurnFeeRate
                            })
                        }}
                        </div>
                    </template>
                    <template
                        v-else-if="currentDeployerId == 2 || currentDeployerId == 3 || currentDeployerId == 7 || currentDeployerId == 8">
                        <div class="value">{{
                            $t('buyTax1Detail1', {
                                buyFundFeeRate: sellFundFeeRate, buyLPFeeRate: sellLPFeeRate,
                                buyRewardFeeRate: sellRewardFeeRate
                            })
                        }}
                        </div>
                    </template>
                    <template v-else-if="currentDeployerId == 4">
                        <div class="value">{{
                            $t('buyTax1Detail2', {
                                buyFundFeeRate: sellFundFeeRate, buyLPFeeRate: sellLPFeeRate,
                                buyRewardFeeRate: sellRewardFeeRate, buyBurnFeeRate: sellBurnFeeRate
                            })
                        }}
                        </div>
                    </template>
                </li>
                <li>
                    <div class="key">{{ $t('marketingAddress') }}</div>
                    <div class="value">{{ formatAddress(fundAddress, 6) }}</div>
                </li>
                <li v-if="enableKillBlock">
                    <div class="key">{{ $t('autoKillBlock1') }}</div>
                    <div class="value">{{ killBlock }}</div>
                </li>
                <li v-if="enableWalletLimit">
                    <div class="key">{{ $t('maxWalletLimit') }}</div>
                    <div class="value">{{ maxWalletAmount }}</div>
                </li>
                <li v-if="enableSwapLimit">
                    <div class="key">{{ $t('maxSwapLimit') }}</div>
                    <div class="value">{{ maxSwapAmount }}</div>
                </li>
            </template>
            <li>
                <div class="key">{{ $t('ownerAddr') }}</div>
                <div class="value">{{ formatAddress(store.walletAddress, 6) }}</div>
            </li>
        </ul>
        <div>
            <el-collapse v-model="openSourceConfigVisible">
                <el-collapse-item :title="$t('openSourceConfig')" name="1">
                    <div class="open-source-item">
                        <div class="open-source-item-item">Optimization: Yes</div>
                        <div>Runs: 200</div>
                    </div>
                    <div class="open-source-item">
                        Solidity Version: v0.8.4+commit.c7e474f2
                    </div>
                    <div class="open-source-item">
                        License: MIT
                    </div>
                    <div class=" flex-sb open-source-item">
                        <el-button @click="copySourceCodeClick">{{ $t('copySourceCode') }}</el-button>
                        <el-button @click="copyConstructorArgumentsClick">{{ $t('copyConstructorArguments') }}</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="tags">
            <el-tag class="tag" v-if="currentDeployerId !== 2 && canMint && currentDeployerId < 4">{{
                $t('canMint') }}</el-tag>
            <template v-if="currentDeployerId != 0 && currentDeployerId != 5">
                <el-tag class="tag" v-if="enableManualStartTrade">{{ $t('manuallyOpenTheTrading') }}</el-tag>
                <el-tag class="tag" v-if="enableWhiteList">{{ $t('whiteList2') }}</el-tag>
                <el-tag class="tag" v-if="enableChangeTax">{{ $t('taxSwitch') }}</el-tag>
                <el-tag class="tag" v-if="enableKillBlock">{{ $t('autoKillBlockTag') }}</el-tag>
            </template>
        </div>
        <div class="fee" v-if="store.selectedChain && store.selectedChain.create">{{ $t('creationFee', {
            'baseFeeAmount': baseFeeShow, 'baseFeeSymbol':
                store.selectedChain.nativeCurrency.symbol
        }) }}</div>
        <div class="dlg-bottom">
            <el-button class="btn-gradient btn-block" @click="createTokenConfirm" :loading="createConfirmLoading">{{
                $t('confirmAndCreate') }}</el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="showTaxInstruction" width="500" :title="$t('taxInstruction')" class="tax-instruction"
        destroy-on-close>
        <div class="content">
            <div :class="store.language">{{ $t('taxInstructionText1') }}</div>
            <div :class="store.language">{{ $t('taxInstructionText2') }}</div>
            <div :class="store.language">{{ $t('taxInstructionText3') }}</div>
            <div :class="store.language" v-if="currentDeployerId == 1 || currentDeployerId == 6">{{
                $t('taxInstructionText4') }}</div>
            <div :class="store.language"
                v-if="currentDeployerId == 2 || currentDeployerId == 3 || currentDeployerId == 7 || currentDeployerId == 8">
                {{
                    $t('taxInstructionText5')
                }}</div>
            <div :class="store.language">{{ $t('taxInstructionText6') }}</div>
        </div>
    </el-dialog>
</template>

<style lang="scss">
.form-item-value {
    .fund-address {
        padding-right: 0 !important;
    }
}

.ipt-right {
    width: 60%;

    .el-input__wrapper {
        box-shadow: none;

        .el-input__inner {
            text-align: right;
        }
    }
}
</style>
<style scoped lang='scss'>
.select-option {
    display: flex;
    align-items: center;
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

        .ipt-switch {
            width: 360px;
            height: 28px;
            font-size: 14px;
        }
    }

    .form-item {
        margin-top: 20px;

        .form-item-title {
            font-size: 14px;
            color: #333333;
            font-weight: 700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            .title-note {
                margin-left: 10px;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 400;
            }

            >.icon {
                cursor: pointer;
                font-size: 14px;
                margin-left: 5px;
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
                    padding: 0;
                    margin: 0;

                    .name {
                        position: relative;
                    }

                    .new-name {
                        margin-right: 25px;
                    }

                    .new {
                        position: absolute;
                        right: -48px;
                        margin-top: -10px;
                        padding: 4px 8px;
                        background-color: transparent;
                        color: #fff;
                        background: #ff5151;
                        // border-radius: 6px;
                        border-radius: 10px 10px 10px 0;
                        font-size: 18px;
                        transform: scale(0.5);
                        font-weight: 700;
                    }

                    .new-select {
                        background-color: #fff;
                        color: #01a7ff;
                    }
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

                .holder {
                    font-size: 14px;
                    color: #666;
                }
            }
        }

        .form-item-value.disabled {
            .select {
                background: #f5f7fa;
            }
        }

        .explain {
            margin-top: 5px;
            color: #999;
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
            }

            .btn-gradient {}
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

.tax-instruction {
    .content {
        line-height: 22px;
        font-size: 14px;

        .en {
            margin-top: 10px;
        }
    }
}
</style>
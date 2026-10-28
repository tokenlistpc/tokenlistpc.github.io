<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import Step2 from "@/components/Step2.vue"
import cfg from "@/config"
import { getChainIcon, getTokenIcon, isExpired, getLocalImgUrl, isAddress } from "@/utils"
import { ElMessage, ElLoading } from 'element-plus'
import { useStore } from '@/store'
import api from "@/api"
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import HelpTip from './components/HelpTip.vue'
import SelectSwap from "@/components/SelectSwap.vue"
import TokenIcon from "@/components/TokenIcon.vue"
import UploadImg from "@/components/UploadImg.vue"
import BigNumber from 'bignumber.js'
dayjs.extend(utc)


const { t } = useI18n()
const router = useRouter()
// 选择公链
const launchPadChainList = computed(() => {
    console.log(cfg.chainList.filter(x => !!x.launchPad && x.isTestChain == store.isTestChain))
    return cfg.chainList.filter(x => !!x.launchPad && x.isTestChain == store.isTestChain)
})
const store = useStore()

const stepList2 = ref([
    {
        "text": "验证代币",
        "desc": "输入代币地址并验证"
    },
    {
        "text": "预售信息",
        "desc": "输入预售相关数据"
    },
    {
        "text": "项目信息",
        "desc": "提交你的项目相关信息"
    },
    {
        "text": "完成",
        "desc": "检查预售信息并完成提交"
    },
])
const step = ref(0)
const token = ref(0)

async function nextStepClick() {
    if (step.value == 0) {
        if (!tokenAddress.value) {
            ElMessage.error("请输入代币地址")
            return
        }
        if (!tokenInfo.value) {
            ElMessage.error("无法查询代币信息, 请确认代币地址输入是否正确")
            return
        }
    } else if (step.value == 1) {
        if (!salePrice.value) {
            ElMessage.error("请输入预售价格")
            return
        }
        if (!softCap.value) {
            ElMessage.error("请输入软顶")
            return
        }
        if (!hardCap.value) {
            ElMessage.error("请输入硬顶")
            return
        }
        if (BigNumber(softCap.value).lt(Number(hardCap.value) * 0.5)) {
            ElMessage.error("软顶必须大于等于0.5倍的硬顶")
            return
        }
        if (!minInvest.value) {
            ElMessage.error("请输入最低投入金额")
            return
        }
        if (!maxInvest.value) {
            ElMessage.error("请输入最高投入金额")
            return
        }
        if (BigNumber(Number(minInvest.value)).gt(Number(maxInvest.value))) {
            ElMessage.error("最小投入必须小于等于最大投入")
            return
        }
        if (!chainSwap.value) {
            ElMessage.error("请选择交易所")
            return
        }
        if (isAutoList.value && !liquidityRate.value) {
            ElMessage.error("请输入流动性比例")
            return
        }
        if (isAutoList.value && !listPrice.value) {
            ElMessage.error("请输入上市价格")
            return
        }
        if (isAutoList.value && BigNumber(Number(listPrice.value)).gt(Number(salePrice.value))) {
            ElMessage.error("上市价格必须小于等于预售价格")
            return
        }
        if (isAutoList.value && !lpLockTime.value) {
            ElMessage.error("请输入流动性锁定时间")
            return
        }
        if (!startTime.value) {
            ElMessage.error("请选择预售开始时间")
            return
        }
        if (!endTime.value) {
            ElMessage.error("请选择预售结束时间")
            return
        }
    } else if (step.value == 2) {
        if (logo.value.length == 0) {
            ElMessage.error("请上传项目logo")
            return
        }
        if (!description.value) {
            ElMessage.error("请填写项目介绍")
            return
        }
    }
    step.value = step.value + 1
}

function backStepClick() {
    step.value = step.value - 1
}

const tokenNeedApprove = ref(false)
const baseTokenNeedApprove = ref(false)

const tokenAddress = ref("")
const select = ref('')
const showTokenAddressError = ref(false)
const tokenInfo = ref(null) //代币信息
const tokenInfoLoading = ref(false)
const currencyAddress = ref("") //底池地址
const currencyIsEth = ref(false)
const currencyEthAddress = ref("")
const isAutoList = ref(true) //是否自动上币
const createLaunchPadFee = ref(null)//创建预售费信息  包含创建费和服务费
const salePrice = ref('')//预售价格
const isWhiteListEnabled = ref(true)
const whitelistDuration = ref(0)
const softCap = ref('')
const hardCap = ref('')
const minInvest = ref('')
const maxInvest = ref('')
const returnLeftType = ref(true)//退款方式 true返还 false销毁
const chainSwap = ref(null)//交易所
const liquidityRate = ref('')//流动性比例
const listPrice = ref('')//上市价格
const startTime = ref('')//UTC
const endTime = ref('')//UTC
const lpLockTime = ref('')
const logo = ref([])
const website = ref('')
const twitter = ref('')
const telegram = ref('')
const discord = ref('')
const github = ref('')
const facebook = ref('')
const reddit = ref('')
const instagram = ref('')
const youtube = ref('')
const description = ref('')
const estimeateTokenAmount = ref('')
const presaleAddress = ref('')
const currencyList = computed(() => {
    const chain = cfg.chainList.find(x => x.chain == store.chain)
    if (chain && chain.launchPad) {
        currencyAddress.value = chain.launchPad.currencyList[0].address
        return chain.launchPad.currencyList
    } else {
        return []
    }
})
const currency = computed(() => {
    return currencyList.value.find(x => x.address == currencyAddress.value)
})
const returnLeftTypeOptions = [
    {
        value: true,
        label: '返还',
    },
    {
        value: false,
        label: '销毁',
    }
]
const selectSwapDialogVisible = ref(false)
const approveTokenLoading = ref(false)
const approveBaseTokenLoading = ref(false)
const confirmLoading = ref(false)

watch(
    () => [currencyAddress.value, chainSwap.value],
    async () => {
        if (currencyAddress.value && chainSwap.value) {
            await checkCurrencyIsEth()
        }
    },
)

async function checkCurrencyIsEth() {
    if (currencyAddress.value == '0x0000000000000000000000000000000000000000') {
        console.log(chainSwap.value.factoryAddress)
        const swapContract = await api.wallet.metamask.contractSwap(chainSwap.value.routerAddress)
        const weth = await swapContract.WETH()
        currencyIsEth.value = true
        currencyEthAddress.value = weth.toLowerCase()
    } else {
        currencyIsEth.value = false
        currencyEthAddress.value = ""
    }
    console.log(currencyAddress.value)
    console.log(currencyIsEth.value)
    console.log(currencyEthAddress.value)
}

watch(
    () => [tokenAddress.value, tokenInfo.value, chainSwap.value, isAutoList.value, salePrice.value, hardCap.value, liquidityRate.value, listPrice.value],
    async () => {
        console.log('change')
        if (step.value == '1' && tokenAddress.value && chainSwap.value && tokenInfo.value && salePrice.value && hardCap.value && liquidityRate.value && listPrice.value) {
            if (Number.isNaN(Number(salePrice.value)) || Number(salePrice.value) <= 0) {
                return
            }
            if (Number.isNaN(Number(hardCap.value)) || Number(hardCap.value) <= 0) {
                return
            }
            if (Number.isNaN(Number(listPrice.value)) || Number(listPrice.value) <= 0 || Number(listPrice.value) > Number(salePrice.value)) {
                return
            }
            if (Number.isNaN(Number(liquidityRate.value)) || Number(liquidityRate.value) < 51 || Number(liquidityRate.value) > 100) {
                return
            }
            await getEstimeateTokenAmount()
            await checkTokenIsNeedApprove()
            await checkBaseTokenIsNeedApprove()
        } else {
            estimeateTokenAmount.value = ''
        }
    },
)

async function getEstimeateTokenAmount() {
    let baseTokenDecimals = currency.value.decimals
    let tokenDecimals = tokenInfo.value.decimals
    try {
        const contractPresaleFactory = await api.wallet.metamask.contractPresaleFactory(store.selectedChain.launchPad.presaleFacoty)
        let tokenAmount = await contractPresaleFactory.estimeateTokenAmount(isAutoList.value, salePrice.value * 1000000, ethers.parseUnits(hardCap.value, parseInt(tokenDecimals)), BigNumber(liquidityRate.value).times(100).toNumber(), listPrice.value * 1000000, tokenDecimals, baseTokenDecimals)
        estimeateTokenAmount.value = ethers.formatUnits(tokenAmount, tokenDecimals)
    } catch (e) {
        throw e
    }
}

// 查看token是否需要授权
async function checkTokenIsNeedApprove() {
    let tokenDecimals = tokenInfo.value.decimals
    try {
        let tokenContract = await api.wallet.metamask.contractERC20(tokenAddress.value)
        const allowance = await tokenContract.allowance(store.walletAddress, store.selectedChain.launchPad.presaleFacoty)
        if (ethers.formatUnits(allowance, tokenDecimals) < estimeateTokenAmount.value) {
            tokenNeedApprove.value = true
        }
    } catch (e) {
        throw e
    }
}

// 查看basetoken是否需要授权
async function checkBaseTokenIsNeedApprove() {
    let baseTokenDecimals = currency.value.decimals
    let currencyTokenAddress
    if (currencyIsEth.value) {
        currencyTokenAddress = currencyEthAddress.value
    } else {
        currencyTokenAddress = currencyAddress.value
    }
    try {
        var tokenContract = await api.wallet.metamask.contractERC20(currencyTokenAddress);
        const allowance = await tokenContract.allowance(store.walletAddress, store.selectedChain.launchPad.presaleFacoty)
        if (createLaunchPadFee.value.baseFee > 0 && ethers.formatUnits(allowance, baseTokenDecimals) < createLaunchPadFee.value.baseFee) {
            baseTokenNeedApprove.value = true
        }
    } catch (e) {
        throw e
    }
}

watch(
    () => [step.value],
    async () => {
        if (step.value == 3) {
            await getPresaleAddress()
        }
    },
)

// 获取预售参数
function getPresaleParams() {
    let addressParam = []
    let intParam = []
    let boolParam = []
    addressParam[0] = tokenAddress.value
    addressParam[1] = chainSwap.value.routerAddress
    if (currencyIsEth.value) {
        addressParam[2] = currencyEthAddress.value.toLowerCase()
    } else {
        addressParam[2] = currencyAddress.value.toLowerCase()
    }
    intParam[0] = (salePrice.value).times(1000000).toNumber()
    intParam[1] = ethers.parseUnits(minInvest.value, parseInt(currency.value.decimals))
    intParam[2] = ethers.parseUnits(maxInvest.value, parseInt(currency.value.decimals))
    intParam[3] = ethers.parseUnits(softCap.value, parseInt(currency.value.decimals))
    intParam[4] = ethers.parseUnits(hardCap.value, parseInt(currency.value.decimals))
    intParam[5] = BigNumber(liquidityRate.value).times(100).toNumber()
    intParam[6] = BigNumber(listPrice.value).times(1000000).toNumber()
    intParam[7] = parseInt(UTCTimeToStamp(startTime.value) / 1000)
    intParam[8] = parseInt(UTCTimeToStamp(endTime.value) / 1000)
    intParam[9] = BigNumber(lpLockTime.value).times(86400).toNumber()
    if (whitelistDuration.value && whitelistDuration.value > 0) {
        intParam[10] = BigNumber(whitelistDuration.value).times(60).toNumber()
    } else {
        intParam[10] = whitelistDuration.value
    }
    boolParam[0] = currencyIsEth.value
    boolParam[1] = isAutoList.value
    boolParam[2] = isWhiteListEnabled.value
    boolParam[3] = returnLeftType.value
    return {
        addressParam,
        intParam,
        boolParam
    }
}

// 获取预售的地址
async function getPresaleAddress() {
    try {
        const contractPresaleFactory = await api.wallet.metamask.contractPresaleFactory(store.selectedChain.launchPad.presaleFacoty)
        let { addressParam, intParam, boolParam } = getPresaleParams()
        console.log(addressParam)
        console.log(intParam)
        console.log(boolParam)
        presaleAddress.value = await contractPresaleFactory.presaleCreate.staticCall(addressParam, intParam, boolParam, {
            value: createLaunchPadFee.value.baseFeeBig
        })
    } catch (e) {
        console.log(e)
    }
}

async function tokenAddressBlur() {
    showTokenAddressError.value = false
    tokenInfo.value = null
    if (!tokenAddress.value) {
        return
    }
    if (isAddress(tokenAddress.value)) {
        tokenInfoLoading.value = true
        try {
            const erc20 = await api.wallet.metamask.contractERC20(tokenAddress.value)
            const name = await erc20.name()
            const symbol = await erc20.symbol()
            const decimals = await erc20.decimals()
            const totalSupply = await erc20.totalSupply()
            const balance = await erc20.balanceOf(store.walletAddress)
            tokenInfo.value = {
                name,
                symbol,
                decimals,
                totalSupply,
                balance
            }
            showTokenAddressError.value = false
        } catch (e) {
            tokenInfo.value = null
            showTokenAddressError.value = true
        }
        tokenInfoLoading.value = false
    } else {
        tokenInfo.value = null
        showTokenAddressError.value = true
    }
}

watch(
    () => [currencyAddress.value, isAutoList.value],
    () => {
        console.log(currencyAddress.value)
        console.log(isAutoList.value)
        if (currencyAddress.value) {
            getCreateLaunchPadFee()
        } else {
            createLaunchPadFee.value = null
        }
    },
)

async function getCreateLaunchPadFee() {
    const contractPresaleFactory = await api.wallet.metamask.contractPresaleFactory(store.selectedChain.launchPad.presaleFacoty)
    const baseFeeBig = await contractPresaleFactory.baseFee()
    console.log(baseFeeBig)
    const baseFee = ethers.parseUnits(baseFeeBig.toString(), currency.value.decimals)
    console.log(baseFee)
    if (isAutoList.value) {
        // 自动添加流动性的募集费（服务费）
        const chargeRate = Number(await contractPresaleFactory.chargeRate()) / 10000
        createLaunchPadFee.value = {
            baseFeeBig: baseFeeBig,
            baseFee: baseFee,
            chargeRate: chargeRate
        }
    } else {
        createLaunchPadFee.value = {
            baseFeeBig: baseFeeBig,
            baseFee: baseFee
        }
    }
}

function formatterPrice(value) {
    console.log(value)
    if (value < 0) {
        return '';
    } else {
        return value
    }
}

function selectSwapClick(s) {
    chainSwap.value = s
    selectSwapDialogVisible.value = false
}

function formatterLiquidityRate() {
    if (liquidityRate.value > 100) {
        liquidityRate.value = 100
    } else if (liquidityRate.value < 51) {
        liquidityRate.value = 51
    }
}

const defaultTime = ref(new Date(dayjs().utc().format('YYYY-MM-DD HH:mm:ss')))//UTC默认时间
function disabledDate(time) {
    return time.getTime() <= (Date.now() - 24 * 3600 * 1000)
}

function UTCTimeToStamp(time) {
    let UTCTime = dayjs(time).format('YYYY-MM-DDTHH:mm:ss') + 'Z'
    return (new Date(dayjs(UTCTime).format('YYYY-MM-DD HH:mm:ss'))).getTime()
}

function checkStartTime() {
    if (!startTime.value) {
        return
    }
    if (UTCTimeToStamp(startTime.value) <= Date.now() + 10 * 60 * 1000) {
        ElMessage.error('开始时间不能早于当前时间之后的十分钟')
        startTime.value = ''
        return
    }
    if (endTime.value && UTCTimeToStamp(endTime.value) < UTCTimeToStamp(startTime.value) + 60 * 60 * 1000) {
        ElMessage.error('结束时间不能早于开始时间之后的1小时')
        endTime.value = ''
    }
}

function checkEndTime() {
    if (!endTime.value) {
        return
    }
    if (startTime.value && UTCTimeToStamp(endTime.value) < UTCTimeToStamp(startTime.value) + 60 * 60 * 1000) {
        ElMessage.error('结束时间不能早于开始时间之后的1小时')
        endTime.value = ''
    }
}

function formatterLockTime(value) {
    if (!value) {
        return value
    }
    if (value < 1) {
        return 1
    } else {
        return value
    }
}

function checkUrl(type) {
    switch (type) {
        case 'website':
            if (website.value && !website.value.startsWith('https://')) {
                website.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'twitter':
            if (twitter.value && !twitter.value.startsWith('https://')) {
                twitter.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'telegram':
            if (telegram.value && !telegram.value.startsWith('https://')) {
                telegram.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'discord':
            if (discord.value && !discord.value.startsWith('https://')) {
                discord.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'github':
            if (github.value && !github.value.startsWith('https://')) {
                github.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'facebook':
            if (facebook.value && !facebook.value.startsWith('https://')) {
                facebook.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'reddit':
            if (reddit.value && !reddit.value.startsWith('https://')) {
                reddit.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'instagram':
            if (instagram.value && !instagram.value.startsWith('https://')) {
                instagram.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
        case 'youtube':
            if (youtube.value && !youtube.value.startsWith('https://www.youtube.com/watch?v')) {
                youtube.value = ''
                ElMessage.error('请输入正确的地址')
            }
            break;
    }
}

async function approveToken() {
    approveTokenLoading.value = true
    try {
        let res = await api.wallet.metamask.approveMaxAmount(
            tokenAddress.value,
            store.selectedChain.launchPad.presaleFacoty
        )
        await res.wait()
        tokenNeedApprove.value = false
    } catch (e) {
        console.log(e)
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
    } finally {
        approveTokenLoading.value = false
    }
}

async function approveBaseToken() {
    approveBaseTokenLoading.value = true
    try {
        let baseTokenAddress
        if (currencyIsEth) {
            baseTokenAddress = currencyEthAddress.value
        } else {
            baseTokenAddress = currencyAddress.value
        }
        let res = await api.wallet.metamask.approveMaxAmount(
            baseTokenAddress,
            store.selectedChain.launchPad.presaleFacoty
        )
        await res.wait()
        baseTokenNeedApprove.value = false
    } catch (e) {
        console.log(e)
        let msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
    } finally {
        approveBaseTokenLoading.value = false
    }
}

async function clickConfirm() {
    confirmLoading.value = true
    const tokenContract = await api.wallet.metamask.contractERC20(tokenAddress.value)
    const balanceTokenBig = await tokenContract.balanceOf(store.walletAddress)
    console.log(balanceTokenBig)
    if (Number(ethers.parseUnits(balanceTokenBig.toString(), tokenInfo.value.decimals)) < Number(estimeateTokenAmount.value)) {
        ElMessage.error(tokenInfo.value.symbol + '余额不足')
        confirmLoading.value = false
        return
    }
    let baseTokenAddress
    if (currencyIsEth.value) {
        baseTokenAddress = currencyEthAddress.value
    } else {
        baseTokenAddress = currencyAddress.value
    }
    if (createLaunchPadFee.value.baseFee != 0) {
        const baseTokenContract = await api.wallet.metamask.contractERC20(baseTokenAddress)
        const balanceBaseTokenBig = await baseTokenContract.balanceOf(store.walletAddress)
        if (Number(ethers.parseUnits(balanceBaseTokenBig.toString(), currency.value.decimals)) < Number(createLaunchPadFee.value.baseFee)) {
            ElMessage.error(currency.value.symbol + '余额不足')
            confirmLoading.value = false
            return
        }
    }
    let loading
    try {
        const contractPresaleFactory = await api.wallet.metamask.contractPresaleFactory(store.selectedChain.launchPad.presaleFacoty)
        let { addressParam, intParam, boolParam } = getPresaleParams()
        let res = await contractPresaleFactory.presaleCreate(addressParam, intParam, boolParam, {
            value: createLaunchPadFee.value.baseFeeBig
        })
        let createPresaleTxHash = res.hash
        loading = ElLoading.service({
            lock: true,
            text: "正在上链中",
        })
        await res.wait()
        loading.text = "上链成功，正在上传数据"
        try {
            const presaleInfo = new FormData()
            presaleInfo.append('contractAddress', presaleAddress.value)
            presaleInfo.append('contractChain', store.selectedChain.chain)
            presaleInfo.append('createPresaleTxHash', createPresaleTxHash)
            presaleInfo.append('profile_picture', logo.value[0].raw)
            presaleInfo.append('description', description.value)
            if (website.value) {
                presaleInfo.append('website', website.value)
            }
            if (twitter.value) {
                presaleInfo.append('twitter', twitter.value)
            }
            if (telegram.value) {
                presaleInfo.append('telegram', telegram.value)
            }
            if (discord.value) {
                presaleInfo.append('discord', discord.value)
            }
            if (github.value) {
                presaleInfo.append('github', github.value)
            }
            if (facebook.value) {
                presaleInfo.append('facebook', facebook.value)
            }
            if (reddit.value) {
                presaleInfo.append('reddit', reddit.value)
            }
            if (instagram.value) {
                presaleInfo.append('instagram', instagram.value)
            }
            if (youtube.value) {
                presaleInfo.append('youtube', youtube.value)
            }
            console.log(presaleInfo)
            let resUpload = await api.launchpad.uploadPresaleInfo(presaleInfo)
            console.log(resUpload)
            if (resUpload.status != 200) {
                ElMessage.error(t('networkError'))
                throw 'networkError'
            }
            if (resUpload.data.status == 0) {
                // TODO 跳转创建预售首页
                ElMessage.success("创建预售完成")
            } else {
                ElMessage.error("数据上传失败")
            }
        } catch (e) {
            console.log(e)
        } finally {
            loading.close()
        }
    } catch (e) {
        console.log(e)
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
        confirmLoading.value = false
    }
}

</script>
<template>
    <div>
        <h3 class="title">创建预售</h3>
        <div>
            <Step2 :step-list="stepList2" :current="step" @step-click="(i) => changeStep(i)" />
        </div>
        <div class="form">
            <template v-if="step == 0">
                <div class="form-item">
                    <div class="label">代币地址</div>
                    <div class="body fl-sb">
                        <el-input v-model="tokenAddress" @blur="tokenAddressBlur" class="input-with-select" clearable>
                            <template #prepend>
                                <el-select class="select-chain" :model-value="store.chainId ? store.chainId : ' '">
                                    <template #prefix>
                                        <TokenIcon class="token-icon" v-if="store.isConnecting && store.chain && launchPadChainList.some(x => x.chainId == store.chainId)" :bigIcon="store.chainIcon"></TokenIcon>
                                        <span v-else class="error">ERROR</span>
                                    </template>
                                    <el-option v-for="item in launchPadChainList" :key="item.chainId" :label="item.chainShow" :value="item.chainId">
                                        <div class="option">
                                            <TokenIcon class="token-icon" :bigIcon="item.chainIcon">
                                            </TokenIcon>
                                            <span>{{ item.chainShow }}</span>
                                        </div>
                                    </el-option>
                                </el-select>
                            </template>
                        </el-input>
                        <el-button class="btn btn-gradient create-token" @click="router.push('/token/create')">创建代币</el-button>
                    </div>
                    <div class="verify-token-info" v-loading="tokenInfoLoading" v-if="tokenInfo||tokenInfoLoading">
                        <div v-if="tokenInfo">
                            <div class="token-info-item">
                                <div class="key">名称</div>
                                <div class="value">{{ tokenInfo.name }}</div>
                            </div>
                            <div class="token-info-item">
                                <div class="key">简称</div>
                                <div class="value">{{ tokenInfo.symbol }}</div>
                            </div>
                            <div class="token-info-item">
                                <div class="key">精度</div>
                                <div class="value">{{ tokenInfo.decimals }}</div>
                            </div>
                            <div class="token-info-item">
                                <div class="key">总供应量</div>
                                <div class="value">{{ ethers.formatUnits(tokenInfo.totalSupply, tokenInfo.decimals) }}</div>
                            </div>
                            <div class="token-info-item">
                                <div class="key">总持有量</div>
                                <div class="value">{{ ethers.formatUnits(tokenInfo.balance, tokenInfo.decimals) }}</div>
                            </div>
                        </div>
                    </div>
                    <el-alert class="token-address-error" v-if="showTokenAddressError" title="无法查询代币信息, 请确认代币地址输入是否正确" type="error" show-icon :closable="false" />
                </div>
                <div class="form-item" v-if="currency">
                    <div class="label">选择底池</div>
                    <div class="body">
                        <el-radio-group v-model="currencyAddress">
                            <el-radio v-for="c in currencyList" :label="c.address" size="large">{{ c.symbol }}</el-radio>
                        </el-radio-group>
                        <div class="tips">用户将会支付{{ currency.symbol }}来获得你的代币</div>
                    </div>
                </div>
                <div class="form-item">
                    <div class="label">交易所上币选项</div>
                    <div class="body">
                        <el-radio-group v-model="isAutoList">
                            <el-radio :label="true" size="large">自动上币</el-radio>
                            <el-radio :label="false" size="large">手动上币</el-radio>
                        </el-radio-group>
                        <div class="tips" v-if="isAutoList">在预售结束之后将自动将流动性添加到交易所中, 并会锁定LP</div>
                        <div class="tips" v-else>TokenList 不会收取流动性代币费用。预售结束后, 您可以提取BNB, 然后自行上币交易所。</div>
                    </div>
                </div>
                <div class="danger fl-line">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <div class="text">如果代币有交易费用，请确保该代币具有“排除地址交易费用”功能。</div>
                </div>
                <div class="form-bottom-btns">
                    <el-button class="btn btn-gradient" @click="nextStepClick">{{ $t('nextStep') }}</el-button>
                </div>
                <div class="create-fee" v-if="createLaunchPadFee">
                    费用: {{createLaunchPadFee.baseFee}}BNB 创建费 <span v-if="createLaunchPadFee.chargeRate">+ {{createLaunchPadFee.chargeRate*100}}%BNB 募集费</span>
                </div>
            </template>
            <template v-else-if="step == 1">
                <div class="form-item">
                    <div class="label fl-line">
                        <div>预售价格</div>
                        <HelpTip class="help" :text="`表示花费1 ${currency.symbol} 能获得多少代币的数量`" />
                    </div>
                    <div class="body">
                        <el-input class="h40" :formatter="formatterPrice" type="number" v-model="salePrice" />
                    </div>
                </div>

                <div class="form-item">
                    <div class="label fl-line">
                        <div>白名单</div>
                        <HelpTip class="help" text="可指定白名单用户优先参与预售, 在指定的白名单预售持续时间结束之后, 转为公开预售。如持续时间不填写或填写0则永远不会转为公开预售。" />
                    </div>
                    <div class="body">
                        <el-radio-group v-model="isWhiteListEnabled">
                            <el-radio :label="true" size="large">开启</el-radio>
                            <el-radio :label="false" size="large">禁用</el-radio>
                        </el-radio-group>
                        <div class="fl-line" v-if="isWhiteListEnabled">
                            <div>白名单预售持续时间</div>
                            <el-input-number class="whitelist-duration" v-model="whitelistDuration" size="large" :precision="0" :min="0" :controls="false" />
                            <div>分钟</div>
                        </div>
                    </div>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>软顶</div>
                                <HelpTip class="help" text="最低募资金额, 预售结束后如果低于该金额，预售会失败" />
                            </div>
                            <div class="body">
                                <el-input class="h40" type="number" :formatter="formatterPrice" v-model="softCap" :placeholder="currency.symbol" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>硬顶</div>
                                <HelpTip class="help" text="最高募资金额" />
                            </div>
                            <div class="body">
                                <el-input class="h40" type="number" :formatter="formatterPrice" v-model="hardCap" :placeholder="currency.symbol" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>最低投入金额</div>
                                <HelpTip class="help" :text="`每个用户最低购买的 ${currency.symbol} 数量`" />
                            </div>
                            <div class="body">
                                <el-input class="h40" type="number" v-model="minInvest" :formatter="formatterPrice" :placeholder="currency.symbol" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>最高投入金额</div>
                                <HelpTip class="help" :text="`每个用户最高购买的 ${currency.symbol} 数量`" />
                            </div>
                            <div class="body">
                                <el-input class="h40" type="number" v-model="maxInvest" :formatter="formatterPrice" :placeholder="currency.symbol" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>退款方式</div>
                                <HelpTip class="help" text="预售完成后，预售合约内剩余代币的处理方式" />
                            </div>
                            <div class="body">
                                <el-select class="h40 line-select" v-model="returnLeftType" size="large">
                                    <el-option v-for="item in returnLeftTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" v-if="isAutoList">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>交易所</div>
                                <HelpTip class="help" text="选择上币发行的交易所" />
                            </div>
                            <div class="body">
                                <div class="h40 select" @click="selectSwapDialogVisible = true">
                                    <template v-if="chainSwap">
                                        <icon-text :icon="chainSwap.swapIcon" :text="chainSwap.showName"></icon-text>
                                    </template>
                                    <template v-else>
                                        <div class="placeholder">请选择上币发行的交易所</div>
                                    </template>
                                    <el-icon color="#dcdfe6">
                                        <ArrowDownBold />
                                    </el-icon>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="isAutoList">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>流动性比例</div>
                                <HelpTip class="help" text="预售完成后, 将募集金额中该比例对应的BNB加入流动池, 最低为51%" />
                            </div>
                            <div class="body">
                                <el-input class="h40" type="number" @blur="formatterLiquidityRate" v-model="liquidityRate " placeholder="%" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>上市价格</div>
                                <HelpTip class="help" :text="`预售完成后向交易所中添加流动性时的价格,即1 ${currency.symbol} 可兑换的代币数量, 此数量必须小于等于预售价格填写的数量`" />
                            </div>
                            <div class="body">
                                <el-input class="h40" v-model="listPrice" placeholder="请输入" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>预售开始时间(UTC)</div>
                                <HelpTip class="help" text="不得早于当前时间后的10分钟" />
                            </div>
                            <div class="body">
                                <el-date-picker :default-time="defaultTime" class="select-date" :disabled-date="disabledDate" @change="checkStartTime" v-model="startTime" type="datetime" :editable="false" placeholder="请选择预售开始时间" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>预售结束时间(UTC)</div>
                                <HelpTip class="help" text="不得早于预售开始时间后的1小时" />
                            </div>
                            <div class="body">
                                <el-date-picker :default-time="defaultTime" class="select-date" :disabled-date="disabledDate" @change="checkEndTime" v-model="endTime" type="datetime" :editable="false" placeholder="请选择预售结束时间" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="isAutoList">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label fl-line">
                                <div>流动性锁定时间</div>
                                <HelpTip class="help" text="最低1天" />
                            </div>
                            <div class="body">
                                <el-input class="h40" :formatter="formatterLockTime" type="number" v-model="lpLockTime" placeholder="天" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="danger" v-if="estimeateTokenAmount">
                    <div class="text">请保证该地址下的 {{ tokenInfo.symbol }} 代币余额>={{estimeateTokenAmount}}, 用于代币释放和组建流动性。</div>
                    <!-- <div class="text">计算方式: {{hardCap.value}}{{currency.symbol}}(硬顶) * {{liquidityRate}}%(加池比例) * {{listPrice}}(上市价格) * (1-{{createLaunchPadFee.chargeRate}}%(服务费)) + {{hardCap.value}}{{currency.symbol}}(硬顶) * {{salePrice}}(预售价格) =
                        {{estimeateTokenAmount}} </div> -->
                </div>
                <div class="form-bottom-btns">
                    <el-button class="btn" @click="backStepClick">{{ $t('previousStep') }}</el-button>
                    <el-button class="btn btn-gradient" @click="nextStepClick">{{ $t('nextStep') }}</el-button>
                </div>
            </template>
            <template v-else-if="step == 2">
                <div class="form-item">
                    <div class="label fl-line">
                        <div>上传项目Logo</div>
                        <el-icon class="question" color="#DFDFDF" :size="16">
                            <QuestionFilled />
                        </el-icon>
                    </div>
                    <div class="body">
                        <UploadImg v-model="logo"></UploadImg>
                    </div>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">官方网站</div>
                            <div class="body">
                            </div>
                            <el-input class="h40" @change="checkUrl('website')" v-model="website" placeholder="https://" />
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Twitter</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('twitter')" v-model="twitter" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Telegram</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('telegram')" v-model="telegram" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Discord</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('discord')" v-model="discord" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Github</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('github')" v-model="github" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Facebook</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('facebook')" v-model="facebook" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Reddit</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('reddit')" v-model="reddit" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="form-item">
                            <div class="label">Instagram</div>
                            <div class="body">
                                <el-input class="h40" @change="checkUrl('instagram')" v-model="instagram" placeholder="https://" />
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <div class="form-item">
                    <div class="label">Youtube 视频</div>
                    <div class="body">
                        <el-input class="h40" @change="checkUrl('youtube')" v-model="youtube" placeholder="Ex:https://www.youtube.com/watch?v=xxxxxx" />
                    </div>
                </div>

                <div class="form-item">
                    <div class="label">项目介绍</div>
                    <div class="body">
                        <el-input v-model="description" placeholder="请输入" />
                    </div>
                </div>

                <div class="form-bottom-btns">
                    <el-button class="btn" @click="backStepClick">{{ $t('previousStep') }}</el-button>
                    <el-button class="btn btn-gradient" @click="nextStepClick">{{ $t('nextStep') }}</el-button>
                </div>
            </template>

            <template v-if="step == 3">
                <div class="confirm">
                    <div class="confirm-item" v-if="logo.length>0">
                        <div class="label">项目Logo</div>
                        <div class="value">
                            <TokenIcon class="logo-icon" :bigIcon="getLocalImgUrl(logo[0].raw)"></TokenIcon>
                        </div>
                    </div>
                    <template v-if="tokenInfo">
                        <div class="confirm-item">
                            <div class="label">代币全称</div>
                            <div class="value">{{tokenInfo.name}}</div>
                        </div>
                        <div class="confirm-item">
                            <div class="label">代币简称</div>
                            <div class="value">{{tokenInfo.symbol}}</div>
                        </div>
                        <div class="confirm-item">
                            <div class="label">代币精度</div>
                            <div class="value">{{tokenInfo.decimals}}</div>
                        </div>
                        <div class="confirm-item">
                            <div class="label">代币地址</div>
                            <div class="value">{{tokenAddress}}</div>
                        </div>
                        <div class="confirm-item">
                            <div class="label">发行总量</div>
                            <div class="value">{{tokenInfo.totalSupply}}</div>
                        </div>
                    </template>
                    <div class="confirm-item" v-if="salePrice">
                        <div class="label">募资代币</div>
                        <div class="value">1{{currency.symbol}} = {{salePrice}}{{tokenInfo.symbol}}</div>
                    </div>
                    <div class="confirm-item" v-if="listPrice&&isAutoList">
                        <div class="label">上市价格</div>
                        <div class="value">1{{currency.symbol}} = {{listPrice}}{{tokenInfo.symbol}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">软顶</div>
                        <div class="value">{{softCap}} {{currency.symbol}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">硬顶</div>
                        <div class="value">{{hardCap}} {{currency.symbol}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">最低购买额度</div>
                        <div class="value">{{maxInvest}} {{currency.symbol}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">最高购买额度</div>
                        <div class="value">{{ minInvest }} {{currency.symbol}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">是否开启白名单</div>
                        <div class="value">
                            <span v-if="isWhiteListEnabled">是</span>
                            <span v-else>否</span>
                        </div>
                    </div>
                    <div class="confirm-item" v-if="isWhiteListEnabled">
                        <div class="label">白名单持续时间</div>
                        <div class="value">
                            <span v-if="whitelistDuration>0">{{whitelistDuration}}分钟</span>
                            <span v-else>永久</span>
                        </div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">退款方式</div>
                        <div class="value" v-if="returnLeftType=='return'">返还</div>
                        <div class="value" v-else>销毁</div>
                    </div>
                    <div class="confirm-item" v-if="chainSwap">
                        <div class="label">交易所</div>
                        <div class="value">{{chainSwap.showName}}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">流动性比例</div>
                        <div class="value">{{liquidityRate}}%</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">流动性锁定时间</div>
                        <div class="value">{{lpLockTime}}天</div>
                    </div>
                    <div class="confirm-item" v-if="startTime">
                        <div class="label">预售开始时间(UTC)</div>
                        <div class="value">{{dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                    <div class="confirm-item" v-if="endTime">
                        <div class="label">预售结束时间(UTC)</div>
                        <div class="value">{{dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                    <!-- <div class="confirm-item">
                        <div class="label">是否开启线性释放</div>
                        <div class="value">是</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">首次释放百分比</div>
                        <div class="value">10%</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">释放周期</div>
                        <div class="value">1天</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">每个周期释放百分比</div>
                        <div class="value">10%</div>
                    </div> -->
                    <div class="confirm-item" v-if="website">
                        <div class="label">官方网站</div>
                        <div class="value">{{ website }}</div>
                    </div>
                    <div class="confirm-item" v-if="twitter">
                        <div class="label">Twitter</div>
                        <div class="value">{{ twitter }}</div>
                    </div>
                    <div class="confirm-item" v-if="telegram">
                        <div class="label">Telegram</div>
                        <div class="value">{{ telegram }}</div>
                    </div>
                    <div class="confirm-item" v-if="discord">
                        <div class="label">Discord</div>
                        <div class="value">{{discord}}</div>
                    </div>
                    <div class="confirm-item" v-if="github">
                        <div class="label">Github</div>
                        <div class="value">{{ github }}</div>
                    </div>
                    <div class="confirm-item" v-if="facebook">
                        <div class="label">Facebook</div>
                        <div class="value">{{ facebook }}</div>
                    </div>
                    <div class="confirm-item" v-if="reddit">
                        <div class="label">Reddit</div>
                        <div class="value">{{ reddit }}</div>
                    </div>
                    <div class="confirm-item" v-if="instagram">
                        <div class="label">Instagram</div>
                        <div class="value">{{ instagram }}</div>
                    </div>
                    <div class="confirm-item" v-if="youtube">
                        <div class="label">Youtube</div>
                        <div class="value">{{ youtube }}</div>
                    </div>
                    <div class="confirm-item">
                        <div class="label">项目介绍</div>
                        <div class="value">{{description}}</div>
                    </div>
                </div>
                <div class="danger" v-if="presaleAddress">如果您的代币机制中存在交易税率, 请把生成的合约地址 {{presaleAddress}}
                    以及工厂合约地址{{ store.selectedChain.launchPad.presaleFacoty }} 放入转账白名单中, 使这两个合约在转
                    入转出代币时为0税率, 否则会造成预售合约创建失败</div>
                <div class="form-bottom-btns">
                    <el-button class="btn" @click="backStepClick">{{ $t('previousStep') }}</el-button>
                    <el-button class="btn btn-gradient" v-if="tokenNeedApprove" @click="approveToken" :loading="approveTokenLoading">授权预售使用代币数量 {{ estimeateTokenAmount.value }} {{ tokenInfo.symbol.toUpperCase() }}</el-button>
                    <el-button class="btn btn-gradient" v-if="baseTokenNeedApprove" @click="approveBaseToken" :loading="approveBaseTokenLoading">授权创建费 {{createLaunchPadFee.baseFee}} {{currency.symbol}}</el-button>
                    <el-button class="btn btn-gradient" :loading="confirmLoading" v-if="!tokenNeedApprove&&!baseTokenNeedApprove" @click="clickConfirm">提交</el-button>
                </div>
            </template>
        </div>
    </div>

    <el-dialog v-model="selectSwapDialogVisible" :title="$t('selectSwap')" class="dlg dlg-select-token" destroy-on-close>
        <SelectSwap @select="(t) => selectSwapClick(t)"></SelectSwap>
    </el-dialog>
</template>
<style lang='scss'>
.input-with-select .el-input-group__prepend {
    background-color: #fff;

    .el-input__inner {
        height: 42px;
    }
}

.select-date {
    width: 100% !important;

    .el-input__wrapper {
        height: 38px;
        width: 100%;
    }
}
</style>
<style scoped lang='scss'>
.title {
    font-size: 16px;
    color: #333333;
    font-weight: 700;
    margin-bottom: 20px;
}

.option {
    display: flex;

    .token-icon {
        margin-top: 7px;
        --sizeBig: 20px;
        margin-right: 5px;
    }
}

.token-address-error {
    margin-top: 12px;
}

.whitelist-duration {
    width: 125px;
    height: 36px;
    margin: 0 10px;
}

.verify-token-info {
    margin-top: 12px;
    min-height: 35px;
    border: 1px solid #dcdfe6;
    padding: 6px 12px;
    border-radius: 4px;

    .token-info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.form-bottom-btns {
    margin-top: 40px;
    display: flex;
    justify-content: center;

    .btn {
        width: 256px;
        height: 44px;
        margin-left: 40px;
        &:first-child {
            margin-left: 0;
        }
    }
}
.create-fee {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}
.form {
    margin-top: 12px;

    .h40 {
        height: 40px;
    }

    .fl-sb {
        display: flex;
        justify-content: space-between;
    }

    .fl-line {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .question {
        margin-left: 6px;
    }

    .input-with-select {
        height: 44px;
        border-radius: 4px;

        .select-chain {
            width: 150px;
            background: #fff;

            border-color: red;

            .token-icon {
                --sizeBig: 20px;
            }

            .error {
                margin-right: 3px;
                font-size: 18px;
                color: #f56c6c;
            }
        }
    }

    .create-token {
        width: 124px;
        height: 44px;
        margin-left: 28px;
    }

    .danger {
        font-size: 14px;
        color: #f6465d;
        letter-spacing: 0;
        text-align: left;
        font-weight: 400;
        margin-top: 30px;
        .text {
            margin-left: 6px;
        }
    }

    .form-group {
        display: flex;
        justify-content: space-between;
    }

    .form-item {
        margin-bottom: 20px;

        .label {
            font-size: 14px;
            color: #333333;
            font-weight: 500;
            margin-bottom: 10px;

            .help {
                margin-left: 4px;
            }
        }

        .body {
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: left;
            line-height: 22px;
            font-weight: 400;

            .line-select {
                display: block;
            }

            .tips {
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                text-align: left;
                font-weight: 400;
            }

            .select {
                height: 40px;
                box-shadow: 0 0 0 1px #dcdfe6 inset;
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
        }
    }

    .confirm {
        .confirm-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            .logo-icon {
                --sizeBig: 30px;
            }

            .label {
                font-size: 14px;
                color: #999999;
                font-weight: 500;
            }

            .value {
                font-size: 14px;
                color: #333333;
                text-align: right;
                font-weight: 500;
            }
        }
    }
}
</style>
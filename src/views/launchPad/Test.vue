<script setup>
import { computed, inject, watch, ref, reactive, onMounted } from 'vue'
import { getTokenIcon, getChainIcon, sleep, numFormat } from "@/utils"
import BigNumber from 'bignumber.js'
import { useStore } from '@/store'
import { useLpStore } from '@/store/launchpad';
import api from "@/api"
import dayjs from 'dayjs'
import { ethers } from "ethers"
import UploadImg from "@/components/UploadImg.vue"

const store = useStore()
const needApprove = ref(false)
const tokenAddress = ref("0x227A05695F10B591731Fd925396b548a45067798")
const logo = ref([])
onMounted(() => {
})

async function isApprove() {

}

// 跳转详情
async function test() {
    const presaleInfo = new FormData()
    presaleInfo.append('contractAddress', '0x1C60012De48Df75e321ccDdD38bd836Bdd3A65BD')
    presaleInfo.append('contractChain', "bsc_testnet")
    presaleInfo.append('createPresaleTxHash', "0xb89bd3ad7dab1a4597c38990bb37d26049b063ed06d7f96dc6f2660fac0c1a3e")
    console.log(logo.value[0])
    presaleInfo.append('profile_picture', logo.value[0].raw)
    presaleInfo.append('description', '1111')
    let resUpload = await api.launchpad.uploadPresaleInfo(presaleInfo)
    console.log(resUpload)
    return
    try {
        console.log(111)
        try {
            console.log(222)
            throw 'eee'
        } catch (e) {
            console.log(e)
        } finally {
            console.log(333)
        }
    } catch (e) {
        console.log(e)
    } finally {
        console.log(444)
    }


    return
    let currencyAddress = "0x0000000000000000000000000000000000000000" //底池地址
    let chainSwapRouterAddress = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
    let decimals = "18"
    let salePrice = "100" //预售价格
    let maxInvest = "0.02"
    let minInvest = "0.01"
    let hardCap = "0.1"
    let softCap = "0.05"
    let liquidityRate = "51"//流动性比例
    let listPrice = "90" //流动性定价	
    let startTime = 1698239611
    let endTime = 1698498811
    let lpLockTime = "5" //锁定时间(天)
    let isWhiteListEnabled = true //是否开启白名单
    let whitelistDuration = "" //白名单持续时间(分)
    let isAutoList = true
    let returnLeftType = true
    let currencyIsEth = false

    const addressParam = []
    const intParam = []
    const boolParam = []
    console.log(BigNumber(liquidityRate).times(100).toNumber())

    addressParam[0] = tokenAddress.value
    addressParam[1] = chainSwapRouterAddress

    if (currencyAddress == '0x0000000000000000000000000000000000000000') {
        const swapContract = await api.wallet.metamask.contractSwap(chainSwapRouterAddress)
        const weth = await swapContract.WETH()
        currencyIsEth = true
        addressParam[2] = weth.toLowerCase()
    } else {
        currencyIsEth = false
        addressParam[2] = currencyAddress
    }

    intParam[0] = salePrice * 1000000
    intParam[1] = ethers.parseUnits(minInvest, parseInt(decimals))
    intParam[2] = ethers.parseUnits(maxInvest, parseInt(decimals))
    intParam[3] = ethers.parseUnits(softCap, parseInt(decimals))
    intParam[4] = ethers.parseUnits(hardCap, parseInt(decimals))
    intParam[5] = BigNumber(liquidityRate).times(100).toNumber()
    intParam[6] = listPrice * 1000000
    intParam[7] = startTime
    intParam[8] = endTime
    intParam[9] = lpLockTime * 24 * 60 * 60
    intParam[10] = whitelistDuration * 60

    boolParam[0] = currencyIsEth
    boolParam[1] = isAutoList
    boolParam[2] = isWhiteListEnabled
    boolParam[3] = returnLeftType

    const contractPresaleFactory = await api.wallet.metamask.contractPresaleFactory(store.selectedChain.launchPad.presaleFacoty)
    const baseFee = await contractPresaleFactory.baseFee()
    // 判断是否需要approve
    // 
    let tokenAmount = await contractPresaleFactory.estimeateTokenAmount(isAutoList, salePrice * 1000000, ethers.parseUnits(hardCap, parseInt(decimals)), BigNumber(liquidityRate).times(100).toNumber(), listPrice * 1000000, 18, 18)
    console.log(tokenAmount)
    console.log(ethers.formatUnits(tokenAmount, 18))
    var tokenContract = await api.wallet.metamask.contractERC20(tokenAddress.value);
    const allowance = await tokenContract.allowance(store.walletAddress, store.selectedChain.launchPad.presaleFacoty)
    console.log(allowance)
    console.log(ethers.formatUnits(allowance, 18))
    if (ethers.formatUnits(allowance, 18) < ethers.formatUnits(tokenAmount, 18)) {
        needApprove.value = true
    }

    var tokenContract = await api.wallet.metamask.contractERC20(addressParam[2]);
    const allowanceBase = await tokenContract.allowance(store.walletAddress, store.selectedChain.launchPad.presaleFacoty)
    console.log(allowanceBase)

    // 获取预售地址
    console.log(addressParam)
    console.log(intParam)
    console.log(boolParam)
    let presaleAddress = await contractPresaleFactory.presaleCreate.staticCall(addressParam, intParam, boolParam, {
        value: baseFee
    })
    console.log(presaleAddress)

    let res = await contractPresaleFactory.presaleCreate(addressParam, intParam, boolParam, {
        value: baseFee
    })
    console.log(res)
    await res.wait()
    console.log(res)
}
async function approve() {
    let res = await api.wallet.metamask.approveMaxAmount(
        tokenAddress.value,
        store.selectedChain.launchPad.presaleFacoty
    )
}
</script>
<template>
    <div @click="test">
        测试创建预售合约
    </div>
    <div>
        <UploadImg v-model="logo"></UploadImg>
    </div>
    <div v-if="needApprove" @click=approve>approve</div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
</style>
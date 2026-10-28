import { defineStore } from "pinia"
import { ethers } from "ethers"
import { ElMessage, ElLoading } from 'element-plus'
import api from "@/api"
import BigNumber from "bignumber.js"
import cfg from "@/config"

export const useLpManageStore = defineStore("lpManageStore", {
    state: () => {
        return {
            loading: false,
            logo: '',
            launchType: 'normal',
            chain: '',
            website: "",
            twitter: "",
            telegram: "",
            discord: "",
            github: "",
            facebook: "",
            reddit: "",
            instagram: "",
            youtube: "",
            description: "",
            contractAddress: "",
            contractCreator: "",//创建人
            status: "",
            tokenAddress: "",
            tokenName: "",
            tokenDecimal: "",
            tokenSymbol: "",
            tokenTotalSupply: "",//总发行量
            saleAmount: "",//预售总量
            tokenLiquidityAmount: "",// 流动性总量
            cumulateAmount: "",//预售总量
            isEth: false,
            baseTokenAddress: "",
            baseTokenDecimal: "",
            baseTokenSymbol: "",
            salePrice: "",
            listPrice: "",//流动性定价/上市价格
            softCap: "",
            hardCap: "",
            minInvest: "",
            maxInvest: "",
            userMaxInvest: "",//当前用户还可投入金额
            investorNumber: "",//参投人数
            userInvestAmount: "",//参投金额
            swapRouterAddress: "",//交易所地址
            isAutoList: false,
            liquidityRate: "",//流动性比例（添加到流动池当中的募集金额的比例）
            lpLockTime: "",
            startTime: "",
            endTime: "",
            isWhiteListEnabled: false,
            whitelistDuration: "",
            whitelist: [],
            isAffiliateEnabled: false,//是否开启预售推广
            affiliateFee: "",//预售推广手续费
            affiliateRate: "",//奖励池占资金比例
            affiliateUserInfo: {},//预售推广信息
        }
    },
    actions: {
        async getTokenListPresaleByApi(chainId, contractAddress) {
            try {
                let res = await api.launchpad.getTokenListPresaleInfo(chainId, contractAddress)
                console.log(res)
                if (res.data.status == 0) {
                    let presaleInfo = res.data.data
                    this.logo = {
                        name: 'profile_picture',
                        url: presaleInfo.logoImage
                    }
                    this.chain = presaleInfo.chain
                    this.website = presaleInfo.website
                    this.twitter = presaleInfo.twitter
                    this.telegram = presaleInfo.telegram
                    this.discord = presaleInfo.discord
                    this.github = presaleInfo.github
                    this.facebook = presaleInfo.facebook
                    this.reddit = presaleInfo.reddit
                    this.instagram = presaleInfo.instagram
                    this.youtube = presaleInfo.youtube
                    this.description = presaleInfo.description
                    this.contractAddress = presaleInfo.address
                    this.contractCreator = presaleInfo.contractCreator//创建人
                    this.tokenAddress = presaleInfo.tokenAddress
                    this.tokenName = presaleInfo.tokenName
                    this.tokenDecimal = presaleInfo.tokenDecimal
                    this.tokenSymbol = presaleInfo.tokenSymbol
                    this.tokenTotalSupply = presaleInfo.tokenTotalSupply//总发行量
                    this.saleAmount = presaleInfo.saleAmount
                    this.tokenLiquidityAmount = presaleInfo.tokenLiquidityAmount
                    this.isEth = presaleInfo.isEth
                    if (this.isEth) {
                        let nativeCurrency = cfg.chainList.find(x => x.chain == this.chain).nativeCurrency
                        this.baseTokenAddress = '0x0000000000000000000000000000000000000000'
                        this.baseTokenDecimal = nativeCurrency.decimals
                        this.baseTokenSymbol = nativeCurrency.symbol
                    } else {
                        this.baseTokenAddress = presaleInfo.baseTokenAddress
                        this.baseTokenDecimal = presaleInfo.baseTokenDecimal
                        this.baseTokenSymbol = presaleInfo.baseTokenSymbol
                    }
                    this.salePrice = BigNumber(presaleInfo.salePrice).div(1000000)
                    this.listPrice = BigNumber(presaleInfo.listPrice).div(1000000)//流动性定价/上市价格
                    this.softCap = presaleInfo.softCap
                    this.hardCap = presaleInfo.hardCap
                    this.minInvest = presaleInfo.minInvest
                    this.maxInvest = presaleInfo.maxInvest
                    this.swapRouterAddress = presaleInfo.swapRouterAddress
                    this.liquidityRate = BigNumber(presaleInfo.liquidityRate).div(10000)
                    this.lpLockTime = presaleInfo.lpLockTime
                    this.startTime = presaleInfo.startTime
                    this.endTime = presaleInfo.endTime
                } else {
                    throw 'err'
                }
            } catch (e) {
                console.log(e)
                throw 'err'
            }
        },
        async getTokenListPresale(chainId, contractAddress, userAddress) {
            this.loading = true
            let presaleContract = await api.wallet.metamask.contractPresale(contractAddress)
            let PresaleAffiliateContract = await api.wallet.metamask.contractPresaleAffiliate(contractAddress)
            let presaleInfoArr = [
                presaleContract.cumulateAmount(),
                presaleContract.getMaxInvestAmount(),
                presaleContract.investorNumber(),
                presaleContract.investAmounts(userAddress),
                presaleContract.isAutoList(),
                presaleContract.isWhiteListEnabled(),
                presaleContract.whitelistDuration(),
                presaleContract.isAffiliateEnabled(),
                presaleContract.status()
            ]
            try {
                await this.getTokenListPresaleByApi(chainId, contractAddress)
            } catch (e) {
                console.log(e)
                this.loading = false
                ElMessage.error("获取预售信息失败")
            }
            Promise.all(presaleInfoArr).then(async res => {
                this.cumulateAmount = res[0]
                this.userMaxInvest = res[1]
                this.investorNumber = res[2]//参投人数
                this.userInvestAmount = res[3]//参投金额
                this.isAutoList = res[4]
                this.isWhiteListEnabled = res[5]
                this.whitelistDuration = res[6]
                this.isAffiliateEnabled = res[7]
                if (res[8].toString() == '0') {
                    this.status = 'normal'
                } else if (res[8].toString() == '1') {
                    this.status = 'canceled'
                } else if (res[8].toString() == '2') {
                    this.status = 'ended'
                }
                if (this.isAffiliateEnabled) {
                    let affiliateFee = await PresaleAffiliateContract.affiliateRate()
                    this.affiliateFee = BigNumber(affiliateFee).div(10000)
                    this.affiliateUserInfo = await PresaleAffiliateContract.getAffiliateUserInfo(userAddress)
                }
            }).catch(err => {
                console.log(err)
                ElMessage.error("获取预售信息失败")
            }).finally(fin => {
                this.loading = false
            })
        },
    }
})

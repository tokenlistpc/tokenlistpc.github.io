import { defineStore } from "pinia"
import { ethers } from "ethers"
import api from "@/api"
import BigNumber from "bignumber.js"
import FreeTaxTokenABI from "@/utils/abi/CreateToken/FreeTaxToken.json"
import FeeTokenABI from "@/utils/abi/CreateToken/FeeToken.json"
import DividendSelfTokenABI from "@/utils/abi/CreateToken/DividendSelfToken.json"
import AddPoolDividendTokenABI from "@/utils/abi/CreateToken/AddPoolDividendToken.json"
import DividendTokenABI from "@/utils/abi/CreateToken/DividendToken.json"

export const useCtManageStore = defineStore("ctManageStore", {
    state: () => {
        return {
            loading: false,

            deployerId: -1,
            tokenAddress: "",
            abi: null,
            owner: "",
            name: "",
            symbol: "",
            totalSupply: '',
            decimals: 0,

            rewardToken: '',//分红代币地址
            rewardTokenName: '',//分红代币名称
            rewardTokenSymbol: '',//分红代币

            buyFundFee: 0,//买入营销费
            buyLPFee: 0,//买入回流费
            buyBurnFee: 0,//买入销毁费
            buyRewardFee: 0,//买入分红费
            sellFundFee: 0,//卖出营销费
            sellLPFee: 0,//卖出回流费
            sellBurnFee: 0,//卖出销毁费
            sellRewardFee: 0,//买入分红费

            enableSwapLimit: false, //交易限制状态 
            maxSwapAmount: 0,
            enableWalletLimit: false, //持币限制状态
            maxWalletAmount: 0,
            fundAddress: '',

            canMint: false,//是否增发
            enableManualStartTrade: false,//是否手动开启增发
            tradeStart: false,
            enableWhiteList: false,//是否打开白名单
            enableChangeTax: false,//是否打开税收配置
            enableKillBlock: false,//是否自动杀区块
            killBlock: 0,//自动杀区块数

            whiteListCount: 0,
            whiteList: [],

        }
    },
    actions: {
        init(deployerId, tokenAddress) {
            this.deployerId = Number(deployerId)
            this.tokenAddress = tokenAddress.toLowerCase()
            switch (this.deployerId) {
                case 0:
                    this.abi = FreeTaxTokenABI
                    break
                case 1:
                    this.abi = FeeTokenABI
                    break
                case 2:
                    this.abi = DividendSelfTokenABI
                    break
                case 3:
                    this.abi = AddPoolDividendTokenABI
                    break
                case 4:
                    this.abi = DividendTokenABI
                    break
                case 5:
                    this.abi = FreeTaxTokenABI
                    break
                case 6:
                    this.abi = FeeTokenABI
                    break
                case 7:
                    this.abi = DividendSelfTokenABI
                    break
                case 8:
                    this.abi = AddPoolDividendTokenABI
                    break
                default:
                    this.abi = null
            }
        },
        async getFreeTaxTokenInfo(tokenAddress) {
            this.loading = true
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            let tokenInfoArr = [
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.totalSupply(),
                tokenContract.owner()
            ]
            if (this.deployerId < 5) {
                tokenInfoArr.push(tokenContract.canMint())
            }
            Promise.all(tokenInfoArr).then(res => {
                this.name = res[0]
                this.symbol = res[1]
                this.decimals = Number(res[2])
                this.totalSupply = ethers.formatUnits(res[3].toString(), Number(this.decimals))
                this.owner = res[4].toLowerCase()
                if (this.deployerId < 5) {
                    this.canMint = res[5]
                }
            }).catch(err => {
                console.log(err)
            }).finally(fin => {
                this.loading = false
            })
        },
        async getWhiteList(tokenAddress) {
            try {
                const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
                this.whiteListCount = await tokenContract.feeWhiteListCount()
                let whiteList = []
                if (this.whiteListCount > 0) {
                    whiteList = await tokenContract.getfeeWhiteList(0, Number(this.whiteListCount) - 1)
                }
                this.whiteList = whiteList.map(x => {
                    return x.toLowerCase()
                })
                // console.log(this.whiteListCount)
                // console.log(this.whiteList)
            } catch (e) {
                throw e
            }
        },
        async getRewardTokenInfo(tokenAddress) {
            try {
                const tokenContract = await api.wallet.metamask.contractERC20(tokenAddress)
                Promise.all([tokenContract.name(), tokenContract.symbol()]).then(res => {
                    console.log(res)
                    this.rewardTokenName = res[0]
                    this.rewardTokenSymbol = res[1]
                }).catch(err => {
                    console.log(err)
                })
            } catch (e) {
                console.log(e)
            }
        },
        async getTokenFee(tokenAddress) {
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            let tokenFeeArr = []
            if (this.deployerId == 1 || this.deployerId == 6) {
                tokenFeeArr = [
                    tokenContract._buyFundFee(),
                    tokenContract._buyLPFee(),
                    tokenContract._buyBurnFee(),
                    tokenContract._sellFundFee(),
                    tokenContract._sellLPFee(),
                    tokenContract._sellBurnFee()
                ]
            } else if (this.deployerId == 2 || this.deployerId == 3 || this.deployerId == 7 || this.deployerId == 8) {
                tokenFeeArr = [
                    tokenContract._buyFundFee(),
                    tokenContract._buyLPFee(),
                    tokenContract._buyRewardFee(),
                    tokenContract._sellFundFee(),
                    tokenContract._sellLPFee(),
                    tokenContract._sellRewardFee()
                ]
            } else if (this.deployerId == 4) {
                tokenFeeArr = [
                    tokenContract._buyFundFee(),
                    tokenContract._buyLPFee(),
                    tokenContract._buyRewardFee(),
                    tokenContract._buyBurnFee(),
                    tokenContract._sellFundFee(),
                    tokenContract._sellLPFee(),
                    tokenContract._sellRewardFee(),
                    tokenContract._sellBurnFee(),
                ]
            }
            Promise.all(tokenFeeArr).then(res => {
                console.log(res)
                if (this.deployerId == 1 || this.deployerId == 6) {
                    this.buyFundFee = BigNumber(res[0]).div(10000).multipliedBy(100).toString()
                    this.buyLPFee = BigNumber(res[1]).div(10000).multipliedBy(100).toString()
                    this.buyBurnFee = BigNumber(res[2]).div(10000).multipliedBy(100).toString()
                    this.sellFundFee = BigNumber(res[3]).div(10000).multipliedBy(100).toString()
                    this.sellLPFee = BigNumber(res[4]).div(10000).multipliedBy(100).toString()
                    this.sellBurnFee = BigNumber(res[5]).div(10000).multipliedBy(100).toString()
                } else if (this.deployerId == 2 || this.deployerId == 3 || this.deployerId == 7 || this.deployerId == 8) {
                    this.buyFundFee = BigNumber(res[0]).div(10000).multipliedBy(100).toString()
                    this.buyLPFee = BigNumber(res[1]).div(10000).multipliedBy(100).toString()
                    this.buyRewardFee = BigNumber(res[2]).div(10000).multipliedBy(100).toString()
                    this.sellFundFee = BigNumber(res[3]).div(10000).multipliedBy(100).toString()
                    this.sellLPFee = BigNumber(res[4]).div(10000).multipliedBy(100).toString()
                    this.sellRewardFee = BigNumber(res[5]).div(10000).multipliedBy(100).toString()
                } else if (this.deployerId == 4) {
                    this.buyFundFee = BigNumber(res[0]).div(10000).multipliedBy(100).toString()
                    this.buyLPFee = BigNumber(res[1]).div(10000).multipliedBy(100).toString()
                    this.buyRewardFee = BigNumber(res[2]).div(10000).multipliedBy(100).toString()
                    this.buyBurnFee = BigNumber(res[3]).div(10000).multipliedBy(100).toString()
                    this.sellFundFee = BigNumber(res[4]).div(10000).multipliedBy(100).toString()
                    this.sellLPFee = BigNumber(res[5]).div(10000).multipliedBy(100).toString()
                    this.sellRewardFee = BigNumber(res[6]).div(10000).multipliedBy(100).toString()
                    this.sellBurnFee = BigNumber(res[7]).div(10000).multipliedBy(100).toString()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        async getFeeTokenInfo(tokenAddress) {
            this.loading = true
            console.log(this.abi)
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            let tokenInfoArr = [
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.totalSupply(),
                tokenContract.owner(),
                tokenContract.enableManualStartTrade(),
                tokenContract.tradeStart(),
                tokenContract.enableWhiteList(),
                tokenContract.enableChangeTax(),
                tokenContract.enableKillBlock(),
                tokenContract.kb(),

                tokenContract.enableSwapLimit(),
                tokenContract.maxSwapAmount(),
                tokenContract.enableWalletLimit(),
                tokenContract.maxWalletAmount(),
                tokenContract.fundAddress()
            ]
            if (this.deployerId < 5) {
                tokenInfoArr.push(tokenContract.canMint())
            }
            Promise.all(tokenInfoArr).then(async res => {
                this.name = res[0]
                this.symbol = res[1]
                this.decimals = Number(res[2])
                this.totalSupply = ethers.formatUnits(res[3].toString(), Number(this.decimals))
                this.owner = res[4].toLowerCase()
                this.enableManualStartTrade = res[5]
                this.tradeStart = res[6]
                this.enableWhiteList = res[7]
                this.enableChangeTax = res[8]
                this.enableKillBlock = res[9]
                this.killBlock = res[10]

                this.enableSwapLimit = res[11]
                this.maxSwapAmount = ethers.formatUnits(res[12].toString(), Number(this.decimals))
                this.enableWalletLimit = res[13]
                this.maxWalletAmount = ethers.formatUnits(res[14].toString(), Number(this.decimals))
                this.fundAddress = res[15].toLowerCase()
                if (this.deployerId < 5) {
                    this.canMint = res[16]
                }
                await this.getTokenFee(tokenAddress)
                await this.getWhiteList(tokenAddress)
            }).catch(err => {
                console.log(err)
            }).finally(fin => {
                this.loading = false
            })
        },
        async getDividendSelfTokenInfo(tokenAddress) {
            this.loading = true
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            Promise.all([
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.totalSupply(),
                tokenContract.owner(),
                tokenContract.enableManualStartTrade(),
                tokenContract.tradeStart(),
                tokenContract.enableWhiteList(),
                tokenContract.enableChangeTax(),
                tokenContract.enableKillBlock(),
                tokenContract.kb(),

                tokenContract.enableSwapLimit(),
                tokenContract.maxSwapAmount(),
                tokenContract.enableWalletLimit(),
                tokenContract.maxWalletAmount(),
                tokenContract.fundAddress(),
            ]).then(async res => {
                this.name = res[0]
                this.symbol = res[1]
                this.decimals = Number(res[2])
                this.totalSupply = ethers.formatUnits(res[3].toString(), Number(this.decimals))
                this.owner = res[4].toLowerCase()
                this.enableManualStartTrade = res[5]
                this.tradeStart = res[6]
                this.enableWhiteList = res[7]
                this.enableChangeTax = res[8]
                this.enableKillBlock = res[9]
                this.killBlock = res[10]

                this.enableSwapLimit = res[11]
                this.maxSwapAmount = ethers.formatUnits(res[12].toString(), Number(this.decimals))
                this.enableWalletLimit = res[13]
                this.maxWalletAmount = ethers.formatUnits(res[14].toString(), Number(this.decimals))
                this.fundAddress = res[15].toLowerCase()
                await this.getTokenFee(tokenAddress)
                await this.getWhiteList(tokenAddress)
            }).catch(err => {
                console.log(err)
            }).finally(fin => {
                this.loading = false
            })
        },
        // 加池分红
        async getAddPoolDividendTokenInfo(tokenAddress) {
            this.loading = true
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            let tokenInfoArr = [
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.totalSupply(),
                tokenContract.owner(),
                tokenContract.enableManualStartTrade(),
                tokenContract.tradeStart(),
                tokenContract.enableWhiteList(),
                tokenContract.enableChangeTax(),
                tokenContract.enableKillBlock(),
                tokenContract.kb(),

                tokenContract.rewardToken(),
                tokenContract.enableSwapLimit(),
                tokenContract.maxSwapAmount(),
                tokenContract.enableWalletLimit(),
                tokenContract.maxWalletAmount(),
                tokenContract.fundAddress()
            ]
            if (this.deployerId < 5) {
                tokenInfoArr.push(tokenContract.canMint())
            }
            Promise.all(tokenInfoArr).then(async res => {
                console.log(res)
                this.name = res[0]
                this.symbol = res[1]
                this.decimals = Number(res[2])
                this.totalSupply = ethers.formatUnits(res[3].toString(), Number(this.decimals))
                this.owner = res[4].toLowerCase()
                this.enableManualStartTrade = res[5]
                this.tradeStart = res[6]
                this.enableWhiteList = res[7]
                this.enableChangeTax = res[8]

                this.enableKillBlock = res[9]
                this.killBlock = res[10]

                this.rewardToken = res[11].toLowerCase()
                this.enableSwapLimit = res[12]
                this.maxSwapAmount = ethers.formatUnits(res[13].toString(), Number(this.decimals))
                this.enableWalletLimit = res[14]
                this.maxWalletAmount = ethers.formatUnits(res[15].toString(), Number(this.decimals))
                this.fundAddress = res[16].toLowerCase()
                if (this.deployerId < 5) {
                    this.canMint = res[17]
                }
                await this.getTokenFee(tokenAddress)

                await this.getWhiteList(tokenAddress)
                await this.getRewardTokenInfo(this.rewardToken)
            }).catch(err => {
                console.log(err)
            }).finally(fin => {
                this.loading = false
            })
        },
        // 持币分红
        async getDividendTokenInfo(tokenAddress) {
            this.loading = true
            const tokenContract = await api.wallet.metamask.contract(tokenAddress, this.abi)
            Promise.all([
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.totalSupply(),
                tokenContract.owner(),
                tokenContract.enableManualStartTrade(),
                tokenContract.isLaunch(),
                tokenContract.enableWhiteList(),
                tokenContract.enableChangeTax(),
                tokenContract.enableKillBlock(),
                tokenContract.kb(),

                tokenContract.dividendToken(),
                tokenContract.enableSwapLimit(),
                tokenContract.maxSwapAmount(),
                tokenContract.enableWalletLimit(),
                tokenContract.maxWalletAmount(),
                tokenContract.fundAddress(),
            ]).then(async res => {
                console.log(res)
                this.name = res[0]
                this.symbol = res[1]
                this.decimals = Number(res[2])
                this.totalSupply = ethers.formatUnits(res[3].toString(), Number(this.decimals))
                this.owner = res[4].toLowerCase()
                this.enableManualStartTrade = res[5]
                this.tradeStart = res[6]
                this.enableWhiteList = res[7]
                this.enableChangeTax = res[8]
                this.enableKillBlock = res[9]
                this.killBlock = res[10]

                this.rewardToken = res[11].toLowerCase()
                this.enableSwapLimit = res[12]
                this.maxSwapAmount = ethers.formatUnits(res[13].toString(), Number(this.decimals))
                this.enableWalletLimit = res[14]
                this.maxWalletAmount = ethers.formatUnits(res[15].toString(), Number(this.decimals))
                this.fundAddress = res[16].toLowerCase()
                await this.getTokenFee(tokenAddress)
                // await this.getWhiteList(tokenAddress)
                await this.getRewardTokenInfo(this.rewardToken)
            }).catch(err => {
                console.log(err)
            }).finally(fin => {
                this.loading = false
            })
        },
    },
})

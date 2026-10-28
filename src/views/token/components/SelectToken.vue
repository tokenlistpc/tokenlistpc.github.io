<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import TokenIcon from "@/components/TokenIcon.vue"
import { ElMessage } from 'element-plus'
import { getTokenIcon, getChainIcon, formatAddress, isAddress } from "@/utils"
import { useI18n } from 'vue-i18n'
import { useStore } from "@/store"
import api from "@/api"
import { ethers } from "ethers"

const emit = defineEmits(["select"])
const { t } = useI18n()
const store = useStore()

const search = ref('')
const tokenList = ref([])
const searchTokenList = ref([])

watch(() => [search.value, tokenList.value], async () => {
    searchTokenList.value = await searchTokenListWatch()
})

async function searchTokenListWatch() {
    if (search.value) {
        if (search.value.startsWith("0x")) {
            let result = tokenList.value.filter(x => x.tokenAddress.toLowerCase() == search.value.toLowerCase())
            if (result.length == 0 && isAddress(search.value)) {
                let erc20 = await api.wallet.metamask.contractERC20(search.value)

                const tAddress = search.value.toLowerCase()
                const balance = await erc20.balanceOf(store.walletAddress)
                const decimals = await erc20.decimals()
                const name = await erc20.name()
                const symbol = await erc20.symbol()
                let t = {
                    chain: store.chain,
                    decimals: Number(decimals),
                    name: name,
                    symbol: symbol,
                    tokenAddress: tAddress,
                    currentPriceUsd: 0,
                    value: Number(ethers.formatUnits(balance.toString(), decimals)),
                    icon: `https://ave.s3.ap-east-1.amazonaws.com/token_icon/${store.chain}/${tAddress}.png`,
                }
                console.log(t)

                result.push(t)
            }
            return result
        } else {
            return tokenList.value.filter(x => x.symbol.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
        }
    } else {
        return tokenList.value
    }
}

async function getTokenList() {
    let chain = store.chain
    // let chain = 'bsc'
    let tokens = []
    // tokens.push()
    try {
        let resUserToken = await api.ave.getUserToken(chain, store.walletAddress)
        console.log(resUserToken)
        if (resUserToken.data.status == 1) {
            let resUserTokenData = resUserToken.data.data.filter(x => new RegExp('^0x.*$', 'gi').test(x.token) && x.value > 0 && x.risk_score < 60 && x.risk_level >= 0 && x.flag !== 'blacklist' && x.symbol !== '' && x.flag !== 'lp' && x.token == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee').map(x => {
                return {
                    chain: x.chain,
                    demical: x.decimals,
                    name: x.name,
                    symbol: x.symbol,
                    tokenAddress: x.token.toLowerCase(),
                    currentPriceUsd: x.current_price_usd,
                    value: x.value ? x.value : 0,
                    icon: getTokenIcon(x.chain.toLowerCase(), x.token.toLowerCase())
                }
            })
            tokens = tokens.concat(resUserTokenData)
        } else {
            return
        }
        let resSwapToken = await api.ave.getSwapTokens(chain)
        console.log(resSwapToken)
        if (resSwapToken.data.status == 1) {
            let resSwapTokenData = resSwapToken.data.data.filter(x => new RegExp('^0x.*$', 'gi').test(x.token) && tokens.findIndex(y => y.tokenAddress == x.token) == -1 && x.risk_score < 60 && x.risk_level >= 0 && x.flag !== 'blacklist' && x.symbol !== '' && x.flag !== 'lp' && x.token == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee').map(x => {
                return {
                    chain: x.chain,
                    demical: x.decimals,
                    name: x.name,
                    symbol: x.symbol,
                    tokenAddress: x.token.toLowerCase(),
                    currentPriceUsd: x.current_price_usd,
                    value: x.value ? x.value : 0,
                    icon: getTokenIcon(x.chain.toLowerCase(), x.token.toLowerCase())
                }
            })
            tokens = tokens.concat(resSwapTokenData)
            if (store.currentChain.chain == 'bsc') {
                let resSwapTokenDataBsc = resSwapToken.data.data.filter(x => x.token == '0x55d398326f99059ff775485246999027b3197955' || x.token == '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' || x.token == '0xe9e7cea3dedca5984780bafc599bd69add087d56').map(x => {
                    return {
                        chain: x.chain,
                        demical: x.decimals,
                        name: x.name,
                        symbol: x.symbol,
                        tokenAddress: x.token.toLowerCase(),
                        currentPriceUsd: x.current_price_usd,
                        value: x.value ? x.value : 0,
                        icon: getTokenIcon(x.chain.toLowerCase(), x.token.toLowerCase())
                    }
                })
                tokens = tokens.concat(resSwapTokenDataBsc)
            }
        } else {
            return
        }
    } catch (e) {
        if (e && e.message) {
            ElMessage.error(e.message)
        } else {
            ElMessage.error(t('unknowError'))
        }
        tokens = []
    } finally {
    }
    tokenList.value = tokens
}


getTokenList()
</script>
<template>
    <el-input v-model="search" :placeholder="$t('searchTokenOrName')" />
    <ul class="token-list">
        <li v-for="t in searchTokenList" :key="t.chain" @click="()=>emit('select', t)">
            <div class="item-left">
                <TokenIcon class="token-icon-30" :bigIcon="t.icon" :smallIcon="getChainIcon(t.chain)" />
                <div class="item-info">
                    <div class="up">{{t.symbol}}</div>
                    <div class="down">{{ t.tokenAddress=='0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? "&nbsp;" : formatAddress(t.tokenAddress, 8)}}</div>
                </div>
            </div>
            <div class="item-right item-info">
                <div class="up">{{t.value}}</div>
                <div class="down">{{ t.currentPriceUsd ? `$ ${t.currentPriceUsd}`: "&nbsp;" }}</div>
            </div>
        </li>
    </ul>
</template>

<style scoped lang='scss'>
.token-list {
    margin-top: 20px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 8px;
        border: 1px solid #fff;
        border-radius: 6px;
        cursor: pointer;

        &:not(:last-child) {
            margin-bottom: 10px;
        }

        &:hover {
            border: 1px solid #409eff;
        }

        .item-left {
            display: flex;
            justify-content: flex-start;

            align-items: center;

            .token-icon {
                margin-right: 8px;
            }
        }

        .item-right {
            text-align: right;
        }

        .item-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .up {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 16px;
                font-weight: 400;
                margin-bottom: 2px;
            }

            .down {
                font-size: 12px;
                color: #999999;
                letter-spacing: 0;
                line-height: 16px;
                font-weight: 400;
            }
        }
    }
}
</style>
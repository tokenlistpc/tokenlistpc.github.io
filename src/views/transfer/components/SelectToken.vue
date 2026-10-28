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
            let result = tokenList.value.filter(x => x.address.toLowerCase() == search.value.toLowerCase())
            if (result.length == 0 && isAddress(search.value)) {
                let erc20 = await api.wallet.metamask.contractERC20(search.value)

                const tAddress = search.value.toLowerCase()
                const balance = await erc20.balanceOf(store.walletAddress)
                const decimals = await erc20.decimals()
                const name = await erc20.name()
                const symbol = await erc20.symbol()
                let t = {
                    address: tAddress,
                    tokenId: `${tAddress}-${store.chain}`.toLowerCase(),
                    chain: store.chain,
                    symbol: symbol,
                    decimals: Number(decimals),
                    icon: `https://ave.s3.ap-east-1.amazonaws.com/token_icon/${store.chain}/${tAddress}.png`,
                    amount: Number(ethers.formatUnits(balance.toString(), decimals)),
                    name: name,
                    price: 0,
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
    if (!store.isConnecting) {
        ElMessage.error(t('connectWalletWarn'))
        return
    }
    try {
        const res = await api.debank.getTokenList(store.walletAddress, store.chain)
        let debankTokenList = []
        for (let x of res.data.data) {
            if (x.token == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                x.token = api.wallet.MAIN_COIN_ADDRESS
            }
            if (new RegExp('^0x.*$', 'gi').test(x.token) && x.value > 0 && x.risk_score < 60 && x.risk_level >= 0 && x.flag !== 'blacklist' && x.symbol !== '' && x.flag !== 'lp') {
                debankTokenList.push({
                    address: x.token.toLowerCase(),
                    tokenId: `${x.token}-${x.chain}`.toLowerCase(),
                    chain: x.chain.toLowerCase(),
                    symbol: x.symbol,
                    decimals: x.decimals,
                    icon: getTokenIcon(x.chain.toLowerCase(), x.token.toLowerCase()),
                    amount: x.value,
                    price: x.current_price_usd
                })
            }
        }
        tokenList.value = debankTokenList
    } catch (e) {
        if (e && e.message) {
            ElMessage.error(e.message)
        } else {
            ElMessage.error(t('unknowError'))
        }
    } finally {
    }
}


getTokenList()
</script>
<template>
    <el-input v-model="search" :placeholder="$t('pleaseEnterTokenAddress')" />
    <ul class="token-list">
        <li v-for="t in searchTokenList" :key="t" @click="()=>emit('select', t)">
            <div class="item-left">
                <TokenIcon class="token-icon-30" :bigIcon="t.icon" :smallIcon="getChainIcon(t.chain)" />
                <div class="item-info">
                    <div class="up">{{ t.symbol }}</div>
                    <div class="down">{{ t.address == api.wallet.MAIN_COIN_ADDRESS ? "&nbsp;" :
                        formatAddress(t.address, 8) }}</div>
                </div>
            </div>
            <div class="item-right item-info">
                <div class="up">{{ t.amount }}</div>
                <div class="down">{{ t.price ? `$ ${t.price}` : "&nbsp;" }}</div>
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
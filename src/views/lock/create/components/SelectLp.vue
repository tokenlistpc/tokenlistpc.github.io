<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import TokenIcon from "@/components/TokenIcon.vue"
import { ElMessage } from 'element-plus'
import { getTokenIcon, getChainIcon, formatAddress, isAddress } from "@/utils"
import { useI18n } from 'vue-i18n'
import { useStore } from "@/store"
import api from "@/api"
import { ethers } from "ethers"
import cfg from "@/config"
import DoubleToken from "@/components/DoubleToken.vue"

const emit = defineEmits(["select"])
const { t } = useI18n()
const store = useStore()
const lpList = ref([])

const search = ref('')
const searchTokenList = ref([])


watch(() => [search.value, lpList.value], async () => {
    searchTokenList.value = await searchTokenListWatch()
})

const networkList = cfg.chainList.filter(x => !!x.lock)
const network = ref(networkList.find(x => x.chainId == store.chainId) ? networkList.find(x => x.chainId == store.chainId) : networkList[0])


async function searchTokenListWatch() {
    if (search.value) {
        if (search.value.startsWith("0x")) {
            return lpList.value.filter(x => x.address.toLowerCase() == search.value.toLowerCase())
        } else {
            return lpList.value.filter(x => x.symbol.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
        }
    } else {
        return lpList.value
    }
}

async function getTokenList() {
    let tokens = []
    try {
        const res = await api.debank.getTokenList(store.walletAddress, network.value.chain)
        for (let x of res.data.data) {
            if (x.token == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                x.token = api.wallet.MAIN_COIN_ADDRESS
                continue
            }
            if (new RegExp('^0x.*$', 'gi').test(x.token) && x.value > 0 && x.risk_score < 60 && x.risk_level >= 0 && x.flag !== 'blacklist' && x.symbol !== '') {
                if (x.token == '0xc748673057861a797275cd8a068abb95a902e8de') {
                    continue
                }
                if (x.flag == 'lp') {
                    tokens.push({
                        tokenList: [
                            {
                                address: "",
                                symbol: "",
                            },
                            {
                                address: "",
                                symbol: "",
                            }
                        ],
                        symbol: "",
                        address: x.token.toLowerCase(),
                        tokenId: `${x.token}-${x.chain}`.toLowerCase(),
                        chain: x.chain.toLowerCase(),
                        decimals: x.decimals,
                        amount: x.value,
                        price: x.current_price_usd,
                        hasTokenInfo: false,
                        tokenType: 1,
                        nativeCurrencySymbol: network.value.nativeCurrency.symbol,
                        name: x.name
                    })
                }
            }
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
    lpList.value = tokens
    getLpListDetial()
}


getTokenList()

async function getLpListDetial() {
    if (lpList.value.length == 0) {
        return
    }
    if (network.value.chainId != store.chainId) {
        ElMessage.error(t('switchTrueChain', { cahin: network.value.chain }))
        lpList.value = []
        return
    }

    for (let x of lpList.value) {
        if (x.hasTokenInfo == false) {
            let t = await api.wallet.metamask.contractLP(x.address)
            let tAddress0 = await t.token0()
            let token0 = await api.wallet.metamask.contractERC20(tAddress0)
            let tSymbol0 = await token0.symbol()
            let tAddress1 = await t.token1()
            let token1 = await api.wallet.metamask.contractERC20(tAddress1)
            let tSymbol1 = await token1.symbol()

            x.tokenList[0] = {
                symbol: tSymbol0.toUpperCase(),
                address: tAddress0.toLowerCase()
            }
            x.tokenList[1] = {
                symbol: tSymbol1.toUpperCase(),
                address: tAddress1.toLowerCase()
            }
            x.symbol = `${tSymbol0}/${tSymbol1}`
        }
    }
}

async function networkClick(n) {
    if (store.isConnecting && store.walletType == "metamask") {
        if (network.value.chain != n.chain) {
            await api.wallet.metamask.switchNetwork(n.chainId)
        }
    }
}

</script>
<template>
    <el-input v-model="search" placeholder="Please input" />
    <!-- <div class="network">
        <ul class="network-list">
            <li v-for="item in networkList" :class="network.chain == item.chain ? 'network-selected' : ''"
                @click="networkClick(item)"> {{ item.chain.toUpperCase() }}</li>
        </ul>
    </div> -->
    <ul class="token-list">
        <li v-for="t in searchTokenList" :key="t" @click="() => emit('select', t)">
            <div class="item-left">
                <DoubleToken class="token-icon-30" :token1="getTokenIcon(t.chain, t.tokenList[0].address)" :token2="getTokenIcon(t.chain, t.tokenList[1].address)"></DoubleToken>
                <div class="item-info">
                    <div class="up">{{ t.symbol.toUpperCase() }}</div>
                    <div class="down">{{ t.address == api.wallet.MAIN_COIN_ADDRESS ? "&nbsp;" : formatAddress(t.address, 8)
                    }}
                    </div>
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
.network {
    margin-top: 12px;
    overflow: hidden;

    .network-list {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: 0;
        box-sizing: content-box;

        // &::-webkit-scrollbar {
        //     display: none;
        // }

        &::-webkit-scrollbar {
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: #cfcfcf;
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: #bbb;
        }

        li {
            background: #f5f5f5;
            border-radius: 4px;

            margin-bottom: 5px;

            white-space: nowrap;
            cursor: pointer;

            padding: 8px 12px;

            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            font-weight: 400;

            &:not(:last-child) {
                margin-right: 12px;
            }
        }

        .network-selected {
            background-image: linear-gradient(270deg, #0096ff 0%, #01d5fe 100%);
            color: #fff;
        }
    }
}

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
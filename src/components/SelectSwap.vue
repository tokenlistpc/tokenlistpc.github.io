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
const swapList = ref([])

async function getSwapList() {
    let chain = store.chain
    let swaps = []
    try {
        let res = await api.ave.getChainSwaps(chain)
        if (res.data.status == 1) {
            let resData = res.data.data
            if (resData && resData.length > 0) {
                for (let item of resData) {
                    let swapIcon = "https://www.avestorage.cloud/swap/" + item.name + ".jpeg"
                    let chainSwap = {
                        chain: item.chain,
                        factoryAddress: item.factory_address.toLowerCase(),
                        isSwapSupported: item.is_swap_supported,
                        name: item.name,
                        routerAddress: item.router_address.toLowerCase(),
                        showName: item.show_name,
                        sortId: item.sort_id,
                        swapUrl: item.swap_url,
                        swapIcon: swapIcon
                    }
                    swaps.push(chainSwap)
                }
            }
        } else {
            ElMessage.error(t('unknowError'))
        }
    } catch (e) {
        if (e && e.message) {
            ElMessage.error(e.message)
        } else {
            ElMessage.error(t('unknowError'))
        }
    } finally {
    }
    swapList.value = swaps
}


getSwapList()
</script>
<template>
    <ul class="token-list">
        <li v-for="s in swapList" :key="s" @click="()=>emit('select', s)">
            <icon-text :icon="s.swapIcon" :text="s.showName"></icon-text>
        </li>
    </ul>
</template>

<style scoped lang='scss'>
.token-list {
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
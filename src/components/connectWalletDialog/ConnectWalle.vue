<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import cfg from "@/config"
import { useStore } from "@/store"

const store = useStore()
const emit = defineEmits(["connect-wallet-click"])

const selectedWallet = ref("")

const walletList = reactive([
    {
        key: "metamask",
        name: "Metamask",
        icon: "/images/metamask.svg",
    }
])

function selectChainClick(chain) {
    store.selectedChain = chain
    store.isTestChain = chain.isTestChain
}

function selectWalletClick(key) {
    selectedWallet.value = key
}

watch(
    () => [store.selectedChain, selectedWallet.value],
    () => {
        console.log("watch")
        if (store.selectedChain && selectedWallet.value) {
            emit("connect-wallet-click", selectedWallet.value, store.selectedChain)
        }
    },
)



</script>
<template>
    <div class="connect-wallet-item">
        <div class="title">选择主网</div>
        <ul class="value">
            <li v-for="chain in cfg.chainList.filter(x => x.isTestChain == false)" :key="chain.chainId"
                @click="selectChainClick(chain)">
                <div class="image">
                    <img :src="chain.chainIcon" alt="">
                    <div class="selected" v-show="store.selectedChain && store.selectedChain.chainId == chain.chainId">
                    </div>
                </div>
                <div class="text">{{ chain.chainShow }}</div>
            </li>
        </ul>
        <div class="title">选择测试网</div>
        <ul class="value">
            <li v-for="chain in cfg.chainList.filter(x => x.isTestChain == true)" :key="chain.chainId"
                @click="selectChainClick(chain)">
                <div class="image">
                    <img :src="chain.chainIcon" alt="">
                    <div class="selected" v-show="store.selectedChain && store.selectedChain.chainId == chain.chainId">
                    </div>
                </div>
                <div class="text">{{ chain.chainShow }}</div>
            </li>
        </ul>
    </div>
    <div class="connect-wallet-item">
        <div class="title">选择钱包</div>
        <ul class="value">
            <li v-for="wallet in walletList" :key="wallet.name" @click="selectWalletClick(wallet.key)">
                <div class="image">
                    <img :src="wallet.icon" alt="">
                    <div class="selected" v-show="wallet.key == selectedWallet"></div>
                </div>
                <div class="text">{{ wallet.name }}</div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang='scss'>
.connect-wallet-item {
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: 500;
    }

    .value {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 95px);
        grid-gap: 10px;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            border-radius: 6px;
            border: 1px solid transparent;
            padding: 10px 0;
            width: 95px;
            cursor: pointer;

            &:hover {
                border: 1px solid rgb(161, 217, 255);
                background-color: #f9fbff;
            }

            .image {
                width: 60px;
                height: 60px;

                margin-bottom: 6px;
                position: relative;

                img {
                    width: 60px;
                    border-radius: 50%;
                }

                .selected {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #23af7c;
                    border: 2px solid #ffffff;

                    &::after {
                        position: absolute;

                        content: "";
                        height: 8px;
                        width: 4px;

                        // background-color: red;

                        // display: block;
                        // box-sizing: content-box;
                        content: "";
                        border: 2px solid #fff;
                        border-left: 0;
                        border-top: 0;

                        right: 6px;
                        bottom: 6px;

                        transform-origin: center;
                        transform: rotate(45deg);
                        transition: transform 0.1s ease-in 0.05s;
                    }
                }
            }

            .text {
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 16px;
                font-weight: 500;
            }
        }
    }

}
</style>
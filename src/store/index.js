import { defineStore } from "pinia"
import storage from "good-storage"
import i18n from "@/lang"
import cfg from "@/config"
import { hex2Int } from "@/utils"
import api from "@/api"


export const useStore = defineStore("main", {
    state: () => {
        return {
            isConnecting: false,
            isTestChain: false,
            chainId: 0,
            chain: "",
            chainIcon: "",
            txBlockExplorerUrl: "",
            nativeCurrencySymbol: "",
            walletType: "",
            walletAddress: "",
            create: null,
            lock: null,
            transfer: null,
            language: i18n.global.locale,
            loginDialogVisible: false,

            currentChain: null,
            selectedChain: null,
        }
    },
    actions: {
        setLanguage(language) {
            this.language = language
            storage.set("language", language)
            i18n.locale = language
        },
        connectWallet(walletType, walletAddress, chain) {
            if (!chain) {
                // 未支持的网络
                this.chainId = 0
                this.chain = ""
                this.chainIcon = ""
                this.txBlockExplorerUrl = ""
                this.nativeCurrencySymbol = ""
                this.create = null
                this.lock = null
                this.transfer = null
                this.currentChain = null
                this.isTestChain = false
            } else {
                this.chainId = chain.chainId
                this.chain = chain.chain
                this.chainIcon = chain.chainIcon
                this.txBlockExplorerUrl = chain.txBlockExplorerUrl
                this.nativeCurrencySymbol = chain.nativeCurrency.symbol
                this.create = chain.create
                this.lock = chain.lock
                this.transfer = chain.transfer
                this.currentChain = chain
                this.isTestChain = chain.isTestChain
            }
            this.walletType = walletType
            this.walletAddress = walletAddress
            this.isConnecting = true
        },
        disconnectWallet() {
            this.chainId = 0
            this.chain = ""
            this.chainIcon = ""
            this.txBlockExplorerUrl = ""
            this.nativeCurrencySymbol = ""
            this.create = null
            this.lock = null
            this.transfer = null

            this.walletType = ""
            this.walletAddress = ""
            this.isConnecting = false

            this.currentChain = null
            this.isTestChain = false


            if (this.selectedChain == null) {
                this.selectedChain = cfg.chainList[0]
            }
        },
        async changeSelectedChain(chain) {
            console.log("changeSelectedChain", chain)

            console.log(this.isConnecting)
            console.log(this.walletType)

            if (this.isConnecting && this.walletType == "metamask") {
                console.log(this.chainId)
                if (this.chainId != chain.chainId) {
                    await api.wallet.metamask.switchNetwork(chain)
                }
            }
            this.selectedChain = chain
            this.isTestChain = chain.isTestChain
        }
    },
    persist: {
        enabled: true
    }
})
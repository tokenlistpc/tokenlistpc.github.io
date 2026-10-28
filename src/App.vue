<script setup>
import './style.scss'
import { computed, inject, watch, ref, unref, reactive, onMounted } from 'vue'
import { useStore } from "@/store"
import { useConfigStore } from "@/store/config"
import { useI18n } from 'vue-i18n'
import Rate from "@/components/Rate.vue"
import api from "@/api"
import { ElMessage, ElMessageBox, ElNotification, ClickOutside as vClickOutside } from 'element-plus'

import { formatAddress, hex2Int } from "@/utils"
import IconText from "@/components/IconText.vue"
import cfg from "@/config"
import { useRoute, useRouter } from 'vue-router';
import ConnectWalletDialog from './components/connectWalletDialog/Index.vue'

const route = useRoute();
const router = useRouter()
const { t } = useI18n()
const store = useStore()
const configStore = useConfigStore()
const isCollapse = ref(false)
const defaultActive = ref('/token/create')

const chainList = computed(() => {
    return cfg.chainList.filter(x => x.isTestChain == store.isTestChain)
})

// -----------------------------------Language-----------------------------------

const languageList = computed(() => {
    return [
        { name: t('languages.zh-cn'), value: 'zh-cn', color: store.language === 'zh-cn' ? '#3F80F7' : '#323233' },
        { name: t('languages.en'), value: 'en', color: store.language === 'en' ? '#3F80F7' : '#323233' },
    ]
})
const languageVisible = ref(false)
const chainSelectVisible = ref(false)
const popoverRef = ref()


const onClickOutside = (e) => {
    if (chainSelectVisible.value) {
        chainSelectVisible.value = false;
    }
    if (languageVisible.value) {
        languageVisible.value = false;
    }
}



// 选择语言
function onSelectLanguage(item) {
    store.setLanguage(item.value)
    languageVisible.value = false
}
// -----------------------------------Language-----------------------------------

function toggle() {
    isCollapse.value = !isCollapse.value
}

const mintDialogVisible = ref(false)
const rateDialogVisible = ref(false)
const whiteListDialogVisible = ref(false)


// mintDialogVisible.value = true
// rateDialogVisible.value = true
// whiteListDialogVisible.value = true


// -----------------------------------ConnectWallet-----------------------------------
function connectWalletClick() {
    configStore.loginDialogVisible = true
}

function connectWallet(walletType, chain) {
    if (walletType == "metamask") {
        connectMetamsk(chain)
    }
}

async function connectMetamsk(chain) {
    if (!api.wallet.metamask.hasMetamask()) {
        ElMessage.error("your have no metamask")
        return
    }

    console.log("connectMetamsk")

    let chainId
    try {
        let walletAddress = await api.wallet.metamask.connect()
        // 开启监听
        openMetamaskListener()
        chainId = await api.wallet.metamask.getChainId()
        let currentChain = cfg.chainList.find(x => x.chainId == chainId)
        if (currentChain) {
            store.selectedChain = currentChain
            store.isTestChain = currentChain.isTestChain
            await store.connectWallet("metamask", walletAddress, currentChain)
        } else {
            store.selectedChain = null
            store.isTestChain = false
            await store.connectWallet("metamask", walletAddress, null)
        }

    } catch (e) {
        console.log(e)
        const msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
        await disconnectWalletClick()
        return
    }

    if (chain.chainId != chainId) {
        try {
            await store.changeSelectedChain(chain)
        } catch (e) {
            console.log(e)
            const msg = api.wallet.metamask.parseError(e)
            ElMessage.error(t(msg))
        }
    }
}

async function disconnectWalletClick() {
    if (store.wallet == "metamask") {
        window.ethereum.on('chainChanged', () => { })
        window.ethereum.on('accountsChanged', () => { })
    }
    await store.disconnectWallet()
}

async function init() {
    console.log("init", store.isConnecting, store.walletType)
    if (store.isConnecting && store.walletType == "metamask") {
        let accounts = await api.wallet.metamask.getConnectAccounts()
        if (accounts.length > 0) {
            // 开启监听
            openMetamaskListener()
            let chainId = await api.wallet.metamask.getChainId()
            let chain = cfg.chainList.find(x => x.chainId == chainId)
            if (chain) {
                store.selectedChain = chain
                await store.connectWallet("metamask", accounts[0], chain)
            } else {
                store.selectedChain = null
                await store.connectWallet("metamask", accounts[0], null)
            }
        } else {
            await disconnectWalletClick()
        }
    }
}

init()
function openMetamaskListener() {
    window.ethereum.on('chainChanged', (chainIdHex) => {
        window.location.reload()
    })

    window.ethereum.on('accountsChanged', (accounts) => {
        // console.log("accountsChanged", accounts)
        window.location.reload()
        // store.walletAddress = accounts[0]
    })
}
// -----------------------------------ConnectWallet-----------------------------------

// -----------------------------------watch chain ------------------------------------
function getSupportChains(type) {
    // let name
    // if (type == 'token') {
    //     name = 'create'
    // } else {
    //     name = type
    // }
    // let chains = cfg.chainList.filter(x => {
    //     return x[name]
    // })
    let chains = cfg.chainList
    return chains.map(x => x.chainShow)
}

watch(
    () => [store.isConnecting, route.path, store.create],
    (value) => {
        if (store.isConnecting && !store.selectedChain) {
            // let url = route.path
            let chains = getSupportChains()
            // if (url.startsWith('/token')) {
            //     chains = getSupportChains('token')
            // } else if (url.startsWith('/lock')) {
            //     chains = getSupportChains('lock')
            // }
            if (chains.length == 0) {
                return
            }
            ElMessageBox.alert(t('notSupportedChain') + t('pleaseSwitchTo', { chains: chains.join(', ') }), '', {
                // if you want to disable its autofocus
                autofocus: false,
                confirmButtonText: t('understand'),
                callback: (action) => {

                },
            })
        }
    },
)


function jump(url) {
    window.open(url)
}


async function onSelectChain(chain) {
    chainSelectVisible.value = false
    try {
        await store.changeSelectedChain(chain)
    } catch (e) {
        console.log(e)
        const msg = api.wallet.metamask.parseError(e)
        ElMessage.error(t(msg))
    }
}

console.dir(cfg.chainList)

// 关闭 popover
</script>

<template>
    <el-container class="container">
        <el-header class="header">

            <div class="header-left">
                <svg-icon name="menu" class="icon-menu" @click="toggle" />
                <div>
                    <img class="logo" src="@/assets/imgs/logo.png">
                </div>
            </div>
            <div class="header-right">
                <el-popover :visible="chainSelectVisible" placement="bottom" ref="popoverRef" :width="120" trigger="click">
                    <template #reference>
                        <div class="select-chain" v-click-outside="onClickOutside" @click="chainSelectVisible = !chainSelectVisible">
                            <template v-if="store.selectedChain">
                                <icon-text :icon="store.selectedChain.chainIcon" :text="store.selectedChain.chainShow"></icon-text>
                            </template>
                            <template v-else>
                                <div style="line-height:14px;font-size:14px;color:#ce3e3e">{{ $t('notSupport') }}</div>
                            </template>
                            <div class="arrow" :class="{
                                'arrow-selected': chainSelectVisible
                            }"></div>
                        </div>
                    </template>
                    <ul class="chain-list">
                        <li class="active" v-for="c in chainList" :key="c.chainId" @click="onSelectChain(c)">
                            <icon-text :icon="c.chainIcon" :text="c.chainShow"></icon-text>
                        </li>
                    </ul>
                </el-popover>
                <template v-if="store.isConnecting">
                    <el-popover placement="bottom" :width="188" trigger="click">
                        <template #reference>
                            <div class="address">{{ formatAddress(store.walletAddress) }}</div>
                        </template>
                        <div class="address-popover">
                            <div class="title">{{ $t('myWallet') }}</div>
                            <IconText class="address" :icon="store.chainIcon" :text="formatAddress(store.walletAddress)" />
                            <div class="logout" @click="disconnectWalletClick">
                                <svg-icon name="logout"></svg-icon>
                                <div>{{ $t('logout') }}</div>
                            </div>
                        </div>
                    </el-popover>
                </template>
                <template v-else>
                    <el-button type="primary" class="connect-wallet btn-gradient" @click="connectWalletClick">{{
                        $t('connectWallet') }}</el-button>
                </template>
                <el-popover :visible="languageVisible" placement="bottom" :width="60" trigger="click">
                    <template #reference>
                        <svg-icon name="language" class="icon-language" v-click-outside="onClickOutside" @click="languageVisible = !languageVisible" />
                    </template>
                    <ul class="language-list">
                        <li class="active" v-for="l  in  languageList" :key="l.value" @click="() => onSelectLanguage(l)">{{
                            l.name }}
                        </li>
                    </ul>
                </el-popover>
            </div>
        </el-header>
        <el-container class="container-son">
            <el-aside class="aside" :width="isCollapse ? '64px' : '280px'">
                <el-menu :default-active="route.path" :collapse="isCollapse" router class="menu" :collapse-transition="false">
                    <el-menu-item index="/token/create">
                        <el-icon><svg-icon name="createTokenGrey" class="menu-icon" /></el-icon>
                        <span class="text">{{ $t('menuCreateToken') }}</span>
                    </el-menu-item>
                    <el-menu-item @click="jump('https://aveliquidity.github.io/')">
                        <el-icon><svg-icon name="liquidityGrey" class="menu-icon" /></el-icon>
                        <span class="text">{{ $t('menuLiquidity') }}</span>
                    </el-menu-item>
                    <el-sub-menu index="/lock">
                        <template #title>
                            <el-icon><svg-icon name="lockGrey" class="menu-icon" /></el-icon>
                            <span class="text">{{ $t('menuLock') }}</span>
                        </template>
                        <el-menu-item index="/lock/create/token"><span class="text">{{ $t('oneKeyLock')
                        }}</span></el-menu-item>
                        <el-menu-item index="/lock/list/token"><span class="text">{{ $t('menuTokenLock')
                        }}</span></el-menu-item>
                        <el-menu-item index="/lock/list/lpToken"><span class="text">{{ $t('menuLPLock')
                        }}</span></el-menu-item>
                        <el-menu-item index="/lock/list/lpTokenV3"><span class="text">{{ $t('menuUniV3Lock')
                        }}</span></el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="/transfer/multi">
                        <el-icon><svg-icon name="multitransferGrey" class="menu-icon" /></el-icon>
                        <span class="text">{{ $t('menuMultitransfer') }}</span>
                    </el-menu-item>
                    <div class="more" :class="isCollapse ? 'collapse' : ''">
                        <el-tooltip class="box-item" effect="dark" :content="$t('contactBusiness')" placement="top">
                            <svg-icon name="tgBlue" @click="jump('https://t.me/wellgg143')" />
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" :content="$t('communityChannel')" placement="top">
                            <svg-icon name="tgBlue" @click="jump('https://t.me/tokenlist_app')" />
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="Twitter" placement="top">
                            <svg-icon name="twitterBlue" @click="jump('https://twitter.com/tokenlistapp')" />
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" :content="$t('documentation')" placement="top">
                            <div class="doc-icon" @click="jump('https://docs.tokenlist.app')">
                                <svg-icon name="doc" />
                            </div>
                        </el-tooltip>
                    </div>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <!-- <el-alert class="notice" :title="$t('notice1')" type="error" v-if="route.path=='/token/create'"/> -->
                <div class="main-body">
                    <router-view></router-view>
                </div>
                <div class="main-footer">
                    {{ $t('Disclaimer') }}
                </div>
            </el-main>
        </el-container>
    </el-container>

    <ConnectWalletDialog v-model="configStore.loginDialogVisible" @connect-wallet-click="connectWallet">
    </ConnectWalletDialog>
    <!-- <el-dialog v-model="configStore.loginDialogVisible" :title="$t('connectWallet')" class="dlg dlg-login">
        <div class="login-item" @click="connectMetamskClick">
            <div class="image">
                <img src="@/assets/imgs/metamask.png" alt="">
            </div>
            <div class="text">Metamask</div>
        </div>
    </el-dialog> -->
</template>
<style lang="scss">
.address-popover {
    padding: 8px 16px;

    .title {
        margin-top: 4px;
        margin-bottom: 10px;
        margin-left: 6px;

        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        font-weight: 400;
    }

    .address {
        margin-bottom: 10px;
        margin-left: 6px;
    }

    .logout {
        padding: 4px 6px;
        cursor: pointer;
        border-radius: 6px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
        display: flex;
        align-items: center;

        &:hover {
            background: #f5f5f5;
        }

        .svg-icon {
            width: 20px;
            height: 20px;
        }
    }
}

.el-popover.el-popper {
    min-width: 100px;
    padding: 0;
}

.chain-list {
    margin: 6px 0;

    li {
        cursor: pointer;
        padding: 6px 12px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
        text-align: center;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            background: #eff9ff;
            color: #01a7ff;
        }
    }
}

.language-list {
    margin: 6px 0;

    li {
        cursor: pointer;
        padding: 6px 0;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
        text-align: center;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            background: #eff9ff;
            color: #01a7ff;
        }
    }
}
.menu {
    .el-menu--collapse {
        width: 100px;
    }
}
</style>

<style scoped lang='scss'>
.container {
    background-color: #f9f9f9;
    height: 100vh;
    min-width: 1200px;

    .header {
        height: 72px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 24px;

        .header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .icon-menu {
                cursor: pointer;
                width: 36px;
                height: 36px;
                margin-right: 20px;
            }

            .logo {
                width: 160px;
            }
        }

        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .select-chain {
                cursor: pointer;
                // width: 100px;
                height: 32px;
                padding: 0 12px;
                margin-right: 20px;

                border-radius: 4px;

                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f5f5f5;

                &:hover {
                    background-color: #eff9ff;
                }

                .arrow {
                    margin-left: 26px;
                    position: relative;
                    // width: 10px;
                    // height: 10px;
                    // background-color: red;
                    flex-shrink: 0;
                }

                .arrow::after {
                    content: "";
                    position: absolute;
                    box-sizing: border-box;

                    // background-color: red;
                    top: -6px;
                    left: -14px;
                    width: 8px;
                    height: 8px;
                    border: 1px solid #00a5ff;
                    border-top: none;
                    border-left: none;

                    transform-origin: 6px 6px 0;
                    transform: rotate(45deg);
                    transition: transform 0.1s ease-in 0.05s;
                }

                .arrow-selected::after {
                    transform: rotate(-135deg);
                }
            }

            .address {
                height: 32px;
                padding: 0 12px;
                line-height: 14px;
                background: #f5f5f5;
                border-radius: 4px;
                cursor: pointer;

                display: flex;
                align-items: center;
            }

            .connect-wallet {
                width: 110px;
                height: 30px;
            }

            .icon-language {
                cursor: pointer;
                outline: none;
                width: 26px;
                height: 26px;
                margin-left: 20px;
            }
        }
    }

    .container-son {
        overflow-y: hidden;
    }

    .aside {
        display: flex;
        flex-direction: column;
    }

    .menu {
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
        overflow-y: auto;
        overflow-x: hidden;

        .menu-icon {
            width: 20px;
            height: 20px;
        }

        .more {
            display: flex;
            justify-content: space-between;
            width: 100%;
            box-sizing: border-box;
            padding: 30px 20px;
            margin-top: auto;

            .svg-icon {
                cursor: pointer;
                width: 30px;

                height: 30px;
            }

            .doc-icon {
                cursor: pointer;
                background: #000;
                width: 30px;
                height: 30px;
                border-radius: 50%;

                .svg-icon {
                    padding: 5px;
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .more.collapse {
            flex-direction: column;

            .svg-icon {
                margin-bottom: 20px;
            }
        }
    }

    .main {
        overflow-y: scroll;

        .notice {
            margin-bottom: 20px;
        }

        .main-body {
            background: #ffffff;
            border-radius: 4px;
            padding: 24px;
        }

        .main-footer {
            margin-top: 20px;
            font-size: 14px;
            color: #333333;
            text-align: center;
            font-weight: 400;
        }
    }

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #cfcfcf;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #bbb;
    }
}
</style>

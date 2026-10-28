<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { getChainIcon, getTokenIcon, isExpired, diffDay, formatAddress, numFormat } from "@/utils"
import Back from '@/components/Back.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import TokenName from '@/components/TokenName.vue'
import CopyText from '@/components/CopyText.vue'
import IconText from '@/components/IconText.vue'
import Mint from './components/Mint.vue'
import { useI18n } from 'vue-i18n'
import EditTax from './components/EditTax.vue'
import WhiteList from './components/WhiteList.vue'
import api from "@/api"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store';
import BigNumber from "bignumber.js"
import { useCtManageStore } from '@/store/create/manage.js';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import TransferOwnership from './components/TransferOwnership.vue'
import EditMaxSwapAmount from './components/EditMaxSwapAmount.vue'
import EditMaxWalletAmount from './components/EditMaxWalletAmount.vue'
import EditFundAddress from './components/EditFundAddress.vue'

import cfg from "@/config"


const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()
const manageStore = useCtManageStore()
const mintDialogVisible = ref(false)
const switchLoading = ref(false)
const whiteListDialogVisible = ref(false)

const disableSwapLoading = ref(false)
const editMaxSwapAmountVisible = ref(false)
const disableWalletLoading = ref(false)
const editMaxWalletAmountVisible = ref(false)
const editFundAddressVisible = ref(false)

const rateDialogVisible = ref(false)
const transferOwnerDialogVisible = ref(false)
const showRenounceOwnershipSuccess = ref(false)
const txHash = ref('')
let deployerId = route.params.deployerId
let chain = route.params.chain
let tokenAddress = route.params.tokenAddress

const isOwner = computed(() => {
    return store.walletAddress.toLowerCase() === manageStore.owner.toLowerCase()
})

if (deployerId != manageStore.deployerId || tokenAddress != manageStore.tokenAddress) {
    manageStore.$reset()
    manageStore.init(route.params.deployerId, route.params.tokenAddress)
    getTokenInfo()
}
const buyFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return BigNumber(manageStore.buyFundFee).plus(manageStore.buyLPFee).plus(manageStore.buyBurnFee)
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7 || manageStore.deployerId == 8) {
        return BigNumber(manageStore.buyFundFee).plus(manageStore.buyLPFee).plus(manageStore.buyRewardFee)
    } else if (manageStore.deployerId == 4) {
        return BigNumber(manageStore.buyFundFee).plus(manageStore.buyLPFee).plus(manageStore.buyRewardFee).plus(manageStore.buyBurnFee)
    }

})

const sellFee = computed(() => {
    if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        return BigNumber(manageStore.sellFundFee).plus(manageStore.sellLPFee).plus(manageStore.sellBurnFee)
    } else if (manageStore.deployerId == 2 || manageStore.deployerId == 3||manageStore.deployerId == 7 || manageStore.deployerId == 8) {
        return BigNumber(manageStore.sellFundFee).plus(manageStore.sellLPFee).plus(manageStore.sellRewardFee)
    } else if (manageStore.deployerId == 4) {
        return BigNumber(manageStore.sellFundFee).plus(manageStore.sellLPFee).plus(manageStore.sellRewardFee).plus(manageStore.sellBurnFee)
    }

})
async function getTokenInfo() {
    if (manageStore.deployerId == 0||manageStore.deployerId == 5) {
        await manageStore.getFreeTaxTokenInfo(manageStore.tokenAddress)
    } else if (manageStore.deployerId == 1||manageStore.deployerId == 6) {
        await manageStore.getFeeTokenInfo(manageStore.tokenAddress)
    } else if (manageStore.deployerId == 2||manageStore.deployerId == 7) {
        await manageStore.getDividendSelfTokenInfo(manageStore.tokenAddress)
    } else if (manageStore.deployerId == 3||manageStore.deployerId == 8) {
        await manageStore.getAddPoolDividendTokenInfo(manageStore.tokenAddress)
    }else if (manageStore.deployerId == 4) {
        await manageStore.getDividendTokenInfo(manageStore.tokenAddress)
    }
}

// 开启交易
async function startTrade() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (switchLoading.value) {
        return
    }
    if (!isOwner.value) {
        ElMessage.error(t('notHolder'))
        return
    }
    if (!manageStore.tradeStart) {
        switchLoading.value = true
        try {
            const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
            let res
            if (manageStore.deployerId != 4) {
                res = await tokenContract.startTrade()
            } else { 
                res = await tokenContract.launch()
            }
            await res.wait()
            ElMessage.success(t('tradeOpening'))
            manageStore.tradeStart = true
        } catch (e) {
            console.log(e.info)
            const err = api.wallet.metamask.parseError(e)
            ElMessage.error(t(err))
        } finally {
            switchLoading.value = false
        }
    }
}

// 关闭交易限制
async function disableSwapLimit() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (disableSwapLoading.value) {
        return
    }
    if (!isOwner.value) {
        ElMessage.error(t('notHolder'))
        return
    }
    if (manageStore.enableSwapLimit) {
        disableSwapLoading.value = true
        try {
            const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
            const res = await tokenContract.disableSwapLimit()
            await res.wait()
            ElMessage.success(t('closeSwapLimit'))
            manageStore.enableSwapLimit = false
            manageStore.maxSwapAmount = 0
        } catch (e) {
            console.log(e.info)
            const err = api.wallet.metamask.parseError(e)
            ElMessage.error(t(err))
        } finally {
            disableSwapLoading.value = false
        }
    }
}

// 关闭最大持币限制
async function disableWalletLimit() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    if (disableWalletLoading.value) {
        return
    }
    if (!isOwner.value) {
        ElMessage.error(t('notHolder'))
        return
    }
    if (manageStore.enableWalletLimit) {
        disableWalletLoading.value = true
        try {
            const tokenContract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
            const res = await tokenContract.disableWalletLimit()
            await res.wait()
            ElMessage.success(t('closeWalletLimit'))
            manageStore.enableWalletLimit = false
            manageStore.maxWalletAmount = 0
        } catch (e) {
            console.log(e.info)
            const err = api.wallet.metamask.parseError(e)
            ElMessage.error(t(err))
        } finally {
            disableWalletLoading.value = false
        }
    }
}

function giveUpOwner() {
    ElMessageBox.confirm(
        t('giveUpConfirmInfo'),
        '',
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('thinkAgain'),
            type: 'warning',
            autofocus: false,
            beforeClose: async (action, instance, done) => {
                instance.confirmButtonLoading = true
                if (action == 'confirm') {
                    await renounceOwnershipConfirmClick()
                }
                instance.confirmButtonLoading = false
                done()
            },
        },
    )
        .then(() => {

        })
        .catch(() => {

        })
}

// 放弃权限
async function renounceOwnershipConfirmClick() {
    if (!store.isConnecting) {
        ElMessage.error(t('pleaseConnectWallet'))
        return
    }
    try {
        const contract = await api.wallet.metamask.contract(manageStore.tokenAddress, manageStore.abi)
        let res = await contract.renounceOwnership()
        txHash.value = res.hash
        showRenounceOwnershipSuccess.value = true
        res.wait().then(async (data) => {
            if (data.status === 1) {
                ElMessage.success(t('upChainSuccessfully'))
                manageStore.owner = await contract.owner()
            }
        })
    } catch (e) {
        const err = api.wallet.metamask.parseError(e)
        ElMessage.error(t(err))
    } finally {
    }
}

function jumpToJLP() {
    window.open('https://aveliquidity.github.io/')
}
function jumpToLockMaster() {
    router.push("/lock/create/token")
}

async function importToWallet() {
    try {
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: manageStore.tokenAddress, // The address that the token is at.
                    symbol: manageStore.symbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: manageStore.decimals, // The number of decimals in the token
                    image: '', // A string url of the token logo
                },
            },
        });
    }
    catch (e) {
        console.log(e)
        if (e.info && e.info.error && e.info.error.code === 4001) {
            ElMessage.error(t('userCancelOperate'))
        } else if (e.error && e.error.message && e.error.message == 'Canceled') {
            ElMessage.error(t('userCancelOperate'))
        } else {
            ElMessage.error(t('unkonwError'))
        }
    }
}
</script>
<template>
    <div class="token-detail">
        <Back></Back>
        <div class="content" v-loading="manageStore.loading">
            <ul>
                <li class="top">
                    <TokenName class="token-name" :symbol="manageStore.symbol" :name="manageStore.name" :bigIcon="getTokenIcon(chain.toLowerCase(), manageStore.tokenAddress.toLowerCase())" :smallIcon="getChainIcon(chain.toLowerCase())"></TokenName>
                    <!-- <div class="right"><span class="create-date">创建时间：{{  }}</span></div> -->
                </li>
            </ul>
            <div class="small-title">{{ $t('tokenInformation') }}</div>
            <ul>
                <li>
                    <div class="left">{{ $t('chain') }}</div>
                    <div class="right">
                        <IconText :icon="getChainIcon(chain.toLowerCase())" :text="cfg.chainList.find(x=>x.chain==chain.toLowerCase()).chainShow"></IconText>
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('template') }}</div>
                    <div class="right">
                        <span v-if="manageStore.deployerId==0||manageStore.deployerId==5">{{ $t('freeTax') }}</span>
                        <span v-else-if="manageStore.deployerId==1||manageStore.deployerId==6">{{ $t('feeToken') }}</span>
                        <span v-else-if="manageStore.deployerId==2||manageStore.deployerId==7">{{$t('selfDividendToken')}}</span>
                        <span v-else-if="manageStore.deployerId==3||manageStore.deployerId==8">{{$t('addPoolDividend')}}</span>
                        <span v-else-if="manageStore.deployerId==4">{{$t('dividendToken')}}</span>
                    </div>
                </li>
                <li>
                    <div class="left">{{$t('tokenAddress')}}</div>
                    <div class="right">
                        <CopyText :text="manageStore.tokenAddress" :smallText="manageStore.tokenAddress"></CopyText>
                    </div>
                </li>
                <li>
                    <div class="left">{{$t('tokenName')}}</div>
                    <div class="right">
                        {{ manageStore.name }}
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('tokenSymbol') }}</div>
                    <div class="right">
                        {{ manageStore.symbol }}
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('tokenPrecision') }}</div>
                    <div class="right">
                        {{ manageStore.decimals }}
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('tokenAmount') }}</div>
                    <div class="right">
                        {{ numFormat(manageStore.totalSupply) }}
                    </div>
                </li>
                <li v-if="manageStore.deployerId!=2&&manageStore.deployerId!=4&&manageStore.deployerId<5">
                    <div class="left">{{ $t('isMintToken') }}</div>
                    <div class="right">
                        {{ manageStore.canMint?$t('yes'):$t('no') }}
                    </div>
                </li>
                <li>
                    <div class="left">{{ $t('ownerAddr') }}</div>
                    <div class="right">
                        <CopyText :text="manageStore.owner" :smallText="manageStore.owner"></CopyText>
                    </div>
                </li>
                <template v-if="manageStore.deployerId==3||manageStore.deployerId==4||manageStore.deployerId==8">
                    <li>
                        <div class="left">{{ $t('fundAddress') }}</div>
                        <div class="right">
                            <CopyText :text="manageStore.rewardToken" :smallText="manageStore.rewardToken"></CopyText>
                        </div>
                    </li>
                    <li>
                        <div class="left">{{ $t('fundAddressName') }}</div>
                        <div class="right">
                            {{ manageStore.rewardTokenName }} ({{ manageStore.rewardTokenSymbol }})
                        </div>
                    </li>
                </template>
            </ul>
            <div v-if="manageStore.canMint&&isOwner">
                <div class="small-title">{{ $t('economicManagement') }}</div>
                <div class="model-manage">
                    <div class="left">{{$t('currentIssuedAmount')}}：</div>
                    <div class="right">
                        {{numFormat(manageStore.totalSupply)}}<el-button class="mint-btn" type="primary" @click="mintDialogVisible=true">{{ $t('mint') }}</el-button>
                    </div>
                </div>
            </div>
            <div v-if="manageStore.deployerId!=0&&manageStore.deployerId!=5">
                <div class="small-title">{{ $t('tradeManage') }}</div>
                <ul>
                    <li class="operate-item" v-if="manageStore.enableManualStartTrade">
                        <div class="left">{{ $t('openTrade') }}</div>
                        <div class="right">
                            <el-switch :model-value="manageStore.tradeStart" :disabled="manageStore.tradeStart" :loading="switchLoading" @click="startTrade()" />
                        </div>
                    </li>
                    <li class="operate-item" v-if="manageStore.enableKillBlock">
                        <div class="left">{{$t('autoKillBlockNum')}}</div>
                        <div class="right">
                            {{manageStore.killBlock}}
                        </div>
                    </li>
                    <li class="operate-item" v-if="manageStore.enableChangeTax">
                        <div class="left">{{ $t('taxEdit') }}</div>
                        <div class="right">
                            <span>{{$t('buy')}} {{buyFee}}%{{$t('sell')}} {{sellFee}}%</span><el-button class="btn" key="primary" type="primary" :disabled="!isOwner" link @click="rateDialogVisible=true">{{$t('edit')}}</el-button>
                        </div>
                    </li>
                    <li class="operate-item" v-if="manageStore.enableWhiteList">
                        <div class="left">{{ $t('whiteList') }}</div>
                        <div class="right" v-if="manageStore.deployerId!=4">
                            <span>{{ manageStore.whiteList.length }}</span><el-button class="btn" key="primary" :disabled="!isOwner" type="primary" link @click="whiteListDialogVisible=true">{{$t('add')}}</el-button>
                        </div>
                        <div class="right" v-else>
                            <el-button class="btn" key="primary" :disabled="!isOwner" type="primary" link @click="whiteListDialogVisible=true">{{$t('add')}}/{{$t('remove')}}</el-button>
                        </div>
                    </li>
                    <li class="operate-item">
                        <div class="left">{{ $t('swapLimit') }}</div>
                        <div class="right">
                            <el-switch :model-value="manageStore.enableSwapLimit" :disabled="!manageStore.enableSwapLimit||!isOwner" :loading="disableSwapLoading" @click="disableSwapLimit()" />
                        </div>
                    </li>
                    <li class="operate-item" v-if="manageStore.enableSwapLimit">
                        <div class="left">{{ $t('swapAmount') }}</div>
                        <div class="right">
                            <span>{{manageStore.maxSwapAmount}}</span><el-button class="btn" key="primary" type="primary" :disabled="!isOwner" link @click="editMaxSwapAmountVisible=true">{{$t('edit')}}</el-button>
                        </div>
                    </li>
                    <li class="operate-item">
                        <div class="left">{{ $t('walletLimit') }}</div>
                        <div class="right">
                            <el-switch :model-value="manageStore.enableWalletLimit" :disabled="!manageStore.enableWalletLimit||!isOwner" :loading="disableWalletLoading" @click="disableWalletLimit()" />
                        </div>
                    </li>
                    <li class="operate-item" v-if="manageStore.enableWalletLimit">
                        <div class="left">{{ $t('walletAmount') }}</div>
                        <div class="right">
                            <span>{{manageStore.maxWalletAmount}}</span><el-button class="btn" key="primary" type="primary" :disabled="!isOwner" link @click="editMaxWalletAmountVisible=true">{{$t('edit')}}</el-button>
                        </div>
                    </li>
                    <li class="operate-item">
                        <div class="left">{{ $t('marketingAddress') }}</div>
                        <div class="right">
                            <span>{{manageStore.fundAddress}}</span><el-button class="btn" key="primary" type="primary" :disabled="!isOwner" link @click="editFundAddressVisible=true">{{$t('edit')}}</el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="small-title">{{ $t('authorityManagement') }}</div>
            <ul>
                <li class="operate-item">
                    <div class="left">{{ $t('contractOwnership') }}</div>
                    <div class="right">
                        <el-button class="btn" key="primary" type="primary" link :disabled="!isOwner" @click="giveUpOwner">{{$t('renounce')}}</el-button>
                    </div>
                </li>
                <li class="operate-item">
                    <div class="left">{{ $t('transferOwnership') }}</div>
                    <div class="right">
                        <el-button class="btn" key="primary" type="primary" link :disabled="!isOwner" @click="transferOwnerDialogVisible=true">{{ $t('transfer') }}</el-button>
                    </div>
                </li>
            </ul>
            <div class="operate">
                <el-button class="btn-gradient btn" text bg type="primary" @click="jumpToJLP">
                    {{ $t('LPAddOrManage') }}
                </el-button>
                <el-button class="btn" text bg type="primary" @click="jumpToLockMaster">
                    {{ $t('lockToken') }}
                </el-button>
                <el-button class="btn" text bg type="primary" v-if="store.walletType=='metamask'" @click="importToWallet">
                    {{ $t('importToWallet') }}
                </el-button>
            </div>
        </div>
        <el-dialog v-model="mintDialogVisible" :title="$t('mint')" destroy-on-close class="dlg dlg-mint">
            <Mint @operateSuccess="mintDialogVisible=false"></Mint>
        </el-dialog>
        <el-dialog v-model="rateDialogVisible" :title="$t('taxEdit')" destroy-on-close class="dlg dlg-rate">
            <EditTax @operateSuccess="rateDialogVisible=false"></EditTax>
        </el-dialog>
        <el-dialog v-model="whiteListDialogVisible" :title="$t('whiteListManage')" destroy-on-close class="dlg dlg-white-list">
            <WhiteList @operateSuccess="whiteListDialogVisible=false"></WhiteList>
        </el-dialog>
        <el-dialog v-model="transferOwnerDialogVisible" :title="$t('transferOwnership')" destroy-on-close class="dlg dlg-white-list">
            <TransferOwnership @operateSuccess="transferOwnerDialogVisible=false"></TransferOwnership>
        </el-dialog>
        <el-dialog v-model="editMaxSwapAmountVisible" :title="$t('editSwapAmount')" destroy-on-close class="dlg dlg-white-list">
            <EditMaxSwapAmount @operateSuccess="editMaxSwapAmountVisible=false"></EditMaxSwapAmount>
        </el-dialog>
        <el-dialog v-model="editMaxWalletAmountVisible" :title="$t('editWalletAmount')" destroy-on-close class="dlg dlg-white-list">
            <EditMaxWalletAmount @operateSuccess="editMaxWalletAmountVisible=false"></EditMaxWalletAmount>
        </el-dialog>
        <el-dialog v-model="editFundAddressVisible" :title="$t('editFundAddress')" destroy-on-close class="dlg dlg-white-list">
            <EditFundAddress @operateSuccess="editFundAddressVisible=false"></EditFundAddress>
        </el-dialog>
        <OperateSuccessDialog :txHash="txHash" :modelValue="showRenounceOwnershipSuccess"></OperateSuccessDialog>
    </div>
</template>
<style lang='scss'>
.token-detail{
    .el-button:focus{
        color: #409eff!important;
    }
}
</style>
<style scoped lang='scss'>
.token-detail {
    min-height: 700px;
    .content {
        font-size: 14px;
        .small-title {
            margin-top: 20px;
            font-weight: bold;
        }
        ul {
            .top {
                margin-top: 20px;
                line-height: 30px;
                .create-date {
                    font-size: 12px;
                    color: #999;
                }
                .token-name {
                    --sizeBig: 30px;
                    --sizeSmall: 14px;
                }
            }
            li {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    color: #999;
                }
            }
            .operate-item {
                line-height: 30px;
                .right {
                    display: flex;
                    > span {
                        margin-right: 30px;
                    }
                }
            }
        }
        .model-manage {
            display: flex;
            margin-top: 10px;
            justify-content: space-between;
            align-items: center;
            .left {
                color: #999;
            }
            .right {
                display: flex;
                align-items: center;
            }
            .mint-btn {
                margin-left: 10px;
                height: 28px;
                background: #01a7ff;
                width: 66px;
            }
        }
        .operate {
            margin-top: 25px;
            text-align: center;

            .btn {
                margin: 0 10px;
                color: #333;
                width: 204px;
                height: 40px;
            }
            .btn-gradient {
                color: #fff;
            }
        }
    }
}
</style>
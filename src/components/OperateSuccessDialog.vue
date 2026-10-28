<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from '@/store'
import { formatAddress, getChainIcon, copy } from "@/utils"

import { useRouter, useRoute } from 'vue-router'
import cfg from "@/config"
const store = useStore()

const props = defineProps({
    modelValue: Boolean,
    txHash: {
        type: String,
        default: "",
    },
})

const emit = defineEmits(["update:model-value", "close"])
function jumpToChainBrowser() {
    window.open(store.txBlockExplorerUrl + props.txHash)
}




</script>
<template>
    <el-dialog @close="emit('close')" :model-value="props.modelValue" @update:model-value="(v) => emit('update:model-value', v)" title="" class="dlg dlg-up-chain-success">
        <div class="content">
            <div class="transfer-icon">
                <svg-icon name='createSuccess' />
            </div>
            <div class="title">{{ $t('operationSuccess') }}</div>
            <div class="copy-tx-hash" @click="copy(txHash)">{{ $t('copyTxHash') }}</div>

            <div class="btn">
                <el-button class="jump-btn" @click="jumpToChainBrowser">{{ $t('openChainBrowser') }}</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<style lang="scss" scoped></style>
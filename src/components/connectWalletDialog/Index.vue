<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import ConnectWalle from "./ConnectWalle.vue"

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits("update:model-value", "connect-wallet-click")

function onClose() {
    emit("update:model-value", false)
}

function connectWalletClick(wallet, chain) {
    emit("update:model-value", false)
    emit('connect-wallet-click', wallet, chain)
}
</script>
<template>
    <el-dialog :model-value="props.modelValue" :title="$t('connectWallet')" class="dlg dlg-connect-wallet" destroy-on-close @close="onClose">
        <ConnectWalle @connect-wallet-click="connectWalletClick" />
    </el-dialog>
</template>

<style scoped lang='scss'></style>
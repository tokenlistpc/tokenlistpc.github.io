<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import Unlock from "./Unlock.vue"

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    lockId: {
        type: String,
        default: ""
    },
    isLockV2: {
        type: Boolean,
        default: false
    },
    isLpToken: {
        type: Boolean,
        default: false
    },
    unlockDate: Number,
    tokenList: Array,
    symbol: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    amountString: {
        type: String,
        default: ""
    },
    chain: {
        type: String,
        default: ""
    },
    decimals: {
        type: Number,
        default: 18
    },
})
const emit = defineEmits(["update:model-value", "operateSuccess"])

function onClose() {
    emit("update:model-value", false)
}
function operateSuccess() {
    emit("operateSuccess")
}

</script>
<template>
    <el-dialog :model-value="props.modelValue" :title="$t('withdrawAssets')" class="dlg" destroy-on-close @close="onClose">
        <Unlock :lockId="props.lockId" :isLockV2="props.isLockV2" :isLpToken="props.isLpToken" :unlockDate="props.unlockDate" :tokenList="props.tokenList" :symbol="props.symbol" :address="address" :amountString="props.amountString" :chain="props.chain" :decimals="props.decimals" @close="onClose" @operateSuccess="operateSuccess" />
    </el-dialog>
</template>

<style scoped lang='scss'></style>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import BigNumber from "bignumber.js"

const props = defineProps({
    cumulateAmount: {
        type: String,
        default: '0'
    },
    topAmount: {
        type: String,
        default: '0'
    },
    symbol: {
        type: String,
        default: ''
    },
})
const percentage = computed(() => {
    if (BigNumber(props.cumulateAmount).lte(props.topAmount)) {
        return BigNumber(props.cumulateAmount).dividedBy(props.topAmount).multipliedBy(100).toString()
    } else {
        return BigNumber(props.topAmount).dividedBy(props.cumulateAmount).multipliedBy(100).toString()
    }
})

</script>
<template>
    <div>
        <el-progress v-if="BigNumber(props.cumulateAmount).lte(props.topAmount)" color="rgba(72, 199, 116, 0.5)" :show-text="false" :stroke-width="10" :percentage="Number(percentage)" />
        <el-progress class="progress-bg-pro" v-else :show-text="false" color="#52c41a" :stroke-width="10" :percentage="Number(percentage)" />
        <div class="progress-data">
            <text>{{props.cumulateAmount}} {{ props.symbol }}</text>
            <text>{{props.topAmount}} {{ props.symbol }}</text>
        </div>
    </div>
</template>
<style lang='scss'>
.progress-bg-pro {
    .el-progress-bar__outer {
        background: rgba(72, 199, 116, 0.5);
    }
}
</style>
<style scoped lang='scss'>
.progress-data {
    font-size: 12px;
    margin-top: 5px;
    color: #999;
    display: flex;
    justify-content: space-between;
    text {
        word-break: break-word;
    }
}
</style>
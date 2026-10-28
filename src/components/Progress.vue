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
        default: 'BNB'
    },
    strokeWidth: {
        type: String,
        default:'6'
    },
    isShowData: {
        type: Boolean,
        default:false
    }
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
        <el-progress v-if="BigNumber(props.cumulateAmount).lte(props.topAmount)" color="rgba(72, 199, 116, 0.5)" :show-text="false" :stroke-width="props.strokeWidth" :percentage="Number(percentage)" />
        <el-progress class="progress-bg" v-else :show-text="false" color="#52c41a" :stroke-width="6" :percentage="Number(percentage)" />
        <div v-if="isShowData" class="progress-data">
            <span>{{ props.cumulateAmount }} {{ props.symbol }}</span><span>{{ props.topAmount }} {{ props.symbol }}</span>
        </div>
    </div>
</template>
<style lang='scss'>
.progress-bg {
    .el-progress-bar__outer {
        background: rgba(72, 199, 116, 0.5);
    }
}
</style>
<style scoped lang='scss'>

.progress-data{
    margin-top:5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
</style>
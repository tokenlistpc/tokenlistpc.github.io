<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import BigNumber from "bignumber.js"

const props = defineProps({
    total: String,
    amount: String,
    decimals: Number,
})

const emit = defineEmits(["update:amount"])


const percentage = computed(() => {
    const a = props.amount ? BigNumber(props.amount) : BigNumber(0)
    const t = props.total ? BigNumber(props.total) : BigNumber(0)
    if (t.lte(BigNumber(0))) {
        return 0
    }
    return a.div(t).multipliedBy(100).toNumber()
})

function clickQtyPercentage(percentage) {
    emit('update:amount', BigNumber(BigNumber(props.total).multipliedBy(percentage).div(100).toFixed(props.decimals, 1)).toString())
}

</script>
<template>
    <el-input :model-value="props.amount" @update:model-value="(v) => emit('update:amount', v)" class="input" type="number" :placeholder="$t('setNumberOfLock')" />
    <ul class="progress-bar">
        <li @click="clickQtyPercentage(25)">
            <div class="block" :style="{ '--percent': percentage < 0 ? 0 : percentage < 25 ? ((percentage - 0) / 25 * 100) : 100 }"></div>
            <div>25%</div>
        </li>
        <li @click="clickQtyPercentage(50)">
            <div class="block" :style="{ '--percent': percentage < 25 ? 0 : percentage < 50 ? ((percentage - 25) / 25 * 100) : 100 }">
            </div>
            <div>50%</div>
        </li>
        <li @click="clickQtyPercentage(75)">
            <div class="block" :style="{ '--percent': percentage < 50 ? 0 : percentage < 75 ? ((percentage - 50) / 25 * 100) : 100 }">
            </div>
            <div>75%</div>
        </li>
        <li @click="clickQtyPercentage(100)">
            <div class="block" :style="{ '--percent': percentage < 75 ? 0 : percentage < 100 ? ((percentage - 75) / 25 * 100) : 100 }">
            </div>
            <div>100%</div>
        </li>
    </ul>
</template>

<style scoped lang='scss'>
.input {
    height: 44px;

    font-size: 14px;
    // color: #999999;
    letter-spacing: 0;
    font-weight: 400;
}

.progress-bar {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 12px;
    color: #bebebe;
    letter-spacing: 0;
    font-weight: 400;

    li {
        flex: 1;

        &:not(:last-child) {
            margin-right: 20px;
        }
    }

    .block {
        height: 8px;
        background: #f5f6f7;
        cursor: pointer;
        margin-bottom: 2px;

        --percent: 0;
    }

    .block::before {
        content: "";
        display: block;
        height: 8px;
        width: calc(100% * var(--percent, 0) / 100);
        background-color: #2486ff;
    }
}
</style>
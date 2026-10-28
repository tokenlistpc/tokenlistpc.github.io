<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import dayjs from "dayjs"
const props = defineProps({
    modelValue: Date,
    minDate: {
        type: Date,
        default: dayjs().add(1, 'day').toDate()
    }
})

const emit = defineEmits(["update:model-value"])

const dateSelectList = reactive([
    {
        value: 30,
        label: "30days"
    },
    {
        value: 90,
        label: "90days"
    },
    {
        value: 365,
        label: "1years"
    },
    {
        value: 36500,
        label: "permanent"
    }
])

const diffDay = computed(() => {
    if (props.modelValue) {
        return dayjs(props.modelValue).diff(dayjs().format("YYYY-MM-DD"), 'day')
    }
    return 0
})

function quickSelect(v) {
    emit("update:model-value", dayjs().endOf('day').add(v, 'day').format("YYYY-MM-DD"))
}

function selectDate(v) {
    const diff = dayjs(v).diff(dayjs(props.minDate).format("YYYY-MM-DD"), 'day')
    if (diff < 0) {
        emit('update:model-value', props.minDate)
    } else {
        emit('update:model-value', v)
    }
}
</script>
<template>
    <el-date-picker class="calendar" :model-value="props.modelValue" type="date" :placeholder="$t('setDate') " size="large" @update:model-value="(v) => selectDate(v)" :clearable="false" />
    <ul class="day">
        <li v-for="(d, i) in dateSelectList" :key="i">
            <ave-radio :model-value="d.value == 36500 ? diffDay >= 36500 : d.value == diffDay" :label="$t(d.label)" @update:model-value="() => quickSelect(dateSelectList[i].value)"></ave-radio>
        </li>
    </ul>
</template>
<style lang='scss'>
.calendar {
    width: 100% !important;

    .el-input__inner {
        width: 80px;
        flex-grow: 0;
    }
}
</style>
<style scoped lang='scss'>
.day {
    margin-top: 12px;

    display: flex;
    justify-content: space-between;
}
</style>
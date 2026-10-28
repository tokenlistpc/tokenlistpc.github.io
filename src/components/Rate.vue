<script setup>
import { reactive, ref, onBeforeMount, onMounted, computed, shallowRef, nextTick, watch, onUpdated } from 'vue'
import BigNumber from "bignumber.js"
import { useCursor } from "@/utils/hooks"
import { isNumber, isUndefined, isNil, isString } from '@/utils'
import { Minus, Plus } from '@element-plus/icons-vue'

const UPDATE_MODEL_EVENT = 'update:modelValue'
const CHANGE_EVENT = 'change'
const INPUT_EVENT = 'input'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    max: {
        type: Number,
        default: 100
    },
    min: {
        type: Number,
        default: 0
    },
    step: {
        type: Number,
        default: 1
    },
    precision: {
        type: Number,
        default: 0
    },
    disabled: {
        type: Boolean,
        default: false
    }
})



const emit = defineEmits(['update:modelValue'])

const input = shallowRef()
const _ref = computed(() => input.value)

const [recordCursor, setCursor] = useCursor(input)


const minDisabled = computed(
    () => isNumber(props.modelValue) && props.modelValue <= props.min
)
const maxDisabled = computed(
    () => isNumber(props.modelValue) && props.modelValue >= props.max
)


const data = reactive({
    currentValue: props.modelValue,
    userInput: null,
})


const displayValue = computed(() => {
    if (data.userInput !== null) {
        return data.userInput
    }
    let currentValue = data.currentValue
    if (isNil(currentValue)) return ''
    if (isNumber(currentValue)) {
        if (Number.isNaN(currentValue)) return ''
        if (!isUndefined(props.precision)) {
            currentValue = Number(currentValue).toFixed(props.precision)
        }
    }
    return currentValue
})

const toPrecision = (num, pre) => {
    if (isUndefined(pre)) pre = numPrecision.value
    if (pre === 0) return Math.round(num)
    let snum = String(num)
    const pointPos = snum.indexOf('.')
    if (pointPos === -1) return num
    const nums = snum.replace('.', '').split('')
    const datum = nums[pointPos + pre]
    if (!datum) return num
    const length = snum.length
    if (snum.charAt(length - 1) === '5') {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`
    }
    return Number.parseFloat(Number(snum).toFixed(pre))
}
const getPrecision = (value) => {
    if (isNil(value)) return 0
    const valueString = value.toString()
    const dotPosition = valueString.indexOf('.')
    let precision = 0
    if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
    }
    return precision
}

const numPrecision = computed(() => {
    const stepPrecision = getPrecision(props.step)
    if (!isUndefined(props.precision)) {
        if (stepPrecision > props.precision) {
            return props.precision
        }
        return props.precision
    } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision)
    }
})

const ensurePrecision = (val, coefficient = 1) => {
    if (!isNumber(val)) return data.currentValue
    // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
    return toPrecision(val + props.step * coefficient)
}

const increase = () => {
    if (props.readonly || props.disabled || maxDisabled.value) return
    const value = Number(displayValue.value) || 0
    const newVal = ensurePrecision(value)
    setCurrentValue(newVal)
    emit(INPUT_EVENT, data.currentValue)
}
const decrease = () => {
    if (props.readonly || props.disabled || minDisabled.value) return
    const value = Number(displayValue.value) || 0
    const newVal = ensurePrecision(value, -1)
    setCurrentValue(newVal)
    emit(INPUT_EVENT, data.currentValue)
}
const verifyValue = (value, update) => {
    const { max, min, step, precision, stepStrictly, valueOnClear } = props
    if (max < min) {
        return null
    }
    let newVal = Number(value)
    if (isNil(value) || Number.isNaN(newVal)) {
        return null
    }
    if (value === '') {
        if (valueOnClear === null) {
            return null
        }
        newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear
    }
    if (stepStrictly) {
        newVal = toPrecision(Math.round(newVal / step) * step, precision)
    }
    if (!isUndefined(precision)) {
        newVal = toPrecision(newVal, precision)
    }
    if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : min
        update && emit(UPDATE_MODEL_EVENT, newVal)
    }
    return newVal
}

const setCurrentValue = (value, emitChange = true) => {
    const oldVal = data.currentValue
    const newVal = verifyValue(value)
    if (!emitChange) {
        emit(UPDATE_MODEL_EVENT, newVal)
        return
    }
    if (oldVal === newVal) return
    data.userInput = null
    emit(UPDATE_MODEL_EVENT, newVal)
    emit(CHANGE_EVENT, newVal, oldVal)
    data.currentValue = newVal
}

const handleInput = (value) => {
    data.userInput = value
    const newVal = value === '' ? null : Number(value)
    emit(INPUT_EVENT, newVal)
    setCurrentValue(newVal, false)
}

const handleInputChange = (value) => {
    const newVal = value !== '' ? Number(value) : 0
    if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        setCurrentValue(newVal)
    }
    data.userInput = null
}

watch(
    () => props.modelValue,
    (value) => {
        const userInput = verifyValue(data.userInput)
        const newValue = verifyValue(value, true)
        if (!isNumber(userInput) && (!userInput || userInput !== newValue)) {
            data.currentValue = newValue
            data.userInput = null
        }
    },
    { immediate: true }
)
onMounted(() => {
    const { min, max, modelValue } = props
    const innerInput = input.value?.input
    innerInput.setAttribute('role', 'spinbutton')
    if (Number.isFinite(max)) {
        innerInput.setAttribute('aria-valuemax', String(max))
    } else {
        innerInput.removeAttribute('aria-valuemax')
    }
    if (Number.isFinite(min)) {
        innerInput.setAttribute('aria-valuemin', String(min))
    } else {
        innerInput.removeAttribute('aria-valuemin')
    }
    innerInput.setAttribute('aria-valuenow', String(data.currentValue))
    innerInput.setAttribute('aria-disabled', String(props.disabled))
    if (!isNumber(modelValue) && modelValue != null) {
        let val = Number(modelValue)
        if (Number.isNaN(val)) {
            val = null
        }
        emit(UPDATE_MODEL_EVENT, val)
    }
})
onUpdated(() => {
    const innerInput = input.value?.input
    innerInput?.setAttribute('aria-valuenow', `${data.currentValue}`)
})

</script>
<template>
    <div class="rate">
        <el-button :icon="Minus" class="rate-btn" @click="decrease" circle :disabled="minDisabled" />
        <div class="value-show">
            <el-input class="ipt-num" ref="input" type="number" :step="step" :model-value="displayValue" :readonly="props.readonly" :disabled="props.disabled" :max="max" :min="min" :validate-event="false" @wheel.prevent @keydown.up.prevent="increase" @keydown.down.prevent="decrease" @input="handleInput" @change="handleInputChange" />
            <div>%</div>
        </div>
        <el-button :icon="Plus" class="rate-btn" @click="increase" circle :disabled="maxDisabled" />
    </div>
</template>
<style lang='scss'>
.rate {
    .value-show {
        .ipt-num {
            .el-input__wrapper {
                box-shadow: none;
                padding: 0 2px;
                .el-input__inner {
                    text-align: center;
                    line-height: 1;
                }
            }
        }
    }
}
</style>
<style scoped lang='scss'>
.rate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;

    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;

    .rate-btn {
        width: 20px;
        height: 20px;
        border-radius: 0;
    }

    .value-show {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .ipt-num {
            border: none;
        }
    }
}
</style>
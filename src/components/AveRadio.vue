<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: String
})
const emit = defineEmits("update:model-value")

const hover = ref(false)

</script>
<template>
    <div class="radio" @click="emit('update:model-value', !props.modelValue)" @mouseover="hover=true" @mouseout="hover=false">
        <div class="square" :class="{
            'square-selected': props.modelValue,
            'square-hover': !props.modelValue && hover
        }"></div>
        <div class="label">{{ props.label }}</div>
    </div>
</template>

<style scoped lang='scss'>
.radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;

    .square {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #e2e5e7;
        border-radius: 4px;

        position: relative;

        &::after {
            display: block;
            box-sizing: content-box;
            content: "";
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;

            left: 7px;
            position: absolute;
            top: 2px;

            width: 4px;
            height: 9px;

            transform-origin: center;
            transform: rotate(45deg) scaleY(0);
            transition: transform 0.1s ease-in 0.05s;
            // background-color: red;
        }
    }

    .square-hover {
        border: 1px solid #409eff;
    }
    .square-selected {
        background: #01a7ff;
        &::after {
            transform: rotate(45deg) scaleY(1);
        }
    }

    .label {
        margin-left: 4px;
    }
}
</style>
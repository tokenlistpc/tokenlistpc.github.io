<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'

const props = defineProps({
    icon: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    },
})
</script>
<template>
    <div class="icon">
        <el-image class="image" v-if="props.icon" :src="props.icon" fit="cover">
            <template #error>
                <img class="image" src="@/assets/imgs/default.png">
            </template>
        </el-image>
        <div class="text">{{ props.text }}</div>
    </div>
</template>

<style scoped lang='scss'>
.icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .image {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 6px;
    }
    .text {
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: 500;
    }
}
</style>
<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { copy } from "@/utils"
defineProps({
    text: {
        type: String,
        default: "",
    },
    smallText: {
        type: String,
        default: "",
    },
    isBlue: {
        type: Boolean,
        default: false,
    }
})
function copyFn(text){
    copy(text)
}
</script>
<template>
    <div class="copy-text">
        <span class="text" :class="isBlue?'blue':''">{{ smallText }}</span>
        <span @click.stop>
            <el-icon class="copy" @click.prevent="copyFn(text)">
                <CopyDocument />
            </el-icon>
        </span>
    </div>
</template>

<style scoped lang='scss'>
.copy-text {
    display: flex;
    font-size: 14px;
    line-height: 14px;
    .blue{
        color: #01A7FF;;
    }
    .copy {
        margin-left: 5px;
        color: #999;
        cursor: pointer;
    }
}
</style>
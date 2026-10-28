<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
const props = defineProps({
    text: {
        type: String,
        default: "",
    }
})
</script>
<template>
    <div class="help-tip">
        <el-tooltip effect="dark" :content="props.text" placement="top">
            <el-icon class="question" color="#DFDFDF" :size="16">
                <QuestionFilled />
            </el-icon>
        </el-tooltip>
    </div>
</template>

<style scoped lang='scss'>
.help-tip {
    width: 16px;
    height: 16px;

    cursor: pointer;
}
</style>
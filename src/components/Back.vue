<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

function back() {
    router.go(-1)
}
</script>
<template>
    <div class="back" @click="back">
        <el-icon class="arrow">
            <ArrowLeftBold />
        </el-icon>
        <span class="text">{{ $t('back') }}</span>
    </div>
</template>

<style scoped lang='scss'>
.back {
    display: flex;
    width: 60px;
    cursor: pointer;
    align-items: center;
    .arrow {
        background: #dfdfdf;
        font-size: 8px;
        width: 16px;
        height: 16px;
        color: #fff;
        border-radius: 50%;
    }
    .text {
        margin-left: 6px;
        color: #999;
        font-size: 16px;
        line-height: 16px;
    }
}
</style>
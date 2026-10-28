<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';

defineProps({
    token1: {
        type: String,
        default: "",
    },
    token2: {
        type: String,
        default: "",
    }
})

</script>
<template>
    <div class="token-icon">
        <el-image class="img" v-if="token1" :src="token1" :lazy="true" fit="cover">
            <template #error>
                <img class="img" src="@/assets/imgs/default.png">
            </template>
        </el-image>
        <el-image class="img" v-if="token2" :src="token2" :lazy="true" fit="cover">
            <template #error>
                <img class="img" src="@/assets/imgs/default.png">
            </template>
        </el-image>
    </div>
</template>
<style lang="scss" scoped>
.token-icon {
    display: flex;
    .img {
        border-radius: 50%;
        width: var(--sizeBig);
        height: var(--sizeBig);
        --van-image-error-icon-size: var(--sizeBig);
    }
    > .img:nth-child(2) {
        margin-left: -12px;
    }
}
</style>
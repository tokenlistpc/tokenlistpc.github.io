<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';

defineProps({
    bigIcon: {
        type: String,
        default: "",
    },
    smallIcon: {
        type: String,
        default: "",
    }
})

</script>
<template>
    <div class="token-icon">
        <el-image class="big img" v-if="bigIcon" :src="bigIcon" :lazy="true" fit="cover">
            <template #error>
                <img class="big img" src="@/assets/imgs/default.png">
            </template>
        </el-image>
        <el-image class="small img" v-if="smallIcon" :src="smallIcon" :lazy="true" fit="cover">
            <template #error>
                <img class="small img" src="@/assets/imgs/default.png">
            </template>
        </el-image>
    </div>
</template>
<style lang="scss" scoped>
.token-icon {
    position: relative;
    height: var(--sizeBig);
    width: var(--sizeBig);
    .img {
        border-radius: 50%;
        display: flex;
    }
    .big {
        width: var(--sizeBig);
        height: var(--sizeBig);
    }

    .small {
        position: absolute;
        bottom: 0;
        right: -2px;
        width: var(--sizeSmall);
        height: var(--sizeSmall);
    }
}
</style>
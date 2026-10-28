<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import TokenIcon from '@/components/TokenIcon.vue'
import DoubleToken from '@/components/DoubleToken.vue'

defineProps({
    bigIcon: {
        type: String,   
        default: "",
    },
    smallIcon: {
        type: String,
        default: "",
    },
    token1: {
        type: String,
        default: "",
    },
    token2: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    symbol: {
        type: String,
        default: "",
    }
})
</script>
<template>
    <div class="token-name">
        <TokenIcon v-if="bigIcon||smallIcon" :bigIcon="bigIcon" :smallIcon="smallIcon"></TokenIcon>
        <DoubleToken :token1="token1" :token2="token2"></DoubleToken>
        <div class="text">
            <div class='symbol' v-if="symbol">{{ symbol }}</div>
            <div class='name' v-if="name">{{ name }}</div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.token-name {
    display: flex;
    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 5px;
        > div {
            line-height: 16px;
        }
        .symbol{
            max-width: 120px;
            white-space: nowrap;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .name {
            font-size: 12px;
            color: #999;
        }
    }
}
</style>
<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';

</script>
<template>
    <div class="count-down">
        <div class="count-item day">364</div>
        <span>:</span>
        <div class="count-item hour">34</div>
        <span>:</span>
        <div class="count-item minute">56</div>
        <span>:</span>
        <div class="count-item second">23</div>
    </div>
</template>

<style scoped lang='scss'>
.count-down {
    display: flex;
    align-items: center;
    justify-content: center;
    >span{
        padding: 0 6px;
        line-height: 38px;
    }
    .count-item{
        font-size: 16px;
        color: #01A7FF;
        font-weight: bold;
        height: 38px;
        line-height: 38px;
        padding: 0 9px;
        background:rgba(1,167,255,0.10);
    }
}
</style>
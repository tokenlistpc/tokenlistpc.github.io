<script setup>
import { computed, inject, watch, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, copy, formatAddress } from "@/utils"
import { ethers } from "ethers"
import api from "@/api"
import { useStore } from '@/store';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import { useCtManageStore } from '@/store/create/manage.js';

const { t } = useI18n()
const store = useStore()
const manageStore = useCtManageStore()

const emit = defineEmits(["operateSuccess"])
const amount = ref('')
const address = ref(store.walletAddress)
const loading = ref(false)

</script>
<template>
    <div class="launch-promotion">
        <div class="text">开通该功能后, 参与者可生成邀请链接, 通过邀请链接参与的用户, 邀请者可从募集资金中 获得一定比例的奖励。 开启预售推广需要支付0.01BNB的手续费。</div>
        <div class="set-funds-rate">
            <span>总奖励池占募集资金的比例</span><el-input-number class="rate-input input-40" :controls="false" placeholder="最高5%" v-model="num" :min="1" :max="10" @change="handleChange" /><span>%</span> 
        </div>
        <div class="operate">
            <el-button class="btn btn-36">返回</el-button>
            <el-button class="btn btn-36 btn-gradient">确认开启</el-button>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.launch-promotion{
    .set-funds-rate{
        display: flex;
        align-items: center;
        margin-top: 15px;
        .rate-input{
            margin: 0 10px;
            width: 125px;
        }
    }
    .operate{
        margin-top: 35px;
        display: flex;
        justify-content: flex-end;
        .btn{
            width: 92px;
        }
    }
}
</style>
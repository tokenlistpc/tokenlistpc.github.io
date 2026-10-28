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
    <div class="cancel-launch">
        <div class="text">您将取消本次预售，预售募集的金额将全部返还给各个用户，预售的信息将不被保留，手续费不予返还， 确定进行此操作吗？</div>
        <div class="operate">
            <el-button class="btn btn-36">返回</el-button>
            <el-button class="btn btn-36 btn-gradient">确认取消</el-button>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.cancel-launch{
    .operate{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        .btn{
            width: 92px;
        }
    }
}
</style>
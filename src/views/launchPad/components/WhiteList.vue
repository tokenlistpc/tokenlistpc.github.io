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
    <div class="white-list">
        <el-input
            v-model="textarea2"
            :autosize="{ minRows: 6}"
            type="textarea"
            placeholder="输入白名单地址，每行一个"
        />
        <div class="operate">
            <el-button class="btn btn-40 btn-default-gray">批量添加</el-button>
            <el-button class="btn btn-40 btn-gradient">批量移除</el-button>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.white-list{
    .operate{
        margin-top:50px;
        display: flex;
        justify-content: space-between;
        .btn{
            width: 180px;
        }
    }
}
</style>
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
const radio1 = ref('')
const address = ref(store.walletAddress)
const loading = ref(false)

</script>
<template>
    <div class="white-list-info">
        <el-radio-group class="radio" v-model="radio1">
            <el-radio class="radio-item" label="1" size="large">开启</el-radio>
            <el-radio class="radio-item" label="2" size="large">禁用</el-radio>
        </el-radio-group>
        <div class="run-time"> 
            <span>白名单预售持续时间</span><el-input-number class="time-input input-40" :controls="false" placeholder="最高5分钟" v-model="num" :min="1" :max="10" @change="handleChange" /><span>分钟</span>
        </div> 
        <div class="info">
            可指定白名单用户优先参与预售，在指定的白名单预售持续时间结束之后，转为公开预售。 如不填写持续时间则永远不会转为公开预售。
        </div>
        <div class="operate">
            <el-button class="btn btn-40 btn-gradient">确认开启</el-button>
        </div>
    </div>
</template>

<style lang="scss">
.white-list-info{
    .radio{
        .radio-item{
            .el-radio__input.is-checked .el-radio__inner{
                border-color: #01A7FF;
                background:#01A7FF
            }
            .el-radio__label{
                color: #333333;
            }
        }
    }
}
</style>
<style scoped lang='scss'>
.white-list-info{
    .run-time{
        margin-top: 5px;
        display: flex;
        align-items: center;
        .time-input{
            margin: 0 10px;
            width: 125px;
        }
    }
    .info{
        margin-top: 20px;
        font-size: 12px;
        color: #999999;
    }
    .operate{
        margin-top: 20px;
        text-align: center;
        .btn{
            width: 140px;
        }
    }
}
</style>
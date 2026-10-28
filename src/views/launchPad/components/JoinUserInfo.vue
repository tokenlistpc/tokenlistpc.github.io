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
    <div class="join-user-info">
        <ul>
            <li>
                <div class="title">用户地址</div> 
                <div class="title">购买金额</div>
            </li>
            <li>
               <div>0xfb130d93e49dca13264344966a611dc79a456bc5</div> 
               <div>0.78 BNB</div>
            </li>
            <li>
               <div>0xfb130d93e49dca13264344966a611dc79a456bc5</div> 
               <div>0.78 BNB</div>
            </li>
            <li>
               <div>0xfb130d93e49dca13264344966a611dc79a456bc5</div> 
               <div>0.78 BNB</div>
            </li>
            <li>
               <div>0xfb130d93e49dca13264344966a611dc79a456bc5</div> 
               <div>0.78 BNB</div>
            </li>
            <li>
               <div>0xfb130d93e49dca13264344966a611dc79a456bc5</div> 
               <div>0.78 BNB</div>
            </li>
        </ul>
        <div class="operate">
            <el-button class="btn btn-40 btn-gradient">完成预售</el-button>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.join-user-info{
    ul{
        li{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .title{
                color: #999;
            }
        }
        :first-child{
            margin-top: 0px;
        }
    }
    .operate{
        text-align: center;
        .btn{
            width: 230px;
            margin-top: 20px;
        }
    }
    
}
</style>
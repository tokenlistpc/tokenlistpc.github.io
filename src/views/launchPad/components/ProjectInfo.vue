<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getChainIcon, getTokenIcon, isExpired, copy, formatAddress } from "@/utils"
import { ethers } from "ethers"
import api from "@/api"
import { useStore } from '@/store';
import OperateSuccessDialog from '@/components/OperateSuccessDialog.vue'
import UploadImg from '@/components/UploadImg.vue'
import { useCtManageStore } from '@/store/create/manage.js';

const { t } = useI18n()
const store = useStore()
const manageStore = useCtManageStore()

const ruleFormRef = ref()
const emit = defineEmits(["operateSuccess"])
const projectData = reactive({
    logo: [],
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    github: "",
    facebook: "",
    reddit: "",
    instagram: "",
    youtube: "",
    description: ""
})
const amount = ref('')
const address = ref(store.walletAddress)
const loading = ref(false)

const rules = reactive({
    modelValue: [
        { required: true, message: '请上传图片' },
    ],
    website: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    twitter: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    telegram: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    discord: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    github: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    facebook: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    reddit: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    instagram: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    youtube: [
        {
            pattern: "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/",
            message: '网址输入错误'
        }
    ],
    description: [
        { required: true, message: '请填写项目介绍' },
        { max: 3000, message: '最多输入3000字', trigger: 'blur' },
    ],
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const formatterTrim = (value) => {
    return value.trim()
}

</script>
<template>
    <div class="project-info">
        <el-form ref="ruleFormRef" :model="projectData" :rules="rules" label-width="0" class="demo-ruleForm" :size="formSize" status-icon>
            <div class="item">
                <div class="key"><span class="star">*</span>上传项目Logo</div>
                <div class="value">
                    <UploadImg v-model="projectData.logo"></UploadImg>
                </div>
            </div>
            <el-form-item prop="website" class="item">
                <div class="key">官方网站</div>
                <el-input v-model="projectData.website" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="twitter" class="item">
                <div class="key">Twitter</div>
                <el-input v-model="projectData.twitter" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="telegram" class="item">
                <div class="key">Telegram</div>
                <el-input v-model="projectData.telegram" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="discord" class="item">
                <div class="key">Discord</div>
                <el-input v-model="projectData.discord" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="github" class="item">
                <div class="key">Github</div>
                <el-input v-model="projectData.github" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="facebook" class="item">
                <div class="key">Facebook</div>
                <el-input v-model="projectData.facebook" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="reddit" class="item">
                <div class="key">Reddit</div>
                <el-input v-model="projectData.reddit" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="instagram" class="item">
                <div class="key">Instagram</div>
                <el-input v-model="projectData.instagram" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="youtube" class="item">
                <div class="key">Youtube 视频</div>
                <el-input v-model="projectData.youtube" :formatter="formatterTrim" />
            </el-form-item>
            <el-form-item prop="description" class="item">
                <div class="key"><span class="star">*</span>项目介绍</div>
                <el-input type="textarea" :formatter="formatterTrim" :autosize="{ minRows: 3}" placeholder="3000字以内" v-model="projectData.description" />
            </el-form-item>
            <el-form-item class="operate">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Create
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss">
</style>
<style scoped lang='scss'>
.project-info {
    .item {
        .key {
            font-weight: bold;
            line-height: 20px;
            margin-bottom: 10px;
            .star {
                color: #f56c6c;
            }
        }
        .value {
            margin-top: 10px;
        }
    }
    .operate {
        margin-top: 30px;
    }
}
</style>
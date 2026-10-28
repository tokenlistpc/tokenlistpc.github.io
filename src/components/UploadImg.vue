<script setup>
import { ref, watch } from 'vue'
import { computed } from 'vue'
import { ElMessage, ElLoading } from "element-plus"
import { getChainIcon, getTokenIcon, isExpired, getLocalImgUrl, isAddress } from "@/utils"

const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const uploadRef = ref()
const imageUrl = ref('')
const hideUpload = ref(props.modelValue.length > 0)
const props = defineProps({
    modelValue: {
        type: Array,
        default: []
    },
})

const emit = defineEmits(["update:modelValue"])

async function uploadImage(file) {
    console.log(file)
    const fileBase64 = await getBase64(file)
    const res = await getImgPx(fileBase64)
    if (res.width != res.height) {
        ElMessage.error('图片长宽比例为1：1')
        uploadRef.value.handleRemove(file)
        return false
    }
    if (file.size > 1024 * 1024) {
        ElMessage.error('文件大小不超过1M')
        uploadRef.value.handleRemove(file)
        return false
    }
    emit('update:modelValue', [file])
    hideUpload.value = true
}

function getBase64(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.raw)
    return new Promise((resolve) => {
        reader.onload = () => {
            resolve(reader.result)
        }
    })
}

function getImgPx(img) {
    const image = new Image()
    image.src = img
    return new Promise((resolve) => {
        image.onload = () => {
            const width = image.width
            const height = image.height
            resolve({ width, height })
        }
    })
}

function handleRemove() {
    emit('update:modelValue', [])
    hideUpload.value = false
}

const handlePreviewImg = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

</script>
<template>
    <el-form-item prop="modelValue">
        <el-upload class="upload-box" ref="uploadRef" :file-list="props.modelValue" accept="image/*" action="" name="image" :class="{hideUpload:hideUpload}" :before-upload="beforeUploadImg" :on-preview="handlePreviewImg" :on-change="uploadImage" :on-remove="handleRemove" list-type="picture-card" :auto-upload="false">
            <!-- <img v-if="imageUrl" :src="imageUrl" class="img"> -->
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="getLocalImgUrl(file.raw)" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePreviewImg(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </span>
                    </span>
                </div>
            </template>
            <div class="content">
                <el-icon>
                    <Plus />
                </el-icon>
                <div>上传图片</div>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    长宽比例1：1，文件大小不超过1M
                </div>
            </template>
        </el-upload>
    </el-form-item>

    <el-dialog v-model="dialogVisible">
        <div class="preview-box">
            <img class="img" w-full :src="dialogImageUrl" alt="Preview Image" />
        </div>
    </el-dialog>
</template>
<style lang='scss'>
.upload-box {
    .el-upload--picture-card,
    .el-upload-list__item {
        width: 104px;
        height: 104px;
    }
}
.hideUpload {
    .el-upload--picture-card {
        display: none;
    }
}
</style>
<style scoped lang='scss'>
.upload-box {
    .content {
        text-align: center;
    }
    .el-upload__tip {
        color: #999;
    }
}
.preview-box {
    text-align: center;
    .img {
        max-width: 100%;
    }
}
</style>
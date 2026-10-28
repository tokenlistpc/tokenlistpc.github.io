<script setup>
import { computed, inject, watch, ref, reactive, nextTick } from 'vue'

const emit = defineEmits(["iptChange"])
defineExpose({ clearAddress })
const props = defineProps({
    isCustom: {
        type: Boolean,
        default: false,
    },
    addressList: {
        type: Array,
        default: [],
    }
})
const modelValue = reactive({
    isCustom: props.isCustom,
    addressList: props.addressList
})
const addressLine = computed(() => {
    let result = []
    for (let i = 0; i < modelValue.addressList.length; i++) {
        const line = modelValue.addressList[i]
        if (modelValue.isCustom) {
            result.push(`${line.address},${line.amountString}`)
        } else {
            result.push(line.address)
        }
    }
    return result
})

const addressText = computed(() => {
    return addressLine.value.join("\n")
})


const ipt = ref(null)
const focus = ref(false)

// 获取焦点
async function getFocus() {
    focus.value = true
    await nextTick()
    ipt?.value.focus()
}

function onBlurCapture(event) {
    console.log("onBlurCapture")
    console.log(event.target.value)
    // addressTextInput(event.target.value);
    focus.value = false
}

function clearAddress() {
    modelValue.isCustom = false
    modelValue.addressList = []
}

function changeText(event) {
    const value = event.target.value
    const p = /^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/
    let isCustom = false

    let text = value.replace(/\s+/ig, " ").trim()
    if (text) {
        let list = text.split(" ")
        if (text.indexOf(",") > -1) {
            isCustom = true
        }

        const resList = []
        for (let i = 0; i < list.length; i++) {
            let line = list[i]
            if (!line) {
                continue
            }
            if (!p.test(line)) {
                continue
            }
            let address = ""
            let amountString = ""
            if (isCustom == true) {
                let s = line.split(",")
                address = s[0]
                if (s.length > 1) {
                    amountString = s[1]
                } else {
                    amountString = "0"
                }
            } else {
                address = line
            }

            resList.push({
                address: address,
                amountString: amountString
            })
        }
        modelValue.isCustom = isCustom
        modelValue.addressList = resList
    } else {
        modelValue.isCustom = false
        modelValue.addressList = []
    }
    console.log("emit", modelValue.isCustom, modelValue.addressList)
    emit("iptChange", modelValue.isCustom, modelValue.addressList)
}

</script>
<template>
    <div class="box">
        <template v-if="focus">
            <textarea class="ipt" ref="ipt" @blur.capture="onBlurCapture" :value="addressText"
                @change="changeText"></textarea>
        </template>
        <template v-else>
            <div class="table" @click="getFocus">
                <li v-for="(item, index) in addressLine" :key="index">
                    <div class="index">{{ index + 1 }}</div>
                    <div class="content">{{ item }}</div>
                </li>
            </div>
        </template>
    </div>
</template>

<style scoped lang='scss'>
.box {
    background: #ffffff;
    border: 1px solid #e6e7e8;
    border-radius: 4px;
    // height: 280px;

    .ipt {
        box-sizing: border-box;
        width: 100%;
        height: 280px;

        border: none;
        padding: 4px 8px;

        color: #333333;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 20px;
        font-weight: 400;
        overflow: visible;
        overflow-y: scroll;
    }

    .table {
        border-radius: 8px;
        height: 280px;
        // overflow: hidden;
        overflow-y: auto;

        color: #333333;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 20px;
        font-weight: 400;

        li {
            display: flex;
            justify-content: flex-start;

            .index {
                background-color: #f5f6f6;
                width: 30px;
                text-align: center;
                margin-right: 10px;
            }

            .content {
                word-break: break-all;
            }

            .edit {
                padding: 4px;
                font-size: 16px;
            }
        }
    }
}
</style>
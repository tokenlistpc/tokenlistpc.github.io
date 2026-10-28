import dayjs from "dayjs"
import { ElMessage } from 'element-plus'
import i18n from "@/lang"
export {
    isArray,
    isFunction,
    isObject,
    isString,
    isDate,
    isPromise,
    isSymbol,
} from '@vue/shared'

export const isNumber = (val) => typeof val === 'number'


export const isNil = (val) => val == null

export const isUndefined = (val) => val === undefined
export const isBoolean = (val) => typeof val === 'boolean'

export const int2Hex = (i) => "0x" + i.toString(16)
export const hex2Int = (h) => parseInt(h, 16)


export const isStringNumber = (val) => {
    if (!isString(val)) {
        return false
    }
    return !Number.isNaN(Number(val))
}

export function isAddress(a) {
    return /^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(a)
}


/**
 * 获取chain图标
 * @param {*} chain
 * @returns
 */
export function getChainIcon(chain) {
    return `https://ave.s3.ap-east-1.amazonaws.com/chain/${chain.toLowerCase()}.png`
}


/**
 * 获取Token图标
 * @param {*} chain
 * @param {*} tokenAddress
 * @returns
 */
export function getTokenIcon(chain, tokenAddress) {
    return `https://ave.s3.ap-east-1.amazonaws.com/token_icon/${chain}/${tokenAddress}.png`
}

/**
 * 等待一段时间
 * @param {*} interval
 * @returns
 */
export function sleep(interval) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval)
    })
}


export function formatAddress(address, n = 4) {
    if (address) {
        return address.replace(new RegExp(`(.{${n + 2}})(.+)(.{${n}})`), "$1...$3")
    } else {
        return ""
    }
}

//判断是否过期
export function isExpired(date) {
    let now = dayjs();
    let t = dayjs(date);
    return now.unix() >= t.unix()
}

// 剩余天数
export function diffDay(date) {
    let now = dayjs();
    let t = dayjs(date);
    if (now.unix() >= t.unix()) {
        return 0;
    }
    return t.diff(now, "day");
}

/**
 * 复制
 * @param {*} text
 */
export function copy(text) {
    const textarea = document.createElement("textarea")
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    textarea.readOnly = "readonly"
    textarea.style.position = "absolute"
    textarea.style.left = "-9999px"
    // 将要 copy 的值赋给 textarea 标签的 value 属性
    textarea.value = text
    // 将 textarea 插入到 body 中
    document.body.appendChild(textarea)
    // 选中值并复制
    textarea.select()
    const result = document.execCommand("copy")
    if (result) {
        // Message.success('复制成功')
        ElMessage.success(i18n.global.t("copySuccess"))
    }
    document.body.removeChild(textarea)
}

/**
 * 把数字转成带千位分隔符的字符串
 * @param {*} num 
 * @returns 
 */
export function numFormat(num) {
    var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return $1 + ",";
        });
    })
    return res;
}


// 获取local的图片地址
export function getLocalImgUrl(raw) {
    return URL.createObjectURL(raw)
}

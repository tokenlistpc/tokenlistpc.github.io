import axios from "axios"


/**
 * 发送失败批量转账交易记录
 * @param {*} contractChain
 * @param {*} txHash
 * @returns
 */
export function sendMultiSendFailTx(contractChain, txHash) {
    return axios({
        method: "post",
        url: "https://api.tokenlist.app/v1/multiSend/sendMultiSendFailTx",
        data: {
            contractChain,
            txHash,
        },
    })
}
/**
 * 获取批量发送历史记录
 * @param {*} sender
 * @param {*} pageSize
 * @param {*} pageNumber
 * @returns
 */
export function getMultiSendHistory(sender, pageSize, pageNumber, contractChain) {
    return axios({
        method: "get",
        url: "https://api.tokenlist.app/v1/multiSend/getMultiSendHistory",
        params: {
            sender,
            pageSize,
            pageNumber,
            contractChain
        },
    })
}

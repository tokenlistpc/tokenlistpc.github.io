import axios from "axios"

// 获取预售列表
export function getLaunchpadList(page, pageSize, search, chainIds, platform, status, sort) {
    let params = {
        page: page,
        pageSize: pageSize,
    }
    if (search) {
        params.search = search
    }
    if (chainIds) {
        params.chainIds = chainIds
    }
    if (platform) {
        params.platform = platform
    }
    if (status) {
        params.status = status
    }
    if (sort.type) {
        params.sort = sort.type
        params.sortAsc = sort.isAsc
    }
    console.log(params)
    return axios({
        method: "get",
        url: "https://api.tokenlist.app/v1/launchpad/pageList",
        params: params,
    })
}

// 获取tokenList预售列表
export function getTokenListLaunchpadList(page, pageSize, search, chainIds, status, creator) {
    let params = {
        page: page,
        pageSize: pageSize,
    }
    if (search) {
        params.search = search
    }
    if (chainIds) {
        params.chainIds = chainIds
    }
    if (status) {
        params.status = status
    }
    if (creator) {
        params.creator = creator
    }
    console.log(params)
    return axios({
        method: "get",
        url: "https://api.tokenlist.app/v1/launchpad/getTokenListPageList",
        params: params,
    })
}

// 上传预售信息
export function uploadPresaleInfo(presaleInfo) {

    return axios({
        method: "post",
        url: "https://api.tokenlist.app/v1/launchpad/uploadPresaleInfo",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:
            presaleInfo
        ,
    })
}

// 获取tokenList预售详情
export function getTokenListPresaleInfo(chainId, contractAddress) {
    let params = {
        chainId: chainId,
        address: contractAddress,
    }
    return axios({
        method: "get",
        url: "https://api.tokenlist.app/v1/launchpad/getTokenListPresale",
        params: params,
    })
}


// 获取tokenList

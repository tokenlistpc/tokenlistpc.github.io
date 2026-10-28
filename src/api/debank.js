import axios from "axios"

export function getTokenList(userAddress, chainId) {
    return axios({
        method: "get",
        url: "https://rd-api.tokenlist.app/v1api/v3/users/balance/token",
        params: {
            address: userAddress,
            chain: chainId.toLowerCase(),
        },
    })
}


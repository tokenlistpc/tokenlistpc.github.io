import axios from "axios"
import { AbiCoder } from "ethers"

export function bannedIP() {
    return axios({
        method: "get",
        url: "https://ip.opencc.xyz/ip/v1/helper/bannedIP",
    })
}


export async function getSourceCode(deployerId) {
    let fileName = ""
    switch (deployerId) {
        case 0:
            fileName = "FreeTaxToken.sol"
            break
        case 1:
            fileName = "FeeToken.sol"
            break
        case 2:
            fileName = "DividendSelfToken.sol"
            break
        case 3:
            fileName = "AddPoolDividendToken.sol"
            break
        case 4:
            fileName = "DividendToken.sol"
            break
        case 5:
            fileName = "FreeTaxTokenV2.sol"
            break
        case 6:
            fileName = "FeeTokenV2.sol"
            break
        case 7:
            fileName = "DividendSelfTokenV2.sol"
            break
        case 8:
            fileName = "AddPoolDividendTokenV2.sol"
            break
        default:
            throw "error deployerId"
    }

    let fileRes = await axios.get("/contract/" + fileName)
    return fileRes.data
}


export function getConstructorArguments(stringParams, addressParams, numberParams, boolParams) {
    const abi = AbiCoder.defaultAbiCoder();
    return abi.encode(
        ["string[]", "address[]", "uint256[]", "bool[]"], // encode as address array
        [stringParams, addressParams, numberParams, boolParams]); // array to encode
}
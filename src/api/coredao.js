import axios from "axios"
import { sleep } from "@/utils"
import { getSourceCode, getConstructorArguments } from "./tools"

const apikey = "989d61b239ba4f5faa1be3b689414dbf"


export async function verifysourcecode(deployerId, stringParams, addressParams, numberParams, boolParams, tokenAddress) {
    const sourceCode = await getSourceCode(deployerId)
    const constructorArguments = getConstructorArguments(stringParams, addressParams, numberParams, boolParams)

    let data = {
        apikey: apikey,                     //A valid API-Key is required        
        module: 'contract',                             //Do not change
        action: 'verifysourcecode',                     //Do not change
        contractaddress: tokenAddress,   //Contract Address starts with 0x...     
        sourceCode: sourceCode,             //Contract Source Code (Flattened if necessary)
        codeformat: "solidity-single-file",             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support       
        compilerversion: "v0.8.4+commit.c7e474f2",   // see https://scan.coredao.org/solcversions for list of support versions
        optimizationUsed: 1, //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
        runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
        constructorArguements: constructorArguments,   //if applicable
        evmversion: "default",             //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
        licenseType: 3,           //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://scan.coredao.org/contract-license-types        
    }

    // if (deployerId == 4) {
    //     data.libraryname1 = "IterableMapping"
    //     data.libraryaddress1 = "0x05C1bFaC5F910f6edC5b3aCA4784120e4E5fB33C"
    // }
    let res = await axios({
        method: "post",
        url: "https://openapi.coredao.org/api",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data,
    })
    if (res.data.status != "1") {
        throw "verify contract fail"
    }
    console.log('verifysourcecode', res)
    return res.data.result
}

export async function checkverifystatus(guid) {
    const res = await axios({
        method: "get",
        url: "https://openapi.coredao.org/api",
        params: {
            "apikey": apikey,
            "module": "contract",
            "action": "checkverifystatus",
            "guid": guid,
        }
    })
    console.log('checkverifystatus', res)

    if (res.data.status != "1") {
        if (res.data.message == "NOTFINISH") {
            await sleep(3000)
            await checkverifystatus(guid)
        } else {
            throw "verify contract fail"
        }

    }
}
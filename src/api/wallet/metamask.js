import { ethers } from "ethers"

import cfg from "@/config"
import ERC20ABI from "@/utils/abi/ERC20.json"
import TokenFactoryABI from "@/utils/abi/TokenFactory.json"
import TokenFactoryV2ABI from "@/utils/abi/TokenFactoryV2.json"
import LPABI from "@/utils/abi/LP.json"
import SwapABI from "@/utils/abi/Swap.json"
import MultiTransferABI from "@/utils/abi/MultiTransfer.json"
import TokenLockV2ABI from "@/utils/abi/TokenLockV2.json"
import TokenLockV3ABI from "@/utils/abi/TokenLockV3.json"
import PresaleFactoryABI from "@/utils/abi/PresaleFactory.json"
import PresaleABI from "@/utils/abi/Presale.json"
import PresaleAffiliateABI from "@/utils/abi/PresaleAffiliate.json"

import NFTABI from "@/utils/abi/NFT.json"
import { hex2Int, int2Hex } from "@/utils"

export const hasMetamask = () => typeof window.ethereum !== 'undefined'

export const connect = async () => {
    console.log("connect")
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    return signer.address.toLowerCase()
}

export const getConnectAccounts = async () => {
    let r = await window.ethereum.request({ method: 'eth_accounts' })
    return r
}

export const parseError = (err) => {
    if (err.code == "ACTION_REJECTED" || err.code == 4001) {
        return "userCancelOperate"
    }
    console.error(err.message)
    return "unkonwError"
}



export function getEthersProvider() {
    // if(window.ethereum)
    // console.log(new ethers.BrowserProvider(window.ethereum))
    return new ethers.BrowserProvider(window.ethereum)
}

export function getEthersRpcProvider(url) {
    // if(window.ethereum)
    // console.log(new ethers.BrowserProvider(window.ethereum))
    return new ethers.JsonRpcProvider(url)
}

export async function contract(address, abi) {
    // console.log("contract")
    const ethersProvider = getEthersProvider()
    const signer = await ethersProvider.getSigner()
    return new ethers.Contract(address, abi, signer)
}

export async function rpcContract(address, abi, url) {
    // console.log("contract")
    const ethersProvider = getEthersRpcProvider(url)
    const signer = await ethersProvider.getSigner()
    return new ethers.Contract(address, abi, signer)
}

export async function getAccount() {
    const ethersProvider = getEthersProvider()
    const accounts = await ethersProvider.send("eth_requestAccounts", [])
    return accounts[0]
}

export async function getBalance(walletAddress) {
    const ethersProvider = getEthersProvider()
    return await ethersProvider.getBalance(walletAddress)
}

export async function getChainId() {
    const ethersProvider = getEthersProvider()
    const network = await ethersProvider.getNetwork()
    return network.chainId
}

export async function approveMaxAmount(tokenAddress, contractAddress) {
    const tokenContract = await contractERC20(tokenAddress)
    return await tokenContract.approve(contractAddress, ethers.MaxUint256)
}

/**
 * 是否限制额度充足
 * @param {*} redPacketContractAddress
 * @param {*} tokenAddress
 * @param {*} walletAddress
 * @returns
 */
export async function isAllowanceEnough(contractAddress, tokenAddress, walletAddress) {
    const tokenContract = await contract(tokenAddress, ERC20ABI)
    // 获取该Token的余额
    const amount = await tokenContract.balanceOf(walletAddress)
    // 获取该钱包对该合约的该Token限额多少
    const allowance = await tokenContract.allowance(walletAddress, contractAddress)
    // // allowance > amount
    // console.log(allowance)
    // console.log(amount)
    return allowance >= amount
}


export async function switchNetwork(chain) {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: int2Hex(chain.chainId),
                },
            ],
        })
        if (!window.ethereum.isMetaMask) {
            window.location.reload()
        }
    } catch (e) {
        console.dir(e)
        if (e.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        "blockExplorerUrls": [...chain.blockExplorerUrls],
                        "rpcUrls": [...chain.rpcUrls],
                        "chainId": int2Hex(chain.chainId),
                        "chainName": chain.chainName,
                        "nativeCurrency": {
                            "name": chain.nativeCurrency.name,
                            "symbol": chain.nativeCurrency.symbol,
                            "decimals": chain.nativeCurrency.decimals
                        }
                    }],
                })
                if (!window.ethereum.isMetaMask) {
                    window.location.reload()
                }
            } catch (ex) {
                throw ex
                // 最好向外抛出异常
            }
        } else {
            // 最好向外抛出异常
            throw e
        }
    }
}

export async function contractERC20(address) {
    return await contract(address, ERC20ABI);
}


export async function getGasPrice() {
    const ethersProvider = getEthersProvider()
    const feeData = await ethersProvider.getFeeData();
    return feeData.gasPrice
}

export async function contractTokenFactory(address) {
    return await contract(address, TokenFactoryABI);
}

export async function contractTokenFactoryV2(address) {
    return await contract(address, TokenFactoryV2ABI);
}

export async function contractTokenLockV2(address) {
    return await contract(address, TokenLockV2ABI);
}

export async function contractTokenLockV3(address) {
    return await contract(address, TokenLockV3ABI);
}

export async function contractLP(address) {
    return await contract(address, LPABI);
}

export async function contractSwap(address) {
    return await contract(address, SwapABI);
}

export async function contractNFT(address) {
    return await contract(address, NFTABI);
}

export async function contractMultiTransfer(address) {
    return await contract(address, MultiTransferABI);
}

export async function contractPresaleFactory(address) {
    return await contract(address, PresaleFactoryABI);
}

export async function contractPresale(address) {
    return await contract(address, PresaleABI);
}

export async function contractPresaleAffiliate(address) {
    return await contract(address, PresaleAffiliateABI);
}
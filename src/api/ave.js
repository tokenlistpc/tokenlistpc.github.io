import axios from "axios";

// 获取用户资产列表
export function getUserToken(chain, address) {
    return axios({
        method: "get",
        url: "https://rd-api.tokenlist.app/v1api/v3/users/balance/token",
        params: {
            chain: chain,
            address: address,
        },
    });
}

// 获取 swap tokens 白名单
export function getSwapTokens(chain) {
    return axios({
        method: "get",
        url: "https://rd-api.tokenlist.app/v1api/v2/aveswap/tokenlist",
        params: {
            chain: chain,
        },
    });
}

// 获取 swap 列表
export function getChainSwaps(chain) {
    console.log(chain);
    if (chain == "eth") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "eth",
                        name: "uniswapv2",
                        swap_url:
                            "https://app.uniswap.org/#/swap?use=V2\u0026inputCurrency=ETH\u0026outputCurrency=",
                        sort_id: 1,
                        is_swap_supported: 1,
                        show_name: "UniswapV2",
                        factory_address:
                            "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
                        router_address:
                            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
                    },
                ],
            },
        };
    } else if (chain == "arbitrum") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "arbitrum",
                        name: "oreoswap",
                        swap_url: "",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "OreoSwap",
                        factory_address:
                            "0xc35dadb65012ec5796536bd9864ed8773abc74c4",
                        router_address:
                            "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
                    },
                    {
                        chain: "arbitrum",
                        name: "sushiswap",
                        swap_url: "",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "SushiSwap",
                        factory_address:
                            "0x20fafd2b0ba599416d75eb54f48cda9812964f46",
                        router_address:
                            "0x38eed6a71a4dda9d7f776946e3cfa4ec43781ae6",
                    },
                ],
            },
        };
    } else if (chain == "polygon") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "polygon",
                        name: "sushiswap",
                        swap_url:
                            "https://app.sushi.com/swap?inputCurrency=MATIC\u0026outputCurrency=",
                        sort_id: 1,
                        is_swap_supported: 1,
                        show_name: "SushiSwap",
                        factory_address:
                            "0xc35dadb65012ec5796536bd9864ed8773abc74c4",
                        router_address:
                            "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
                    },
                ],
            },
        };
    } else if (chain == "core") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "core",
                        name: "archerswap",
                        swap_url:
                            "https://exchange.archerswap.finance/#/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "ArcherSwap",
                        factory_address:
                            "0xe0b8838e8d73ff1ca193e8cc2bc0ebf7cf86f620",
                        router_address:
                            "0x74f56a7560ef0c72cf6d677e3f5f51c2d579ff15",
                    },
                    {
                        chain: "core",
                        name: "shadowswap",
                        swap_url: "https://shadowswap.xyz/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "ShadowSwap",
                        factory_address:
                            "0x326ee96748e7dcc04be1ef8f4e4f6bdd54048932",
                        router_address:
                            "0xcced48e6fe655e5f28e8c4e56514276ba8b34c09",
                    },
                    {
                        chain: "core",
                        name: "icecreamswap",
                        swap_url:
                            "https://icecreamswap.com/swap?chainId=1116\u0026outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "IcecreamSwap",
                        factory_address:
                            "0x9e6d21e759a7a288b80eef94e4737d313d31c13f",
                        router_address:
                            "0xbb5e1777a331ed93e07cf043363e48d320eb96c4",
                    },
                    {
                        chain: "core",
                        name: "lfgswap",
                        swap_url:
                            "https://app.lfgswap.finance/swap?chainId=1116\u0026outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "LFGSwap",
                        factory_address:
                            "0xA1ADD165AED06D26fC1110b153ae17a5A5ae389e",
                        router_address:
                            "0x42a0F91973536f85B06B310fa9C70215784F35a1",
                    },
                    {
                        chain: "core",
                        name: "coyswap",
                        swap_url: "https://coyswap.com/#/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "CoySwap",
                        factory_address:
                            "0x229eeE4a12cdD1b5c49638368ee0A1c7F85d9aE0",
                        router_address:
                            "0x4ee133a21b2bd8ec28d41108082b850b71a3845e",
                    },
                    {
                        chain: "core",
                        name: "galaxyswap",
                        swap_url: "http://www.galaxyswap.vip/?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "GalaxySwap",
                        factory_address:
                            "0x3d66Bb4673eEfA9E94720e572C2F6661BfE895f1",
                        router_address:
                            "0x1F84c89E3EEDc860C9319c98Ab18771E194A6d92",
                    },
                ],
            },
        };
    } else if (chain == "bsc") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "bsc",
                        name: "apeswap",
                        swap_url:
                            "https://app.apeswap.finance/swap?inputCurrency=BNB\u0026outputCurrency=",
                        sort_id: 4,
                        is_swap_supported: 1,
                        show_name: "ApeSwap",
                        factory_address:
                            "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
                        router_address:
                            "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
                    },
                    {
                        chain: "bsc",
                        name: "biswap",
                        swap_url:
                            "https://exchange.biswap.org/#/swap?inputCurrency=BNB\u0026outputCurrency=",
                        sort_id: 5,
                        is_swap_supported: 1,
                        show_name: "Biswap",
                        factory_address:
                            "0x858E3312ed3A876947EA49d572A7C42DE08af7EE",
                        router_address:
                            "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
                    },
                    {
                        chain: "bsc",
                        name: "cake",
                        swap_url:
                            "https://pancakeswap.finance/swap?inputCurrency=BNB\u0026outputCurrency=",
                        sort_id: 8,
                        is_swap_supported: 1,
                        show_name: "PancakeSwap",
                        factory_address:
                            "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
                        router_address:
                            "0x10ED43C718714eb63d5aA57B78B54704E256024E",
                    },
                ],
            },
        };
    } else if (chain == "pego") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "pego",
                        name: "pegow3swap",
                        swap_url: "https://www.w3swap.finance/?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "PegoW3swap",
                        factory_address:
                            "0x94274b1Ed6E1BDe55fa631f502Aa18512Aa3007b",
                        router_address:
                            "0xE9d6f80028671279a28790bb4007B10B0595Def1",
                    },
                ],
            },
        };
    } else if (chain == "avalanche") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "avalanche",
                        name: "sushiswap",
                        swap_url: "",
                        sort_id: 1,
                        is_swap_supported: 1,
                        show_name: "SushiSwap",
                        factory_address:
                            "0xc35dadb65012ec5796536bd9864ed8773abc74c4",
                        router_address:
                            "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
                    },
                ],
            },
        };
    } else if (chain == "optimism") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [],
            },
        };
    } else if (chain == "filecoin") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "filecoin",
                        name: "themis",
                        swap_url:
                            "https://swap.themis.capital/#/?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "Themis",
                        factory_address:
                            "0xe250A89d23F466c14B26BDF60a0DC3b54974FBE9",
                        router_address:
                            "0xCb2D69D97769B7e97F873B53051CD36645F205A3",
                    },
                ],
            },
        };
    } else if (chain == "alveychain") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "alveychain",
                        name: "elvesdex",
                        swap_url: "https://elvesdex.com/swap?outputCurreny=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "ElvesDex",
                        factory_address:
                            "0xcadB0365436cbdB05D71C355F209AdaB214D8Dab",
                        router_address:
                            "0x154a76D1095c69a942411CaB9aEef6a155EbF90E",
                    },
                ],
            },
        };
    } else if (chain == "base") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "base",
                        name: "basexswap",
                        swap_url: "https://swap.xnewbase.com/?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "XSwap",
                        factory_address:
                            "0xd9EdA30Ce9ecDaCa840c71f819497D83AC52bCfD",
                        router_address:
                            "0xBCEb0Ee20ED1489DbEa44dB08A1E95004ca2753a",
                    },
                    {
                        chain: "base",
                        name: "rocketswap",
                        swap_url:
                            "https://app.rocketswap.cc/exchange/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "RocketSwap",
                        factory_address:
                            "0x1b8128c3a1b7d20053d10763ff02466ca7ff99fc",
                        router_address:
                            "0x4cf76043b3f97ba06917cbd90f9e3a2aac1b306e",
                    },
                    {
                        chain: "base",
                        name: "cbsswap",
                        swap_url:
                            "https://app.cbswap.io/#/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "CBSWAP",
                        factory_address:
                            "0x0a1c657b839a7fe9a976ffd4ac5a1a363de3ee69",
                        router_address:
                            "0xc4623408e3060f3c57e1a8d3716123f478e5d82f",
                    },
                    {
                        chain: "base",
                        name: "swapbased",
                        swap_url:
                            "https://swapbased.finance/#/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "SwapBased",
                        factory_address:
                            "0x04c9f118d21e8b767d2e50c946f0cc9f6c367300",
                        router_address:
                            "0xaaa3b1f1bd7bcc97fd1917c18ade665c5d31f066",
                    },
                ],
            },
        };
    } else if (chain == "opbnb") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "opbnb",
                        name: "opbswap",
                        swap_url:
                            "https://opbswap.finance/#/swap?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "Opbswap",
                        factory_address:
                            "0xaBF22d550F8402f52CD5490a2bb6157DAa966AFC",
                        router_address:
                            "0xdA9EF9A892E34B7146FFD069092Cc632Ab28B0A1",
                    },
                ],
            },
        };
    } else if (chain == "bitchain") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "bitchain",
                        name: "bitswap",
                        swap_url:
                            "https://swap.bitchain.biz?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 0,
                        show_name: "BitSwap",
                        factory_address:
                            "0x357f77c780c3423d62c203b72383c77a58a92a4f",
                        router_address:
                            "0xA15365c3ce84b2cc9D4D5C612c202354e4Cc2c1F",
                    },
                ],
            },
        };
    } else if (chain == "fsc") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "fsc",
                        name: "orangeswap",
                        swap_url:
                            "https://orangeswap.org/swap?outputCurrenc=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "OrangeSwap",
                        factory_address:
                            "0x6d80cD098109a3976FB9fEe2BCa3c171E31c0dFa",
                        router_address:
                            "0xaea18639130f9DAa0f2f82f9E133eC5CaD9023B8",
                    },
                    {
                        chain: "fsc",
                        name: "fastswap",
                        swap_url:
                            "https://www.fastdex.exchange/?outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "FastSwap",
                        factory_address:
                            "0x2E0b216382582B62166373308b96c115794e1d4F",
                        router_address:
                            "0x260f97A47454ecAfa17fcA4Fb325bCa839D8D51a",
                    },
                ],
            },
        }
    } else if (chain == "bsc_testnet") {
        return {
            data: {
                status: 1,
                msg: "SUCCESS",
                data: [
                    {
                        chain: "bsc_testnet",
                        name: "cake",
                        swap_url:
                            "https://pancakeswap.finance/swap?inputCurrency=BNB\u0026outputCurrency=",
                        sort_id: 0,
                        is_swap_supported: 1,
                        show_name: "PancakeSwap",
                        factory_address:
                            "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc",
                        router_address:
                            "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
                    },
                ],
            },
        }
    }
}

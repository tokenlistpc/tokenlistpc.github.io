import { defineStore } from "pinia"

export const useLpStore = defineStore("lp", {
    state: () => {
        return {
            networks: [
                {
                    name: 'BSC',
                    pinkName: 'BSC',
                    value: 56,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png'
                },
                {
                    name: 'ETH',
                    pinkName: 'ETH',
                    value: 1,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png'
                },
                {
                    name: 'Polygon',
                    pinkName: 'Matic',
                    value: 137,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png'
                },
                {
                    name: 'Avalanche',
                    pinkName: 'AVAX',
                    value: 43114,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png'
                },
                {
                    name: 'Fantom',
                    pinkName: 'FTM',
                    value: 250,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png'
                },
                {
                    name: 'Cronos',
                    pinkName: 'Cronos',
                    value: 25,
                    icon: 'https://www.pinksale.finance/static/media/ic-cronos.5a2dbab3.svg'
                },
                {
                    name: 'DogeChain',
                    pinkName: 'DogeChain',
                    value: 2000,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png'
                },
                {
                    name: 'AlveyChain',
                    pinkName: 'Alvey',
                    value: 3797,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png'
                },
                {
                    name: 'Arbitrum',
                    pinkName: 'Arbitrum',
                    value: 42161,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png'
                },
                {
                    name: 'PulseChain',
                    pinkName: 'PulseChain',
                    value: 369,
                    icon: 'https://www.pinksale.finance/static/media/ic-pulsechain.5ff7a9ba.png'
                },
                {
                    name: 'Bitrock',
                    pinkName: 'bitrock',
                    value: 7171,
                    icon: 'https://www.avestorage.cloud/chain/bitrock.png'
                },
                {
                    name: 'Base',
                    pinkName: '',
                    value: 8453,
                    icon: 'https://www.avestorage.cloud/chain/base.png'
                },
                {
                    name: 'Core',
                    pinkName: '',
                    value: 1116,
                    icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/core.png'
                },
                // {
                //     name: 'opBNB',
                //     pinkName: '',
                //     value: 204,
                //     icon: 'https://ave.s3.ap-east-1.amazonaws.com/chain/opbnb.png'
                // },
                // {
                //     name: 'TomoChain',
                //     pinkName: '',
                //     value: 88,
                //     icon: 'https://icons.llamao.fi/icons/chains/rsz_tomochain.jpg'
                // },
                // {
                //     name: 'Telos',
                //     pinkName: '',
                //     value: 40,
                //     icon: 'https://icons.llamao.fi/icons/chains/rsz_telos.jpg'
                // },
                // {
                //     name: 'Meter',
                //     pinkName: '',
                //     value: 82,
                //     icon: 'https://icons.llamao.fi/icons/chains/rsz_meter.jpg'
                // },
                // {
                //     name: 'CoinEx',
                //     pinkName: '',
                //     value: 52,
                //     icon: 'https://icons.llamao.fi/icons/chains/rsz_csc.jpg'
                // },
                // {
                //     name: 'AmeChain',
                //     pinkName: '',
                //     value: 180,
                //     icon: 'https://www.avestorage.cloud/chain/ame.png'
                // },
                // {
                //     name: 'Bitindi',
                //     pinkName: '',
                //     value: 4099,
                //     icon: 'https://www.avestorage.cloud/chain/bni.png'
                // },
            ],
            platforms: [
                {
                    name: 'allPlatforms',
                    value: 'all',
                    icon: ''
                }, {
                    name: 'PinkSale',
                    value: 'pinksale',
                    icon: '/images/pinkswap.png'
                },
                {
                    name: 'Uncx',
                    value: 'uncx',
                    icon: '/images/uncx.png'
                },
                {
                    name: 'DX',
                    value: 'dx',
                    icon: '/images/dx.jpg'
                }
            ],
            statusList: [
                {
                    name: 'allStatus',
                    value: 'all',
                }, {
                    name: 'salelive',
                    value: 'salelive',
                }, {
                    name: 'upcoming',
                    value: 'upcoming',
                }, {
                    name: 'ended',
                    value: 'ended',
                }, {
                    name: 'canceled',
                    value: 'canceled',
                }
            ],
            checkedStatus: 'all'
        }
    },
    actions: {

    },
})

import { defineStore } from "pinia"

export const useLmListStore = defineStore("list", {
    state: () => {
        return {
            // 0 全部锁定  1  我的锁定
            lockType: 0,
            // token lpToken lpTokenV3
            tokenType: null,
            pageSize: 5,
            lockList: [
                {
                    name: "allLock",
                    pageNumber: 1,
                    list: [],
                    loading: false,
                },
                {
                    name: "myLock",
                    pageNumber: 1,
                    list: [],
                    loading: false,
                },
            ],
            searchLockList: {
                list: [],
                loading: false,
            }
        }
    },
    actions: {

    }
})

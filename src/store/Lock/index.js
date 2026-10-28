import { defineStore } from "pinia"

export const useLmStore = defineStore("lm", {
    state: () => {
        return {
            prevPath: "",
            token: null,
            name: 1,
            tokenLockV2Address: "",
            tokenLockV3Address: "",
        }
    },
    actions: {

    },
})

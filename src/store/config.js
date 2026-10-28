import { defineStore } from "pinia"

export const useConfigStore = defineStore("config", {
    state: () => {
        return {
            loginDialogVisible: false,
            utm: ""
        }
    },
    actions: {

    },
    persist: {
        enabled: false
    }
})
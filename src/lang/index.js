import { createI18n } from "vue-i18n"

import enLocale from "./en.json"
import zhLocale from "./zh-cn.json"
import storage from "good-storage"

const i18n = createI18n({
    locale: storage.get("language", "en"),
    fallbackLocale: "zh-cn",
    legacy: false,
    messages: {
        en: enLocale,
        "zh-cn": zhLocale,
    },
})
export default i18n
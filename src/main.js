import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
import "@/style.scss";
import router from "@/router";
import i18n from "@/lang";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon.vue";
import IconText from "@/components/IconText.vue";
import AveRadio from "@/components/AveRadio.vue";
import api from "@/api";
import piniaPersist from "pinia-plugin-persist";
import App from "./App.vue";
import mobile from "is-mobile";
import BigNumber from 'bignumber.js'

// if (mobile.isMobile()) {
//     window.location.href = "https://m.tokenlist.app/";//来回跳转如果有utm加上utm
// }

window.BigNumber = BigNumber
const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.component("SvgIcon", SvgIcon);
app.component("IconText", IconText);
app.component("AveRadio", AveRadio);

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount("#app");

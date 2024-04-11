import "./assets/main.css";
import "./index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import VueYtframe from "vue3-ytframe";



const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(VueYtframe);

app.mount("#app");
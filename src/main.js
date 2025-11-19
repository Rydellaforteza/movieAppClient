import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

import { useGlobalStore } from "./stores/global";
const global = useGlobalStore();
global.init();

app.mount("#app");

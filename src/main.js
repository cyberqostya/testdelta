import "@/styles/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
// import HighchartsVue from "highcharts-vue";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// app.use(HighchartsVue);

app.mount("#app");

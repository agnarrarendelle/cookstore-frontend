import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index";
import { store } from "./state";
import axios from "./service/index";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);

app.mount("#app");

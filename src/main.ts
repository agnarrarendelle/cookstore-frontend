import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index";
import { store } from "./state";
const app = createApp(App);

app.use(store)
app.use(router);
app.use(ElementPlus);

app.mount("#app");

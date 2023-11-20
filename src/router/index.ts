import About from "../views/About.vue";
import AllProduct from "../views/AllProduct.vue";
import ProductDetail from "../views/ProductDetail.vue";
import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: AllProduct,
  },
  {
    path: "/products",
    name: "all products",
    component: AllProduct,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/product/:productId",
    name: "product detail",
    component: ProductDetail,
  },
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
};

const router: Router = createRouter(options);

export default router;

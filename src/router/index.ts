import { isAuthticated } from "../utils/auth";
import About from "../views/About.vue";
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminIndex from "../views/admin/AdminIndex.vue";
import AllProduct from "../views/AllProduct.vue";
import ProductDetail from "../views/ProductDetail.vue";
import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";
import AdminProducts from "../views/admin/AdminProducts.vue";
import AdminUploadNewProduct from "../views/admin/AdminUploadNewProduct.vue";
import AdminUnpaidOrders from "../views/admin/AdminUnpaidOrders.vue";
import AdminCategory from "../views/admin/AdminCategory.vue";

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
  {
    path: "/admin/login",
    name: "admin login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    name: "admin index",
    component: AdminIndex,
    children: [
      {
        path: "products",
        component: AdminProducts,
      },
      {
        path: "upload-product",
        component: AdminUploadNewProduct,
      },
      {
        path: "unpaid-orders",
        name: "unpaid orders",
        component: AdminUnpaidOrders,
      },
      {
        path: "categories",
        name: "categories",
        component: AdminCategory,
      },
    ],
  },
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
};

const router: Router = createRouter(options);

router.beforeEach(async (to, _, next) => {
  const isAdminProtectedRoute =
    to.path.includes("/admin") && !to.path.endsWith("/login");
  if (isAdminProtectedRoute) {
    const isAuthenticated = await isAuthticated();
    if (!isAuthenticated) next({ name: "home" });
  }

  next();
});

export default router;

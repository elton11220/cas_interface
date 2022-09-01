import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CallbackView from "../views/CallbackView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => import("../views/FindPwdView.vue"),
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallbackView,
    beforeEnter: (to, from, next) => {
      const { query } = to;
      if (!query?.code) {
        next('/')
      } else {
        next()
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

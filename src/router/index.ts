import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CallbackView from "../views/CallbackView.vue";
import RedirectView from "../views/RedirectView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const { query } = to;
      if (query?.redirect) {
        window.localStorage.setItem('redirect', query.redirect as string)
      }
      const expiryTime = window.localStorage.getItem("authorized");
      if (
        window.localStorage.getItem("redirect") === null &&
        expiryTime !== null &&
        Number(expiryTime).toString() !== "NaN" &&
        new Date().getTime() < Number.parseInt(expiryTime)
      ) {
        // 用户已登录且不存在重定向URL
        next('/noRedirectUrl')
      } else if (
        window.localStorage.getItem("redirect") !== null &&
        expiryTime !== null &&
        Number(expiryTime).toString() !== "NaN" &&
        new Date().getTime() < Number.parseInt(expiryTime)
      ) {
        // 用户已登录且存在重定向URL
        next('/redirect')
      } else {
        next()
      }
    }
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
  },
  {
    path: '/noRedirectUrl',
    name: 'noRedirectUrl',
    component: () => import("../views/NoRedirectUrlView.vue"),
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: RedirectView,
    beforeEnter: (to, from, next) => {
      const expiryTime = window.localStorage.getItem("authorized");
      if (
        window.localStorage.getItem("redirect") !== null &&
        expiryTime !== null &&
        Number(expiryTime).toString() !== "NaN" &&
        new Date().getTime() < Number.parseInt(expiryTime)
      ) {
        next()
      } else {
        // 用户直接访问本路径，不存在登录记录和重定向信息
        next('/')
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

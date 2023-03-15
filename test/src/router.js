import auth from "./auth";
import { createRouter, createWebHashHistory } from "vue-router";

import Employees from "./views/employees-page";
import Beneficiaries from "./views/beneficiaries-page";
import defaultLayout from "./layouts/side-nav-outer-toolbar";

const router = new createRouter({
  routes: [
    {
      path: "/employees",
      name: "employees",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Employees
    },
    {
      path: "/beneficiaries",
      name: "beneficiaries",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Beneficiaries
    },
    
    {
      path: "/",
      redirect: "/employees"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }
  ],
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

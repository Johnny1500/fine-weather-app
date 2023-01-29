import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/city/:cityname",
      name: "city",
      component: CityView,
      meta: {
        title: "City weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  document.title = `${to.query.fullName ?? to.meta.title} | Fine Weather`;
  next();
});

export default router;

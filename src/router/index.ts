import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "friends-feed",
      component: () => import("../views/FriendsFeedView.vue"),
    },
  ],
});

export default router;

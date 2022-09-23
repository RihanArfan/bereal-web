import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/me",
      name: "account",
      component: () => import("@/views/AccountView.vue"),
    },
    {
      path: "/",
      name: "friends-feed",
      component: () => import("@/views/FriendsFeedView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if (to.name === "login") return true;

  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) return { name: "login" };
});

export default router;

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
      path: "/@:id(.*)",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "",
      component: () => import("@/components/FeedLayout.vue"),
      children: [
        {
          path: "",
          name: "friends-feed",
          component: () => import("@/views/FriendsFeedView.vue"),
        },
        {
          path: "discovery",
          name: "discovery-feed",
          component: () => import("@/views/DiscoveryFeedView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  if (to.name === "login") return true;

  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) return { name: "login" };
});

export default router;

import { useAccountStore } from "@/stores/account";
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
      path: "/@:username(.*)",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "/me",
      name: "my-profile",
      component: () => import("@/views/MyProfileView.vue"),
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
    {
      name: "caption",
      path: "/me/caption",
      component: () => import("@/views/MyPostCaptionView.vue"),
    },
    {
      path: "/friends",
      component: () => import("@/components/FriendLayout.vue"),
      children: [
        {
          path: "",
          name: "friends",
          component: () => import("@/views/FriendListView.vue"),
        },
        {
          path: "suggestions",
          name: "friend-suggestions",
          component: () => import("@/views/FriendSuggestionsView.vue"),
        },
        {
          path: "requests",
          name: "friend-requests",
          component: () => import("@/views/FriendRequestsView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  // auth
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn && to.name === "login") return true;
  if (!isLoggedIn) return { name: "login" };

  // my-profile redirect
  if (to.name === "profile") {
    const accountStore = useAccountStore();
    if (to.params.username === accountStore.account?.username)
      return { name: "my-profile" };
  }
});

export default router;

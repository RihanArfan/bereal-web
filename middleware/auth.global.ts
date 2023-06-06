export default defineNuxtRouteMiddleware((to, from) => {
  const IS_LOGGED_IN = true;

  // TODO: exclude routes that don't require authentication

  if (!IS_LOGGED_IN) {
    return navigateTo("/login");
  }
});

export default defineNuxtRouteMiddleware((to) => {
  const today = new Date().toISOString().split('T')[0];


  if (!to.query.d) {
    return navigateTo({
      ...to,
      query: {
        ...to.query,
        d: today
      }
    });
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name === 'index' && useState('user')?.value?.isAuthenticated !== true) {
      return navigateTo('/login')
    }
    // return navigateTo('/')
})
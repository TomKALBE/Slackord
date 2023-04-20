export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to)
  if (to.name === 'index' && !useState('user')?.value?.isAuthenticated) {
      console.log("middleware", useState('user')?.value?.isAuthenticated )
      return navigateTo('/register')
    }
    // return navigateTo('/')
})
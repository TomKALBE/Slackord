<script lang="ts" setup>
const props = defineProps({
  maFonction: Function,
})
const handleClick = () => {
  const res = useAuth().login()
  if (res === true)
    navigateTo('/')
}
const login = async () => {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "xxxtz",
        "password": "xxx",
        "pseudo": "xxxtz"
      }),
    })
    const json = await res.json()
    console.log(json)
  } catch (e) {
    console.log(e)
  }
}
onMounted(() => {

})
</script>
<template>
  <div class="main h-screen w-screen flex justify-center items-center bg-slate-650">
    <div class="border-2 border-slate-450 rounded-md bg-slate-750 p-8">
      <div class="w-100 flex flex-col items-center">
        <h1 class="text-indigo-500 text-xl font-bold">Connexion</h1>
        <p class="text-white text-xs mt-3">
          Vous n'avez pas encore de compte ?
        </p>
        <NuxtLink to="/register" class="text-white text-xs underline mt-3">Inscrivez-vous</NuxtLink>
      </div>
      <form class="h-100 flex flex-col items-center justify-center mt-6">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
          <input type="email" id="email"
            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="name@zombo.com" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-white">Mot de passe</label>
          <input type="password" id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            required />
        </div>
        <button @click="handleClick" type="button"
          class="text-white bg-indigo-600 active:bg-indigo-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Connexion
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.main {
  background: rgb(20, 30, 45);
  background: -webkit-linear-gradient(to top,
      rgb(61, 74, 91),
      rgb(41, 54, 71),
      rgb(20, 30, 45));
  background: linear-gradient(to bottom,
      rgb(61, 74, 91),
      rgb(41, 54, 71),
      rgb(20, 30, 45));
}
</style>

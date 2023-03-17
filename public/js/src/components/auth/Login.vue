<template>
  <div class="h-screen w-screen flex justify-center items-center bg-slate-650">
    <div class="border-2 border-slate-450 rounded-md bg-slate-750 p-8">
      <div class="w-100 flex flex-col items-center">
        <h1 class="text-indigo-500 text-xl font-bold">Connexion</h1>
        <p class="text-white text-xs mt-3">Vous n'avez pas encore de compte ?</p>
        <a class="text-white text-xs underline mt-3">Inscrivez-vous</a>
      </div>
      <form class="h-100 flex flex-col items-center justify-center mt-6">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@zombo.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-white"
            >Mot de passe</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
            type="button"
            class="text-white bg-indigo-600 active:bg-indigo-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Connexion
          </button>
      </form>
    </div>
  </div>
</template>

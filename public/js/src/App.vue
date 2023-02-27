<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <!-- SECTION Server Part -->
    <div class="flex w-100 h-16 bg-slate-300">
      <div class="flex w-3/4 bg-slate-800 items-center">
        <!-- SECTION Server List -->
        <div class="flex w-8/12 items-center">
          <!-- SECTION Server without notification -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300">
            <div class="w-10 h-10 rounded-lg bg-orange-400 cursor-pointer"></div>
          </div>
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300">
            <div class="w-10 h-10 rounded-lg bg-indigo-400 cursor-pointer"></div>
          </div>
          <!-- !SECTION -->
          <!-- SECTION Server with notification -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300">
            <div class="w-10 h-10 rounded-lg bg-green-400 cursor-pointer relative">
              <div
                class="w-4 h-4 absolute bg-slate-100 border-2 border-slate-800 rounded-full right-[-0.375rem] top-[-0.375rem]">
              </div>
            </div>
          </div>
          <!-- !SECTION -->
          <!-- SECTION Add new Server -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer border border-gray-400">
              <font-awesome-icon class="h-6 w-6 text-gray-100" :icon="`fa-plus`" />
            </div>
          </div>
          <!-- !SECTION -->
        </div>
        <!-- !SECTION -->
        <!-- SECTION SearchBar -->
        <div class="flex w-4/12 items-center justify-center relative">
          <font-awesome-icon class="h-4 w-4 text-slate-300 absolute xl:left-24 lg:left-16 md:left-6 left-4"
            icon="magnifying-glass" />
          <input
            class="w-10/12 text-center text-white bg-slate-700 border focus:outline-none border-slate-400 placeholder:text-slate-300 rounded-md"
            placeholder="Find someone" />
        </div>
        <!-- !SECTION -->
      </div>
      <!-- !SECTION -->
      <!-- SECTION Profile part-->
      <div class="flex group w-1/4 h-full bg-slate-700 items-center border-l-2 border-gray-400">
        <div
          class="flex w-12 h-12 rounded-full border-2 cursor-pointer bg-gray-400 mx-2 justify-center items-center relative">
          <font-awesome-icon class="h-6 w-6 text-white" :icon="['far', 'user']" />
          <div class="w-3 h-3 absolute bg-orange-600 bottom-[-0.125rem] left-[-0.125rem] rounded-full"></div>
        </div>
        <div class="flex-1 mr-1">
          <p class="text-white group-hover:border-b-2 cursor-pointer inline-block">
            DieuDonné Allognon
          </p>
        </div>
      </div>
    </div>
    <!-- !SECTION -->
    <!-- SECTION Channel Part -->
    <div class="flex-1 flex">
      <div class="lg:w-3/12 sm:w-4/12 bg-slate-700 border-r-2 border-t-2 border-slate-800">
        <!-- SECTION Header -->
        <div class="w-full h-14 flex items-center border-b-2 border-slate-800">
          <div class="ml-4 flex w-full items-center justify-around">
            <div class="inline-flex items-center p-2 hover:bg-slate-550 hover:rounded cursor-pointer">
              <p class="text-xl text-white">Zombo Com</p>
              <font-awesome-icon class="w-4 text-gray-100 ml-2" :icon="`fa-chevron-down`" />
            </div>
            <div
              class="flex items-center justify-center hover:bg-slate-550 hover:rounded-full cursor-pointer w-10 h-10">
              <font-awesome-icon class="w-5 h-5 text-white" :icon="['far', 'bell']" />
            </div>
          </div>
        </div>
        <!-- !SECTION -->
        <!-- SECTION Channel list -->
        <div class="flex justify-center">
          <div class="flex-col w-11/12 mt-4 space-y-3">
            <div class="flex w-full bg-slate-550 rounded-md h-10 items-center justify-between">
              <p class="text-slate-150 ml-8"># Channel 1</p>
              <font-awesome-icon class="w-4 text-gray-300 hover:text-gray-100 cursor-pointer mr-2" icon="fa-gear" />
            </div>
            <div class="flex w-full h-10 items-center">
              <p class="text-slate-150 ml-8"># Channel 2</p>
            </div>
            <div class="flex w-full h-10 items-center">
              <p class="text-slate-150 ml-8"># Channel 3</p>
            </div>
            <div class="flex w-full h-10 items-center">
              <p class="text-slate-150 ml-8"># Channel 4</p>
            </div>
          </div>
        </div>
        <!-- !SECTION -->
      </div>
      <!-- SECTION Chat Part -->
      <div class="flex flex-col lg:w-9/12 sm:w-8/12 bg-slate-650 border-t-2 border-slate-800">
        <!-- SECTION Channel info -->
        <div class="flex w-full h-14 border-b-2 border-slate-800 items-center justify-between">
          <p class="ml-6 text-xl text-white"># Channel 1</p>
          <div class="mr-6">
            <font-awesome-icon class="w-5 h-5 text-slate-150 mr-4" :icon="['fa', 'bell']" />
            <font-awesome-icon class="w-5 h-5 text-slate-150" :icon="['fa', 'user-group']" />
          </div>
        </div>
        <!-- !SECTION -->
        <!-- SECTION Chat -->
        <div class="h-full max-h-full flex">
          <div class="fixed flex-col-reverse h-full overflow-scroll w-full">
            <!-- SECTION Messages -->
            <!-- <div class="flex flex-col-reverse"> -->
            <!-- Todo Gérer l'overflow -->
            <div v-for="i in 25" :key="i" class="flex h-14">
              <div class="flex w-14 justify-center items-center">
                <div class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center">
                  <font-awesome-icon class="h-4 w-4 text-white" :icon="['far', 'user']" />
                </div>
              </div>
              <div class="flex-1 flex items-center text-slate-200">
                Bonjour je suis très heureux d'être ici
              </div>
            </div>
            <!-- </div> -->
            <!-- !SECTION -->
            <!-- SECTION Input -->
            <!-- !SECTION -->
          </div>
        </div>
        <div class="w-full flex bg-slate-650 justify-center z-10">
          <div class="flex w-10/12 my-8 h-10 border-2 border-slate-500 rounded-md self-center justify-end items-center">
            <div class="flex justify-center w-1/12">
              <div
                class="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 hover:bg-slate-50 cursor-pointer">
                <font-awesome-icon class="w-4 text-slate-700" icon="plus" />
              </div>
            </div>

            <input placeholder="Envoyez un message"
              class="w-11/12 h-full border-none bg-transparent text-white placeholder:text-slate-300 pb-1 focus:outline-none" />
          </div>
        </div>
        <!-- !SECTION -->
      </div>

      <!-- !SECTION  -->
    </div>
    <!-- !SECTION -->
  </div>
</template>

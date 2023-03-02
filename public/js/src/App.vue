<script setup lang="ts">
import { onMounted } from "vue";
import { initDropdowns, initModals } from "flowbite";
import { ADD_SERVER_MODAL } from "@/tools/modal";
// initialize components based on data attribute selectors
onMounted(() => {
  initDropdowns();
  initModals();
});
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <!-- SECTION Server Part -->
    <div class="flex w-100 h-16 bg-slate-300">
      <div class="flex w-3/4 bg-slate-800 items-center">
        <!-- SECTION Server List -->
        <div class="flex w-8/12 items-center">
          <!-- SECTION Server without notification -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300"
          >
            <div
              class="w-10 h-10 rounded-lg bg-orange-400 cursor-pointer"
            ></div>
            <div
              class="w-6 h-2 rounded-lg bg-slate-200 absolute -top-1"
            ></div>
          </div>
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300"
          >
            <div
              class="w-10 h-10 rounded-lg bg-indigo-400 cursor-pointer"
            ></div>
          </div>
          <!-- !SECTION Server without notification-->
          <!-- SECTION Server with notification -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300"
          >
            <div
              class="w-10 h-10 rounded-lg bg-green-400 cursor-pointer relative"
            >
              <div
                class="w-4 h-4 absolute bg-slate-100 border-2 border-slate-800 rounded-full right-[-0.375rem] top-[-0.375rem]"
              ></div>
            </div>
          </div>
          <!-- !SECTION Server with notification-->
          <!-- SECTION Add new Server -->
          <div
            class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300"
          >
            <div
              :data-modal-target="ADD_SERVER_MODAL"
              :data-modal-toggle="ADD_SERVER_MODAL"
              class="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer border border-gray-400"
            >
              <font-awesome-icon
                class="h-6 w-6 text-gray-100"
                :icon="`fa-plus`"
              />
            </div>
          </div>
          <!-- !SECTION Add new Server-->
        </div>
        <!-- !SECTION Server List-->
        <!-- SECTION SearchBar -->
        <div class="flex w-4/12 items-center justify-center relative">
          <font-awesome-icon
            class="h-4 w-4 text-slate-300 absolute xl:left-24 lg:left-16 md:left-6 left-4"
            icon="magnifying-glass"
          />
          <input
            class="w-10/12 text-center text-white bg-slate-700 border focus:outline-none border-slate-400 placeholder:text-slate-300 rounded-md"
            placeholder="Find someone"
          />
        </div>
        <!-- !SECTION SearchBar-->
      </div>
      <!-- SECTION Profile part-->
      <div
        class="flex group w-1/4 h-full bg-slate-700 items-center border-l-2 border-gray-400"
      >
        <div
          data-dropdown-toggle="profilDropdown"
          data-dropdown-placement="bottom"
          class="w-auto flex justify-center items-center"
        >
          <div
            class="flex w-12 h-12 rounded-full border-2 cursor-pointer bg-gray-400 mx-2 justify-center items-center relative"
          >
            <font-awesome-icon
              class="h-6 w-6 text-white"
              :icon="['far', 'user']"
            />
            <div
              class="w-3 h-3 absolute bg-red-400 bottom-[-0.125rem] left-[-0.125rem] rounded-full"
            ></div>
            <div
              class="animate-ping w-3 h-3 absolute bg-red-400 bottom-[-0.125rem] left-[-0.125rem] rounded-full"
            ></div>
          </div>
          <div class="flex-1 mr-1">
            <p
              class="text-white group-hover:border-b-2 cursor-pointer inline-block"
            >
              DieuDonné Allognon
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      id="profilDropdown"
      class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-48 bg-slate-800 border-2 border-slate-600"
    >
      <ul class="py-2 text-sm text-gray-200" aria-labelledby="profilDropdown">
        <li
          class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
          data-dropdown-toggle="dropdownUserStatus"
          data-dropdown-placement="left"
          data-dropdown-trigger="hover"
          data-dropdown-delay="100"
        >
          <font-awesome-icon class="w-auto mr-3" icon="chevron-left" />
          <div class="flex items-center">
            <a
              href="#"
              class="flex ml-1 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
              >Ne pas déranger</a
            >
            <span class="ml-2 w-3 h-3 mt-[3px] bg-red-400 rounded-full"></span>
          </div>
          <div
            id="dropdownUserStatus"
            class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-slate-800 border-2 border-slate-600"
          >
            <ul
              class="py-2 text-sm text-gray-200"
              aria-labelledby="dropdownUserStatus"
            >
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
              >
                <span class="w-3 h-3 bg-green-400 rounded-full"></span>
                <a href="#" class="ml-2 font-semibold text-slate-200"
                  >En ligne</a
                >
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                data-dropdown-toggle="dropdownUserStatus"
                data-dropdown-target="dropdownUserStatus"
              >
                <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <div
                  class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                >
                  Inactif
                </div>
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
              >
                <span class="w-3 h-3 bg-red-400 rounded-full"></span>
                <a
                  href="#"
                  class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                  >Ne pas déranger</a
                >
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
              >
                <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
                <a
                  href="#"
                  class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                  >Invisible</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li
          class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
        >
          <font-awesome-icon icon="sign-out" class="w-auto mr-3 rotate-180" />
          <a href="#" class="flex font-semibold text-orange-500"
            >Se déconnecter</a
          >
        </li>
      </ul>
    </div>

    <!-- !SECTION Server Part-->
    <!-- SECTION Channel Part -->
    <div class="flex-1 flex">
      <div
        class="lg:w-3/12 sm:w-4/12 bg-slate-700 border-r-2 border-t-2 border-slate-800"
      >
        <!-- SECTION Header -->
        <div class="w-full h-14 flex items-center border-b-2 border-slate-800">
          <div class="ml-4 flex w-full items-center justify-around">
            <div
              class="inline-flex items-center p-2 hover:bg-slate-550 hover:rounded cursor-pointer"
            >
              <p class="text-xl text-white">Zombo Com</p>
              <font-awesome-icon
                class="w-4 text-gray-100 ml-2"
                :icon="`fa-chevron-down`"
              />
            </div>
            <div
              class="flex items-center justify-center hover:bg-slate-550 hover:rounded-full cursor-pointer w-10 h-10"
            >
              <font-awesome-icon
                class="w-5 h-5 text-white"
                :icon="['far', 'bell']"
              />
            </div>
          </div>
        </div>
        <!-- !SECTION Header-->
        <!-- SECTION Channel list -->
        <div class="flex justify-center">
          <div class="flex-col w-11/12 mt-4 space-y-3">
            <div
              class="flex w-full bg-slate-550 rounded-md h-10 items-center justify-between"
            >
              <p class="text-slate-150 ml-8"># Channel 1</p>
              <font-awesome-icon
                data-dropdown-toggle="dropdown"
                class="w-4 text-gray-300 hover:text-gray-100 cursor-pointer mr-2"
                icon="fa-gear"
              />
              <div
                id="dropdown"
                class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                      >Modifier</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 font-semibold text-orange-500 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                      >Supprimer</a
                    >
                  </li>
                </ul>
              </div>
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
        <!-- !SECTION Channel list-->
      </div>
      <!-- SECTION Chat Part -->
      <div
        class="flex flex-col lg:w-9/12 sm:w-8/12 bg-slate-650 border-t-2 border-slate-800"
      >
        <!-- SECTION Channel info -->
        <div
          class="flex w-full h-14 border-b-2 border-slate-800 items-center justify-between"
        >
          <p class="ml-6 text-xl text-white"># Channel 1</p>
          <div class="mr-6">
            <font-awesome-icon
              class="w-5 h-5 text-slate-150 mr-4"
              :icon="['fa', 'bell']"
            />
            <font-awesome-icon
              class="w-5 h-5 text-slate-150"
              :icon="['fa', 'user-group']"
            />
          </div>
        </div>
        <!-- !SECTION Channel info-->
        <!-- SECTION Chat -->
        <div class="max-h-full max-w-full flex flex-1">
          <div
            class="fixed flex-col-reverse chat-max-height scrollbar-y-hide scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded scrollbar-track:!bg-slate-500/[0.16] scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 overflow-scroll max-w-full mx-8"
          >
            <!-- SECTION Messages -->
            <!-- Todo Gérer l'overflow -->
            <div v-for="i in 25" :key="i" class="flex min-h-[3.5rem] my-5">
              <div class="flex w-14 justify-center items-center">
                <div
                  class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                >
                  <font-awesome-icon
                    class="h-4 w-4 text-white"
                    :icon="['far', 'user']"
                  />
                </div>
              </div>
              <div class="flex-1 flex-row items-center text-slate-200">
                <div class="flex items-center">
                  <p class="text-md font-semibold">Pseudo {{ i }}</p>
                  <p class="text-xs ml-5">24/02/2023 16:22</p>
                </div>
                <p>
                  Bonjour je suis très heureux d'être Bonjour je suis très
                  heureux d'être Bonjour je suis très heureux d'être Bonjour je
                  suis très heureux d'être Bonjour je suis très heureux d'être
                </p>
              </div>
            </div>
            <!-- !SECTION Messages-->
          </div>
        </div>
        <!-- !SECTION Chat -->
        <!-- SECTION Input -->
        <div class="w-full flex bg-slate-650 justify-center z-10">
          <div
            class="flex w-10/12 my-8 h-10 border-2 border-slate-500 rounded-md self-center justify-end items-center"
          >
            <div class="flex justify-center w-1/12">
              <div
                class="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                <font-awesome-icon class="w-4 text-slate-700" icon="plus" />
              </div>
            </div>
            <!-- TODO mettre une textarea -->
            <input
              placeholder="Envoyez un message"
              class="w-11/12 h-full border-none bg-transparent text-white placeholder:text-slate-300 pb-1 focus:outline-none"
            />
          </div>
        </div>
        <!-- !SECTION Input-->
      </div>

      <!-- !SECTION  -->
    </div>
    <!-- !SECTION Channel Part-->
    <!-- SECTION Server add Modal -->
    <div
      :id="ADD_SERVER_MODAL"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 text-white">
              Terms of Service
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              :data-modal-hide="ADD_SERVER_MODAL"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b border-gray-600"
          >
            <button
              :data-modal-hide="ADD_SERVER_MODAL"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              :data-modal-hide="ADD_SERVER_MODAL"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- !SECTION Server add Modal -->
  </div>
</template>
<style scoped>
.chat-max-height {
  max-height: calc(100vh - 2.5rem - 3.5rem - 4rem - 4rem);
}

.scrollbar-y-hide {
  overflow-x: hidden;
}

.scrollbar\:bg-transparent::-webkit-scrollbar {
  background-color: transparent;
}

::-webkit-scrollbar-track {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.scrollbar\:\!w-1\.5::-webkit-scrollbar {
  width: 0.475rem !important;
}

.scrollbar\:\!h-1\.5::-webkit-scrollbar {
  height: 0.375rem !important;
}

.dark .dark\:scrollbar-thumb\:\!bg-slate-500\/50::-webkit-scrollbar-thumb {
  background-color: red !important;
}

.scrollbar-thumb\:\!bg-slate-300::-webkit-scrollbar-thumb {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(128, 143, 164) !important;
}

.scrollbar-thumb\:\!rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem !important;
}

.dark
  .dark\:scrollbar-track\:\!bg-slate-500\/\[0\.16\]::-webkit-scrollbar-track {
  background-color: rgba(80, 96, 119, 0.6) !important;
}

.scrollbar-track\:\!bg-slate-100::-webkit-scrollbar-track {
  --tw-bg-opacity: 1 !important;
  background-color: rgba(80, 96, 119, 0.6) !important;
}

.scrollbar-track\:\!rounded::-webkit-scrollbar-track {
  border-radius: 0.25rem !important;
}
</style>

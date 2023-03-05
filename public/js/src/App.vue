<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initDropdowns, initModals } from "flowbite";
import { ADD_SERVER_MODAL } from "@/tools/modal";
import ServerList from "@/components/home/ServerList.vue";

const notifClassesFirstTransition = [
  "animation-spawn-first-card",
  "h-[67px]",
  "p-4",
  "space-x-4",
  "w-[80px]",
  "text-gray-100",
  "divide-x",
  "divide-gray-200",
  "rounded-lg",
  "shadow",
  "divide-gray-700",
  "space-x",
];
const notifClassesSecondTransition = [
  "animation-spawn-second-card",
  "w-full",
  "max-w-xs",
];

const showTextNotif = ref<any>(false);

const notificationContent = ref<any>("Le message à été envoyé.");

onMounted(async () => {
  initDropdowns();
  initModals();
  setChatScrollBarBottom();
  const monElement = document.getElementById("mon-element");
  const monBouton = document.getElementById("mon-bouton");
  if (monBouton && monElement) {
    monBouton.addEventListener("click", () => {
      monElement.classList.remove("hidden");
      setTimeout(() => {
        console.log("Je passe la");
        monElement.classList.add("mon-element-cercle", "mon-element-decale");
      }, 0);
    });
  }
  const fermerBouton = document.getElementById("fermer-bouton");
  if (fermerBouton && monBouton && monElement) {
    fermerBouton.addEventListener("click", () => {
      if(monElement.classList.contains("animation-end-second-card")){
        monElement.classList.remove("mon-element-decale");
        monElement.classList.add("mon-element-cache");
        monElement.addEventListener(
          "transitionend",
          () => {
            monElement.classList.add("hidden");
            monElement.children[1].classList.add("hidden");
            monElement.classList.remove("animation-end-second-card");
            
            for (let i = 0; i < notifClassesSecondTransition.length; i++) {
              monElement.classList.remove(notifClassesSecondTransition[i]);
            }
            
          },
          { once: true }
        );
      }
    });

    monElement.addEventListener("transitionend", () => {
      console.log("terminé");
      if (monElement.classList.contains("mon-element-cercle")) {
        console.log("remove cercle");
        for (let i = 0; i < notifClassesFirstTransition.length; i++) {
          monElement.classList.add(notifClassesFirstTransition[i]);
        }
        monElement.classList.remove("mon-element-cercle");
      } else if (
        monElement.classList.contains("animation-spawn-first-card") &&
        monElement.offsetWidth == 80
      ) {
        console.log("js ai pas e", monElement.classList);
        monElement.classList.remove("h-[67px]");
        monElement.classList.remove("w-[80px]");
        monElement.classList.remove("animation-spawn-first-card");

        for (let i = 0; i < notifClassesSecondTransition.length; i++) {
          monElement.classList.add(notifClassesSecondTransition[i]);
        }
        setTimeout(() => {
          showTextNotif.value = true;
          monElement.classList.remove("animation-spawn-second-card");
          monElement.classList.add("animation-end-second-card");
        }, 500);
        setTimeout(() => {
          monElement.children[1].classList.remove("hidden");
        }, 500);
      }
    });
    // monElement.addEventListener(
    //   "transitionend",
    //   () => {

    //   },
    //   { once: true }
    // );
  }

  // Stocke le texte du paragraphe dans une variable
  // const texte = mon_para.value;

  // console.log(mon_para.value.textContent)
  // // Efface le texte du paragraphe
  // if (texte) {
  //   // mon_para.value.textContent = "";
  //   const span = document.createElement("span");
  //   span.mount(mon_para.value)
  //   // Boucle sur chaque lettre du texte
  //   for (let i = 0; i < texte.length; i++) {
  //     // Crée une nouvelle balise "span"
  //     const span = document.createElement("span");
  //     // Ajoute la lettre courante à la balise "span"
  //     span.textContent = texte[i];
  //     // Ajoute la balise "span" au paragraphe
  //     mon_para.value.appendChild(span);
  //     // Ajoute un délai à l'animation pour chaque lettre
  //     span.style.animationDelay = i * 50 + "ms";
  //   }
  // }
  // displayNotificationText();
});

const setChatScrollBarBottom = () => {
  const chat = document.getElementById("chat") as HTMLDivElement;
  chat.scrollTop = chat?.scrollHeight;
};
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <!-- SECTION Server Part -->
    <div class="flex w-100 h-16 bg-slate-300">
      <div class="flex w-3/4 bg-slate-800 items-center">
        <!-- SECTION Server List -->
        <ServerList />
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
              id="mon-bouton"
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
                class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-slate-800 border-2 border-slate-600"
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
            id="chat"
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
      <div
        id="mon-element"
        class="hidden absolute absolute right-0 left-0 ml-auto mr-auto top-0 flex items-center justify-center bg-slate-800 border-2 border-slate-600 opacity-40"
        role="alert"
      >
        <svg
          id=""
          aria-hidden="true"
          class="w-5 h-5 text-blue-500 "
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
          ></path>
        </svg>
        <div class="flex items-center justify-between w-full hidden">
          <p id="textAnimation" class="ml-3">
            <span
              v-show="showTextNotif"
              v-for="(c, i) in notificationContent"
              :key="c"
              :style="
                'animation-delay:' +
                (2000 / notificationContent.length) * i +
                'ms'
              "
              >{{ c }}</span
            >
          </p>

          <button
            id="fermer-bouton"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center hover:bg-gray-600 hover:text-white"
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
      </div>
      <!-- !SECTION  -->
    </div>

    <!-- !SECTION Channel Part-->
    <!-- SECTION Server add Modal -->
    <!-- !SECTION Server add Modal -->
  </div>
</template>
<style scoped>
#textAnimation span {
  opacity: 0;
  animation: fade-in 0s ease-in-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.mon-element-transition {
  transition: transform 0.3s ease, opacity 0.17s ease;
}

.mon-element-cercle {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  opacity: 1;
  transition: transform 0.6s ease, opacity 1s ease;
}

.mon-element-cercle svg {
  display: block;
}

.mon-element-cercle div {
  display: none;
}

.animation-spawn-first-card {
  transition: all 0.2s ease-in;
}
.animation-spawn-second-card {
  transition: all 3s ease-in-out;
}
.animation-end-second-card {
  transition: all 1s ease-in-out;
}

/* On décale l'élément de -100% vers le haut par défaut */
.mon-element-decale {
  transform: translateY(50%);
  opacity: 1;
}

::selection {
  background-color: rgb(141, 162, 251);
}

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

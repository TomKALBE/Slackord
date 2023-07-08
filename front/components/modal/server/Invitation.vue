<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


const closeButton = ref(null);
</script>
<template>
    <div
        :id="INVITATION_SERVER_MODAL"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
        <div class="relative w-full max-w-4xl max-h-full">
            <!-- Modal content -->
            <div
                class="relative rounded-lg shadow bg-slate-800 border-slate-600"
            >
                <button
                    ref="closeButton"
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    :data-modal-hide="INVITATION_SERVER_MODAL"
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
                <div class="px-6 py-6 lg:px-8">
                    <h3
                        class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Demande d'ajout au serveur
                    </h3>
                    <div class="pt-3">
                        <div
                            class="relative overflow-x-auto shadow-md sm:rounded-lg"
                        >
                            <table
                                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                            >
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                                >
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Nom de l'utilisateur
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Accepter
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 flex-col justify-center items-center text-center align-middle"
                                        >
                                            <div class="flex items-center">
                                                Refuser
                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Statut
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="invitation, index in useServer()
                                            .serversInvitations.value"
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {{ invitation.name }}
                                        </th>
                                        <td
                                            class="px-6 py-4 flex justify-start"
                                        >
                                            <FontAwesomeIcon
                                                icon="fa-check"
                                                class="text-slate-100 p-1 h-8 rounded"
                                                :class="{
                                                    'bg-emerald-700 cursor-not-allowed opacity-70':
                                                        invitation.requestStatus ===
                                                            'ACCEPTED' ||
                                                        invitation.requestStatus ===
                                                            'DECLINED',
                                                    'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-400  hover:scale-105 duration-300 cursor-pointer':
                                                        invitation.requestStatus ===
                                                        'PENDING',
                                                }"
                                                @click="invitation.requestStatus === 'PENDING' ? useServer().acceptMember(index, 'ACCEPTED') : null"
                                            />
                                        </td>
                                        <td class="px-6 py-4 justify-start">
                                            <FontAwesomeIcon
                                                icon="fa-xmark"
                                                class="text-slate-100 p-1 px-2 rounded"
                                                :class="{
                                                    'bg-rose-700 cursor-not-allowed opacity-70':
                                                        invitation.requestStatus ===
                                                            'ACCEPTED' ||
                                                        invitation.requestStatus ===
                                                            'DECLINED',
                                                    'bg-rose-600 hover:bg-rose-500 active:bg-rose-400  hover:scale-105 duration-300 cursor-pointer':
                                                        invitation.requestStatus ===
                                                        'PENDING',
                                                }"
                                                @click="invitation.requestStatus === 'PENDING' ? useServer().acceptMember(index, 'DECLINED') : null"
                                                
                                                />
                                        </td>
                                        <td class="px-6 py-4">
                                            <div
                                                v-if="
                                                    invitation.requestStatus ===
                                                    'PENDING'
                                                "
                                                class="flex items-center"
                                            >
                                                <div
                                                    class="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"
                                                ></div>
                                                En attente
                                            </div>
                                            <div
                                                v-else-if="
                                                    invitation.requestStatus ===
                                                    'ACCEPTED'
                                                "
                                                class="flex items-center"
                                            >
                                                <div
                                                    class="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2"
                                                ></div>
                                                Accepté
                                            </div>
                                            <div
                                                v-else
                                                class="flex items-center"
                                            >
                                                <div
                                                    class="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2"
                                                ></div>
                                                Refusé
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- <button
                            :data-modal-hide="INVITATION_SERVER_MODAL"
                            type="button"
                            class="ml-4 text-white bg-gray-600 active:bg-gray-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Annuler
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

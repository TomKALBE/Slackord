<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
    friendRequests: IRelationship[];
};
const { answerFriendRequest, sendFriendRequest } = useUser();
defineProps<Props>();
const friendId = ref("");
const _sendFriendRequest = () => {
    if (friendId.value !== "") {
        console.log(friendId.value);
        sendFriendRequest(friendId.value);
    }
};
</script>
<template>
    <div class="m-5">
        <!-- <div
            class="border-2 rounded-md border-slate-450 w-2/6 p-2 flex items-center"
        >
            <span
                class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-white bg-red-500 rounded-full"
            >
                {{ friendRequests.length }}
            </span>
            <p class="ml-3 text-white">Nouvelles demandes d'ami</p>
        </div> -->
        <div class="flex flex-col w-100">
            <label class="text-slate-200">Ajouter un ami avec son id : </label>
            <div class="flex-col justify-center items-center h-64">
                <input
                    class="mt-2 w-2/12 border border-slate-500 rounded-md bg-slate-750 focus:border-none active:border-none"
                    v-model="friendId"
                />
                <button
                    type="button"
                    class="text-slate-200 ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="_sendFriendRequest"
                    >
                    <FontAwesomeIcon :icon="['fa', 'plus']" />
                </button>
            </div>
        </div>
        <template v-if="friendRequests" v-for="friendRequest in friendRequests">
            <div
                v-if="friendRequest.request_status === 'PENDING'"
                class="w-100 my-2 rounded-md p-2 flex items-center justify-between hover:bg-slate-600 cursor-pointer"
            >
                <div class="py-2 text-slate-200">
                    {{ friendRequest.sender_id }} -
                    {{ friendRequest.request_status }}
                </div>
                <div class="">
                    <button
                        class="group bg-slate-850 rounded-full flex-col justify-center items-center w-6 h-6 hover:bg-slate-750 active:bg-slate-550"
                        @click="answerFriendRequest(friendRequest, 'ACCEPTED')"
                    >
                        <FontAwesomeIcon
                            :icon="['fa', 'check']"
                            class="text-slate-200 group-hover:text-emerald-400"
                        />
                    </button>
                    <button
                        class="group bg-slate-850 rounded-full flex-col justify-center items-center w-6 h-6 ml-3 hover:bg-slate-750 active:bg-slate-550"
                        @click="answerFriendRequest(friendRequest, 'DECLINED')"
                    >
                        <FontAwesomeIcon
                            :icon="['fa', 'xmark']"
                            class="text-slate-200 group-hover:text-rose-600"
                        />
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
<style scoped>
/* 
bg-green-400
bg-indigo-400
bg-orange-400
*/
</style>

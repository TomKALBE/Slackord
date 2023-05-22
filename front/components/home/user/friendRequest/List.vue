<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
    friendRequests: IRelationship[];
};
defineProps<Props>();
const friendId = ref("");
const sendFriendRequest = () => {
    if (friendId.value !== "") {
        console.log(friendId.value);
        useUser().sendFriendRequest(friendId.value);
    }
};
const nuxtApp = useNuxtApp();

const answerFriendRequest = (friendRequest: IRelationship, status: 'DECLINED' | 'ACCEPTED') => {
    friendRequest.request_status = status;
    SocketService.answerFriendRequest(nuxtApp.$socket ,friendRequest)
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
        <div
            v-if="friendRequests"
            v-for="friendRequest in friendRequests"
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
        <div class="">
            <label>Ajouter un ami avec son id</label>
            <input type="number" v-model="friendId" />
            <button @click="sendFriendRequest">Ajouter</button>
        </div>
    </div>
</template>
<style scoped>
/* 
bg-green-400
bg-indigo-400
bg-orange-400
*/
</style>

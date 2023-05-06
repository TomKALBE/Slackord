<script setup lang="ts">
const { getRelatedConversationMessage, getReceiverIdIndex, conversationMessages, addMessageToConversation } = useMessage();

const messages = ref<IMessageResource[]>([]);
const formMessage = ref("");
type Props = {
    user: IUser;
};
const props = defineProps<Props>();
const { user } = useAuth();
onMounted(async () => {
    // TODO: fix typescript error
    await getRelatedConversationMessage(
        user.value.id,
        props.user.id
    );
    console.log(messages.value);
});
watch(
    () => props.user,
    async () => {
        messages.value = await getRelatedConversationMessage(
            user.value.id,
            props.user.id
        );
    }
);
const { sendMessage } = SocketService;
const nuxtApp = useNuxtApp();

const handleFromSubmit = (e: Event) => {
    e.preventDefault();
    const newMessage:Partial<IMessageResource> = {
        content: formMessage.value,
        user_id: user.value.id,
        receiver_id: props.user.id,
        type: "PRIVATE",
    }
    const newMessage2:Partial<IMessageResource> = {
        content: formMessage.value,
        user_id: props.user.id,
        receiver_id: user.value.id,
        type: "PRIVATE",
    }
    addMessageToConversation(newMessage2)
    formMessage.value = "";
    sendMessage(nuxtApp.$socket, newMessage)
};
</script>
<template>
    <div class="w-full">
        <div
            id="chat"
            class="flex-col-reverse chat-max-height rounded-md w-12/12 mx-3 overflow-y-scroll scrollbar"
        >
            <!-- SECTION Messages -->
            <!-- Todo Gérer l'overflow -->
            <div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div>
            <div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div>
            <div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div>
            <div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div><div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div><div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div><div
                v-if="conversationMessages[getReceiverIdIndex(props.user.id)]"
                v-for="message in conversationMessages[getReceiverIdIndex(props.user.id)].messages"
                :key="message.id"
                class="flex min-h-[3.5rem] my-5"
            >
                <div class="flex w-14 justify-center items-center">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center self-start mt-2"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                </div>
                <div class="flex-1 flex-row items-center text-slate-200">
                    <div class="flex items-center">
                        <p class="text-md font-semibold">
                            Pseudo {{ message.user_id }}
                        </p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- SECTION Input -->
    <div class="w-full flex bg-slate-650 justify-center items-center z-10">
        <div
            class="flex w-full mx-5 h-10 border-2 border-slate-500 rounded-md self-center justify-end items-center"
        >
            <div class="flex justify-center w-1/12">
                <div
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                    <FontAwesomeIcon class="w-4 text-slate-700" icon="plus" />
                </div>
            </div>
            <form class="w-11/12" @submit="handleFromSubmit">
                <!-- TODO mettre une textarea -->
                <input
                    v-model="formMessage"
                    placeholder="Envoyez un message"
                    class="w-full h-full border-none bg-transparent text-white placeholder:text-slate-300 pb-1 focus:outline-none"
                />
            </form>
        </div>
    </div>
    <!-- !SECTION Input-->
</template>
<style scoped>
.chat-max-height {
    max-height: calc(100vh - 2.5rem - 3.5rem - 5rem);
}
</style>

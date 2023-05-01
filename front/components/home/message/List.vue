<script setup lang="ts">
const { getRelatedConversationMessage } = useMessage();

const messages = ref([]);
type Props = {
    user: IUser
}
const props = defineProps<Props>();
const { user } = useAuth();
onMounted(async () => {
    // TODO: fix typescript error
    messages.value = await getRelatedConversationMessage(user.value.id, props.user.id);
});
watch(() => props.user, async () => {
    messages.value = await getRelatedConversationMessage(user.value.id, props.user.id);
});
</script>
<template>
    <div class="max-h-full max-w-full flex flex-1">
        <div
            id="chat"
            class="fixed flex-col-reverse chat-max-height scrollbar-y-hide scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded scrollbar-track:!bg-slate-500/[0.16] scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 overflow-scroll max-w-full mx-8"
        >
            <!-- SECTION Messages -->
            <!-- Todo Gérer l'overflow -->
            <div v-for="message in messages" :key="message.id" class="flex min-h-[3.5rem] my-5">
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
                        <p class="text-md font-semibold">Pseudo {{ message.user_id }}</p>
                        <p class="text-xs ml-5">24/02/2023 16:22</p>
                    </div>
                    <p>
                        {{ message.content }}
                    </p>
                </div>
            </div>
            <!-- !SECTION Messages-->
        </div>
    </div>
</template>
<style scoped>
.chat-max-height {
  max-height: calc(100vh - 2.5rem - 3.5rem - 4rem - 4rem);
}
</style>

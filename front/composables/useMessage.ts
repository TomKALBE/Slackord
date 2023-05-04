export default () => {
    type ConversationMessage= {
        receiver_id: number;
        messages: IMessageResource[];
    }

    const selectedUser = useState<IUser | null>('selectedUser', () => null);
    const conversationMessages = useState<Partial<ConversationMessage>[]>('conversationMessages', () => []);

    async function getRelatedConversationMessage(userId: number, receiver_id: number) {
        try{

            if(getReceiverIdIndex(receiver_id) !== -1) return;

            if(useRuntimeConfig().public.appEnv === 'production'){
                const res = await fetch('/api/users/id/messages/id');
                const json = await res.json();
                return json;
            }
            else{
                const res = await fetch(`/api/messages?receiver_id=${receiver_id}&user_id=${userId}&receiver_id=${userId}&user_id=${receiver_id}`);
                const json = await res.json() as IMessageResource[];

                const conversationMessage:ConversationMessage = {
                    receiver_id: receiver_id,
                    messages: json
                }
                conversationMessages.value.push(conversationMessage);
                return json;
            }
        }catch(e){
            console.log(e)
        }
    }

    function getReceiverIdIndex(receiver_id: number){
        return conversationMessages.value.findIndex((conversationMessage) => conversationMessage.receiver_id === receiver_id);
    }

    function addMessageToConversation(message: Partial<IMessageResource>){
        const index = getReceiverIdIndex(message.user_id);
        console.log(index, message)
        if(index === -1) return;
        const newMessage:Partial<IMessageResource> = {
            content: message.content,
            user_id: message.receiver_id,
            receiver_id: message.user_id,
            type: "PRIVATE"
        }
        conversationMessages.value[index].messages.push(newMessage);
    }
    return {
        conversationMessages,
        selectedUser,
        getRelatedConversationMessage,
        getReceiverIdIndex,
        addMessageToConversation
    }
}
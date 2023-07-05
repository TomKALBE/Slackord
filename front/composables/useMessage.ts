export default () => {
    type ConversationMessage = {
        receiver_id: number;
        messages: IMessage[];
        type: string;
    }

    const selectedUser = useState<IUser | null>('selectedUser', () => null);
    const newMessage = useState('newMessage', () => 0);
    const conversationMessages = useState<Partial<ConversationMessage>[]>('conversationMessages', () => []);

    async function getRelatedConversationMessage(userId: number, receiver_id: number, type: string) {
        try {
            // if (getReceiverIdIndex(receiver_id) !== -1) return;

            if (useRuntimeConfig().public.appEnv === 'production') {
                const res = await fetch('/api/messages/' + receiver_id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + useAuth().user.value?.token,
                        'Accept': 'application/json'
                    }
                });
                const json = await res.json();
                return json;
            }
            else {
                let res;
                if (type === "PRIVATE")
                    res = await fetch(`/api/messages?receiver_id=${receiver_id}&user_id=${userId}&receiver_id=${userId}&user_id=${receiver_id}&type=${type}`);
                else
                    res = await fetch(`/api/messages?receiver_id=${receiver_id}&type=${type}`);

                const json = await res.json() as IMessage[];
                const conversationMessage: ConversationMessage = {
                    receiver_id: receiver_id,
                    messages: json,
                    type: type
                }
                const index = getReceiverIdIndex(receiver_id, type);
                if(index === -1)
                    conversationMessages.value.push(conversationMessage);
                return json;
            }
        } catch (e) {
            console.log(e)
        }
    }

    function getReceiverIdIndex(receiver_id: number, type: string) {
        return conversationMessages.value.findIndex((conversationMessage) => conversationMessage.receiver_id === receiver_id && conversationMessage.type === type);
    }

    function addMessageToConversation(message: Partial<IMessage>) {
        const index = getReceiverIdIndex(message.receiver_id, message.type);
        console.log(index, message)
        if (index === -1) return;
        const newMessage: Partial<IMessage> = {
            content: message.content,
            user_id: message.user_id,
            receiver_id: message.receiver_id,
            type: message.type  
        }
        conversationMessages.value[index].messages.push(newMessage);
    }
    return {
        newMessage,
        conversationMessages,
        selectedUser,
        getRelatedConversationMessage,
        getReceiverIdIndex,
        addMessageToConversation
    }
}

export default () => {
    const selectedUser = useState<IUser | null>('selectedUser', () => null);
    
    async function getRelatedConversationMessage(userId: number, receiver_id: number) {
        try{
            if(useRuntimeConfig().public.appEnv === 'production'){
                const res = await fetch('/api/users/id/messages/id');
                const json = await res.json();
                return json;
            }
            else{
                const res = await fetch(`/api/messages?receiver_id=${receiver_id}&user_id=${userId}&receiver_id=${userId}&user_id=${receiver_id}`);
                const json = await res.json();
                return json;
            }
        }catch(e){
            console.log(e)
        }
    }

    return {
        selectedUser,
        getRelatedConversationMessage
    }
}
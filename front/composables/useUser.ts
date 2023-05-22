export default () => {
    const users = useState<IUser[]>('users', () => []);
    
    async function getRelatedUsers(id: number) {
        try{
            if(useRuntimeConfig().public.appEnv === 'production'){
                const res = await fetch('/api/users',{
                    headers: {
                        "Media-Type": "application/json",
                    }
                });
                const json = await res.json();
                users.value = json;
            }else{
                const res = await fetch('/api/users?id_ne=' + id,{
                    headers: {
                        "Media-Type": "application/json",
                    }
                });
                const json = await res.json();
                users.value = json;
            }
        }catch(e){
            console.log(e)
        }
    }
    async function sendFriendRequest(id: number){
        try{
            const res = await fetch('/api/relationships',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: useAuth().user.value?.id,
                    receiver_id: id,
                    request_status: "PENDING"
                })
            });
            const json = await res.json();
            if(json)
                useToast().add({ color:"emerald", icon:"circle-check", message:"Demande d'ami envoyée !" })
        }catch(e){
            console.log(e)
        }
    }
    return {
        users,
        getRelatedUsers,
        sendFriendRequest
    }
}
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

    return {
        users,
        getRelatedUsers
    }
}
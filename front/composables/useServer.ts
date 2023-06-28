export default () => {
    const servers = useState<IServer[]>("servers", () => []);

    const getMembers = async (server_id: number) => {
        const { user } = useAuth();
        const res = await fetch(
            `api/servers/${user.value.id}/members?_expand=user&_expand=server`
        );
        const json = await res.json();
        servers.value = [{}, ...json];
        console.log(servers.value);
    };
    const get = async () => {
        const { user } = useAuth();
        const res = await fetch(
            `api/users/${user.value.id}/members?_expand=server`
        );
        const json = await res.json();
        servers.value = [{}, ...json];

    }
    const create = async (server: Partial<IServer>) => {
        try {
            const res = await fetch(`api/servers`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(server),
            });
            const json = await res.json();
            if(!json)
                throw new Error("Error while creating server");
            addMember({server_id : json.id, user_id : useAuth().user.value.id});
        } catch (error) {
            console.log(error)
        }
    };
    const addMember = async (data: { server_id:number, user_id:number }) => {
        try {
            const res = await fetch(`api/members`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({serverId : data.server_id, userId : data.user_id}),
            });
            const json = await res.json();
            
        } catch (error) {
            console.log(error)
        }
    };
                
    return {
        get,
        create,
        servers,
    };
};

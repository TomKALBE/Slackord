export default () => {
    const servers = useState<IServer[]>("servers", () => []);
    const selectedServer = useState<IServer>("selectedServer", () => 1);
    const setSelectedServer = (id: number) => {

        selectedServer.value = servers.value[id];
    };
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
            if (!json)
                throw new Error("Error while creating server");
            get();
            addMember({ server_id: json.id, user_id: useAuth().user.value.id });
            useToast().add({ icon: "circle-check", color: "green", message: "Le serveur a bien été créé" });
        } catch (error) {
            console.log(error)
            useToast().add({ icon: "circle-exclamation", color: "red", message: "Une erreur est survenue lors de la création du serveur" });
        }
    };
    const addMember = async (data: { server_id: number, user_id: number }) => {
        try {
            const res = await fetch(`api/members`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ serverId: data.server_id, userId: data.user_id }),
            });
            const json = await res.json();

        } catch (error) {
            console.log(error)
        }
    };
    const modifyServer = (server: IServer) => {
        let index;
        console.log(server.server, server.server === undefined, server.id)
        if (server.server === undefined) {
            index = getChannelIndexById(server.id)
            servers.value[index].server = server;
        }
        else {
            index = getChannelIndexById(server.server.id)
            servers.value[index] = server;
        }
    }
    const getChannelIndexById = (id: number) => {
        return servers.value.findIndex((server) => {
            console.log(server, server.serverId, id)
            return server.serverId === id

        })
    }
    return {
        servers,
        selectedServer,
        modifyServer,
        setSelectedServer,
        get,
        create,
    };
};

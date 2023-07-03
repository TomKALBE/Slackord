export default () => {
    const channels = useState<IChannel[]>("channels", () => []);
    const selectedChannel = useState("selectedChannel", () => 0);
    const setSelectedChannel = (channel: any) => {
        selectedChannel.value = channel;
    };
    const setChannels = (channels: any) => {
        channels.value = channels;
    };
    const get = async () => {
        const res = await fetch(
            `api/servers/${useServer().selectedServer.value.server.id}/channels`
        );
        const data = (await res.json()) as IChannel[];
        channels.value = data;
        //add a property index to each channel
        setSelectedChannel(data[0])
        setChannels(data);
    };
    const modifyChannel = (channel: IChannel) => {

        try {
            const index = getChannelIndexById(channel.id)
            channels.value[index] = channel;
        } catch (error) {
            console.log(error)
        }
    }

    const deleteChannel = async (channel: IChannel) => {
        try {
            const index = getChannelIndexById(channel.id)
            channels.value.splice(index, 1);
            const res = await SocketService.sendDeletedChannel(useNuxtApp().$socket, { id: channel.id, serverId: channel.serverId })
            if (!res.ok)
                throw new Error("Erreur lors de la suppression du channel")
            useToast().add({ icon: "circle-check", color: "green", message: "Le channel a bien été supprimé" });
        } catch (error) {
            useToast().add({ icon: "circle-exclamation", color: "red", message: "Une erreur est survenue lors de la suppression du channel" });
        }
    }

    const getChannelIndexById = (id: number) => {
        return channels.value.findIndex((channel) => channel.id === id)
    }
    return {
        channels,
        selectedChannel,
        deleteChannel,
        modifyChannel,
        get,
        setSelectedChannel,
        setChannels
    };
};

export default () => {
    const channels = useState<IChannel[]>("channels", () => []);
    const selectedChannel = useState("selectedChannel", () => 0);
    const setSelectedChannel = (channel:any) => {
        selectedChannel.value = channel;
    };
    const setChannels = (channels:any) => {
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
    const modifyChannel = (channel:IChannel) => {
        const index = getChannelIndexById(channel.id)
        channels.value[index] = channel;
    }
    const getChannelIndexById = (id:number) => {
        return channels.value.findIndex((channel) => channel.id === id)
    }
    return {
        channels,
        selectedChannel,
        modifyChannel,
        get,
        setSelectedChannel,
        setChannels
    };
};

export default () => {
    const channels = useState<IChannel[]>("channels", () => []);
    const selectedChannel = useState("selectedChannel", () => 0);
    const setSelectedChannel = (channel:any) => {
        selectedChannel.value = channel;
    };
    const setChannels = (channels:any) => {
        channels.value = channels;
    };
    return {
        channels,
        selectedChannel,
        setSelectedChannel,
        setChannels
    };
};

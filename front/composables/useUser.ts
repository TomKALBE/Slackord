export default () => {
    const users = useState<IUser[]>("users", () => []);
    const friendRequests = useState<IRelationship[]>(
        "friendRequests",
        () => []
    );
    async function getRelatedUsers(id?: number) {
        try {
            if (useRuntimeConfig().public.appEnv === "production") {
                const res = await fetch("/api/users", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + useAuth().user.value?.token,
                        "Accept": "application/json"
                    },
                });
                const json = await res.json();
                console.log(json)
                users.value = json;
            } else {
                const res = await fetch(
                    "/api/users?id_ne=" + useAuth().user.value?.id,
                    {
                        headers: {
                            "Media-Type": "application/json",
                        },
                    }
                );
                const json = await res.json();
                users.value = json;
            }
        } catch (e) {
            console.log(e);
        }
    }
    async function sendFriendRequest(id: number) {
        try {
            const nuxtApp = useNuxtApp();
            const res = await SocketService.sendFriendRequest(nuxtApp.$socket, {
                sender_id: useAuth().user.value?.id,
                receiver_id: id,
                request_status: "PENDING",
            });
            if (res.ok)
                useToast().add({
                    color: "emerald",
                    icon: "circle-check",
                    message: "Demande d'ami envoyée !",
                });
            else
                useToast().add({
                    color: "rose",
                    icon: "circle-exclamation",
                    message: "Une erreur s'est produite",
                });
        } catch (e) {
            console.log(e);
        }
    }

    async function answerFriendRequest(
        friendRequest: IRelationship,
        status: "DECLINED" | "ACCEPTED"
    ) {
        const nuxtApp = useNuxtApp();
        friendRequest.request_status = status;
        const res = await SocketService.answerFriendRequest(
            nuxtApp.$socket,
            friendRequest
        );
        if (res.ok) {
            getFriendRequests();
            useToast().add({
                color: "emerald",
                icon: "circle-check",
                message: "Demande d'ami acceptée !",
            });
        } else {
            useToast().add({
                color: "rose",
                icon: "circle-exclamation",
                message: "Une erreur s'est produite",
            });
        }
    }

    async function getFriendRequests() {
        const res = await fetch(
            "/api/relationships?receiver_id=" + useAuth().user.value?.id
        );
        friendRequests.value = (await res.json()) as IRelationship[];
    }
    return {
        users,
        friendRequests,
        getRelatedUsers,
        sendFriendRequest,
        answerFriendRequest,
        getFriendRequests,
    };
};

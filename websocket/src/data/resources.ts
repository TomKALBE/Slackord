export type MessageResource = {
    content: string;
    upvote: number | null;
    type: "PRIVATE" | "PUBLIC" | "CHANNEL";
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    user_id: number;
    receiver_id: number;
};

export type ChannelResource = {
    id: number;
    name: string;
};

export type UserResource = {
    id: number,
    firstname: string;
    lastname: string;
    state: "ONLINE" | "AFK" | "DO NOT DISTURB" | "INVISIBLE"
};

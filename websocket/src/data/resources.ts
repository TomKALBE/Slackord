export type MessageResource = {
    content: String;
    upvote: Number | null;
    type: "PRIVATE" | "PUBLIC" | "CHANNEL";
    created_at: Number;
    updated_at: Number;
    deleted_at: Number | null;
    user_id: Number;
    receiver_id: Number;
};

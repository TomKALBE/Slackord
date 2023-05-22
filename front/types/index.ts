export {};

declare global {
    interface RegisterForm {
        email: string;
        pseudo: string;
        password: string;
    }
    interface LoginForm {
        username: string;
        pseudo: string;
        password: string;
    }
    interface IToast {
        color:
            | "slate"
            | "gray"
            | "zinc"
            | "neutral"
            | "stone"
            | "red"
            | "orange"
            | "amber"
            | "yellow"
            | "lime"
            | "green"
            | "emerald"
            | "teal"
            | "cyan"
            | "sky"
            | "blue"
            | "indigo"
            | "purple"
            | "fuchsia"
            | "pink"
            | "rose";
        message: string;
        icon: "paper-plane" | "bell" | "circle-check" | "circle-exclamation";
    }
    interface IUser {
        id: number;
        email: string;
        pseudo: string;
        roles: string[];
        password: string;
        servers: string[];
        channel_roles: string[];
        privateChannels: string[];
        userIdentifier: string;
        channelRoles: string[];
    }
    interface IMessageResource {
        content: string;
        upvote: number | null;
        type: "PRIVATE" | "PUBLIC" | "CHANNEL";
        created_at: number;
        updated_at: number;
        deleted_at: number | null;
        user_id: number;
        receiver_id: number;
    } 
    interface INotification {
        content: string;
        type: ENotificationType;
        date: number;
        user_id: number;
        color:
            | "slate"
            | "gray"
            | "zinc"
            | "neutral"
            | "stone"
            | "red"
            | "orange"
            | "amber"
            | "yellow"
            | "lime"
            | "green"
            | "emerald"
            | "teal"
            | "cyan"
            | "sky"
            | "blue"
            | "indigo"
            | "purple"
            | "fuchsia"
            | "pink"
            | "rose";
        icon: "paper-plane" | "bell" | "circle-check" | "circle-exclamation";
    }   
    enum ENotificationType {
        PRIVATE = "PRIVATE",
        PUBLIC = "PUBLIC",
        CHANNEL = "CHANNEL"
    }
    interface IRelationship {
        sender_id: number,
        receiver_id: number
        request_status: "ACCEPTED" | "DECLINED" | "PENDING"
    }
    
}

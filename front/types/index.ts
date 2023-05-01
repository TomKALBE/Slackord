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
}

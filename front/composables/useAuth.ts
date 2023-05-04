export default () => {
    const user = useState<IUser | null>("user", () => null);
    const status = () => {
        const _user = localStorage.getItem("user");
        if (_user) {
            const parsedUser = JSON.parse(_user);
            user.value = { ...parsedUser, isAuthenticated: true };
            return true;
        } else {
            return false;
        }
    };
    async function autoLogin() {
        let _user = null;
        if (useRuntimeConfig().public.appEnv === "production") {
            if (localStorage.getItem("user")) {
                _user = JSON.parse(localStorage.getItem("user"));
                delete _user.token;
                await nextTick();
                await login(_user);
            }
        } else {
            if (localStorage.getItem("user")) {
                _user = JSON.parse(localStorage.getItem("user"));
                await nextTick();
                useState('user').value = _user;
            } else {
                _user = {
                    id: 2,
                    email: "test1@test.com",
                    pseudo: "test1",
                };
                localStorage.setItem("user", JSON.stringify(_user));
                await nextTick();
                useState('user').value = _user;
            }

        }
        
        SocketService.registerUserSocket( useNuxtApp().$socket ,_user.id);
    }
    async function login(data: LoginForm) {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                redirect: "follow",
            });
            const json = await res.json();
            if (!json || json.code === 401) return navigateTo("/login");
            localStorage.setItem("user", JSON.stringify({ ...json, ...data }));
            console.log(json);
            user.value = { ...json, isAuthenticated: true };
            navigateTo("/");
        } catch (e) {
            console.log(e);
        }
    }
    async function register(data: RegisterForm) {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                redirect: "follow",
            });
            const json = await res.json();
            if (!json) return;
            localStorage.setItem("user", JSON.stringify(json));
            user.value = { ...json, isAuthenticated: true };
            navigateTo("/");
        } catch (e) {
            console.log(e);
        }
    }
    const logout = () => {
        user.value = {
            isAuthenticated: false,
        };
        localStorage.removeItem("user");
        navigateTo("/login");
        return true;
    };
    return {
        user,
        status,
        register,
        login,
        logout,
        autoLogin,
    };
};

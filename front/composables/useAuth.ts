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
                if(_user.token)
                    user.value = _user;
                else
                    navigateTo("/login");
                // delete _user.token;
                await nextTick();
                // await login(_user);
            }
        } else {
            if (localStorage.getItem("user")) {
                _user = JSON.parse(localStorage.getItem("user"));
                await nextTick();
                user.value = _user;
            } else {
                _user = {
                    id: 2,
                    email: "test1@test.com",
                    pseudo: "Dieudonné",
                    state: "ONLINE"
                };
                localStorage.setItem("user", JSON.stringify(_user));
                await nextTick();
                user.value = _user;
            }

        }
        
        SocketService.registerUserSocket( useNuxtApp().$socket ,_user.id);
    }
    async function login(data: LoginForm) {
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                redirect: "follow",
            });
            const json = await res.json();
            if (!json || json.code === 401) return navigateTo("/login");
            const jsonParsed = parseJwt(json.token);
            localStorage.setItem("user", JSON.stringify({ ...jsonParsed, ...json }));
            user.value = { ...jsonParsed, token: json.token };
            navigateTo("/");
        } catch (e) {
            console.log(e);
        }
    }
    function parseJwt (token:string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
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
    const updateStatus = async (status) => {
        if(status === user.value.state) return;
        const res = await SocketService.sendNewUserState(useNuxtApp().$socket, {id: user.value.id, state: status});
        if (!res.ok) {
            return useToast().add({
                color: "rose",
                icon: "circle-exclamation",
                message: "Une erreur s'est produite",
            });
        }
        localStorage.setItem("user", JSON.stringify({...user.value, state: status}));
        user.value = {
            ...user.value,
            state: status,
        };
    };

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
        updateStatus
    };
};

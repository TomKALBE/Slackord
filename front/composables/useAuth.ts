export const useAuth = () => {
    return {
        status,
        register,
        login,
        logout,
    };
};

const status = () => {
    const user = localStorage.getItem('user')
    if (user) {
        const parsedUser = JSON.parse(user)
        useState('user').value = {...parsedUser, isAuthenticated: true}
        return true
    } else {
        return false
    }
};
async function login (data:LoginForm){
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
        if(!json)
            return
        localStorage.setItem("user", JSON.stringify(json));
        console.log(json)
        useState('user').value = {...json, isAuthenticated: true}
        navigateTo('/')
    } catch (e) {
        console.log(e);
    }
};
async function register(data:RegisterForm) {
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
        if(!json)
            return
        localStorage.setItem("user", JSON.stringify(json));
        useState('user').value = {...json, isAuthenticated: true}
        navigateTo('/')
    } catch (e) {
        console.log(e);
    }
};
const logout = () => {
    useState("user").value = {
        isAuthenticated: false,
    };
    localStorage.removeItem("user");
    navigateTo("/login");
    return true;
};

export const useAuth = () => {
    return {
        status,
        register,
        login,
        logout,
    };
};

const status = () => {
    // const user = localStorage.getItem('user')
    // if (user) {
    //     const parsedUser = JSON.parse(user)
    //     parsedUser.isAuthenticated = true
    //     useState('user').value = parsedUser
    //     return parsedUser
    // } else {
    //     return { isAuthenticated: false }
    // }
    return "coucou";
};
const login = () => {
    useState("user").value = {
        isAuthenticated: true,
    };
    return true;
};
const register = async (data) => {
    try {
        const res = await fetch("https://local.zombocom.app/api/register", {
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
        localStorage.setItem("user", json);
        useState('user').value = json
        useState('user').value.isAuthenticated = true
        navigateTo('/')
    } catch (e) {
        console.log(e);
    }
};
const logout = () => {
    useState("user").value = {
        isAuthenticated: false,
    };
    navigateTo("/login");
    return true;
};

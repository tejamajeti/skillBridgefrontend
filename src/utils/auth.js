import Cookies from "js-cookie"

const TOKEN_KEY = "jwtToken"

const USER_KEY = "role"

const DETAILS_KEY = "userData"

export const setToken = token => {
    Cookies.set(TOKEN_KEY, token, { expires: 1 });
    window.location.reload();
}


export const getToken = () => Cookies.get(TOKEN_KEY)

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
    window.location.reload();
}

export const setUserRole = role => Cookies.set(USER_KEY, role, { expires: 1 })

export const getUserRole = () => Cookies.get(USER_KEY)

export const removeUserRole = () => {
    Cookies.remove(USER_KEY);
    window.location.reload();
}

export const setUserDetails = (data) => localStorage.setItem(DETAILS_KEY, JSON.stringify(data))

export const getUserDetails = () => JSON.parse(localStorage.getItem(DETAILS_KEY))

export const removeUserDetails = () => localStorage.removeItem(DETAILS_KEY)
